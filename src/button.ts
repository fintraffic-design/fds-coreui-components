import {
  FdsColorBrandBlack,
  FdsColorBrandWhite,
  FdsColorDanger300,
  FdsColorDanger400,
  FdsColorInteractive200,
  FdsColorNeutral100,
  FdsColorText300,
  FdsRadiusLarge,
  FdsSize6,
  uiLabelTextClass,
} from '@fintraffic/fds-coreui-css'
import { css, CSSResult, html, LitElement } from 'lit'
import { TemplateResult } from 'lit-html'
import { property } from 'lit/decorators.js'
import { FdsIconType, FdsIcon } from './icon.js'

// Declare used elements to avoid lit-plugin(no-unknown-tag-name) warning
// These components still need to be registered separately (by the importing app).
declare global {
  interface HTMLElementTagNameMap {
    'fds-icon': FdsIcon
  }
}

export enum FdsButtonVariant {
  primary = 'primary',
  secondary = 'secondary',
  tertiary = 'tertiary',
  danger = 'danger',
}

const variantColorMap: Record<FdsButtonVariant, CSSResult> = {
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
export class FdsButton extends LitElement {
  static formAssociated = true
  static override shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true }
  private _internals: ElementInternals

  @property() variant: FdsButtonVariant = FdsButtonVariant.primary
  @property({ type: Boolean }) disabled: boolean = false
  @property() icon?: FdsIconType
  @property() label?: string
  @property() type?: 'button' | 'submit' | 'reset' | 'menu'
  @property() name?: string
  @property() value?: string

  constructor() {
    super()
    this._internals = this.attachInternals()
  }

  override updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if (changedProperties.has('value') || changedProperties.has('name')) {
      this.setValidity()
      this.setFormValue()
    }
  }

  override render(): TemplateResult {
    return html`
      <button id="button" class="button--${this.variant}" ?disabled="${this.disabled}">
        ${this.icon && html`<fds-icon .icon="${this.icon}"></fds-icon>`}
        ${this.label && html`<span class="ui-label-text">${this.label}</span>`}
      </button>
    `
  }

  public checkValidity(): boolean {
    return this._internals.checkValidity()
  }

  public reportValidity(): boolean {
    return this._internals.reportValidity()
  }

  public get validity(): ValidityState {
    return this._internals.validity
  }

  public get labels(): NodeList {
    return this._internals.labels
  }

  public get validationMessage(): string {
    return this._internals.validationMessage
  }

  private setValidity(): void {
    const button = this.shadowRoot?.getElementById('button') as HTMLInputElement
    this._internals.setValidity(button.validity, button.validationMessage, button)
  }

  private setFormValue(): void {
    if (this.name && this.value !== undefined) {
      const buttonName = this.name
      if (buttonName !== undefined) {
        this._internals.setFormValue(this.value.toString())
      }
    } else {
      this._internals.setFormValue(null)
    }
  }

  override connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('click', this._handleFormSubmit)
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener('click', this._handleFormSubmit)
  }

  _handleFormSubmit(): void {
    if (this.type === 'submit' || this.type === undefined) {
      const form = this._internals.form
      form?.requestSubmit()
    }
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
        border: 2px solid ${FdsColorBrandBlack};
        border-radius: ${FdsRadiusLarge};
        padding: 13px 16px;
        height: ${FdsSize6};
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
        border-color: ${FdsColorBrandBlack};
        background: ${FdsColorBrandBlack};
        color: ${variantColorMap[FdsButtonVariant.primary]};
      }

      .button--secondary {
        border: 2px solid ${FdsColorBrandBlack};
        background: ${FdsColorBrandWhite};
        color: ${variantColorMap[FdsButtonVariant.secondary]};
      }

      .button--tertiary {
        background: transparent;
        border-color: transparent;
        color: ${variantColorMap[FdsButtonVariant.tertiary]};
      }

      .button--danger {
        background: ${FdsColorDanger300};
        border-color: transparent;
        color: ${variantColorMap[FdsButtonVariant.danger]};
      }

      .button--primary:hover,
      .button--secondary:hover,
      .button--tertiary:hover {
        background: ${FdsColorInteractive200};
        border-color: transparent;
        color: ${FdsColorBrandWhite};
      }

      .button--danger:hover {
        background: ${FdsColorDanger400};
        border-color: ${FdsColorDanger400};
        color: ${FdsColorBrandWhite};
      }

      .button--primary:disabled {
        background: ${FdsColorNeutral100};
        border-color: ${FdsColorNeutral100};
        color: ${FdsColorText300};
      }

      .button--secondary:disabled {
        background: transparent;
        color: ${FdsColorNeutral100};
        border-color: ${FdsColorNeutral100};
      }

      .button--tertiary:disabled {
        background: transparent;
        border-color: transparent;
        color: ${FdsColorNeutral100};
      }

      .button--danger:disabled {
        background: ${FdsColorNeutral100};
        border-color: transparent;
        color: ${FdsColorText300};
      }
    `,
  ]
}
