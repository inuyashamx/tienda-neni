import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
});
