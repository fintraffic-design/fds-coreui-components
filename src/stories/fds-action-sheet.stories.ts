import { html, TemplateResult } from 'lit'
import '../fds-icon'
import '../global-types'

export default {
  title: 'Action Sheet',
}

type Template = () => TemplateResult

export const ActionSheet: Template = () => {
  return html`<fds-action-sheet style="max-width: 800px">
    <fds-button slot="separated" icon="x" variant="danger" label="Danger"></fds-button>
    <fds-button variant="tertiary" icon="alert-circle"></fds-button>
    <fds-button variant="tertiary" label="Tertiary"></fds-button>
    <fds-button variant="secondary" label="Secondary"></fds-button>
    <fds-button label="Primary"></fds-button>
  </fds-action-sheet>`
}
