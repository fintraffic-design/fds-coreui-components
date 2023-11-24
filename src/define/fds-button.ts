import { FdsButton } from '../button.js'
// import components used internally in FdsButton
import './fds-icon.js'

customElements.define('fds-button', FdsButton)

declare global {
  interface HTMLElementTagNameMap {
    'fds-button': FdsButton
  }
}
