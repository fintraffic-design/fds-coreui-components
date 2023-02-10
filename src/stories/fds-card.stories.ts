import { html, TemplateResult } from 'lit'
import '../fds-card'
import { FdsCardElevation } from '../fds-card'

export default {
  title: 'Card',
  args: {
    elevation: FdsCardElevation.LOW,
    headerTitle: 'Title',
    content: 'Content',
    footer: true,
  },
  argTypes: {
    elevation: {
      options: Object.values(FdsCardElevation),
      control: { type: 'select' },
    },
    footer: {
      control: { type: 'boolean' },
    },
  },
}

type Template = (args: {
  elevation: FdsCardElevation
  headerTitle: string
  headerCorner: string
  content: string
  footer: boolean
}) => TemplateResult

export const Card: Template = ({ elevation, headerTitle, content, footer }) => {
  const footerEl = footer
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
      .onCornerClick=${(): void => console.log('clicked corner')}
      @click=${(): void => console.log('clicked card')}
    >
      <div slot="header-title">${headerTitle}</div>
      <fds-icon slot="header-corner" .icon=${'chevron-right'}></fds-icon>
      <div class="content">${content}</div>
      ${footerEl}
    </fds-card>
  `
}

export const CardWithCustomHeader: Template = ({ elevation, content, footer }) => {
  const footerEl = footer
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

    <fds-card
      .elevation=${elevation}
      .onCornerClick=${(): void => console.log('clicked corner')}
      @click=${(): void => console.log('clicked card')}
    >
      <div slot="header" class="custom-header">Customized header</div>
      <div class="content">${content}</div>
      ${footerEl}
    </fds-card>
  `
}
