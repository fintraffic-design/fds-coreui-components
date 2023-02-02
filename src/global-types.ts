import { FdsActionSheet } from './fds-action-sheet'
import FdsAlert from './fds-alert'
import FdsButton from './fds-button'
import { FdsCard } from './fds-card'
import FdsDialog from './fds-dialog'
import FdsDropdown from './fds-dropdown'
import FdsIcon from './fds-icon'
import FdsNavigation from './fds-navigation'

declare global {
  interface HTMLElementTagNameMap {
    'fds-icon': FdsIcon
    'fds-card': FdsCard
    'fds-dialog': FdsDialog
    'fds-button': FdsButton
    'fds-action-sheet': FdsActionSheet
    'fds-alert': FdsAlert
    'fds-navigation': FdsNavigation
    'fds-dropdown': FdsDropdown
  }
}
