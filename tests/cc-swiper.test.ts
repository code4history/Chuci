import { afterEach, describe, expect, test, vi } from "vitest";
import "../src/index";
import type { CcSwiper } from "../src/components/swiper/cc-swiper";

function makeSwiper(count = 3, attrs: Record<string, string> = {}): CcSwiper {
  const el = document.createElement("cc-swiper");
  for (const [name, value] of Object.entries(attrs))
    el.setAttribute(name, value);
  for (let i = 0; i < count; i++) {
    const slide = document.createElement("cc-swiper-slide");
    slide.setAttribute("image-url", `https://example.com/${i}.jpg`);
    slide.setAttribute(
      "caption",
      i === 0 ? "<img src=x onerror=1>" : `Caption ${i}`
    );
    el.append(slide);
  }
  document.body.append(el);
  return el;
}

afterEach(() => {
  vi.useRealTimers();
  document.body.innerHTML = "";
});

describe("CcSwiper", () => {
  test("goTo wraps in loop mode and clamps otherwise", () => {
    const loop = makeSwiper(3);
    loop.goTo(-1);
    expect(loop.index).toBe(2);
    const fixed = makeSwiper(1);
    fixed.goTo(4);
    expect(fixed.index).toBe(0);
    expect(fixed.loop).toBe(false);
  });

  test("click without movement opens viewer at that index", () => {
    const el = makeSwiper(2);
    const open = vi.spyOn(el, "openViewer").mockResolvedValue();
    const slide =
      el.shadowRoot!.querySelector<HTMLElement>('[data-index="1"]')!;
    slide.dispatchEvent(
      new PointerEvent("pointerdown", {
        bubbles: true,
        pointerId: 1,
        clientX: 10
      })
    );
    slide.dispatchEvent(
      new PointerEvent("pointerup", {
        bubbles: true,
        pointerId: 1,
        clientX: 10
      })
    );
    expect(open).toHaveBeenCalledWith(1);
  });

  test("drag beyond threshold moves to next and does not open viewer", () => {
    const el = makeSwiper(3);
    const open = vi.spyOn(el, "openViewer").mockResolvedValue();
    const viewport = el.shadowRoot!.querySelector<HTMLElement>("#viewport")!;
    Object.defineProperty(viewport, "getBoundingClientRect", {
      value: () => ({
        width: 100,
        height: 100,
        x: 0,
        y: 0,
        top: 0,
        left: 0,
        right: 100,
        bottom: 100,
        toJSON() {}
      })
    });
    Reflect.set(el, "width", 100);
    const slide =
      el.shadowRoot!.querySelector<HTMLElement>('[data-index="0"]')!;
    slide.dispatchEvent(
      new PointerEvent("pointerdown", {
        bubbles: true,
        pointerId: 1,
        clientX: 90
      })
    );
    slide.dispatchEvent(
      new PointerEvent("pointermove", {
        bubbles: true,
        pointerId: 1,
        clientX: 40
      })
    );
    slide.dispatchEvent(
      new PointerEvent("pointerup", {
        bubbles: true,
        pointerId: 1,
        clientX: 40
      })
    );
    expect(el.index).toBe(1);
    expect(open).not.toHaveBeenCalled();
  });

  test("pointer events do not propagate to the map container", () => {
    const outer = document.createElement("div");
    const listener = vi.fn();
    const el = makeSwiper(2);
    outer.append(el);
    outer.addEventListener("pointerdown", listener);
    el.shadowRoot!.querySelector("#viewport")!.dispatchEvent(
      new PointerEvent("pointerdown", { bubbles: true })
    );
    expect(listener).not.toHaveBeenCalled();
  });

  test("autoplay advances every 5000 ms and pauses while viewer open", async () => {
    vi.useFakeTimers();
    const el = makeSwiper(3, { autoplay: "" });
    vi.advanceTimersByTime(5000);
    expect(el.index).toBe(1);
    await el.openViewer(0);
    vi.advanceTimersByTime(5000);
    expect(el.index).toBe(1);
    document.dispatchEvent(new CustomEvent("cc-viewer-close"));
    vi.advanceTimersByTime(5000);
    expect(el.index).toBe(2);
  });

  test("ArrowRight key moves next", () => {
    const el = makeSwiper(3);
    el.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true })
    );
    expect(el.index).toBe(1);
  });

  test("dots jump; >8 items shows counter; has-thumb hides dots and shows thumb strip", () => {
    const dots = makeSwiper(3);
    dots
      .shadowRoot!.querySelector<HTMLButtonElement>(".cc-bar-dot:last-child")!
      .click();
    expect(dots.index).toBe(2);
    expect(
      makeSwiper(9).shadowRoot!.querySelector(".cc-bar-counter")?.textContent
    ).toBe("1 / 9");
    const thumbs = makeSwiper(3, { "has-thumb": "" });
    expect(thumbs.shadowRoot!.querySelector(".cc-bar-dot")).toBeNull();
    expect(thumbs.shadowRoot!.querySelectorAll(".gallery-thumb")).toHaveLength(
      3
    );
  });

  test("rebuilds on slide change without leaking timers", () => {
    vi.useFakeTimers();
    const el = makeSwiper(2, { autoplay: "" });
    const slide = document.createElement("cc-swiper-slide");
    el.append(slide);
    el.goTo(1);
    expect(el.shadowRoot!.querySelectorAll(".cc-slide")).toHaveLength(3);
    expect(vi.getTimerCount()).toBe(1);
  });

  test("recomputes layout when width becomes non-zero", () => {
    let callback: ResizeObserverCallback | undefined;
    class TestResizeObserver {
      constructor(cb: ResizeObserverCallback) {
        callback = cb;
      }
      observe() {}
      disconnect() {}
    }
    vi.stubGlobal("ResizeObserver", TestResizeObserver);
    const el = makeSwiper(2);
    const track = el.shadowRoot!.querySelector<HTMLElement>(".cc-slide")!;
    const before = track.style.transform;
    callback?.(
      [{ contentRect: { width: 300 } } as ResizeObserverEntry],
      {} as ResizeObserver
    );
    expect(track.style.transform).not.toBe(before);
    vi.unstubAllGlobals();
  });

  test("caption is not interpreted as HTML", () => {
    const el = makeSwiper(1);
    const root = el.shadowRoot!;
    expect(root.querySelector(".cc-bar-caption")?.textContent).toBe(
      "<img src=x onerror=1>"
    );
    expect(root.querySelectorAll(".cc-bar-caption img")).toHaveLength(0);
  });
});
