import type { MediaItem } from "@/core/media-item";
import { toYouTubeIframeSrc } from "@/utils/youtube-embed";
import { observeContainedSize } from "./fit";
import type { MediaRenderer, RendererContext } from "./types";

const YOUTUBE_ASPECT = 16 / 9;

export class YoutubeRenderer implements MediaRenderer {
  private dispose?: () => void;

  mount(
    host: HTMLElement,
    item: MediaItem,
    ctx: RendererContext
  ): Promise<void> {
    if (ctx.signal.aborted) return Promise.reject(ctx.signal.reason);

    const iframe = host.ownerDocument.createElement("iframe");
    iframe.title = "YouTube video";
    iframe.setAttribute("allowfullscreen", "");
    iframe.style.border = "0";

    const src = toYouTubeIframeSrc(item.url);
    if (src === null) {
      iframe.hidden = true;
      this.dispose = () => {
        iframe.remove();
        this.dispose = undefined;
      };
      host.append(iframe);
      return Promise.reject(new Error("Invalid YouTube URL"));
    }

    return new Promise((resolve, reject) => {
      const listeners = new AbortController();
      const options = { signal: listeners.signal };
      const stopFitting = observeContainedSize(host, iframe, YOUTUBE_ASPECT);

      const loaded = () => {
        iframe.removeEventListener("error", failed);
        resolve();
      };
      const failed = () => {
        iframe.removeEventListener("load", loaded);
        reject(new Error("Failed to load YouTube iframe"));
      };
      const onBlur = () => {
        // Focus inside a shadow root is retargeted to its host at document level.
        const root = iframe.getRootNode() as Document | ShadowRoot;
        if (root.activeElement === iframe) ctx.reportInteraction();
      };
      const dispose = () => {
        this.dispose = undefined;
        listeners.abort();
        stopFitting();
        reject(new DOMException("YouTube load aborted", "AbortError"));
        iframe.remove();
      };
      this.dispose = dispose;

      iframe.addEventListener("load", loaded, { ...options, once: true });
      iframe.addEventListener("error", failed, { ...options, once: true });
      host.ownerDocument.defaultView?.addEventListener("blur", onBlur, options);
      ctx.signal.addEventListener("abort", dispose, { ...options, once: true });
      iframe.setAttribute("src", src);
      host.append(iframe);
    });
  }

  unmount(): void {
    this.dispose?.();
  }
}
