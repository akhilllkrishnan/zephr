import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@zephrui/core": path.resolve(__dirname, "../../packages/core/src"),
      "@zephrui/ui-react": path.resolve(__dirname, "../../packages/ui-react/src"),
      "@zephrui/ai-registry": path.resolve(__dirname, "../../packages/ai-registry/src"),
      "@zephrui/cloud-sdk": path.resolve(__dirname, "../../packages/cloud-sdk/src"),
      "@zephrui/logos": path.resolve(__dirname, "../../packages/logos/src"),
      "@zephrui/avatars": path.resolve(__dirname, "../../packages/avatars/src"),
      "@zephrui/icons-material": path.resolve(__dirname, "../../packages/icons-material/src")
    }
  },
  optimizeDeps: {
    exclude: [
      "@zephrui/core",
      "@zephrui/ui-react",
      "@zephrui/ai-registry",
      "@zephrui/cloud-sdk",
      "@zephrui/logos",
      "@zephrui/avatars",
      "@zephrui/icons-material"
    ]
  },
  server: {
    port: 4172
  }
});
