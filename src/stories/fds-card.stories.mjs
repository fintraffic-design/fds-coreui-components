import { html } from 'lit'
import '../fds-card'

export default {
  title: 'Card',
}

const Template = () => {
  return html`<fds-card>
    <div slot="header-title">Title</div>
    <div slot="header-corner">Corner</div>
    Body
    <div slot="footer">Footer</div>
  </fds-card>`
}
export const Default = Template.bind({})
