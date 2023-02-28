import { css, html, LitElement, TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { FdsColorNeutral200, FdsColorToken } from '@fintraffic-design/coreui-css'
import { tokenVar } from './utils/token-utils'

/**
 * Input component.
 *
 */
@customElement('fds-input')
export default class FdsInput extends LitElement {
  @property() label: string = ''
  @property() message?: string

  override render(): TemplateResult {
    return html`<div class="input__container">
      <label for="input" class="input__label">${this.label}</label>
      <input type="text" name="input" />
      ${this.message && html`<span>${this.message}</span>`}
    </div>`
  }

  static override styles = css`
    .input__container {
      display: flex;
      flex-direction: column;
    }
  `
}
