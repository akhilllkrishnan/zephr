import { defineConfig } from "@zephyr/core";

export default defineConfig({
  stylePack: "notion",
  prefix: "z",
  semanticAliases: {
    "color.page": "color.background",
    "color.panel": "color.surface"
  }
});
