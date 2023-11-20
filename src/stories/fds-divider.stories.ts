import { html } from 'lit'
import {
  FdsTokenColorNeutral100,
  FdsTokenColorNeutral200,
  FdsTokenColorNeutral300,
  FdsTokenColorNeutral400,
} from '@fintraffic/fds-coreui-css'
import '../fds-divider'
import { StoryObj, StoryFn } from '@storybook/web-components'

const colors = [
  FdsTokenColorNeutral100,
  FdsTokenColorNeutral200,
  FdsTokenColorNeutral300,
  FdsTokenColorNeutral400,
]

export default {
  title: 'Divider',
  parameters: {
    componentSubtitle: 'Separator between elements or content areas',
    docs: {
      description: {
        component:
          "`import '@fintraffic/fds-coreui-components/src/fds-divider'` <br><br>\
          Selector: `<fds-divider>`",
      },
    },
  },
  args: {
    color: FdsTokenColorNeutral200.name,
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
        defaultValue: { summary: 'FdsTokenColorNeutral200' },
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
