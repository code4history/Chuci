import { afterEach, expect, test } from "vitest";
import { PerspectiveCamera, Spherical, Vector3 } from "three";
import { FEEL } from "../src/core/feel";
import { GestureInterpreter } from "../src/core/gesture";
import { OrbitRig, parseVec3 } from "../src/components/viewer/renderers/orbit-rig";

const FRAME = 1 / FEEL.dampingReferenceHz;
let rig: OrbitRig | undefined;
let gestures: GestureInterpreter | undefined;

afterEach(() => {
  rig?.dispose();
  gestures?.dispose();
});

function setup() {
  const host = document.createElement("div");
  host.getBoundingClientRect = () => new DOMRect(0, 0, 400, 300);
  const camera = new PerspectiveCamera(75, 4 / 3, 0.1, 1000);
  gestures = new GestureInterpreter(host, () => {});
  const orbit = new OrbitRig(camera, gestures);
  rig = orbit;
  orbit.setHome(new Vector3(0, 0, 8), new Vector3());
  return { host, camera, orbit };
}

function pointer(host: HTMLElement, type: string, x: number, y: number, button = 0) {
  host.dispatchEvent(new PointerEvent(type, {
    pointerId: 1, pointerType: "mouse", clientX: x, clientY: y, button,
  }));
}

function drag(host: HTMLElement, button: number, dx: number, dy: number) {
  pointer(host, "pointerdown", 0, 0, button);
  pointer(host, "pointermove", dx, dy, button);
  pointer(host, "pointerup", dx, dy, button);
}

test("parseVec3 accepts three finite coordinates only", () => {
  expect(parseVec3("1,2,3")?.toArray()).toEqual([1, 2, 3]);
  expect(parseVec3(" -1.5, 0, 2e3 ")?.toArray()).toEqual([-1.5, 0, 2000]);
  for (const value of ["a,b", "1,,3", "1,2,3,4", "1px,2,3", "1,Infinity,3", undefined])
    expect(parseVec3(value)).toBeUndefined();
});

test("left drag rotates around the target at a fixed distance", () => {
  const { host, camera, orbit } = setup();
  drag(host, 0, 30, 20);
  orbit.update(FRAME);
  expect(camera.position.x).toBeLessThan(0);
  expect(camera.position.y).toBeGreaterThan(0);
  expect(camera.position.distanceTo(orbit.target)).toBeCloseTo(8);
  expect(orbit.target.toArray()).toEqual([0, 0, 0]);
});

test("a zoom factor of two halves the distance to the target", () => {
  const { host, camera, orbit } = setup();
  host.dispatchEvent(new WheelEvent("wheel", { deltaY: -Math.log(2) / FEEL.wheelZoomStep }));
  orbit.update(FRAME);
  expect(camera.position.distanceTo(orbit.target)).toBeCloseTo(4);
  expect(camera.fov).toBe(75);
});

test("right drag pans the camera and target by the same vector", () => {
  const { host, camera, orbit } = setup();
  drag(host, 2, 30, 20);
  orbit.update(FRAME);
  expect(orbit.target.x).toBeLessThan(0);
  expect(orbit.target.y).toBeGreaterThan(0);
  expect(camera.position.clone().sub(orbit.target).toArray()).toEqual([0, 0, 8]);
});

test("double click returns to home and clears pending movement", () => {
  const { host, camera, orbit } = setup();
  const position = new Vector3(1, 2, 7);
  const target = new Vector3(2, 0, 1);
  orbit.setHome(position, target);
  drag(host, 2, 30, 20);
  orbit.update(FRAME);
  expect(orbit.target.equals(target)).toBe(false);
  for (let i = 0; i < 2; i++) {
    pointer(host, "pointerdown", 20, 20);
    pointer(host, "pointerup", 20, 20);
  }
  orbit.update(FRAME);
  expect(camera.position.toArray()).toEqual(position.toArray());
  expect(orbit.target.toArray()).toEqual(target.toArray());
});

test("rotation damping uses FEEL.dampingFactor at the reference frequency", () => {
  const { host, camera, orbit } = setup();
  const yaw = () => new Spherical().setFromVector3(camera.position).theta;
  drag(host, 0, 30, 0);
  orbit.update(FRAME);
  const first = yaw();
  orbit.update(FRAME);
  expect(first).not.toBe(0);
  expect(yaw() - first).toBeCloseTo(first * FEEL.dampingFactor);
});

test("disposing the rig stops it from handling gestures", () => {
  const { host, camera, orbit } = setup();
  orbit.dispose();
  drag(host, 0, 30, 20);
  orbit.update(FRAME);
  expect(camera.position.toArray()).toEqual([0, 0, 8]);
});
