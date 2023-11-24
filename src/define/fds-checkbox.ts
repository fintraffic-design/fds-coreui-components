import { FdsCheckbox } from '../checkbox.js'

customElements.define('fds-checkbox', FdsCheckbox)

declare global {
  interface HTMLElementTagNameMap {
    'fds-checkbox': FdsCheckbox
  }
}
