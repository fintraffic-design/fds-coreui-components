import { FdsDropdown } from '../dropdown.js'
// import components used internally in FdsDropdown
import './fds-icon.js'

customElements.define('fds-dropdown', FdsDropdown)

declare global {
  interface HTMLElementTagNameMap {
    'fds-dropdown': FdsDropdown<never>
  }
}
