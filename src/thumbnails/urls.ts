import { readMediaItem, type MediaItem } from "@/core/media-item";

function resolveUrl(url: string, baseURI: string): string {
  if (!url) return url;
  try {
    return new URL(url, baseURI).href;
  } catch {
    return url;
  }
}

export function resolveThumbnailItem(item: MediaItem, baseURI = document.baseURI): MediaItem {
  return {
    ...item,
    url: resolveUrl(item.url, baseURI),
    materialUrl: item.materialUrl === undefined ? undefined : resolveUrl(item.materialUrl, baseURI),
  };
}

export function readThumbnailItem(slide: Element): MediaItem {
  return resolveThumbnailItem(readMediaItem(slide), slide.ownerDocument.baseURI);
}
