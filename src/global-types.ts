import { FdsActionSheet } from './fds-action-sheet'
import { FdsButton } from './fds-button'
import { FdsCard } from './fds-card'
import { FdsDialog } from './fds-dialog'
import FdsIcon from './fds-icon'

declare global {
  interface HTMLElementTagNameMap {
    'fds-icon': FdsIcon
    'fds-card': FdsCard
    'fds-dialog': FdsDialog
    'fds-button': FdsButton
    'fds-action-sheet': FdsActionSheet
  }
}
