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

function stubViewerOpen() {
  let viewer = document.querySelector("cc-viewer") as (Element & { open: (...args: unknown[]) => void }) | null;
  if (!viewer) {
    viewer = document.createElement("cc-viewer") as Element & { open: (...args: unknown[]) => void };
    document.body.append(viewer);
  }
  return vi.spyOn(viewer, "open").mockImplementation(() => {});
}

function translatedX(transform: string): number {
  const match = transform.match(/translateX\(calc\((-?\d+(?:\.\d+)?)% \+ (-?\d+(?:\.\d+)?)px\)\)/);
  if (!match) throw new Error(`Unexpected transform: ${transform}`);
  return Number(match[1]) + Number(match[2]);
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

  test("small tap movement returns the track to its slide position", () => {
    vi.useFakeTimers({ toFake: ["requestAnimationFrame", "cancelAnimationFrame"] });
    const el = makeSwiper(2);
    vi.spyOn(el, "openViewer").mockResolvedValue();
    Reflect.set(el, "width", 100);
    const slide = el.shadowRoot!.querySelector<HTMLElement>('[data-index="0"]')!;
    slide.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, pointerId: 2, clientX: 20 }));
    slide.dispatchEvent(new PointerEvent("pointermove", { bubbles: true, pointerId: 2, clientX: 24 }));
    vi.advanceTimersToNextFrame();
    expect(slide.style.transform).toContain("4px");
    slide.dispatchEvent(new PointerEvent("pointerup", { bubbles: true, pointerId: 2, clientX: 24 }));
    expect(slide.style.transform).not.toContain("4px");
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
    document.body.append(outer);
    const el = makeSwiper(2);
    outer.append(el);
    outer.addEventListener("pointerdown", listener);
    el.shadowRoot!.querySelector("#viewport")!.dispatchEvent(
      new PointerEvent("pointerdown", { bubbles: true, composed: true })
    );
    expect(listener).not.toHaveBeenCalled();
  });

  test("pointer, wheel, and click from controls do not reach the map", () => {
    const outer = document.createElement("div");
    const listener = vi.fn();
    document.body.append(outer);
    const el = makeSwiper(2, { "has-thumb": "" });
    outer.append(el);
    for (const name of ["pointerdown", "wheel", "click"])
      outer.addEventListener(name, listener);
    const thumb = el.shadowRoot!.querySelector<HTMLElement>(".gallery-thumb")!;
    thumb.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, composed: true }));
    thumb.dispatchEvent(new WheelEvent("wheel", { bubbles: true, composed: true }));
    thumb.dispatchEvent(new MouseEvent("click", { bubbles: true, composed: true }));
    expect(listener).not.toHaveBeenCalled();
  });

  test("autoplay advances every 5000 ms and pauses while viewer open", async () => {
    vi.useFakeTimers();
    const el = makeSwiper(3, { autoplay: "" });
    vi.advanceTimersByTime(5000);
    expect(el.index).toBe(1);
    await el.openViewer(1);
    vi.advanceTimersByTime(5000);
    expect(el.index).toBe(1);
    el.setAttribute("has-thumb", "");
    expect(vi.getTimerCount()).toBe(0);
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

  test("rebuilds on slide change without leaking timers", async () => {
    vi.useFakeTimers();
    const el = makeSwiper(1, { autoplay: "" });
    expect(vi.getTimerCount()).toBe(0);
    const slide = document.createElement("cc-swiper-slide");
    slide.setAttribute("image-url", "https://example.com/1.jpg");
    el.append(slide);
    await Promise.resolve();
    expect(el.items).toHaveLength(2);
    expect(el.shadowRoot!.querySelectorAll(".cc-slide")).toHaveLength(2);
    expect(vi.getTimerCount()).toBe(1);
    el.goTo(1);
    expect(el.shadowRoot!.querySelectorAll(".cc-slide")).toHaveLength(2);
    expect(vi.getTimerCount()).toBe(1);
    el.removeChild(slide);
    await Promise.resolve();
    expect(el.items).toHaveLength(1);
    expect(el.shadowRoot!.querySelectorAll(".cc-slide")).toHaveLength(1);
    expect(vi.getTimerCount()).toBe(0);
  });

  test("goTo retains panels and thumbnail sources while animating", () => {
    const el = makeSwiper(2, { "has-thumb": "" });
    Reflect.set(el, "width", 100);
    Reflect.get(el, "setThumbnailSource").call(
      el,
      1,
      "https://example.com/generated.jpg"
    );
    const panel = el.shadowRoot!.querySelector(".cc-slide");
    el.goTo(1);
    expect(el.shadowRoot!.querySelector(".cc-slide")).toBe(panel);
    expect(el.shadowRoot!.querySelector<HTMLImageElement>('[data-thumb-index="1"]')!.getAttribute("src"))
      .toBe("https://example.com/generated.jpg");
    expect((panel as HTMLElement).style.transition).toContain("250ms");
  });

  test("closing without viewer navigation still selects the initially opened item", async () => {
    const el = makeSwiper(3);
    stubViewerOpen();
    await el.openViewer(1);
    expect(el.index).toBe(0);
    document.dispatchEvent(new CustomEvent("cc-viewer-close"));
    expect(el.index).toBe(1);
  });

  test.each([
    ["NaN", Number.NaN],
    ["Infinity", Number.POSITIVE_INFINITY],
    ["a fractional index", 0.5]
  ])("closing after opening with %s selects the viewer's normalized index", async (_label, index) => {
    const el = makeSwiper(3);
    stubViewerOpen();
    await el.openViewer(index);
    document.dispatchEvent(new CustomEvent("cc-viewer-close"));
    expect(el.index).toBe(0);
  });

  test("opening normalizes against slides added before the viewer is defined", async () => {
    const el = makeSwiper(3);
    const open = stubViewerOpen();
    let defineViewer!: (ctor: CustomElementConstructor) => void;
    const whenDefined = vi.spyOn(customElements, "whenDefined").mockReturnValue(
      new Promise((resolve) => {
        defineViewer = resolve;
      })
    );
    try {
      const opening = el.openViewer(3);
      const slide = document.createElement("cc-swiper-slide");
      slide.setAttribute("image-url", "https://example.com/3.jpg");
      el.append(slide);
      defineViewer(customElements.get("cc-viewer")!);
      await opening;
      expect(open).toHaveBeenCalledWith(el.items, 3, { loop: true });
    } finally {
      whenDefined.mockRestore();
    }
  });

  test("closing preserves ownership when an index listener opens another swiper", async () => {
    const first = makeSwiper(3);
    const second = makeSwiper(3);
    stubViewerOpen();
    await first.openViewer(1);
    first.addEventListener(
      "cc-swiper-index-change",
      () => void second.openViewer(0),
      { once: true }
    );
    document.dispatchEvent(new CustomEvent("cc-viewer-close"));
    document.dispatchEvent(
      new CustomEvent("cc-viewer-index-change", { detail: { index: 2 } })
    );
    expect(first.index).toBe(1);
    expect(second.index).toBe(2);
    document.dispatchEvent(new CustomEvent("cc-viewer-close"));
  });

  test("closing does not notify an index that is already synchronized", async () => {
    const el = makeSwiper(3);
    stubViewerOpen();
    const indices: number[] = [];
    el.addEventListener("cc-swiper-index-change", (event) => {
      indices.push((event as CustomEvent<{ index: number }>).detail.index);
    });
    await el.openViewer(0);
    document.dispatchEvent(
      new CustomEvent("cc-viewer-index-change", { detail: { index: 1 } })
    );
    document.dispatchEvent(new CustomEvent("cc-viewer-close"));
    expect(indices).toEqual([1]);
  });

  test("viewer index notifications only update the owning swiper", async () => {
    const first = makeSwiper(3, { autoplay: "" });
    const second = makeSwiper(3, { autoplay: "" });
    await first.openViewer(0);
    await second.openViewer(0);
    document.dispatchEvent(new CustomEvent("cc-viewer-index-change", { detail: { index: 2 } }));
    expect(first.index).toBe(0);
    expect(second.index).toBe(2);
    document.dispatchEvent(new CustomEvent("cc-viewer-close"));
  });

  test.each([2, 3])( "swipe transition advances from drag position without reverse travel (%i slides)", (count) => {
    vi.useFakeTimers({ toFake: ["requestAnimationFrame", "cancelAnimationFrame"] });
    const el = makeSwiper(count);
    Reflect.set(el, "width", 100);
    Reflect.get(el, "updateLayout").call(el, false);
    const panels = Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>(".cc-slide"));
    const outgoing = panels[0];
    const incoming = panels[1];
    const skipped = count === 3 ? panels[2] : undefined;
    const startOutgoing = outgoing.style.transform;
    const startIncoming = incoming.style.transform;
    const pointerDown = new PointerEvent("pointerdown", { bubbles: true, pointerId: 9, button: 0, clientX: 80 });
    const pointerMove = new PointerEvent("pointermove", { bubbles: true, pointerId: 9, clientX: 40 });
    const pointerUp = new PointerEvent("pointerup", { bubbles: true, pointerId: 9, clientX: 40 });
    outgoing.dispatchEvent(pointerDown);
    outgoing.dispatchEvent(pointerMove);
    vi.advanceTimersToNextFrame();
    const draggedOutgoing = outgoing.style.transform;
    const draggedIncoming = incoming.style.transform;
    outgoing.dispatchEvent(pointerUp);

    expect(draggedOutgoing).toContain("-40px");
    expect(draggedIncoming).toContain("100% + -40px");
    expect(startOutgoing).toContain("0%");
    expect(startIncoming).toContain("100%");
    expect(outgoing.style.transform).toContain("-100%");
    expect(incoming.style.transform).toContain("0%");
    expect(outgoing.style.transition).toContain("250ms");
    expect(incoming.style.transition).toContain("250ms");
    if (skipped) {
      expect(skipped.style.transition).toBe("none");
      expect(skipped.style.transform).toContain("100%");
    }
  });

  test.each([2, 3, 4])("clamps a 120px swipe and transitions panels by visibility (%i slides)", (count) => {
    vi.useFakeTimers({ toFake: ["requestAnimationFrame", "cancelAnimationFrame"] });
    const el = makeSwiper(count);
    Reflect.set(el, "width", 100);
    Reflect.get(el, "updateLayout").call(el, false);
    const panels = Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>(".cc-slide"));
    const first = panels[0];
    first.dispatchEvent(new PointerEvent("pointerdown", {
      bubbles: true,
      pointerId: 11,
      button: 0,
      clientX: 150
    }));
    first.dispatchEvent(new PointerEvent("pointermove", {
      bubbles: true,
      pointerId: 11,
      clientX: 30
    }));
    vi.advanceTimersToNextFrame();
    const releasePositions = panels.map((panel) => translatedX(panel.style.transform));
    expect(releasePositions[0]).toBe(-100);
    expect(first.style.transform).not.toContain("-120px");
    panels.forEach((panel) => {
      const dragPx = Number(panel.style.transform.match(/\+ (-?\d+)px\)/)?.[1]);
      expect(dragPx).toBeGreaterThanOrEqual(-100);
    });

    first.dispatchEvent(new PointerEvent("pointerup", {
      bubbles: true,
      pointerId: 11,
      clientX: 30
    }));
    panels.forEach((panel, index) => {
      const finalPosition = translatedX(panel.style.transform);
      const shouldTransition =
        Math.abs(releasePositions[index]) < 100 || Math.abs(finalPosition) < 100;
      expect(panel.style.transition === "none").toBe(!shouldTransition);
      if (!shouldTransition) return;
      expect(finalPosition).toBeLessThanOrEqual(releasePositions[index]);
    });
  });

  test("swipe release transitions from the last frame when a move is still pending", () => {
    vi.useFakeTimers({ toFake: ["requestAnimationFrame", "cancelAnimationFrame"] });
    const el = makeSwiper(4);
    Reflect.set(el, "width", 100);
    el.goTo(0, { animate: false });
    const outgoing = el.shadowRoot!.querySelector<HTMLElement>(".cc-slide")!;
    outgoing.dispatchEvent(new PointerEvent("pointerdown", {
      bubbles: true,
      pointerId: 12,
      button: 0,
      clientX: 150
    }));
    outgoing.dispatchEvent(new PointerEvent("pointermove", {
      bubbles: true,
      pointerId: 12,
      clientX: 130
    }));
    vi.advanceTimersToNextFrame();
    const startTransform = outgoing.style.transform;
    expect(translatedX(startTransform)).toBe(-20);

    const styles = new MutationObserver(() => {});
    styles.observe(outgoing, { attributeFilter: ["style"], attributeOldValue: true });
    try {
      outgoing.dispatchEvent(new PointerEvent("pointermove", {
        bubbles: true,
        pointerId: 12,
        clientX: 30
      }));
      outgoing.dispatchEvent(new PointerEvent("pointerup", {
        bubbles: true,
        pointerId: 12,
        clientX: 30
      }));

      expect(el.index).toBe(1);
      expect(outgoing.style.transition).toContain("250ms");
      expect(translatedX(outgoing.style.transform)).toBe(-100);
      const changes = styles.takeRecords();
      expect(changes.length).toBeGreaterThan(0);
      for (const { oldValue } of changes)
        expect(oldValue).toContain(`transform: ${startTransform};`);

      vi.advanceTimersToNextFrame();
      expect(styles.takeRecords()).toHaveLength(0);
      expect(translatedX(outgoing.style.transform)).toBe(-100);
    } finally {
      styles.disconnect();
    }
  });

  test("opening the viewer on another swiper releases the previous autoplay owner", async () => {
    vi.useFakeTimers();
    const first = makeSwiper(2, { autoplay: "" });
    const second = makeSwiper(2, { autoplay: "" });
    stubViewerOpen();
    first.pauseAutoplay();
    second.pauseAutoplay();
    await first.openViewer(0);
    expect(vi.getTimerCount()).toBe(0);
    await second.openViewer(0);
    expect(vi.getTimerCount()).toBe(1);
    document.dispatchEvent(new CustomEvent("cc-viewer-close"));
    expect(vi.getTimerCount()).toBe(2);
  });

  test("observes nested slide changes but ignores unrelated child additions", async () => {
    vi.useFakeTimers();
    const el = makeSwiper(1, { autoplay: "", "has-thumb": "" });
    const wrapper = document.createElement("div");
    const slide = el.querySelector("cc-swiper-slide")!;
    wrapper.append(slide);
    el.append(wrapper);
    await Promise.resolve();
    expect(el.items).toHaveLength(1);
    const second = document.createElement("cc-swiper-slide");
    second.setAttribute("image-url", "https://example.com/2.jpg");
    wrapper.append(second);
    await Promise.resolve();
    expect(el.items).toHaveLength(2);
    expect(el.shadowRoot!.querySelectorAll(".cc-slide")).toHaveLength(2);
    expect(vi.getTimerCount()).toBe(1);
    Reflect.get(el, "setThumbnailSource").call(el, 1, "https://example.com/generated.jpg");
    vi.advanceTimersByTime(2000);
    wrapper.append(document.createElement("span"));
    await Promise.resolve();
    expect(el.shadowRoot!.querySelector<HTMLImageElement>('[data-thumb-index="1"]')!.getAttribute("src"))
      .toBe("https://example.com/generated.jpg");
    vi.advanceTimersByTime(3000);
    expect(el.index).toBe(1);
    wrapper.removeChild(second);
    await Promise.resolve();
    expect(el.items).toHaveLength(1);
    expect(el.shadowRoot!.querySelectorAll(".cc-slide")).toHaveLength(1);
    expect(vi.getTimerCount()).toBe(0);
  });

  test("restarts autoplay after viewer closes while swiper is disconnected", async () => {
    vi.useFakeTimers();
    const el = makeSwiper(2, { autoplay: "" });
    stubViewerOpen();
    el.pauseAutoplay();
    await el.openViewer(0);
    expect(vi.getTimerCount()).toBe(0);
    el.remove();
    document.dispatchEvent(new CustomEvent("cc-viewer-close"));
    document.body.append(el);
    expect(vi.getTimerCount()).toBe(1);
    vi.advanceTimersByTime(5000);
    expect(el.index).toBe(1);
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

  test("empty caption and gallery do not occupy layout rows", () => {
    const one = makeSwiper(1);
    one.querySelector("cc-swiper-slide")!.removeAttribute("caption");
    one.goTo(0);
    const root = one.shadowRoot!;
    expect(root.querySelector<HTMLElement>("#caption")!.hidden).toBe(true);
    expect(root.querySelector<HTMLElement>("#gallery")!.hidden).toBe(true);
    expect(root.querySelector("style")!.textContent).toContain("#gallery[hidden]");
  });
});
