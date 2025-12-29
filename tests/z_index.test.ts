import { describe, test, expect } from 'vitest';
import { CcViewerBase } from '../src/components/viewer/cc-viewer-base';

// Simple concrete implementation for testing logic without external dependencies
class TestZIndexViewer extends CcViewerBase {
  protected doOpen(_url: string): void {
    // No-op
  }
  
  protected doClose(): void {
    // No-op
  }
  
  protected getViewerContent(): string {
    return '<div>Test Content</div>';
  }
}

// Define only if not exists to avoid collisions
if (!customElements.get('test-z-index-viewer')) {
  customElements.define('test-z-index-viewer', TestZIndexViewer);
}

describe('Z-Index Scaling', () => {
  test('navigation buttons should use calc() for z-index', async () => {
    const element = document.createElement('test-z-index-viewer') as TestZIndexViewer;
    document.body.appendChild(element);

    // Open to trigger render
    element.open('dummy.jpg');
    
    // Wait for microtasks/render (setTimeout 0 in base)
    await new Promise(resolve => setTimeout(resolve, 0));

    const shadow = element.shadowRoot;
    expect(shadow).toBeTruthy();

    const closeBtn = shadow!.querySelector('.nav-close') as HTMLElement;
    expect(closeBtn).toBeTruthy();

    const styles = shadow!.querySelector('style');
    expect(styles).toBeTruthy();
    expect(styles!.textContent).toContain('z-index: calc(var(--cc-viewer-z-index-each, 1000) + 2)');
    
    // Cleanup
    document.body.removeChild(element);
  });
});
