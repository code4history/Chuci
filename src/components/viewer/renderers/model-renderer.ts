import {
  AmbientLight, Box3, DirectionalLight, Group, LoadingManager, Material, MathUtils,
  Matrix4, Mesh, MeshPhongMaterial, Object3D, PerspectiveCamera, Texture, Vector3,
} from "three";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { GestureInterpreter } from "@/core/gesture";
import type { MediaItem } from "@/core/media-item";
import { fetchThumbnailSource, loadThumbnailImage, ThumbnailSourceTooLargeError } from "@/thumbnails/source";
import { OrbitRig, parseVec3 } from "./orbit-rig";
import { disposeThreeResources, ThreeStage } from "./three-stage";
import type { DebugEntry, MediaRenderer, RendererContext } from "./types";

type HomeView = { position: Vector3; target: Vector3 };
type ModelScene = { home: HomeView; setTexture(on: boolean): void; textureLoadFailed: boolean };

const defaultPosition = new Vector3(3, 3, 3);

export function fitCameraToObject(camera: PerspectiveCamera, object: Object3D): HomeView {
  const bounds = new Box3().setFromObject(object);
  const target = bounds.getCenter(new Vector3());
  if (bounds.isEmpty()) return { position: defaultPosition.clone(), target };

  const back = defaultPosition.clone().normalize();
  const basis = new Matrix4().lookAt(back, new Vector3(), camera.up);
  const right = new Vector3().setFromMatrixColumn(basis, 0);
  const up = new Vector3().setFromMatrixColumn(basis, 1);
  const tanHalfFov = Math.tan(MathUtils.degToRad(camera.getEffectiveFOV() / 2));
  const tanHalfHorizontalFov = tanHalfFov * camera.aspect;
  const { min, max } = bounds;
  const corner = new Vector3();
  let distance = camera.near;
  // Fit each corner in camera space, with a small margin around the bounds.
  for (const x of [min.x, max.x]) {
    for (const y of [min.y, max.y]) {
      for (const z of [min.z, max.z]) {
        corner.set(x, y, z).sub(target);
        const depth = Math.max(
          camera.near,
          Math.abs(corner.dot(right)) / tanHalfHorizontalFov,
          Math.abs(corner.dot(up)) / tanHalfFov,
        );
        distance = Math.max(distance, corner.dot(back) + depth * 1.05);
      }
    }
  }
  return { position: target.clone().addScaledVector(back, distance), target };
}

async function fetchText(url: string, signal: AbortSignal): Promise<string> {
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`Failed to load ${url} (HTTP ${response.status})`);
  return response.text();
}

async function loadModelMaterials(
  url: string,
  baseURI: string,
  signal: AbortSignal,
  readText: (url: string) => Promise<string>,
): Promise<MTLLoader.MaterialCreator | undefined> {
  try {
    const source = await readText(url);
    const resolvedUrl = new URL(url, baseURI);
    const basePath = resolvedUrl.protocol === "data:" || resolvedUrl.protocol === "blob:"
      ? "" : new URL(".", resolvedUrl).href;
    return new MTLLoader(new LoadingManager()).parse(source, basePath);
  } catch (error) {
    signal.throwIfAborted();
    if (error instanceof ThumbnailSourceTooLargeError) throw error;
    return undefined;
  }
}

function trackMaterialTextures(
  materials: MTLLoader.MaterialCreator,
  thumbnail?: { document: Document; signal: AbortSignal; showTexture: boolean },
) {
  const pending: Promise<void>[] = [];
  const failed = new Set<Texture>();
  const loadTexture = materials.loadTexture.bind(materials);
  materials.loadTexture = (url, mapping) => {
    if (thumbnail) {
      const texture = new Texture();
      if (mapping !== undefined) texture.mapping = mapping;
      if (thumbnail.showTexture) {
        pending.push(loadThumbnailImage(thumbnail.document, url, thumbnail.signal).then(
          (image) => {
            texture.image = image;
            texture.needsUpdate = true;
          },
          () => { failed.add(texture); },
        ));
      }
      return texture;
    }
    let complete!: (loaded: boolean) => void;
    const loaded = new Promise<boolean>((resolve) => { complete = resolve; });
    let texture: Texture;
    try {
      texture = loadTexture(url, mapping, () => complete(true), undefined, () => complete(false));
    } catch {
      texture = new Texture();
      complete(false);
    }
    pending.push(loaded.then((success) => {
      if (!success) failed.add(texture);
    }));
    return texture;
  };
  return { pending, failed };
}

function waitForTextures(
  pending: Promise<void>[],
  signal: AbortSignal,
): Promise<void> {
  return new Promise((resolve) => {
    const finish = () => {
      signal.removeEventListener("abort", finish);
      resolve();
    };
    signal.addEventListener("abort", finish, { once: true });
    void Promise.all(pending).then(finish);
  });
}

function normalizeModel(object: Group): void {
  const box = new Box3().setFromObject(object);
  const { x, y, z } = box.getSize(new Vector3());
  const maxDimension = Math.max(x, y, z);
  if (maxDimension > 0) object.scale.multiplyScalar(3 / maxDimension);
  object.position.addScaledVector(box.getCenter(new Vector3()), -object.scale.x);
}

