import { describe, test, expect } from 'vitest'
import { readMediaItem } from '@/core/media-item'
import type { MediaType } from '@/core/media-item'

function slide(): Element {
  return document.createElement('cc-swiper-slide')
}

describe('readMediaItem', () => {
  test('reads all allowed attributes', () => {
    const el = slide()
    el.setAttribute('image-url', 'https://e.x/a.splat')
    el.setAttribute('image-type', 'gaussian')
    el.setAttribute('camera-position', '1,2,3')
    el.setAttribute('show-texture', 'false')
    el.setAttribute('fit-to-container', '')
    expect(readMediaItem(el)).toMatchObject({
      url: 'https://e.x/a.splat',
      type: 'gaussian',
      cameraPosition: '1,2,3',
      showTexture: false,
      fitToContainer: true,
      debugMode: false
    })
  })

  test('unknown image-type falls back to image', () => {
    const el = slide()
    el.setAttribute('image-type', 'foo')
    expect(readMediaItem(el).type).toBe('image')
  })

  test('show-texture absent is undefined, not true', () => {
    const el = slide()
    expect(readMediaItem(el).showTexture).toBeUndefined()
  })

  test('every declared image-type is read as-is', () => {
    const types: MediaType[] = ['image', 'panorama', 'youtube', 'video', '3dmodel', 'gaussian']
    for (const t of types) {
      const el = slide()
      el.setAttribute('image-type', t)
      expect(readMediaItem(el).type).toBe(t)
    }
  })

  test('debug-mode and fit-to-container are true when present with an empty value', () => {
    const el = slide()
    el.setAttribute('debug-mode', '')
    el.setAttribute('fit-to-container', '')
    expect(readMediaItem(el)).toMatchObject({ debugMode: true, fitToContainer: true })
  })

  test('show-texture is true unless the value is exactly "false"', () => {
    const el = slide()
    el.setAttribute('show-texture', '')
    expect(readMediaItem(el).showTexture).toBe(true)
    el.setAttribute('show-texture', 'true')
    expect(readMediaItem(el).showTexture).toBe(true)
    el.setAttribute('show-texture', 'FALSE')
    expect(readMediaItem(el).showTexture).toBe(true)
    el.setAttribute('show-texture', 'false')
    expect(readMediaItem(el).showTexture).toBe(false)
  })

  test('optional fields stay undefined when the attributes are absent', () => {
    const item = readMediaItem(slide())
    expect(item.materialUrl).toBeUndefined()
    expect(item.cameraPosition).toBeUndefined()
    expect(item.cameraTarget).toBeUndefined()
  })

  test('string fields default to empty, not null', () => {
    const item = readMediaItem(slide())
    expect(item).toMatchObject({ url: '', type: 'image', thumbnailUrl: '', caption: '' })
    expect(item.fitToContainer).toBe(false)
    expect(item.debugMode).toBe(false)
  })

  test('material-url, camera-position and camera-target are read verbatim', () => {
    const el = slide()
    el.setAttribute('material-url', 'https://e.x/a.mtl')
    el.setAttribute('camera-position', '0,1,2')
    el.setAttribute('camera-target', '3,4,5')
    expect(readMediaItem(el)).toMatchObject({
      materialUrl: 'https://e.x/a.mtl',
      cameraPosition: '0,1,2',
      cameraTarget: '3,4,5'
    })
  })
})
