import type { StorybookConfig } from '@storybook/web-components-vite'

const config: StorybookConfig = {
  framework: {
    name: '@storybook/web-components-vite',
    options: {}
  },
  stories: ['../src/stories/*.stories.ts'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  features: {
    buildStoriesJson: true,
  },
  docs: {
    autodocs: true,
  },
}
export default config
