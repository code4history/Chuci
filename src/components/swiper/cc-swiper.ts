import { ChuciElement } from '@/utils/base-element'
import Swiper from 'swiper'
import { Navigation, Pagination, Scrollbar, Autoplay, Thumbs, Keyboard } from 'swiper/modules'

// Import Swiper styles as strings to inject into shadow DOM
import swiperStyles from './swiper-styles.css?inline'

/**
 * m1-t9: CSS の `url("…")` へ値を入れるためのエスケープ（設計 §5 D1 の S3）。
 *
 * 二重引用符で囲む前提で、`"` と `\` のみをバックスラッシュでエスケープする。
 * URL に現れ得る `/` `:` `.` `?` `&` `%` は**触らない** — 触ると正系の URL が壊れる。
 * `CSS.escape` は CSS 識別子用のため、この用途では使ってはならない。
 */
export function escapeCssUrl(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}

export class CcSwiper extends ChuciElement {
  private slider?: Swiper
  private divContainer?: HTMLDivElement
  private divSlides?: HTMLDivElement
  private divGallery?: HTMLDivElement
  private divPagination?: HTMLDivElement
  private divPrevious?: HTMLDivElement
  private divNext?: HTMLDivElement
  private isDragging = false
  
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
      
      // Wait for custom element to be defined and connected
      await customElements.whenDefined('cc-viewer')
      
