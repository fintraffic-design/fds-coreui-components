import { html, LitElement, TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { FdsColorNeutral200, FdsColorToken, tokenVar } from '@fintraffic-design/coreui-css'

/**
 * Divider component.
 *
 * @property {FdsColorToken} color - FdsColorToken. Default color is neutral-200
 */
@customElement('fds-divider')
export default class FdsDivider extends LitElement {
  @property() color: FdsColorToken = FdsColorNeutral200

  override render(): TemplateResult {
    return html`<div style="border-top: 1px solid ${tokenVar(this.color)}"></div>`
  }
}
