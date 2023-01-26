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

export const Card: Template = ({ elevation, headerTitle, headerCorner, content, footer }) => {
  return html`<fds-card .elevation=${elevation} style="width: 200px;">
    <div slot="header-title">${headerTitle}</div>
    <div slot="header-corner">${headerCorner}</div>
    <div>${content}</div>
    <div slot="footer">${footer}</div>
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
