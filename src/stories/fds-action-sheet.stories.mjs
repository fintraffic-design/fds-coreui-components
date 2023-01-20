import { html } from 'lit'
import '../fds-action-sheet'

export default {
  title: 'Action sheet',
}

const Template = ({ direction }) => {
  return html`<fds-action-sheet .direction=${direction}>
    <fds-button><span>Primary with icon 😀</span></fds-button>
    <fds-button variant="secondary">Secondary</fds-button>
    <fds-button variant="tertiary">Tertiary</fds-button>
    <fds-button variant="danger">Danger</fds-button>
    <fds-button variant="glyph">✕</fds-button>
  </fds-action-sheet>`
}
export const Horizontal = Template.bind({})

Horizontal.args = {
  direction: 'horizontal',
}

export const Vertical = Template.bind({})

Vertical.args = {
  direction: 'vertical',
}
