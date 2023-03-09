import { html, TemplateResult } from 'lit'
import { FdsButtonVariant } from '../fds-button'
import '../fds-button'
import '../fds-icon'
import { FdsIconType } from '../fds-icon'

export default {
  title: 'Button',
  parameters: {
    componentSubtitle: 'Button element with FDS styling',
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
      table: {
        category: 'Properties',
        defaultValue: { summary: `'${FdsButtonVariant.primary}'` },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description:
        'Whether the component is disabled. <br><br> \
      `boolean`',
      table: {
        category: 'Properties',
        defaultValue: { summary: false },
      },
    },
    icon: {
      options: ['alert-circle', 'x', undefined],
      control: { type: 'select' },
      description:
        'Icon displayed on the button. Accepts icon name as value. <br><br>\
    value of `FdsIconType`',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'undefined' },
      },
    },
    label: {
      description:
        'Label for the button. <br><br>\
      `string`',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'undefined' },
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
