import { copy } from '@web/rollup-plugin-copy';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import summary from 'rollup-plugin-summary';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/my-component.ts',
  output: {
    dir: 'dist'
  },
  plugins: [
    typescript({ exclude: ['**/*.test.ts'] }),
    resolve(),
    minifyHTML(),
    terser({
      ecma: 2020,
      module: true,
      warnings: true,
    }),
    summary(),
    copy({
      patterns: ['images/**/*'],
    }),
  ]
};
