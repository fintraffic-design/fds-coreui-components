import { html, TemplateResult } from 'lit'
import '../fds-action-sheet'
import '../fds-button'
import '../fds-card'
import { FdsCardElevation } from '../fds-card'
import '../fds-dialog'
import '../fds-icon'

export default {
  title: 'Dialog',
  args: {
    modal: false,
  },
}

type Template = (args: { modal: boolean }) => TemplateResult

export const Dialog: Template = ({ modal }) => {
  return html`
    <style>
      fds-action-sheet {
        padding: 32px;
      }

      h4,
      p {
        font-family: 'Public Sans';
      }
    </style>

    <fds-dialog .modal=${modal} style="width: 50%; min-width: 30rem; max-width: 40rem">
      <fds-card elevation="${FdsCardElevation.NONE}">
        <h4 slot="header-title">Modal title</h4>
        <p>Modal message</p>
        <fds-action-sheet slot="footer">
          <fds-button slot="separated" variant="danger" label="Button"></fds-button>
          <fds-button variant="tertiary" label="Button"></fds-button>
          <fds-button variant="secondary" label="Button"></fds-button>
          <fds-button label="Button"></fds-button>
        </fds-action-sheet>
      </fds-card>
    </fds-dialog>
  `
}
