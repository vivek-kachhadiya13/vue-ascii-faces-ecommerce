import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@assets': fileURLToPath(new URL('./src/client/assets', import.meta.url)),
      '@stores': fileURLToPath(new URL('./src/client/stores', import.meta.url)),
      '@components': fileURLToPath(
        new URL('./src/client/components', import.meta.url)
      ),
      '@views': fileURLToPath(new URL('./src/client/views', import.meta.url)),
      '@router': fileURLToPath(new URL('./src/client/router', import.meta.url)),
    },
  },
});
