import {
  FdsColorBrandWhite,
  FdsColorDanger200,
  FdsColorInteractive100,
  FdsColorInteractive200,
  FdsColorNeutral100,
  FdsColorNeutral200,
  FdsColorNeutral50,
  FdsColorText1000,
  FdsColorText300,
  FdsStyleElevation200,
  uiLabelTextClass,
} from '@fintraffic/fds-coreui-css'
import { css, html, LitElement } from 'lit'
import { TemplateResult } from 'lit-html'
import { property } from 'lit/decorators.js'
import { FdsIcon, FdsIconType } from './icon.js'

// Declare used elements to avoid lit-plugin(no-unknown-tag-name) warning
// These components still need to be registered separately (by the importing app).
declare global {
  interface HTMLElementTagNameMap {
    'fds-icon': FdsIcon
  }
}

// A type that can be used with structuredClone
export type Cloneable = unknown

export interface FdsDropdownOption<T extends Cloneable> {
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
 * @property {boolean} multiple - Allow multiple selections.
 * @property {boolean} required - Required field indicator.
 * @property {string} name - Name of the dropdown. Used for form submission.
 */
export class FdsDropdown<T> extends LitElement {
  static formAssociated = true
  static override shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true }
  private _internals: ElementInternals

  constructor() {
    super()
    this.addEventListener('blur', () => (this.getButton().ariaExpanded = 'false'))
    this._internals = this.attachInternals()
  }

  @property() options: FdsDropdownOption<T>[] = []
  @property({ type: Boolean }) disabled: boolean = false
  @property({ type: Boolean }) error: boolean = false
  @property() placeholder?: string
  @property() value?: FdsDropdownOption<T> | FdsDropdownOption<T>[]
  @property({ type: Boolean }) multiple: boolean = false
  @property({ type: Boolean }) required: boolean = false
  @property() name?: string

  override firstUpdated(): void {
    this.tabIndex = 0
    this.setValidity()
    if (this.multiple) {
      this.setMultipleHeaderContent()
    }
  }

  override render(): TemplateResult {
    const singleOptionItem = (option: FdsDropdownOption<T>): TemplateResult => html`
      <li
        @click=${(): void => this.handleSelect(option)}
        @keypress=${(e: KeyboardEvent): void => this.handleKeypress(e, option)}
        class=${`ui-label-text option ${this.getOptionCssClass(option)}`}
        tabindex=${0}
        aria-selected=${this.value === option}
      >
        ${this.getLabel(option)}
      </li>
    `
    const multipleOptionItem = (option: FdsDropdownOption<T>): TemplateResult => html`
      <li>
        <label class="ui-label-text option option-multiple ${this.getOptionCssClass(option)}">
          <fds-checkbox
            @select="${(): void => this.handleMultiSelect(option)}"
            ?checked=${Array.isArray(this.value)
              ? this.value.some(selectedOption => selectedOption.value === option.value)
              : false}
          >
          </fds-checkbox>
          ${this.getLabel(option)}
        </label>
      </li>
    `
    const optionsList = html`
      <ul
        part="options-list"
        id="options-list"
        role="listbox"
        aria-label="options"
        class="options-list"
        aria-multiselectable="true"
      >
        ${this.options.map(option => (this.multiple ? multipleOptionItem(option) : singleOptionItem(option)))}
      </ul>
    `
    const isFirstRender = this.renderRoot.children.length === 0

    const multipleHeader = (): TemplateResult => {
      const selectedOptions = this.value
      const placeholderTemplate = html`<div>${this.placeholder || ''}</div>`

      if (selectedOptions === undefined || selectedOptions === null) {
        return placeholderTemplate
      }

      if (!Array.isArray(selectedOptions)) {
        throw new Error('Selected options should be an array when multiple is true')
      }

      if (selectedOptions.length === 0) {
        return placeholderTemplate
      }

      return html`
        <div class="selected-options-container">
          <div class="selected-options">
            ${selectedOptions.map(
              option => html` <span class="selected-tag">${this.getLabel(option)}</span> `
            )}
          </div>
          <span class="overflow-counter"></span>
        </div>
      `
    }
    const singleHeader = (): TemplateResult => {
      return html` <div>${this.getLabel(this.value) ?? this.placeholder}</div> `
    }

    return html`
      <div class="dropdown-wrapper">
        <button
          @click=${(): void => {
            const buttonElement = this.getButton()
            buttonElement.ariaExpanded = (!(buttonElement.ariaExpanded === 'true')).toString()
          }}
          ?disabled=${this.disabled}
          class=${`ui-label-text ${this.getButtonCssClass()}`}
          role="combobox"
          aria-controls="options-list"
          aria-expanded=${isFirstRender ? 'false' : this.getButton().ariaExpanded}
        >
          ${this.multiple ? multipleHeader() : singleHeader()}
          <fds-icon icon="chevron-up"></fds-icon>
          <fds-icon icon="chevron-down"></fds-icon>
        </button>
        ${optionsList}
      </div>
    `
  }