      // Use a small timeout to ensure the element is fully initialized
      ccView = await new Promise((res) => {
        setTimeout(() => {
          res(document.querySelector("cc-viewer"))
        }, 100)
      })
    }
    
    // Store current swiper reference and slide index in viewer
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (ccView as any).setSwiper(this);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (ccView as any).setCurrentSlideIndex(slideIndex ?? this.slider?.activeIndex ?? 0);
    
    // Get the slide element to extract attributes
    const slide = this.slides[slideIndex ?? this.slider?.activeIndex ?? 0];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    
    // For 3D models, pass material-url as attribute
    if (imageType === '3dmodel' && slide?.hasAttribute('material-url')) {
      attributes.materialUrl = slide.getAttribute('material-url');
    }
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(ccView as any).open(imageUrl, imageType, attributes)
  }
  
  protected firstUpdated() {
    // Initialization is now done in render method after DOM update
  }
  
  /**
   * m1-t9: スライド要素を DOM API で組み立てる（設計 §5 D1 の S1/S2/S7）。
   *
   * 外部由来値（thumbnail-url / image-url / image-type / caption）は
   * すべて setAttribute と textContent で入れる。文字列補間を経由させない。
   */
  private buildSlideElements() {
    const wrapper = this.query<HTMLDivElement>('#divSlides')
    if (!wrapper) return

    this.slides.forEach((slide, index) => {
      const thumbnailUrl = slide.getAttribute('thumbnail-url') || ''
      const imageUrl = slide.getAttribute('image-url') || ''
      const imageType = slide.getAttribute('image-type') || 'image'
      const caption = slide.getAttribute('caption') || ''

      const div = document.createElement('div')
      div.className = 'swiper-slide'

      const img = document.createElement('img')
      img.setAttribute('src', thumbnailUrl)
      img.setAttribute('data-image-url', imageUrl)
      img.setAttribute('data-image-type', imageType)
      img.setAttribute('data-index', String(index))
      img.className = caption !== '' ? 'viewer w-caption' : 'viewer'
      div.appendChild(img)

      if (caption !== '') {
        const p = document.createElement('p')
        p.className = 'slider-caption'
        // textContent なので caption は HTML として解釈されない
        p.textContent = caption
        div.appendChild(p)
      }

      wrapper.appendChild(div)
    })
  }

  /**
   * m1-t9: ギャラリーのサムネイルを DOM API で組み立てる（設計 §5 D1 の S3）。
   *
   * background-image は **CSS コンテキスト**であり HTML エスケープでは守れない。
   * `escapeCssUrl` で `"` と `\` のみをエスケープして url("…") へ入れる。
   * `CSS.escape` は使わない — CSS 識別子用であり URL に適用すると `/` `:` `.` まで
   * エスケープされて URL が壊れる（設計 §5 D1 の S3 セル）。
   */
  private buildGalleryElements() {
    const wrapper = this.query<HTMLDivElement>('#divGallery')?.querySelector('.swiper-wrapper')
    if (!wrapper) return

    this.slides.forEach((slide, index) => {
      const thumbnailUrl = slide.getAttribute('thumbnail-url') || ''
      const div = document.createElement('div')
      div.className = 'swiper-slide gallery-thumb'
      div.setAttribute('data-index', String(index))
      div.style.setProperty('background-image', `url("${escapeCssUrl(thumbnailUrl)}")`)
      wrapper.appendChild(div)
    })
  }

  protected render() {
    // Inject Swiper styles
    const swiperStyleTag = `
      <style>
        ${swiperStyles}
      </style>
    `
    
    const styles = this.css`
      :host {
        display: block;
        height: 100%;
        width: 100%;
        --swiper-theme-color: var(--cc-slider-theme-color, #007aff);
        --swiper-navigation-color: var(--cc-slider-navigation-color, #007aff);
        --swiper-gallery-height: 0px;
        --swiper-slider-margin-bottom: 0px;
        --swiper-navigation-size: 44px;
      }

      :host([has-thumb]) {
        --swiper-slider-margin-bottom: 10px;
        --swiper-gallery-height: calc(100px - var(--swiper-slider-margin-bottom));
      }

      #divContainer {
        height: calc(100% - var(--swiper-gallery-height) - var(--swiper-slider-margin-bottom));
        margin-bottom: var(--swiper-slider-margin-bottom);
      }
      
      .swiper {
        height: 100%;
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
        height: 100%;
      }

      img.viewer {
        object-fit: contain;
        height: 100%;
        width: 100%;
        cursor: pointer;
        pointer-events: auto !important;
        user-select: none;
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
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 10;
      }

      /* Adjust pagination position when caption exists */
      .swiper-pagination {
        bottom: 10px !important;
      }

      /* When captions exist, move pagination up */
      #divContainer.has-captions .swiper-pagination {
        bottom: calc(1.5rem + 20px) !important;
      }

      /* Navigation button styles with SVG icons */
      .swiper-button-prev,
      .swiper-button-next {
        color: var(--swiper-navigation-color);
        font-size: 0; /* Hide text */
        width: var(--swiper-navigation-size);
        height: var(--swiper-navigation-size);
      }

      .swiper-button-prev:after {
        content: '';
        display: block;
        width: var(--swiper-navigation-size);
        height: var(--swiper-navigation-size);
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23007aff'%3E%3Cpath d='M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z'/%3E%3C/svg%3E");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      }
      
      .swiper-button-next:after {
        content: '';
        display: block;
        width: var(--swiper-navigation-size);
        height: var(--swiper-navigation-size);
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23007aff'%3E%3Cpath d='M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z'/%3E%3C/svg%3E");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      }
    `
    
    // m1-t9: スライドとギャラリーは**テンプレート補間で組まない**。
    // slide の属性は POI 由来の外部値であり、文字列補間すると属性ブレイクアウトが成立する
    // （設計 §2.3 の S1/S2/S3/S7）。骨格だけをテンプレートで作り、外部値は
    // updateShadowRoot の後に setAttribute / textContent / setProperty で入れる。
    const html = `
      ${swiperStyleTag}
      ${styles}
      <div id='divContainer' class='swiper gallery-top'>
        <div id='divSlides' class='swiper-wrapper'></div>

        <div id='divPagination' class='swiper-pagination'></div>
        <div id='divPrevious' class='swiper-button-prev'></div>
        <div id='divNext' class='swiper-button-next'></div>
      </div>
      <div id='divGallery' class='swiper gallery-thumbs'>
        <div class='swiper-wrapper'></div>
      </div>
    `

    this.updateShadowRoot(html)
    this.buildSlideElements()
    this.buildGalleryElements()
    
    // Initialize Swiper after DOM update
    setTimeout(() => {
      this.initializeSwiper()
      
      // Add click handlers for gallery thumbs
      this.queryAll('.gallery-thumb').forEach((thumb, index) => {
        thumb.addEventListener('click', () => this.slider?.slideTo(index))
      })
      
      // Add click handlers for viewer images
      this.queryAll('img.viewer').forEach((img) => {
        // Prevent default image behavior
        img.addEventListener('dragstart', (e) => e.preventDefault())
        
        img.addEventListener('click', (e) => {
          // Ignore click if user was dragging
          if (this.isDragging) {
            this.isDragging = false
            return
          }
          
          e.preventDefault()
          e.stopPropagation()
          e.stopImmediatePropagation()
          const target = e.target as HTMLImageElement
          const imageUrl = target.getAttribute('data-image-url') || ''
          const imageType = target.getAttribute('data-image-type') || 'image'
          const index = parseInt(target.getAttribute('data-index') || '0', 10)
          this.openViewer(imageUrl, imageType, index)
          return false
        }, true)
      })
    }, 0)
  }
  
  private initializeSwiper() {
    this.divContainer = this.query('#divContainer') ?? undefined
    this.divSlides = this.query('#divSlides') ?? undefined
    this.divGallery = this.query('#divGallery') ?? undefined
    this.divPagination = this.query('#divPagination') ?? undefined
    this.divPrevious = this.query('#divPrevious') ?? undefined
    this.divNext = this.query('#divNext') ?? undefined
    
    // Check if any slides have captions
    const hasCaptions = this.slides.some(slide => slide.getAttribute('caption'))
    if (hasCaptions && this.divContainer) {
      this.divContainer.classList.add('has-captions')
    }
    
    // Core library features at https://swiperjs.com/api/#custom-build
    const slidesLoop = this.slides.length >= 2
    if (!this.divContainer) return
    
    // Destroy existing slider if any
    if (this.slider) {
      this.slider.destroy()
    }
    
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
      preventClicksPropagation: false,
      simulateTouch: true,
      allowTouchMove: true,
      loop: slidesLoop,
      on: {
        sliderMove: () => {
          this.isDragging = true
        },
        touchEnd: () => {
          // Reset dragging flag after a short delay to allow click event to check it
          setTimeout(() => {
            this.isDragging = false
          }, 50)
        }
      }
    })
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