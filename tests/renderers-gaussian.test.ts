import { afterEach, expect, test, vi } from "vitest";
import {
  Vector2, Vector3,
  type Scene, type WebGLRenderer,
} from "three";
import type { MediaItem } from "../src/core/media-item";
import {
  LEGACY_GAUSSIAN_DEFAULT_VIEW, GaussianRenderer, prepareGaussianScene,
} from "../src/components/viewer/renderers/gaussian-renderer";
import { ThreeStage } from "../src/components/viewer/renderers/three-stage";

const state = vi.hoisted(() => ({
  sparkModuleImports: 0,
  sparkUpdates: [] as Array<{ scene: Scene; camera: unknown }>,
  sparkDisposes: 0,
  splatDisposes: 0,
  splatOptions: [] as Array<Record<string, unknown>>,
  splats: [] as Array<{ quaternion: { toArray(): number[] }; initialized: Promise<unknown>; dispose(): void }>,
  initDeferred: false,
  resolveInit: undefined as (() => void) | undefined,
  rejectInit: undefined as ((error: unknown) => void) | undefined,
}));

const { render } = vi.hoisted(() => ({ render: vi.fn<(scene: Scene) => void>() }));

vi.mock("three", async (importOriginal) => ({
  ...await importOriginal<typeof import("three")>(),
  WebGLRenderer: class {
    readonly domElement: HTMLCanvasElement;
    readonly render = render;
    readonly setPixelRatio = vi.fn();
    readonly setSize = vi.fn();
    readonly getDrawingBufferSize = vi.fn((target: Vector2) => target.set(800, 600));
    readonly dispose = vi.fn();
    readonly forceContextLoss = vi.fn();

    constructor({ canvas }: { canvas: HTMLCanvasElement }) {
      this.domElement = canvas;
    }
  },
}));

vi.mock("@sparkjsdev/spark", async () => {
  const { BufferGeometry, Mesh, Object3D, ShaderMaterial, Vector2 } = await import("three");
  state.sparkModuleImports += 1;

  class MockSparkRenderer extends Mesh {
    readonly renderSize = new Vector2();

    constructor(_options: { renderer: unknown }) {
      super(new BufferGeometry(), new ShaderMaterial());
    }

    async update(params: { scene: unknown; camera: unknown }): Promise<void> {
      state.sparkUpdates.push(params as { scene: Scene; camera: unknown });
    }

    dispose(): void {
      state.sparkDisposes += 1;
      this.geometry.dispose();
      (this.material as { dispose(): void }).dispose();
    }
  }

  class MockSplatMesh extends Object3D {
    readonly initialized: Promise<MockSplatMesh>;

    constructor(options: Record<string, unknown> = {}) {
      super();
      state.splatOptions.push(options);
      state.splats.push(this);
      if (state.initDeferred) {
        this.initialized = new Promise<MockSplatMesh>((resolve, reject) => {
          state.resolveInit = () => resolve(this);
          state.rejectInit = reject;
        });
      } else {
        this.initialized = Promise.resolve(this);
      }
    }

    dispose(): void {
      state.splatDisposes += 1;
    }
  }

  return {
    SparkRenderer: MockSparkRenderer,
    SplatMesh: MockSplatMesh,
    SplatFileType: {
      PLY: "ply",
      SPZ: "spz",
      SPLAT: "splat",
      KSPLAT: "ksplat",
      PCSOGS: "pcsogs",
      PCSOGSZIP: "pcsogszip",
      RAD: "rad",
    },
    getSplatFileType: () => undefined,
  };
});

const item: MediaItem = {
  type: "gaussian",
  url: "/scene.splat",
  caption: "",
  thumbnailUrl: "",
  fitToContainer: false,
  debugMode: false,
};

const stages: ThreeStage[] = [];
const gaussianRenderers: GaussianRenderer[] = [];

