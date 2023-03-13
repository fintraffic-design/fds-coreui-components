import { html, TemplateResult } from 'lit'

import '../fds-popover'
import '../fds-button'
import { FdsPopoverPosition } from '../fds-popover'
import {
  FdsColorBrandWhite,
  FdsColorDanger100,
  FdsColorNeutral300,
  FdsColorToken,
} from '@fintraffic-design/coreui-css'

const colorOptions = {
  [FdsColorBrandWhite.name]: FdsColorBrandWhite,
  [FdsColorDanger100.name]: FdsColorDanger100,
  [FdsColorNeutral300.name]: FdsColorNeutral300,
}

export default {
  title: 'Popover',
  parameters: {
    componentSubtitle: 'Content that is displayed when the user hovers or clicks an element',
    docs: {
      description: {
        component:
          "`import '@fintraffic-design/coreui-components/src/fds-popover'` <br>\
          `import { FdsPopoverPosition } from '@fintraffic-design/coreui-components/src/fds-popover'`<br><br>\
          Selector: `<fds-popover>`",
      },
    },
  },
  args: {
    popoverText: 'Popover content',
    position: FdsPopoverPosition.above,
    openOnClick: false,
    backgroundColor: Object.keys(colorOptions)[0],
    slotDefault: undefined,
    slotPopover: undefined,
  },
  argTypes: {
    popoverText: {
      description: 'Only for Storybook presentation purposes.',
    },
    position: {
      options: Object.values(FdsPopoverPosition),
      control: { type: 'select' },
      description:
        'Direction the popover opens. <br><br>\
        `FdsPopoverPosition.above` `FdsPopoverPosition.below` `FdsPopoverPosition.left` `FdsPopoverPosition.right`',
      table: {
        category: 'Properties',
        defaultValue: { summary: `'${FdsPopoverPosition.above}'` },
      },
    },
    backgroundColor: {
      options: Object.keys(colorOptions),
      control: { type: 'select' },
      description:
        'Background color for the popover. <br><br>\
        `FdsColorToken`',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'FdsColorBrandWhite' },
      },
    },
    openOnClick: {
      description:
        'Whether the popover opens by clicking the element. <br><br>\
        `boolean`',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
      },
    },
    slotDefault: {
      description:
        'Default slot. Container for the hoverable/clickable element that is always visible and connected to the popover.',
      table: { category: 'Slots' },
      name: '',
      control: false,
    },
    slotPopover: {
      description: 'Popover slot. Container for the content in popover.',
      table: { category: 'Slots' },
      name: 'popover',
      control: false,
    },
  },
}

type Template = (args: {
  position: FdsPopoverPosition
  openOnClick: boolean
  popoverText: string
  backgroundColor: FdsColorToken['name']
}) => TemplateResult

export const Popover: Template = ({ position, openOnClick, popoverText, backgroundColor }) => {
  const text = openOnClick ? 'Click me' : 'Hover over me'
  return html`
    <div style="padding: 8px; width: fit-content; margin: 100px auto; background-color: lightgray;">
      <fds-popover
        .position=${position}
        .openOnClick=${openOnClick}
        .backgroundColor="${colorOptions[backgroundColor]}"
      >
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

export const IconPopover: Template = ({ position, openOnClick, popoverText, backgroundColor }) => {
  return html`
    <div style="margin: 100px auto; width: max-content;">
      <div>
        <fds-popover
          .position=${position}
          .openOnClick=${openOnClick}
          .backgroundColor="${colorOptions[backgroundColor]}"
        >
          <div><fds-icon .icon="${'alert-circle'}"></fds-icon></div>
          <div slot="popover" style="width: max-content; padding: 8px; max-width: 200px; text-align: center;">
            ${popoverText}
          </div>
        </fds-popover>
      </div>
    </div>
  `
}

IconPopover.parameters = {
  docs: {
    description: {
      story: 'An example of a popover connected to an icon.',
    },
  },
}

export const PopoverWithHeader: Template = ({ position, openOnClick, popoverText, backgroundColor }) => {
  return html`
    <div style="width: fit-content; margin: 150px auto;">
      <fds-popover
        .position=${position}
        .openOnClick=${openOnClick}
        .backgroundColor="${colorOptions[backgroundColor]}"
      >
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

PopoverWithHeader.parameters = {
  docs: {
    description: {
      story: 'An example of a large popover with a header.',
    },
  },
}
