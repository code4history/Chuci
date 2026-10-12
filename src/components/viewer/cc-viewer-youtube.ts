import { CcViewerBase } from './cc-viewer-base'
import { toYouTubeIframeSrc } from '../../utils/youtube-embed'

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
    // https の値（YouTube は埋め込み形式）だけを残す。それ以外は空にして src を付けない（A2-C-1・HR-16）
    this.videoUrl = toYouTubeIframeSrc(videoUrl) ?? ''
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
  // src に入るのは toYouTubeIframeSrc が https に限った値だけ（A2-C-1・HR-16）。
  protected getViewerContent(): string {
    return `<iframe class="iframe" allowfullscreen></iframe>`
  }

  protected applyExternalValues(): void {
    const iframeEl = this.query('.iframe')
    if (!iframeEl) return
    // 拒否したときは前回の値を残さない（拒否した入力で前の動画が出ないように）
    if (this.videoUrl) iframeEl.setAttribute('src', this.videoUrl)
    else iframeEl.removeAttribute('src')
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