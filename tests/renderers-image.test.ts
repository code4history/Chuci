import { afterEach, describe, expect, test, vi } from "vitest";
import { FEEL } from "../src/core/feel";
import type { MediaItem } from "../src/core/media-item";
import { createRenderer } from "../src/components/viewer/renderers/registry";
import { ImageRenderer, zoomAt } from "../src/components/viewer/renderers/image-renderer";

const item: MediaItem = {
  url: "/image.png",
  type: "image",
  thumbnailUrl: "",
  caption: "",
  fitToContainer: false,
  debugMode: false
};

function host(width = 800, height = 600): HTMLDivElement {
  const element = document.createElement("div");
  element.getBoundingClientRect = () => new DOMRect(0, 0, width, height);
  document.body.append(element);
  return element;
}

function context(signal = new AbortController().signal) {
  return {
    signal,
    reportInteraction: vi.fn(),
    reportError: vi.fn(),
    requestDebugRefresh: vi.fn()
  };
}

function pointer(target: HTMLElement, type: string, init: PointerEventInit) {
  target.dispatchEvent(new PointerEvent(type, { bubbles: true, ...init }));
}

afterEach(() => {
  vi.useRealTimers();
  document.body.replaceChildren();
});

describe("zoomAt", () => {
  test("keeps the image point under the cursor fixed", () => {
    const before = { scale: 2, x: 30, y: -10 };
    const cursor = { x: 100, y: 40 };
    const after = zoomAt(before, 1.5, cursor.x, cursor.y, { min: 0.5, max: 8 });

    expect({
      x: (cursor.x - before.x) / before.scale,
      y: (cursor.y - before.y) / before.scale
    }).toEqual({
      x: (cursor.x - after.x) / after.scale,
      y: (cursor.y - after.y) / after.scale
    });
  });

  test("clamps zoom to the provided limits", () => {
    expect(zoomAt({ scale: 1, x: 0, y: 0 }, 0.01, 10, 10, { min: 0.5, max: 4 }).scale).toBe(0.5);
    expect(zoomAt({ scale: 1, x: 0, y: 0 }, 100, 10, 10, { min: 0.5, max: 4 }).scale).toBe(4);
  });
});

describe("ImageRenderer", () => {
  test("initial view fits the natural image size inside the host", async () => {
    const target = host();
    const renderer = new ImageRenderer();
    const mounted = renderer.mount(target, item, context());
    const image = target.querySelector("img")!;
    expect(image.getAttribute("src")).toBe("/image.png");
    Object.defineProperties(image, {
      naturalWidth: { value: 1600 },
      naturalHeight: { value: 800 }
    });
    image.dispatchEvent(new Event("load"));
    await mounted;

    expect(image.style.width).toBe("800px");
    expect(image.style.height).toBe("400px");
    expect(image.style.transform).toBe("translate3d(0px, 0px, 0) scale(1)");
    renderer.unmount();
  });

  test("reset gesture restores the initial view", async () => {
    const target = host();
    const renderer = new ImageRenderer();
    const mounted = renderer.mount(target, item, context());
    const image = target.querySelector("img")!;
    Object.defineProperties(image, {
      naturalWidth: { value: 400 },
      naturalHeight: { value: 300 }
    });
    image.dispatchEvent(new Event("load"));
    await mounted;
    pointer(target, "pointerdown", { pointerId: 1, pointerType: "mouse", button: 0, clientX: 0, clientY: 0 });
    pointer(target, "pointermove", { pointerId: 1, pointerType: "mouse", buttons: 1, clientX: 30, clientY: 15 });
    expect(image.style.transform).toContain("30px, 15px");
    pointer(target, "pointerup", { pointerId: 1, pointerType: "mouse", button: 0, clientX: 30, clientY: 15 });
    for (let pointerId = 2; pointerId <= 3; pointerId++) {
      pointer(target, "pointerdown", { pointerId, pointerType: "mouse", button: 0, clientX: 30, clientY: 15 });
      pointer(target, "pointerup", { pointerId, pointerType: "mouse", button: 0, clientX: 30, clientY: 15 });
    }
    expect(image.style.transform).toBe("translate3d(0px, 0px, 0) scale(1)");
    renderer.unmount();
  });

  test("rotate gesture pans the image and start reports interaction", async () => {
    const target = host();
    const renderer = new ImageRenderer();
    const ctx = context();
    const mounted = renderer.mount(target, item, ctx);
    const image = target.querySelector("img")!;
    Object.defineProperties(image, {
      naturalWidth: { value: 400 },
      naturalHeight: { value: 300 }
    });
    image.dispatchEvent(new Event("load"));
    await mounted;
    pointer(target, "pointerdown", { pointerId: 1, pointerType: "mouse", button: 0, clientX: 0, clientY: 0 });
    pointer(target, "pointermove", { pointerId: 1, pointerType: "mouse", buttons: 1, clientX: 30, clientY: 15 });

    expect(ctx.reportInteraction).toHaveBeenCalledOnce();
    expect(image.style.transform).toBe("translate3d(30px, 15px, 0) scale(1)");
    renderer.unmount();
  });

  test.each([
    { limit: FEEL.imageMinZoom, deltaY: 2000, dx: 30 },
    { limit: FEEL.imageMaxZoom, deltaY: -2000, dx: -30 }
  ])("two-finger pan preserves image scale at $limit", async ({ limit, deltaY, dx }) => {
    vi.useFakeTimers({ toFake: ["requestAnimationFrame", "cancelAnimationFrame"] });
    const target = host();
    const renderer = new ImageRenderer();
    const mounted = renderer.mount(target, item, context());
    const image = target.querySelector("img")!;
    Object.defineProperties(image, {
      naturalWidth: { value: 400 },
      naturalHeight: { value: 300 }
    });
    image.dispatchEvent(new Event("load"));
    await mounted;

    try {
      target.dispatchEvent(new WheelEvent("wheel", { deltaY, clientX: 400, clientY: 300 }));
      expect(image.style.transform).toBe(`translate3d(0px, 0px, 0) scale(${limit})`);
      pointer(target, "pointerdown", { pointerId: 1, pointerType: "touch", clientX: 60, clientY: 100 });
      pointer(target, "pointerdown", { pointerId: 2, pointerType: "touch", clientX: 140, clientY: 100 });
      pointer(target, "pointermove", { pointerId: 1, pointerType: "touch", clientX: 60 + dx, clientY: 100 });
      pointer(target, "pointermove", { pointerId: 2, pointerType: "touch", clientX: 140 + dx, clientY: 100 });
      vi.advanceTimersToNextFrame();

      expect(image.style.transform).toBe(`translate3d(${dx * FEEL.panSpeed}px, 0px, 0) scale(${limit})`);
    } finally {
      renderer.unmount();
    }
  });

  test("mount rejects when the image fails to load", async () => {
    const target = host();
    const renderer = await createRenderer("image");
    const mounted = renderer.mount(target, item, context());
    target.querySelector("img")!.dispatchEvent(new Event("error"));

    await expect(mounted).rejects.toThrow("Failed to load image: /image.png");
    renderer.unmount();
    expect(target.children).toHaveLength(0);
  });

  test("registry creates the image renderer", async () => {
    expect(await createRenderer("image")).toBeInstanceOf(ImageRenderer);
  });
});
