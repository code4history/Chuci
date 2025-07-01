import { CcViewerBase } from './cc-viewer-base'

export class CcViewerVideo extends CcViewerBase {
  private videoUrl = ''
  private isShow = false
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
  
  open(url: string) {
    this.videoUrl = url
    this.isShow = true
    this.render()
    
    setTimeout(() => {
      this.addNavigationListeners()
    }, 0)
  }
  
  close() {
    // Pause video before closing
    const video = this.query('video')
    if (video && 'pause' in video) {
      (video as HTMLVideoElement).pause()
    }
    this.videoUrl = ''
    this.isShow = false
    this.render()
  }
  
  private handleVideoError(e: Event) {
    const video = e.target as HTMLVideoElement
    console.error('Video loading error:', video.error)
    const container = this.query('.video-container')
    if (container) {
      container.innerHTML = `
        <div class="video-error">
          Failed to load video: ${this.videoUrl}
        </div>
      `
    }
  }
  
  protected render() {
    const styles = this.css`
      :host {
        --cc-viewer-z-index-each: 1000;
      }
      
      .backdrop {
        justify-content: center;
        align-items: center;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        z-index: var(--cc-viewer-z-index-each);
      }
      
      .viewer {
        position: absolute;
        width: 90%;
        height: 85%;
        inset: 0px;
        margin: auto;
        align-self: center;
        background-color: #000;
      }
      
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
      
      ${this.getNavigationStyles()}
    `
    
    const videoContent = this.videoUrl ? `
      <video
        src="${this.videoUrl}"
        controls
        controlsList="nodownload"
        class="${this.fitToContainer ? 'fit-to-container' : ''}"
      >
        Your browser does not support the video tag.
      </video>
    ` : '<div class="video-error">No video URL provided</div>'
    
    const html = `
      ${styles}
      <div class="backdrop" style="${this.isShow ? 'visibility: visible' : 'visibility: hidden'}">
        ${this.getNavigationButtons()}
        <div class="viewer">
          <div class="video-container">
            ${videoContent}
          </div>
        </div>
      </div>
    `
    
    this.updateShadowRoot(html)
    
    // Add listeners after render
    setTimeout(() => {
      const video = this.query('video')
      if (video) {
        video.addEventListener('error', (e) => this.handleVideoError(e))
      }
    }, 0)
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