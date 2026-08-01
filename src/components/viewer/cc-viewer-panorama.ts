import { CcViewerBase } from './cc-viewer-base'

export class CcViewerPanorama extends CcViewerBase {
  private imgUrl = ''

  /**
   * m1-t9 D5（SRH-2）: aframe CDN の Subresource Integrity。
   *
   * 実際に取得して算出した（2026-08-01）:
   *   curl -sSL https://aframe.io/releases/1.4.0/aframe.min.js  → 1,325,299 bytes
   *   openssl dgst -sha384 -binary | openssl base64 -A
   *
   * SRI が無いと CDN 侵害時に viewer 文脈で任意コードが走る。
   * **URL の版を上げるときは必ずこのハッシュも取り直すこと**（不一致だと読み込まれない）。
   */
  private static readonly AFRAME_SRI =
    'sha384-rrkicQnp5c3ysj7SGZ2b/wF2W7mu6NQQMy4w63/dfRnMLkCL1d0IX4i3IOkYi2pj'
  
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
    // m1-t9: postMessage のリスナを残すと閉じた後も生き続ける
    if (this.onIframeReady) {
      window.removeEventListener('message', this.onIframeReady)
      this.onIframeReady = undefined
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
  
  /**
   * m1-t9 S4: srcdoc は **外部由来値を一切含まない固定文字列** である（設計 §5 D1）。
   *
   * 画像 URL は postMessage で iframe へ渡し、iframe 内で setAttribute する。
   * `contentDocument` を使わないのは、D4 で `sandbox="allow-scripts"` を採ると
   * iframe が opaque origin になり親からのアクセスが遮断されるためである。
   * postMessage なら sandbox の有無にかかわらず成立する。
   *
   * 競合を避けるため、iframe 側から `cc-panorama-ready` を受け取ってから URL を送る。
   */
  private static readonly IFRAME_HTML = `
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
              <script src="https://aframe.io/releases/1.4.0/aframe.min.js" integrity="${CcViewerPanorama.AFRAME_SRI}" crossorigin="anonymous"></script>
            </head>
            <body>
              <a-scene embedded xr-mode-ui="enabled: false; XRMode: false;">
                <a-sky rotation="0 -90 0"></a-sky>
                <a-entity camera look-controls="reverseMouseDrag: true"></a-entity>
              </a-scene>
              <script>
                // m1-t9: 画像 URL は親から postMessage で受け取り setAttribute で入れる。
                // srcdoc に埋めると属性ブレイクアウトが成立するため（SRH-1）。
                window.addEventListener('message', function (e) {
                  var d = e.data;
                  if (!d || d.type !== 'cc-panorama-src' || typeof d.src !== 'string') return;
                  var sky = document.querySelector('a-sky');
                  if (sky) sky.setAttribute('src', d.src);
                });
                parent.postMessage({ type: 'cc-panorama-ready' }, '*');
              </script>
            </body>
          </html>
        `

  private onIframeReady?: (e: MessageEvent) => void

  protected onAfterRender(): void {
    if (this.imgUrl && this.isShow) {
      const iframeEl = this.query('.iframe') as HTMLIFrameElement
      if (iframeEl) {
        if (this.onIframeReady) window.removeEventListener('message', this.onIframeReady)
        this.onIframeReady = (e: MessageEvent) => {
          if (!e.data || e.data.type !== 'cc-panorama-ready') return
          if (e.source !== iframeEl.contentWindow) return
          iframeEl.contentWindow?.postMessage(
            { type: 'cc-panorama-src', src: this.imgUrl },
            '*'
          )
        }
        window.addEventListener('message', this.onIframeReady)
        iframeEl.srcdoc = CcViewerPanorama.IFRAME_HTML
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