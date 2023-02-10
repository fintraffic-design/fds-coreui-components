import {
  FdsColorBrandWhite,
  FdsColorDanger200,
  FdsColorInteractive100,
  FdsColorInteractive300,
  FdsColorNeutral100,
  FdsColorNeutral200,
  FdsColorText1000,
  FdsColorText300,
  FdsStyleElevation200,
} from '@fintraffic-design/coreui-css'
import { css, html, LitElement } from 'lit'
import { TemplateResult } from 'lit-html'
import { customElement, property, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
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
    this.addEventListener('blur', () => {
      this._open = false
      this._hightlightOption = undefined
      if (this.onSelect) {
        this.onSelect(this._value)
      }
    })
  }

  @property() options: string[] = []
  @property() disabled: boolean = false
  @property() error: boolean = false
  @property() placeholder?: string
  @property() initialValue?: string
  @property() addNewIndicator: boolean = false
  @property() onSelect?: (value: string) => void

  @state() private _open: boolean = false
  @state() private _value: string = this.initialValue ?? ''
  @state() private _hightlightOption: number | undefined

  override render(): TemplateResult {
    const filteredOptions = this.options.filter((option: string) =>
      option.toLowerCase().includes(this._value.toLowerCase())
    )

    const addOptionRow = html`
      <div
        @click=${() => this.handleSelectFromList(this._value)}
        @keypress=${(e: KeyboardEvent) => this.handleOptionKeypress(e, this._value)}
        @mouseenter=${() => (this._hightlightOption = filteredOptions.length)}
        class=${`option new ui-label-text ${this.getOptionCssClass(filteredOptions.length)}`}
        tabindex=${0}
      >
        <fds-icon .icon=${'plus'}></fds-icon>Lisää "${this._value}"
      </div>
    `

    const contents = html`
      <div id="options-list" @mouseleave=${() => (this._hightlightOption = undefined)}>
        ${filteredOptions.map(
          (option, idx) => html`
            <div
              @click=${() => this.handleSelectFromList(option)}
              @keypress=${(e: KeyboardEvent) => this.handleOptionKeypress(e, option)}
              @mouseenter=${() => (this._hightlightOption = idx)}
              class=${`option ui-label-text ${this.getOptionCssClass(idx)}`}
              tabindex=${0}
              aria-selected=${this._value === option}
            >
              ${option}
            </div>
          `
        )}
        ${this.addNewIndicator && this._value ? addOptionRow : null}
      </div>
    `

    return html`
      <div
        @click=${() => (this._open = true)}
        class=${`input-container ${this.getButtonCssClass()}`}
        aria-haspopup=${true}
        aria-expanded=${this._open}
      >
        <input
          id="input"
          type="text"
          class="ui-label-text"
          .value=${this._value}
          @input=${this.handleInput}
          @keydown=${this.handleInputKeydown}
          ?disabled=${this.disabled}
          placeholder=${ifDefined(this.placeholder)}
        />
        <fds-icon .icon=${this._open ? 'chevron-up' : 'chevron-down'}></fds-icon>
      </div>
      ${this._open ? contents : null}
    `
  }

  private handleInput(e: InputEvent): void {
    const target = e.target as HTMLInputElement
    this._value = target.value
  }

  /**
   * This method is used merely for tab selection, which is an accessability option.
   * When selecting options via arrow keys, the selection is handled differently.
   */
  private handleOptionKeypress(e: KeyboardEvent, selectedOption: string): void {
    if (e.key === 'Enter') {
      this.handleSelectFromList(selectedOption)
    }
  }

  private handleSelectFromList(newValue: string): void {
    this._value = newValue
    this.blur()
  }

  private handleInputKeydown(e: KeyboardEvent): void {
    this._open = true

    if (e.key === 'Escape') {
      this._open = false
      const target = e.target as HTMLInputElement
      target.select()
    }

    if (e.key === 'Enter') {
      if (this.shadowRoot && this._hightlightOption !== undefined) {
        const selectedNode = this.shadowRoot.querySelectorAll('#options-list>div')[this._hightlightOption]

        if (!selectedNode.classList.contains('new') && selectedNode.textContent) {
          this._value = selectedNode.textContent.trim()
        }
      }
      this.blur()
    }

    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault()
      if (!this.shadowRoot) {
        return
      }
      const optionCount = this.shadowRoot.querySelectorAll('#options-list>div').length - 1

      if (e.key === 'ArrowUp') {
        if (this._hightlightOption === undefined || this._hightlightOption === 0) {
          this._hightlightOption = optionCount
        } else {
          this._hightlightOption = this._hightlightOption - 1
        }
      }

      if (e.key === 'ArrowDown') {
        if (this._hightlightOption === undefined || this._hightlightOption === optionCount) {
          this._hightlightOption = 0
        } else {
          this._hightlightOption = this._hightlightOption + 1
        }
      }
    } else {
      this._hightlightOption = undefined
    }
  }

  private getButtonCssClass(): string {
    if (this.error) {
      return 'error'
    }
    if (!this._value && this.placeholder) {
      return 'placeholder'
    }
    return ''
  }

  private getOptionCssClass(idx: number): string {
    return this._hightlightOption === idx ? 'highlight' : ''
  }

  static override styles = css`
    :host {
      width: 100%;
      position: relative;
    }

    .input-container {
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
    }

    .input-container > input {
      width: inherit;
      height: inherit;
      text-overflow: ellipsis;
      padding-left: 16px;
      padding-right: 40px; // icon 24px + 8px padding for left and right
      background-color: ${tokenVar(FdsColorBrandWhite)};
      border: 1px solid ${tokenVar(FdsColorNeutral200)};
    }

    .input-container > fds-icon {
      pointer-events: none;
      position: absolute;
      right: 8px;
      color: ${tokenVar(FdsColorText1000)};
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

    #options-list {
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

    .option {
      display: flex;
      align-items: center;

      /* TODO: what values? */
      height: 56px;
      padding-left: 16px;
      //padding-right: 8px;

      background-color: ${tokenVar(FdsColorBrandWhite)};
      border-bottom: 1px solid ${tokenVar(FdsColorNeutral200)};
    }

    .option.highlight {
      /* TODO: what color? */
      background-color: ${tokenVar(FdsColorInteractive100)};
    }

    .option.new {
      color: ${tokenVar(FdsColorInteractive300)};
      gap: 10px;
    }

    ${uiLabelTextClass}
  `
}
