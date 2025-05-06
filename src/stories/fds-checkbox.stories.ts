import { Meta, StoryFn, StoryObj } from '@storybook/web-components'
import { html } from 'lit'
import '../define/fds-checkbox.js'
import { expect, userEvent, within } from '@storybook/test'
import { FdsCheckbox } from '../checkbox'

export default {
  title: 'Checkbox',
  parameters: {
    componentSubtitle: 'Checkbox element with FDS styling',
    docs: {
      description: {
        component:
          "`import '@fintraffic/fds-coreui-components/dist/define/fds-checkbox.js'` <br><br>\
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
    name: undefined,
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
    value: {
      description:
        'Value to send to server. <br><br>\
        `string`',
      control: false,
      table: {
        category: 'Properties',
        defaultValue: { summary: 'on' },
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

const Template: StoryFn = ({ label, disabled, checked, name, value }) => {
  return html`
    <fds-checkbox
      data-testid="fds-checkbox"
      .label=${label}
      .checked=${checked}
      .disabled=${disabled}
      name=${name}
      .value=${value ?? 'on'}
      @select="${(event: CustomEvent<boolean>): void => console.log('@select', event.detail)}"
    ></fds-checkbox>
  `
}

export const Checkbox = {
  render: Template,
}

export const CheckboxFormSend: StoryObj = {
  args: {
    name: 'checkbox-value',
  },
  render: Template,
  parameters: {
    isFormUsed: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const user = userEvent.setup()

    // Find elements outside the shadow DOM
    const submitButton = await canvas.getByTestId('submit-button')
    const form = await canvas.getByTestId('form')
    const fdsCheckbox = await canvas.getByTestId<FdsCheckbox>('fds-checkbox')

    const testFormSubmission = async (testFn: (formData: FormData) => Promise<void>): Promise<void> => {
      const testIsDone = new Promise<void>(async resolve => {
        form.addEventListener(
          'submit',
          async (event: Event) => {
            event.preventDefault()
            const formData = new FormData(event.target as HTMLFormElement)
            await testFn(formData)
            resolve()
          },
          { once: true }
        )
        // Submit the form
        await userEvent.click(submitButton)
      })
      await testIsDone
    }

    // Select the checkbox
    await user.click(fdsCheckbox)
    await testFormSubmission(async (formData: FormData) => {
      await expect(formData.get('checkbox-value')).toEqual('on')
    })
    // Unselect the checkbox
    await user.click(fdsCheckbox)
    await testFormSubmission(async (formData: FormData) => {
      await expect(formData.get('checkbox-value')).toEqual(null)
    })
    // Set value of the checkbox to 'testValue' and check it
    fdsCheckbox.value = 'testValue'
    await user.click(fdsCheckbox)
    await testFormSubmission(async (formData: FormData) => {
      await expect(formData.get('checkbox-value')).toEqual('testValue')
    })
  },
}
