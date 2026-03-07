import { defineConfig } from "@zephrui/core";

export default defineConfig({
  stylePack: "notion",
  prefix: "z",
  semanticAliases: {
    "color.page": "color.background",
    "color.panel": "color.surface"
  }
});
