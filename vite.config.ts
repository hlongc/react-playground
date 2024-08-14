import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import monacoEditorPlugin from "vite-plugin-monaco-editor";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), monacoEditorPlugin({})],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "src"),
      },
    ],
  },
  css: {
    modules: {
      localsConvention: "camelCase",
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});
