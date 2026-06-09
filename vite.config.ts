import reactRefresh from "@vitejs/plugin-react-refresh";
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
  plugins: [reactRefresh()],
  server: {
    hmr: {
      // port: 443,
    },
  },
  base: "./",
  define: {
    "process.env": {},
  },
  esbuild: {
    jsxInject: "import React from 'react';",
  },
});
