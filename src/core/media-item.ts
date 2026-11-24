/**
 * メディア項目の型と、スライド要素からの読み取り。
 *
 * 読む属性は既存のスライドのものだけ（global-constraints）：
 * image-url / image-type / thumbnail-url / caption / material-url /
 * camera-position / camera-target / show-texture / fit-to-container / debug-mode
 */

export type MediaType = 'image' | 'panorama' | 'youtube' | 'video' | '3dmodel' | 'gaussian'

export interface MediaItem {
  url: string
  type: MediaType
  thumbnailUrl: string
  caption: string
  materialUrl?: string
  cameraPosition?: string
  cameraTarget?: string
  showTexture?: boolean
  fitToContainer: boolean
  debugMode: boolean
}

const MEDIA_TYPES: readonly string[] = ['image', 'panorama', 'youtube', 'video', '3dmodel', 'gaussian']

/**
 * スライド要素からメディア項目を読み取る。
 *
 * - `image-type` は既知の 6 種類以外を `image` に落とす（今と同じ）。
 * - `fit-to-container` と `debug-mode` は属性の有無で判定する（値が空文字でも true）。
 * - `show-texture` は属性がなければ undefined、値が 'false' のときだけ false、それ以外は true。
 * - 任意項目（material-url / camera-position / camera-target）は属性がなければ undefined。
 */
export function readMediaItem(el: Element): MediaItem {
  const rawType = el.getAttribute('image-type') ?? ''
  const item: MediaItem = {
    url: el.getAttribute('image-url') ?? '',
    type: MEDIA_TYPES.includes(rawType) ? (rawType as MediaType) : 'image',
    thumbnailUrl: el.getAttribute('thumbnail-url') ?? '',
    caption: el.getAttribute('caption') ?? '',
    fitToContainer: el.hasAttribute('fit-to-container'),
    debugMode: el.hasAttribute('debug-mode')
  }

  const materialUrl = el.getAttribute('material-url')
  if (materialUrl !== null) item.materialUrl = materialUrl

  const cameraPosition = el.getAttribute('camera-position')
  if (cameraPosition !== null) item.cameraPosition = cameraPosition

  const cameraTarget = el.getAttribute('camera-target')
  if (cameraTarget !== null) item.cameraTarget = cameraTarget

  if (el.hasAttribute('show-texture')) {
    item.showTexture = el.getAttribute('show-texture') !== 'false'
  }

  return item
}
