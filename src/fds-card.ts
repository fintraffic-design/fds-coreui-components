import { FdsStyleElevation100, FdsStyleElevation200 } from '@fintraffic-design/coreui-css'
import { css, html, LitElement } from 'lit'
import { TemplateResult } from 'lit-html'
import { customElement, property } from 'lit/decorators.js'
import './global-types'
import { heading4SmallTextClass } from './utils/css-utils'

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
    this.style.boxShadow = this.getElevationStyle()
  }

  override render(): TemplateResult {
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

    h4 {
      margin: 0;
    }

    .card__header {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      align-items: center;
      padding-left: 32px;
      padding-right: 32px;
      padding-top: 27px;
      padding-bottom: 13px;
    }

    .card__content {
      padding: 16px 32px;
    }

    ${heading4SmallTextClass}
  `
}
