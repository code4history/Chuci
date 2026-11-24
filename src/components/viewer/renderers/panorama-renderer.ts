import { BackSide, Mesh, MeshBasicMaterial, SphereGeometry, SRGBColorSpace, Texture } from "three";
import { GestureInterpreter } from "@/core/gesture";
import type { MediaItem } from "@/core/media-item";
import { LookRig, PANORAMA_INITIAL, resetPanoramaCamera } from "./look-rig";
import { ThreeStage } from "./three-stage";
import type { DebugEntry, MediaRenderer, RendererContext } from "./types";

function loadPanoramaImage(
  document: Document,
  url: string,
  signal: AbortSignal,
): Promise<HTMLImageElement> {
  const image = document.createElement("img");
  image.crossOrigin = "anonymous";
  return new Promise((resolve, reject) => {
    const cleanup = () => {
      signal.removeEventListener("abort", abort);
      image.onload = null;
      image.onerror = null;
    };
    const abort = () => {
      cleanup();
      image.removeAttribute("src");
      reject(signal.reason);
    };
    image.onload = () => {
      cleanup();
      resolve(image);
    };
    image.onerror = () => {
      cleanup();
      reject(new Error(`Failed to load panorama: ${url}`));
    };
    signal.addEventListener("abort", abort, { once: true });
    image.setAttribute("src", url);
  });
}

export async function preparePanoramaScene(
  stage: ThreeStage,
  item: MediaItem,
  signal: AbortSignal,
): Promise<void> {
  signal.throwIfAborted();
  if (!item.url) throw new Error("No panorama URL provided");
  const image = await loadPanoramaImage(stage.renderer.domElement.ownerDocument, item.url, signal);
  signal.throwIfAborted();

  const texture = new Texture(image);
  texture.colorSpace = SRGBColorSpace;
  texture.needsUpdate = true;
  const sky = new Mesh(
    new SphereGeometry(500, 64, 32),
    new MeshBasicMaterial({ map: texture, side: BackSide, toneMapped: false }),
  );
  // Preserve the legacy sky's UV direction when viewed from inside.
  sky.scale.x = -1;
  resetPanoramaCamera(stage.camera);
  stage.scene.add(sky);
}

export class PanoramaRenderer implements MediaRenderer {
  private rig?: LookRig;
  private cleanup?: () => void;
  private loadState = "Idle";

  async mount(host: HTMLElement, item: MediaItem, ctx: RendererContext): Promise<void> {
    this.unmount();
    ctx.signal.throwIfAborted();
    const controller = new AbortController();
    const { signal } = controller;
    let stage: ThreeStage | undefined;
    let gestures: GestureInterpreter | undefined;
    let rig: LookRig | undefined;
    const cleanup = () => {
      if (this.cleanup !== cleanup) return;
      this.cleanup = undefined;
      ctx.signal.removeEventListener("abort", cleanup);
      controller.abort(ctx.signal.reason);
      rig?.dispose();
      gestures?.dispose();
      this.rig = undefined;
      this.loadState = "Idle";
      stage?.dispose();
    };
    this.cleanup = cleanup;
    ctx.signal.addEventListener("abort", cleanup, { once: true });

    try {
      this.loadState = "Loading";
      stage = new ThreeStage(host);
      ctx.requestDebugRefresh();
      await preparePanoramaScene(stage, item, signal);
      signal.throwIfAborted();
      gestures = new GestureInterpreter(host, (event) => {
        if (event.kind === "start") ctx.reportInteraction();
      });
      const look = new LookRig(stage.camera, gestures);
      rig = this.rig = look;
      stage.onFrame((dt) => look.update(dt));
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
    if (this.rig || this.loadState === "Loading") {
      const { yawDeg, pitchDeg, fovDeg } = this.rig ?? PANORAMA_INITIAL;
      entries.push(
        { label: "Camera Orientation", value: [yawDeg, pitchDeg].join(",") },
        { label: "Field of View", value: String(fovDeg) },
      );
    }
    return [...entries, { label: "Load State", value: this.loadState }];
  }
}
