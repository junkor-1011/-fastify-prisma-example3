// import { createRequire as topLevelCreateRequire } from "module";
// const require = topLevelCreateRequire(import.meta.url);
import esbuild from 'esbuild';

import path from 'path';
import url from "url";
// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
// const __filename = url.fileURLToPath(import.meta.url);


await esbuild.build({
  logLevel: 'info',
  entryPoints: [path.join(__dirname, '../src/main.ts')],
  outdir: path.join(__dirname, '../dist'),
  platform: 'node',
  tsconfig: path.join(__dirname, '../tsconfig-prod.json'),
  minify: true,
  bundle: true,
  outExtension: {
    '.js': '.mjs'
  },
  format: 'esm',
  banner: {
    js: 'import { createRequire as topLevelCreateRequire } from "module"; import url from "url"; const require = topLevelCreateRequire(import.meta.url); const __filename = url.fileURLToPath(import.meta.url); const __dirname = url.fileURLToPath(new URL(".", import.meta.url));',
  },
  treeShaking: true,
})
