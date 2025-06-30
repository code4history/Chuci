import { CcViewerBase } from './cc-viewer-base'

export class CcViewerPanorama extends CcViewerBase {
  private imgUrl = ''
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
  
  open(imgUrl: string) {
    this.imgUrl = imgUrl
    this.isShow = true
    this.render()
    
    setTimeout(() => {
      const iframeEl = this.query('.iframe') as HTMLIFrameElement
      if (iframeEl) {
        const iframeHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <title>A-Frame Panorama</title>
              <style>
              html,body {
                width:100%;
                height:100vh;
                overflow: hidden;
              }
              .a-enter-vr, .a-enter-ar {
                display: none;
              }
              </style>
              <script src="https://aframe.io/releases/1.4.0/aframe.min.js"></script>
            </head>
            <body>
              <a-scene embedded xr-mode-ui="enabled: false; XRMode: false;">
                <a-sky src="${this.imgUrl}" rotation="0 -90 0"></a-sky>
                <a-entity camera look-controls="reverseMouseDrag: true"></a-entity>
              </a-scene>
            </body>
          </html>
        `
        iframeEl.srcdoc = iframeHtml
      }
      
      this.addNavigationListeners()
    }, 0)
  }
  
  close() {
    const iframeEl = this.query('.iframe') as HTMLIFrameElement
    if (iframeEl) {
      iframeEl.srcdoc = ''
    }
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
          <iframe class="iframe"></iframe>
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

if (!customElements.get('cc-viewer-panorama')) {
  customElements.define('cc-viewer-panorama', CcViewerPanorama)
}

declare global {
  interface HTMLElementTagNameMap {
    'cc-viewer-panorama': CcViewerPanorama
  }
}