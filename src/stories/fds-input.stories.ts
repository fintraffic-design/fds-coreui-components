import { html, TemplateResult } from 'lit'
import '../fds-input'

export default {
  title: 'Input',
  args: {
    label: 'Label',
    value: '',
    message: 'Helper message',
    placeholder: 'Placeholder',
    invalid: false,
    disabled: false,
  },
  parameters: {
    actions: {
      handles: ['change'],
    },
  },
}

type Template = (args: {
  label: string
  value: string
  message: string
  placeholder: string
  invalid: boolean
  disabled: boolean
}) => TemplateResult

export const Input: Template = ({ label, value, message, placeholder, invalid, disabled }) => {
  return html`<fds-input
    .label=${label}
    .message=${message}
    .placeholder=${placeholder}
    .invalid=${invalid}
    .disabled=${disabled}
    .value=${value}
    @change="${(event: CustomEvent<string>): void => console.log('@change', event.detail)}"
  ></fds-input>`
}
