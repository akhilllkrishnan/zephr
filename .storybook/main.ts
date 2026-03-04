import path from "node:path";
import { mergeConfig } from "vite";
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.stories.@(ts|tsx)",
    "../packages/ui-react/src/**/*.stories.@(ts|tsx)",
    "../packages/blocks/src/**/*.stories.@(ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  docs: {
    autodocs: "tag"
  },
  async viteFinal(existingConfig) {
    return mergeConfig(existingConfig, {
      resolve: {
        alias: {
          "@zephyr/core": path.resolve(__dirname, "../packages/core/src"),
          "@zephyr/ui-react": path.resolve(__dirname, "../packages/ui-react/src"),
          "@zephyr/ai-registry": path.resolve(__dirname, "../packages/ai-registry/src")
        }
      }
    });
  }
};

export default config;
