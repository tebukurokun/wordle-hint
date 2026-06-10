import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@crate/",
        replacement: "/crates/",
      },
    ],
  },
  plugins: [react()],
  server: {
    hmr: {
      // port: 443,
    },
  },
  base: "./",
  define: {
    "process.env": {},
  },
});
