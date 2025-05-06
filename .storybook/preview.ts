import '@fintraffic/fds-coreui-css/dist/fonts-public-sans.css'
import { Decorator, Preview } from '@storybook/web-components'
import { html } from 'lit'

const storyDecorator: Decorator = (story, { parameters }) => {
  type PartialStoryFn = typeof story
  const formTemplate = (story: PartialStoryFn) => html`
      <form action="" method="get" data-testid="form">
          ${story()}
          <button type="submit" data-testid="submit-button">Submit</button>
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
