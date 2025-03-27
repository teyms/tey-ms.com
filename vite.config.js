import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: `[name].[hash].js`,  // This will add a hash to the chunk filenames
        entryFileNames: `[name].[hash].js`,   // This will add a hash to the entry filenames
        assetFileNames: `[name].[hash].[ext]`, // This will add a hash to the asset filenames
      },
    },
  },
  // assetsInclude: ['**/*.html'],  // Add this line to include HTML files as assets
  // define:{
  //   'process.env.VITE_SELF_URL': JSON.stringify(process.env.VITE_SELF_URL),
  //   'process.env.VITE_API_REQUEST_URL': JSON.stringify(process.env.VITE_API_REQUEST_URL)
  // }
})
