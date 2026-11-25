import { SparkRenderer, SplatFileType, SplatMesh, getSplatFileType } from "@sparkjsdev/spark";
import { MathUtils, Vector3 } from "three";
import { GestureInterpreter } from "@/core/gesture";
import type { MediaItem } from "@/core/media-item";
import { OrbitRig, parseVec3 } from "./orbit-rig";
import { ThreeStage } from "./three-stage";
import type { DebugEntry, MediaRenderer, RendererContext } from "./types";

type HomeView = { position: Vector3; target: Vector3 };
type GaussianScene = { home: HomeView };

/**
 * Legacy Gaussian OrbitControls defaults (`alpha = 0.5`, `beta = 0.5`, `radius = 5`,
 * `target = (0, 0, 0)`) converted from OpenCV (+X right, +Y down, +Z forward)
 * to Three.js (+X right, +Y up, -Z forward).
 */
/** Legacy Gaussian default CameraData pixel focal length (fx = fy = 1132). */
export const LEGACY_GAUSSIAN_FOCAL_LENGTH_PX = 1132;

/** Convert the legacy fixed pixel focal length to Three.js vertical FOV in degrees for CSS height. */
export function legacyGaussianVerticalFov(heightCssPx: number): number {
  return MathUtils.radToDeg(2 * Math.atan(heightCssPx / (2 * LEGACY_GAUSSIAN_FOCAL_LENGTH_PX)));
}

export const LEGACY_GAUSSIAN_DEFAULT_VIEW: {
  position: [number, number, number];
  target: [number, number, number];
} = {
  position: [
    5 * Math.sin(0.5) * Math.cos(0.5),
    5 * Math.sin(0.5),
    5 * Math.cos(0.5) * Math.cos(0.5),
  ],
  target: [0, 0, 0],
};

const KNOWN_EXTENSIONS = new Set(["ply", "spz", "splat", "ksplat", "sog", "rad"]);

