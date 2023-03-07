import { html, TemplateResult } from 'lit'
import { FdsButtonVariant } from '../fds-button'
import '../fds-button'
import '../fds-icon'
import { FdsIconType } from '../fds-icon'

export default {
  title: 'Button',
  parameters: {
    componentSubtitle: 'Button element with styling',
    docs: {
      description: {
        component:
          "`import '@fintraffic-design/coreui-components/src/fds-button'` <br> <br>\
          Selector: `<fds-button>`",
      },
    },
    actions: {
      handles: ['click'],
    },
  },
  args: {
    variant: FdsButtonVariant.primary,
    disabled: false,
    icon: null,
    label: 'Button',
    slot: undefined,
  },
  argTypes: {
    variant: {
      options: Object.keys(FdsButtonVariant),
      control: { type: 'select' },
      description:
        'Button type. <br><br> \
      `FdsButtonVariant.primary` `FdsButtonVariant.secondary` `FdsButtonVariant.tertiary` `FdsButtonVariant.danger`',
      defaultValue: { summary: FdsButtonVariant.primary },
      table: {
        category: 'Properties',
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description:
        'Whether the component is disabled. <br><br> \
      `boolean`',
      defaultValue: { summary: false },
      table: {
        category: 'Properties',
      },
    },
    icon: {
      options: ['alert-circle', 'x', undefined],
      control: { type: 'select' },
      description:
        'Icon displayed on the button. Accepts icon name as value. <br><br>\
    value of `FdsIconType`',
      defaultValue: { summary: 'undefined' },
      table: {
        category: 'Properties',
      },
    },
    label: {
      description:
        'Label for the button. <br><br>\
      `string`',
      defaultValue: { summary: 'undefined' },
      table: {
        category: 'Properties',
      },
    },
    slot: {
      description: 'No slots',
      table: { category: 'Slots' },
      name: '',
      control: false,
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
