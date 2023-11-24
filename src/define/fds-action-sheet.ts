import { FdsActionSheet } from '../action-sheet.js'

customElements.define('fds-action-sheet', FdsActionSheet)

declare global {
  interface HTMLElementTagNameMap {
    'fds-action-sheet': FdsActionSheet
  }
}
