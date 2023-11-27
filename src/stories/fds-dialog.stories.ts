import { StoryObj, StoryFn } from '@storybook/web-components'
import { useArgs } from '@storybook/client-api'
import { html } from 'lit'
import '../define/fds-action-sheet.js'
import '../define/fds-button.js'
import '../define/fds-card.js'
import { FdsCardElevation } from '../card.js'
import '../define/fds-dialog.js'

export default {
  title: 'Dialog',
  parameters: {
    componentSubtitle: 'Dialog component',
    docs: {
      description: {
        component:
          "`import '@fintraffic/fds-coreui-components/dist/define/fds-dialog.js'` <br><br>\
          Element: `<fds-dialog>`",
      },
    },
    actions: {
      handles: ['outside-modal-click'],
    },
  },
  args: {
    modal: false,
    overlay: false,
    outsideModalClick: undefined,
    slot: undefined,
  },
  argTypes: {
    modal: {
      description:
        'Whether the dialog opens as a modal. Modal does not allow interaction with background elements. <br><br>\
        `boolean`',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
      },
    },
    overlay: {
      description:
        'Whether the dialog shows an overlay. Overlay does not allow interaction with the dialog. <br><br>\
        `boolean`',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
      },
    },
    outsideModalClick: {
      description:
        'Event that is dispatched when the dialog is a modal dialog and user clicks outside of it. <br><br> \
      `CustomEvent<void>`',
      table: { category: 'Events' },
      name: '@outside-modal-click',
      control: false,
    },
    slot: {
      description: 'Default slot. Container for the dialog content.',
      table: { category: 'Slots' },
      name: '',
      control: false,
    },
  },
}

const Template: StoryFn = ({ modal, overlay }) => {
  const [args, setArgs] = useArgs()
  return html`
    <style>
      fds-action-sheet {
        padding: 32px;
      }

      h4,
      p {
        font-family: 'Public Sans';
      }
    </style>

    <div style="height: 260px;">
      <fds-dialog
        .modal=${modal}
        .overlay=${overlay}
        @outside-modal-click=${(): void => {
          console.log('@outside-modal-click')
          setArgs({ ...args, modal: false })
        }}
        style="width: 50%; min-width: 30rem; max-width: 40rem"
      >
        <fds-card .elevation="${FdsCardElevation.none}">
          <h4 slot="header-title">Modal title</h4>
          <p>Modal message</p>
          <fds-action-sheet slot="footer">
            <fds-button slot="separated" .variant=${'danger'} .label=${'Button'}></fds-button>
            <fds-button .variant=${'tertiary'} .label=${'Button'}></fds-button>
            <fds-button .variant=${'secondary'} .label=${'Button'}></fds-button>
            <fds-button .label=${'Button'}></fds-button>
          </fds-action-sheet>
        </fds-card>
      </fds-dialog>
    </div>
  `
}

export const Dialog: StoryObj = {
  render: Template,
}
