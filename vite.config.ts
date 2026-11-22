import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, type ResolvedConfig} from 'vite';

export default defineConfig(() => {
  let resolvedOutDir = 'dist';

  return {
    base: './',
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'github-pages-and-assets',
        apply: 'build',
        configResolved(config: ResolvedConfig): void {
          resolvedOutDir = config.build.outDir || 'dist';
        },
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const outDir = path.resolve(__dirname, resolvedOutDir);
          const srcAssets = path.resolve(__dirname, 'src/assets');
          const outAssets = path.resolve(outDir, 'src/assets');
          if (fs.existsSync(outDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, outAssets, {recursive: true, force: true});
          }

          if (resolvedOutDir === 'docs' && fs.existsSync(outDir)) {
            fs.writeFileSync(path.join(outDir, '.nojekyll'), '');
            fs.writeFileSync(path.join(outDir, 'CNAME'), 'infoworldtech.co.in\n');
            const indexHtml = path.join(outDir, 'index.html');
            const notFoundHtml = path.join(outDir, '404.html');
            if (fs.existsSync(indexHtml)) {
              fs.copyFileSync(indexHtml, notFoundHtml);
            }
          }
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
