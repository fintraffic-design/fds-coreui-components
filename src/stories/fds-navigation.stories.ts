import { StoryObj, StoryFn } from '@storybook/web-components'
import { html } from 'lit'
import '../define/fds-navigation.js'
import { FdsNavigationItem, FdsNavigationVariant, FdsNavigationItemPosition } from '../navigation.js'

const items: FdsNavigationItem[] = [
  { label: 'Areatool', value: 'home' },
  { label: 'History', value: 'history' },
  { label: 'Settings', value: 'settings', position: FdsNavigationItemPosition.right, icon: 'settings' },
]

export default {
  title: 'Navigation',
  parameters: {
    componentSubtitle: 'Primary and secondary navigation headers',
    docs: {
      description: {
        component:
          "`import '@fintraffic/fds-coreui-components/dist/define/fds-navigation'`<br>\
          `import { FdsNavigationItem, FdsNavigationItemPosition, FdsNavigationVariant } from '@fintraffic/fds-coreui-components'`<br><br>\
          Element: `<fds-navigation>`",
      },
    },
    actions: {
      handles: ['click'],
    },
  },
  args: {
    variant: FdsNavigationVariant.primary,
    items: items,
    selected: items[0],
    select: undefined,
    verticalMenuNavText: 'Menu',
    slot: true,
  },
  argTypes: {
    variant: {
      options: Object.keys(FdsNavigationVariant),
      control: { type: 'select' },
      description:
        'Type of navigation header. <br><br>\
        `FdsNavigationVariant`',
      table: {
        category: 'Properties',
        defaultValue: { summary: `'${FdsNavigationVariant.primary}'` },
      },
    },
    items: {
      description:
        'List of destinations for the navigation header. In addition to label and value, an item can have an optional icon and its position can be set to be left (default) or right.  <br><br>\
        `FdsNavigationItem[]`',
      table: {
        category: 'Properties',
        defaultValue: { summary: '[]' },
      },
    },
    selected: {
      description:
        'Selected destination. <br><br>\
        `FdsNavigationItem`',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'undefined' },
      },
    },
    verticalMenuNavText: {
      description:
        'Text for the vertical menu navigation button. <br><br>\
        `string`',
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
      },
    },
    'vertical-menu-threshold': {
      description:
        'Width of this navigation element in pixels in which the navigation header is rendered as a vertical menu header. The value should be given as an attribute and it cannot be changed later. <br><br>\
        `number`',
      table: {
        category: 'Attributes',
        defaultValue: { summary: '768' },
      },
    },
    select: {
      description:
        "Event that is dispatched when a destination is clicked. The value is in the event's details field. <br><br> \
      `CustomEvent<FdsNavigationItem>`",
      table: { category: 'Events' },
      name: '@select',
      control: false,
    },
    slot: {
      description: 'Default slot. Container for navigation header, e.g. a logo.',
      table: { category: 'Slots' },
      name: '',
    },
  },
}

const Template: StoryFn = ({ variant, slot, verticalMenuNavText }) => {
  const headerEl = slot ? html`<div style="display: flex; align-items: center;">Header</div>` : null
  return html`<div style="height: 300px;">
    <fds-navigation
      .variant=${variant}
      .items=${items}
      .selected=${items[0]}
      .verticalMenuNavText=${verticalMenuNavText}
      @select="${(event: CustomEvent<FdsNavigationItem>): void => console.log('@select', event.detail)}"
    >
      ${headerEl}
    </fds-navigation>
  </div>`
}

export const Navigation: StoryObj = {
  render: Template,
}
