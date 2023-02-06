import { Meta, Story } from '@storybook/web-components'
import { html } from 'lit'
import '../fds-checkbox'

export default {
  title: 'Checkbox',
} as Meta

const Checkbox: Story = ({ label, disabled, defaultValue, onSelect }) => {
  return html`
    <div>
      <fds-checkbox
        .label=${label}
        .defaultValue=${defaultValue}
        .disabled=${disabled}
        .onSelect=${onSelect}
      ></fds-checkbox>
    </div>
  `
}

export const Primary: Story = Checkbox.bind({})

Primary.args = {
  label: 'Label',
}

export const CheckedByDefault: Story = Checkbox.bind({})

CheckedByDefault.args = {
  label: 'Label',
  defaultValue: true,
}

export const Disabled: Story = Checkbox.bind({})

Disabled.args = {
  disabled: true,
  label: 'Label',
}

export const DisabledChecked: Story = Checkbox.bind({})

DisabledChecked.args = {
  disabled: true,
  label: 'Label',
  defaultValue: true,
}
