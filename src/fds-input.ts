import { css, html, LitElement, TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { FdsColorBrandWhite, FdsColorNeutral200, FdsColorToken } from '@fintraffic-design/coreui-css'
import { tokenVar } from './utils/token-utils'

/**
 * Input component.
 *
 */
@customElement('fds-input')
export default class FdsInput extends LitElement {
  @property() label?: string = ''
  @property() placeholder?: string = ''
  @property() message?: string
  @property() error?: boolean
  @property() disabled?: boolean

  override render(): TemplateResult {
    return html`<div class="input__container">
      <label for="input" class="input__label">${this.label}</label>
      <input type="text" name="input" placeholder=${ifDefined(this.placeholder)} />
      ${this.message && html`<span class="input__message">${this.message}</span>`}
    </div>`
  }

  static override styles = css`
    .input__container {
      display: flex;
      flex-direction: column;
    }
  `
}
