import '@fintraffic/fds-coreui-css/dist/fonts-public-sans.css'
import { Decorator, Preview } from '@storybook/web-components'
import { html } from 'lit'
import '../src/define/fds-button'

const storyDecorator: Decorator = (story, { parameters }) => {
  type PartialStoryFn = typeof story
  const formTemplate = (story: PartialStoryFn) => html`
      <form action="" method="get" data-testid="form">
          ${parameters.labelFor ? html`<label for=${parameters.labelFor} data-testid="label" style="font-family: 'Nunito Sans', -apple-system, '.SFNSText-Regular', 'San Francisco', BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif;">${parameters.label ? parameters.label : "Label"}</label>` : ''}
          ${story()}
          <fds-button type="submit" data-testid="submit-button" style="margin-top: 12px;" label="Submit"></fds-button>
      </form>`
  return html`
    <div style="width:284px; height: 260px;">
        ${parameters.isFormUsed ? formTemplate(story):html`${story()}`}
    </div>`
}

const preview: Preview = {
  decorators: [storyDecorator]
}

export default preview
