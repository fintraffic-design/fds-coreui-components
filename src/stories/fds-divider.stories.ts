import { html, TemplateResult } from 'lit'
import {
  FdsColorNeutral100,
  FdsColorNeutral200,
  FdsColorNeutral300,
  FdsColorNeutral400,
  FdsColorToken,
} from '@fintraffic-design/coreui-css'
import '../fds-divider'

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

type Template = (args: { color: FdsColorToken['name'] }) => TemplateResult

export const Divider: Template = ({ color }) => {
  const colorToken = colors.find(s => s.name === color)
  return html`<fds-divider .color=${colorToken}></fds-divider>`
}
