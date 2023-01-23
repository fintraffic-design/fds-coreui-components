import { css, html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
import { TemplateResult } from 'lit-html'
import './global-types'

@customElement('fds-card')
export class FdsCard extends LitElement {
  static override styles = css`
    :host {
      display: block;
      background: white;
      height: fit-content;
      width: fit-content;
    }

    .card__header {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      align-items: center;
      margin: 0 8px;
    }

    .card__content {
      margin: 16px 8px;
    }
  `

  override render(): TemplateResult {
    return html`
      <slot name="header">
        <div class="card__header">
          <h3 class="card__header-title">
            <slot name="header-title"></slot>
          </h3>
          <div class="card__header-corner">
            <slot name="header-corner"></slot>
          </div>
        </div>
      </slot>
      <div class="card__content">
        <slot name="content"></slot>
      </div>
      <slot name="footer"></slot>
    `
  }
}
