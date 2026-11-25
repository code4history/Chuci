import type { MediaItem } from "@/core/media-item";
import { prepareModelScene } from "@/components/viewer/renderers/model-renderer";
import { preparePanoramaScene } from "@/components/viewer/renderers/panorama-renderer";
import { ThreeStage } from "@/components/viewer/renderers/three-stage";
import { extractVideoId } from "@/utils/youtube-embed";
import { fetchThumbnailSource, forwardThumbnailProgress, loadThumbnailImage } from "./source";
import { resolveThumbnailItem } from "./urls";

export const THUMBNAIL_GENERATOR_VERSION = 4;
export const DEFAULT_THUMBNAIL_SIZE = 256;
const GAUSSIAN_THUMBNAIL_CSS_HEIGHT = 720;

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
  const bitmap = await createImageBitmap(await fetchThumbnailSource(item.url, signal));
  try {
    signal.throwIfAborted();
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
  const source = await fetchThumbnailSource(item.url, signal);
  signal.throwIfAborted();
  const video = document.createElement("video");
  video.crossOrigin = "anonymous";
  video.preload = "auto";
  video.muted = true;
  const url = URL.createObjectURL(source);
  try {
    const loaded = waitForMediaEvent(video, "loadeddata", signal);
    video.setAttribute("src", url);
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
    URL.revokeObjectURL(url);
  }
}

export function youtubeThumbnailUrl(url: string): string | null {
  const video = extractVideoId(url);
  return video ? `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg` : null;
}

async function generateYouTube(item: MediaItem, signal: AbortSignal): Promise<Blob> {
  const url = youtubeThumbnailUrl(item.url);
  if (!url) throw new Error("No YouTube video ID provided");
  return fetchThumbnailSource(url, signal);
}

async function generateThreeThumbnail(item: MediaItem, maxSize: number, signal: AbortSignal): Promise<Blob> {
  const panorama = item.type === "panorama" ? await loadThumbnailImage(document, item.url, signal) : undefined;
  const aspect = panorama ? panorama.naturalWidth / panorama.naturalHeight : 1;
  if (!Number.isFinite(aspect) || aspect <= 0) throw new Error("Invalid panorama dimensions");
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
  const dispose = () => {
    try {
      stage?.dispose();
    } finally {
      stage = undefined;
      host.remove();
    }
  };
  signal.addEventListener("abort", dispose, { once: true });
  try {
    const captureStage = new ThreeStage(host);
    stage = captureStage;
    if (item.type === "panorama") {
      await preparePanoramaScene(captureStage, item, signal, panorama);
    } else if (item.type === "3dmodel") {
      const scene = await prepareModelScene(captureStage, item, signal, true);
      if (item.showTexture !== false && scene.textureLoadFailed) {
        throw new Error("Failed to load a required model texture");
      }
    } else {
      const { prepareGaussianScene } = await import("@/components/viewer/renderers/gaussian-renderer");
      signal.throwIfAborted();
      await prepareGaussianScene(captureStage, item, signal, GAUSSIAN_THUMBNAIL_CSS_HEIGHT, fetchThumbnailSource);
    }
    signal.throwIfAborted();
    const blob = await captureStage.capture(maxSize);
    signal.throwIfAborted();
    return blob;
  } finally {
    signal.removeEventListener("abort", dispose);
    dispose();
  }
}

/** Generate a thumbnail with the same initial scene setup used by the viewer. */
export async function generateThumbnail(item: MediaItem, opts: GenerateOptions = {}): Promise<Blob> {
  const maxSize = checkedSize(opts.maxSize);
  const source = resolveThumbnailItem(item);
  const controller = new AbortController();
  const { signal } = controller;
  forwardThumbnailProgress(opts.signal, signal);
  const abort = () => controller.abort(opts.signal?.reason);
  opts.signal?.throwIfAborted();
  opts.signal?.addEventListener("abort", abort, { once: true });
  try {
    switch (source.type) {
      case "image":
        return await generateImage(source, maxSize, signal);
      case "video":
        return await generateVideo(source, maxSize, signal);
      case "youtube":
        return await generateYouTube(source, signal);
      case "panorama":
      case "3dmodel":
      case "gaussian":
        return await generateThreeThumbnail(source, maxSize, signal);
    }
    throw new Error("Unsupported media type");
  } finally {
    opts.signal?.removeEventListener("abort", abort);
    // A failed source can leave another model request in flight.
    controller.abort();
  }
}
