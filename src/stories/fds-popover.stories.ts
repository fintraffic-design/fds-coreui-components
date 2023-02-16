import { html, TemplateResult } from 'lit'

import '../fds-popover'
import '../fds-button'
import { FdsPopoverPosition } from '../fds-popover'

export default {
  title: 'Popover',
  args: {
    position: FdsPopoverPosition.ABOVE,
    openOnClick: false,
    popoverText: 'Popover content',
  },
  argTypes: {
    position: {
      options: Object.values(FdsPopoverPosition),
      control: { type: 'select' },
    },
  },
}

type Template = (args: {
  position: FdsPopoverPosition
  openOnClick: boolean
  popoverText: string
}) => TemplateResult

export const Popover: Template = ({ position, openOnClick, popoverText }) => {
  const text = openOnClick ? 'Click me' : 'Hover over me'
  return html`
    <div style="padding: 8px; width: fit-content; margin: 100px auto; background-color: lightgray;">
      <fds-popover .position=${position} .openOnClick=${openOnClick}>
        <div>${text}</div>
        <div
          slot="popover"
          style="display: flex; align-items: center; width: max-content; max-width: 300px; padding: 16px;"
        >
          <fds-icon .icon="${'alert-circle'}"></fds-icon>
          <span style="padding-left: 8px;">${popoverText}</span>
        </div>
      </fds-popover>
    </div>
  `
}

export const IconPopover: Template = ({ position, openOnClick, popoverText }) => {
  return html`
    <div style="margin: 100px auto; width: max-content;">
      <div>
        <fds-popover .position=${position} .openOnClick=${openOnClick}>
          <div><fds-icon .icon="${'alert-circle'}"></fds-icon></div>
          <div slot="popover" style="width: max-content; padding: 8px; max-width: 200px; text-align: center;">
            ${popoverText}
          </div>
        </fds-popover>
      </div>
    </div>
  `
}

export const PopoverWithHeader: Template = ({ position, openOnClick, popoverText }) => {
  return html`
    <div style="width: fit-content; margin: 150px auto;">
      <fds-popover .position=${position} .openOnClick=${openOnClick}>
        <div>
          <fds-button .label=${'Open/close popover'}></fds-button>
        </div>
        <div slot="popover" style="width: 300px; height: 150px; display: flex; flex-direction: column;">
          <div
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
