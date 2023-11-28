import { FdsDialog } from '../dialog.js'

customElements.define('fds-dialog', FdsDialog)

declare global {
  interface HTMLElementTagNameMap {
    'fds-dialog': FdsDialog
  }
}
