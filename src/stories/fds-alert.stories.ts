import { StoryObj, Meta, StoryFn } from '@storybook/web-components'
import { html } from 'lit'
import { FdsAlertVariant } from '../alert'
import { FdsIcons } from '../icon'
import '../define/fds-alert.js'

export default {
  title: 'Alert',
  parameters: {
    componentSubtitle: 'Message bar for displaying error, info, alert or success messages',
    docs: {
      description: {
        component:
          "`import '@fintraffic/fds-coreui-components/dist/define/fds-alert.js'` <br>\
          `import { FdsAlertVariant } from '@fintraffic/fds-coreui-components'` <br><br> \
          Element: `<fds-alert>`",
      },
    },
  },
  args: {
    variant: FdsAlertVariant.error,
    icon: 'alert-triangle',
    dismissible: true,
    slot: undefined,
  },
  argTypes: {
    variant: {
      options: Object.values(FdsAlertVariant),
      control: { type: 'select' },
      description:
        'Type or color theme for the message. <br><br>\
        `FdsAlertVariant`',
      table: {
        category: 'Properties',
        defaultValue: { summary: `'${FdsAlertVariant.error}'` },
      },
    },
    icon: {
      options: ['', ...Object.keys(FdsIcons)],
      control: { type: 'select' },
      description:
        'Icon displayed on the left side of the message. Accepts icon name as value. <br><br>\
      `FdsIconType`',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'undefined' },
      },
    },
    dismissible: {
      control: { type: 'boolean' },
      description: 'If true, alert can be dismissed by clicking the close button.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
      },
    },
    slot: {
      description: 'Default slot. Container for the content.',
      table: { category: 'Slots' },
      name: '',
      control: false,
    },
    dismiss: {
      description:
        'Event that is dispatched when the alert is dismissed. <br><br> \
      `CustomEvent`',
      table: { category: 'Events' },
      name: '@dismiss',
      control: false,
    },
  },
} as Meta

const Template: StoryFn = ({ variant, icon, dismissible }) => {
  return html`<fds-alert
    .variant=${variant}
    .icon=${icon}
    .dismissible=${dismissible}
    @dismissed="${(): void => console.log('dismissed')}"
    >Alert text</fds-alert
  >`
}

export const Alert: StoryObj = {
  render: Template,
}
