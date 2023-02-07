import { FdsSize1, FdsColorText300 } from '@fintraffic-design/coreui-css'
import { css, html, LitElement } from 'lit'
import { TemplateResult } from 'lit-html'
import { customElement, property } from 'lit/decorators.js'
import { tokenVar } from './token-utils'
import './global-types'

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
        @click=${this.handleSelect}
        ?disabled=${this.disabled}
        ?checked=${this.checked}
      />
      <label for="checkbox" class="checkbox__label">${this.label}</label>
    `
  }

  private handleSelect(event: Event): void {
    event.preventDefault()
    if (this.onSelect) {
      this.onSelect(!this.checked)
    }
  }

  static override styles = css`
    .checkbox__label {
      margin-left: ${tokenVar(FdsSize1)};
    }

    input:disabled + label {
      color: ${tokenVar(FdsColorText300)};
    }
  `
}
