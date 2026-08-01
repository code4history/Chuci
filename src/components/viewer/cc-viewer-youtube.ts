import { CcViewerBase } from './cc-viewer-base'

export class CcViewerYoutube extends CcViewerBase {
  private videoUrl = ''
  
  static get observedAttributes() {
    return ['show']
  }
  
  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (name === 'show') {
      this.isShow = newValue === 'true'
    }
    super.attributeChangedCallback(name, oldValue, newValue)
  }
  
  protected doOpen(videoUrl: string): void {
    // Convert YouTube URL to embed format
    const videoId = this.extractYouTubeId(videoUrl)
    if (videoId) {
      this.videoUrl = `https://www.youtube.com/embed/${videoId}`
    } else {
      this.videoUrl = videoUrl
    }
  }
  
  private extractYouTubeId(url: string): string | null {
    // Handle various YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/
    ]
    
    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) {
        return match[1]
      }
    }
    
    return null
  }
  
  protected doClose(): void {
    const iframeEl = this.query('.iframe') as HTMLIFrameElement
    if (iframeEl) {
      iframeEl.src = ''
    }
    this.videoUrl = ''
  }
  
  // m1-t9 S5: src を**テンプレートに埋めない**。videoUrl は POI 由来の外部値であり、
  // 文字列補間すると属性ブレイクアウトが成立する（設計 §5 D1）。
  // extractYouTubeId が失敗すると生 URL がそのまま videoUrl になるため（:23）、
  // 埋め込み形式に正規化されているとは限らない。
  protected getViewerContent(): string {
    return `<iframe class="iframe" allowfullscreen></iframe>`
  }

  protected applyExternalValues(): void {
    const iframeEl = this.query('.iframe')
    if (iframeEl) iframeEl.setAttribute('src', this.videoUrl)
  }
  
  protected getCustomStyles(): string {
    return `
      .iframe {
        position: relative;
        width: 100%;
        height: 100%;
        border: 0;
      }
    `
  }
}

if (!customElements.get('cc-viewer-youtube')) {
  customElements.define('cc-viewer-youtube', CcViewerYoutube)
}

declare global {
  interface HTMLElementTagNameMap {
    'cc-viewer-youtube': CcViewerYoutube
  }
}