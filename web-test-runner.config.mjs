import {esbuildPlugin} from '@web/dev-server-esbuild';
import {playwrightLauncher} from '@web/test-runner-playwright';

const browsers = {
  // Local browser testing via playwright
  // ===========
  chromium: playwrightLauncher({product: 'chromium'}),
  firefox: playwrightLauncher({product: 'firefox'}),
  webkit: playwrightLauncher({product: 'webkit'}),
}

// https://modern-web.dev/docs/test-runner/cli-and-configuration/#configuration-file
export default {
  nodeResolve: true,
  browsers: [browsers.chromium],
  files: ['src/**/*.spec.ts'],
  testFramework: {
    // https://mochajs.org/api/mocha
    config: {
      ui: 'tdd',
      timeout: '60000',
    },
  },
  plugins: [esbuildPlugin({ ts: true, target: 'es2020' })],
};
