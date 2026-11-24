import { describe, test, expect, beforeAll } from 'vitest';
import { readMediaItem, type MediaItem, type MediaType } from '../src/index';

describe('Web Components Registration', () => {
  beforeAll(() => {
    // Ensure custom elements are defined
  });

  test('cc-swiper should be defined', () => {
    expect(customElements.get('cc-swiper')).toBeDefined();
  });

  test('cc-swiper-slide should be defined', () => {
    expect(customElements.get('cc-swiper-slide')).toBeDefined();
  });

  test('cc-viewer should be defined', () => {
    expect(customElements.get('cc-viewer')).toBeDefined();
  });
});

describe('Component Creation', () => {
  test('should create cc-swiper element', () => {
    const element = document.createElement('cc-swiper');
    expect(element).toBeInstanceOf(HTMLElement);
    expect(element.tagName.toLowerCase()).toBe('cc-swiper');
  });

  test('should create cc-viewer element', () => {
    const element = document.createElement('cc-viewer');
    expect(element).toBeInstanceOf(HTMLElement);
    expect(element.tagName.toLowerCase()).toBe('cc-viewer');
  });
});

test('entry point exports the media item type and reader', () => {
  const slide = document.createElement('cc-swiper-slide');
  const type: MediaType = 'video';
  slide.setAttribute('image-type', type);
  const item: MediaItem = readMediaItem(slide);
  expect(item.type).toBe(type);
});
