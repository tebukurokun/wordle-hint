import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactRefresh from "@vitejs/plugin-react-refresh";

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
