import FdsButton, { FdsButtonVariant } from '../fds-button'
import { FdsIcons } from '../fds-icon'
import { Meta, StoryObj } from '@storybook/web-components'

export default {
  title: 'Button',
  component: 'fds-button',
  parameters: {
    componentSubtitle: 'Button element with FDS styling',
    docs: {
      description: {
        component:
          "`import '@fintraffic/fds-coreui-components/src/fds-button'`<br> \
          `import { FdsButtonVariant } from '@fintraffic/fds-coreui-components/src/fds-button'`<br><br> \
          Selector: `<fds-button>`",
      },
    },
  },
  argTypes: {
    variant: {
      options: Object.values(FdsButtonVariant),
      control: 'select',
      description:
        'Button type. <br><br> \
      `FdsButtonVariant`',
      defaultValue: { summary: FdsButtonVariant.primary },
    },
    disabled: {
      control: 'boolean',
      defaultValue: { summary: false },
      description:
        'Whether the component is disabled. <br><br> \
      `boolean`',
    },
    label: {
      control: 'text',
      description:
        'Label for the button. <br><br>\
      `string`',
    },
    icon: {
      options: [...Object.keys(FdsIcons), ''],
      control: 'select',
      description:
        'Icon displayed on the button. Accepts icon name as value. <br><br>\
      `FdsIconType`',
    },
  },
} satisfies Meta<FdsButton>

type Story = StoryObj<FdsButton>

export const Primary: Story = {
  args: {
    variant: FdsButtonVariant.primary,
    disabled: false,
    label: 'Button',
  },
}
