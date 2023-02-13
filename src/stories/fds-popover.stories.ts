import { html, TemplateResult } from 'lit'

import '../fds-popover'
import { PopoverPosition } from '../fds-popover'

export default {
  title: 'Popover',
  args: {
    position: PopoverPosition.BELOW,
    openOnClick: false,
    popoverText: 'Popover content',
  },
  argTypes: {
    position: {
      options: Object.values(PopoverPosition),
      control: { type: 'select' },
    },
  },
}

type Template = (args: {
  position: PopoverPosition
  openOnClick: boolean
  popoverText: string
}) => TemplateResult

export const Popover: Template = ({ position, openOnClick, popoverText }) => {
  const text = openOnClick ? 'Click me' : 'Hover over me'
  return html`
    <div style="padding: 16px; width: fit-content; margin: 50px 50px; background-color: lightgray;">
      <fds-popover .position=${position} .openOnClick=${openOnClick}>
        <div slot="content">${text}</div>
        <div style="display: flex; align-items: center; width: 150px;">
          <fds-icon .icon="${'alert-triangle'}"></fds-icon>
          <span style="padding-left: 8px;">${popoverText}</span>
        </div>
      </fds-popover>
    </div>
  `
}
