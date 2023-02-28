import { FdsStyleElevation100, FdsStyleElevation200 } from '@fintraffic-design/coreui-css'
import { css, html, LitElement } from 'lit'
import { TemplateResult } from 'lit-html'
import { customElement, property } from 'lit/decorators.js'
import './global-types'
import { heading4SmallTextClass } from './utils/css-utils'

export enum FdsCardElevation {
  NONE = 'NONE',
  LOW = 'LOW',
  HIGH = 'HIGH',
}

/**
 * Card component.
 *
 * @property {FdsCardElevation} elevation - Depth of box shadow.
 * @property {function} onCornerClick - Triggered when top right corner is clicked.
 *
 * @event cornerClick - Triggered when top right corner of the card is clicked
 *
 */
@customElement('fds-card')
export default class FdsCard extends LitElement {
  @property() elevation: FdsCardElevation = FdsCardElevation.LOW

  override render(): TemplateResult {
    this.style.boxShadow = this.getElevationStyle()

    return html`
      <slot name="header">
        <div class="card__header">
          <h4 class="card__header-title heading-4-small-text">
            <slot name="header-title"></slot>
          </h4>
          <div class="card__header-corner" @click=${this.onClick}>
            <slot name="header-corner"></slot>
          </div>
        </div>
      </slot>
      <div class="card__content">
        <slot></slot>
      </div>
      <slot name="footer"></slot>
    `
  }

  getElevationStyle(): string {
    if (this.elevation === FdsCardElevation.NONE) {
      return 'none'
    } else if (this.elevation === FdsCardElevation.HIGH) {
      return FdsStyleElevation200.value
    }
    return FdsStyleElevation100.value
  }

  onClick(): void {
    this.dispatchEvent(new CustomEvent<void>('cornerClick'))
  }

  static override styles = [
    heading4SmallTextClass,
    css`
      :host {
        display: block;
        background: white;
        width: 100%;
      }

      h4 {
        margin: 0;
      }

      .card__header {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        align-items: center;
        padding: 27px 32px 13px;
      }

      .card__content {
        padding: 16px 32px;
      }
    `,
  ]
}
