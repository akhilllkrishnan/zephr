# @zephrui/core

Core token system, configuration model, and CSS variable compiler for the Zephr design system.

## Install

```sh
pnpm add @zephrui/core
```

## Usage

```ts
import { generateCssVariables } from "@zephrui/core/browser";
import type { ZephrConfig } from "@zephrui/core";

const config: ZephrConfig = {
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
