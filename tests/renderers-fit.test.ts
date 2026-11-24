import { describe, expect, test, vi } from "vitest";
import "../src/index";
import { containSize } from "../src/components/viewer/renderers/fit";
import { createRenderer } from "../src/components/viewer/renderers/registry";
import { readMediaItem } from "../src/core/media-item";

function item(type: string, url: string) {
  const slide = document.createElement("div");
  slide.setAttribute("image-type", type);
  slide.setAttribute("image-url", url);
  slide.setAttribute("caption", "Caption");
  return readMediaItem(slide);
}

function mountHost() {
  const host = document.createElement("div");
  host.getBoundingClientRect = () => new DOMRect(0, 0, 1000, 1000);
  document.body.append(host);
  return host;
}

describe("containSize", () => {
  test("preserves the aspect ratio at the maximum size inside the box", () => {
    expect(containSize(1600, 900, 16 / 9)).toEqual({
      width: 1600,
      height: 900
    });
    expect(containSize(1000, 1000, 16 / 9)).toEqual({
      width: 1000,
      height: 562.5
    });
    expect(containSize(1600, 800, 1)).toEqual({ width: 800, height: 800 });
  });
});

describe("video and YouTube renderers", () => {
  test("YouTube fits a 16:9 iframe and keeps its caption visible on focus", async () => {
    const viewer = document.createElement("cc-viewer");
    document.body.append(viewer);
    const root = viewer.shadowRoot!;
    viewer.open([item("youtube", "https://youtu.be/abc123XYZ")], 0);
    const host = root.querySelector<HTMLElement>(".renderer-host")!;
    host.getBoundingClientRect = () => new DOMRect(0, 0, 1000, 1000);

    await Promise.resolve();
    const iframe = host.querySelector("iframe")!;
    expect(iframe.getAttribute("src")).toBe(
      "https://www.youtube.com/embed/abc123XYZ"
    );
    expect(iframe.hasAttribute("allowfullscreen")).toBe(true);
    expect(iframe.style.width).toBe("1000px");
    expect(iframe.style.height).toBe("562.5px");
    expect(root.querySelector<HTMLElement>(".spinner")!.hidden).toBe(false);
    iframe.dispatchEvent(new Event("load"));
    await Promise.resolve();
    await Promise.resolve();
    expect(root.querySelector<HTMLElement>(".spinner")!.hidden).toBe(true);

    window.dispatchEvent(new Event("blur"));
    expect(root.querySelector<HTMLElement>(".caption")!.hidden).toBe(false);
    iframe.focus();
    expect(root.activeElement).toBe(iframe);
    window.dispatchEvent(new Event("blur"));
    expect(root.querySelector<HTMLElement>(".caption")!.hidden).toBe(false);
  });

  test("YouTube rejects invalid URLs without assigning the iframe src", async () => {
    const host = mountHost();
    const renderer = await createRenderer("youtube");
    const signal = new AbortController().signal;
    await expect(
      renderer.mount(host, item("youtube", "relative-url"), {
        signal,
        reportInteraction: vi.fn(),
        reportError: vi.fn(),
        requestDebugRefresh: vi.fn()
      })
    ).rejects.toThrow();
    const iframe = host.querySelector("iframe");
    expect(iframe).not.toBeNull();
    expect(iframe!.hasAttribute("src")).toBe(false);
    renderer.unmount();
    expect(host.children).toHaveLength(0);
  });

  test("video uses its intrinsic aspect ratio and keeps the caption visible on play", async () => {
    const viewer = document.createElement("cc-viewer");
    document.body.append(viewer);
    const root = viewer.shadowRoot!;
    viewer.open([item("video", "/movie.mp4")], 0);
    const host = root.querySelector<HTMLElement>(".renderer-host")!;
    host.getBoundingClientRect = () => new DOMRect(0, 0, 1000, 1000);
    await Promise.resolve();

    const video = host.querySelector("video")!;
    expect(video.controls).toBe(true);
    expect(video.getAttribute("controlslist")).toBe("nodownload");
    Object.defineProperties(video, {
      videoWidth: { value: 1080 },
      videoHeight: { value: 1920 }
    });
    video.dispatchEvent(new Event("loadedmetadata"));
    expect(video.style.width).toBe("562.5px");
    expect(video.style.height).toBe("1000px");
    expect(root.querySelector<HTMLElement>(".spinner")!.hidden).toBe(false);
    video.dispatchEvent(new Event("loadeddata"));
    await Promise.resolve();
    await Promise.resolve();
    expect(root.querySelector<HTMLElement>(".spinner")!.hidden).toBe(true);

    expect(root.querySelector<HTMLElement>(".caption")!.hidden).toBe(false);
    video.dispatchEvent(new Event("play"));
    expect(root.querySelector<HTMLElement>(".caption")!.hidden).toBe(false);
    viewer.close();
    expect(video.hasAttribute("src")).toBe(false);
    expect(video.isConnected).toBe(false);
  });

  test("shows the common error when a video fails after its first frame loads", async () => {
    const viewer = document.createElement("cc-viewer");
    document.body.append(viewer);
    viewer.open([item("video", "/movie.mp4")], 0);
    await Promise.resolve();

    const root = viewer.shadowRoot!;
    const video = root.querySelector("video")!;
    const error = root.querySelector<HTMLElement>(".viewer-error")!;
    video.dispatchEvent(new Event("loadeddata"));
    await Promise.resolve();
    expect(error.hidden).toBe(true);

    video.dispatchEvent(new Event("error"));
    expect(error.hidden).toBe(false);
    expect(error.textContent).toBe("Failed to load video: /movie.mp4");
  });

  test("unmount settles a pending video load and removes its play listener", async () => {
    const host = mountHost();
    const renderer = await createRenderer("video");
    const reportInteraction = vi.fn();
    const mount = renderer.mount(host, item("video", "/movie.mp4"), {
      signal: new AbortController().signal,
      reportInteraction,
      reportError: vi.fn(),
      requestDebugRefresh: vi.fn()
    });

    const video = host.querySelector("video")!;
    renderer.unmount();
    await expect(mount).rejects.toMatchObject({ name: "AbortError" });
    video.dispatchEvent(new Event("play"));
    expect(reportInteraction).not.toHaveBeenCalled();
    expect(host.children).toHaveLength(0);
  });
});

test("the real swiper stays synchronized and resumes autoplay after the viewer closes", async () => {
  vi.useFakeTimers();
  try {
    const swiper = document.createElement("cc-swiper");
    swiper.setAttribute("autoplay", "");
    for (let i = 0; i < 3; i++) {
      const slide = document.createElement("cc-swiper-slide");
      slide.setAttribute("image-type", "video");
      slide.setAttribute("image-url", `/movie-${i}.mp4`);
      swiper.append(slide);
    }
    document.body.append(swiper);
    await swiper.openViewer(0);
    const viewer = document.querySelector("cc-viewer")!;

    viewer.shadowRoot!.querySelector<HTMLButtonElement>(".nav-next")!.click();
    expect(viewer.index).toBe(1);
    expect(swiper.index).toBe(1);
    vi.advanceTimersByTime(5000);
    expect(swiper.index).toBe(1);

    viewer.close();
    vi.advanceTimersByTime(5000);
    expect(swiper.index).toBe(2);
  } finally {
    document.body.replaceChildren();
    vi.useRealTimers();
  }
});
