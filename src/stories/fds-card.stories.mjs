import { html } from 'lit'
import '../fds-card'

export default {
  title: 'Card',
}

const Template = () => {
  return html`<fds-card style="width: 170px;" class="elevation-100">
    <div slot="header-title">Title</div>
    <div slot="header-corner">Corner</div>
    <div>Content</div>
    <div slot="footer">Footer</div>
  </fds-card>`
}
export const Default = Template.bind({})
