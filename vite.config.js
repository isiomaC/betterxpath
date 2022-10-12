import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // generate manifest.json in outDir
    manifest: true,
    rollupOptions: {
      // list out all files you want in production ------  "default .html entry"
      input: {
        // main: '/src/main.jsx',
        chromeChangeBg: '/src/scripts/chromeChangeBg.js', //chrome script to manipulate page ‼️
        index: './index.html',  //html to set in manifes.tjson
        testCss: '/src/scripts/testCss.css',
        background: '/src/scripts/service-worker/background.js',
      }
    }
  },
  server: {
    // origin: 'http://localhost:5173/' // 'http://127.0.0.1:8080'
  }
})
