import { CcViewerBase } from './cc-viewer-base'
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export class CcViewer3DModel extends CcViewerBase {
  private modelUrl = ''
  private materialUrl = ''
  private debugMode = false
  private cameraPosition = '3,3,3'
  private cameraTarget = '0,0,0'
  private showTexture = true
  
  private scene?: THREE.Scene
  private camera?: THREE.PerspectiveCamera
  private renderer?: THREE.WebGLRenderer
  private controls?: OrbitControls
  private animationId?: number
  private container?: HTMLDivElement
  private currentModel?: THREE.Group
  private originalMaterials: Map<THREE.Mesh, THREE.Material | THREE.Material[]> = new Map()
  private resizeObserver?: ResizeObserver
  private externalCanvas?: HTMLCanvasElement
  
  static get observedAttributes() {
    return ['show', 'debug-mode', 'camera-position', 'camera-target', 'show-texture', 'material-url']
  }
  
  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    
    if (name === 'show') {
      this.isShow = newValue === 'true'
    } else if (name === 'debug-mode') {
      this.debugMode = newValue === 'true' || newValue === ''
    } else if (name === 'camera-position') {
      this.cameraPosition = newValue || '3,3,3'
    } else if (name === 'camera-target') {
      this.cameraTarget = newValue || '0,0,0'
    } else if (name === 'show-texture') {
      this.showTexture = newValue !== 'false'
    } else if (name === 'material-url') {
      this.materialUrl = newValue || ''
    }
    
    // Re-render if viewer is already open and debug mode changes
    if (name === 'debug-mode' && this.isShow) {
      this.render()
    }
    
    super.attributeChangedCallback(name, oldValue, newValue)
  }
  
  // Implementation of abstract methods from base class
  protected async doOpen(url: string): Promise<void> {
    
    this.modelUrl = url
    // materialUrl is set via attribute
    this.showTexture = true
    
    await this.initializeViewer()
  }
  
  protected doClose(): void {
    this.cleanup()
    this.modelUrl = ''
    this.materialUrl = ''
  }
  
  protected getViewerContent(): string {
    
    const modelContent = !this.modelUrl ? 
      '<div class="error">No model URL provided</div>' :
      `
        ${this.isLoading ? '<div class="loading">Loading...</div>' : ''}
        ${!this.isLoading && this.debugMode ? `
          <div class="debug-info" style="z-index: 1005;">
            Camera Position: ${this.getCameraDebugInfo()}<br>
            Camera Target: ${this.getTargetDebugInfo()}<br>
            Controls: Rotate (drag), Zoom (scroll), Pan (right-drag)
          </div>
        ` : ''}
        ${!this.isLoading ? `
          <button class="texture-toggle">
            Texture: ${this.showTexture ? 'ON' : 'OFF'}
          </button>
        ` : ''}
      `
    
    return `
      <div class="model-container">
        ${modelContent}
      </div>
    `
  }
  
  // Custom styles for 3D viewer
  protected getCustomStyles(): string {
    return `
      .model-container {
        width: 100%;
        height: 100%;
        position: relative;
        background: transparent;
        z-index: 1;
      }
      
      .model-container canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
      }
      
      .loading {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #666;
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
      }
      
      .debug-info {
        position: absolute;
        top: 10px;
        left: 10px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px;
        font-family: monospace;
        font-size: 12px;
        border-radius: 4px;
        pointer-events: none;
        z-index: 1010;
      }
      
      .texture-toggle {
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        border: 1px solid #666;
        padding: 8px 16px;
        cursor: pointer;
        border-radius: 4px;
        transition: background 0.3s;
        z-index: 1010;
        pointer-events: auto;
      }
      
      .texture-toggle:hover {
        background: rgba(0, 0, 0, 0.9);
      }
    `
  }
  
  // Add texture toggle listener after render
  protected onAfterRender(): void {
    const textureBtn = this.query('.texture-toggle')
    if (textureBtn) {
      textureBtn.addEventListener('click', () => this.toggleTexture())
    }
  }
  
  private cleanup() {
    
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
      this.animationId = undefined
    }
    
    if (this.renderer) {
      this.renderer.dispose()
      // Remove canvas from document body
      if (this.renderer.domElement.parentNode === document.body) {
        document.body.removeChild(this.renderer.domElement)
      }
      this.renderer = undefined
    }
    
    if (this.controls) {
      this.controls.dispose()
      this.controls = undefined
    }
    
    // Clear Three.js objects
    if (this.scene) {
      this.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry?.dispose()
          if (Array.isArray(child.material)) {
            child.material.forEach(m => m.dispose())
          } else {
            child.material?.dispose()
          }
        }
      })
      this.scene.clear()
    }
    
    this.scene = undefined
    this.camera = undefined
    this.currentModel = undefined
    this.originalMaterials.clear()
    
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
      this.resizeObserver = undefined
    }
    
    this.container = undefined
  }
  
  private storeOriginalMaterials(object: THREE.Group) {
    object.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        this.originalMaterials.set(child, child.material)
      }
    })
  }
  
  private toggleTexture() {
    this.showTexture = !this.showTexture
    
    if (!this.currentModel) return
    
    this.currentModel.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (this.showTexture) {
          // Restore original materials
          const original = this.originalMaterials.get(child)
          if (original) {
            child.material = original
          }
        } else {
          // Apply simple color material
          const color = new THREE.Color(0xcccccc)
          child.material = new THREE.MeshPhongMaterial({ color })
        }
      }
    })
    
    this.render()
  }
  
  private getCameraDebugInfo(): string {
    if (!this.camera) return 'N/A'
    const pos = this.camera.position
    return `${pos.x.toFixed(2)}, ${pos.y.toFixed(2)}, ${pos.z.toFixed(2)}`
  }
  
  private getTargetDebugInfo(): string {
    if (!this.controls) return 'N/A'
    const target = this.controls.target
    return `${target.x.toFixed(2)}, ${target.y.toFixed(2)}, ${target.z.toFixed(2)}`
  }
  
  private updateDebugInfo() {
    // Update debug display
    const debugEl = this.query('.debug-info')
    if (debugEl && this.debugMode) {
      debugEl.innerHTML = `
        Camera Position: ${this.getCameraDebugInfo()}<br>
        Camera Target: ${this.getTargetDebugInfo()}<br>
        Controls: Rotate (drag), Zoom (scroll), Pan (right-drag)
      `
    }
  }
  
  private async initializeViewer() {
    
    // Wait a moment to ensure DOM is ready
    await new Promise(resolve => setTimeout(resolve, 50))
    
    this.container = this.query('.model-container') as HTMLDivElement
    if (!this.container) {
      return
    }
    
    // Get the actual position of the container in the viewport
    const rect = this.container.getBoundingClientRect()
    
    
    try {
      // Setup scene
      this.scene = new THREE.Scene()
      this.scene.background = new THREE.Color(0x303030) // Dark gray background
      
      // Setup camera
      const width = this.container.clientWidth || this.container.offsetWidth
      const height = this.container.clientHeight || this.container.offsetHeight
      this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
      
      // Setup renderer
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      this.renderer.setSize(width, height)
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.shadowMap.enabled = true
      
      // Create canvas outside shadow DOM
      const canvas = this.renderer.domElement
      canvas.style.position = 'fixed'
      canvas.style.left = `${rect.left}px`
      canvas.style.top = `${rect.top}px`
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      canvas.style.pointerEvents = 'auto'
      canvas.style.zIndex = 'calc(var(--cc-viewer-z-index-each, 1000) + 1)'
      document.body.appendChild(canvas)
      
      // Store canvas reference for cleanup
      this.externalCanvas = canvas
      
      
      // Setup controls - use the canvas in document body
      this.controls = new OrbitControls(this.camera, canvas)
      this.controls.enableDamping = true
      this.controls.dampingFactor = 0.05
      
      // Setup lights
      const ambientLight = new THREE.AmbientLight(0x404040, 2)
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
      directionalLight.position.set(1, 1, 1)
      this.scene.add(ambientLight, directionalLight)
      
      // Load model
      await this.loadModel()
      
      // Setup resize handler
      this.resizeObserver = new ResizeObserver((entries) => {
        // Ignore resize events with zero size
        for (const entry of entries) {
          const { width, height } = entry.contentRect
          if (width > 0 && height > 0) {
            this.handleResize()
          }
        }
      })
      this.resizeObserver.observe(this.container)
      
      // Start animation
      this.animateLoop()
      
    } catch (error) {
      throw error
    }
  }
  
  private async loadModel() {
    const objLoader = new OBJLoader()
    
    try {
      // Load materials if provided
      if (this.materialUrl) {
        const mtlLoader = new MTLLoader()
        const basePath = this.materialUrl.substring(0, this.materialUrl.lastIndexOf('/') + 1)
        mtlLoader.setPath(basePath)
        
        const materials = await new Promise<MTLLoader.MaterialCreator>((resolve, reject) => {
          const filename = this.materialUrl.substring(this.materialUrl.lastIndexOf('/') + 1)
          mtlLoader.load(filename, resolve, undefined, reject)
        })
        
        materials.preload()
        objLoader.setMaterials(materials)
      }
      
      // Load OBJ
      const basePath = this.modelUrl.substring(0, this.modelUrl.lastIndexOf('/') + 1)
      objLoader.setPath(basePath)
      
      const object = await new Promise<THREE.Group>((resolve, reject) => {
        const filename = this.modelUrl.substring(this.modelUrl.lastIndexOf('/') + 1)
        objLoader.load(filename, resolve, undefined, reject)
      })
      
      // Center and scale the model
      const box = new THREE.Box3().setFromObject(object)
      const size = new THREE.Vector3()
      box.getSize(size)
      const maxDim = Math.max(size.x, size.y, size.z)
      object.scale.multiplyScalar(3.0 / maxDim)
      
      const center = new THREE.Vector3()
      box.getCenter(center)
      object.position.sub(center.multiplyScalar(object.scale.x))
      
      // Check if scene still exists (viewer might have been closed)
      if (!this.scene) {
        return
      }
      
      this.scene.add(object)
      this.currentModel = object
      
      // Store original materials for texture toggling
      this.storeOriginalMaterials(object)
      
      // Position camera from attributes
      const camPos = this.cameraPosition.split(',').map(n => parseFloat(n.trim()))
      const camTarget = this.cameraTarget.split(',').map(n => parseFloat(n.trim()))
      
      if (camPos.length === 3) {
        this.camera!.position.set(camPos[0], camPos[1], camPos[2])
      }
      if (camTarget.length === 3) {
        this.camera!.lookAt(camTarget[0], camTarget[1], camTarget[2])
        this.controls!.target.set(camTarget[0], camTarget[1], camTarget[2])
      }
      this.controls!.update()
      
      
      // Force initial render
      if (this.renderer && this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera)
      }
      
    } catch (error) {
      throw error
    }
  }
  
  private animateLoop = () => {
    // Check if renderer still exists before continuing
    if (!this.renderer || !this.scene || !this.camera) {
      return
    }
    
    this.animationId = requestAnimationFrame(this.animateLoop)
    
    if (this.controls) {
      this.controls.update()
    }
    
    this.renderer.render(this.scene, this.camera)
    
    // Update debug info if in debug mode
    this.updateDebugInfo()
  }
  
  private handleResize() {
    if (!this.container || !this.camera || !this.renderer) return
    
    const rect = this.container.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    
    
    if (width > 0 && height > 0) {
      this.camera.aspect = width / height
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(width, height)
      
      // Update canvas position
      const canvas = this.renderer.domElement
      canvas.style.left = `${rect.left}px`
      canvas.style.top = `${rect.top}px`
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
    }
  }
}

if (!customElements.get('cc-viewer-3dmodel')) {
  customElements.define('cc-viewer-3dmodel', CcViewer3DModel)
}

declare global {
  interface HTMLElementTagNameMap {
    'cc-viewer-3dmodel': CcViewer3DModel
  }
}