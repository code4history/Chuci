import { MathUtils, PerspectiveCamera, Spherical, Vector2, Vector3 } from "three";
import { FEEL } from "@/core/feel";
import type { GestureEvent, GestureInterpreter } from "@/core/gesture";

export function parseVec3(s: string | undefined): Vector3 | undefined {
  const parts = s?.split(",").map((part) => part.trim());
  if (!parts || parts.length !== 3 || parts.some((part) => part === "")) return;
  const [x, y, z] = parts.map(Number);
  if ([x, y, z].every(Number.isFinite)) return new Vector3(x, y, z);
}

export class OrbitRig {
  private readonly focus = new Vector3();
  private readonly homePosition: Vector3;
  private readonly homeTarget = new Vector3();
  private readonly rotation = new Vector2();
  private readonly pan = new Vector3();
  private readonly offset = new Vector3();
  private readonly spherical = new Spherical();
  private readonly unsubscribe: () => void;

  constructor(
    private readonly camera: PerspectiveCamera,
    private readonly gestures: GestureInterpreter,
  ) {
    this.homePosition = camera.position.clone();
    this.unsubscribe = gestures.subscribe((event) => this.onGesture(event));
  }

  get target(): Vector3 {
    return this.focus;
  }

  setHome(position: Vector3, target: Vector3): void {
    this.homePosition.copy(position);
    this.homeTarget.copy(target);
    this.reset();
  }

  reset(): void {
    this.rotation.set(0, 0);
    this.pan.set(0, 0, 0);
    this.target.copy(this.homeTarget);
    this.camera.position.copy(this.homePosition);
    this.camera.lookAt(this.target);
    this.camera.updateMatrixWorld();
  }

  /** Advance pending drag movement. dt is the elapsed time in seconds. */
  update(dt: number): void {
    if (dt <= 0 || (this.rotation.lengthSq() + this.pan.lengthSq() === 0)) return;
    const remaining = FEEL.dampingFactor ** (dt * FEEL.dampingReferenceHz);
    const step = 1 - remaining;
    this.offset.subVectors(this.camera.position, this.target);
    if (this.rotation.lengthSq() > 0 && this.offset.lengthSq() > 0) {
      this.spherical.setFromVector3(this.offset);
      this.spherical.theta += this.rotation.x * step;
      this.spherical.phi += this.rotation.y * step;
      this.spherical.makeSafe();
      this.offset.setFromSpherical(this.spherical);
    }
    this.target.addScaledVector(this.pan, step);
    this.camera.position.copy(this.target).add(this.offset);
    this.camera.lookAt(this.target);
    this.rotation.multiplyScalar(remaining);
    this.pan.multiplyScalar(remaining);
    if (this.rotation.lengthSq() < Number.EPSILON ** 2) this.rotation.set(0, 0);
    if (this.pan.lengthSq() < Number.EPSILON ** 2) this.pan.set(0, 0, 0);
  }

  dispose(): void {
    this.unsubscribe();
    this.rotation.set(0, 0);
    this.pan.set(0, 0, 0);
  }

  private onGesture(event: GestureEvent): void {
    if (event.kind === "reset") {
      this.reset();
    } else if (event.kind === "zoom") {
      this.zoom(event.factor);
    } else if (event.kind === "rotate" || event.kind === "pan") {
      const height = this.gestures.viewportHeight;
      if (height <= 0) return;
      if (event.kind === "rotate") {
        const radiansPerPixel = (2 * Math.PI * FEEL.rotateSpeed) / height;
        this.rotation.x -= event.dx * radiansPerPixel;
        this.rotation.y -= event.dy * radiansPerPixel;
      } else {
        this.queuePan(event.dx, event.dy, height);
      }
    }
  }

  private zoom(factor: number): void {
    if (!Number.isFinite(factor) || factor <= 0 || factor === 1) return;
    this.offset.subVectors(this.camera.position, this.target);
    const distance = this.offset.length();
    if (distance === 0) return;
    const radius = MathUtils.clamp(distance / factor, this.camera.near, this.camera.far);
    this.camera.position.copy(this.target).addScaledVector(this.offset, radius / distance);
  }

  private queuePan(dx: number, dy: number, height: number): void {
    const distance = this.camera.position.distanceTo(this.target);
    const halfFov = MathUtils.degToRad(this.camera.getEffectiveFOV() / 2);
    const unitsPerPixel = 2 * distance * Math.tan(halfFov) * FEEL.panSpeed / height;
    const movement = new Vector3(-dx, dy, 0).applyQuaternion(this.camera.quaternion);
    this.pan.addScaledVector(movement, unitsPerPixel);
  }
}
