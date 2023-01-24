// Creates a dev bundle from all components for analyzing size

import esbuild from 'esbuild';

const result = await esbuild.build({
  entryPoints: ['src/dev-bundle.ts'],
  outfile: 'build/dev-bundle.js',
  bundle: true,
  sourcemap: true,
  platform: 'browser',
  minify: true,
  metafile: true,
});

console.log(await esbuild.analyzeMetafile(result.metafile));
