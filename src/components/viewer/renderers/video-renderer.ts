import type { MediaItem } from "@/core/media-item";
import { observeContainedSize } from "./fit";
import type { MediaRenderer, RendererContext } from "./types";

export class VideoRenderer implements MediaRenderer {
  readonly reservesBottomBar = true;
  private dispose?: () => void;

  mount(
    host: HTMLElement,
    item: MediaItem,
    ctx: RendererContext
  ): Promise<void> {
    if (ctx.signal.aborted) return Promise.reject(ctx.signal.reason);
    if (!item.url) return Promise.reject(new Error("No video URL provided"));

    const video = host.ownerDocument.createElement("video");
    video.controls = true;
    video.setAttribute("controlslist", "nodownload");
    video.preload = "auto";
    video.style.objectFit = "contain";
    video.textContent = "Your browser does not support the video tag.";

    return new Promise((resolve, reject) => {
      const listeners = new AbortController();
      const options = { signal: listeners.signal };
      let stopFitting: (() => void) | undefined;
      let ready = false;

      const fit = () => {
        if (!video.videoWidth || !video.videoHeight) return;
        stopFitting = observeContainedSize(
          host,
          video,
          video.videoWidth / video.videoHeight
        );
      };
      const loaded = () => {
        ready = true;
        resolve();
      };
      const failed = () => {
        const error = new Error(`Failed to load video: ${item.url}`);
        if (ready) {
          ctx.reportError(error);
          return;
        }
        video.removeEventListener("loadeddata", loaded);
        reject(error);
      };
      const dispose = () => {
        this.dispose = undefined;
        listeners.abort();
        stopFitting?.();
        reject(new DOMException("Video load aborted", "AbortError"));
        if (!video.paused) video.pause();
        video.removeAttribute("src");
        if (video.networkState !== video.NETWORK_EMPTY) video.load();
        video.remove();
      };
      this.dispose = dispose;

      video.addEventListener("loadedmetadata", fit, { ...options, once: true });
      video.addEventListener("loadeddata", loaded, { ...options, once: true });
      video.addEventListener("error", failed, options);
      video.addEventListener("play", ctx.reportInteraction, options);
      ctx.signal.addEventListener("abort", dispose, { ...options, once: true });
      video.setAttribute("src", item.url);
      host.append(video);
    });
  }

  unmount(): void {
    this.dispose?.();
  }
}
