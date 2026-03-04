import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@zephyr/core": path.resolve(__dirname, "../../packages/core/src"),
      "@zephyr/ui-react": path.resolve(__dirname, "../../packages/ui-react/src"),
      "@zephyr/ai-registry": path.resolve(__dirname, "../../packages/ai-registry/src"),
      "@zephyr/cloud-sdk": path.resolve(__dirname, "../../packages/cloud-sdk/src"),
      "@zephyr/logos": path.resolve(__dirname, "../../packages/logos/src"),
      "@zephyr/avatars": path.resolve(__dirname, "../../packages/avatars/src"),
      "@zephyr/icons-material": path.resolve(__dirname, "../../packages/icons-material/src")
    }
  },
  optimizeDeps: {
    exclude: [
      "@zephyr/core",
      "@zephyr/ui-react",
      "@zephyr/ai-registry",
      "@zephyr/cloud-sdk",
      "@zephyr/logos",
      "@zephyr/avatars",
      "@zephyr/icons-material"
    ]
  },
  server: {
    port: 4172
  }
});
