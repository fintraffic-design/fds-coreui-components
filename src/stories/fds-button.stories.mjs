import { html } from 'lit'
import '../fds-button'

export default {
  title: 'Button',
}

const Template = ({ variant, disabled }) =>
  html`<fds-button .variant=${variant} .disabled=${disabled}>Text</fds-button>`

export const Enabled = Template.bind({})

Enabled.args = {
  variant: 'primary',
  disabled: false,
}

export const Disabled = Template.bind({})

Disabled.args = {
  variant: 'primary',
  disabled: true,
}
