import { Meta, Story } from '@storybook/web-components'
import { html } from 'lit'
import '../fds-dropdown'

export default {
  title: 'Dropdown',
} as Meta

const Dropdown: Story = ({ options, defaultOption, disabled, error, placeholder, onSelect }) => {
  return html`
    <div style="width:284px">
      <fds-dropdown
        .options=${options}
        .defaultOption=${defaultOption}
        .disabled=${disabled}
        .error=${error}
        .placeholder=${placeholder}
        .onSelect=${onSelect}
      ></fds-dropdown>
    </div>
  `
}

export const Primary: Story = Dropdown.bind({})

Primary.args = {
  placeholder: 'Options',
  options: [
    { label: 'Foo', value: 'Foo' },
    { label: 'Bar', value: 'Bar' },
    { label: 'Foo 2', value: 'Foo 2' },
    { label: 'Bar 2', value: 'Bar 2' },
    { label: 'Icon', value: 'Icon', icon: 'alert-triangle' },
    { label: 'Icon 2', value: 'Icon 2', icon: 'alert-circle' },
  ],
}

export const Disabled: Story = Dropdown.bind({})

Disabled.args = {
  disabled: true,
  placeholder: 'Options',
  options: [
    { label: 'Foo', value: 'Foo' },
    { label: 'Bar', value: 'Bar' },
    { label: 'Foo 2', value: 'Foo 2' },
    { label: 'Bar 2', value: 'Bar 2' },
    { label: 'Alert', value: 'Alert', icon: 'alert-triangle' },
    { label: 'Alert 2', value: 'Alert 2', icon: 'alert-circle' },
  ],
}

export const Error: Story = Dropdown.bind({})

Error.args = {
  error: true,
  placeholder: 'Options',
  options: [
    { label: 'Foo', value: 'Foo' },
    { label: 'Bar', value: 'Bar' },
    { label: 'foo 2', value: 'foo 2' },
    { label: 'Bar 2', value: 'Bar 2' },
    { label: 'Alert 1', value: 'Alert 1', icon: 'alert-triangle' },
    { label: 'Alert 2', value: 'Alert 2', icon: 'alert-circle' },
  ],
}

export const LongText: Story = Dropdown.bind({})

LongText.args = {
  placeholder: 'Options',
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
