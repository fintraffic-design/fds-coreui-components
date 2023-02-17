import { Meta } from '@storybook/web-components'
import { html, TemplateResult } from 'lit'
import { FdsAlertVariant } from '../fds-alert'
import '../fds-icon'

export default {
  title: 'Alert',
  args: {
    variant: FdsAlertVariant.error,
  },
  argTypes: {
    variant: {
      options: Object.keys(FdsAlertVariant),
      control: { type: 'select' },
    },
  },
} as Meta

type Template = (args: { variant: FdsAlertVariant }) => TemplateResult

export const Alert: Template = ({ variant }) => {
  return html`<fds-alert .variant=${variant}>Alert text</fds-alert>`
}

export const MultiLineContent: Template = ({ variant }) => {
  return html`
    <fds-alert .variant=${variant}>
      <div>Alert text</div>
      <div>Alert text 2</div>
      <div>Alert text 3</div>
    </fds-alert>
  `
}
