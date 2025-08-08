import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'index.html',
        eligibility: 'eligibility.html',
        payment: 'payment.html',
        confirmation: 'confirmation.html'
      }
    }
  }
});
