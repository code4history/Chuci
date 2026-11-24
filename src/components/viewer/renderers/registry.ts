import type { MediaType } from "@/core/media-item";
import type { MediaRenderer } from "./types";
import { ImageRenderer } from "./image-renderer";
import { ModelRenderer } from "./model-renderer";
import { PanoramaRenderer } from "./panorama-renderer";
import { VideoRenderer } from "./video-renderer";
import { YoutubeRenderer } from "./youtube-renderer";

class UnsupportedRenderer implements MediaRenderer {
  constructor(private readonly type: MediaType) {}

  async mount(): Promise<void> {
    throw new Error(`Unsupported media type: ${this.type}`);
  }

  unmount(): void {}
}

export async function createRenderer(type: MediaType): Promise<MediaRenderer> {
  switch (type) {
    case "image":
      return new ImageRenderer();
    case "panorama":
      return new PanoramaRenderer();
    case "video":
      return new VideoRenderer();
    case "youtube":
      return new YoutubeRenderer();
    case "3dmodel":
      return new ModelRenderer();
    case "gaussian": {
      const { GaussianRenderer } = await import("./gaussian-renderer");
      return new GaussianRenderer();
    }
    default:
      return new UnsupportedRenderer(type);
  }
}
