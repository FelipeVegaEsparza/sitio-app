// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone', port: parseInt(process.env.PORT || '4321') }),
  site: 'https://my-radio-site.com',
  base: '/',
  vite: {
    resolve: {
      alias: {
        '~': '/src'
      }
    }
  }
});
