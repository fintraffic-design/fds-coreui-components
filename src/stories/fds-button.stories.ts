import { html, TemplateResult } from 'lit'
import { FdsButtonVariant } from '../fds-button'
import '../fds-button'
import '../fds-icon'
import { FdsIconType } from '../fds-icon'

export default {
  title: 'Button',
  args: {
    variant: FdsButtonVariant.primary,
    disabled: false,
    icon: null,
    label: 'Button',
  },
  argTypes: {
    variant: {
      options: Object.keys(FdsButtonVariant),
      control: { type: 'select' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    icon: {
      options: ['alert-circle', 'x', undefined],
      control: { type: 'select' },
    },
  },
}

type Template = (args: {
  variant: FdsButtonVariant
  disabled: boolean
  icon?: FdsIconType
  label?: string
}) => TemplateResult

export const Button: Template = ({ variant, disabled, icon, label }) => {
  return html`<fds-button
    .variant=${variant}
    .disabled=${disabled}
    .icon="${icon}"
    .label="${label}"
  ></fds-button>`
}
