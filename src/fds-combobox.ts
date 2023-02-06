import {
  FdsColorBrandWhite,
  FdsColorDanger200,
  FdsColorInteractive100,
  FdsColorInteractive200,
  FdsColorNeutral100,
  FdsColorNeutral200,
  FdsColorText1000,
  FdsColorText300,
  FdsStyleElevation200,
  FdsTypographyUiLabelFontFamily,
  FdsTypographyUiLabelFontSize,
  FdsTypographyUiLabelFontWeight,
  FdsTypographyUiLabelLetterSpacing,
  FdsTypographyUiLabelLineHeight,
} from '@fintraffic-design/coreui-css'
import { css, html, LitElement } from 'lit'
import { TemplateResult } from 'lit-html'
import { customElement, property, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { tokenVar } from './token-utils'

import './global-types'

/**
 * Combobox component.
 *
 */
@customElement('fds-combobox')
export default class FdsCombobox extends LitElement {
  constructor() {
    super()
    // Set attributes to host element
    this.addEventListener('blur', () => (this._isOpen = false))
    this.tabIndex = 0
  }

  @property() options: string[] = []
  @property() disabled: boolean = false
  @property() error: boolean = false
  @property() placeholder?: string
  @property() defaultOption?: string
  @property() onSelect?: (selectedOption: string) => void

  @state() private _isOpen: boolean = false
  @state() private _selectedOption?: string = this.defaultOption

  override render(): TemplateResult {
    return html`
      <input
        value=${ifDefined(this._selectedOption)}
        list="combobox"
        @onChange=${this.handleChange}
        @keypress=${this.handleKeypress}
        placeholder=${ifDefined(this.placeholder)}
      />
      <fds-icon class="chevron" .icon=${this._isOpen ? 'chevron-up' : 'chevron-down'}></fds-icon>
      <datalist id="combobox">
        ${this.options.map(
          option => html`<option value=${option} onClick=${this.handleClick}>${option}</option>`
        )}
      </datalist>
    `
  }

  private handleChange(selectedOption: string) {
    this._selectedOption = selectedOption
    this._isOpen = false

    if (this.onSelect) {
      this.onSelect(selectedOption)
    }
  }

  private handleKeypress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      ;(event.currentTarget as HTMLElement).blur()
    }
  }

  private handleClick(event: MouseEvent): void {
    ;(event.currentTarget as HTMLElement).blur()
  }
}
