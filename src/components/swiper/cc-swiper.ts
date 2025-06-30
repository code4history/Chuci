import { ChuciElement } from '@/utils/base-element'
import Swiper from 'swiper'
import { Navigation, Pagination, Scrollbar, Autoplay, Thumbs, Keyboard } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

export class CcSwiper extends ChuciElement {
  private slider?: Swiper
  private divContainer?: HTMLDivElement
  private divSlides?: HTMLDivElement
  private divGallery?: HTMLDivElement
  private divPagination?: HTMLDivElement
  private divPrevious?: HTMLDivElement
  private divNext?: HTMLDivElement
  
  static get observedAttributes() {
    return ['has-thumb', 'autoplay']
  }
  
  get hasThumb() {
    return this.hasAttribute('has-thumb')
  }
  
  get autoplay() {
    return this.hasAttribute('autoplay')
  }
  
  get slides() {
    return [
      ...Array.from(this.querySelectorAll('cc-swiper-slide')),
      ...Array.from(this.divSlides?.querySelectorAll('cc-swiper-slide') ?? [])
    ]
  }
  
  async openViewer(imageUrl: string, imageType: string, slideIndex?: number) {
    let ccView = document.querySelector("cc-viewer")
    if (!ccView) {
      const viewerElement = document.createElement("cc-viewer")
      document.body.appendChild(viewerElement)
      ccView = await new Promise((res) => {
        viewerElement.addEventListener("load", () => {
          res(document.querySelector("cc-viewer"))
        })
      })
    }
    
    // Store current swiper reference and slide index in viewer
    (ccView as any).swiper = this;
    (ccView as any).currentSlideIndex = slideIndex ?? this.slider?.activeIndex ?? 0;
    
    // Get the slide element to extract attributes
    const slide = this.slides[slideIndex ?? this.slider?.activeIndex ?? 0];
    const attributes: Record<string, any> = {};
    
    // Check for viewer-specific attributes
    if (slide?.hasAttribute('fit-to-container')) {
      attributes.fitToContainer = true;
    }
    if (slide?.hasAttribute('debug-mode')) {
      attributes.debugMode = true;
    }
    if (slide?.hasAttribute('camera-position')) {
      attributes.cameraPosition = slide.getAttribute('camera-position');
    }
    if (slide?.hasAttribute('camera-target')) {
      attributes.cameraTarget = slide.getAttribute('camera-target');
    }
    if (slide?.hasAttribute('show-texture')) {
      attributes.showTexture = slide.getAttribute('show-texture') === 'true';
    }
    
    (ccView as any).open(imageUrl, imageType, attributes)
  }
  
  protected firstUpdated() {
    this.divContainer = this.query('#divContainer') ?? undefined
    this.divSlides = this.query('#divSlides') ?? undefined
    this.divGallery = this.query('#divGallery') ?? undefined
    this.divPagination = this.query('#divPagination') ?? undefined
    this.divPrevious = this.query('#divPrevious') ?? undefined
    this.divNext = this.query('#divNext') ?? undefined
    
    // Core library features at https://swiperjs.com/api/#custom-build
    const slidesLoop = this.slides.length >= 2
    if (!this.divContainer) return
    this.slider = new Swiper(this.divContainer, {
      modules: [Navigation, Pagination, Scrollbar, Autoplay, Thumbs, Keyboard],
      navigation: {
        prevEl: this.divPrevious,
        nextEl: this.divNext,
      },
      pagination: this.hasThumb ? {} : {
        el: this.divPagination
      },
      autoplay: this.autoplay ? {
        delay: 5000,
        disableOnInteraction: false,
        reverseDirection: false,
        stopOnLastSlide: false,
        waitForTransition: true,
      } : false,
      thumbs: this.hasThumb && this.divGallery ? {
        swiper: new Swiper(this.divGallery, {
          spaceBetween: 10,
          slidesPerView: Math.min(Math.max(4, this.slides.length), 8),
          watchSlidesProgress: true,
        }),
      } : {},
      preventClicks: false,
      preventClicksPropagation: true,
      loop: slidesLoop
    })
  }
  
  protected render() {
    const styles = this.css`
      :host {
        display: block;
        --swiper-theme-color: var(--cc-slider-theme-color, #007aff);
        --swiper-navigation-color: var(--cc-slider-navigation-color, #007aff);
        --swiper-gallery-height: 0px;
        --swiper-slider-margin-bottom: 0px;
        --swiper-navigation-size: 30px;
      }

      :host([has-thumb]) {
        --swiper-slider-margin-bottom: 10px;
        --swiper-gallery-height: calc(100px - var(--swiper-slider-margin-bottom));
      }

      #divContainer {
        height: calc(100% - calc(var(--swiper-gallery-height)) - var(--swiper-slider-margin-bottom));
        margin-bottom: var(--swiper-slider-margin-bottom);
      }

      #divGallery {
        height: var(--swiper-gallery-height);
      }

      .gallery-thumbs .swiper-slide {
        height: 100%;
        opacity: 0.25;
        transition: 200ms;
        cursor: pointer;
      }

      .gallery-thumbs .swiper-slide-thumb-active {
        opacity: 1;
      }

      .gallery-thumb {
        background-position: center !important;
        background-repeat: no-repeat !important;
        background-size: cover !important;
      }

      .swiper-wrapper {
        text-align: center;
      }

      .swiper-slide {
        background-color: white;
        height: 200px;
      }

      img.viewer {
        object-fit: contain;
        height: 100%;
        width: 100%;
        cursor: pointer;
      }

      img.viewer.w-caption {
        height: calc(100% - 10px - 1.5rem);
      }

      .slider-caption {
        padding: 5px;
        margin: 0;
        line-height: 1.5em;
        background: #000000;
        color: #ffffff;
        font-size: 0.6rem;
        font-weight: 700;
      }
    `
    
    const slidesHtml = this.slides.map((slide, index) => {
      const s = slide as any
      return `
        <div class='swiper-slide'>
          <img src="${s.thumbnailUrl}" onclick="this.getRootNode().host.openViewer('${s.imageUrl}', '${s.imageType}', ${index})" class="viewer${s.caption !== "" ? ` w-caption` : ""}">
          ${s.caption !== "" ? `<p class="slider-caption">${s.caption}</p>` : ""}
        </div>
      `
    }).join('')
    
    const galleryHtml = this.slides.map((_, index) => `
      <div class='swiper-slide gallery-thumb' data-index="${index}"></div>
    `).join('')
    
    const html = `
      ${styles}
      <div id='divContainer' class='swiper-container gallery-top'>
        <div id='divSlides' class='swiper-wrapper'>
          ${slidesHtml}
        </div>

        <div id='divPagination' class='swiper-pagination'></div>
        <div id='divPrevious' class='swiper-button-prev'></div>
        <div id='divNext' class='swiper-button-next'></div>
      </div>
      <div id='divGallery' class='swiper-container gallery-thumbs'>
        <div class='swiper-wrapper'>
          ${galleryHtml}
        </div>
      </div>
      <cc-viewer id="ccViewer"></cc-viewer>
    `
    
    this.updateShadowRoot(html)
    
    // Add click handlers for gallery thumbs after render
    setTimeout(() => {
      this.queryAll('.gallery-thumb').forEach((thumb, index) => {
        thumb.addEventListener('click', () => this.slider?.slideTo(index))
      })
    }, 0)
  }
}

if (!customElements.get('cc-swiper')) {
  customElements.define('cc-swiper', CcSwiper)
}

declare global {
  interface HTMLElementTagNameMap {
    'cc-swiper': CcSwiper
  }
}