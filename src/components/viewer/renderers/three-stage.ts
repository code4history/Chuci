import {
  BufferGeometry, Color, Material, Object3D, PerspectiveCamera, Scene,
  ShaderMaterial, Texture, WebGLRenderer,
} from "three";

/** Release shared resources once, including materials retained for later use. */
export function disposeThreeResources(
  root: Object3D | undefined,
  retainedMaterials: Iterable<Material>,
): void {
  const geometries = new Set<BufferGeometry>();
  const materials = new Set(retainedMaterials);
  const textures = new Set<Texture>();
  root?.traverse((object: Object3D & {
    geometry?: BufferGeometry;
    material?: Material | Material[];
  }) => {
    if (object.geometry) geometries.add(object.geometry);
    if (Array.isArray(object.material)) {
      for (const material of object.material) materials.add(material);
    } else if (object.material) {
      materials.add(object.material);
    }
  });
  const collectTexture = (value: unknown): void => {
    if (value instanceof Texture) textures.add(value);
  };
  if (root instanceof Scene) {
    collectTexture(root.background);
    collectTexture(root.environment);
  }
  for (const material of materials) {
    for (const value of Object.values(material)) collectTexture(value);
    if (material instanceof ShaderMaterial) {
      for (const { value } of Object.values(material.uniforms)) {
        if (Array.isArray(value)) value.forEach(collectTexture);
        else collectTexture(value);
      }
    }
    material.dispose();
  }
  for (const texture of textures) texture.dispose();
  for (const geometry of geometries) geometry.dispose();
}

export class ThreeStage {
  readonly scene = new Scene();
  readonly camera = new PerspectiveCamera(75, 1, 0.1, 1000);
  readonly renderer: WebGLRenderer;

  private readonly view: Window;
  private readonly resizeObserver: ResizeObserver;
  private readonly frameCallbacks = new Set<(dt: number) => void>();
  private readonly resizeCallbacks = new Set<(width: number, height: number) => void>();
  private readonly retainedMaterials = new Set<Material>();
  private frameId = 0;
  private previousTime?: number;
  private width = 0;
  private height = 0;
  private pixelRatio = 0;
  private disposed = false;

  constructor(
    private readonly host: HTMLElement,
    createRenderer = (canvas: HTMLCanvasElement) =>
      new WebGLRenderer({ canvas, antialias: true }),
  ) {
    this.view = host.ownerDocument.defaultView ?? window;
    const canvas = host.ownerDocument.createElement("canvas");
    this.renderer = createRenderer(canvas);
    this.scene.background = new Color(0x000000);
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    host.append(canvas);

    this.resize();
    this.resizeObserver = new ResizeObserver(this.resize);
    this.resizeObserver.observe(host);
    this.frameId = this.view.requestAnimationFrame(this.drawFrame);
  }

  get size(): { width: number; height: number } {
    return { width: this.width, height: this.height };
  }

  /** Register a callback that runs before rendering. The elapsed time is in seconds. */
  onFrame(cb: (dt: number) => void): void {
    this.frameCallbacks.add(cb);
  }

  /** Register a callback that runs when the viewport CSS dimensions change. */
  onResize(cb: (width: number, height: number) => void): () => void {
    this.resizeCallbacks.add(cb);
    return () => {
      this.resizeCallbacks.delete(cb);
    };
  }

  retainMaterial(material: Material): void {
    this.retainedMaterials.add(material);
  }

  async capture(maxSize: number): Promise<Blob> {
    if (this.disposed) throw new Error("The 3D stage was disposed");
    const limit = Math.floor(maxSize);
    if (!Number.isFinite(limit) || limit < 1) throw new RangeError("Invalid capture size");

    this.resize();
    this.renderer.render(this.scene, this.camera);
    const source = this.renderer.domElement;
    const scale = Math.min(1, limit / Math.max(source.width, source.height));
    const output = this.host.ownerDocument.createElement("canvas");
    output.width = Math.max(1, Math.round(source.width * scale));
    output.height = Math.max(1, Math.round(source.height * scale));
    const ctx = output.getContext("2d");
    if (!ctx) throw new Error("Could not create a capture canvas");
    // Read before WebGL clears its drawing buffer for the next frame.
    ctx.drawImage(source, 0, 0, output.width, output.height);
    return new Promise((resolve, reject) => {
      output.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Could not capture the 3D stage"));
      });
    });
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    this.view.cancelAnimationFrame(this.frameId);
    this.resizeObserver.disconnect();
    this.frameCallbacks.clear();
    this.resizeCallbacks.clear();
    try {
      disposeThreeResources(this.scene, this.retainedMaterials);
    } finally {
      this.retainedMaterials.clear();
      this.scene.clear();
      this.scene.background = null;
      this.scene.environment = null;
      try {
        this.renderer.dispose();
      } finally {
        try {
          this.renderer.forceContextLoss();
        } finally {
          this.renderer.domElement.remove();
        }
      }
    }
  }

  private readonly resize = (): void => {
    if (this.disposed) return;
    const { width, height } = this.host.getBoundingClientRect();
    const pixelRatio = this.view.devicePixelRatio || 1;
    if (width <= 0 || height <= 0) return;
    if (width === this.width && height === this.height && pixelRatio === this.pixelRatio) return;
    const sizeChanged = width !== this.width || height !== this.height;
    if (pixelRatio !== this.pixelRatio) this.renderer.setPixelRatio(pixelRatio);
    this.width = width;
    this.height = height;
    this.pixelRatio = pixelRatio;
    this.camera.aspect = width / height;
    if (sizeChanged) {
      for (const cb of this.resizeCallbacks) cb(width, height);
    }
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  };

  private readonly drawFrame = (time: number): void => {
    if (this.disposed) return;
    this.frameId = this.view.requestAnimationFrame(this.drawFrame);
    if (this.view.devicePixelRatio !== this.pixelRatio) this.resize();
    const dt = this.previousTime === undefined ? 0 : (time - this.previousTime) / 1000;
    this.previousTime = time;
    for (const cb of this.frameCallbacks) cb(dt);
    if (!this.disposed) this.renderer.render(this.scene, this.camera);
  };
}
