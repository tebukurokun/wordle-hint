import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

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
  plugins: [
    react(),
    VitePWA({
      // public/site.webmanifest is the manifest source of truth (linked in index.html)
      manifest: false,
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico,woff2,webmanifest}"],
      },
    }),
  ],
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
