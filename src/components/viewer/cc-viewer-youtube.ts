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
  
  protected getViewerContent(): string {
    return `<iframe class="iframe" src="${this.videoUrl}" allowfullscreen></iframe>`
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