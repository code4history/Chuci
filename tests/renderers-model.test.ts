import { afterEach, expect, test, vi } from "vitest";
import {
  Box3, BoxGeometry, Group, Mesh, MeshPhongMaterial, ShaderMaterial, Texture, TextureLoader,
  Vector3, type BufferGeometry, type LoadingManager, type Scene, type WebGLRenderer,
} from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import type { MediaItem } from "../src/core/media-item";
import { ModelRenderer, prepareModelScene } from "../src/components/viewer/renderers/model-renderer";
import { ThreeStage } from "../src/components/viewer/renderers/three-stage";

const { render } = vi.hoisted(() => ({ render: vi.fn<(scene: Scene) => void>() }));
vi.mock("three", async (importOriginal) => ({
  ...await importOriginal<typeof import("three")>(),
  WebGLRenderer: class {
    readonly domElement: HTMLCanvasElement;
    readonly render = render;
    readonly setPixelRatio = vi.fn();
    readonly setSize = vi.fn();
    readonly dispose = vi.fn();
    readonly forceContextLoss = vi.fn();

    constructor({ canvas }: { canvas: HTMLCanvasElement }) {
      this.domElement = canvas;
    }
  },
}));

const item: MediaItem = {
  type: "3dmodel", url: "/model.obj", caption: "", thumbnailUrl: "",
  fitToContainer: false, debugMode: false,
};
const stages: ThreeStage[] = [];
const modelRenderers: ModelRenderer[] = [];

