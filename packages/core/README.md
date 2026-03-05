# @zephyr/core

Core token system, configuration model, and CSS variable compiler for the Zephyr design system.

## Install

```sh
pnpm add @zephyr/core
```

## Usage

```ts
import { generateCssVariables } from "@zephyr/core/browser";
import type { ZephyrConfig } from "@zephyr/core";

const config: ZephyrConfig = {
  stylePack: "notion",
  tokens: {
    color: {
      primary: "#335cff",
      accent: "#335cff"
    }
  }
};

// Inject into a <style> tag at app startup
const css = generateCssVariables(config);
const style = document.createElement("style");
style.textContent = css;
document.head.appendChild(style);
```

## Style Packs

`notion` · `stripe` · `linear` · `framer`

## License

MIT
