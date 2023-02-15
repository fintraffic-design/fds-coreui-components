import { html, TemplateResult } from 'lit'

import '../fds-popover'
import '../fds-button'
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
    <div style="padding: 8px; width: fit-content; margin: 100px auto; background-color: lightgray;">
      <fds-popover .position=${position} .openOnClick=${openOnClick}>
        <div slot="content">${text}</div>
        <div
          style="display: flex; align-items: center; width: max-content; max-width: 300px; padding: 32px 16px;"
        >
          <fds-icon .icon="${'alert-circle'}"></fds-icon>
          <span style="padding-left: 8px;">${popoverText}</span>
        </div>
      </fds-popover>
    </div>
  `
}

export const IconPopover: Template = ({ popoverText }) => {
  return html`
    <div style="display: flex; justify-content: space-between; margin: 50px 150px; text-align: center;">
      <div>
        <fds-popover .position=${PopoverPosition.ABOVE} .openOnClick=${false}>
          <div slot="content"><fds-icon .icon="${'alert-circle'}"></fds-icon></div>
          <div style="width: max-content; padding: 8px;">${popoverText}</div>
        </fds-popover>
        Above
      </div>
      <div>
        <fds-popover .position=${PopoverPosition.BELOW} .openOnClick=${false}>
          <div slot="content"><fds-icon .icon="${'alert-circle'}"></fds-icon></div>
          <div style="width: max-content; padding: 8px;">${popoverText}</div>
        </fds-popover>
        Below
      </div>
      <div>
        <fds-popover .position=${PopoverPosition.LEFT} .openOnClick=${false}>
          <div slot="content"><fds-icon .icon="${'alert-circle'}"></fds-icon></div>
          <div style="width: max-content; padding: 8px;">${popoverText}</div>
        </fds-popover>
        Left
      </div>
      <div>
        <fds-popover .position=${PopoverPosition.RIGHT} .openOnClick=${false}>
          <div slot="content"><fds-icon .icon="${'alert-circle'}"></fds-icon></div>
          <div style="width: max-content; padding: 8px;">${popoverText}</div>
        </fds-popover>
        Right
      </div>
    </div>
  `
}

export const PopoverWithHeader: Template = ({ popoverText }) => {
  return html`
    <div style="width: fit-content; margin: 150px auto;">
      <fds-popover .position=${PopoverPosition.LEFT} .openOnClick=${true}>
        <div slot="content"><fds-button .label=${'Open/close popover'}></fds-button></div>
        <div style="width: 300px; height: 150px; display: flex; flex-direction: column;">
          <div
            class="header"
            style="background: black; color: white; border-top-left-radius: 8px; border-top-right-radius: 8px;"
          >
            <div style="padding: 16px;">Title</div>
          </div>
          <div style="display: flex; justify-content: center; height: 100%; align-items: center;">
            ${popoverText}
          </div>
        </div>
      </fds-popover>
    </div>
  `
}
