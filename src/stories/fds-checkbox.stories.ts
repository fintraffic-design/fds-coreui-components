import { Meta, StoryFn } from '@storybook/web-components'
import { html } from 'lit'
import '../define/fds-checkbox.js'

export default {
  title: 'Checkbox',
  parameters: {
    componentSubtitle: 'Checkbox element with FDS styling',
    docs: {
      description: {
        component:
          "`import '@fintraffic/fds-coreui-components/dist/define/fds-checkbox'` <br><br>\
          Element: `<fds-checkbox>`",
      },
    },
  },
  args: {
    label: 'Label',
    checked: false,
    disabled: false,
    select: undefined,
    slot: undefined,
  },
  argTypes: {
    label: {
      description:
        'Label for the checkbox. <br><br>\
        `string`',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'undefined' },
      },
    },
    checked: {
      description:
        'Whether the checkbox is checked. <br><br>\
      `boolean`',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      description:
        'Whether the checkbox is disabled. <br><br>\
      `boolean`',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
      },
    },
    select: {
      description:
        "Event that is dispatched when the checkbox is checked/unchecked. The value is in the event's details field. <br><br> \
      `CustomEvent<boolean>`",
      table: { category: 'Events' },
      name: '@select',
      control: false,
    },
    slot: {
      description: 'No slots',
      table: { category: 'Slots' },
      name: '',
      control: false,
    },
  },
} as Meta

const Template: StoryFn = ({ label, disabled, checked }) => {
  return html`
    <fds-checkbox
      .label=${label}
      .checked=${checked}
      .disabled=${disabled}
      @select="${(event: CustomEvent<boolean>): void => console.log('@select', event.detail)}"
    ></fds-checkbox>
  `
}

export const Checkbox = {
  render: Template,
}
