import { html, LitElement, TemplateResult } from 'lit'
import { property } from 'lit/decorators.js'
import { FdsTokenColorNeutral200, FdsColorToken, tokenVar } from '@fintraffic/fds-coreui-css'

/**
 * Divider component.
 *
 * @property {FdsColorToken} color - FdsColorToken. Default color is neutral-200
 */
export class FdsDivider extends LitElement {
  @property({ type: Object }) color: FdsColorToken = FdsTokenColorNeutral200

  override render(): TemplateResult {
    return html`<div style="border-top: 1px solid ${tokenVar(this.color)}"></div>`
  }
}
