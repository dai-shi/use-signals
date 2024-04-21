import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import type { Plugin } from 'vite';

const { DIR, PORT = '8080' } = process.env;
if (!DIR) {
  throw new Error('DIR environment variable is required');
}

export default defineConfig({
  root: resolve('examples', DIR),
  server: { port: Number(PORT) },
  resolve: { alias: { 'use-signals': resolve('src') } },
  plugins: [indexHtml()],
});

function indexHtml(): Plugin {
  const html = readFileSync(
    resolve('examples', DIR!, 'public', 'index.html'),
    'utf8',
  );
  return {
    name: 'index-plugin',
    configureServer(server) {
      return () => {
        server.middlewares.use((req, res) => {
          server
            .transformIndexHtml(req.url || '', html)
            .then((content) => {
              res.statusCode = 200;
              res.setHeader('content-type', 'text/html; charset=utf-8');
              res.end(content);
            })
            .catch((err) => {
              console.error('Error transforming index.html', err);
              res.statusCode = 500;
              res.end('Internal Server Error');
            });
        });
      };
    },
    config() {
      return { optimizeDeps: { entries: ['src/index'] } };
    },
    transformIndexHtml() {
      return [
        {
          tag: 'script',
          attrs: { type: 'module', src: '/src/index' },
        },
      ];
    },
  };
}
