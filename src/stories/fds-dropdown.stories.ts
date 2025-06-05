import { StoryObj, Meta, StoryFn } from '@storybook/web-components'
import { userEvent, within, expect, fireEvent } from '@storybook/test'
import { html } from 'lit'
import { FdsDropdownEvent } from '../dropdown.js'
import '../define/fds-dropdown.js'

export default {
  title: 'Dropdown',
  parameters: {
    componentSubtitle: 'A dropdown for selecting a single or multiple options.',
    docs: {
      description: {
        component:
          "`import '@fintraffic/fds-coreui-components/src/fds-dropdown'`<br>\
          `import { FdsDropdownEvent, FdsDropdownOption } from '@fintraffic/fds-coreui-components/src/fds-dropdown'`<br><br>\
          Element: `<fds-dropdown>`",
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
    required: false,
    error: false,
    select: undefined,
    slot: undefined,
    name: undefined,
    multiple: false,
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
    required: {
      description:
        'Whether the dropdown value is required. <br><br>\
        `boolean`',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
      },
    },
    name: {
      description:
        'Key name to use when sending with form. <br><br>\
        `string`',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'undefined' },
      },
    },
    multiple: {
      description:
        'Whether the multiple values can be selected. <br><br>\
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

const Template: StoryFn = ({ options, value, disabled, error, required, placeholder, multiple, name }) => {
  return html`
    <fds-dropdown
      id="the-dropdown"
      data-testid="fds-dropdown"
      .options=${options}
      .value=${value}
      .disabled=${disabled}
      .required=${required}
      .error=${error}
      .multiple=${multiple}
      .placeholder=${placeholder}
      .name=${name}
      @select="${(event: FdsDropdownEvent<string>): void => console.log('@select', event.detail)}"
    ></fds-dropdown>
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

export const MultiselectionDropdown: StoryObj = {
  args: {
    multiple: true,
    name: 'dropdown-values',
  },
  render: Template,
  parameters: {
    isFormUsed: true,
    labelFor: 'the-dropdown',
    label: 'Dropdown'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const user = userEvent.setup()

    // Find elements outside the shadow DOM
    const submitButton = await canvas.getByTestId('submit-button')
    const form = await canvas.getByTestId('form')

    // Find the shadow root
    const fdsDropdownShadowRoot = await canvas.getByTestId('fds-dropdown').shadowRoot

    if (fdsDropdownShadowRoot === null) {
      throw new Error('Shadow root not found')
    }

    // Find elements inside the web component
    const dropdownButton = fdsDropdownShadowRoot.querySelector('[role="combobox"]') as HTMLElement
    const dropdonwList = fdsDropdownShadowRoot.querySelector('[role="listbox"]') as HTMLElement

    // Select multiple options
    await user.click(dropdownButton)

    await fireEvent(within(dropdonwList).getByText('Foo'), new MouseEvent('click', { bubbles: true }))
    await fireEvent(within(dropdonwList).getByText('Bar'), new MouseEvent('click', { bubbles: true }))
    await fireEvent(within(dropdonwList).getByText('Bar 2'), new MouseEvent('click', { bubbles: true }))
    await fireEvent(within(dropdonwList).getByText('Icon'), new MouseEvent('click', { bubbles: true }))
    await fireEvent(within(dropdonwList).getByText('Icon 2'), new MouseEvent('click', { bubbles: true }))

    // Catch the submit event
    form.addEventListener('submit', async (event: Event) => {
      event.preventDefault()
      const formData = new FormData(event.target as HTMLFormElement)
      await expect(formData.getAll('dropdown-values')).toEqual(['Foo', 'Bar', 'Bar 2', 'Icon', 'Icon 2'])
    })

    // Submit the form
    await userEvent.click(submitButton)
  },
}
