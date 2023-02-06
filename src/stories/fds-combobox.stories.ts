import { Meta, Story } from '@storybook/web-components'
import { html } from 'lit'
import '../fds-dropdown'

export default {
  title: 'Combobox',
  args: {
    placeholder: 'Options',
    options: ['foo', 'foo2', 'bar', 'bar2'],
    defaultOption: undefined,
    disabled: false,
    error: false,
  },
} as Meta

const Template: Story = ({ options, defaultOption, disabled, error, placeholder, onSelect }) => {
  return html`
    <div style="width:284px">
      <fds-combobox
        .options=${options}
        .defaultOption=${defaultOption}
        .disabled=${disabled}
        .error=${error}
        .placeholder=${placeholder}
        .onSelect=${onSelect}
      ></fds-combobox>
    </div>
  `
}

export const Combobox: Story = Template.bind({})
