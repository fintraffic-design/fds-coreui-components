import { FdsPopover } from '../popover.js'

customElements.define('fds-popover', FdsPopover)

declare global {
  interface HTMLElementTagNameMap {
    'fds-popover': FdsPopover
  }
}
