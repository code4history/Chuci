import { ChuciElement } from '@/utils/base-element'
import './cc-viewer-image'
import './cc-viewer-panorama'
import './cc-viewer-youtube'
import './cc-viewer-video'
import './cc-viewer-3dmodel'
import './cc-viewer-gaussian'

interface HashKeyTag {
  [index: string]: string
}

const typeHashes = {
  image: 'cc-viewer-image',
  panorama: 'cc-viewer-panorama',
  youtube: 'cc-viewer-youtube',
  video: 'cc-viewer-video',
  '3dmodel': 'cc-viewer-3dmodel',
  gaussian: 'cc-viewer-gaussian'
} as HashKeyTag

export class CcViewer extends ChuciElement {
  private swiper: any
  private currentSlideIndex = 0
  private currentType = ''
  private boundHandleNavigatePrev?: (e: Event) => void
  private boundHandleNavigateNext?: (e: Event) => void
  
  
  open(imgUrl: string, type: string, attributes?: Record<string, any>) {
    this.currentType = type
    const targetTag = typeHashes[type]
    const handler = this.query(targetTag)
    
    // Pass attributes to the viewer if available
    if (handler && attributes) {
      Object.entries(attributes).forEach(([key, value]) => {
        (handler as any)[key] = value
      })
    }
    
    // Update navigation button visibility
    this.updateNavigationButtons()
    
    ;(handler as any).open(imgUrl)
  }
  
  protected firstUpdated() {
    // Dispatch load event when the component is ready
    this.dispatch('load')
    
    // Remove existing listeners if any
    if (this.boundHandleNavigatePrev) {
      this.removeEventListener('navigate-prev', this.boundHandleNavigatePrev)
    }
    if (this.boundHandleNavigateNext) {
      this.removeEventListener('navigate-next', this.boundHandleNavigateNext)
    }
    
    // Create bound functions once
    this.boundHandleNavigatePrev = this.handleNavigatePrev.bind(this)
    this.boundHandleNavigateNext = this.handleNavigateNext.bind(this)
    
    // Listen for navigation events
    this.addEventListener('navigate-prev', this.boundHandleNavigatePrev)
    this.addEventListener('navigate-next', this.boundHandleNavigateNext)
  }
  
  private handleNavigatePrev(e?: Event) {
    console.log('handleNavigatePrev in cc-viewer, event from:', e?.target)
    console.log('Current index before:', this.currentSlideIndex)
    if (!this.swiper) return
    
    const totalSlides = this.swiper.slides.length
    if (totalSlides <= 1) return // No navigation for single slide
    
    // Check if loop is enabled in swiper
    const hasLoop = this.swiper.slider?.params?.loop === true
    
    if (this.currentSlideIndex <= 0) {
      if (hasLoop) {
        this.currentSlideIndex = totalSlides - 1 // Go to last slide
      } else {
        return // Can't go previous
      }
    } else {
      this.currentSlideIndex--
    }
    
    this.navigateToSlide(this.currentSlideIndex)
  }
  
  private handleNavigateNext(e?: Event) {
    console.log('handleNavigateNext in cc-viewer, event from:', e?.target)
    console.log('Current index before:', this.currentSlideIndex)
    if (!this.swiper) return
    
    const totalSlides = this.swiper.slides.length
    if (totalSlides <= 1) return // No navigation for single slide
    
    // Check if loop is enabled in swiper
    const hasLoop = this.swiper.slider?.params?.loop === true
    
    if (this.currentSlideIndex >= totalSlides - 1) {
      if (hasLoop) {
        this.currentSlideIndex = 0 // Go to first slide
      } else {
        return // Can't go next
      }
    } else {
      this.currentSlideIndex++
    }
    
    this.navigateToSlide(this.currentSlideIndex)
  }
  
