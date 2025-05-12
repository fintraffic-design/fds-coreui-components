import {
  FdsColorBrandBlack,
  FdsColorInteractive200,
  FdsColorText300,
  FdsRadiusCompact,
  uiLabelTextClass,
} from '@fintraffic/fds-coreui-css'
import { css, html, LitElement } from 'lit'
import { TemplateResult } from 'lit-html'
import { property } from 'lit/decorators.js'

/**
 * Checkbox component.
 *
 * @property {string} label - Label for the checkbox.
 * @property {boolean} disabled - Disable checkbox.
 * @property {boolean} checked - Checkbox value.
 * @property {string} value - Value used in the form submission.
 * @property {string} name - Name of the checkbox. Used in form submission.
 * @event select - Dispatches a custom event when checkbox is clicked. The value is in the event details field.
 */
export class FdsCheckbox extends LitElement {
  static formAssociated = true
  static override shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true }
  private _internals: ElementInternals
  @property() label: string = ''
  @property({ type: Boolean }) disabled: boolean = false
  @property({ type: Boolean }) checked: boolean = false
  @property() value: string = 'on'
  @property() name?: string

  constructor() {
    super()
    this._internals = this.attachInternals()
    // Clicking anywhere on this component should trigger the checkbox
    this.addEventListener('click', () => {
      const checkbox = this.shadowRoot?.getElementById('checkbox') as HTMLInputElement
      if (checkbox) {
        checkbox.click()
      }
    })
  }

  override firstUpdated(): void {
    this.tabIndex = 0
    this.setValidity()
  }

  override render(): TemplateResult {
    return html`
      <input
        type="checkbox"
        id="checkbox"
        .disabled=${this.disabled}
        .checked="${this.checked}"
        .value="${this.value}"
        @change=${this.handleSelect}
        @click=${(e: Event): void => {
          // Prevent infinite loop
          e.stopPropagation()
        }}
      />
      ${this.label && html`<label for="checkbox" class="ui-label-text">${this.label}</label>`}
    `
  }

  private handleSelect(): void {
    if (!this.disabled) {
      this.checked = !this.checked
      this.setValidity()
      this.setFormValue()
      setTimeout(() => {
        this.dispatchEvent(new CustomEvent<boolean>('select', { detail: this.checked }))
      })
    }
  }

  public checkValidity(): boolean {
    return this._internals.checkValidity()
  }

  public reportValidity(): boolean {
    return this._internals.reportValidity()
  }

  public get validity(): ValidityState {
    return this._internals.validity
  }

  public get labels(): NodeList {
    return this._internals.labels
  }

  public get validationMessage(): string {
    return this._internals.validationMessage
  }

  private setValidity(): void {
    const checkbox = this.shadowRoot?.getElementById('checkbox') as HTMLInputElement
    this._internals.setValidity(checkbox.validity, checkbox.validationMessage, checkbox)
  }

  private setFormValue(): void {
    if (this.checked) {
      const checkboxName = this.name
      if (checkboxName !== undefined) {
        this._internals.setFormValue(this.value.toString())
      }
    } else {
      this._internals.setFormValue(null)
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
        border: 2px solid ${FdsColorBrandBlack};
        border-radius: ${FdsRadiusCompact};
      }

      #checkbox:checked::before {
        border-color: ${FdsColorInteractive200};
        background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEwIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0zLjM4Nzc2IDcuNDAzM0wwLjE0NjA2NiA0LjE2MTYxQy0wLjA0ODY4ODcgMy45NjY4NSAtMC4wNDg2ODg3IDMuNjUxMDggMC4xNDYwNjYgMy40NTYzMUwwLjg1MTM0OSAyLjc1MUMxLjA0NjEgMi41NTYyMyAxLjM2MTkgMi41NTYyMyAxLjU1NjY1IDIuNzUxTDMuNzQwNDEgNC45MzQ3NEw4LjQxNzc4IDAuMjU3Mzk0QzguNjEyNTQgMC4wNjI2Mzk0IDguOTI4MzMgMC4wNjI2Mzk0IDkuMTIzMDggMC4yNTczOTRMOS44MjgzNyAwLjk2MjY5NkMxMC4wMjMxIDEuMTU3NDUgMTAuMDIzMSAxLjQ3MzIyIDkuODI4MzcgMS42NjhMNC4wOTMwNiA3LjQwMzMyQzMuODk4MjkgNy41OTgwOCAzLjU4MjUxIDcuNTk4MDggMy4zODc3NiA3LjQwMzNWNy40MDMzWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==');
        background-color: ${FdsColorInteractive200};
        background-repeat: no-repeat;
        background-position: center;
      }

      #checkbox:disabled::before,
      #checkbox:disabled + label {
        cursor: default;
        color: ${FdsColorText300};
      }

      #checkbox:disabled::before {
        border-color: ${FdsColorText300};
      }

      #checkbox:disabled#checkbox:checked::before {
        background-color: ${FdsColorText300};
      }
    `,
  ]
}