afterEach(() => {
  for (const stage of stages.splice(0)) stage.dispose();
  for (const renderer of gaussianRenderers.splice(0)) renderer.unmount();
  render.mockClear();
  state.sparkUpdates.length = 0;
  state.sparkDisposes = 0;
  state.splatDisposes = 0;
  state.splatOptions.length = 0;
  state.splats.length = 0;
  state.initDeferred = false;
  state.resolveInit = undefined;
  state.rejectInit = undefined;
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
    getDrawingBufferSize: vi.fn((target: Vector2) => target.set(width, height)),
    domElement: document.createElement("canvas"),
  };
  const stage = new ThreeStage(host, (canvas) => {
    renderer.domElement = canvas;
    return renderer as unknown as WebGLRenderer;
  });
  stages.push(stage);
  return { stage, host, renderer };
}

function stubSplatFetch(bytes = new Uint8Array(32)) {
  const fetchMock = vi.fn(async () => new Response(bytes));
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

test("no camera attrs uses LEGACY_GAUSSIAN_DEFAULT_VIEW", async () => {
  stubSplatFetch();
  const { stage } = setup();
  const { home } = await prepareGaussianScene(stage, item, new AbortController().signal);

  expect(LEGACY_GAUSSIAN_DEFAULT_VIEW.position).toEqual([
    2.1036774620197414,
    2.397127693021015,
    3.8507557646703496,
  ]);
  expect(LEGACY_GAUSSIAN_DEFAULT_VIEW.target).toEqual([0, 0, 0]);

  expect(home.position.toArray()).toEqual(LEGACY_GAUSSIAN_DEFAULT_VIEW.position);
  expect(home.target.toArray()).toEqual(LEGACY_GAUSSIAN_DEFAULT_VIEW.target);
  expect(stage.camera.position.toArray()).toEqual(LEGACY_GAUSSIAN_DEFAULT_VIEW.position);
  expect(
    stage.camera.getWorldDirection(new Vector3()).distanceTo(
      home.target.clone().sub(home.position).normalize(),
    ),
  ).toBeLessThan(1e-10);

  // OpenCV (+Y down, +Z forward) splat data must be rotated 180° around X into Three (+Y up, -Z forward).
  expect(state.splats).toHaveLength(1);
  expect(state.splats[0].quaternion.toArray()).toEqual([1, 0, 0, 0]);
  expect(stage.scene.children).toContain(state.splats[0]);
  expect(state.sparkUpdates).toHaveLength(1);
});

test("camera-position and camera-target are applied", async () => {
  stubSplatFetch();
  const { stage } = setup();
  const { home } = await prepareGaussianScene(
    stage,
    { ...item, cameraPosition: "9,8,7", cameraTarget: "1,2,3" },
    new AbortController().signal,
  );
  expect(home.position.toArray()).toEqual([9, 8, 7]);
  expect(home.target.toArray()).toEqual([1, 2, 3]);
  expect(stage.camera.position.toArray()).toEqual([9, 8, 7]);
  expect(
    stage.camera.getWorldDirection(new Vector3()).distanceTo(
      home.target.clone().sub(home.position).normalize(),
    ),
  ).toBeLessThan(1e-10);
});

test("partial or invalid camera attrs fall back to LEGACY_GAUSSIAN_DEFAULT_VIEW", async () => {
  stubSplatFetch();
  const { stage } = setup();
  const { home } = await prepareGaussianScene(
    stage,
    { ...item, cameraPosition: "1,2,3", cameraTarget: "invalid" },
    new AbortController().signal,
  );
  expect(home.position.toArray()).toEqual([1, 2, 3]);
  expect(home.target.toArray()).toEqual(LEGACY_GAUSSIAN_DEFAULT_VIEW.target);
});

test("registry loads gaussian renderer lazily", async () => {
  vi.resetModules();
  state.sparkModuleImports = 0;
  vi.doMock("@sparkjsdev/spark", async () => {
    state.sparkModuleImports += 1;
    const { BufferGeometry, Mesh, Object3D, ShaderMaterial, Vector2 } = await import("three");
    return {
      SparkRenderer: class extends Mesh {
        readonly renderSize = new Vector2();
        constructor() { super(new BufferGeometry(), new ShaderMaterial()); }
        async update() {}
        dispose() {}
      },
      SplatMesh: class extends Object3D {
        initialized = Promise.resolve(this);
        dispose() {}
      },
      SplatFileType: { SPLAT: "splat" },
      getSplatFileType: () => undefined,
    };
  });

  const { createRenderer } = await import("../src/components/viewer/renderers/registry");
  const imageRenderer = await createRenderer("image");
  imageRenderer.unmount();
  expect(state.sparkModuleImports).toBe(0);

  const gaussianRenderer = await createRenderer("gaussian");
  gaussianRenderer.unmount();
  expect(state.sparkModuleImports).toBe(1);
});

test("an aborted load does not install the splat in the scene and disposes resources", async () => {
  stubSplatFetch();
  state.initDeferred = true;
  const { stage } = setup();
  const controller = new AbortController();
  const pending = prepareGaussianScene(stage, item, controller.signal);
  await vi.waitFor(() => expect(state.splats).toHaveLength(1));
  controller.abort();
  state.resolveInit?.();
  await expect(pending).rejects.toMatchObject({ name: "AbortError" });
  expect(stage.scene.children).toEqual([]);
  expect(state.splatDisposes).toBe(1);
  expect(state.sparkDisposes).toBe(1);
});

test("stage.dispose releases SparkRenderer and SplatMesh resources", async () => {
  stubSplatFetch();
  const { stage } = setup();
  await prepareGaussianScene(stage, item, new AbortController().signal);
  stage.dispose();
  expect(state.splatDisposes).toBe(1);
  expect(state.sparkDisposes).toBe(1);
});

test("GaussianRenderer mounts, reports debug entries, resets view, and cleans up on unmount", async () => {
  stubSplatFetch();
  const renderer = new GaussianRenderer();
  gaussianRenderers.push(renderer);
  const host = document.createElement("div");
  host.getBoundingClientRect = () => new DOMRect(0, 0, 800, 600);
  document.body.append(host);

  const reportInteraction = vi.fn();
  const requestDebugRefresh = vi.fn();
  await renderer.mount(
    host,
    { ...item, cameraPosition: "4,5,6", cameraTarget: "0,1,0" },
    {
      signal: new AbortController().signal,
      reportInteraction,
      reportError: vi.fn(),
      requestDebugRefresh,
    },
  );

  const entries = renderer.debugEntries();
  expect(entries.map((entry) => entry.label)).toEqual([
    "Camera Position",
    "Camera Target",
    "Field of View",
    "Load State",
  ]);
  expect(entries[0].value).toBe("4,5,6");
  expect(entries[1].value).toBe("0,1,0");
  expect(Number(entries[2].value)).toBeCloseTo(29.68634584605771, 4);
  expect(entries[3].value).toBe("Ready");
  expect(requestDebugRefresh).toHaveBeenCalled();

  host.dispatchEvent(new PointerEvent("pointerdown", { pointerId: 1, clientX: 0, clientY: 0 }));
  host.dispatchEvent(new PointerEvent("pointermove", { pointerId: 1, clientX: 20, clientY: 10 }));
  host.dispatchEvent(new PointerEvent("pointerup", { pointerId: 1, clientX: 20, clientY: 10 }));
  expect(reportInteraction).toHaveBeenCalled();

  renderer.unmount();
  expect(state.splatDisposes).toBe(1);
  expect(state.sparkDisposes).toBe(1);
  expect(renderer.debugEntries()).toEqual([{ label: "Load State", value: "Idle" }]);
});

test("Gaussian scene computes vertical fov from CSS pixel height (578px -> ~28.64°, 680px -> ~33.44°) and ignores devicePixelRatio", async () => {
  stubSplatFetch();
  let resizeCallback: ResizeObserverCallback | undefined;
  class TestResizeObserver {
    constructor(cb: ResizeObserverCallback) {
      resizeCallback = cb;
    }
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  vi.stubGlobal("ResizeObserver", TestResizeObserver);
  vi.stubGlobal("devicePixelRatio", 2);

  let currentWidth = 1080;
  let currentHeight = 578;
  const host = document.createElement("div");
  host.getBoundingClientRect = () => new DOMRect(0, 0, currentWidth, currentHeight);
  document.body.append(host);
  const mockRenderer = {
    dispose: vi.fn(),
    forceContextLoss: vi.fn(),
    render: vi.fn(),
    setPixelRatio: vi.fn(),
    setSize: vi.fn(),
    getDrawingBufferSize: vi.fn((target: Vector2) =>
      target.set(currentWidth * 2, currentHeight * 2),
    ),
    domElement: document.createElement("canvas"),
  };
  const stage = new ThreeStage(host, (canvas) => {
    mockRenderer.domElement = canvas;
    return mockRenderer as unknown as WebGLRenderer;
  });
  stages.push(stage);

  const updateProjectionMatrix = vi.spyOn(stage.camera, "updateProjectionMatrix");
  await prepareGaussianScene(stage, item, new AbortController().signal);
  expect(Math.abs(stage.camera.fov - 28.64)).toBeLessThan(0.01);
  expect(updateProjectionMatrix).toHaveBeenCalled();

  updateProjectionMatrix.mockClear();
  currentHeight = 680;
  resizeCallback?.([], {} as ResizeObserver);
  expect(updateProjectionMatrix).toHaveBeenCalled();
  expect(Math.abs(stage.camera.fov - 33.44)).toBeLessThan(0.01);
});

test("Gaussian thumbnails use a fixed CSS height at different output resolutions", async () => {
  stubSplatFetch();
  const { generateThumbnail } = await import("../src/thumbnails/generate");
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (this: HTMLElement) {
    return new DOMRect(0, 0, parseFloat(this.style.width), parseFloat(this.style.height));
  });
  const projectedViews: Array<{ fov: number; aspect: number; maxSize: number }> = [];
  const { ThreeStage: ThumbnailStage } = await import("../src/components/viewer/renderers/three-stage");
  vi.spyOn(ThumbnailStage.prototype, "capture").mockImplementation(function (this: ThreeStage, maxSize) {
    const { fov, aspect } = this.camera;
    projectedViews.push({ fov, aspect, maxSize });
    return Promise.resolve(new Blob());
  });

  await generateThumbnail(item, { maxSize: 128 });
  await generateThumbnail(item, { maxSize: 256 });

  const fov = 2 * Math.atan(720 / (2 * 1132)) * (180 / Math.PI);
  expect(projectedViews).toEqual([
    { fov: expect.closeTo(fov, 6), aspect: 1, maxSize: 128 },
    { fov: expect.closeTo(fov, 6), aspect: 1, maxSize: 256 },
  ]);
});

test("GaussianRenderer refreshes debug Field of View on viewport height resize", async () => {
  stubSplatFetch();
  let resizeCallback: ResizeObserverCallback | undefined;
  class TestResizeObserver {
    constructor(cb: ResizeObserverCallback) {
      resizeCallback = cb;
    }
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  vi.stubGlobal("ResizeObserver", TestResizeObserver);

  const renderer = new GaussianRenderer();
  gaussianRenderers.push(renderer);
  let currentHeight = 578;
  const host = document.createElement("div");
  host.getBoundingClientRect = () => new DOMRect(0, 0, 1080, currentHeight);
  document.body.append(host);

  const requestDebugRefresh = vi.fn();
  await renderer.mount(host, item, {
    signal: new AbortController().signal,
    reportInteraction: vi.fn(),
    reportError: vi.fn(),
    requestDebugRefresh,
  });

  const fovBefore = Number(renderer.debugEntries().find((e) => e.label === "Field of View")?.value);
  expect(Math.abs(fovBefore - 28.64)).toBeLessThan(0.01);

  requestDebugRefresh.mockClear();
  currentHeight = 680;
  resizeCallback?.([], {} as ResizeObserver);

  const fovAfter = Number(renderer.debugEntries().find((e) => e.label === "Field of View")?.value);
  expect(Math.abs(fovAfter - 33.44)).toBeLessThan(0.01);
  expect(requestDebugRefresh).toHaveBeenCalled();
});
