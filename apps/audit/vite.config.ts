import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@zephrui/core": path.resolve(__dirname, "../../packages/core/src"),
      "@zephrui/ui-react": path.resolve(__dirname, "../../packages/ui-react/src"),
      "@zephrui/cloud-sdk": path.resolve(__dirname, "../../packages/cloud-sdk/src")
    }
  },
  optimizeDeps: {
    exclude: [
      "@zephrui/core",
      "@zephrui/ui-react",
      "@zephrui/cloud-sdk"
    ]
  },
  server: {
    port: 4175
  }
});
