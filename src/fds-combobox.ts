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
 * @property options: {string} - List of options to suggest to user.
 * @property disabled {boolean} - Disable combobox.
 * @property error {boolean} - Display error indicator on combobox.
 * @property placeholder {string} - Placeholder value to show while combobox has no input.
 * @property initialValue {string} - Set option that is chosen as default.
 * @property addNewIndicator {boolean} - Show a text indicator at options list telling user he can add the current value.
 * @property onSelect {function} - Triggered when combobox loses focus. Focus is lost on following scenarios:
 * 1. User clicks outside the element
 * 2. User presses Enter
 * 3. User clicks an option from the menu
 */
@customElement('fds-combobox')
export default class FdsCombobox extends LitElement {
  constructor() {
    super()
    // Set attributes to host element
    this.addEventListener('blur', () => {
      this._open = false
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

  override render(): TemplateResult {
    const filteredOptions = this.options.filter((option: string) =>
      option.toLowerCase().includes(this._value.toLowerCase())
    )

    const addOptionRow = html`
      <div
        @click=${() => this.handleSelectFromList(this._value)}
        @keypress=${(e: KeyboardEvent) => this.handleOptionKeypress(e, this._value)}
        @mouseenter=${(e: MouseEvent) => this.addSelectedTo(e.target as Element)}
        @mouseleave=${this.removeSelected}
        class="option new ui-label-text"
        tabindex=${0}
      >
        <fds-icon .icon=${'plus'}></fds-icon>Lisää "${this._value}"
      </div>
    `

    const contents = html`
      <div id="options-list">
        ${filteredOptions.map(
          option => html`
            <div
              @click=${() => this.handleSelectFromList(option)}
              @keypress=${(e: KeyboardEvent) => this.handleOptionKeypress(e, option)}
              @mouseenter=${(e: MouseEvent) => this.addSelectedTo(e.target as Element)}
              @mouseleave=${this.removeSelected}
              class="option ui-label-text"
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
      <div @click=${() => (this._open = true)} class=${`input-container ${this.getInputCssClass()}`}>
        <input
          type="text"
          class="ui-label-text"
          .value=${this._value}
          @input=${this.handleInput}
          @keydown=${this.handleInputKeydown}
          placeholder=${ifDefined(this.placeholder)}
          aria-haspopup=${true}
          aria-expanded=${this._open}
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
    const { shadowRoot } = this
    if (!shadowRoot) {
      return
    }

    this._open = true

    const selected = shadowRoot.querySelector('.selected')

    if (e.key === 'Escape') {
      this._open = false
      const target = e.target as HTMLInputElement
      target.select()
    }

    if (e.key === 'Enter') {
      if (selected && !selected.classList.contains('new') && selected.textContent) {
        this._value = selected.textContent.trim()
      }
      this.blur()
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()

      if (selected) {
        this.removeSelected()
        this.addSelectedTo(selected.previousElementSibling)
      } else {
        this.addSelectedTo(shadowRoot.querySelector('.option:last-child'))
      }
      this.scrollToView()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()

      if (selected) {
        this.removeSelected()
        this.addSelectedTo(selected.nextElementSibling)
      } else {
        this.addSelectedTo(shadowRoot.querySelector('.option:first-child'))
      }
      this.scrollToView()
    } else {
      this.removeSelected()
    }
  }

  private scrollToView(): void {
    this.shadowRoot?.querySelector('.selected')?.scrollIntoView({
      behavior: 'auto',
      inline: 'nearest',
      block: 'nearest',
    })
  }

  private removeSelected(): void {
    if (this.shadowRoot) {
      console.log('test')
      this.shadowRoot.querySelector('.selected')?.classList.remove('selected')
    }
  }

  private addSelectedTo(node: Element | null): void {
    if (node) {
      node.classList.add('selected')
    }
  }

  private getInputCssClass(): string {
    if (this.disabled) {
      return 'disabled'
    }
    if (this.error) {
      return 'error'
    }
    if (!this._value && this.placeholder) {
      return 'placeholder'
    }
    return ''
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

    .input-container.disabled {
      pointer-events: none;
    }

    .input-container.disabled > input {
      cursor: default;
      background-color: ${tokenVar(FdsColorNeutral100)};
      color: ${tokenVar(FdsColorText300)};
    }

    .input-container.error > input {
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
      white-space: nowrap;

      /* TODO: what values? */
      height: 56px;
      padding-left: 16px;
      padding-right: 8px;

      background-color: ${tokenVar(FdsColorBrandWhite)};
      border-bottom: 1px solid ${tokenVar(FdsColorNeutral200)};
    }

    .option.selected {
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
