import { css, html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
import { TemplateResult } from 'lit-html'
import './global-types'

@customElement('fds-card')
export class FdsCard extends LitElement {
  static override styles = css`
    :host {
      display: block;
      padding: 8px;
      background: white;
      height: fit-content;
      width: fit-content;
    }

    .card__header h3 {
      display: flex;
      justify-content: space-between;
      margin: 0 0 16px;
    }

    .card__header-corner {
      margin-left: 1rem;
    }

    .card__body {
      margin-bottom: 16px;
    }
  `

  override render(): TemplateResult {
    return html`
      <div class="card__header">
        <h3>
          <div class="card__header-title">
            <slot name="header-title"></slot>
          </div>
        </h3>
      </div>
      <fds-icon .icon=${'chevron-right'}></fds-icon>
      <div class="card__body">
        <slot></slot>
      </div>
      <div class="card__footer">
        <slot name="footer"></slot>
      </div>
    `
  }
}
