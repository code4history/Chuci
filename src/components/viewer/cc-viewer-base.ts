import { ChuciElement } from '@/utils/base-element'

export abstract class CcViewerBase extends ChuciElement {
  protected showPrevButton = true
  protected showNextButton = true
  
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
        z-index: 10;
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
    `
  }
  
  protected addNavigationListeners() {
    setTimeout(() => {
      const prevBtn = this.query('.nav-prev')
      const nextBtn = this.query('.nav-next')
      
      if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
          e.stopPropagation()
          this.navigatePrev()
        })
      }
      
      if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
          e.stopPropagation()
          this.navigateNext()
        })
      }
    }, 0)
  }
}