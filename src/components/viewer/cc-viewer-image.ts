import { CcViewerBase } from './cc-viewer-base'
import Viewer from 'viewerjs'
import viewerStyles from 'viewerjs/dist/viewer.css?inline'

export class CcViewerImage extends CcViewerBase {
  private viewer?: Viewer
  private container?: HTMLDivElement
  private imageUrl = ''
  
  protected doOpen(url: string): void {
    this.imageUrl = url
    
    setTimeout(() => {
      this.container = this.query('#imageContainer') ?? undefined
      if (!this.container) return
      
      const img = document.createElement('img')
      img.src = this.imageUrl
      img.style.display = 'none'  // 元の画像を非表示に
      
      this.container.appendChild(img)
      
      // ViewerJSをインラインモードで使用して、独自のコンテナ内で表示
      this.viewer = new Viewer(img, {
        inline: true,  // インラインモードに変更
        container: this.container,  // コンテナを指定
        toolbar: {
          zoomIn: true,
          zoomOut: true,
          oneToOne: true,
          reset: true,
          prev: false,
          play: false,
          next: false,
          rotateLeft: true,
          rotateRight: true,
          flipHorizontal: true,
          flipVertical: true,
        },
        navbar: false,
        title: false,
        keyboard: true,
        backdrop: false,  // インラインモードでは背景を無効化
        button: false,    // 閉じるボタンを無効化
        movable: true,
        zoomable: true,
        rotatable: true,
        scalable: true,
        transition: true,
        fullscreen: false,
        ready: () => {
          this.addNavigationListeners()
        }
      })
      
      // show()を呼ばない - インラインモードでは自動的に表示される
    }, 0)
  }
  
  protected doClose(): void {
    if (this.viewer) {
      this.viewer.destroy()
      this.viewer = undefined
    }
    this.imageUrl = ''
  }
  
  protected getViewerContent(): string {
    return `
      <div id="imageContainer">
        ${this.isLoading ? '<div class="loading">Loading...</div>' : ''}
      </div>
    `
  }
  
  protected getCustomStyles(): string {
    const styles = this.css`
      ${viewerStyles}
      
      :host {
        --cc-viewer-z-index-each: 1000;
      }
      
      #imageContainer {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: var(--cc-viewer-z-index-each, 1000);
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      /* ViewerJS inline mode adjustments */
      .viewer-container {
        width: 100% !important;
        height: 100% !important;
        position: relative !important;
      }
      
      .viewer-canvas {
        width: 100% !important;
        height: 100% !important;
      }
      
      /* Hide the original image */
      #imageContainer > img {
        display: none !important;
      }
      
      /* Ensure viewer takes full space */
      .viewer-container.viewer-inline {
        width: 100% !important;
        height: 100% !important;
      }
      
      ${this.getNavigationStyles()}
      
      /* Override viewerjs styles for navigation */
      :host ::ng-deep .viewer-container {
        position: relative;
      }
    `
    
    return styles
  }
  
  // Override to do setup after render
  protected onAfterRender(): void {
    if (!this.isShow || !this.imageUrl) return
    
    // Avoid duplicate initialization
    if (this.viewer) return
    
    this.container = this.query('#imageContainer') as HTMLDivElement
    if (!this.container) return
    
    const img = document.createElement('img')
    img.src = this.imageUrl
    img.style.display = 'none'  // 元の画像を非表示に
    
    this.container.appendChild(img)
    
    // ViewerJSをインラインモードで使用して、独自のコンテナ内で表示
    this.viewer = new Viewer(img, {
      inline: true,  // インラインモードに変更
      container: this.container,  // コンテナを指定
      toolbar: {
        zoomIn: true,
        zoomOut: true,
        oneToOne: true,
        reset: true,
        prev: false,
        play: false,
        next: false,
        rotateLeft: true,
        rotateRight: true,
        flipHorizontal: true,
        flipVertical: true,
      },
      navbar: false,
      title: false,
      keyboard: true,
      backdrop: false,  // インラインモードでは背景を無効化
      button: false,    // 閉じるボタンを無効化
      movable: true,
      zoomable: true,
      rotatable: true,
      scalable: true,
      transition: true,
      fullscreen: false,
      ready: () => {
        this.isLoading = false
      }
    })
  }
}

if (!customElements.get('cc-viewer-image')) {
  customElements.define('cc-viewer-image', CcViewerImage)
}

declare global {
  interface HTMLElementTagNameMap {
    'cc-viewer-image': CcViewerImage
  }
}