export async function prepareModelScene(
  stage: ThreeStage,
  item: MediaItem,
  signal: AbortSignal,
  forThumbnail = false,
): Promise<ModelScene> {
  signal.throwIfAborted();
  if (!item.url) throw new Error("No model URL provided");
  const { materialUrl } = item;
  const { ownerDocument, baseURI } = stage.renderer.domElement;
  const readText = async (url: string) => forThumbnail
    ? (await fetchThumbnailSource(url, signal)).text()
    : fetchText(url, signal);
  const [source, materials] = await Promise.all([
    readText(item.url),
    materialUrl ? loadModelMaterials(materialUrl, baseURI, signal, readText) : undefined,
  ]);
  signal.throwIfAborted();

  const loader = new OBJLoader();
  const textures = materials && trackMaterialTextures(materials, forThumbnail
    ? { document: ownerDocument, signal, showTexture: item.showTexture !== false }
    : undefined);
  if (materials) loader.setMaterials(materials);
  const retainedMaterials = new Set<Material>();
  let object: Group | undefined;
  try {
    try {
      // OBJLoader creates only the materials referenced by the geometry.
      object = loader.parse(source);
    } finally {
      if (materials) {
        for (const material of Object.values(materials.materials)) retainedMaterials.add(material);
      }
    }
    normalizeModel(object);

    const position = parseVec3(item.cameraPosition);
    const target = parseVec3(item.cameraTarget);
    const home = !position && !target && item.fitToContainer
      ? fitCameraToObject(stage.camera, object)
      : { position: position ?? defaultPosition.clone(), target: target ?? new Vector3() };

    const originalMaterials = new Map<Mesh, Material | Material[]>();
    object.traverse((node) => {
      if (!(node instanceof Mesh)) return;
      const material: Material | Material[] = node.material;
      originalMaterials.set(node, material);
      for (const entry of Array.isArray(material) ? material : [material]) retainedMaterials.add(entry);
    });
    const untextured = new MeshPhongMaterial({ color: 0xcccccc });
    retainedMaterials.add(untextured);
    const missingMaterials = Boolean(materialUrl && !materials);
    let texturesReady = !textures?.pending.length;
    let textureOn = item.showTexture !== false;
    const displayMaterial = (material: Material): Material =>
      Object.values(material).some((value) => value instanceof Texture && textures?.failed.has(value))
        ? untextured : material;
    const setTexture = (on: boolean): void => {
      textureOn = on;
      for (const [mesh, material] of originalMaterials) {
        if (!on || missingMaterials || !texturesReady) {
          mesh.material = untextured;
        } else if (!textures?.failed.size) {
          mesh.material = material;
        } else {
          mesh.material = Array.isArray(material) ? material.map(displayMaterial) : displayMaterial(material);
        }
      }
    };
    setTexture(textureOn);
    signal.throwIfAborted();
    if (textures && !texturesReady) {
      const ready = waitForTextures(textures.pending, signal).then(() => {
        if (signal.aborted) return;
        texturesReady = true;
        if (textureOn) setTexture(true);
      });
      // Wait only if the initial view (including a thumbnail capture) needs the textures.
      if (textureOn) await ready;
      signal.throwIfAborted();
    }

    const light = new DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1);
    stage.camera.position.copy(home.position);
    stage.camera.lookAt(home.target);
    stage.camera.updateMatrixWorld();
    stage.scene.add(new AmbientLight(0x404040, 2), light, object);
    for (const material of retainedMaterials) stage.retainMaterial(material);
    return {
      home,
      setTexture,
      textureLoadFailed: missingMaterials || Boolean(textures?.failed.size),
    };
  } catch (error) {
    disposeThreeResources(object, retainedMaterials);
    throw error;
  }
}

export class ModelRenderer implements MediaRenderer {
  private stage?: ThreeStage;
  private rig?: OrbitRig;
  private textureButton?: HTMLButtonElement;
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
      this.textureButton?.remove();
      this.textureButton = undefined;
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
      const { home, setTexture } = await prepareModelScene(stage, item, signal);
      signal.throwIfAborted();
      gestures = new GestureInterpreter(host, (event) => {
        if (event.kind === "start") ctx.reportInteraction();
      });
      const orbit = new OrbitRig(stage.camera, gestures);
      rig = this.rig = orbit;
      orbit.setHome(home.position, home.target);
      stage.onFrame((dt) => orbit.update(dt));

      const button = host.ownerDocument.createElement("button");
      button.type = "button";
      let textureOn = item.showTexture !== false;
      const updateButton = () => {
        button.textContent = textureOn ? "Texture: ON" : "Texture: OFF";
        button.setAttribute("aria-pressed", String(textureOn));
      };
      updateButton();
      button.addEventListener("click", () => {
        textureOn = !textureOn;
        setTexture(textureOn);
        updateButton();
        ctx.reportInteraction();
      }, { signal });
      this.textureButton = button;
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

  mediaControls(): HTMLElement[] {
    return this.textureButton ? [this.textureButton] : [];
  }
}
