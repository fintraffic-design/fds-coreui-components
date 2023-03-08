import { css, html, LitElement, TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import {
  FdsColorBrandWhite,
  FdsColorNeutral200,
  FdsColorNeutral100,
  FdsColorDanger200,
  FdsColorText600,
  FdsColorText300,
  FdsColorText1000,
} from '@fintraffic-design/coreui-css'
import { tokenVar } from './utils/token-utils'
import { uiLabelTextClass, uiHelperTextClass } from './utils/css-utils'

/**
 * Input component.
 *
 * @property {string} label - Label for the input.
 * @property {string} value - Input value the user has entered.
 * @property {string} placeholder - Placeholder for the input when there is no value.
 * @property {string} message - Helper/error message. Additional information or instructions about the purpose of the input field or the expected user input.
 * @property {boolean} invalid - Display invalid input.
 * @property {boolean} disabled - Disable input.
 *
 * @event change Dispatches a custom event when input value is changed. The value is in the event details field.
 *
 */
@customElement('fds-input')
export default class FdsInput extends LitElement {
  @property() label?: string
  @property() value?: string
  @property() placeholder?: string
  @property() message?: string
  @property() invalid: boolean = false
  @property() disabled: boolean = false

  override render(): TemplateResult {
    return html`
      ${this.label && html`<label for="input" class="input-label ui-label-text">${this.label}</label>`}
      <div class="input-container ui-label-text">
        <input
          type="text"
          id="input"
          placeholder=${ifDefined(this.placeholder)}
          class="ui-label-text ${this.invalid ? 'input--error' : ''}"
          value=${ifDefined(this.value)}
          ?disabled=${this.disabled}
          @input=${this.handleChange}
        />
      </div>
      ${this.message &&
      html`<span class="input-message ui-helper-text ${this.invalid ? 'input-message--error' : ''}"
        >${this.message}</span
      >`}
    `
  }
  private handleChange(event: Event): void {
    const input = event.target as FdsInput
    this.dispatchEvent(
      new CustomEvent<string>('change', {
        detail: input.value,
        bubbles: true,
        cancelable: true,
        composed: false, // Allows event to bubble through shadow dom - false for now, but could be re-evaluated later.
      })
    )
  }

  static override styles = [
    uiLabelTextClass,
    uiHelperTextClass,
    css`
      :host {
        display: flex;
        flex-direction: column;
      }

      .input-label {
        padding-bottom: 8px;
        color: ${tokenVar(FdsColorText1000)};
      }

      .input-container {
        display: inline-flex;
      }

      input {
        width: 100%;
        height: 46px;
        text-overflow: ellipsis;
        padding: 0px 16px;
        background-color: ${tokenVar(FdsColorBrandWhite)};
        border: 1px solid ${tokenVar(FdsColorNeutral200)};
        border-radius: 4px;
        color: ${tokenVar(FdsColorText1000)};
      }

      input ::placeholder {
        color: ${tokenVar(FdsColorText300)};
      }

      input:disabled {
        border-color: ${tokenVar(FdsColorNeutral200)};
        color: ${tokenVar(FdsColorText300)};
        background-color: ${tokenVar(FdsColorNeutral100)};
      }

      .input--error {
        border: 3px solid ${tokenVar(FdsColorDanger200)};
        color: ${tokenVar(FdsColorDanger200)};
      }

      .input-message {
        padding-top: 8px;
        color: ${tokenVar(FdsColorText600)};
      }

      .input-message--error {
        color: ${tokenVar(FdsColorDanger200)};
      }
    `,
  ]
}
