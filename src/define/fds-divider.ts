import { FdsDivider } from '../divider.js'

customElements.define('fds-divider', FdsDivider)

declare global {
  interface HTMLElementTagNameMap {
    'fds-divider': FdsDivider
  }
}
