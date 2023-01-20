import { html } from 'lit'
import '../fds-dialog'

export default {
  title: 'Dialog',
}

const Template = ({ open, modal }) => html`<fds-dialog .open=${open} .modal=${modal}>Text</fds-dialog>`

export const Default = Template.bind({})
