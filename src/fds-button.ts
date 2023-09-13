import { FdsProperty, uiLabelTextClass } from '@fintraffic-design/coreui-css'
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
  primary: FdsProperty.ColorBrandWhite,
  secondary: FdsProperty.ColorBrandBlack,
  tertiary: FdsProperty.ColorBrandBlack,
  danger: FdsProperty.ColorBrandWhite,
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
        border: 2px solid ${FdsProperty.ColorBrandBlack};
        border-radius: ${FdsProperty.RadiusLarge};
        padding: 13px 16px;
        height: ${FdsProperty.Size6};
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
        border-color: ${FdsProperty.ColorBrandBlack};
        background: ${FdsProperty.ColorBrandBlack};
        color: ${variantColorMap[FdsButtonVariant.primary]};
      }

      .button--secondary {
        border: 2px solid ${FdsProperty.ColorBrandBlack};
        background: ${FdsProperty.ColorBrandWhite};
        color: ${variantColorMap[FdsButtonVariant.secondary]};
      }

      .button--tertiary {
        background: transparent;
        border-color: transparent;
        color: ${variantColorMap[FdsButtonVariant.tertiary]};
      }

      .button--danger {
        background: ${FdsProperty.ColorDanger300};
        border-color: transparent;
        color: ${variantColorMap[FdsButtonVariant.danger]};
      }

      .button--primary:hover,
      .button--secondary:hover,
      .button--tertiary:hover {
        background: ${FdsProperty.ColorInteractive200};
        border-color: transparent;
        color: ${FdsProperty.ColorBrandWhite};
      }

      .button--danger:hover {
        background: ${FdsProperty.ColorDanger400};
        border-color: ${FdsProperty.ColorDanger400};
        color: ${FdsProperty.ColorBrandWhite};
      }

      .button--primary:disabled {
        background: ${FdsProperty.ColorNeutral100};
        border-color: ${FdsProperty.ColorNeutral100};
        color: ${FdsProperty.ColorText300};
      }

      .button--secondary:disabled {
        background: transparent;
        color: ${FdsProperty.ColorNeutral100};
        border-color: ${FdsProperty.ColorNeutral100};
      }

      .button--tertiary:disabled {
        background: transparent;
        border-color: transparent;
        color: ${FdsProperty.ColorNeutral100};
      }

      .button--danger:disabled {
        background: ${FdsProperty.ColorNeutral100};
        border-color: transparent;
        color: ${FdsProperty.ColorText300};
      }
    `,
  ]
}
