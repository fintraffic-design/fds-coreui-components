import { StoryObj, Meta, StoryFn } from '@storybook/web-components'
import { html } from 'lit'
import '../fds-icon'
import '../global-types'

export default {
  title: 'Action Sheet',
  parameters: {
    componentSubtitle:
      'Container for displaying actions in horizontal direction when enough space is available and vertical direction when space is limited.',
    docs: {
      description: {
        component:
          "`import '@fintraffic-design/coreui-components/src/fds-action-sheet'` <br><br>\
          Selector: `<fds-action-sheet>`",
      },
    },
  },
  args: {
    slotDefault: undefined,
    slotSeparated: undefined,
  },
  argTypes: {
    slotDefault: {
      name: '',
      table: { category: 'Slots' },
      description:
        'Default slot. Contents are positioned on the end (horizontal) or top (vertical) of the component.',
      control: false,
    },
    slotSeparated: {
      name: 'separated',
      table: { category: 'Slots' },
      description:
        'Separated slot. Contents are positioned on the beginning (horizontal) or bottom (vertical) of the component, separated from the content in default slot.',
      control: false,
    },
  },
} as Meta

const Template: StoryFn = () => {
  return html`<fds-action-sheet style="max-width: 800px">
    <fds-button slot="separated" icon="x" variant="danger" label="Danger"></fds-button>
    <fds-button variant="tertiary" icon="alert-circle"></fds-button>
    <fds-button variant="tertiary" label="Tertiary"></fds-button>
    <fds-button variant="secondary" label="Secondary"></fds-button>
    <fds-button label="Primary"></fds-button>
  </fds-action-sheet>`
}

export const ActionSheet: StoryObj = {
  render: Template,
}
