import { html, TemplateResult } from 'lit'
import '../fds-dialog'
import '../fds-card'
import '../fds-action-sheet'
import '../fds-button'
import { FdsSize3 } from '@fintraffic-design/coreui-css'

export default {
  title: 'Dialog',
  args: {
    modal: false,
  },
}

type Template = (args: { modal: boolean }) => TemplateResult

export const Dialog: Template = ({ modal }) => {
  return html`<fds-dialog .modal=${modal}>
    <fds-card style="padding: 0 1rem" elevation="0">
      <div>Dialog with action sheet and text</div>
      <fds-action-sheet style="margin-top: ${FdsSize3.value}">
        <fds-button slot="separated" variant="danger" label="Destroy"></fds-button>
        <fds-button variant="secondary" label="Cancel"></fds-button>
        <fds-button label="OK"></fds-button>
      </fds-action-sheet>
    </fds-card>
  </fds-dialog>`
}
