import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
// server: {
//   host: true, // listen on all interfaces
//   strictPort: false,
//   cors: true,
//   hmr: {
//     host: 'localhost',
//   },
//   allowedHosts: 'all',
// }


  server: {
    allowedHosts: [
      "e08c-202-129-198-237.ngrok-free.app", // Add your ngrok host here
      "localhost",
      "127.0.0.1",
    ],
  },
})
