import type { MediaType } from "@/core/media-item";

const PATHS: Record<MediaType, string> = {
  image: '<path d="M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4M8 9h.01"/>',
  panorama: '<ellipse cx="12" cy="12" rx="9" ry="5"/><path d="M12 7c3 3 3 7 0 10M12 7c-3 3-3 7 0 10M3 12h18"/>',
  youtube: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M10 9l5 3-5 3z"/>',
  video: '<rect x="3" y="5" width="14" height="14" rx="2"/><path d="M17 10l4-2v8l-4-2M8 9l5 3-5 3z"/>',
  "3dmodel": '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9zM4 7.5l8 4.5 8-4.5M12 12v9"/>',
  gaussian: '<circle cx="8" cy="9" r="3"/><circle cx="15" cy="8" r="2.5"/><circle cx="13" cy="15" r="4"/><circle cx="6" cy="16" r="2"/>',
};

/** Immediate, dependency-free placeholders used until a real thumbnail arrives. */
export function mediaTypeIcon(type: MediaType): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="#e5e7eb"/><g fill="none" stroke="#6b7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${PATHS[type]}</g></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
