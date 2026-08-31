import { cp, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { build } from 'vite';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = resolve(projectRoot, 'dist-xhs');

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

await build({
  configFile: false,
  root: projectRoot,
  publicDir: false,
  logLevel: 'info',
  build: {
    outDir: outputDir,
    emptyOutDir: false,
    target: 'es2019',
    minify: 'esbuild',
    cssCodeSplit: false,
    lib: {
      entry: resolve(projectRoot, 'src/main.ts'),
      name: 'FanZhuanKuai',
      formats: ['iife'],
      fileName: () => 'assets/app.js',
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) =>
          assetInfo.names.some((name) => name.endsWith('.css'))
            ? 'assets/style.css'
            : 'assets/[name][extname]',
      },
    },
  },
});

await cp(resolve(projectRoot, 'xhs/index.html'), resolve(outputDir, 'index.html'));
