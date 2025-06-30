import { CcViewerBase } from './cc-viewer-base'

export class CcViewerYoutube extends CcViewerBase {
  private videoUrl = ''
  private isShow = false
  
  static get observedAttributes() {
    return ['show']
  }
  
  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (name === 'show') {
      this.isShow = newValue === 'true'
    }
    super.attributeChangedCallback(name, oldValue, newValue)
  }
  
  open(videoUrl: string) {
    this.videoUrl = videoUrl
    this.isShow = true
    this.render()
    
    setTimeout(() => {
      const iframeEl = this.query('.iframe') as HTMLIFrameElement
      if (iframeEl) {
        iframeEl.src = this.videoUrl
      }
      this.addNavigationListeners()
    }, 0)
  }
  
  close() {
    const iframeEl = this.query('.iframe') as HTMLIFrameElement
    if (iframeEl) {
      iframeEl.src = ''
    }
    this.videoUrl = ''
    this.isShow = false
    this.render()
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
      
      .close {
        position: absolute;
        right: 20px;
        top: 20px;
        cursor: pointer;
        z-index: 10;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 50%;
        transition: background-color 0.3s ease;
      }
      
      .close:hover {
        background-color: rgba(0, 0, 0, 0.8);
      }
      
      .close svg {
        width: 24px;
        height: 24px;
        color: #fff;
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
      
      .iframe {
        position: relative;
        width: 100%;
        height: 100%;
        border: 0;
      }
      
      ${this.getNavigationStyles()}
    `
    
    const html = `
      ${styles}
      <div class="backdrop" style="${this.isShow ? 'visibility: visible' : 'visibility: hidden'}">
        <div class="close">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
        ${this.getNavigationButtons()}
        <div class="viewer">
          <iframe class="iframe" allowfullscreen></iframe>
        </div>
      </div>
    `
    
    this.updateShadowRoot(html)
    
    // Add close button listener after render
    setTimeout(() => {
      const closeBtn = this.query('.close')
      if (closeBtn) {
        closeBtn.addEventListener('click', () => this.close())
      }
    }, 0)
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