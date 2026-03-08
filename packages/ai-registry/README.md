# @zephrui/ai-registry

[![npm](https://img.shields.io/npm/v/@zephrui/ai-registry?color=blue)](https://www.npmjs.com/package/@zephrui/ai-registry)
[![license](https://img.shields.io/npm/l/@zephrui/ai-registry)](https://github.com/akhilllkrishnan/zephr/blob/main/LICENSE)

Machine-readable component registry for the Zephr design system. Powers the MCP server, CLI, and docs playground.

## Install

```sh
npm install @zephrui/ai-registry
```

## Usage

```ts
import {
  searchComponents,
  getComponentSpec,
  generateComponentPrompt,
  listComponents,
  getTemplateCatalog
} from "@zephrui/ai-registry";

// Search by name or intent
const results = searchComponents("dashboard");

// Get full spec (props schema, a11y notes, AI hints)
const spec = getComponentSpec("button");

// Generate a prompt for any AI assistant
const prompt = generateComponentPrompt("button", {
  assistant: "Cursor",
  stylePack: "notion",
  accentColor: "#335cff"
});
```

## Docs

[zephr-docs.vercel.app](https://zephr-docs.vercel.app)

## License

[MIT](https://github.com/akhilllkrishnan/zephr/blob/main/LICENSE)
