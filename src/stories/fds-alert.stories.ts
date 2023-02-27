import { Meta } from '@storybook/web-components'
import { html, TemplateResult } from 'lit'
import { FdsAlertVariant } from '../fds-alert'
import '../fds-icon'
import { FdsIconType } from '../fds-icon'

export default {
  title: 'Alert',
  args: {
    variant: FdsAlertVariant.error,
    icon: 'alert-triangle',
  },
  argTypes: {
    variant: {
      options: Object.keys(FdsAlertVariant),
      control: { type: 'select' },
    },
    icon: {
      options: ['alert-triangle', 'check-circle', 'alert-circle', undefined],
      control: { type: 'select' },
    },
  },
} as Meta

type Template = (args: { variant: FdsAlertVariant; icon: FdsIconType }) => TemplateResult

export const Alert: Template = ({ variant, icon }) => {
  return html`<fds-alert .variant=${variant} .icon=${icon}>Alert text</fds-alert>`
}

export const MultiLineContent: Template = ({ variant, icon }) => {
  return html`
    <fds-alert .variant=${variant} .icon=${icon}>
      <div>Alert text</div>
      <div>Alert text 2</div>
      <div>Alert text 3</div>
    </fds-alert>
  `
}
