import { html, TemplateResult } from 'lit'
import { FdsIcons } from '../fds-icon'
import '../fds-icon'
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
  args: {
    icon: 'alert-circle',
    size: 'fds-size-3',
  },
  argTypes: {
    icon: {
      options: Object.keys(FdsIcons),
      control: { type: 'select' },
    },
    size: {
      options: sizes.map(size => size.name),
      control: { type: 'select' },
    },
  },
}

type Template = (args: { icon: keyof typeof FdsIcons; size: FdsSizeToken['name'] }) => TemplateResult

export const Icon: Template = ({ icon, size }) => {
  const sizeToken = sizes.find(s => s.name === size)
  return html`<fds-icon .icon=${icon} .size=${sizeToken}></fds-icon>`
}
