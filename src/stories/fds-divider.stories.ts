import { html, TemplateResult } from 'lit'
import {
  FdsColorNeutral100,
  FdsColorNeutral200,
  FdsColorNeutral300,
  FdsColorNeutral400,
  FdsColorToken,
} from '@fintraffic-design/coreui-css'
import './../global-types'

const colors = [FdsColorNeutral100, FdsColorNeutral200, FdsColorNeutral300, FdsColorNeutral400]

export default {
  title: 'Divider',
  args: {
    color: FdsColorNeutral200.name,
  },
  argTypes: {
    color: {
      options: colors.map(color => color.name),
      control: { type: 'select' },
    },
  },
}

type Template = (args: { color: FdsColorToken['name'] }) => TemplateResult

export const Divider: Template = ({ color }) => {
  const colorToken = colors.find(s => s.name === color)
  return html`<fds-divider .color=${colorToken}></fds-divider>`
}
