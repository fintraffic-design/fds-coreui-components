import { Meta, Story } from '@storybook/web-components'
import { html } from 'lit'
import { FdsAlertVariant } from '../fds-alert'
import '../fds-icon'
import '../fds-alert'

export default {
  title: 'Alert',
  parameters: {
    componentSubtitle: 'Message bar for displaying error, info, alert or success messages',
    docs: {
      description: {
        component:
          "`import '@fintraffic-design/coreui-components/src/fds-alert'` <br>\
          `import { FdsAlertVariant } from '@fintraffic-design/coreui-components/src/fds-alert'` <br><br> \
          Selector: `<fds-alert>`",
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
        `FdsAlertVariant`',
      table: {
        category: 'Properties',
        defaultValue: { summary: `'${FdsAlertVariant.error}'` },
      },
    },
    icon: {
      options: ['alert-triangle', 'check-circle', 'alert-circle', undefined],
      control: { type: 'select' },
      description:
        'Icon displayed on the left side of the message. Accepts icon name as value. <br><br>\
      `FdsIconType`',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'undefined' },
      },
    },
    slot: {
      description: 'Default slot. Container for the content.',
      table: { category: 'Slots' },
      name: '',
      control: false,
    },
  },
} as Meta

const Template: Story = ({ variant, icon }) => {
  return html`<fds-alert .variant=${variant} .icon=${icon}>Alert text</fds-alert>`
}

const TemplateMultiLine: Story = ({ variant, icon }) => {
  return html`
    <fds-alert .variant=${variant} .icon=${icon}>
      <div>Alert text</div>
      <div>Alert text 2</div>
      <div>Alert text 3</div>
    </fds-alert>
  `
}

export const Alert: Story = Template.bind({})
export const MultiLineContent: Story = TemplateMultiLine.bind({})

MultiLineContent.parameters = {
  docs: {
    description: {
      story: 'An example of multiple elements in default slot',
    },
  },
}
