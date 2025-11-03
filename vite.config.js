import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),         // React support
    tailwindcss(),   // Tailwind integration
  ],
  base: '/recipi/',   // 👈 Must match your GitHub repository name exactly
  server: {
    port: 5173,       // Local development port
    open: true,       // Automatically opens in browser
  },
  build: {
    outDir: 'dist',   // Production build output folder
    sourcemap: true,  // Helpful for debugging (optional)
  },
  preview: {
    port: 4173,       // Optional: Preview build port
  },
})
