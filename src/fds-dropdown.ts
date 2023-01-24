import { css, html, LitElement } from 'lit'
import { TemplateResult } from 'lit-html'
import { customElement, property, state } from 'lit/decorators.js'
import './global-types'

type State = 'placeholder' | 'selected' | 'error' | 'disabled'

type Value = string

type Label = string | { label: string; icon: SVGElement }

export interface DropdownOption {
  label: Label
  value: Value
}

/**
 * Single choice dropdown component. For multiselection use MultiselectDropdown component.
 *
 */
@customElement('fds-dropdown')
export default class FdsDropdown extends LitElement {
  static override styles = css`
    :host {
    }
  `

  @property() options: DropdownOption[] = []
  @property() disabled: boolean = false
  @property() placeholder?: string
  @property() defaultOption?: DropdownOption
  @property() onSelect?: (selectedValue: Value) => void

  @state() private _isOpen: boolean = false
  @state() private _selectedOption?: DropdownOption

  override render(): TemplateResult {
    const optionElements = this.options.map(
      option => html`<div @click=${() => this.handleSelect(option)}>${option.label}</div>`
    )

    return html`
      <button
        @click=${() => (this._isOpen = !this._isOpen)}
        @blur=${() => (this._isOpen = false)}
        ?disabled=${this.disabled}
      >
        ${this._selectedOption?.label || this.placeholder}
      </button>
      ${this._isOpen ? optionElements : null}
    `
  }

  private handleSelect(selectedOption: DropdownOption): void {
    this._selectedOption = selectedOption

    if (this.onSelect) {
      this.onSelect(selectedOption.value)
    }
  }
}
