import { html, TemplateResult } from 'lit'
import '../fds-input'

export default {
  title: 'Input',
  args: {
    label: 'Label',
    message: 'Helper message',
    placeholder: 'Placeholder',
  },
  argTypes: {},
}

type Template = (args: { label: string; message: string; placeholder: string }) => TemplateResult

export const Input: Template = ({ label, message, placeholder }) => {
  return html`<fds-input .label=${label} .message=${message} .placeholder=${placeholder}></fds-input>`
}
