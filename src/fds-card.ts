import { css, CSSResult, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { TemplateResult } from 'lit-html'
import { tokenVar } from './token-utils'
import './global-types'
import { FdsSize1, FdsSize2, FdsStyleElevation100, FdsStyleElevation200 } from '@fintraffic-design/coreui-css'

export enum FdsCardElevation {
  NONE = '0',
  LOW = '1',
  HIGH = '2',
}

/**
 * Card component.
 *
 * @property {FdsCardElevation} elevation - Depth of box shadow
 * @property {function} onCornerClick - Triggered when top right corner is clicked.
 */
@customElement('fds-card')
export class FdsCard extends LitElement {
  @property() elevation: FdsCardElevation = FdsCardElevation.LOW
  @property() onCornerClick?: () => void

  override connectedCallback(): void {
    super.connectedCallback()
    const style = document.createElement('style')
    style.innerHTML = `:host { box-shadow: ${this.getElevationStyle()}; }`
    this.shadowRoot?.appendChild(style)
  }

  override render(): TemplateResult {
    return html`
      <slot name="header">
        <div class="card__header">
          <h3 class="card__header-title">
            <slot name="header-title"></slot>
          </h3>
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

  getElevationStyle(): CSSResult | string {
    if (this.elevation === FdsCardElevation.NONE) {
      return 'none'
    } else if (this.elevation === FdsCardElevation.HIGH) {
      return tokenVar(FdsStyleElevation200)
    }
    return tokenVar(FdsStyleElevation100)
  }

  onClick(event: Event): void {
    if (this.onCornerClick) {
      event.stopPropagation()
      this.onCornerClick()
    }
  }

  static override styles = css`
    :host {
      display: block;
      background: white;
      width: 100%;
      height: 100%;
    }

    .card__header {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      align-items: center;
      margin: 0 ${tokenVar(FdsSize1)};
      min-height: 0;
    }

    .card__content {
      margin: ${tokenVar(FdsSize2)} ${tokenVar(FdsSize1)};
    }
  `
}
