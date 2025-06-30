import { ChuciElement } from '@/utils/base-element'

export class CcSwiperSlide extends ChuciElement {
  static get observedAttributes() {
    return ['thumbnail-url', 'image-url', 'image-type', 'caption']
  }
  
  get thumbnailUrl() {
    return this.getAttribute('thumbnail-url') || ''
  }
  
  get imageUrl() {
    return this.getAttribute('image-url') || ''
  }
  
  get imageType() {
    return this.getAttribute('image-type') || ''
  }
  
  get caption() {
    return this.getAttribute('caption') || ''
  }
  
  protected render() {
    const styles = this.css`
      :host {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        background-size: cover !important;
        background-repeat: no-repeat !important;
        background-position: center !important;
      }
    `
    
    this.updateShadowRoot(styles)
  }
}

if (!customElements.get('cc-swiper-slide')) {
  customElements.define('cc-swiper-slide', CcSwiperSlide)
}

declare global {
  interface HTMLElementTagNameMap {
    'cc-swiper-slide': CcSwiperSlide
  }
}