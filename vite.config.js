import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.html'],  // Add this line to include HTML files as assets
  // define:{
  //   'process.env.VITE_SELF_URL': JSON.stringify(process.env.VITE_SELF_URL),
  //   'process.env.VITE_API_REQUEST_URL': JSON.stringify(process.env.VITE_API_REQUEST_URL)
  // }
})
