import { FdsNavigation } from '../navigation.js'
// import components used internally in FdsNavigation
import './fds-icon.js'

customElements.define('fds-navigation', FdsNavigation)

declare global {
  interface HTMLElementTagNameMap {
    'fds-navigation': FdsNavigation
  }
}