afterEach(() => {
  for (const stage of stages.splice(0)) stage.dispose();
  for (const renderer of modelRenderers.splice(0)) renderer.unmount();
  render.mockClear();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

function setup(width = 800, height = 600) {
  const host = document.createElement("div");
  host.getBoundingClientRect = () => new DOMRect(0, 0, width, height);
  document.body.append(host);
  const renderer = {
    dispose: vi.fn(),
    forceContextLoss: vi.fn(),
    render: vi.fn(),
    setPixelRatio: vi.fn(),
    setSize: vi.fn(),
    domElement: document.createElement("canvas"),
  };
  const stage = new ThreeStage(host, (canvas) => {
    renderer.domElement = canvas;
    return renderer as unknown as WebGLRenderer;
  });
  stages.push(stage);
  return { stage, host, renderer };
}

function fakeModel() {
  const original = new MeshPhongMaterial({ map: new Texture() });
  const mesh = new Mesh(new BoxGeometry(8, 6, 4), original);
  mesh.position.set(12, 20, 40);
  const object = new Group().add(mesh);
  vi.spyOn(OBJLoader.prototype, "parse").mockReturnValue(object);
  vi.stubGlobal("fetch", vi.fn(async () => new Response("# OBJ")));
  return { mesh, object, original };
}

const materialUrl = "https://example.test/models/scene.mtl";
const paintedTexture = "https://example.test/models/painted.png";
const missingTexture = "https://example.test/models/missing.png";
const paintedFace = "v 0 0 0\nv 2 0 0\nv 0 2 0\nv 0 0 2\nusemtl painted\nf 1 2 3";
const secondFace = "\nusemtl second\nf 1 3 4";
const modelMaterials = "newmtl painted\nmap_Kd painted.png\nnewmtl second\nmap_Kd missing.png";

function serveModelFiles(obj: string, mtl?: string) {
  vi.stubGlobal("fetch", vi.fn(async (url: string) => {
    if (url === item.url) return new Response(obj);
    if (url === materialUrl && mtl !== undefined) return new Response(mtl);
    return new Response(null, { status: 404 });
  }));
}

function mountModel(overrides: Partial<MediaItem> = {}) {
  const renderer = new ModelRenderer();
  modelRenderers.push(renderer);
  const host = document.createElement("div");
  document.body.append(host);
  const mounted = renderer.mount(host, { ...item, materialUrl, ...overrides }, {
    signal: new AbortController().signal,
    reportInteraction: vi.fn(),
    reportError: vi.fn(),
    requestDebugRefresh: vi.fn(),
  });
  return { renderer, mounted };
}

function renderedMesh() {
  const mesh = render.mock.lastCall?.[0].getObjectByProperty("isMesh", true);
  expect(mesh).toBeInstanceOf(Mesh);
  return mesh as Mesh<BufferGeometry, MeshPhongMaterial | MeshPhongMaterial[]>;
}

test("explicit camera coordinates take priority over fit-to-container", async () => {
  fakeModel();
  const { stage } = setup();
  const { home } = await prepareModelScene(stage, {
    ...item, fitToContainer: true, cameraPosition: "9,8,7", cameraTarget: "1,2,3",
  }, new AbortController().signal);
  expect(home.position.toArray()).toEqual([9, 8, 7]);
  expect(home.target.toArray()).toEqual([1, 2, 3]);
  expect(stage.camera.position.toArray()).toEqual([9, 8, 7]);
  expect(stage.camera.getWorldDirection(new Vector3()).distanceTo(
    home.target.clone().sub(home.position).normalize(),
  )).toBeLessThan(1e-10);
});

test("fit-to-container uses the horizontal field of view in a narrow viewport", async () => {
  const { object } = fakeModel();
  const { stage } = setup(100, 800);
  const { home } = await prepareModelScene(stage, {
    ...item, fitToContainer: true, cameraPosition: "invalid",
  }, new AbortController().signal);
  expect(home.position.toArray()).not.toEqual([3, 3, 3]);
  expect(home.target.toArray()).toEqual([0, 0, 0]);
  const { min, max } = new Box3().setFromObject(object);
  for (const x of [min.x, max.x])
    for (const y of [min.y, max.y])
      for (const z of [min.z, max.z]) {
        const projected = new Vector3(x, y, z).project(stage.camera);
        expect(Math.abs(projected.x)).toBeLessThanOrEqual(1);
        expect(Math.abs(projected.y)).toBeLessThanOrEqual(1);
        expect(Math.abs(projected.z)).toBeLessThanOrEqual(1);
      }
});

test("model normalization and default view preserve the legacy values", async () => {
  const { object } = fakeModel();
  const { stage } = setup();
  const { home } = await prepareModelScene(stage, item, new AbortController().signal);
  expect(home.position.toArray()).toEqual([3, 3, 3]);
  expect(home.target.toArray()).toEqual([0, 0, 0]);
  expect(stage.camera.fov).toBe(75);
  const box = new Box3().setFromObject(object);
  expect(box.getSize(new Vector3()).x).toBe(3);
  expect(box.getCenter(new Vector3()).length()).toBe(0);
});

test("OBJ can use an embedded MTL without external textures", async () => {
  fakeModel();
  const { stage } = setup();
  const materialUrl = "data:text/plain,newmtl%20plain%0AKd%200.5%200.5%200.5";
  vi.stubGlobal("fetch", vi.fn(async (url: string) => new Response(
    url === materialUrl ? "newmtl plain\nKd 0.5 0.5 0.5" : "# OBJ",
  )));
  await expect(prepareModelScene(stage, {
    ...item, materialUrl,
  }, new AbortController().signal)).resolves.toHaveProperty("home");
});

test("show-texture=false starts gray and restores the same original material", async () => {
  const { mesh, original } = fakeModel();
  const { stage } = setup();
  const { setTexture } = await prepareModelScene(stage, {
    ...item, showTexture: false,
  }, new AbortController().signal);
  const gray = mesh.material;
  expect(gray.map).toBeNull();
  expect(gray.color.getHex()).toBe(0xcccccc);
  setTexture(true);
  expect(mesh.material).toBe(original);
  setTexture(false);
  expect(mesh.material).toBe(gray);

  const releaseGray = vi.spyOn(gray, "dispose");
  const releaseOriginal = vi.spyOn(original, "dispose");
  const releaseTexture = vi.spyOn(original.map!, "dispose");
  stage.dispose();
  expect(releaseGray).toHaveBeenCalledOnce();
  expect(releaseOriginal).toHaveBeenCalledOnce();
  expect(releaseTexture).toHaveBeenCalledOnce();
});

test.each([
  { name: "unused", useSecond: false },
  { name: "used", useSecond: true },
])("mount renders the OBJ when a texture is missing ($name material)", async ({ useSecond }) => {
  serveModelFiles(useSecond ? paintedFace + secondFace : paintedFace, modelMaterials);
  const requestImage = vi.spyOn(HTMLImageElement.prototype, "src", "set").mockImplementation(function (
    this: HTMLImageElement, url,
  ) {
    queueMicrotask(() => this.dispatchEvent(new Event(url === missingTexture ? "error" : "load")));
  });
  const { mounted } = mountModel();
  await expect(mounted).resolves.toBeUndefined();
  await vi.waitFor(renderedMesh);
  const materials = [renderedMesh().material].flat();
  expect(materials[0].name).toBe("painted");
  expect(materials[0].map?.image).toBeInstanceOf(HTMLImageElement);
  if (useSecond) {
    expect(requestImage).toHaveBeenCalledWith(missingTexture);
    expect(materials).toHaveLength(2);
    expect(materials[1].map).toBeNull();
    expect(materials[1].color.getHex()).toBe(0xcccccc);
  } else {
    expect(requestImage).not.toHaveBeenCalledWith(missingTexture);
  }
});

test("prepareModelScene reports a required texture failure but keeps the gray fallback", async () => {
  serveModelFiles(paintedFace, modelMaterials);
  vi.spyOn(HTMLImageElement.prototype, "src", "set").mockImplementation(function (
    this: HTMLImageElement,
  ) {
    queueMicrotask(() => this.dispatchEvent(new Event("error")));
  });
  const { stage } = setup();
  const scene = await prepareModelScene(stage, { ...item, materialUrl }, new AbortController().signal);

  expect(scene.textureLoadFailed).toBe(true);
  const mesh = stage.scene.getObjectByProperty("isMesh", true) as Mesh<BufferGeometry, MeshPhongMaterial>;
  expect(mesh.material.map).toBeNull();
  expect(mesh.material.color.getHex()).toBe(0xcccccc);
});

test("prepareModelScene reports an MTL failure without rejecting the viewer scene", async () => {
  serveModelFiles(paintedFace);
  const { stage } = setup();
  const scene = await prepareModelScene(stage, { ...item, materialUrl }, new AbortController().signal);
  expect(scene.textureLoadFailed).toBe(true);
});

test("mount renders the OBJ in gray when the MTL returns 404", async () => {
  serveModelFiles(paintedFace);
  const { mounted, renderer } = mountModel();
  await expect(mounted).resolves.toBeUndefined();
  await vi.waitFor(renderedMesh);
  const [gray] = [renderedMesh().material].flat();
  expect(gray.map).toBeNull();
  expect(gray.color.getHex()).toBe(0xcccccc);
  renderer.mediaControls()[0].click();
  renderer.mediaControls()[0].click();
  expect(renderedMesh().material).toBe(gray);
});

test("mount with show-texture=false renders before the requested image finishes", async () => {
  serveModelFiles(paintedFace, modelMaterials);
  let image: HTMLImageElement | undefined;
  vi.spyOn(HTMLImageElement.prototype, "src", "set").mockImplementation(function (
    this: HTMLImageElement, url,
  ) {
    if (url === paintedTexture) image = this;
  });
  const { mounted, renderer } = mountModel({ showTexture: false });
  void mounted.catch(() => {});
  await vi.waitFor(() => expect(renderer.mediaControls()).toHaveLength(1));
  await expect(mounted).resolves.toBeUndefined();
  await vi.waitFor(renderedMesh);
  const mesh = renderedMesh();
  const [gray] = [mesh.material].flat();
  expect(gray.map).toBeNull();
  expect(gray.color.getHex()).toBe(0xcccccc);
  const [button] = renderer.mediaControls();
  button.click();
  image!.dispatchEvent(new Event("load"));
  await vi.waitFor(() => expect(mesh.material).not.toBe(gray));
  const [painted] = [mesh.material].flat();
  expect(painted.map?.image).toBe(image);
});

test("mount still rejects when the OBJ returns 404", async () => {
  serveModelFiles(paintedFace, modelMaterials);
  const { mounted } = mountModel({ url: "/missing.obj" });
  await expect(mounted).rejects.toThrow("Failed to load /missing.obj (HTTP 404)");
});

test("an aborted load does not install the model in the scene", async () => {
  fakeModel();
  const { stage } = setup();
  const controller = new AbortController();
  const pending = prepareModelScene(stage, item, controller.signal);
  controller.abort();
  await expect(pending).rejects.toMatchObject({ name: "AbortError" });
  expect(stage.scene.children).toEqual([]);
});

test("closing during texture load releases pending MTL textures", async () => {
  const { stage } = setup();
  serveModelFiles(paintedFace, modelMaterials);
  const texture = new Texture<HTMLImageElement>();
  const releaseTexture = vi.spyOn(texture, "dispose");
  let manager: LoadingManager | undefined;
  const load = vi.spyOn(TextureLoader.prototype, "load").mockImplementation(function (
    this: TextureLoader,
    url,
  ) {
    manager = this.manager;
    manager.itemStart(url);
    return texture;
  });
  const controller = new AbortController();
  const pending = prepareModelScene(stage, { ...item, materialUrl }, controller.signal);
  await vi.waitFor(() => expect(load.mock.calls[0]?.[0]).toBe(paintedTexture));
  controller.abort();
  await expect(pending).rejects.toMatchObject({ name: "AbortError" });
  load.mock.calls[0][1]?.(texture);
  manager!.itemEnd(paintedTexture);
  expect(stage.scene.children).toEqual([]);
  expect(releaseTexture).toHaveBeenCalledOnce();
});

test("dispose releases the context and shared scene resources once", () => {
  const { stage, host, renderer } = setup();
  const geometry = new BoxGeometry();
  const texture = new Texture();
  const material = new MeshPhongMaterial({ map: texture });
  const shader = new ShaderMaterial({ uniforms: { image: { value: [texture] } } });
  const releaseGeometry = vi.spyOn(geometry, "dispose");
  const releaseTexture = vi.spyOn(texture, "dispose");
  const releaseMaterial = vi.spyOn(material, "dispose");
  const releaseShader = vi.spyOn(shader, "dispose");
  stage.scene.add(new Mesh(geometry, [material, shader]), new Mesh(geometry, material));

  stage.dispose();
  stage.dispose();
  expect(renderer.dispose).toHaveBeenCalledOnce();
  expect(renderer.forceContextLoss).toHaveBeenCalledOnce();
  expect(releaseGeometry).toHaveBeenCalledOnce();
  expect(releaseTexture).toHaveBeenCalledOnce();
  expect(releaseMaterial).toHaveBeenCalledOnce();
  expect(releaseShader).toHaveBeenCalledOnce();
  expect(host.contains(renderer.domElement)).toBe(false);
  expect(stage.scene.children).toEqual([]);
});

test("capture renders immediately and bounds the image while preserving the aspect", async () => {
  const { stage, renderer } = setup();
  renderer.domElement.width = 800;
  renderer.domElement.height = 600;
  const drawImage = vi.fn();
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(
    { drawImage } as unknown as CanvasRenderingContext2D,
  );
  const expected = new Blob(["thumbnail"], { type: "image/png" });
  vi.spyOn(HTMLCanvasElement.prototype, "toBlob").mockImplementation((callback) => callback(expected));

  await expect(stage.capture(200)).resolves.toBe(expected);
  expect(renderer.render).toHaveBeenCalledWith(stage.scene, stage.camera);
  expect(drawImage).toHaveBeenCalledWith(renderer.domElement, 0, 0, 200, 150);
});
