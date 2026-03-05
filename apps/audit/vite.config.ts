import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@zephyr/core": path.resolve(__dirname, "../../packages/core/src"),
      "@zephyr/ui-react": path.resolve(__dirname, "../../packages/ui-react/src"),
      "@zephyr/cloud-sdk": path.resolve(__dirname, "../../packages/cloud-sdk/src")
    }
  },
  optimizeDeps: {
    exclude: [
      "@zephyr/core",
      "@zephyr/ui-react",
      "@zephyr/cloud-sdk"
    ]
  },
  server: {
    port: 4175
  }
});
