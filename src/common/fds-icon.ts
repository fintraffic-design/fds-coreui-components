import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('icon')
export class FdsIcon extends LitElement {
  @property()
  onClick?: () => void

  @property()
  icon?: unknown

  static override styles = css`
    :host {
      display: block;
      padding: 8px;
      background: white;
      height: fit-content;
      width: fit-content;
    }
  `

  override render() {
    return html` <div class=""></div> `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'fds-icon': FdsIcon
  }
}
