import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  console.table({ mode, command });

  // const {
  //   API_URL: baseURL,
  // } = loadEnv(mode, process.cwd(), '');

  // process.env = {
  //   ...process.env,
  //   VITE_API_URL: baseURL,
  // };

  return {
    plugins: [
      vue(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: true,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      assetsInlineLimit: 0,
      outDir: '../public',
    },
  };
});
