/** @type {import('@ladle/react').UserConfig} */
export default {
  stories: "src/stories/**/*.stories.{tsx,ts}",
  viteConfig: "vite.config.ts",
  title: "Zephr Sandbox",
  port: 61000,
  defaultStory: "atoms-button--primary",
  addons: {
    theme: { enabled: true, defaultState: "light" },
    control: { enabled: true },
    source: { enabled: true },
    a11y: { enabled: true },
    width: { enabled: true, defaultState: 0 },
  },
};
