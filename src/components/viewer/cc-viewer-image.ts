import { CcViewerBase } from './cc-viewer-base'
import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.css'

export class CcViewerImage extends CcViewerBase {
  private viewer?: Viewer
  private container?: HTMLDivElement
  
  open(url: string) {
    this.render()
    
    setTimeout(() => {
      this.container = this.query('#imageContainer') ?? undefined
      if (!this.container) return
      
      const img = document.createElement('img')
      img.src = url
      img.style.maxWidth = '100%'
      img.style.maxHeight = '100%'
      img.style.objectFit = 'contain'
      
      this.container.appendChild(img)
      
      this.viewer = new Viewer(img, {
        inline: false,
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
        backdrop: true,
        button: true,
        movable: true,
        zoomable: true,
        rotatable: true,
        scalable: true,
        transition: true,
        fullscreen: true,
        ready: () => {
          this.addNavigationListeners()
        }
      })
      
      this.viewer.show()
    }, 0)
  }
  
  close() {
    if (this.viewer) {
      this.viewer.destroy()
      this.viewer = undefined
    }
    this.updateShadowRoot('')
  }
  
  protected render() {
    const styles = this.css`
      :host {
        display: none;
      }
      
      #imageContainer {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: var(--cc-viewer-z-index-each, 1000);
      }
      
      ${this.getNavigationStyles()}
      
      /* Override viewerjs styles for navigation */
      :host ::ng-deep .viewer-container {
        position: relative;
      }
    `
    
    const html = `
      ${styles}
      <div id="imageContainer">
        ${this.getNavigationButtons()}
      </div>
    `
    
    this.updateShadowRoot(html)
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