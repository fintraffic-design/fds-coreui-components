import type { StorybookConfig } from '@storybook/web-components-vite'

const config: StorybookConfig = {
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  stories: ['../src/stories/*.stories.ts',
    '../src/stories/*.mdx'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-docs', '@storybook/addon-interactions'],
  features: {
    buildStoriesJson: true,
  },
  docs: {
    autodocs: true,
  },
}
export default config
