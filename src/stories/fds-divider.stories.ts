import { html } from 'lit'
import {
  FdsColorNeutral100,
  FdsColorNeutral200,
  FdsColorNeutral300,
  FdsColorNeutral400,
} from '@fintraffic-design/coreui-css'
import '../fds-divider'
import { StoryObj, StoryFn } from '@storybook/web-components'

const colors = [FdsColorNeutral100, FdsColorNeutral200, FdsColorNeutral300, FdsColorNeutral400]

export default {
  title: 'Divider',
  parameters: {
    componentSubtitle: 'Separator between elements or content areas',
    docs: {
      description: {
        component:
          "`import '@fintraffic-design/coreui-components/src/fds-divider'` <br><br>\
          Selector: `<fds-divider>`",
      },
    },
  },
  args: {
    color: FdsColorNeutral200.name,
    slot: undefined,
  },
  argTypes: {
    color: {
      options: colors.map(color => color.name),
      control: { type: 'select' },
      description:
        'Color of the divider. <br><br> \
        `FdsColorToken`',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'FdsColorNeutral200' },
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

const Template: StoryFn = ({ color }) => {
  const colorToken = colors.find(s => s.name === color)
  return html`<fds-divider .color=${colorToken}></fds-divider>`
}

export const Divider: StoryObj = {
  render: Template,
}
