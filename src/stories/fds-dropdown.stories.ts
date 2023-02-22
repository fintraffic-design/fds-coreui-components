import { Meta, Story } from '@storybook/web-components'
import { html } from 'lit'
import '../fds-dropdown'

export default {
  title: 'Dropdown',
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
  },
  parameters: {
    actions: {
      handles: ['select'],
    },
  },
} as Meta

const Template: Story = ({ options, value, disabled, error, placeholder }) => {
  return html`
    <div style="width:284px">
      <fds-dropdown
        .options=${options}
        .value=${value}
        .disabled=${disabled}
        .error=${error}
        .placeholder=${placeholder}
      ></fds-dropdown>
    </div>
  `
}

export const Dropdown: Story = Template.bind({})

export const LongText: Story = Template.bind({})

LongText.args = {
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
}
