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
  placeholder: 'Placeholder',
  options: [
    { label: 'foo', value: 'foo' },
    { label: 'bar', value: 'bar' },
    { label: 'foo 2', value: 'foo 2' },
    { label: 'bar 2', value: 'bar 2' },
    { label: 'foo 3', value: 'foo 3' },
    { label: 'bar 3', value: 'bar 3' },
  ],
}

export const Disabled = Template.bind({})

Disabled.args = {
  isDisabled: true,
  placeholder: 'Placeholder',
  options: [
    { label: 'foo', value: 'foo' },
    { label: 'bar', value: 'bar' },
    { label: 'foo 2', value: 'foo 2' },
    { label: 'bar 2', value: 'bar 2' },
    { label: 'foo 3', value: 'foo 3' },
    { label: 'bar 3', value: 'bar 3' },
  ],
}

export const Error = Template.bind({})

Error.args = {
  isError: true,
  placeholder: 'Placeholder',
  options: [
    { label: 'foo', value: 'foo' },
    { label: 'bar', value: 'bar' },
    { label: 'foo 2', value: 'foo 2' },
    { label: 'bar 2', value: 'bar 2' },
    { label: 'foo 3', value: 'foo 3' },
    { label: 'bar 3', value: 'bar 3' },
  ],
}
