import { css, html, LitElement, TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { FdsProperty, uiHelperTextClass, uiLabelTextClass } from '@fintraffic-design/coreui-css'

/**
 * Input component.
 *
 * @property {string} label - Label for the input.
 * @property {string} value - Set value for the input.
 * @property {string} placeholder - Placeholder for the input when there is no value.
 * @property {string} message - Helper/error message. Additional information or instructions about the purpose of the input field or the expected user input.
 * @property {boolean} error - Display error state.
 * @property {boolean} disabled - Disable input.
 *
 * @event change Dispatches a custom event when input value is changed. The value is in the event details field.
 *
 */
@customElement('fds-input')
export default class FdsInput extends LitElement {
  @property() value: string = ''
  @property() label?: string
  @property() placeholder?: string
  @property() message?: string
  @property() error: boolean = false
  @property() disabled: boolean = false

  override render(): TemplateResult {
    return html`
      ${this.label && html`<label for="input" class="input-label ui-label-text">${this.label}</label>`}
      <div class="input-container ui-label-text">
        <input
          type="text"
          id="input"
          placeholder=${ifDefined(this.placeholder)}
          class="ui-label-text ${this.error ? 'input--error' : ''}"
          .value=${this.value}
          ?disabled=${this.disabled}
          @input=${this.handleChange}
        />
      </div>
      ${this.message &&
      html`<span class="input-message ui-helper-text ${this.error ? 'input-message--error' : ''}"
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
        color: ${FdsProperty.ColorText1000};
      }

      .input-container {
        display: inline-flex;
      }

      input {
        width: 100%;
        height: 46px;
        text-overflow: ellipsis;
        padding: 0px 16px;
        background-color: ${FdsProperty.ColorBrandWhite};
        border: 1px solid ${FdsProperty.ColorNeutral200};
        border-radius: 4px;
        color: ${FdsProperty.ColorText1000};
      }

      input ::placeholder {
        color: ${FdsProperty.ColorText300};
      }

      input:disabled {
        border-color: ${FdsProperty.ColorNeutral200};
        color: ${FdsProperty.ColorText300};
        background-color: ${FdsProperty.ColorNeutral50};
      }

      .input--error {
        border: 3px solid ${FdsProperty.ColorDanger200};
        color: ${FdsProperty.ColorDanger200};
      }

      .input-message {
        padding-top: 8px;
        color: ${FdsProperty.ColorText600};
      }

      .input-message--error {
        color: ${FdsProperty.ColorDanger200};
      }
    `,
  ]
}