  setMultipleHeaderContent(): void {
    const couterWidth = 30

    const container = this.renderRoot.querySelector('.selected-options-container') as HTMLElement
    const optionsEl = this.renderRoot.querySelector('.selected-options') as HTMLElement
    const counterEl = this.renderRoot.querySelector('.overflow-counter') as HTMLElement

    if (!container || !optionsEl || !counterEl) return

    const optionTags = Array.from(optionsEl.querySelectorAll('.selected-tag'))
    let hiddenCount = 0

    const containerWidth = container.clientWidth - couterWidth
    let currentWidth = 0

    optionTags.forEach(tag => {
      const tagEl = tag as HTMLElement
      currentWidth += tagEl.offsetWidth
      // offsetWidth doesn't take into account the fds-icon width. Check if the tag contains icon and add its width
      const fdsIconEl = tagEl.querySelector('fds-icon')
      if (fdsIconEl) {
        currentWidth += parseInt(fdsIconEl.size.value)
      }

      if (currentWidth > containerWidth) {
        tagEl.classList.add('hidden')
        hiddenCount++
      } else {
        tagEl.classList.remove('hidden')
      }
    })

    if (hiddenCount > 0) {
      counterEl.classList.remove('hidden')
      counterEl.textContent = `+${hiddenCount}`
    } else {
      counterEl.textContent = ''
      counterEl.classList.add('hidden')
    }
  }

  override updated(): void {
    this.setMultipleHeaderContent()
  }

  private handleKeypress(event: KeyboardEvent, selectedOption: FdsDropdownOption<T>): void {
    if (event.key === 'Enter') {
      this.handleSelect(selectedOption)
    }
  }

  private getButton(): HTMLButtonElement {
    const button = this.renderRoot.querySelector('button')

    if (button === null) {
      throw new Error('Button element not found')
    }
    return button
  }

  private handleSelect(selectedOption: FdsDropdownOption<T>): void {
    this.getButton().ariaExpanded = 'false'
    this.value = selectedOption
    this.setValidity()
    this.setFormValue()
    this.dispatchEvent(new FdsDropdownEvent(selectedOption))
  }

  private handleMultiSelect(selectedOption: FdsDropdownOption<T>): void {
    const allValues = this.getValues()
    this.value = allValues.length > 0 ? allValues : undefined
    this.setValidity()
    this.setFormValue()
    this.dispatchEvent(new FdsDropdownEvent(selectedOption))
  }

  private getLabel(option?: FdsDropdownOption<T> | FdsDropdownOption<T>[]): TemplateResult | null {
    if (!option) {
      return null
    }
    if (Array.isArray(option)) {
      if (option.length === 0) {
        return null
      }
      option = option[0]
    }
    const label = html`<span class="label">${option.label}</span>`

    return option.icon
      ? html`<span class="icon-label"><fds-icon .icon=${option.icon}></fds-icon>${label}</span>`
      : label
  }

