import { ChuciElement } from '@/utils/base-element'

export abstract class CcViewerBase extends ChuciElement {
  private _showPrevButton = true
  private _showNextButton = true
  protected isShow = false
  protected isLoading = false
  
  get showPrevButton() {
    return this._showPrevButton
  }
  
  set showPrevButton(value: boolean) {
    this._showPrevButton = value
    this.updateNavigationVisibility()
  }
  
  get showNextButton() {
    return this._showNextButton
  }
  
  set showNextButton(value: boolean) {
    this._showNextButton = value
    this.updateNavigationVisibility()
  }
  
  // Template method pattern - subclasses implement these
  protected abstract doOpen(url: string): void | Promise<void>
  protected abstract doClose(): void
  protected abstract getViewerContent(): string
  
  // Common lifecycle methods
  open(url: string): void {
    this.isShow = true
    this.isLoading = true
    
    // Call subclass implementation first
    const openPromise = Promise.resolve(this.doOpen(url))
    
    // Use microtask to ensure doOpen runs first (even if synchronous)
    Promise.resolve().then(() => {
      // Initial render for loading state
      this.render()
    })
    
    // Update after loading completes
    openPromise.then(() => {
      this.isLoading = false
      this.render()
    }).catch(error => {
      this.isLoading = false
      this.render()
    })
  }
  
  close(): void {
    this.cleanupNavigationListeners()
    this.doClose()
    this.isShow = false
    this.isLoading = false
    this.render()
    this.dispatch('close')
  }
  
  protected cleanupNavigationListeners() {
    // Remove data-listener-attached attributes so listeners can be re-added
    const prevBtn = this.query('.nav-prev')
    const nextBtn = this.query('.nav-next')
    const closeBtn = this.query('.nav-close')
    
    if (prevBtn) prevBtn.removeAttribute('data-listener-attached')
    if (nextBtn) nextBtn.removeAttribute('data-listener-attached')
    if (closeBtn) closeBtn.removeAttribute('data-listener-attached')
  }
  
  // Common render method
  protected render() {
    // Allow subclasses to opt out of common rendering
    if (this.shouldUseCustomRender()) {
      this.customRender()
      return
    }
    
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
      
      .viewer {
        position: absolute;
        width: 90%;
        height: 85%;
        inset: 0px;
        margin: auto;
        align-self: center;
        background-color: #000;
      }
      
      ${this.getNavigationStyles()}
      ${this.getCustomStyles()}
    `
    
    const html = `
      ${styles}
      <div class="backdrop" style="${this.isShow ? 'visibility: visible' : 'visibility: hidden'}">
        ${this.getNavigationButtons()}
        <div class="viewer">
          ${this.getViewerContent()}
        </div>
      </div>
    `
    
    this.updateShadowRoot(html)
    
    // Add listeners after render
    setTimeout(() => {
      this.addNavigationListeners()
      this.onAfterRender()
    }, 0)
  }
  
  // Hook for viewers that need completely custom rendering (e.g., image viewer)
  protected shouldUseCustomRender(): boolean {
    return false
  }
  
  protected customRender(): void {
    // Override in subclasses that need custom rendering
  }
  
  // Hook methods for subclasses
  protected getCustomStyles(): string {
    return ''
  }
  
  protected onAfterRender(): void {
    // Subclasses can override for custom listeners
  }
  
  protected navigatePrev() {
    this.dispatch('navigate-prev')
  }
  
  protected navigateNext() {
    this.dispatch('navigate-next')
  }
  
  protected getNavigationButtons(): string {
    const prevStyle = this.showPrevButton ? '' : 'display: none;'
    const nextStyle = this.showNextButton ? '' : 'display: none;'
    
    return `
      <button class="nav-button nav-prev" style="${prevStyle}" aria-label="Previous">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <button class="nav-button nav-next" style="${nextStyle}" aria-label="Next">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
      <button class="nav-button nav-close" aria-label="Close">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    `
  }
  
  protected getNavigationStyles(): string {
    return `
      .nav-button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        border-radius: 4px;
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background 0.3s;
        z-index: 1002;
        pointer-events: auto;
      }
      
      .nav-button:hover {
        background: rgba(0, 0, 0, 0.7);
      }
      
      .nav-prev {
        left: 20px;
      }
      
      .nav-next {
        right: 20px;
      }
      
      .nav-close {
        top: 20px;
        right: 20px;
        transform: none;
      }
    `
  }
  
  protected addNavigationListeners() {
    
    // Check if this viewer is actually visible
    const backdrop = this.query('.backdrop') as HTMLElement
    if (backdrop && backdrop.style.visibility === 'hidden') {
      return
    }
    
    setTimeout(() => {
      const prevBtn = this.query('.nav-prev')
      const nextBtn = this.query('.nav-next')
      const closeBtn = this.query('.nav-close')
      
      if (prevBtn && !prevBtn.hasAttribute('data-listener-attached')) {
        prevBtn.setAttribute('data-listener-attached', 'true')
        prevBtn.addEventListener('click', (e) => {
          e.stopPropagation()
          e.preventDefault()
          this.navigatePrev()
        }, true)
      }
      
      if (nextBtn && !nextBtn.hasAttribute('data-listener-attached')) {
        nextBtn.setAttribute('data-listener-attached', 'true')
        nextBtn.addEventListener('click', (e) => {
          e.stopPropagation()
          this.navigateNext()
        })
      }
      
      if (closeBtn && !closeBtn.hasAttribute('data-listener-attached')) {
        closeBtn.setAttribute('data-listener-attached', 'true')
        closeBtn.addEventListener('click', (e) => {
          e.stopPropagation()
          this.close()
        })
      }
    }, 0)
  }
  
  protected updateNavigationVisibility() {
    const prevBtn = this.query('.nav-prev')
    const nextBtn = this.query('.nav-next')
    
    if (prevBtn) {
      (prevBtn as HTMLElement).style.display = this._showPrevButton ? '' : 'none'
    }
    
    if (nextBtn) {
      (nextBtn as HTMLElement).style.display = this._showNextButton ? '' : 'none'
    }
  }
}