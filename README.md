<p align="center">
  <strong>Zephr</strong><br>
  The AI-native UI component library for React.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@zephrui/ui-react"><img src="https://img.shields.io/npm/v/@zephrui/ui-react?color=blue&label=npm" alt="npm version"></a>
  <a href="https://github.com/akhilllkrishnan/zephr/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@zephrui/ui-react" alt="license"></a>
  <a href="https://zephr-docs.vercel.app"><img src="https://img.shields.io/badge/docs-live-green" alt="docs"></a>
</p>

---

58 production-ready components. 4 theme packs. Zero config. One CSS import and you're building.

Zephr replaces the Tailwind + shadcn stack with a single package that themes itself via CSS variables. No utility classes, no copy-paste, no config files. Install, import a theme, use components.

## Install

```sh
npm install @zephrui/ui-react
```

## Quick Start

```tsx
// 1. Import a theme (once, at your app entry)
import "@zephrui/ui-react/themes/notion.css";

// 2. Use components
import { Button, FormField, Input } from "@zephrui/ui-react";

export function LoginForm() {
  return (
    <form>
      <FormField label="Email" htmlFor="email">
        <Input id="email" type="email" placeholder="name@company.com" />
      </FormField>
      <Button type="submit">Sign in</Button>
    </form>
  );
}
```

That's it. No providers, no config, no Tailwind setup.

## Theme Packs

Switch your entire app's look with one CSS import:

| Theme | Import | Style |
|-------|--------|-------|
| **Notion** | `themes/notion.css` | Warm white, no shadows, 4px radii, Inter |
| **Stripe** | `themes/stripe.css` | Soft elevation, blue accent, 8px radii |
| **Linear** | `themes/linear.css` | Compact, data-dense, 6px radii, monospace |
| **Framer** | `themes/framer.css` | Large type scale, bold contrast, expressive |

Notion is free. Stripe, Linear, and Framer are Pro.

## Components

### Atoms
`Button` `Input` `Textarea` `Select` `Checkbox` `Radio` `Switch` `Badge` `Avatar` `Logo` `IconButton` `Card` `Divider` `Progress` `Skeleton` `Slider` `Tooltip` `Popover`

### Molecules
`FormField` `SearchBox` `InputGroup` `Tabs` `Accordion` `Breadcrumbs` `Pagination` `Dropdown` `CommandBar` `Toast` `Alert` `DatePicker` `ColorPicker` `ComboBox` `NumberInput` `TagInput` `Sheet` `AlertDialog` `ButtonGroup` `RichEditor`

### Organisms
`DataTable` `SearchResultsPanel` `Navbar` `Header` `SidebarNav` `LayoutShell` `ModalDialog` `FiltersBar`

### Layout Primitives
`Stack` `Grid` `Box` `Spacer`

### Asset Libraries
`IconLibrary` `AvatarLibrary` `LogoLibrary`

### Page Templates
`DashboardPage` `AuthPage` `SettingsPage` `OnboardingPage` `MarketingPage`

## AI Integration

Zephr is built for AI-assisted development. Give your coding assistant direct access to the component registry:

### MCP Server (Claude Code, Cursor)

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

Your AI assistant can now search components, get specs, generate usage examples, and scaffold pages — all from the registry.

### CLI

```sh
npx @zephrui/cli init              # generates config + AI instruction files
npx @zephrui/cli add button        # scaffold a component with AI prompt
npx @zephrui/cli theme stripe      # switch theme
npx @zephrui/cli doctor            # check setup
```

`zephr init` generates `CLAUDE.md`, `AGENTS.md`, and `llms.txt` so your AI tools know how to use Zephr correctly from the start.

## Packages

| Package | Description |
|---------|-------------|
| [`@zephrui/ui-react`](https://www.npmjs.com/package/@zephrui/ui-react) | React components + theme CSS |
| [`@zephrui/core`](https://www.npmjs.com/package/@zephrui/core) | Token system + CSS variable compiler |
| [`@zephrui/cli`](https://www.npmjs.com/package/@zephrui/cli) | Project scaffolding + theme management |
| [`@zephrui/mcp-server`](https://www.npmjs.com/package/@zephrui/mcp-server) | AI tool server (MCP protocol) |
| [`@zephrui/ai-registry`](https://www.npmjs.com/package/@zephrui/ai-registry) | Machine-readable component metadata |
| [`@zephrui/icons-material`](https://www.npmjs.com/package/@zephrui/icons-material) | Material icon set |
| [`@zephrui/avatars`](https://www.npmjs.com/package/@zephrui/avatars) | Deterministic avatar generation |
| [`@zephrui/logos`](https://www.npmjs.com/package/@zephrui/logos) | Logo provider + fallbacks |

## Docs

[zephr-docs.vercel.app](https://zephr-docs.vercel.app) — live playground with theme switcher and interactive component previews.

## License

[MIT](LICENSE)
