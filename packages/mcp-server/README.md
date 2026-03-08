# @zephrui/mcp-server

[![npm](https://img.shields.io/npm/v/@zephrui/mcp-server?color=blue)](https://www.npmjs.com/package/@zephrui/mcp-server)
[![license](https://img.shields.io/npm/l/@zephrui/mcp-server)](https://github.com/akhilllkrishnan/zephr/blob/main/LICENSE)

MCP server that gives AI coding assistants (Claude Code, Cursor, Codex) direct access to the Zephr component registry.

## Setup

Add to your `.claude/settings.json` or `.cursor/mcp.json`:

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

| Tool | Description |
|------|-------------|
| `search_components` | Search components by name or intent |
| `get_component_spec` | Full spec with props, a11y notes, AI hints |
| `get_install_steps` | Install instructions for a component |
| `get_usage_examples` | Code examples with theme variants |
| `get_theme_variants` | Theme-specific styling for a component |
| `list_templates` | Browse page templates |
| `generate_component` | Generate component code with AI prompt |
| `scaffold_page` | Scaffold a full page layout |
| `apply_theme` | Switch theme pack |
| `install_plan` | Get a full install plan for Zephr |

## Docs

[zephr-docs.vercel.app](https://zephr-docs.vercel.app)

## License

[MIT](https://github.com/akhilllkrishnan/zephr/blob/main/LICENSE)