function hasKnownSplatExtension(url: string): boolean {
  const withoutQuery = url.split(/[?#]/, 1)[0];
  const filename = withoutQuery.slice(Math.max(withoutQuery.lastIndexOf("/"), withoutQuery.lastIndexOf("\\")) + 1);
  const dot = filename.lastIndexOf(".");
  if (dot <= 0 || dot === filename.length - 1) return false;
  return KNOWN_EXTENSIONS.has(filename.slice(dot + 1).toLowerCase());
}

async function fetchSplatBytes(url: string, signal: AbortSignal): Promise<Uint8Array> {
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`Failed to load ${url} (HTTP ${response.status})`);
  return new Uint8Array(await response.arrayBuffer());
}

async function awaitWithAbort<T>(promise: Promise<T>, signal: AbortSignal): Promise<T> {
  signal.throwIfAborted();
  return new Promise<T>((resolve, reject) => {
    const onAbort = () => reject(signal.reason);
    signal.addEventListener("abort", onAbort, { once: true });
    promise.then(
      (value) => {
        signal.removeEventListener("abort", onAbort);
        resolve(value);
      },
      (error) => {
        signal.removeEventListener("abort", onAbort);
        reject(error);
      },
    );
  });
}

export async function prepareGaussianScene(
  stage: ThreeStage,
  item: MediaItem,
  signal: AbortSignal,
  referenceHeightCssPx?: number,
  fetchSource?: (url: string, signal: AbortSignal) => Promise<Blob>,
): Promise<GaussianScene> {
  signal.throwIfAborted();
  if (!item.url) throw new Error("No Gaussian splat URL provided");

  // Spark receives bytes, so its worker has no source URL to fetch independently.
  const fileBytes = fetchSource
    ? new Uint8Array(await (await fetchSource(item.url, signal)).arrayBuffer())
    : await fetchSplatBytes(item.url, signal);
  signal.throwIfAborted();

  const fileType = !getSplatFileType(fileBytes) && !hasKnownSplatExtension(item.url)
    ? SplatFileType.SPLAT
    : undefined;

  const spark = new SparkRenderer({ renderer: stage.renderer });
  const splat = new SplatMesh({
    fileBytes,
    fileName: item.url,
    ...(fileType ? { fileType } : {}),
  });
  // Rotate 180° around X to map OpenCV (+Y down, +Z forward) to Three.js (+Y up, -Z forward).
  splat.quaternion.set(1, 0, 0, 0);

  // Prevent unhandled rejections if initialization fails after abort.
  splat.initialized.catch(() => {});

  let disposed = false;
  const disposeSparkResources = () => {
    if (disposed) return;
    disposed = true;
    splat.dispose();
    spark.dispose();
  };
  spark.material.addEventListener("dispose", disposeSparkResources);

  let stopResize: (() => void) | undefined;
  try {
    await awaitWithAbort(splat.initialized, signal);
    signal.throwIfAborted();

    const applyFov = (_width: number, height: number): void => {
      if (height <= 0) return;
      stage.camera.fov = legacyGaussianVerticalFov(height);
      stage.camera.updateProjectionMatrix();
    };
    const { width, height } = stage.size;
    applyFov(width, referenceHeightCssPx ?? height);
    if (referenceHeightCssPx === undefined) stopResize = stage.onResize(applyFov);

    const position = parseVec3(item.cameraPosition) ?? new Vector3(...LEGACY_GAUSSIAN_DEFAULT_VIEW.position);
    const target = parseVec3(item.cameraTarget) ?? new Vector3(...LEGACY_GAUSSIAN_DEFAULT_VIEW.target);
    const home = { position, target };

    stage.camera.position.copy(home.position);
    stage.camera.lookAt(home.target);
    stage.camera.updateMatrixWorld();
    stage.scene.add(spark, splat);
    stage.renderer.getDrawingBufferSize(spark.renderSize);

    await awaitWithAbort(
      spark.update({ scene: stage.scene, camera: stage.camera }),
      signal,
    );
    signal.throwIfAborted();

    return { home };
  } catch (error) {
    stopResize?.();
    stage.scene.remove(spark, splat);
    disposeSparkResources();
    throw error;
  }
}

export class GaussianRenderer implements MediaRenderer {
  private stage?: ThreeStage;
  private rig?: OrbitRig;
  private cleanup?: () => void;
  private loadState = "Idle";

  async mount(host: HTMLElement, item: MediaItem, ctx: RendererContext): Promise<void> {
    this.unmount();
    ctx.signal.throwIfAborted();
    const controller = new AbortController();
    const { signal } = controller;
    let stage: ThreeStage | undefined;
    let gestures: GestureInterpreter | undefined;
    let rig: OrbitRig | undefined;
    const cleanup = () => {
      if (this.cleanup !== cleanup) return;
      this.cleanup = undefined;
      ctx.signal.removeEventListener("abort", cleanup);
      controller.abort(ctx.signal.reason);
      rig?.dispose();
      gestures?.dispose();
      this.rig = undefined;
      this.stage = undefined;
      this.loadState = "Idle";
      stage?.dispose();
    };
    this.cleanup = cleanup;
    ctx.signal.addEventListener("abort", cleanup, { once: true });

    try {
      this.loadState = "Loading";
      stage = this.stage = new ThreeStage(host);
      ctx.requestDebugRefresh();
      const { home } = await prepareGaussianScene(stage, item, signal);
      signal.throwIfAborted();
      gestures = new GestureInterpreter(host, (event) => {
        if (event.kind === "start") ctx.reportInteraction();
      });
      const orbit = new OrbitRig(stage.camera, gestures);
      rig = this.rig = orbit;
      orbit.setHome(home.position, home.target);
      stage.onResize(() => ctx.requestDebugRefresh());
      stage.onFrame((dt) => orbit.update(dt));
      this.loadState = "Ready";
      ctx.requestDebugRefresh();
    } catch (error) {
      if (this.cleanup === cleanup) {
        cleanup();
        this.loadState = "Error";
        ctx.requestDebugRefresh();
      }
      throw error;
    }
  }

  unmount(): void {
    this.cleanup?.();
  }

  resetView(): void {
    this.rig?.reset();
  }

  debugEntries(): DebugEntry[] {
    const entries: DebugEntry[] = [];
    if (this.stage) {
      entries.push(
        { label: "Camera Position", value: this.stage.camera.position.toArray().join(",") },
        { label: "Camera Target", value: this.rig?.target.toArray().join(",") ?? "0,0,0" },
        { label: "Field of View", value: String(this.stage.camera.fov) },
      );
    }
    return [...entries, { label: "Load State", value: this.loadState }];
  }
}
