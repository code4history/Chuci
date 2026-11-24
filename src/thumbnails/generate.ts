import type { MediaItem } from "@/core/media-item";
import { prepareModelScene } from "@/components/viewer/renderers/model-renderer";
import { preparePanoramaScene } from "@/components/viewer/renderers/panorama-renderer";
import { ThreeStage } from "@/components/viewer/renderers/three-stage";
import { extractVideoId } from "@/utils/youtube-embed";

export const THUMBNAIL_GENERATOR_VERSION = 1;
export const DEFAULT_THUMBNAIL_SIZE = 256;

interface GenerateOptions {
  maxSize?: number;
  signal?: AbortSignal;
}

function checkedSize(value: number | undefined): number {
  const size = Math.floor(value ?? DEFAULT_THUMBNAIL_SIZE);
  if (!Number.isFinite(size) || size < 1) throw new RangeError("Invalid thumbnail size");
  return size;
}

function outputSize(width: number, height: number, maxSize: number): { width: number; height: number } {
  if (width <= 0 || height <= 0) throw new Error("The media has no drawable dimensions");
  const scale = Math.min(1, maxSize / Math.max(width, height));
  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
  };
}

async function encodeCanvas(canvas: OffscreenCanvas): Promise<Blob> {
  return canvas.convertToBlob({ type: "image/webp", quality: 0.85 });
}

function drawingCanvas(width: number, height: number): OffscreenCanvas {
  if (typeof OffscreenCanvas === "undefined") throw new Error("OffscreenCanvas is unavailable");
  return new OffscreenCanvas(width, height);
}

async function generateImage(item: MediaItem, maxSize: number, signal: AbortSignal): Promise<Blob> {
  if (typeof createImageBitmap !== "function" || typeof OffscreenCanvas === "undefined") {
    throw new Error("Image thumbnail APIs are unavailable");
  }
  const response = await fetch(item.url, { signal });
  if (!response.ok) throw new Error(`Failed to load image (HTTP ${response.status})`);
  const bitmap = await createImageBitmap(await response.blob());
  signal.throwIfAborted();
  try {
    const { width, height } = outputSize(bitmap.width, bitmap.height, maxSize);
    const canvas = drawingCanvas(width, height);
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Could not create a thumbnail canvas");
    context.drawImage(bitmap, 0, 0, width, height);
    return encodeCanvas(canvas);
  } finally {
    bitmap.close();
  }
}

function waitForMediaEvent(target: HTMLMediaElement, name: string, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const cleanup = () => {
      target.removeEventListener(name, loaded);
      target.removeEventListener("error", failed);
      signal.removeEventListener("abort", aborted);
    };
    const loaded = () => {
      cleanup();
      resolve();
    };
    const failed = () => {
      cleanup();
      reject(new Error("Failed to load video"));
    };
    const aborted = () => {
      cleanup();
      reject(signal.reason);
    };
    target.addEventListener(name, loaded, { once: true });
    target.addEventListener("error", failed, { once: true });
    signal.addEventListener("abort", aborted, { once: true });
  });
}

async function generateVideo(item: MediaItem, maxSize: number, signal: AbortSignal): Promise<Blob> {
  const video = document.createElement("video");
  video.crossOrigin = "anonymous";
  video.preload = "auto";
  video.muted = true;
  try {
    const loaded = waitForMediaEvent(video, "loadeddata", signal);
    video.setAttribute("src", item.url);
    video.load();
    await loaded;
    signal.throwIfAborted();
    const end = Number.isFinite(video.duration) ? Math.max(0, video.duration - 0.001) : 0.5;
    const position = Math.min(0.5, end);
    if (position > 0) {
      const seeked = waitForMediaEvent(video, "seeked", signal);
      video.currentTime = position;
      await seeked;
      signal.throwIfAborted();
    }
    const { width, height } = outputSize(video.videoWidth, video.videoHeight, maxSize);
    const canvas = drawingCanvas(width, height);
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Could not create a thumbnail canvas");
    context.drawImage(video, 0, 0, width, height);
    return encodeCanvas(canvas);
  } finally {
    video.pause();
    video.removeAttribute("src");
    video.load();
  }
}

export function youtubeThumbnailUrl(url: string): string | null {
  try {
    const video = extractVideoId(new URL(url));
    return video ? `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg` : null;
  } catch {
    return null;
  }
}

async function generateYouTube(item: MediaItem, signal: AbortSignal): Promise<Blob> {
  const url = youtubeThumbnailUrl(item.url);
  if (!url) throw new Error("No YouTube video ID provided");
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`Failed to load YouTube thumbnail (HTTP ${response.status})`);
  return response.blob();
}

function loadPanoramaAspect(url: string, signal: AbortSignal): Promise<number> {
  const image = document.createElement("img");
  image.crossOrigin = "anonymous";
  return new Promise((resolve, reject) => {
    const cleanup = () => {
      image.onload = null;
      image.onerror = null;
      signal.removeEventListener("abort", aborted);
    };
    const aborted = () => {
      cleanup();
      reject(signal.reason);
    };
    image.onload = () => {
      const aspect = image.naturalWidth / image.naturalHeight;
      cleanup();
      Number.isFinite(aspect) && aspect > 0 ? resolve(aspect) : reject(new Error("Invalid panorama dimensions"));
    };
    image.onerror = () => {
      cleanup();
      reject(new Error("Failed to load panorama"));
    };
    signal.addEventListener("abort", aborted, { once: true });
    image.setAttribute("src", url);
  });
}

async function generateThreeThumbnail(item: MediaItem, maxSize: number, signal: AbortSignal): Promise<Blob> {
  const aspect = item.type === "panorama" ? await loadPanoramaAspect(item.url, signal) : 1;
  signal.throwIfAborted();
  const { width, height } = outputSize(maxSize * aspect, maxSize, maxSize);
  const host = document.createElement("div");
  host.style.position = "fixed";
  host.style.left = "-100000px";
  host.style.top = "0";
  host.style.width = `${width}px`;
  host.style.height = `${height}px`;
  host.style.visibility = "hidden";
  host.style.pointerEvents = "none";
  host.setAttribute("aria-hidden", "true");
  document.body.append(host);
  let stage: ThreeStage | undefined;
  try {
    stage = new ThreeStage(host);
    if (item.type === "panorama") {
      await preparePanoramaScene(stage, item, signal);
    } else if (item.type === "3dmodel") {
      await prepareModelScene(stage, item, signal);
    } else {
      const { prepareGaussianScene } = await import("@/components/viewer/renderers/gaussian-renderer");
      await prepareGaussianScene(stage, item, signal);
    }
    signal.throwIfAborted();
    return await stage.capture(maxSize);
  } finally {
    stage?.dispose();
    host.remove();
  }
}

/** Generate a thumbnail with the same initial scene setup used by the viewer. */
export async function generateThumbnail(item: MediaItem, opts: GenerateOptions = {}): Promise<Blob> {
  const maxSize = checkedSize(opts.maxSize);
  const signal = opts.signal ?? new AbortController().signal;
  signal.throwIfAborted();
  switch (item.type) {
    case "image":
      return generateImage(item, maxSize, signal);
    case "video":
      return generateVideo(item, maxSize, signal);
    case "youtube":
      return generateYouTube(item, signal);
    case "panorama":
    case "3dmodel":
    case "gaussian":
      return generateThreeThumbnail(item, maxSize, signal);
  }
}
