import { describe, test, expect, beforeAll } from 'vitest';
import '../src/index';

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

  test('cc-viewer-image should be defined', () => {
    expect(customElements.get('cc-viewer-image')).toBeDefined();
  });

  test('cc-viewer-video should be defined', () => {
    expect(customElements.get('cc-viewer-video')).toBeDefined();
  });

  test('cc-viewer-youtube should be defined', () => {
    expect(customElements.get('cc-viewer-youtube')).toBeDefined();
  });

  test('cc-viewer-panorama should be defined', () => {
    expect(customElements.get('cc-viewer-panorama')).toBeDefined();
  });

  test('cc-viewer-3dmodel should be defined', () => {
    expect(customElements.get('cc-viewer-3dmodel')).toBeDefined();
  });

  test('cc-viewer-gaussian should be defined', () => {
    expect(customElements.get('cc-viewer-gaussian')).toBeDefined();
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