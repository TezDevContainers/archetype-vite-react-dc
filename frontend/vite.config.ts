import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  base: '/archetype-vite-react-dc/', // Set the base path to your repository name
  resolve: {
    alias: {
      util: 'util/', // Ensure this alias is correctly set
    },
  },
  plugins: [
    react(),
    nodePolyfills({
      // Customize your polyfills here
      exclude: [],
      globals: {
        Buffer: true, // This ensures Buffer is polyfilled
        global: true,
        process: true,
      },
      protocolImports: true,
    }),
  ],
  server: {
    port: 3000,
  },
  define: {
    'process.env': {},
  },
})
