# @zephrui/mcp-server

[![npm](https://img.shields.io/npm/v/@zephrui/mcp-server?color=blue)](https://www.npmjs.com/package/@zephrui/mcp-server)
[![license](https://img.shields.io/npm/l/@zephrui/mcp-server)](https://github.com/akhilllkrishnan/zephr/blob/main/LICENSE)

MCP server that gives AI coding assistants (Claude Code, Cursor, Codex, Windsurf) direct access to the Zephr component registry — search components, generate code, scaffold pages, apply themes, and visually verify UI before writing it to disk.

## Setup

### Claude Code

Add to `.claude/settings.json` in your project root (or `~/.claude/settings.json` for global):

```json
{
  "mcpServers": {
    "zephr": {
      "command": "npx",
      "args": ["-y", "@zephrui/mcp-server"]
    }
  }
}
```

Or use the one-liner:

```bash
zephr add-skills
```

### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "zephr": {
      "command": "npx",
      "args": ["-y", "@zephrui/mcp-server"]
    }
  }
}
```

### Cursor

Add to `.cursor/mcp.json` in your project root:

```json
{
  "mcpServers": {
    "zephr": {
      "command": "npx",
      "args": ["-y", "@zephrui/mcp-server"]
    }
  }
}
```

### Windsurf

Add to `.windsurf/mcp.json` in your project root:

```json
{
  "mcpServers": {
    "zephr": {
      "command": "npx",
      "args": ["-y", "@zephrui/mcp-server"]
    }
  }
}
```

## Tools

### Discovery tools

| Tool | Description |
|------|-------------|
| `search_components` | Search components by name or intent (e.g. "dropdown", "file upload") |
| `get_component_spec` | Full spec with props, a11y notes, AI hints, and dependencies |
| `get_install_steps` | Install and import instructions for a specific component |
| `get_usage_examples` | Code examples with theme and variant coverage |
| `get_theme_variants` | Theme-specific styling options for a component |
| `list_templates` | Browse all page templates (Dashboard, Auth, Settings, Onboarding, Marketing) |

### Action tools

| Tool | Description |
|------|-------------|
| `generate_component` | Generate a ready-to-paste component snippet + AI prompt for your editor |
| `scaffold_page` | Compose a full page from multiple components — returns source, config, and install command |
| `apply_theme` | Generate a `zephr.config.ts` for a given style pack and accent color |
| `install_plan` | Step-by-step install plan tailored to your framework and package manager |
| `zephr_render` | Render JSX in a headless Playwright browser — returns a screenshot and token compliance report |

### `zephr_render`

The most powerful tool. Renders real Zephr components in a headless browser and returns a screenshot so you can visually verify UI before writing it to disk.

```
// Ask your AI assistant:
"Use zephr_render to preview this button composition before I copy it"
"Render this Card + Badge layout in dark mode"
"Check the token compliance on this component"
```

**Parameters:**
- `jsx` — JSX string to render, e.g. `<Button variant="primary">Save</Button>`
- `theme` — `"light"` | `"dark"` | `"both"` (default: `"light"`)
- `width` — viewport width in px (default: `800`)
- `accentColor` — override `--z-color-primary`, e.g. `"#533afd"` (default: `"#533afd"`)

> **Note:** `zephr_render` requires Playwright. It is installed automatically as a dependency. First run may be slower while the browser binary downloads.

## Style packs

| Pack | Description |
|------|-------------|
| `notion` | Clean, type-forward. Light backgrounds, subtle borders. |
| `stripe` | High-contrast, editorial. Tight spacing, strong hierarchy. |
| `linear` | Dark-by-default, monospace accents. Developer tools aesthetic. |
| `framer` | Bold, expressive. Large type, vivid accent colors. |

## Example prompts

Once connected, try these in your AI editor:

```
search_components("date picker")
get_component_spec("modal-dialog")
generate_component("data-table", { stylePack: "linear", assistant: "Claude" })
scaffold_page(["navbar", "button", "input", "card"], { pageTitle: "Settings" })
apply_theme("stripe", { accentColor: "#635bff" })
install_plan({ framework: "nextjs", packageManager: "pnpm" })
zephr_render("<Badge color=\"green\" variant=\"lighter\">Active</Badge>", { theme: "both" })
```

## Docs

[zephr-docs.vercel.app](https://zephr-docs.vercel.app)

## License

[MIT](https://github.com/akhilllkrishnan/zephr/blob/main/LICENSE)
