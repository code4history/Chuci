import { CcViewerBase } from './cc-viewer-base'
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export class CcViewer3DModel extends CcViewerBase {
  private modelUrl = ''
  private materialUrl = ''
  private isShow = false
  private isLoading = true
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
  
  static get observedAttributes() {
    return ['show', 'debug-mode', 'camera-position', 'camera-target', 'show-texture']
  }
  
  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (name === 'show') {
      this.isShow = newValue === 'true'
    } else if (name === 'debug-mode') {
      this.debugMode = newValue === 'true'
    } else if (name === 'camera-position') {
      this.cameraPosition = newValue || '3,3,3'
    } else if (name === 'camera-target') {
      this.cameraTarget = newValue || '0,0,0'
    } else if (name === 'show-texture') {
      this.showTexture = newValue !== 'false'
    }
    super.attributeChangedCallback(name, oldValue, newValue)
  }
  
  open(url: string) {
    // URL format: "model.obj|material.mtl" or just "model.obj"
    const parts = url.split('|')
    this.modelUrl = parts[0]
    this.materialUrl = parts[1] || ''
    this.isLoading = true
    this.showTexture = true
    this.isShow = true
    this.render()
    
    // Wait for render to complete before initializing Three.js
    setTimeout(() => {
      this.initializeViewer()
      this.addNavigationListeners()
    }, 0)
  }
  
  close() {
    this.cleanup()
    this.modelUrl = ''
    this.materialUrl = ''
    this.isShow = false
    this.render()
  }
  
  private cleanup() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
      this.animationId = undefined
    }
    
    if (this.renderer) {
      this.renderer.dispose()
      this.renderer.domElement.remove()
      this.renderer = undefined
    }
    
    if (this.controls) {
      this.controls.dispose()
      this.controls = undefined
    }
    
    this.scene = undefined
    this.camera = undefined
    this.currentModel = undefined
    this.originalMaterials.clear()
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
    if (debugEl) {
      debugEl.innerHTML = `
        Camera Position: ${this.getCameraDebugInfo()}<br>
        Camera Target: ${this.getTargetDebugInfo()}<br>
        Controls: Rotate (drag), Zoom (scroll), Pan (right-drag)
      `
    }
  }
  
  private async initializeViewer() {
    this.container = this.query('.model-container') as HTMLDivElement
    if (!this.container) return
    
    try {
      // Setup scene
      this.scene = new THREE.Scene()
      this.scene.background = new THREE.Color(0xf0f0f0)
      
      // Setup camera
      const width = this.container.clientWidth
      const height = this.container.clientHeight
      this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
      
      // Setup renderer
      this.renderer = new THREE.WebGLRenderer({ antialias: true })
      this.renderer.setSize(width, height)
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.container.appendChild(this.renderer.domElement)
      
      // Setup controls
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
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
      const resizeObserver = new ResizeObserver(() => {
        this.handleResize()
      })
      resizeObserver.observe(this.container)
      
      // Start animation
      this.animateLoop()
      
    } catch (error) {
      console.error('Failed to initialize 3D viewer:', error)
      this.isLoading = false
      this.render()
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
      
      this.scene!.add(object)
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
      
      this.isLoading = false
      this.render()
      
    } catch (error) {
      console.error('Failed to load 3D model:', error)
      this.isLoading = false
      this.render()
      throw error
    }
  }
  
  private animateLoop = () => {
    this.animationId = requestAnimationFrame(this.animateLoop)
    
    if (this.controls && this.renderer && this.scene && this.camera) {
      this.controls.update()
      this.renderer.render(this.scene, this.camera)
      
      // Update debug info if in debug mode
      if (this.debugMode) {
        this.updateDebugInfo()
      }
    }
  }
  
  private handleResize() {
    if (!this.container || !this.camera || !this.renderer) return
    
    const width = this.container.clientWidth
    const height = this.container.clientHeight
    
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
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
      
      .model-container {
        width: 100%;
        height: 100%;
        position: relative;
        background: #f0f0f0;
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
      }
      
      .texture-toggle:hover {
        background: rgba(0, 0, 0, 0.9);
      }
      
      ${this.getNavigationStyles()}
    `
    
    const modelContent = !this.modelUrl ? 
      '<div class="error">No model URL provided</div>' :
      `
        ${this.isLoading ? '<div class="loading">Loading...</div>' : ''}
        ${!this.isLoading && this.debugMode ? `
          <div class="debug-info">
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
          <div class="model-container">
            ${modelContent}
          </div>
        </div>
      </div>
    `
    
    this.updateShadowRoot(html)
    
    // Add listeners after render
    setTimeout(() => {
      const closeBtn = this.query('.close')
      if (closeBtn) {
        closeBtn.addEventListener('click', () => this.close())
      }
      
      const textureBtn = this.query('.texture-toggle')
      if (textureBtn) {
        textureBtn.addEventListener('click', () => this.toggleTexture())
      }
    }, 0)
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