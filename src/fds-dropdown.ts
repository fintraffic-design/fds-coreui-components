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
import { tokenVar } from './token-utils'

import './global-types'
import { FdsIcons } from './fds-icon'

type Value = string | number | undefined
type Label = string

export interface DropdownOption {
  label: Label
  value: Value
  icon?: keyof typeof FdsIcons
}

/**
 * Single choice dropdown component.
 *
 * @property {DropdownOption[]} options - List of options to be shown in the menu.
 * @property {DropdownOption} defaultOption - Set option that is chosen as default.
 * @property {boolean} disabled - Disable dropdown.
 * @property {boolean} error - Display error indicator on dropdown.
 * @property {string} placeholder - Placeholder text while no option is selected.
 * @property {function} onSelect - Triggered when an option is selected. The selected value is given as parameter.
 */
@customElement('fds-dropdown')
export default class FdsDropdown extends LitElement {
  constructor() {
    super()
    // Set attributes to host element
    this.addEventListener('blur', () => (this._isOpen = false))
    this.tabIndex = 0
  }

  @property() options: DropdownOption[] = []
  @property() disabled: boolean = false
  @property() error: boolean = false
  @property() placeholder?: string
  @property() defaultOption?: DropdownOption
  @property() onSelect?: (selectedValue: Value) => void

  @state() private _isOpen: boolean = false
  @state() private _selectedOption?: DropdownOption = this.defaultOption

  override render(): TemplateResult {
    const contents = html`
      <div class="contents">
        ${this.options.map(
          option =>
            html`
              <div
                @click=${() => this.handleSelect(option)}
                @keypress=${(e: KeyboardEvent) => this.handleKeypress(e, option)}
                class=${`ui-label-text option ${this.getOptionCssClass(option)}`}
                tabindex=${0}
                aria-selected=${this._selectedOption === option}
              >
                ${this.getLabel(option)}
              </div>
            `
        )}
      </div>
    `

    return html`
      <button
        @click=${() => (this._isOpen = !this._isOpen)}
        ?disabled=${this.disabled}
        class=${`ui-label-text ${this.getButtonCssClass()}`}
        aria-haspopup=${true}
        aria-expanded=${this._isOpen}
      >
        ${this.getLabel(this._selectedOption) || this.placeholder}
        <fds-icon class="chevron" .icon=${this._isOpen ? 'chevron-up' : 'chevron-down'}></fds-icon>
      </button>
      ${this._isOpen ? contents : null}
    `
  }

  private handleKeypress(event: KeyboardEvent, selectedOption: DropdownOption): void {
    if (event.key === 'Enter') {
      this.handleSelect(selectedOption)
    }
  }

  private handleSelect(selectedOption: DropdownOption): void {
    this._selectedOption = selectedOption
    this._isOpen = false

    if (this.onSelect) {
      this.onSelect(selectedOption.value)
    }
  }

  private getLabel(option?: DropdownOption): TemplateResult | null {
    if (!option) {
      return null
    }
    const label = html`<span class="label">${option.label}</span>`

    return option.icon
      ? html`<span class="icon-label"><fds-icon .icon=${option.icon}></fds-icon>${label}</span>`
      : label
  }

  private getButtonCssClass(): string {
    if (this.error) {
      return 'error'
    }
    if (!this._selectedOption && this.placeholder) {
      return 'placeholder'
    }
    return ''
  }

  private getOptionCssClass(option: DropdownOption): string {
    return this._selectedOption === option ? 'selected' : ''
  }

  static override styles = css`
    :host {
      width: 100%;
      position: relative;
    }

    button {
      cursor: pointer;
      box-sizing: border-box;
      display: inline-flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      white-space: nowrap;

      width: 100%;
      /* TODO: what values? */
      height: 48px;
      padding-left: 16px;
      padding-right: 8px;
      gap: 10px;

      background-color: ${tokenVar(FdsColorBrandWhite)};
      border: 1px solid ${tokenVar(FdsColorNeutral200)};
    }

    button:disabled {
      cursor: default;
      background-color: ${tokenVar(FdsColorNeutral100)};
      color: ${tokenVar(FdsColorText300)};
    }

    button:disabled .chevron {
      color: ${tokenVar(FdsColorText300)};
    }

    button.placeholder {
      color: ${tokenVar(FdsColorText300)};
    }

    button.error {
      color: ${tokenVar(FdsColorDanger200)};
      border: 3px solid ${tokenVar(FdsColorDanger200)};
    }

    .contents {
      cursor: pointer;
      display: block;
      position: absolute;
      overflow-y: scroll;

      min-width: 100%;
      max-width: fit-content;
      /* TODO: what value? */
      max-height: 80vw;

      box-shadow: ${tokenVar(FdsStyleElevation200)};
    }

    fds-icon {
      position: static;
      color: ${tokenVar(FdsColorText1000)};
    }

    .icon-label {
      display: flex;
      align-items: center;
      overflow: hidden;

      gap: 0.5em;
    }

    .label {
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .option {
      display: flex;
      align-items: center;

      /* TODO: what values? */
      height: 56px;
      padding-left: 16px;
      padding-right: 8px;

      background-color: ${tokenVar(FdsColorBrandWhite)};
      border-bottom: 1px solid ${tokenVar(FdsColorNeutral200)};
    }

    .option:hover {
      /* TODO: what color? */
      background-color: ${tokenVar(FdsColorInteractive100)};
    }

    .option.selected {
      /* TODO: what color? */
      background-color: ${tokenVar(FdsColorInteractive200)};
    }

    .ui-label-text {
      font-family: ${tokenVar(FdsTypographyUiLabelFontFamily)};
      font-style: 'medium';
      font-weight: ${tokenVar(FdsTypographyUiLabelFontWeight)};
      font-size: ${tokenVar(FdsTypographyUiLabelFontSize)};
      line-height: ${tokenVar(FdsTypographyUiLabelLineHeight)};
      letter-spacing: ${tokenVar(FdsTypographyUiLabelLetterSpacing)};

      color: ${tokenVar(FdsColorText1000)};
    }
  `
}
