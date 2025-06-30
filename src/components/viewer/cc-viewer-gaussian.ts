import { CcViewerBase } from './cc-viewer-base'

export class CcViewerGaussian extends CcViewerBase {
  private splatUrl = ''
  private isShow = false
  private isLoading = true
  private debugMode = false
  private cameraPosition = '3,3,3'
  private _cameraTarget = '0,0,0' // TODO: Implement camera target functionality
  
  private scene?: any
  private camera?: any
  private renderer?: any
  private controls?: any
  private animationId?: number
  private canvas?: HTMLCanvasElement
  
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
  
  open(url: string) {
    this.splatUrl = url
    this.isLoading = true
    this.isShow = true
    this.render()
    
    // Wait for render to complete before initializing
    setTimeout(() => {
      this.initializeViewer()
      this.addNavigationListeners()
    }, 0)
  }
  
  close() {
    this.cleanup()
    this.splatUrl = ''
    this.isShow = false
    this.render()
  }
  
  private cleanup() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
      this.animationId = undefined
    }
    
    if (this.renderer && typeof this.renderer.dispose === 'function') {
      this.renderer.dispose()
    }
    
    this.scene = undefined
    this.camera = undefined
    this.renderer = undefined
    this.controls = undefined
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
    this.canvas = this.query('canvas') as HTMLCanvasElement
    if (!this.canvas) return
    
    try {
      const container = this.query('.gaussian-container') as HTMLDivElement
      if (!container) return
      
      // Import gsplat using the proven API approach
      const SPLAT = await import('gsplat')
      
      // Setup GSplat components using the working approach from 3dViewer
      this.scene = new SPLAT.Scene()
      this.camera = new SPLAT.Camera()
      this.renderer = new SPLAT.WebGLRenderer(this.canvas)
      this.controls = new SPLAT.OrbitControls(this.camera, this.canvas)
      
      // Debug camera and controls object structure
      console.log('Camera object:', this.camera)
      console.log('Camera position:', this.camera.position)
      console.log('Controls object:', this.controls)
      console.log('All controls properties:', Object.keys(this.controls))
      
      // Set camera position using the actual API structure
      if (!this.cameraPosition) {
        this.camera.position.x = 3
        this.camera.position.y = 3
        this.camera.position.z = 3
      } else {
        const [x, y, z] = this.cameraPosition.split(',').map(Number)
        if (!isNaN(x) && !isNaN(y) && !isNaN(z)) {
          this.camera.position.x = x
          this.camera.position.y = y
          this.camera.position.z = z
        } else {
          this.camera.position.x = 3
          this.camera.position.y = 3
          this.camera.position.z = 3
        }
      }
      
      // gsplat.js OrbitControls may not have a target property like Three.js
      // Skip target setting for now until we understand the API
      console.log('Camera position set to:', this.camera.position)
      
      // Update controls to apply initial position and target
      this.controls.update()
      
      // Load the splat file
      await SPLAT.Loader.LoadAsync(this.splatUrl, this.scene)
      
      // Start render loop
      const animate = () => {
        this.animationId = requestAnimationFrame(animate)
        this.controls.update()
        this.renderer.render(this.scene, this.camera)
        
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
      
      this.isLoading = false
      this.render()
      
    } catch (error) {
      console.error('Failed to load Gaussian Splatting model:', error)
      this.isLoading = false
      this.render()
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
      
      .gaussian-container {
        width: 100%;
        height: 100%;
        position: relative;
        background: #000;
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
      }
      
      ${this.getNavigationStyles()}
    `
    
    const gaussianContent = !this.splatUrl ? 
      '<div class="error">No splat URL provided</div>' :
      `
        <canvas></canvas>
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
        <div class="close">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
        ${this.getNavigationButtons()}
        <div class="viewer">
          <div class="gaussian-container">
            ${gaussianContent}
          </div>
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

if (!customElements.get('cc-viewer-gaussian')) {
  customElements.define('cc-viewer-gaussian', CcViewerGaussian)
}

declare global {
  interface HTMLElementTagNameMap {
    'cc-viewer-gaussian': CcViewerGaussian
  }
}