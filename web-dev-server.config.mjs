import {esbuildPlugin} from '@web/dev-server-esbuild';

// https://modern-web.dev/docs/dev-server/cli-and-configuration/#configuration-file
export default {
  open: true,
  watch: true,
  appIndex: 'index.html',
  nodeResolve: {
    exportConditions: ['development']
  },
  plugins: [esbuildPlugin({ ts: true, target: 'es2020' })],
};