  getValues(): FdsDropdownOption<T>[] {
    const findOption = (label: string): FdsDropdownOption<T> | undefined => {
      return this.options.find(option => option.label === label)
    }
    let selectedOptions: FdsDropdownOption<T>[] = []
    if (this.multiple) {
      const fdsCheckboxes = this.renderRoot.querySelectorAll('fds-checkbox')
      selectedOptions = Array.from(fdsCheckboxes)
        .filter(fdsCheckbox => fdsCheckbox.checked)
        .map(fdsCheckbox => {
          if (fdsCheckbox.labels === null || fdsCheckbox.labels[0].textContent === null) {
            return undefined
          }
          const fdsCheckboxLabel = fdsCheckbox.labels[0].textContent.trim()
          return findOption(fdsCheckboxLabel)
        })
        .filter(option => option !== undefined) as FdsDropdownOption<T>[]
    } else {
      const listItems = this.renderRoot.querySelectorAll('li')
      const selectedItem = Array.from(listItems).find(item => item.getAttribute('aria-selected') === 'true')
      if (selectedItem !== undefined) {
        const selectedLabel = selectedItem.textContent?.trim()
        if (selectedLabel !== undefined) {
          const selectedOption = findOption(selectedLabel)
          selectedOptions = selectedOption ? [selectedOption] : []
        }
      }
    }
    return structuredClone(selectedOptions)
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

  public checkValidity(): boolean {
    return this._internals.checkValidity()
  }

  public reportValidity(): boolean {
    return this._internals.reportValidity()
  }

  public get labels(): NodeList {
    return this._internals.labels
  }

  public get validity(): ValidityState {
    return this._internals.validity
  }

  public get validationMessage(): string {
    return this._internals.validationMessage
  }

  private setValidity(): void {
    const valueMissing = this.required ? this.value === undefined : false
    this._internals.setValidity({ valueMissing, customError: this.error }, 'Invalid state')
  }

  private setFormValue(): void {
    const dropdownName = this.name
    if (dropdownName !== undefined) {
      const formData = new FormData()
      const values = this.getValues()
      values.forEach(option => {
        if (option.value) {
          formData.append(dropdownName, option.value.toString())
        }
      })
      this._internals.setFormValue(formData)
    }
  }

  static override styles = [
    uiLabelTextClass,
    css`
      :host {
        width: 100%;
        position: relative;
        --fds-typography-ui-label-display: flex;
        --counter-width: 30px;
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

        background-color: ${FdsColorBrandWhite};
        border: 1px solid ${FdsColorNeutral200};
      }

      button:disabled {
        cursor: default;
        background-color: ${FdsColorNeutral50};
        color: ${FdsColorText300};
      }

      button:disabled .chevron {
        color: ${FdsColorText300};
      }

      button.placeholder {
        color: ${FdsColorText300};
      }

      button.error {
        color: ${FdsColorDanger200};
        border: 3px solid ${FdsColorDanger200};
      }

      .selected-options-container {
        display: flex;
        align-items: center;
        overflow: hidden;
        width: 100%;
      }

      .selected-options {
        display: flex;
        flex-wrap: nowrap;
        overflow: hidden;
        width: calc(100% - var(--counter-width));
      }

      .selected-tag {
        white-space: nowrap;
        background: ${FdsColorNeutral100};
        padding: 2px 6px;
        margin-right: 4px;
        border-radius: 4px;
      }

      .hidden {
        visibility: hidden;
      }

      .overflow-counter {
        min-width: 24px;
      }

      .options-list {
        cursor: pointer;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        position: relative;
        z-index: 1;
        overflow-y: scroll;
        max-height: 80vh;
        box-shadow: ${FdsStyleElevation200};
        padding: 0;
      }

      .dropdown-wrapper:has([aria-expanded='false']) {
        .options-list {
          display: none;
        }
        fds-icon[icon='chevron-up'] {
          display: none;
        }
      }

      .dropdown-wrapper:has([aria-expanded='true']) {
        .options-list {
          display: flex;
        }
        fds-icon[icon='chevron-down'] {
          display: none;
        }
      }

      fds-icon {
        position: static;
        color: ${FdsColorText1000};
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

        background-color: ${FdsColorBrandWhite};
        border-bottom: 1px solid ${FdsColorNeutral200};

        &.option-multiple {
          cursor: pointer;
          gap: 10px;
          flex-wrap: nowrap;
        }
      }

      .option:hover {
        /* TODO: what color? */
        background-color: ${FdsColorInteractive100};
      }

      .option.selected {
        /* TODO: what color? */
        background-color: ${FdsColorInteractive200};
      }
    `,
  ]
}
