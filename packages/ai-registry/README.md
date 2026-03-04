# @zephyr/ai-registry

Machine-readable component registry and JSON schema for AI tools, MCP servers, and developer tooling.

## Install

```sh
pnpm add @zephyr/ai-registry
```

## Usage

```ts
import {
  getComponentSpec,
  generateComponentPrompt,
  searchComponents,
  listComponents,
  getTemplateCatalog
} from "@zephyr/ai-registry";

// Search by name or intent
const results = searchComponents("dashboard");

// Get full spec including propsSchema, a11y notes, aiHints
const spec = getComponentSpec("button");

// Generate a formatted prompt for your AI assistant
const prompt = generateComponentPrompt("button", {
  assistant: "Cursor",
  stylePack: "Studio",
  accentColor: "#335cff"
});

// List all Pro page templates
const templates = getTemplateCatalog();
```

## License

MIT
