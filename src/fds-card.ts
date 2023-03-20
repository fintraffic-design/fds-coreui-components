import {
  FdsSize2,
  FdsSize3,
  FdsSize4,
  FdsStyleElevation100,
  FdsStyleElevation200,
} from '@fintraffic-design/coreui-css'
import { css, html, LitElement } from 'lit'
import { TemplateResult } from 'lit-html'
import { customElement, property } from 'lit/decorators.js'
import './global-types'
import { heading4SmallTextClass } from './utils/css-utils'
import { tokenVar } from './utils/token-utils'

export enum FdsCardElevation {
  none = 'none',
  low = 'low',
  high = 'high',
}

/**
 * Card component.
 *
 * @property {FdsCardElevation} elevation - Depth of box shadow.
 *
 * @event corner-click - Triggered when top right corner of the card is clicked
 *
 */
@customElement('fds-card')
export default class FdsCard extends LitElement {
  @property() elevation: FdsCardElevation = FdsCardElevation.low

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
    if (this.elevation === FdsCardElevation.none) {
      return 'none'
    } else if (this.elevation === FdsCardElevation.high) {
      return FdsStyleElevation200.value
    }
    return FdsStyleElevation100.value
  }

  onClick(): void {
    this.dispatchEvent(new CustomEvent<void>('corner-click'))
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
        padding: ${tokenVar(FdsSize3)} ${tokenVar(FdsSize4)} ${tokenVar(FdsSize2)};
      }

      .card__content {
        padding: ${tokenVar(FdsSize2)} ${tokenVar(FdsSize4)};
      }
    `,
  ]
}
