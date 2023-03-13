import { html } from 'lit'
import { FdsIcons } from '../fds-icon'
import '../fds-icon'
import '../global-types'
import {
  FdsSize1,
  FdsSize12,
  FdsSize16,
  FdsSize2,
  FdsSize24,
  FdsSize3,
  FdsSize32,
  FdsSize4,
  FdsSize6,
  FdsSize8,
  FdsSizeToken,
} from '@fintraffic-design/coreui-css'
import { Story } from '@storybook/web-components'

const sizes = [
  FdsSize1,
  FdsSize2,
  FdsSize3,
  FdsSize4,
  FdsSize6,
  FdsSize8,
  FdsSize12,
  FdsSize16,
  FdsSize24,
  FdsSize32,
]

export default {
  title: 'Icon',
  parameters: {
    componentSubtitle: 'Icon component. Supports a pre-defined set of icons from Lucide',
    docs: {
      description: {
        component:
          "`import '@fintraffic-design/coreui-components/src/fds-icon'` <br>\
          `import { FdsIconType, FdsIcons } from '@fintraffic-design/coreui-components/src/fds-icon'`<br><br>\
          Selector: `<fds-icon>`",
      },
    },
    actions: {
      handles: ['click'],
    },
  },
  args: {
    icon: 'alert-circle',
    size: 'fds-size-3',
    slot: undefined,
  },
  argTypes: {
    icon: {
      options: Object.keys(FdsIcons),
      control: { type: 'select' },
      description:
        'Icon name. <br><br>\
        `FdsIconType`',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'undefined' },
      },
    },
    size: {
      options: sizes.map(size => size.name),
      control: { type: 'select' },
      description:
        'Icon size. <br><br>\
        `FdsSizeToken`',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'FdsSize3' },
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

export const Icon: Story = ({ icon, size }) => {
  const sizeToken = sizes.find(s => s.name === size) as FdsSizeToken
  return html`<fds-icon .icon=${icon} .size=${sizeToken}></fds-icon>`
}
