import { describe, test, expect } from 'vitest'
import { normalizeIndex, stepIndex, slideOffsets } from '@/core/carousel-math'

describe('stepIndex', () => {
  test('wraps only when loop', () => {
    expect(stepIndex(4, 1, 5, true)).toBe(0)
    expect(stepIndex(4, 1, 5, false)).toBe(4)
    expect(stepIndex(0, -1, 5, true)).toBe(4)
    expect(stepIndex(0, -1, 5, false)).toBe(0)
  })
})

describe('normalizeIndex', () => {
  test('wraps around both ends when loop', () => {
    expect(normalizeIndex(5, 5, true)).toBe(0)
    expect(normalizeIndex(-1, 5, true)).toBe(4)
    expect(normalizeIndex(12, 5, true)).toBe(2)
    expect(normalizeIndex(-12, 5, true)).toBe(3)
  })

  test('stops at the edges when not loop', () => {
    expect(normalizeIndex(5, 5, false)).toBe(4)
    expect(normalizeIndex(-1, 5, false)).toBe(0)
    expect(normalizeIndex(2, 5, false)).toBe(2)
  })

  test('returns 0 when there is no slide', () => {
    expect(normalizeIndex(3, 0, true)).toBe(0)
    expect(normalizeIndex(3, 0, false)).toBe(0)
  })
})

describe('slideOffsets', () => {
  test('places neighbours of current at -1 and +1 in loop mode', () => {
    expect(slideOffsets(0, 4, true)).toEqual([0, 1, 2, -1])
    expect(slideOffsets(0, 4, false)).toEqual([0, 1, 2, 3])
  })

  test('single slide never loops', () => {
    expect(slideOffsets(0, 1, true)).toEqual([0])
  })

  test('keeps the ring order around an arbitrary current in loop mode', () => {
    expect(slideOffsets(3, 5, true)).toEqual([2, -2, -1, 0, 1])
  })

  test('every slide gets its own slot in loop mode', () => {
    for (const count of [2, 3, 4, 5, 8, 9]) {
      for (let current = 0; current < count; current++) {
        const offsets = slideOffsets(current, count, true)
        expect(new Set(offsets).size).toBe(count)
        for (const o of offsets) expect(Math.abs(o)).toBeLessThanOrEqual(count / 2)
      }
    }
  })

  test('no slide is empty', () => {
    expect(slideOffsets(0, 0, true)).toEqual([])
    expect(slideOffsets(0, 0, false)).toEqual([])
  })
})
