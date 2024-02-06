import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  preview: {
    port: 5001,
    strictPort: true,
  },
  server: {
    port: 5000,
    strictPort: true,
    host: true,
  },
});
