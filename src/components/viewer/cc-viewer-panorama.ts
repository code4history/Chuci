import { CcViewerBase } from './cc-viewer-base'

export class CcViewerPanorama extends CcViewerBase {
  private imgUrl = ''
  
  static get observedAttributes() {
    return ['show']
  }
  
  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (name === 'show') {
      this.isShow = newValue === 'true'
    }
    super.attributeChangedCallback(name, oldValue, newValue)
  }
  
  protected doOpen(imgUrl: string): void {
    this.imgUrl = imgUrl
  }
  
  protected doClose(): void {
    const iframeEl = this.query('.iframe') as HTMLIFrameElement
    if (iframeEl) {
      iframeEl.srcdoc = ''
    }
    this.imgUrl = ''
  }
  
  protected getViewerContent(): string {
    return `<iframe class="iframe"></iframe>`
  }
  
  protected getCustomStyles(): string {
    return `
      .iframe {
        width: 100%;
        height: 100%;
        border: 0;
      }
    `
  }
  
  protected onAfterRender(): void {
    if (this.imgUrl && this.isShow) {
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
    }
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