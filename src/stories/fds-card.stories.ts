import { html, TemplateResult } from 'lit'
import '../fds-card'
import { FdsCardElevation } from '../fds-card'

export default {
  title: 'Card',
  args: {
    elevation: FdsCardElevation.LOW,
    headerTitle: 'Title',
    headerCorner: 'Corner',
    content: 'Content',
    footer: 'Footer',
  },
  argTypes: {
    elevation: {
      options: Object.values(FdsCardElevation),
      control: { type: 'select' },
    },
  },
}

type Template = (args: {
  elevation: FdsCardElevation
  headerTitle: string
  headerCorner: string
  content: string
  footer: string
}) => TemplateResult

export const Card: Template = ({ elevation, headerTitle, content }) => {
  return html` <style>
      fds-card {
        cursor: pointer;
        width: 35%;
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
      <footer slot="footer">
        <fds-divider></fds-divider>
        <fds-action-sheet>
          <fds-button slot="separated" variant="danger" label="Button"></fds-button>
          <fds-button variant="tertiary" label="Button"></fds-button>
          <fds-button variant="secondary" label="Button"></fds-button>
          <fds-button label="Button"></fds-button>
        </fds-action-sheet>
      </footer>
    </fds-card>`
}

export const CardWithContentOnly: Template = ({ elevation, content }) => {
  return html`<fds-card .elevation=${elevation} style="width: 200px; height: 100px;">
    <div slot="header"></div>
    <div>${content}</div>
  </fds-card>`
}

export const CardWithCustomHeader: Template = ({ elevation, content }) => {
  return html`<fds-card .elevation=${elevation} style="width: 200px; height: 100px;">
    <div slot="header" style="background-color: black; color: white; padding: 8px;">
      This is custom header
    </div>
    <div>${content}</div>
  </fds-card>`
}
