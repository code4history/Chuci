import { MathUtils, PerspectiveCamera, Vector2 } from "three";
import { FEEL } from "@/core/feel";
import type { GestureEvent, GestureInterpreter } from "@/core/gesture";

// Looking 90° left reproduces the legacy initial view with its sky rotation of −90°.
export const PANORAMA_INITIAL = { yawDeg: -90, pitchDeg: 0, fovDeg: 80 } as const;

const maxPitch = MathUtils.degToRad(FEEL.panoramaMaxPitchDeg);

export function resetPanoramaCamera(camera: PerspectiveCamera): void {
  camera.position.set(0, 0, 0);
  // Positive yaw looks right, whereas positive rotation around Y looks left.
  camera.rotation.set(
    MathUtils.degToRad(PANORAMA_INITIAL.pitchDeg),
    -MathUtils.degToRad(PANORAMA_INITIAL.yawDeg),
    0,
    "YXZ",
  );
  camera.fov = PANORAMA_INITIAL.fovDeg;
  camera.updateProjectionMatrix();
  camera.updateMatrixWorld();
}

export class LookRig {
  private readonly rotation = new Vector2();
  private readonly unsubscribe: () => void;

  constructor(
    private readonly camera: PerspectiveCamera,
    private readonly gestures: GestureInterpreter,
  ) {
    this.reset();
    this.unsubscribe = gestures.subscribe((event) => this.onGesture(event));
  }

  get yawDeg(): number {
    return -MathUtils.radToDeg(this.camera.rotation.y);
  }

  get pitchDeg(): number {
    return MathUtils.radToDeg(this.camera.rotation.x);
  }

  get fovDeg(): number {
    return this.camera.fov;
  }

  reset(): void {
    this.rotation.set(0, 0);
    resetPanoramaCamera(this.camera);
  }

  /** Advance pending drag rotation. dt is the elapsed time in seconds. */
  update(dt: number): void {
    if (dt <= 0 || this.rotation.lengthSq() === 0) return;
    const remaining = FEEL.dampingFactor ** (dt * FEEL.dampingReferenceHz);
    const step = 1 - remaining;
    const { x: pitch, y: yaw } = this.camera.rotation;
    this.camera.rotation.set(
      MathUtils.clamp(pitch + this.rotation.y * step, -maxPitch, maxPitch),
      yaw + this.rotation.x * step,
      0,
    );
    this.rotation.multiplyScalar(remaining);
    if (this.rotation.lengthSq() < Number.EPSILON ** 2) this.rotation.set(0, 0);
  }

  dispose(): void {
    this.unsubscribe();
    this.rotation.set(0, 0);
  }

  private onGesture(event: GestureEvent): void {
    if (event.kind === "reset") {
      this.reset();
    } else if (event.kind === "zoom") {
      const { factor } = event;
      if (!Number.isFinite(factor) || factor <= 0 || factor === 1) return;
      this.camera.fov = MathUtils.clamp(this.fovDeg / factor, FEEL.panoramaMinFovDeg, FEEL.panoramaMaxFovDeg);
      this.camera.updateProjectionMatrix();
    } else if (event.kind === "rotate") {
      const height = this.gestures.viewportHeight;
      if (height <= 0) return;
      const radiansPerPixel = (2 * Math.PI * FEEL.rotateSpeed) / height;
      this.rotation.x += event.dx * radiansPerPixel;
      const pitch = this.camera.rotation.x;
      const targetPitch = pitch + this.rotation.y + event.dy * radiansPerPixel;
      this.rotation.y = MathUtils.clamp(targetPitch, -maxPitch, maxPitch) - pitch;
    }
  }
}
