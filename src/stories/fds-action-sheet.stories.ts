import { html, TemplateResult } from 'lit'
import '../fds-icon'
import { FdsAlertVariant } from '../fds-alert'
import { FdsActionSheetDirection } from '../fds-action-sheet'

export default {
  title: 'Action sheet',
  args: {
    direction: FdsActionSheetDirection.horizontal,
  },
  argTypes: {
    direction: {
      options: Object.keys(FdsActionSheetDirection),
      control: { type: 'select' },
    },
  },
}

type Template = (args: { direction: FdsAlertVariant }) => TemplateResult

export const ActionSheet: Template = ({ direction }) => {
  return html`<fds-action-sheet .direction=${direction}>
    <fds-button icon="x" variant="danger" label="Danger"></fds-button>
    <fds-button label="Primary"></fds-button>
    <fds-button variant="secondary" label="Secondary"></fds-button>
    <fds-button variant="tertiary" label="Tertiary"></fds-button>
    <fds-button variant="tertiary" icon="alert-circle"></fds-button>
  </fds-action-sheet>`
}
