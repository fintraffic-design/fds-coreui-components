import { html } from 'lit'
import '../fds-alert'

export default {
  title: 'Alert',
}

const Template = ({ variant }) =>
  html`<fds-alert .variant=${variant}>
    <span slot="content">
        This is ${variant} alert
    </span>
  </fds-alert>`

export const Error = Template.bind({})

Error.args = {
  variant: 'error',
}

export const Warning = Template.bind({})

Warning.args = {
  variant: 'warning',
}

export const Info = Template.bind({})

Info.args = {
  variant: 'info',
}

export const Success = Template.bind({})

Success.args = {
  variant: 'success',
}