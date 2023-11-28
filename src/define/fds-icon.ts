import { FdsIcon } from '../icon.js'

customElements.define('fds-icon', FdsIcon)

declare global {
  interface HTMLElementTagNameMap {
    'fds-icon': FdsIcon
  }
}
