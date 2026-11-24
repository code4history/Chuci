// Export all components
export * from './components/swiper/cc-swiper'
export * from './components/swiper/cc-swiper-slide'
export * from './components/viewer/cc-viewer'

// Export media item and thumbnail APIs
export { readMediaItem } from './core/media-item'
export type { MediaItem, MediaType } from './core/media-item'
export { generateThumbnail, THUMBNAIL_GENERATOR_VERSION } from './thumbnails/generate'

// Export utilities
export * from './utils/base-element'

// Auto-register components when imported
import './components/swiper/cc-swiper'
import './components/swiper/cc-swiper-slide'
import './components/viewer/cc-viewer'
