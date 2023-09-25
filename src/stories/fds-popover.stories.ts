import { html } from 'lit'

import '../fds-popover'
import '../fds-button'
import '../fds-dialog'
import { FdsPopoverPosition } from '../fds-popover'
import {
  FdsTokenColorBrandWhite,
  FdsTokenColorDanger100,
  FdsTokenColorNeutral300,
} from '@fintraffic-design/coreui-css'
import { StoryObj, StoryFn } from '@storybook/web-components'

const colorOptions = {
  [FdsTokenColorBrandWhite.name]: FdsTokenColorBrandWhite,
  [FdsTokenColorDanger100.name]: FdsTokenColorDanger100,
  [FdsTokenColorNeutral300.name]: FdsTokenColorNeutral300,
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
        `FdsPopoverPosition`',
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
        defaultValue: { summary: 'FdsTokenColorBrandWhite' },
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

const Template: StoryFn = ({ position, openOnClick, popoverText, backgroundColor }) => {
  const text = openOnClick ? 'Click me' : 'Hover over me'
  return html`
    <div style="padding: 8px; width: fit-content; margin: 100px auto; background-color: lightgray;">
      ${text}
      <fds-popover
        .position=${position}
        .openOnClick="${openOnClick}"
        .backgroundColor="${colorOptions[backgroundColor]}"
        ><div style="padding: 8px;">${popoverText}</div></fds-popover
      >
    </div>
  `
}

const TemplateIconPopover: StoryFn = ({ position, openOnClick, popoverText, backgroundColor }) => {
  return html`
    <div style="margin: 100px auto; width: max-content;">
      <div>
        <fds-icon .icon="${'alert-circle'}"></fds-icon>
        <fds-popover
          .position=${position}
          .openOnClick=${openOnClick}
          .backgroundColor="${colorOptions[backgroundColor]}"
        >
          <div style="padding: 8px;">${popoverText}</div>
        </fds-popover>
      </div>
    </div>
  `
}

const TemplatePopoverWithHeader: StoryFn = ({ position, openOnClick, popoverText, backgroundColor }) => {
  return html`
    <div style="width: fit-content; margin: 150px auto;">
          <fds-button .label=${'Open/close popover'}></fds-button>
          <fds-popover .position=${position}
                       .openOnClick=${openOnClick}
                       .backgroundColor="${colorOptions[backgroundColor]}">
              <div">
                  <div
                          style="background: black; color: white; border-top-left-radius: 8px; border-top-right-radius: 8px;"
                  >
                      <div style="padding: 8px;">Title</div>
                  </div>
                  <div style="padding: 8px">
                      ${popoverText}
                  </div>
              </div>
          </fds-popover>
      </fds-popover>
    </div>
  `
}

const TemplatePopoverInDialog: StoryFn = ({ position, openOnClick, popoverText, backgroundColor }) => {
  return html`
    <fds-dialog style="top: 100px; padding: 20px">
      <div>
        <fds-button .label=${'Open/close popover'}> </fds-button>
        <fds-popover
          .position=${position}
          .openOnClick=${openOnClick}
          .backgroundColor="${colorOptions[backgroundColor]}"
          ><div style="padding: 8px">${popoverText}</div></fds-popover
        >
      </div>
    </fds-dialog>
  `
}

export const Popover: StoryObj = {
  render: Template,
}

export const IconPopover: StoryObj = {
  render: TemplateIconPopover,

  parameters: {
    docs: {
      description: {
        story: 'An example of a popover connected to an icon.',
      },
    },
  },
}

export const PopoverWithHeader: StoryObj = {
  render: TemplatePopoverWithHeader,

  parameters: {
    docs: {
      description: {
        story: 'An example of a large popover with a header.',
      },
    },
  },
}

export const PopoverInDialog: StoryObj = {
  render: TemplatePopoverInDialog,
}
