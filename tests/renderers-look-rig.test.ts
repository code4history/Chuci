import { afterEach, expect, test } from "vitest";
import { PerspectiveCamera, Vector3 } from "three";
import { FEEL } from "../src/core/feel";
import { GestureInterpreter } from "../src/core/gesture";
import { LookRig, PANORAMA_INITIAL } from "../src/components/viewer/renderers/look-rig";

const FRAME = 1 / FEEL.dampingReferenceHz;
let rig: LookRig | undefined;
let gestures: GestureInterpreter | undefined;

afterEach(() => {
  rig?.dispose();
  gestures?.dispose();
});

function setup() {
  const host = document.createElement("div");
  host.getBoundingClientRect = () => new DOMRect(0, 0, 400, 300);
  const camera = new PerspectiveCamera();
  gestures = new GestureInterpreter(host, () => {});
  const look = new LookRig(camera, gestures);
  rig = look;
  return { host, camera, look };
}

function pointer(
  host: HTMLElement, type: string, x: number, y: number, button = 0,
  pointerId = 1, pointerType = "mouse",
) {
  host.dispatchEvent(new PointerEvent(type, {
    pointerId, pointerType, clientX: x, clientY: y, button,
  }));
}

function drag(host: HTMLElement, button: number, dx: number, dy: number) {
  pointer(host, "pointerdown", 0, 0, button);
  pointer(host, "pointermove", dx, dy, button);
  pointer(host, "pointerup", dx, dy, button);
}

function zoom(host: HTMLElement, factor: number) {
  host.dispatchEvent(new WheelEvent("wheel", {
    deltaY: -Math.log(factor) / FEEL.wheelZoomStep,
  }));
}

test("drag right turns view left (grab direction)", () => {
  const { host, camera, look } = setup();
  const right = new Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
  drag(host, 0, 30, 0);
  look.update(FRAME);
  const first = look.yawDeg - PANORAMA_INITIAL.yawDeg;
  expect(first).toBeCloseTo(-36 * (1 - FEEL.dampingFactor));
  expect(camera.getWorldDirection(new Vector3()).dot(right)).toBeLessThan(0);
  expect(camera.position.toArray()).toEqual([0, 0, 0]);
  look.update(FRAME);
  expect(look.yawDeg - PANORAMA_INITIAL.yawDeg - first)
    .toBeCloseTo(first * FEEL.dampingFactor);
});

test("pitch clamps to ±85°", () => {
  const { host, camera, look } = setup();
  drag(host, 0, 0, 300);
  look.update(5);
  expect(look.pitchDeg).toBeCloseTo(85);
  expect(look.pitchDeg).toBeLessThanOrEqual(85);
  expect(camera.getWorldDirection(new Vector3()).y).toBeGreaterThan(0);
  drag(host, 0, 0, -300);
  look.update(5);
  expect(look.pitchDeg).toBeCloseTo(-85);
  expect(look.pitchDeg).toBeGreaterThanOrEqual(-85);
  expect(camera.getWorldDirection(new Vector3()).y).toBeLessThan(0);
});

test("zoom changes fov within [30, 100]", () => {
  const { host, camera, look } = setup();
  const initialProjection = camera.projectionMatrix.clone();
  zoom(host, 1.25);
  expect(look.fovDeg).toBeCloseTo(64);
  expect(camera.projectionMatrix.equals(initialProjection)).toBe(false);
  zoom(host, 10);
  expect(look.fovDeg).toBe(30);
  zoom(host, 0.1);
  expect(look.fovDeg).toBe(100);
});

test("pan is ignored", () => {
  const { host, camera, look } = setup();
  const orientation = camera.quaternion.clone();
  drag(host, 2, 30, 20);
  look.update(FRAME);
  expect(camera.quaternion.equals(orientation)).toBe(true);
  expect(camera.position.toArray()).toEqual([0, 0, 0]);
  expect(look.fovDeg).toBe(PANORAMA_INITIAL.fovDeg);
});

test("pinch changes fov without moving the camera", () => {
  const { host, camera, look } = setup();
  const orientation = camera.quaternion.clone();
  pointer(host, "pointerdown", 40, 50, 0, 1, "touch");
  pointer(host, "pointerdown", 80, 50, 0, 2, "touch");
  pointer(host, "pointermove", 110, 50, 0, 2, "touch");
  look.update(FRAME);
  expect(look.fovDeg).toBeCloseTo(PANORAMA_INITIAL.fovDeg / 1.75);
  expect(camera.quaternion.equals(orientation)).toBe(true);
  expect(camera.position.toArray()).toEqual([0, 0, 0]);
});

test("reset restores PANORAMA_INITIAL and clears inertia", () => {
  const { host, camera, look } = setup();
  const orientation = camera.quaternion.clone();
  drag(host, 0, 30, 20);
  zoom(host, 2);
  look.update(FRAME);
  expect(camera.quaternion.equals(orientation)).toBe(false);
  for (let i = 0; i < 2; i++) {
    pointer(host, "pointerdown", 20, 20);
    pointer(host, "pointerup", 20, 20);
  }
  look.update(FRAME);
  expect(camera.quaternion.equals(orientation)).toBe(true);
  expect(look.yawDeg).toBeCloseTo(PANORAMA_INITIAL.yawDeg);
  expect(look.pitchDeg).toBe(PANORAMA_INITIAL.pitchDeg);
  expect(look.fovDeg).toBe(PANORAMA_INITIAL.fovDeg);
});

test("disposing clears pending rotation and stops gesture handling", () => {
  const { host, camera, look } = setup();
  const orientation = camera.quaternion.clone();
  drag(host, 0, 30, 20);
  look.dispose();
  drag(host, 0, 30, 20);
  zoom(host, 2);
  look.update(FRAME);
  expect(camera.quaternion.equals(orientation)).toBe(true);
  expect(look.fovDeg).toBe(PANORAMA_INITIAL.fovDeg);
});
