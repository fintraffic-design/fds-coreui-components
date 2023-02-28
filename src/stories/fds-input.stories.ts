import { html, TemplateResult } from 'lit'
import '../fds-input'

export default {
  title: 'Input',
  args: {
    label: 'Label',
    message: 'Helper message',
  },
  argTypes: {},
}

type Template = (args: { label: string; message: string }) => TemplateResult

export const Input: Template = ({ label, message }) => {
  return html`<fds-input .label=${label} .message=${message}></fds-input>`
}
