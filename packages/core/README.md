# @zephrui/core

[![npm](https://img.shields.io/npm/v/@zephrui/core?color=blue)](https://www.npmjs.com/package/@zephrui/core)
[![license](https://img.shields.io/npm/l/@zephrui/core)](https://github.com/akhilllkrishnan/zephr/blob/main/LICENSE)

Token system, style pack definitions, and CSS variable compiler for the Zephr design system.

Most users should install [`@zephrui/ui-react`](https://www.npmjs.com/package/@zephrui/ui-react) directly — it includes `@zephrui/core` as a dependency.

## Install

```sh
npm install @zephrui/core
```

## Usage

```ts
import { generateCssVariables } from "@zephrui/core/browser";
import type { ZephrConfig } from "@zephrui/core";

const config: ZephrConfig = {
  stylePack: "notion",
  tokens: {
    color: { primary: "#335cff", accent: "#335cff" }
  }
};

const css = generateCssVariables(config);
```

## Style Packs

`notion` · `stripe` · `linear` · `framer`

All tokens use the `--z-*` CSS variable namespace (`--z-color-*`, `--z-space-*`, `--z-radius-*`, `--z-type-*`, `--z-shadow-*`).

## Docs

[zephr-docs.vercel.app](https://zephr-docs.vercel.app)

## License

[MIT](https://github.com/akhilllkrishnan/zephr/blob/main/LICENSE)
