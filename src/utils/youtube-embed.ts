// cc-viewer-youtube の <iframe src> に入れる値を決める（A2-C-1・HR-16「緩い案: httpsなら通します」）。
// 公開 API にしない（src/index.ts から export しない）。

const YOUTUBE_HOSTS = new Set(['youtube.com', 'www.youtube.com', 'm.youtube.com'])
const NOCOOKIE_HOSTS = new Set(['youtube-nocookie.com', 'www.youtube-nocookie.com'])
const SHORT_HOST = 'youtu.be'
const VIDEO_ID = /^[A-Za-z0-9_-]+$/

/** URL のホストとパスから動画 ID を取り出す。YouTube の URL でなければ null */
function extractVideoId(url: URL): { id: string; nocookie: boolean } | null {
  const host = url.hostname
  const segments = url.pathname.split('/').filter(s => s !== '')
  let id: string | null = null
  let nocookie = false

  if (host === SHORT_HOST) {
    id = segments[0] ?? null
  } else if (YOUTUBE_HOSTS.has(host)) {
    if (url.pathname === '/watch') {
      id = url.searchParams.get('v')
    } else if (['embed', 'shorts', 'live'].includes(segments[0])) {
      id = segments[1] ?? null
    }
  } else if (NOCOOKIE_HOSTS.has(host)) {
    if (segments[0] === 'embed') {
      id = segments[1] ?? null
      nocookie = true
    }
  }

  if (id === null || !VIDEO_ID.test(id)) return null
  return { id, nocookie }
}

/**
 * cc-viewer-youtube が <iframe src> に入れる値を決める（A2-C-1・HR-16）。
 * 返り値は https の URL か null。null のときは src を付けない。
 */
export function toYouTubeIframeSrc(input: string): string | null {
  let url: URL
  try {
    // 基点を渡さない。基点（location.href）を渡すと相対 URL が通ってしまう
    url = new URL(input)
  } catch {
    return null
  }

  if (url.protocol === 'http:' || url.protocol === 'https:') {
    const video = extractVideoId(url)
    if (video) {
      // 元が http: でも iframe に入る値は https の埋め込み形式にする
      return video.nocookie
        ? `https://www.youtube-nocookie.com/embed/${video.id}`
        : `https://www.youtube.com/embed/${video.id}`
    }
  }

  if (url.protocol === 'https:') return url.href
  return null
}
