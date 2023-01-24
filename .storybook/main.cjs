module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(ts|mjs)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: '@storybook/web-components',
  core: {
    builder: '@storybook/builder-vite',
  },
}
