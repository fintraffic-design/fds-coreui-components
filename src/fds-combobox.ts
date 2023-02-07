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
} from '@fintraffic-design/coreui-css'
import { css, html, LitElement } from 'lit'
import { TemplateResult } from 'lit-html'
import { customElement, property, state } from 'lit/decorators.js'
import { tokenVar } from './utils/token-utils'

import './global-types'
import { uiLabelTextClass } from './utils/css-utils'

/**
 * Combobox component.
 *
 */
@customElement('fds-combobox')
export default class FdsCombobox extends LitElement {
  constructor() {
    super()
    // Set attributes to host element
    this.addEventListener('blur', () => (this._open = false))
    this.tabIndex = 0
  }

  @property() options: string[] = []
  @property() disabled: boolean = false
  @property() error: boolean = false
  @property() placeholder?: string
  @property() defaultOption?: string
  @property() onSelect?: (selectedValue: string) => void

  @state() private _open: boolean = false
  @state() private _selectedOption: string = this.defaultOption ?? ''

  override render(): TemplateResult {
    const contents = html`
      <div class="contents">
        ${this.options
          .filter((option: string) => option.toLowerCase().includes(this._selectedOption))
          .map(
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
      <input type="text" value=${this._selectedOption} @input=${this.handleInput} />
      <button
        @click=${() => (this._open = !this._open)}
        ?disabled=${this.disabled}
        class=${`ui-label-text ${this.getButtonCssClass()}`}
        aria-haspopup=${true}
        aria-expanded=${this._open}
      >
        ${this.getLabel(this._selectedOption) || this.placeholder}
        <fds-icon .icon=${this._open ? 'chevron-up' : 'chevron-down'}></fds-icon>
      </button>
      ${this._open ? contents : null}
    `
  }

  private handleInput(e: InputEvent): void {
    const target = e.target as HTMLInputElement
    this._selectedOption = target.value
  }

  private handleKeypress(event: KeyboardEvent, selectedOption: string): void {
    if (event.key === 'Enter') {
      this.handleSelect(selectedOption)
    }
  }

  private handleSelect(selectedOption: string): void {
    this._selectedOption = selectedOption
    this._open = false

    if (this.onSelect) {
      this.onSelect(selectedOption)
    }
  }

  private getLabel(option?: string): TemplateResult | null {
    if (!option) {
      return null
    }
    return html`<span class="label">${option}</span>`
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

  private getOptionCssClass(option: string): string {
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
    ${uiLabelTextClass}
  `
}
