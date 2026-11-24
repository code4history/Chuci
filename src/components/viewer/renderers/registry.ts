import type { MediaType } from "@/core/media-item";
import type { MediaRenderer } from "./types";
import { ImageRenderer } from "./image-renderer";
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
    case "video":
      return new VideoRenderer();
    case "youtube":
      return new YoutubeRenderer();
    default:
      return new UnsupportedRenderer(type);
  }
}
