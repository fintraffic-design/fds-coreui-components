import {
  FdsColorText300,
  FdsColorInteractive200,
  FdsColorBrandBlack,
  FdsRadiusCompact,
} from '@fintraffic-design/coreui-css'
import { css, html, LitElement } from 'lit'
import { TemplateResult } from 'lit-html'
import { customElement, property } from 'lit/decorators.js'
import { tokenVar } from './utils/token-utils'
import './global-types'
import { uiLabelTextClass } from './utils/css-utils'

/**
 * Checkbox component.
 *
 * @property {string} label - Label for the checkbox.
 * @property {boolean} disabled - Disable checkbox.
 * @property {boolean} checked - Checkbox value.
 * @property {function} onSelect - Triggered when checkbox is clicked. The value is returned as parameter.
 */
@customElement('fds-checkbox')
export default class FdsCheckbox extends LitElement {
  @property() label: string = ''
  @property() disabled: boolean = false
  @property() checked: boolean = false
  @property() onSelect?: (value: boolean) => void

  override render(): TemplateResult {
    return html`
      <input
        type="checkbox"
        id="checkbox"
        ?disabled=${this.disabled}
        ?checked=${this.checked}
        @click=${this.handleSelect}
      />
      <label for="checkbox" class="ui-label-text">${this.label}</label>
    `
  }

  private handleSelect(event: Event): void {
    event.preventDefault()
    if (!this.disabled && this.onSelect) {
      this.onSelect(!this.checked)
    }
  }

  static override styles = [
    uiLabelTextClass,
    css`
      :host {
        user-select: none;
      }

      #checkbox {
        appearance: none;
      }

      label {
        padding: 0 16px;
        position: relative;
        right: 7px;
      }

      label,
      #checkbox::before {
        cursor: pointer;
      }

      #checkbox::before {
        content: '';
        height: 16px;
        width: 16px;
        display: inline-block;
        vertical-align: sub;
        border: 2px solid ${tokenVar(FdsColorBrandBlack)};
        border-radius: ${tokenVar(FdsRadiusCompact)};
      }

      #checkbox:checked::before {
        border-color: ${tokenVar(FdsColorInteractive200)};
        background-image: url(src/assets/checkbox-checkmark.svg);
        background-color: ${tokenVar(FdsColorInteractive200)};
        background-repeat: no-repeat;
        background-position: center;
      }

      #checkbox:disabled::before,
      #checkbox:disabled + label {
        cursor: default;
        color: ${tokenVar(FdsColorText300)};
      }

      #checkbox:disabled::before {
        border-color: ${tokenVar(FdsColorText300)};
      }

      #checkbox:disabled#checkbox:checked::before {
        background-color: ${tokenVar(FdsColorText300)};
      }
    `,
  ]
}
