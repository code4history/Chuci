export const viewerStyles = `
  :host {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: var(--cc-viewer-z-index, 1000);
  }
  
  .viewer-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .viewer-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .close-button {
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    border-radius: 4px;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.3s;
    z-index: 10;
  }
  
  .close-button:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`