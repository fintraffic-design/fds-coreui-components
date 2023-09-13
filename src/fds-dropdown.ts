import { FdsProperty, uiLabelTextClass } from '@fintraffic-design/coreui-css'
import { css, html, LitElement } from 'lit'
import { TemplateResult } from 'lit-html'
import { customElement, property, state } from 'lit/decorators.js'
import { FdsIconType } from './fds-icon'
import './global-types'

export interface FdsDropdownOption<T> {
  label: string
  value: T
  icon?: FdsIconType
}

export class FdsDropdownEvent<T> extends CustomEvent<FdsDropdownOption<T>> {
  constructor(detail: FdsDropdownOption<T>) {
    // composed allows event to bubble through shadow dom - false for now, but could be re-evaluated later.
    super('select', { detail, bubbles: true, cancelable: true, composed: false })
  }
}

/**
 * Single choice dropdown component.
 *
 * @event select - Dispatches an custom event when option is selected from dropdown.
 *
 * @property {FdsDropdownOption[]} options - List of options to be shown in the menu.
 * @property {FdsDropdownOption} value - Set value for the component.
 * @property {boolean} disabled - Disable dropdown.
 * @property {boolean} error - Display error indicator on dropdown.
 * @property {string} placeholder - Placeholder text while no option is selected.
 */
@customElement('fds-dropdown')
export default class FdsDropdown<T> extends LitElement {
  constructor() {
    super()
    // Set attributes to host element
    this.addEventListener('blur', () => (this._open = false))
    this.tabIndex = 0
  }

  @property() options: FdsDropdownOption<T>[] = []
  @property() disabled: boolean = false
  @property() error: boolean = false
  @property() placeholder?: string
  @property() value?: FdsDropdownOption<T>

  @state() private _open: boolean = false

  override render(): TemplateResult {
    const optionsList = html`
      <div class="options-list">
        ${this.options.map(
          option => html`
            <div
              @click=${(): void => this.handleSelect(option)}
              @keypress=${(e: KeyboardEvent): void => this.handleKeypress(e, option)}
              class=${`ui-label-text option ${this.getOptionCssClass(option)}`}
              tabindex=${0}
              aria-selected=${this.value === option}
            >
              ${this.getLabel(option)}
            </div>
          `
        )}
      </div>
    `

    return html`
      <button
        @click=${(): boolean => (this._open = !this._open)}
        ?disabled=${this.disabled}
        class=${`ui-label-text ${this.getButtonCssClass()}`}
        aria-haspopup=${true}
        aria-expanded=${this._open}
      >
        <div>${this.getLabel(this.value) ?? this.placeholder}</div>
        <fds-icon .icon=${this._open ? 'chevron-up' : 'chevron-down'}></fds-icon>
      </button>
      ${this._open ? optionsList : null}
    `
  }

  private handleKeypress(event: KeyboardEvent, selectedOption: FdsDropdownOption<T>): void {
    if (event.key === 'Enter') {
      this.handleSelect(selectedOption)
    }
  }

  private handleSelect(selectedOption: FdsDropdownOption<T>): void {
    this._open = false
    this.value = selectedOption
    this.dispatchEvent(new FdsDropdownEvent(selectedOption))
  }

  private getLabel(option?: FdsDropdownOption<T>): TemplateResult | null {
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
    if (!this.value && this.placeholder) {
      return 'placeholder'
    }
    return ''
  }

  private getOptionCssClass(option: FdsDropdownOption<T>): string {
    return this.value === option ? 'selected' : ''
  }

  static override styles = [
    uiLabelTextClass,
    css`
      :host {
        width: 100%;
        position: relative;
        --fds-typography-ui-label-display: flex;
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

        background-color: ${FdsProperty.ColorBrandWhite};
        border: 1px solid ${FdsProperty.ColorNeutral200};
      }

      button:disabled {
        cursor: default;
        background-color: ${FdsProperty.ColorNeutral50};
        color: ${FdsProperty.ColorText300};
      }

      button:disabled .chevron {
        color: ${FdsProperty.ColorText300};
      }

      button.placeholder {
        color: ${FdsProperty.ColorText300};
      }

      button.error {
        color: ${FdsProperty.ColorDanger200};
        border: 3px solid ${FdsProperty.ColorDanger200};
      }

      .options-list {
        cursor: pointer;
        display: block;
        position: absolute;
        overflow-y: scroll;

        min-width: 100%;
        max-width: fit-content;
        /* TODO: what value? */
        max-height: 80vw;

        box-shadow: ${FdsProperty.StyleElevation200};
      }

      fds-icon {
        position: static;
        color: ${FdsProperty.ColorText1000};
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
        white-space: nowrap;

        /* TODO: what values? */
        height: 56px;
        padding-left: 16px;
        padding-right: 8px;

        background-color: ${FdsProperty.ColorBrandWhite};
        border-bottom: 1px solid ${FdsProperty.ColorNeutral200};
      }

      .option:hover {
        /* TODO: what color? */
        background-color: ${FdsProperty.ColorInteractive100};
      }

      .option.selected {
        /* TODO: what color? */
        background-color: ${FdsProperty.ColorInteractive200};
      }
    `,
  ]
}
