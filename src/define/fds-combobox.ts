import { FdsCombobox } from '../combobox.js'
// import components used internally in FdsCombobox
import './fds-icon.js'

customElements.define('fds-combobox', FdsCombobox)

declare global {
  interface HTMLElementTagNameMap {
    'fds-combobox': FdsCombobox
  }
}
