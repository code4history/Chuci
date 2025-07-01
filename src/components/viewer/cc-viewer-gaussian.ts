import { CcViewerBase } from './cc-viewer-base'

export class CcViewerGaussian extends CcViewerBase {
  private splatUrl = ''
  private debugMode = false
  private cameraPosition = '3,3,3'
  private _cameraTarget = '0,0,0' // TODO: Implement camera target functionality
  
  private scene?: any
  private camera?: any
  private renderer?: any
  private controls?: any
  private animationId?: number
  private canvas?: HTMLCanvasElement
  private swiper?: any
  
  static get observedAttributes() {
    return ['show', 'debug-mode', 'camera-position', 'camera-target']
  }
  
  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (name === 'show') {
      this.isShow = newValue === 'true'
    } else if (name === 'debug-mode') {
      this.debugMode = newValue === 'true'
    } else if (name === 'camera-position') {
      this.cameraPosition = newValue || '3,3,3'
    } else if (name === 'camera-target') {
      this._cameraTarget = newValue || '0,0,0'
    }
    super.attributeChangedCallback(name, oldValue, newValue)
  }
  
  // Implementation of abstract methods from base class
  protected async doOpen(url: string): Promise<void> {
    this.splatUrl = url
    await this.initializeViewer()
  }
  
  protected doClose(): void {
    this.cleanup()
  }
  
  protected getViewerContent(): string {
    // This won't be used since we override render, but required by abstract class
    return ''
  }
  
  // Override to use custom rendering due to special canvas handling
  protected shouldUseCustomRender(): boolean {
    return true
  }
  
  // Custom render implementation
  protected customRender(): void {
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
        z-index: 1000;
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
      
      .gaussian-container {
        width: 100%;
        height: 100%;
        position: relative;
        background: #000;
      }
      
      .gaussian-container canvas {
        width: 100% !important;
        height: 100% !important;
        display: block;
      }
      
      .loading {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
        font-size: 1.2rem;
      }
      
      .error {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #e74c3c;
        text-align: center;
        padding: 20px;
      }
      
      canvas {
        display: block;
        width: 100%;
        height: 100%;
        touch-action: none;
      }
      
      .debug-info {
        position: absolute;
        top: 10px;
        left: 10px;
        background: rgba(0, 0, 0, 0.85);
        color: #00ff00;
        padding: 12px;
        font-family: 'Courier New', monospace;
        font-size: 11px;
        line-height: 1.4;
        border-radius: 6px;
        border: 1px solid rgba(0, 255, 0, 0.3);
        pointer-events: none;
        white-space: pre-line;
        min-width: 200px;
        z-index: 1003;
      }
      
      ${this.getNavigationStyles()}
    `
    
    const gaussianContent = `
        <canvas style="display: none;"></canvas>
        ${this.isLoading ? '<div class="loading">Loading...</div>' : ''}
        ${!this.isLoading && this.debugMode ? `
          <div class="debug-info">
📍 Camera Position:
${this.getCameraDebugInfo()}

🎯 Camera Target:
${this.getTargetDebugInfo()}

🎮 Controls:
• Rotate: Left-drag
• Zoom: Scroll wheel
• Pan: Right-drag or Shift+Left-drag

📊 Status: ${this.scene ? 'Splat loaded' : 'Loading...'}
          </div>
        ` : ''}
      `
    
    const html = `
      ${styles}
      <div class="backdrop" style="${this.isShow ? 'visibility: visible' : 'visibility: hidden'}">
        <div class="viewer">
          <div class="gaussian-container">
            ${gaussianContent}
          </div>
        </div>
        ${this.getNavigationButtons()}
      </div>
    `
    
    this.updateShadowRoot(html)
    
    // Add navigation listeners after render
    setTimeout(() => {
      this.addNavigationListeners()
    }, 0)
  }
  
  private cleanup() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
      this.animationId = undefined
    }
    
    if (this.renderer && typeof this.renderer.dispose === 'function') {
      this.renderer.dispose()
    }
    
    // Remove all gaussian canvases from document.body
    const existingCanvases = document.querySelectorAll('canvas[id^="gaussian-canvas-"]')
    existingCanvases.forEach(canvas => {
      if (canvas.parentNode === document.body) {
        document.body.removeChild(canvas)
      }
    })
    
    this.scene = undefined
    this.camera = undefined
    this.renderer = undefined
    this.controls = undefined
    this.canvas = undefined
  }
  
  private getCameraDebugInfo(): string {
    if (!this.camera || !this.camera.position) return 'Position: unavailable'
    const pos = this.camera.position
    try {
      return `X: ${pos.x.toFixed(3)}, Y: ${pos.y.toFixed(3)}, Z: ${pos.z.toFixed(3)}`
    } catch (error) {
      return `Position: ${JSON.stringify(pos)}`
    }
  }
  
  private getTargetDebugInfo(): string {
    if (!this.controls) return 'Target: controls unavailable'
    // gsplat.js OrbitControls might not have a target property
    // Return available control info instead
    try {
      return `Controls active (no target property in gsplat.js)`
    } catch (error) {
      return `Target: ${JSON.stringify(this.controls)}`
    }
  }
  
  private updateDebugInfo() {
    // Update debug display
    const debugEl = this.query('.debug-info')
    if (debugEl) {
      debugEl.innerHTML = `
📍 Camera Position:
${this.getCameraDebugInfo()}

🎯 Camera Target:
${this.getTargetDebugInfo()}

🎮 Controls:
• Rotate: Left-drag
• Zoom: Scroll wheel
• Pan: Right-drag or Shift+Left-drag

📊 Status: ${this.scene ? 'Splat loaded' : 'Loading...'}
      `
    }
  }
  
  private async initializeViewer() {
    // Create a unique ID for this instance
    const canvasId = `gaussian-canvas-${Date.now()}`
    
    // Get the viewer container dimensions
    const viewerEl = this.query('.viewer') as HTMLElement
    if (!viewerEl) return
    
    const rect = viewerEl.getBoundingClientRect()
    
    // Check if canvas already exists in normal DOM
    let normalCanvas = document.getElementById(canvasId) as HTMLCanvasElement
    if (!normalCanvas) {
      normalCanvas = document.createElement('canvas')
      normalCanvas.id = canvasId
      normalCanvas.style.position = 'fixed'
      normalCanvas.style.top = `${rect.top}px`
      normalCanvas.style.left = `${rect.left}px`
      normalCanvas.style.width = `${rect.width}px`
      normalCanvas.style.height = `${rect.height}px`
      normalCanvas.style.zIndex = '1001'  // Above backdrop but below buttons
      normalCanvas.style.pointerEvents = 'auto'  // Keep mouse events for 3D controls
      normalCanvas.style.display = 'block'
      normalCanvas.style.background = 'transparent'
      document.body.appendChild(normalCanvas)
    }
    
    // Update canvas position in case viewer moved
    normalCanvas.style.top = `${rect.top}px`
    normalCanvas.style.left = `${rect.left}px`
    normalCanvas.style.width = `${rect.width}px`
    normalCanvas.style.height = `${rect.height}px`
    
    this.canvas = normalCanvas
    
    try {
      const container = this.query('.gaussian-container') as HTMLDivElement
      if (!container) return
      
      // Import gsplat using the proven API approach
      const SPLAT = await import('gsplat')
      
      // Setup GSplat components exactly like the React example
      this.scene = new SPLAT.Scene()
      this.camera = new SPLAT.Camera()
      this.renderer = new SPLAT.WebGLRenderer(this.canvas)
      this.controls = new SPLAT.OrbitControls(this.camera, this.canvas)
      
      // Load the splat file
      await SPLAT.Loader.LoadAsync(this.splatUrl, this.scene)
      
      // Start render loop
      let frameCount = 0
      const animate = () => {
        // Check if renderer still exists before continuing
        if (!this.renderer || !this.scene || !this.camera) {
          return
        }
        
        this.animationId = requestAnimationFrame(animate)
        
        if (this.controls) {
          this.controls.update()
        }
        
        try {
          this.renderer.render(this.scene, this.camera)
        } catch (e) {
        }
        
        // Log first frame only
        if (frameCount === 0 && this.canvas) {
          frameCount++
        }
        
        if (this.debugMode) {
          this.updateDebugInfo()
        }
      }
      animate()
      
      // Setup resize handler
      const resizeObserver = new ResizeObserver(() => {
        this.handleResize()
      })
      resizeObserver.observe(container)
      
    } catch (error) {
      throw error
    }
  }
  
  private handleResize() {
    const container = this.query('.gaussian-container') as HTMLDivElement
    if (!container || !this.renderer || !this.camera) return
    
    const width = container.clientWidth
    const height = container.clientHeight
    
    // Update renderer size
    if (typeof this.renderer.setSize === 'function') {
      this.renderer.setSize(width, height)
    }
    
    // Update camera aspect ratio
    if (typeof this.camera.aspect !== 'undefined') {
      this.camera.aspect = width / height
      if (typeof this.camera.updateProjectionMatrix === 'function') {
        this.camera.updateProjectionMatrix()
      }
    }
  }
}

if (!customElements.get('cc-viewer-gaussian')) {
  customElements.define('cc-viewer-gaussian', CcViewerGaussian)
}

declare global {
  interface HTMLElementTagNameMap {
    'cc-viewer-gaussian': CcViewerGaussian
  }
}