import { describe, test, expect, vi } from 'vitest'
import {
  captionBarModel,
  renderCaptionBar,
  captionBarStyles,
  COUNTER_THRESHOLD
} from '@/core/caption-bar'
import type { CaptionBarModel } from '@/core/caption-bar'

function model(overrides: Partial<CaptionBarModel> = {}): CaptionBarModel {
  return { showBar: true, caption: '', indicator: 'none', ...overrides }
}

describe('captionBarModel', () => {
  test.each([
    [1, '', false, { showBar: false, indicator: 'none' }],
    [1, 'cap', false, { showBar: true, indicator: 'none' }],
    [2, '', false, { showBar: true, indicator: 'dots' }],
    [8, 'cap', false, { showBar: true, indicator: 'dots' }],
    [9, 'cap', false, { showBar: true, indicator: 'counter' }],
    [5, 'cap', true, { showBar: true, indicator: 'none' }]
  ])('captionBarModel(%i, %s, hasThumb=%s)', (n, cap, thumb, exp) => {
    expect(captionBarModel(n, cap, thumb)).toMatchObject(exp)
  })

  test('COUNTER_THRESHOLD is 8', () => {
    expect(COUNTER_THRESHOLD).toBe(8)
  })

  test('keeps the caption as given', () => {
    expect(captionBarModel(3, 'hello', false).caption).toBe('hello')
    expect(captionBarModel(3, '', false).caption).toBe('')
  })

  test('a lone caption without slides still shows the bar', () => {
    expect(captionBarModel(0, 'cap', false).showBar).toBe(true)
    expect(captionBarModel(0, '', false).showBar).toBe(false)
  })
})

describe('renderCaptionBar', () => {
  test('builds .cc-bar with caption and indicator parts', () => {
    const host = document.createElement('div')
    renderCaptionBar(host, model({ caption: 'cap', indicator: 'dots' }), 0, 3, () => {}, 'slider')
    expect(host.querySelector('.cc-bar')).not.toBeNull()
    expect(host.querySelector('.cc-bar-caption')?.textContent).toBe('cap')
    expect(host.querySelector('.cc-bar-indicator')).not.toBeNull()
    expect(host.querySelector('.cc-bar')?.children.length).toBe(2)
  })

  test('uses textContent for caption', () => {
    const host = document.createElement('div')
    renderCaptionBar(host, model({ caption: '<img src=x onerror=1>' }), 0, 1, () => {}, 'slider')
    expect(host.querySelector('img')).toBeNull()
    expect(host.querySelector('.cc-bar-caption')?.textContent).toBe('<img src=x onerror=1>')
  })

  test('counter shows "2 / 12"', () => {
    const host = document.createElement('div')
    renderCaptionBar(host, model({ indicator: 'counter' }), 1, 12, () => {}, 'viewer')
    expect(host.querySelector('.cc-bar-indicator')?.textContent).toBe('2 / 12')
    expect(host.querySelectorAll('button').length).toBe(0)
  })

  test('dot click calls onJump with its index', () => {
    const host = document.createElement('div')
    const onJump = vi.fn()
    renderCaptionBar(host, model({ indicator: 'dots' }), 1, 3, onJump, 'slider')
    const dots = host.querySelectorAll('button')
    expect(dots.length).toBe(3)
    dots[2].click()
    expect(onJump).toHaveBeenCalledTimes(1)
    expect(onJump).toHaveBeenCalledWith(2)
  })

  test('dots are buttons with an aria-label and the current one is marked', () => {
    const host = document.createElement('div')
    renderCaptionBar(host, model({ indicator: 'dots' }), 1, 3, () => {}, 'slider')
    const dots = Array.from(host.querySelectorAll('button'))
    expect(dots.length).toBe(3)
    for (const dot of dots) {
      expect(dot.getAttribute('type')).toBe('button')
      expect(dot.getAttribute('aria-label')).toBeTruthy()
    }
    expect(dots.map(d => d.getAttribute('aria-current'))).toEqual([null, 'true', null])
  })

  test('renders nothing when showBar is false', () => {
    const host = document.createElement('div')
    renderCaptionBar(host, model({ showBar: false, caption: 'cap' }), 0, 1, () => {}, 'slider')
    expect(host.children.length).toBe(0)
  })

  test('mode only changes the CSS class on .cc-bar', () => {
    const slider = document.createElement('div')
    renderCaptionBar(slider, model({ caption: 'cap' }), 0, 1, () => {}, 'slider')
    expect(slider.querySelector('.cc-bar')?.className).toBe('cc-bar cc-bar--slider')

    const viewer = document.createElement('div')
    renderCaptionBar(viewer, model({ caption: 'cap' }), 0, 1, () => {}, 'viewer')
    expect(viewer.querySelector('.cc-bar')?.className).toBe('cc-bar cc-bar--viewer')

    expect(slider.querySelector('.cc-bar')?.innerHTML).toBe(viewer.querySelector('.cc-bar')?.innerHTML)
  })

  test('replaces previous content on every call', () => {
    const host = document.createElement('div')
    renderCaptionBar(host, model({ caption: 'one', indicator: 'dots' }), 0, 3, () => {}, 'slider')
    renderCaptionBar(host, model({ caption: 'two', indicator: 'counter' }), 0, 3, () => {}, 'slider')
    expect(host.querySelectorAll('.cc-bar').length).toBe(1)
    expect(host.querySelector('.cc-bar-caption')?.textContent).toBe('two')
    expect(host.querySelectorAll('button').length).toBe(0)
  })

  test('indicator "none" renders no dots and no counter', () => {
    const host = document.createElement('div')
    renderCaptionBar(host, model({ indicator: 'none' }), 0, 3, () => {}, 'slider')
    expect(host.querySelectorAll('button').length).toBe(0)
    expect(host.querySelector('.cc-bar-indicator')?.textContent).toBe('')
  })
})

describe('captionBarStyles', () => {
  test('slider caption is single line with ellipsis, viewer caption wraps', () => {
    expect(captionBarStyles).toMatch(/\.cc-bar--slider\s+\.cc-bar-caption\s*\{[^}]*text-overflow:\s*ellipsis/)
    expect(captionBarStyles).toMatch(/\.cc-bar--slider\s+\.cc-bar-caption\s*\{[^}]*white-space:\s*nowrap/)
    expect(captionBarStyles).toMatch(/\.cc-bar--viewer\s+\.cc-bar-caption\s*\{[^}]*white-space:\s*normal/)
    expect(captionBarStyles).toContain('.cc-bar-dot')
  })
})
