const { mergeConfig } = require('vite')

module.exports = {
  stories: ['../src/**/*.stories.ts'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: '@storybook/web-components',
  core: {
    builder: '@storybook/builder-vite',
  },
  features: {
    buildStoriesJson: true,
  },
  async viteFinal(config) {
    if (config.configType === 'DEVELOPMENT') {
      console.log('DEVELOPMENT detected')
      return config
    }
    return mergeConfig(config, { base: '/coreui-components/' })
  },
}
