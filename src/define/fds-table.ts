import { FdsTable } from '../table.js'

customElements.define('fds-table', FdsTable)

declare global {
  interface HTMLElementTagNameMap {
    'fds-table': FdsTable
  }
}
