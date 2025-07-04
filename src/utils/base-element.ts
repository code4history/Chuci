/**
 * Base class for Chuci web components without Lit dependency
 */
export abstract class ChuciElement extends HTMLElement {
  private _shadowRoot: ShadowRoot
  private _connected = false
  
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
  }
  
  connectedCallback() {
    if (!this._connected) {
      this._connected = true
      this.render()
      this.firstUpdated()
    } else {
      this.render()
    }
  }
  
  disconnectedCallback() {
    this._connected = false
  }
  
  attributeChangedCallback(_name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue !== newValue) {
      this.render()
    }
  }
  
  protected firstUpdated(): void {
    // Override in subclasses for initialization logic
  }
  
  protected abstract render(): void
  
  // Template literal values can be any type that can be converted to string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected html(strings: TemplateStringsArray, ...values: any[]): string {
    return strings.reduce((result, str, i) => {
      return result + str + (values[i] || '')
    }, '')
  }
  
  // Template literal values can be any type that can be converted to string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected css(strings: TemplateStringsArray, ...values: any[]): string {
    const cssText = strings.reduce((result, str, i) => {
      return result + str + (values[i] || '')
    }, '')
    return `<style>${cssText}</style>`
  }
  
  protected updateShadowRoot(content: string) {
    this._shadowRoot.innerHTML = content
  }
  
  protected query<T extends HTMLElement>(selector: string): T | null {
    return this._shadowRoot.querySelector<T>(selector)
  }
  
  protected queryAll<T extends HTMLElement>(selector: string): NodeListOf<T> {
    return this._shadowRoot.querySelectorAll<T>(selector)
  }
  
  // Custom event detail can be any type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected dispatch(eventName: string, detail?: any) {
    this.dispatchEvent(new CustomEvent(eventName, {
      detail,
      bubbles: true,
      composed: true
    }))
  }
}