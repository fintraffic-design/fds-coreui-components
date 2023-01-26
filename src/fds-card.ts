import { css, CSSResult, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { TemplateResult } from 'lit-html'
import { tokenVar } from './token-utils'
import { ifDefined } from 'lit/directives/if-defined.js'
import './global-types'
import { FdsSize1, FdsSize2, FdsStyleElevation100, FdsStyleElevation200 } from '@fintraffic-design/coreui-css'

export enum FdsCardElevation {
  NONE = '0',
  LOW = '1',
  HIGH = '2',
}
@customElement('fds-card')
export class FdsCard extends LitElement {
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
      min-height: 0px;
    }

    .card__content {
      margin: ${tokenVar(FdsSize2)} ${tokenVar(FdsSize1)};
    }
  `
  @property() elevation: FdsCardElevation = FdsCardElevation.NONE

  override render(): TemplateResult {
    const elevationStyle = html`<style>
      :host {
        box-shadow: ${this.getElevationStyle()};
      }
    </style>`

    return html`
      ${ifDefined(this.elevation) ? elevationStyle : null}
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
        <slot></slot>
      </div>
      <slot name="footer"></slot>
    `
  }

  getElevationStyle(): CSSResult | string {
    if (this.elevation === FdsCardElevation.LOW) {
      return tokenVar(FdsStyleElevation100)
    } else if (this.elevation === FdsCardElevation.HIGH) {
      return tokenVar(FdsStyleElevation200)
    } else {
      return 'none'
    }
  }
}
