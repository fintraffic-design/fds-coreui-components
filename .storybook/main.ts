import type { StorybookConfig } from '@storybook/web-components-vite'

const config: StorybookConfig = {
  framework: '@storybook/web-components-vite',
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
