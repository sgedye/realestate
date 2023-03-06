import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
      "@shared/*": path.resolve(__dirname, "../shared/*")
    }
  },
  server: {
    port: 5000,
    proxy: {
      "/api/v1": "http://127.0.0.1:5000/",
      changeOrigin: "true" as string,
    },
  },
  plugins: [react()],
})
