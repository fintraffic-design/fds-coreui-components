import { FdsAlert } from '../alert.js'
// import components used internally in FdsAlert
import './fds-icon.js'

customElements.define('fds-alert', FdsAlert)

declare global {
  interface HTMLElementTagNameMap {
    'fds-alert': FdsAlert
  }
}
