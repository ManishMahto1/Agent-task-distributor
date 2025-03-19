import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [react(),
    tailwindcss(),
    visualizer()
  ],
  build: {
    chunkSizeWarningLimit: 1000, // Increase warning limit to 1000 kB
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor modules into separate chunk
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // Split large third-party modules
          lucide: ['lucide-react'],
          framer: ['framer-motion'],
          redux: ['@reduxjs/toolkit', 'react-redux']
          
        }
      }
    }
  }
  
})
