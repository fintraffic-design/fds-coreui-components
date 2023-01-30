import { html } from 'lit'
import '../fds-dropdown'

export default {
  title: 'Dropdown',
}

const Template = ({ options, defaultOption, isDisabled, isError, placeholder, onSelect }) =>
  html`
    <fds-dropdown
      .options=${options}
      .defaultOption=${defaultOption}
      .isDisabled=${isDisabled}
      .isError=${isError}
      .placeholder=${placeholder}
      .onSelect=${onSelect}
    ></fds-dropdown>
  `

export const Default = Template.bind({})

Default.args = {
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

export const Disabled = Template.bind({})

Disabled.args = {
  isDisabled: true,
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

export const Error = Template.bind({})

Error.args = {
  isError: true,
  placeholder: 'Options',
  options: [
    { label: 'Foo', value: 'Foo' },
    { label: 'Bar', value: 'Bar' },
    { label: 'foo 2', value: 'foo 2' },
    { label: 'Bar 2', value: 'Bar 2' },
    { label: 'Icon', value: 'Icon', icon: 'alert-triangle' },
    { label: 'Icon 2', value: 'Icon 2', icon: 'alert-circle' },
  ],
}
