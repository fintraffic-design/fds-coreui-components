import { Story } from '@storybook/web-components'
import { html } from 'lit'
import '../fds-input'

export default {
  title: 'Input',
  parameters: {
    componentSubtitle: 'Text input component with FDS styling',
    docs: {
      description: {
        component:
          "`import '@fintraffic-design/coreui-components/src/fds-input'` <br><br>\
          Selector: `<fds-input>`",
      },
    },
    actions: {
      handles: ['change'],
    },
  },
  args: {
    label: 'Label',
    value: '',
    message: 'Helper message',
    placeholder: 'Placeholder',
    error: false,
    disabled: false,
    slot: undefined,
  },
  argTypes: {
    label: {
      description:
        'Label for the input. <br><br> \
    `string`',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'undefined' },
      },
    },
    value: {
      description:
        'Input value. <br><br> \
    `string`',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'undefined' },
      },
    },
    message: {
      description:
        'Helper/error message. Additional information or instructions about the purpose of the input field or the expected user input. <br><br> \
    `string`',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'undefined' },
      },
    },
    placeholder: {
      description:
        'Placeholder for the input. <br><br>\
        `string`',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'undefined' },
      },
    },
    error: {
      description:
        'Whether the input is in error state. <br><br>\
    `boolean`',
      table: {
        category: 'Properties',
        defaultValue: { summary: false },
      },
    },
    disabled: {
      description:
        'Whether the input is disabled. <br><br> \
    `boolean`',
      table: {
        category: 'Properties',
        defaultValue: { summary: false },
      },
    },
    slot: {
      description: 'No slots',
      table: { category: 'Slots' },
      name: '',
      control: false,
    },
  },
}

const Template: Story = ({ label, value, message, placeholder, error, disabled }) => {
  return html`<fds-input
    .label=${label}
    .message=${message}
    .placeholder=${placeholder}
    .error=${error}
    .disabled=${disabled}
    .value=${value}
    @change="${(event: CustomEvent<string>): void => console.log('@change', event.detail)}"
  ></fds-input>`
}

export const Input: Story = Template.bind({})
