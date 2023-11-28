import { html } from 'lit'
import {
  FdsSizeToken,
  FdsTokenSize1,
  FdsTokenSize12,
  FdsTokenSize16,
  FdsTokenSize2,
  FdsTokenSize24,
  FdsTokenSize3,
  FdsTokenSize32,
  FdsTokenSize4,
  FdsTokenSize6,
  FdsTokenSize8,
} from '@fintraffic/fds-coreui-css'
import { StoryObj } from '@storybook/web-components'
import { FdsIcons } from '../icon.js'
import '../define/fds-icon.js'

const sizes = [
  FdsTokenSize1,
  FdsTokenSize2,
  FdsTokenSize3,
  FdsTokenSize4,
  FdsTokenSize6,
  FdsTokenSize8,
  FdsTokenSize12,
  FdsTokenSize16,
  FdsTokenSize24,
  FdsTokenSize32,
]

export default {
  title: 'Icon',
  parameters: {
    componentSubtitle: 'Icon component. Supports a pre-defined set of icons from Lucide',
    docs: {
      description: {
        component:
          "`import '@fintraffic/fds-coreui-components/dist/define/fds-icon.js'` <br>\
          `import { FdsIconType, FdsIcons } from '@fintraffic/fds-coreui-components'`<br><br>\
          Element: `<fds-icon>`",
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
        defaultValue: { summary: 'FdsTokenSize3' },
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

export const Icon: StoryObj = {
  render: ({ icon, size }) => {
    const sizeToken = sizes.find(s => s.name === size) as FdsSizeToken
    return html`<fds-icon .icon=${icon} .size=${sizeToken}></fds-icon>`
  },
}