  private navigateToSlide(index: number) {
    console.log('navigateToSlide called with index:', index, 'current type:', this.currentType)
    if (!this.swiper || !this.swiper.slides[index]) return
    
    // Close current viewer
    const currentTag = typeHashes[this.currentType]
    const currentHandler = this.query(currentTag)
    if (currentHandler) {
      console.log('Closing viewer:', currentTag)
      (currentHandler as any).close()
    }
    
    // Open new viewer
    const slide = this.swiper.slides[index]
    const imageUrl = slide.getAttribute('image-url') || ''
    const imageType = slide.getAttribute('image-type') || 'image'
    
    // Gather viewer-specific attributes
    const attributes: Record<string, any> = {}
    if (slide.hasAttribute('fit-to-container')) {
      attributes.fitToContainer = true
    }
    if (slide.hasAttribute('debug-mode')) {
      attributes.debugMode = true
    }
    if (slide.hasAttribute('camera-position')) {
      attributes.cameraPosition = slide.getAttribute('camera-position')
    }
    if (slide.hasAttribute('camera-target')) {
      attributes.cameraTarget = slide.getAttribute('camera-target')
    }
    if (slide.hasAttribute('show-texture')) {
      attributes.showTexture = slide.getAttribute('show-texture') === 'true'
    }
    
    console.log('Opening new viewer - type:', imageType, 'url:', imageUrl)
    this.currentSlideIndex = index
    this.open(imageUrl, imageType, attributes)
    
    // Update swiper position
    if (this.swiper.slider) {
      this.swiper.slider.slideTo(index)
    }
  }
  
  private updateNavigationButtons() {
    if (!this.swiper) return
    
    const totalSlides = this.swiper.slides.length
    const hasLoop = this.swiper.slider?.params?.loop === true
    
    // For single slide, hide both buttons
    if (totalSlides <= 1) {
      this.setNavigationVisibility(false, false)
      return
    }
    
    // For multiple slides with loop, show both
    if (hasLoop) {
      this.setNavigationVisibility(true, true)
      return
    }
    
    // For multiple slides without loop, check boundaries
    const showPrev = this.currentSlideIndex > 0
    const showNext = this.currentSlideIndex < totalSlides - 1
    this.setNavigationVisibility(showPrev, showNext)
  }
  
  private setNavigationVisibility(showPrev: boolean, showNext: boolean) {
    // Update all viewer instances
    const viewers = [
      this.query('cc-viewer-image'),
      this.query('cc-viewer-youtube'),
      this.query('cc-viewer-panorama'),
      this.query('cc-viewer-video'),
      this.query('cc-viewer-3dmodel'),
      this.query('cc-viewer-gaussian')
    ]
    
    viewers.forEach(viewer => {
      if (viewer) {
        const v = viewer as any
        v.showPrevButton = showPrev
        v.showNextButton = showNext
      }
    })
  }
  
  // Public method to set swiper reference
  setSwiper(swiper: any) {
    this.swiper = swiper
  }
  
  // Public method to set current slide index
  setCurrentSlideIndex(index: number) {
    this.currentSlideIndex = index
  }
  
  protected render() {
    const styles = this.css`
      :host {
        --cc-viewer-z-index: 1000;
      }
      
      cc-viewer-panorama, cc-viewer-image, cc-viewer-youtube, cc-viewer-video,
      cc-viewer-3dmodel, cc-viewer-gaussian {
        --cc-viewer-z-index-each: var(--cc-viewer-z-index);
      }
    `
    
    const html = `
      ${styles}
      <cc-viewer-image></cc-viewer-image>
      <cc-viewer-youtube></cc-viewer-youtube>
      <cc-viewer-panorama></cc-viewer-panorama>
      <cc-viewer-video></cc-viewer-video>
      <cc-viewer-3dmodel></cc-viewer-3dmodel>
      <cc-viewer-gaussian></cc-viewer-gaussian>
    `
    
    this.updateShadowRoot(html)
  }
}

if (!customElements.get('cc-viewer')) {
  customElements.define('cc-viewer', CcViewer)
}

declare global {
  interface HTMLElementTagNameMap {
    'cc-viewer': CcViewer
  }
}