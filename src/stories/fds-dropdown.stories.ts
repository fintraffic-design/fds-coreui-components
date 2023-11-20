import { StoryObj, Meta, StoryFn } from '@storybook/web-components'
import { html } from 'lit'
import { FdsDropdownEvent } from '../fds-dropdown'
import '../fds-dropdown'
import '../fds-icon'

export default {
  title: 'Dropdown',
  parameters: {
    componentSubtitle: 'List of options for selecting single choice input',
    docs: {
      description: {
        component:
          "`import '@fintraffic/fds-coreui-components/src/fds-dropdown'`<br>\
          `import { FdsDropdownEvent, FdsDropdownOption } from '@fintraffic/fds-coreui-components/src/fds-dropdown'`<br><br>\
          Selector: `<fds-dropdown>`",
      },
    },
    actions: {
      handles: ['select'],
    },
  },
  args: {
    placeholder: 'Options',
    options: [
      { label: 'Foo', value: 'Foo' },
      { label: 'Bar', value: 'Bar' },
      { label: 'Foo 2', value: 'Foo 2' },
      { label: 'Bar 2', value: 'Bar 2' },
      { label: 'Icon', value: 'Icon', icon: 'alert-triangle' },
      { label: 'Icon 2', value: 'Icon 2', icon: 'alert-circle' },
    ],
    value: undefined,
    disabled: false,
    error: false,
    select: undefined,
    slot: undefined,
  },
  argTypes: {
    placeholder: {
      description:
        'Placeholder for the dropdown. <br><br>\
        `string`',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'undefined' },
      },
    },
    options: {
      description:
        'Options listed in the dropdown. <br><br>\
        `FdsDropdownOption[]`',
      table: {
        category: 'Properties',
        defaultValue: { summary: '[]' },
      },
    },
    value: {
      description:
        'Selected option. <br><br>\
        `FdsDropdownOption`',
      control: false,
      table: {
        category: 'Properties',
        defaultValue: { summary: 'undefined' },
      },
    },
    disabled: {
      description:
        'Whether the dropdown is disabled. <br><br>\
        `boolean`',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      description:
        'Whether the dropdown is in error state. <br><br>\
        `boolean`',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
      },
    },
    select: {
      description:
        "Event that is dispatched when an option is selected. The value is in the event's details field. <br><br> \
      `CustomEvent<DropdownEvent>`",
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

const Template: StoryFn = ({ options, value, disabled, error, placeholder }) => {
  return html`
    <div style="width:284px; height: 260px;">
      <fds-dropdown
        .options=${options}
        .value=${value}
        .disabled=${disabled}
        .error=${error}
        .placeholder=${placeholder}
        @select="${(event: FdsDropdownEvent<string>): void => console.log('@select', event.detail)}"
      ></fds-dropdown>
    </div>
  `
}

export const Dropdown: StoryObj = {
  render: Template,
}

export const LongText: StoryObj = {
  render: Template,

  args: {
    options: [
      { label: 'Foooooooooooooooooooooooooooooooooooooooooooooo', value: 'Foo' },
      { label: 'Foo-Bar-Foo-Bar-Foo-Bar-Foo-Bar-Foo-Bar-Foo-Bar-Foo-Bar-Foo-Bar', value: 'Foo-Bar' },
      { label: 'Foo Bar Foo Bar Foo Bar Foo Bar Foo Bar Foo Bar Foo Bar Foo Bar', value: 'Foo Bar' },
      {
        label: 'Alert Alert Alert Alert Alert Alert Alert Alert Alert Alert Alert',
        value: 'Alert',
        icon: 'alert-triangle',
      },
    ],
  },

  parameters: {
    docs: {
      description: {
        story: 'An example of a combobox with long values in options.',
      },
    },
  },
}
