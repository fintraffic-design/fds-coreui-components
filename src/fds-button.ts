import {
  FdsColorBrandBlack,
  FdsColorBrandWhite,
  FdsColorDanger300,
  FdsColorDanger400,
  FdsColorInteractive200,
  FdsColorNeutral100,
  FdsColorText300,
  FdsColorToken,
  FdsRadiusLarge,
  FdsSize6,
  tokenVar,
  uiLabelTextClass,
} from '@fintraffic-design/coreui-css'
import { css, html, LitElement } from 'lit'
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

const variantColorMap: { [key in FdsButtonVariant]: FdsColorToken } = {
  primary: FdsColorBrandWhite,
  secondary: FdsColorBrandBlack,
  tertiary: FdsColorBrandBlack,
  danger: FdsColorBrandWhite,
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
        border: 2px solid ${tokenVar(FdsColorBrandBlack)};
        border-radius: ${tokenVar(FdsRadiusLarge)};
        padding: 13px 16px;
        height: ${tokenVar(FdsSize6)};
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
        border-color: ${tokenVar(FdsColorBrandBlack)};
        background: ${tokenVar(FdsColorBrandBlack)};
        color: ${tokenVar(variantColorMap[FdsButtonVariant.primary])};
      }

      .button--secondary {
        border: 2px solid ${tokenVar(FdsColorBrandBlack)};
        background: ${tokenVar(FdsColorBrandWhite)};
        color: ${tokenVar(variantColorMap[FdsButtonVariant.secondary])};
      }

      .button--tertiary {
        background: transparent;
        border-color: transparent;
        color: ${tokenVar(variantColorMap[FdsButtonVariant.tertiary])};
      }

      .button--danger {
        background: ${tokenVar(FdsColorDanger300)};
        border-color: transparent;
        color: ${tokenVar(variantColorMap[FdsButtonVariant.danger])};
      }

      .button--primary:hover,
      .button--secondary:hover,
      .button--tertiary:hover {
        background: ${tokenVar(FdsColorInteractive200)};
        border-color: transparent;
        color: ${tokenVar(FdsColorBrandWhite)};
      }

      .button--danger:hover {
        background: ${tokenVar(FdsColorDanger400)};
        border-color: ${tokenVar(FdsColorDanger400)};
        color: ${tokenVar(FdsColorBrandWhite)};
      }

      .button--primary:disabled {
        background: ${tokenVar(FdsColorNeutral100)};
        border-color: ${tokenVar(FdsColorNeutral100)};
        color: ${tokenVar(FdsColorText300)};
      }

      .button--secondary:disabled {
        background: transparent;
        color: ${tokenVar(FdsColorNeutral100)};
        border-color: ${tokenVar(FdsColorNeutral100)};
      }

      .button--tertiary:disabled {
        background: transparent;
        border-color: transparent;
        color: ${tokenVar(FdsColorNeutral100)};
      }

      .button--danger:disabled {
        background: ${tokenVar(FdsColorNeutral100)};
        border-color: transparent;
        color: ${tokenVar(FdsColorText300)};
      }
    `,
  ]
}
