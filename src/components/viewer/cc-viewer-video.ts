import { CcViewerBase } from './cc-viewer-base'

export class CcViewerVideo extends CcViewerBase {
  private videoUrl = ''
  private fitToContainer = false
  
  static get observedAttributes() {
    return ['show', 'fit-to-container']
  }
  
  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (name === 'show') {
      this.isShow = newValue === 'true'
    } else if (name === 'fit-to-container') {
      this.fitToContainer = newValue === 'true'
    }
    super.attributeChangedCallback(name, oldValue, newValue)
  }
  
  protected doOpen(url: string): void {
    this.videoUrl = url
  }
  
  protected doClose(): void {
    // Pause video before closing
    const video = this.query('video')
    if (video && 'pause' in video) {
      (video as HTMLVideoElement).pause()
    }
    this.videoUrl = ''
  }
  
  protected getViewerContent(): string {
    return `
      <div class="video-container">
        ${this.videoUrl ? `
          <video
            src="${this.videoUrl}"
            controls
            controlsList="nodownload"
            class="${this.fitToContainer ? 'fit-to-container' : ''}"
          >
            Your browser does not support the video tag.
          </video>
        ` : '<div class="video-error">No video URL provided</div>'}
      </div>
    `
  }
  
  protected getCustomStyles(): string {
    return `
      .video-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: #000;
      }
      
      video {
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
        outline: none;
      }
      
      video.fit-to-container {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      
      .video-error {
        color: #fff;
        text-align: center;
        padding: 20px;
      }
    `
  }
  
  protected onAfterRender(): void {
    const video = this.query('video')
    if (video) {
      video.addEventListener('error', (e) => this.handleVideoError(e))
    }
  }
  
  private handleVideoError(e: Event) {
    const video = e.target as HTMLVideoElement
    const container = this.query('.video-container')
    if (container) {
      container.innerHTML = `
        <div class="video-error">
          Failed to load video: ${this.videoUrl}
        </div>
      `
    }
  }
}

if (!customElements.get('cc-viewer-video')) {
  customElements.define('cc-viewer-video', CcViewerVideo)
}

declare global {
  interface HTMLElementTagNameMap {
    'cc-viewer-video': CcViewerVideo
  }
}