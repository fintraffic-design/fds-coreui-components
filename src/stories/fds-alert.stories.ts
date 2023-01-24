import { html, TemplateResult } from 'lit'
import '../fds-icon'
import { FdsAlertVariant } from '../fds-alert'

export default {
  title: 'Alert',
  args: {
    variant: FdsAlertVariant.error,
    text: 'Alert text',
  },
  argTypes: {
    variant: {
      options: Object.keys(FdsAlertVariant),
      control: { type: 'select' },
    },
  },
}

type Template = (args: { variant: FdsAlertVariant; text: string }) => TemplateResult

export const Alert: Template = ({ variant, text }) => {
  return html`<fds-alert .variant=${variant}>${text}</fds-alert>`
}
