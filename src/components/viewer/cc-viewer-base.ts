import { ChuciElement } from '@/utils/base-element'

export abstract class CcViewerBase extends ChuciElement {
  private _showPrevButton = true
  private _showNextButton = true
  
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
  
  abstract open(url: string): void
  abstract close(): void
  
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
    console.log('addNavigationListeners called in', this.constructor.name)
    setTimeout(() => {
      const prevBtn = this.query('.nav-prev')
      const nextBtn = this.query('.nav-next')
      const closeBtn = this.query('.nav-close')
      console.log('Found buttons:', { prevBtn: !!prevBtn, nextBtn: !!nextBtn, closeBtn: !!closeBtn })
      
      if (prevBtn) {
        console.log('Adding click listener to prev button')
        prevBtn.addEventListener('click', (e) => {
          e.stopPropagation()
          e.preventDefault()
          console.log('Previous button clicked')
          this.navigatePrev()
        }, true)
      }
      
      if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
          e.stopPropagation()
          console.log('Next button clicked')
          this.navigateNext()
        })
      }
      
      if (closeBtn) {
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