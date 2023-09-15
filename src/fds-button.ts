import {
  FdsCssColorBrandBlack,
  FdsCssColorBrandWhite,
  FdsCssColorDanger300,
  FdsCssColorDanger400,
  FdsCssColorInteractive200,
  FdsCssColorNeutral100,
  FdsCssColorText300,
  FdsCssRadiusLarge,
  FdsCssSize6,
  uiLabelTextClass,
} from '@fintraffic-design/coreui-css'
import { css, CSSResult, html, LitElement } from 'lit'
import { TemplateResult } from 'lit-html'
import { customElement, property } from 'lit/decorators.js'
import { FdsIconType } from './fds-icon'
import './global-types'

export enum FdsButtonVariant {
  primary = 'primary',
  secondary = 'secondary',
  tertiary = 'tertiary',
  danger = 'danger',
}

const variantColorMap: Record<FdsButtonVariant, CSSResult> = {
  primary: FdsCssColorBrandWhite,
  secondary: FdsCssColorBrandBlack,
  tertiary: FdsCssColorBrandBlack,
  danger: FdsCssColorBrandWhite,
}

/**
 * Button component.
 *
 * @event click - Dispatches a MouseEvent on click.
 *
 * @property {FdsButtonVariant} variant - Button style.
 * @property {boolean} disabled - Disable button.
 * @property {FdsIconType} icon - Optional icon.
 * @property {string} label - Text to show.
 *
 */
@customElement('fds-button')
export default class FdsButton extends LitElement {
  @property() variant: FdsButtonVariant = FdsButtonVariant.primary
  @property() disabled: boolean = false
  @property() icon?: FdsIconType
  @property() label?: string

  override render(): TemplateResult {
    return html`
      <button class="button--${this.variant}" ?disabled="${this.disabled}">
        ${this.icon && html`<fds-icon .icon="${this.icon}"></fds-icon>`}
        ${this.label && html`<span class="ui-label-text">${this.label}</span>`}
      </button>
    `
  }

  static override styles = [
    uiLabelTextClass,
    css`
      :host {
        display: inline-flex;
        justify-content: center;
      }

      button {
        cursor: pointer;
        display: flex;
        border: 2px solid ${FdsCssColorBrandBlack};
        border-radius: ${FdsCssRadiusLarge};
        padding: 13px 16px;
        height: ${FdsCssSize6};
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: all 200ms;
        width: inherit;
      }

      button *,
      button ::slotted(*) {
        line-height: 1;
      }

      .button--primary {
        border-color: ${FdsCssColorBrandBlack};
        background: ${FdsCssColorBrandBlack};
        color: ${variantColorMap[FdsButtonVariant.primary]};
      }

      .button--secondary {
        border: 2px solid ${FdsCssColorBrandBlack};
        background: ${FdsCssColorBrandWhite};
        color: ${variantColorMap[FdsButtonVariant.secondary]};
      }

      .button--tertiary {
        background: transparent;
        border-color: transparent;
        color: ${variantColorMap[FdsButtonVariant.tertiary]};
      }

      .button--danger {
        background: ${FdsCssColorDanger300};
        border-color: transparent;
        color: ${variantColorMap[FdsButtonVariant.danger]};
      }

      .button--primary:hover,
      .button--secondary:hover,
      .button--tertiary:hover {
        background: ${FdsCssColorInteractive200};
        border-color: transparent;
        color: ${FdsCssColorBrandWhite};
      }

      .button--danger:hover {
        background: ${FdsCssColorDanger400};
        border-color: ${FdsCssColorDanger400};
        color: ${FdsCssColorBrandWhite};
      }

      .button--primary:disabled {
        background: ${FdsCssColorNeutral100};
        border-color: ${FdsCssColorNeutral100};
        color: ${FdsCssColorText300};
      }

      .button--secondary:disabled {
        background: transparent;
        color: ${FdsCssColorNeutral100};
        border-color: ${FdsCssColorNeutral100};
      }

      .button--tertiary:disabled {
        background: transparent;
        border-color: transparent;
        color: ${FdsCssColorNeutral100};
      }

      .button--danger:disabled {
        background: ${FdsCssColorNeutral100};
        border-color: transparent;
        color: ${FdsCssColorText300};
      }
    `,
  ]
}
