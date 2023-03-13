import { Story } from '@storybook/web-components'
import { html } from 'lit'
import '../fds-card'
import { FdsCardElevation } from '../fds-card'

export default {
  title: 'Card',
  parameters: {
    componentSubtitle: 'Container for displaying short information with optional controls',
    docs: {
      description: {
        component:
          "`import '@fintraffic-design/coreui-components/src/fds-card'` <br> \
          `import { FdsCardElevation } from '@fintraffic-design/coreui-components/src/fds-card'` <br><br>\
          Selector: `<fds-card>`",
      },
    },
  },
  args: {
    elevation: FdsCardElevation.low,
    cornerClick: undefined,
    slotDefault: 'Content',
    slotHeaderTitle: 'Title',
    slotCorner: true,
    slotFooter: true,
    slotHeader: undefined,
  },
  argTypes: {
    elevation: {
      options: Object.values(FdsCardElevation),
      control: { type: 'select' },
      description:
        'Depth of box shadow. <br><br>\
        `FdsCardElevation.none` `FdsCardElevation.low` `FdsCardElevation.high`',
      table: {
        category: 'Properties',
        defaultValue: { summary: `'${FdsCardElevation.low}'` },
      },
    },
    cornerClick: {
      description:
        'Event that is dispatched when action corner is clicked. Returns no value. <br><br> \
      `CustomEvent<void>`',
      table: { category: 'Events' },
      name: '@corner-click',
      control: false,
    },
    slotDefault: {
      description: 'Default slot. Container for card content.',
      table: { category: 'Slots' },
      name: '',
    },
    slotHeaderTitle: {
      description: 'Title slot. A title within the header.',
      table: { category: 'Slots' },
      name: 'header-title',
    },
    slotCorner: {
      description: 'Action corner slot. Positioned on the top right corner of the card within the header.',
      table: { category: 'Slots' },
      name: 'header-corner',
      control: { type: 'boolean' },
    },
    slotFooter: {
      description: 'Footer slot. Container that covers the bottom of the card.',
      table: { category: 'Slots' },
      name: 'footer',
      control: { type: 'boolean' },
    },
    slotHeader: {
      description:
        'Header slot. Covers the top of the card and replaces header title and action corner slots. Use this slot if you want to create your own custom header, otherwise leave it out from your template.',
      table: { category: 'Slots' },
      name: 'header',
      control: false,
    },
  },
}

const Template: Story = ({ elevation, slotHeaderTitle, slotCorner, slotDefault, slotFooter }) => {
  const footerEl = slotFooter
    ? html`
        <footer slot="footer">
          <fds-divider></fds-divider>
          <fds-action-sheet>
            <fds-button slot="separated" variant="danger" label="Button"></fds-button>
            <fds-button variant="tertiary" label="Button"></fds-button>
            <fds-button variant="secondary" label="Button"></fds-button>
            <fds-button label="Button"></fds-button>
          </fds-action-sheet>
        </footer>
      `
    : null

  const cornerEl = slotCorner
    ? html`<fds-icon slot="header-corner" .icon=${'chevron-right'}></fds-icon>`
    : null

  return html`
    <style>
      fds-card {
        cursor: pointer;
        max-width: 800px;
        min-width: 400px;
        width: 40%;
      }

      fds-action-sheet {
        padding: 16px;
      }

      .content,
      footer {
        font-family: 'Public Sans';
      }

      .content {
        display: flex;
        align-content: center;
        justify-content: center;
      }

      footer {
        background-color: rgba(205, 205, 215, 0.2);
      }
    </style>

    <fds-card
      .elevation=${elevation}
      @corner-click=${(): void => console.log('clicked corner')}
      @click=${(): void => console.log('clicked card')}
    >
      <div slot="header-title">${slotHeaderTitle}</div>
      ${cornerEl}
      <div class="content">${slotDefault}</div>
      ${footerEl}
    </fds-card>
  `
}

const TemplateCardWithCustomHeader: Story = ({ elevation, slotDefault, slotFooter }) => {
  const footerEl = slotFooter
    ? html`
        <footer slot="footer">
          <fds-divider></fds-divider>
          <fds-action-sheet>
            <fds-button slot="separated" variant="danger" label="Button"></fds-button>
            <fds-button variant="tertiary" label="Button"></fds-button>
            <fds-button variant="secondary" label="Button"></fds-button>
            <fds-button label="Button"></fds-button>
          </fds-action-sheet>
        </footer>
      `
    : null

  return html`
    <style>
      fds-card {
        cursor: pointer;
        width: 40%;
        min-width: 400px;
        max-width: 800px;
      }

      fds-action-sheet {
        padding: 16px;
      }

      .content,
      .custom-header,
      footer {
        font-family: 'Public Sans';
      }

      .content {
        display: flex;
        align-content: center;
        justify-content: center;
      }

      footer {
        background-color: rgba(205, 205, 215, 0.2);
      }

      .custom-header {
        background-color: black;
        color: white;
        padding: 8px;
      }
    </style>

    <fds-card .elevation=${elevation} @click=${(): void => console.log('clicked card')}>
      <div slot="header" class="custom-header">Customized header</div>
      <div class="content">${slotDefault}</div>
      ${footerEl}
    </fds-card>
  `
}

export const Card: Story = Template.bind({})

export const CardWithCustomHeader: Story = TemplateCardWithCustomHeader.bind({})

CardWithCustomHeader.parameters = {
  docs: {
    description: {
      story: 'An example of a card with customized header.',
    },
  },
}
