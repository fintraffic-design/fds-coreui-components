import { html, TemplateResult } from 'lit'
import '../fds-checkbox'

type Template = (args: {
  label: string
  disabled: boolean
  checked: boolean
  onSelect: (value: boolean) => void
}) => TemplateResult

export const Checkbox: Template = ({ label, disabled, checked }) => {
  return html`
    <fds-checkbox
      .label=${label}
      .checked=${checked}
      .disabled=${disabled}
      @select="${(event: CustomEvent<boolean>): void => console.log('@select', event.detail)}"
    ></fds-checkbox>
  `
}

export default {
  title: 'Checkbox',
  args: {
    label: 'Label',
    disabled: false,
    checked: false,
  },
}
