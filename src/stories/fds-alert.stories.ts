import { Meta } from '@storybook/web-components'
import { html, TemplateResult } from 'lit'
import { FdsAlertVariant } from '../fds-alert'
import '../fds-icon'
import '../fds-alert'
import { FdsIconType } from '../fds-icon'

export default {
  title: 'Alert',
  parameters: {
    componentSubtitle: 'Message bar for displaying error, info, alert or success messages.',
    docs: {
      description: {
        component: 'Selector: `<fds-alert>`',
      },
    },
  },
  args: {
    variant: FdsAlertVariant.error,
    icon: 'alert-triangle',
    slot: undefined,
  },
  argTypes: {
    variant: {
      options: Object.values(FdsAlertVariant),
      control: {
        type: 'select',
      },
      description:
        'Type or color theme for the message. <br><br>\
        `FdsAlertVariant.error` `FdsAlertVariant.warning` `FdsAlertVariant.info` `FdsAlertVariant.success`',
      defaultValue: { summary: FdsAlertVariant.error },
      table: {
        category: 'Properties',
      },
    },
    icon: {
      options: ['alert-triangle', 'check-circle', 'alert-circle', undefined],
      control: { type: 'select' },
      description:
        'Icon displayed on the left side of the message. Accepts icon name as value. <br><br>\
      value of `FdsIconType`',
      defaultValue: { summary: 'undefined' },
      table: { category: 'Properties' },
    },
    slot: {
      description: 'Default slot',
      table: { category: 'Slots' },
      name: '',
      control: false,
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
