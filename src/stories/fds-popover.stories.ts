import { html, TemplateResult } from 'lit'

import '../fds-popover'
import { PopoverPosition } from '../fds-popover'

export default {
  title: 'Popover',
  args: {
    position: PopoverPosition.ABOVE,
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
    <div style="padding: 8px; width: fit-content; margin: 50px auto; background-color: lightgray;">
      <fds-popover .position=${position} .openOnClick=${openOnClick}>
        <div slot="content">${text}</div>
        <div style="display: flex; align-items: center; width: max-content; max-width: 300px; ">
          <fds-icon .icon="${'alert-circle'}"></fds-icon>
          <span style="padding-left: 8px;">${popoverText}</span>
        </div>
      </fds-popover>
    </div>
  `
}

export const PopoverIcon: Template = ({ popoverText }) => {
  return html`
    <div style="display: flex; justify-content: space-between; margin: 50px 150px;">
      <fds-popover .position=${PopoverPosition.ABOVE} .openOnClick=${false}>
        <div slot="content"><fds-icon .icon="${'alert-circle'}"></fds-icon></div>
        <div style="width: max-content">
          <span>${popoverText}</span>
        </div>
      </fds-popover>
      <fds-popover .position=${PopoverPosition.BELOW} .openOnClick=${false}>
        <div slot="content"><fds-icon .icon="${'alert-circle'}"></fds-icon></div>
        <div style="width: max-content">
          <span>${popoverText}</span>
        </div>
      </fds-popover>
      <fds-popover .position=${PopoverPosition.LEFT} .openOnClick=${false}>
        <div slot="content"><fds-icon .icon="${'alert-circle'}"></fds-icon></div>
        <div style="width: max-content">
          <span>${popoverText}</span>
        </div>
      </fds-popover>
      <fds-popover .position=${PopoverPosition.RIGHT} .openOnClick=${false}>
        <div slot="content"><fds-icon .icon="${'alert-circle'}"></fds-icon></div>
        <div style="width: max-content">
          <span>${popoverText}</span>
        </div>
      </fds-popover>
    </div>
  `
}
