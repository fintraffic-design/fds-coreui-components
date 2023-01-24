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
  FdsSize1,
  FdsSize6,
  FdsTypographyUiLabelDisplay,
  FdsTypographyUiLabelFontFamily,
  FdsTypographyUiLabelFontSize,
  FdsTypographyUiLabelFontWeight,
  FdsTypographyUiLabelLetterSpacing,
  FdsTypographyUiLabelLineHeight,
} from '@fintraffic-design/coreui-css'
import { css, html, LitElement } from 'lit'
import { TemplateResult } from 'lit-html'
import { customElement, property } from 'lit/decorators.js'
import { tokenVar } from './token-utils'
import { FdsIcons } from './fds-icon'

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

@customElement('fds-button')
export default class FdsButton extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
      justify-content: center;
    }

    .button {
      display: flex;
      border: 2px solid ${tokenVar(FdsColorBrandBlack)};
      background: ${tokenVar(FdsColorBrandBlack)};
      color: ${tokenVar(variantColorMap[FdsButtonVariant.primary])};
      border-radius: ${tokenVar(FdsRadiusLarge)};
      padding: ${tokenVar(FdsSize1)} ${tokenVar(FdsSize1)};
      height: ${tokenVar(FdsSize6)};
      cursor: pointer;
      align-items: center;
      justify-content: center;
      transition: all 200ms;
    }

    .button *,
    .button ::slotted(*) {
      line-height: 1;
    }

    :host-context(.actions--vertical) .button:not(.button--glyph) {
      width: 100%;
    }

    .button:hover {
      background: ${tokenVar(FdsColorInteractive200)};
      border-color: ${tokenVar(FdsColorInteractive200)};
      color: ${tokenVar(FdsColorBrandWhite)};
    }

    .button:disabled {
      background: ${tokenVar(FdsColorNeutral100)};
      border-color: ${tokenVar(FdsColorNeutral100)};
      color: ${tokenVar(FdsColorText300)};
    }

    .button--secondary {
      background: ${tokenVar(FdsColorBrandWhite)};
      color: ${tokenVar(FdsColorBrandBlack)};
    }

    .button--secondary:disabled {
      background: transparent;
    }

    .button--tertiary {
      background: transparent;
      border-color: transparent;
      color: ${tokenVar(FdsColorBrandBlack)};
    }

    .button--tertiary:disabled {
      background: transparent;
      border-color: transparent;
    }

    .button--danger {
      background: ${tokenVar(FdsColorDanger300)};
      border-color: ${tokenVar(FdsColorDanger300)};
      color: ${tokenVar(FdsColorBrandWhite)};
    }

    .button--danger:hover {
      background: ${tokenVar(FdsColorDanger400)};
      border-color: ${tokenVar(FdsColorDanger400)};
      color: ${tokenVar(FdsColorBrandWhite)};
    }

    .button--danger:disabled {
      background: ${tokenVar(FdsColorNeutral100)};
      border-color: ${tokenVar(FdsColorNeutral100)};
      color: ${tokenVar(FdsColorText300)};
    }

    .button-label {
      padding: 0 ${tokenVar(FdsSize1)};
      font-family: ${tokenVar(FdsTypographyUiLabelFontFamily)};
      font-size: ${tokenVar(FdsTypographyUiLabelFontSize)};
      letter-spacing: ${tokenVar(FdsTypographyUiLabelLetterSpacing)};
      line-height: ${tokenVar(FdsTypographyUiLabelLineHeight)};
      font-weight: ${tokenVar(FdsTypographyUiLabelFontWeight)};
      display: ${tokenVar(FdsTypographyUiLabelDisplay)};
    }
  `

  @property() variant: FdsButtonVariant = FdsButtonVariant.primary
  @property() disabled: boolean = false
  @property() icon?: keyof typeof FdsIcons
  @property() label?: string

  override render(): TemplateResult {
    return html`
      <button class="button button--${this.variant}" ?disabled="${this.disabled}">
        ${this.icon ? html`<fds-icon class="button-icon" .icon="${this.icon}"></fds-icon>` : null}
        ${this.label ? html`<span class="button-label">${this.label}</span>` : null}
      </button>
    `
  }
}
