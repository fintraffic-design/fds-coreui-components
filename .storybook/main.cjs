module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|mjs|ts)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: '@storybook/web-components',
  core: {
    disableTelemetry: true,
  },
}
