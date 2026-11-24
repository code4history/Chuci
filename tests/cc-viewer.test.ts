import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import "../src/components/viewer/cc-viewer";
import type { RendererContext } from "../src/components/viewer/renderers/types";
import { CONTROLS_HINT, FEEL } from "../src/core/feel";
import type { MediaItem } from "../src/core/media-item";

const { createRenderer } = vi.hoisted(() => ({ createRenderer: vi.fn() }));
vi.mock("../src/components/viewer/renderers/registry", () => ({
  createRenderer
}));

const item: MediaItem = {
  type: "image",
  url: "example.png",
  thumbnailUrl: "",
  caption: "Caption",
  fitToContainer: false,
  debugMode: false
};

function deferred() {
  let resolve!: () => void;
  let reject!: (error: Error) => void;
  const promise = new Promise<void>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

function fakeRenderer(load = Promise.resolve()) {
  return {
    mount: vi.fn(
      (host: HTMLElement, _item: MediaItem, _ctx: RendererContext) => {
        host.append(document.createElement("canvas"));
        return load;
      }
    ),
    unmount: vi.fn()
  };
}

function key(key: string) {
  window.dispatchEvent(new KeyboardEvent("keydown", { key }));
}

const flush = async () => {
  await Promise.resolve();
  await Promise.resolve();
};

describe("cc-viewer", () => {
  let viewer: HTMLElementTagNameMap["cc-viewer"];
  let root: ShadowRoot;

  const el = <T extends HTMLElement = HTMLElement>(selector: string) =>
    root.querySelector<T>(selector)!;
  const click = (selector: string) => el(selector).click();

  beforeEach(() => {
    createRenderer.mockReset().mockImplementation(async () => fakeRenderer());
    viewer = document.createElement("cc-viewer");
    document.body.append(viewer);
    root = viewer.shadowRoot!;
  });

  afterEach(() => {
    viewer.remove();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  test("opens a black backdrop and shows a spinner until mount resolves", async () => {
    const loading = deferred();
    createRenderer.mockResolvedValueOnce(fakeRenderer(loading.promise));

    viewer.open([item], 0);
    expect(el(".backdrop").hidden).toBe(false);
    expect(el("style").textContent).toMatch(
      /\.backdrop\s*\{[^}]*background:\s*#000/
    );
    expect(el(".spinner").hidden).toBe(false);
    await flush();
    expect(el(".spinner").hidden).toBe(false);

    loading.resolve();
    await flush();
    expect(el(".spinner").hidden).toBe(true);
  });

  test("shows an error when mount rejects without an unhandled rejection", async () => {
    const loading = deferred();
    createRenderer.mockResolvedValueOnce(fakeRenderer(loading.promise));
    const unhandled = vi.fn();
    window.addEventListener("unhandledrejection", unhandled, { once: true });

    try {
      viewer.open([item], 0);
      await flush();
      loading.reject(new Error("Network error"));
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(el(".spinner").hidden).toBe(true);
      expect(el(".viewer-error").hidden).toBe(false);
      expect(el(".viewer-error").textContent).toBe("Network error");
      expect(unhandled).not.toHaveBeenCalled();
    } finally {
      window.removeEventListener("unhandledrejection", unhandled);
    }
  });

  test("buttons and arrow keys change index and dispatch composed, bubbling events", () => {
    const container = document.createElement("div");
    document.body.append(container);
    container.attachShadow({ mode: "open" }).append(viewer);
    const changes = vi.fn();
    container.addEventListener("cc-viewer-index-change", changes);

    viewer.open([item, item, item], 0);
    expect(el(".nav-prev").hidden).toBe(true);
    click(".nav-next");
    key("ArrowRight");
    expect(el(".nav-next").hidden).toBe(true);
    key("ArrowRight");
    click(".nav-prev");
    key("ArrowLeft");

    expect(viewer.index).toBe(0);
    expect(changes.mock.calls.map(([event]) => event.detail.index)).toEqual([
      1, 2, 1, 0
    ]);
    expect(
      changes.mock.calls.every(([event]) => event.bubbles && event.composed)
    ).toBe(true);
  });

  test("loop navigation wraps and a caption dot jumps directly", () => {
    const changes = vi.fn();
    viewer.addEventListener("cc-viewer-index-change", changes);
    viewer.open([item, item, item], 0, { loop: true });

    expect(el(".nav-prev").hidden).toBe(false);
    click(".nav-prev");
    expect(viewer.index).toBe(2);
    key("ArrowRight");
    expect(viewer.index).toBe(0);
    click('[aria-label="Slide 2"]');
    expect(viewer.index).toBe(1);
    expect(changes.mock.calls.map(([event]) => event.detail.index)).toEqual([
      2, 0, 1
    ]);
  });

  test("Esc closes, releases the renderer once and dispatches a close event", async () => {
    const renderer = fakeRenderer();
    createRenderer.mockResolvedValueOnce(renderer);
    const closed = vi.fn();
    const container = document.createElement("div");
    document.body.append(container);
    container.attachShadow({ mode: "open" }).append(viewer);
    container.addEventListener("cc-viewer-close", closed);

    viewer.open([item], 0);
    await flush();
    key("Escape");
    viewer.close();
    key("Escape");

    expect(el(".backdrop").hidden).toBe(true);
    expect(renderer.unmount).toHaveBeenCalledTimes(1);
    expect(renderer.mount.mock.calls[0][2].signal.aborted).toBe(true);
    expect(closed).toHaveBeenCalledTimes(1);
    expect(closed.mock.calls[0][0]).toMatchObject({
      bubbles: true,
      composed: true
    });
  });

  test("aborts stale mounts on rapid navigation and isolates late DOM writes", async () => {
    const firstLoad = deferred();
    const secondLoad = deferred();
    const first = fakeRenderer(firstLoad.promise);
    const second = fakeRenderer(secondLoad.promise);
    const third = fakeRenderer();
    createRenderer
      .mockResolvedValueOnce(first)
      .mockResolvedValueOnce(second)
      .mockResolvedValueOnce(third);

    viewer.open([item, item, item], 0);
    await flush();
    click(".nav-next");
    await flush();
    click(".nav-next");
    await flush();

    for (const stale of [first, second]) {
      const [host, , context] = stale.mount.mock.calls[0];
      expect(context.signal.aborted).toBe(true);
      expect(stale.unmount).toHaveBeenCalledTimes(1);
      host.append(document.createElement("canvas"));
      context.reportInteraction();
      context.reportError(new Error("Stale playback error"));
    }
    firstLoad.resolve();
    secondLoad.reject(new Error("Stale failure"));
    await flush();

    expect(viewer.index).toBe(2);
    expect(el(".renderer-host").children).toHaveLength(1);
    expect(root.querySelectorAll("canvas")).toHaveLength(1);
    expect(el(".viewer-error").hidden).toBe(true);
    expect(el(".caption").hidden).toBe(false);
  });

  test("does not mount a renderer whose factory resolves after closing", async () => {
    const factory = deferred();
    const renderer = fakeRenderer();
    createRenderer.mockReturnValueOnce(factory.promise.then(() => renderer));
    viewer.open([item], 0);
    viewer.close();

    factory.resolve();
    await flush();
    expect(renderer.mount).not.toHaveBeenCalled();
    expect(renderer.unmount).toHaveBeenCalledTimes(1);
    expect(root.querySelector("canvas")).toBeNull();
  });

  test("hides the caption on interaction and restores it on tap or mouse movement", async () => {
    vi.useFakeTimers();
    const renderer = fakeRenderer();
    createRenderer.mockResolvedValueOnce(renderer);

    viewer.open([item], 0);
    await flush();
    const [host, , context] = renderer.mount.mock.calls[0];
    const canvas = host.querySelector("canvas")!;
    const capture = vi.fn();
    el(".content").setPointerCapture = capture;
    const point = { bubbles: true, pointerId: 1, pointerType: "touch" };

    context.reportInteraction();
    expect(el(".caption").hidden).toBe(true);
    expect(el(".backdrop").classList.contains("bar-hidden")).toBe(true);
    canvas.dispatchEvent(new PointerEvent("pointerdown", point));
    canvas.dispatchEvent(
      new PointerEvent("pointermove", { ...point, clientX: 50 })
    );
    canvas.dispatchEvent(
      new PointerEvent("pointerup", { ...point, clientX: 50 })
    );
    expect(el(".caption").hidden).toBe(true);

    canvas.dispatchEvent(new PointerEvent("pointerdown", point));
    canvas.dispatchEvent(new PointerEvent("pointerup", point));
    expect(capture).not.toHaveBeenCalled();
    expect(el(".caption").hidden).toBe(false);
    vi.advanceTimersByTime(FEEL.barHideDelayMs);
    expect(el(".caption").hidden).toBe(true);

    canvas.dispatchEvent(
      new PointerEvent("pointermove", { bubbles: true, pointerType: "mouse" })
    );
    expect(el(".caption").hidden).toBe(false);
  });

  test("keeps the YouTube caption and buttons visible and restores overlay behavior on navigation", async () => {
    vi.useFakeTimers();
    const youtube = { ...fakeRenderer(), reservesBottomBar: true };
    createRenderer
      .mockResolvedValueOnce(fakeRenderer())
      .mockResolvedValueOnce(youtube);

    viewer.open([item, { ...item, type: "youtube" }, item], 0);
    await flush();
    click(".nav-next");
    await flush();

    expect(el(".viewport").classList.contains("reserve-bottom-bar")).toBe(true);
    youtube.mount.mock.calls[0][2].reportInteraction();
    vi.advanceTimersByTime(FEEL.barHideDelayMs);
    expect(el(".caption").hidden).toBe(false);
    expect(el(".backdrop").classList.contains("bar-hidden")).toBe(false);
    for (const selector of [".nav-prev", ".nav-next", ".nav-close"]) {
      expect(el(selector).hidden).toBe(false);
    }

    click(".nav-next");
    await flush();
    expect(el(".viewport").classList.contains("reserve-bottom-bar")).toBe(false);
    vi.advanceTimersByTime(FEEL.barHideDelayMs);
    expect(el(".caption").hidden).toBe(true);
  });

  test("shows renderer debug entries and the localized hint only for debug items", async () => {
    vi.useFakeTimers();
    vi.spyOn(navigator, "language", "get").mockReturnValue("ja-JP");
    const renderer = {
      ...fakeRenderer(),
      debugEntries: vi.fn().mockReturnValue([
        { label: "Camera position", value: "1,2,3" },
        { label: "Camera target", value: "0,0,0" }
      ])
    };
    createRenderer.mockResolvedValueOnce(renderer);

    viewer.open([{ ...item, debugMode: true }, item], 0);
    await flush();
    expect(el(".debug-panel").hidden).toBe(false);
    expect(el("style").textContent).toMatch(
      /\.debug-panel\s*\{[^}]*top:\s*[^;]*;[^}]*left:[^}]*monospace/
    );
    expect(
      [...el(".debug-panel").children].map((row) => row.textContent)
    ).toEqual([
      "Camera position: 1,2,3",
      "Camera target: 0,0,0",
      CONTROLS_HINT.ja
    ]);

    renderer.debugEntries.mockReturnValue([
      { label: "Camera position", value: "4,5,6" }
    ]);
    renderer.mount.mock.calls[0][2].requestDebugRefresh();
    expect(el(".debug-panel").textContent).toContain("4,5,6");
    renderer.debugEntries.mockReturnValue([
      { label: "Camera position", value: "7,8,9" }
    ]);
    vi.advanceTimersByTime(250);
    expect(el(".debug-panel").textContent).toContain("7,8,9");

    click(".nav-next");
    expect(el(".debug-panel").hidden).toBe(true);
    expect(el(".debug-panel").textContent).toBe("");
    const calls = renderer.debugEntries.mock.calls.length;
    vi.advanceTimersByTime(250);
    expect(renderer.debugEntries).toHaveBeenCalledTimes(calls);
  });

  test("shows media-specific controls styled alongside the common buttons", async () => {
    const button = document.createElement("button");
    button.textContent = "Texture";
    const renderer = { ...fakeRenderer(), mediaControls: () => [button] };
    createRenderer.mockResolvedValueOnce(renderer);
    viewer.open([item, item], 0);
    await flush();
    expect(root.querySelector(".media-controls > .nav-button")).toBe(button);
    click(".nav-next");
    expect(button.isConnected).toBe(false);
  });

  test("dims only previous, next and close when the caption bar is hidden", async () => {
    vi.useFakeTimers();
    const button = document.createElement("button");
    createRenderer.mockResolvedValueOnce({ ...fakeRenderer(), mediaControls: () => [button] });
    viewer.open([item, item], 0, { loop: true });
    await flush();
    vi.advanceTimersByTime(FEEL.barHideDelayMs);

    expect(el(".caption").hidden).toBe(true);
    const selector = el("style").textContent!
      .match(/([^{}]+)\{\s*opacity:\s*\.25;\s*\}/)?.[1].trim();
    expect(selector).toBeDefined();
    expect([...root.querySelectorAll(selector!)]).toEqual([
      el(".nav-prev"), el(".nav-next"), el(".nav-close")
    ]);
    expect(button.isConnected).toBe(true);
  });

  test("hides previous and next for a single item even in loop mode", () => {
    viewer.open([item], 0, { loop: true });
    expect(el(".nav-prev").hidden).toBe(true);
    expect(el(".nav-next").hidden).toBe(true);
  });
});
