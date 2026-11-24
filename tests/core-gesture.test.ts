import { afterEach, describe, expect, test, vi } from "vitest";
import { GestureInterpreter, type GestureEvent } from "../src/core/gesture";

function makeInterpreter() {
  const target = document.createElement("div");
  document.body.append(target);
  const events: GestureEvent[] = [];
  const interpreter = new GestureInterpreter(target, (event) => events.push(event));
  return { target, events, interpreter };
}

function pointer(target: HTMLElement, type: string, init: PointerEventInit) {
  target.dispatchEvent(new PointerEvent(type, { bubbles: true, ...init }));
}

afterEach(() => {
  vi.useRealTimers();
  document.body.innerHTML = "";
});

describe("GestureInterpreter", () => {
  test("left drag emits start then rotate with deltas", () => {
    const { target, events, interpreter } = makeInterpreter();
    pointer(target, "pointerdown", { pointerId: 1, pointerType: "mouse", button: 0, clientX: 10, clientY: 20 });
    pointer(target, "pointermove", { pointerId: 1, pointerType: "mouse", buttons: 1, clientX: 25, clientY: 29 });
    pointer(target, "pointerup", { pointerId: 1, pointerType: "mouse", button: 0, clientX: 25, clientY: 29 });
    expect(events).toEqual([
      { kind: "start" },
      { kind: "rotate", dx: 15, dy: 9 }
    ]);
    interpreter.dispose();
  });

  test("right drag emits pan", () => {
    const { target, events, interpreter } = makeInterpreter();
    pointer(target, "pointerdown", { pointerId: 1, pointerType: "mouse", button: 2, clientX: 0, clientY: 0 });
    pointer(target, "pointermove", { pointerId: 1, pointerType: "mouse", buttons: 2, clientX: 12, clientY: -4 });
    expect(events).toEqual([{ kind: "start" }, { kind: "pan", dx: 12, dy: -4 }]);
    interpreter.dispose();
  });

  test("two-pointer move emits pan and pinch emits zoom with factor>1 when spreading", () => {
    const { target, events, interpreter } = makeInterpreter();
    Object.defineProperty(target, "getBoundingClientRect", { value: () => ({ left: 100, top: 50, right: 200, bottom: 150, width: 100, height: 100, x: 100, y: 50, toJSON() {} }) });
    pointer(target, "pointerdown", { pointerId: 1, pointerType: "touch", button: 0, clientX: 110, clientY: 60 });
    pointer(target, "pointerdown", { pointerId: 2, pointerType: "touch", button: 0, clientX: 130, clientY: 60 });
    pointer(target, "pointermove", { pointerId: 2, pointerType: "touch", clientX: 150, clientY: 60 });
    pointer(target, "pointermove", { pointerId: 1, pointerType: "touch", clientX: 115, clientY: 65 });
    expect(events[0]).toEqual({ kind: "start" });
    expect(events).toContainEqual({ kind: "zoom", factor: 2, cx: 30, cy: 10 });
    expect(events.some((event) => event.kind === "pan")).toBe(true);
    interpreter.dispose();
  });

  test("wheel deltaY<0 emits zoom factor>1 centred at pointer and prevents default", () => {
    const { target, events, interpreter } = makeInterpreter();
    const wheel = new WheelEvent("wheel", { bubbles: true, cancelable: true, deltaY: -100, clientX: 40, clientY: 50 });
    target.dispatchEvent(wheel);
    expect(events).toEqual([
      { kind: "start" },
      expect.objectContaining({ kind: "zoom", factor: expect.any(Number), cx: 40, cy: 50 })
    ]);
    expect((events[1] as Extract<GestureEvent, { kind: "zoom" }>).factor).toBeGreaterThan(1);
    expect(wheel.defaultPrevented).toBe(true);
    interpreter.dispose();
  });

  test("a wheel burst emits start only once", () => {
    vi.useFakeTimers();
    const { target, events, interpreter } = makeInterpreter();
    for (let i = 0; i < 3; i++) target.dispatchEvent(new WheelEvent("wheel", { cancelable: true, deltaY: -1 }));
    expect(events.filter((event) => event.kind === "start")).toHaveLength(1);
    vi.advanceTimersByTime(300);
    target.dispatchEvent(new WheelEvent("wheel", { cancelable: true, deltaY: -1 }));
    expect(events.filter((event) => event.kind === "start")).toHaveLength(2);
    interpreter.dispose();
  });

  test("double click within doubleTapMs emits reset", () => {
    vi.useFakeTimers();
    const { target, events, interpreter } = makeInterpreter();
    target.dispatchEvent(new MouseEvent("dblclick", { bubbles: true }));
    expect(events).toEqual([{ kind: "reset" }]);
    interpreter.dispose();
  });

  test("short press without movement emits tap and not start", () => {
    const { target, events, interpreter } = makeInterpreter();
    pointer(target, "pointerdown", { pointerId: 1, pointerType: "mouse", button: 0, clientX: 4, clientY: 5 });
    pointer(target, "pointerup", { pointerId: 1, pointerType: "mouse", button: 0, clientX: 4, clientY: 5 });
    expect(events).toEqual([{ kind: "tap" }]);
    interpreter.dispose();
  });

  test("right click without dragging is not emitted as a tap", () => {
    const { target, events, interpreter } = makeInterpreter();
    pointer(target, "pointerdown", { pointerId: 1, pointerType: "mouse", button: 2, clientX: 4, clientY: 5 });
    pointer(target, "pointerup", { pointerId: 1, pointerType: "mouse", button: 2, clientX: 4, clientY: 5 });
    expect(events).toEqual([]);
    interpreter.dispose();
  });

  test("context menu is suppressed and dispose removes listeners", () => {
    const { target, events, interpreter } = makeInterpreter();
    const contextMenu = new MouseEvent("contextmenu", { bubbles: true, cancelable: true });
    target.dispatchEvent(contextMenu);
    expect(contextMenu.defaultPrevented).toBe(true);
    interpreter.dispose();
    target.dispatchEvent(new WheelEvent("wheel", { bubbles: true, cancelable: true, deltaY: -1 }));
    expect(events).toEqual([]);
  });
});
