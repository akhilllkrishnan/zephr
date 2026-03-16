import { defineConfig } from "vite";
import path from "node:path";

// Ladle injects its own @vitejs/plugin-react — no need to add it here.
// This config only adds workspace source aliases so Vite compiles from
// TypeScript source rather than the pre-built CJS dist.
export default defineConfig({
  resolve: {
    alias: {
      "@zephrui/core": path.resolve(__dirname, "../../packages/core/src"),
      "@zephrui/ui-react": path.resolve(__dirname, "../../packages/ui-react/src"),
      "@zephrui/logos": path.resolve(__dirname, "../../packages/logos/src"),
      "@zephrui/avatars": path.resolve(__dirname, "../../packages/avatars/src"),
      "@zephrui/icons-material": path.resolve(__dirname, "../../packages/icons-material/src"),
    },
  },
  optimizeDeps: {
    exclude: [
      "@zephrui/core",
      "@zephrui/ui-react",
      "@zephrui/logos",
      "@zephrui/avatars",
      "@zephrui/icons-material",
    ],
  },
});
