<p align="center">
  <img src="logo/zephr-dark.png" alt="Zephr" height="40" />
</p>

<p align="center">
  <strong>The AI-native design system that puts designer language in your hands.</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@zephrui/ui-react"><img src="https://img.shields.io/npm/v/@zephrui/ui-react?color=blue&label=npm" alt="npm version"></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-green" alt="license"></a>
  <a href="https://zephr-docs.vercel.app"><img src="https://img.shields.io/badge/docs-live-brightgreen" alt="docs"></a>
</p>

---

Most people can't ask an AI for "more vertical rhythm" or "better visual hierarchy" — not because the AI doesn't understand design, but because they've never used those words. Zephr solves this with three things that work together:

- **20 slash commands** — design vocabulary you can use immediately (`/polish`, `/bolder`, `/scaffold dashboard`)
- **40+ production-ready components** — a token-driven React library with zero config
- **AI Registry + MCP server** — machine-readable component metadata that helps AI tools generate correct code

---

## Quick start

```bash
npm install @zephrui/ui-react @zephrui/core
```

```tsx
// 1. Inject tokens at your app entry (once)
import { generateCssVariables, stylePacks } from "@zephrui/core/browser";
const style = document.createElement("style");
style.textContent = generateCssVariables(stylePacks["notion"]);
document.head.appendChild(style);

// 2. Use components
import { Button, Card, Badge, Input } from "@zephrui/ui-react";

export function WelcomeCard() {
  return (
    <Card>
      <Badge color="green">New</Badge>
      <Input placeholder="Enter your email" />
      <Button intent="primary">Get started</Button>
    </Card>
  );
}
```

No providers. No config files. No utility classes.

---

## The command vocabulary

Commands are the core of Zephr's value. They give you the words that designers use — and make your AI act on them.

Install commands into Claude Code:

```bash
npx @zephrui/cli add-skills --editor claude-code
```

Then use them directly in any conversation:

```
/scaffold dashboard
/polish
/audit
/bolder
```

### Full command reference

#### Diagnostic

| Command | What it does |
|---|---|
| `/audit` | Scans the current component or page for design system violations — hardcoded values, off-token spacing, missing states, and accessibility gaps. Outputs a ranked issue list. |
| `/critique` | Full UX and visual design review. Covers hierarchy, CTA prominence, information density, empty states, and copy clarity. |
| `/token-check` | Finds hardcoded colors, sizes, and spacing values and shows the correct Zephr token for each. |

#### Quality

| Command | What it does |
|---|---|
| `/polish` | Final refinement pass before shipping. Tightens spacing, aligns type to the scale, normalizes radii, and ensures consistent interactive states. |
| `/normalize` | Aligns the current component to Zephr's design system conventions — token usage, naming, and component API patterns. |
| `/tighten` | Reduces padding and spacing inconsistencies. Use when a UI feels loose or unfinished. |
| `/harden` | Adds missing error states, loading states, empty states, and edge case handling. These aren't optional — they're the job. |

#### Expression

| Command | What it does |
|---|---|
| `/bolder` | Amplifies timid designs. Increases contrast, strengthens type hierarchy, makes the primary action more dominant. Use when a UI feels flat. |
| `/quieter` | Tones down busy designs. Reduces visual noise, softens secondary elements, creates more breathing room. |
| `/breathe` | Adds vertical rhythm and whitespace. Increases line-height, section gaps, and padding to make a layout feel considered. |
| `/focus` | Sharpens the primary user action. Removes competing visual weights, ensures one dominant CTA, clears the critical path. |

#### Composition

| Command | What it does |
|---|---|
| `/scaffold [page-type]` | Scaffolds a full page using the matching Zephr template with real components. `/scaffold settings` generates a working settings page. |
| `/widget [name]` | Drops in a specific Zephr widget fully wired up with props and example data. `/widget data-table` generates a sortable, selectable table. |
| `/compose` | Assembles a layout from Zephr components based on a natural language description. Understands the full component API. |
| `/distill` | Strips a UI to its essential structure. Removes decorative elements, redundant labels, and anything that doesn't serve the primary user task. |
| `/adapt [context]` | Adapts a component for a different device or context. `/adapt mobile` reworks a desktop layout for small screens. |

#### Design thinking

| Command | What it does |
|---|---|
| `/clarify` | Rewrites labels, CTAs, error messages, and empty states to be clear, action-oriented, and consistent in voice. |
| `/colorize` | Adds strategic color using Zephr's semantic token system — brand color, status indicators, and accent highlights. |
| `/animate` | Adds meaningful motion via Zephr's transition tokens. Focuses on state changes and micro-interactions, not decoration. |
| `/annotate` | Adds inline comments explaining design decisions. Useful for code reviews and team onboarding. |
| `/teach-zephr` | One-time project context gathering. Learns your app's domain, key user actions, tone of voice, and brand. Personalizes all subsequent commands. |

### Quick lookup

| Feeling | Command |
|---|---|
| "This looks flat" | `/bolder` |
| "Too much going on" | `/quieter` or `/distill` |
| "Looks unfinished" | `/polish` or `/harden` |
| "I need a whole page" | `/scaffold [type]` |
| "Something's wrong but I can't name it" | `/critique` |
| "Wrong colors everywhere" | `/token-check` |
| "Copy feels vague" | `/clarify` |
| "Add some life to it" | `/animate` or `/colorize` |

---

## Packages

Zephr is a monorepo. Each package is independently installable.

### `@zephrui/ui-react`
40+ production-ready React components. Covers atoms through organisms and layout primitives.

```bash
npm install @zephrui/ui-react
```

**Atoms** — Button, Badge, Avatar, Checkbox, Radio, Switch, Divider, Progress, Tooltip, IconButton

**Inputs** — Input, Textarea, Select, DatePicker, ColorPicker, SearchBox, FormField, InputGroup

**Display** — Card, Alert, ModalDialog, Toast, Tabs, Accordion, Breadcrumbs, Pagination

**Navigation** — Navbar, SidebarNav, CommandBar, Header, Dropdown

**Data** — DataTable, FiltersBar, SearchResultsPanel

**Layout** — LayoutShell, ButtonGroup

**Media** — RichEditor, Logo, Avatar

---

### `@zephrui/core`
The token system and style compiler. Defines `DesignTokens`, ships four built-in style packs, and exports `generateCssVariables()`.

```bash
npm install @zephrui/core
```

**Style packs:** `notion` · `minimal` · `vibrant` · `corporate`

```ts
import { generateCssVariables, stylePacks } from "@zephrui/core/browser";

// Inject into your page at startup
const css = generateCssVariables(stylePacks["notion"]);
```

---

### `@zephrui/ai-registry`
Machine-readable component metadata. Every component has `propsSchema`, `aiHints`, and `usageExamples` that AI tools use to generate accurate code — no hallucinated props.

```bash
npm install @zephrui/ai-registry
```

```ts
import { generateComponentPrompt, getComponentTemplate } from "@zephrui/ai-registry";

const prompt = generateComponentPrompt("button");
// "Use the Button component with intent='primary' for the main CTA..."

const template = getComponentTemplate("data-table");
// JSX snippet with correctly typed props
```

---

### `@zephrui/mcp-server`
MCP server that exposes the component registry as tool calls. Lets AI assistants query props, find widgets, and generate correct code without reading your source.

```bash
npm install @zephrui/mcp-server
```

**`claude_desktop_config.json`:**
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

**Tools exposed:**

| Tool | What it does |
|---|---|
| `zephr_find_component` | Find a component by name or description |
| `zephr_get_props` | Get the full props schema for a component |
| `zephr_get_template` | Get a usage template with example props |
| `zephr_list_widgets` | Browse all available widget patterns |
| `zephr_find_widget` | Find the best widget for a given use case |
| `zephr_get_token` | Look up a design token by semantic name |

---

### `@zephrui/cli`
Project setup and command installation.

```bash
npm install -g @zephrui/cli

zephr init                           # Set up Zephr in an existing project
zephr add-skills --editor claude-code  # Install slash commands
zephr add-skills --editor cursor       # Install for Cursor
zephr add-skills --editor codex        # Install for Codex CLI
zephr list components                # Browse the registry
zephr token-check                    # Scan for hardcoded values
```

`zephr init` generates `CLAUDE.md`, `AGENTS.md`, and `llms.txt` so every AI tool in your project understands Zephr from the first prompt.

---

### Asset libraries (optional)

| Package | Contents |
|---|---|
| `@zephrui/icons-material` | Material icon catalog with multiple styles |
| `@zephrui/avatars` | Avatar style definitions and generation |
| `@zephrui/logos` | Brand logo catalog |
| `@zephrui/blocks` | Pre-assembled UI blocks (higher-level than components) |
| `@zephrui/forms` | Form composition utilities and validation patterns |

---

## Widgets

50+ self-contained, interactive widget patterns built from Zephr components. Copy the source, it works immediately.

| Category | Examples |
|---|---|
| Command & Navigation | Command palette, Navbar, Quick actions |
| Data & Tables | Data table, Deals pipeline, Audit trail |
| Analytics | Analytics overview, Metrics dashboard, Revenue snapshot |
| Notifications | Notification feed, Activity timeline, Incident digest |
| Settings | Settings panel, Security & access, API keys |
| Onboarding | Setup journey, Welcome profile, Goal tracker |
| Content | Comment thread, Content calendar, Feedback inbox |
| Team | Team list, Team pulse, Access requests |
| Billing | Billing usage, Plan comparison, Billing recovery |

---

## Page templates

25 full page templates covering the common surfaces of any SaaS product.

**Core templates** (complete implementations):
Dashboard · Settings · Auth · Onboarding · Marketing / Pricing

**Assembled examples** (reference compositions):
Ops Center · Team Workspace · Admin Hub · Growth Workspace · Support Desk · Developer Console · Release Center · Analytics Workspace · Billing Console · CRM Workspace · CRM Contacts · Audit Center · Content Studio · Support Portal · Finance Workspace · Product Review Board · Customer Onboarding · Referral Center · AI Composer Studio · Delivery Operations · Growth Insights

All templates use real Zephr components, follow token conventions, and are interactive in the docs playground.

---

## Token conventions

Never use hardcoded values. Everything references a token.

```css
/* Colors */
--z-color-background-950     /* darkest surface */
--z-color-background-0       /* lightest surface */
--z-color-text-950           /* primary text */
--z-color-text-300           /* muted / secondary text */
--z-color-accent-500         /* brand / action color */
--z-color-semantic-red-500   /* danger */
--z-color-semantic-green-500 /* success */
--z-color-semantic-yellow-500 /* warning */

/* Typography */
--z-font-heading-h1   /* 3rem / medium */
--z-font-body-md      /* 1rem / regular */
--z-font-label-sm     /* 0.75rem / medium / caps */
--z-font-mono-md      /* 1rem / medium / monospace */

/* Spacing (4px base) */
--z-space-1   /* 4px */
--z-space-2   /* 8px */
--z-space-4   /* 16px */
--z-space-6   /* 24px */
--z-space-8   /* 32px */
--z-space-12  /* 48px */
```

---

## Design vocabulary

The commands are more useful when you know what they're doing. These are the terms Zephr's command set is built on:

**Visual hierarchy** — The order in which a viewer's eye moves across a page. Set by size, weight, color, and position. Strong hierarchy means one element is clearly primary. `/bolder` and `/focus` improve this.

**Vertical rhythm** — Consistent spacing between elements that makes a layout feel measured rather than arbitrary. Built by using a spacing scale. `/breathe` and `/tighten` adjust this.

**CTA prominence** — How clearly the call-to-action stands out from everything else. The primary action must have the highest contrast and most visual weight on the surface. `/focus` enforces this.

**Information density** — The ratio of content to whitespace. High density can feel overwhelming; low density can feel spare. Depends on context — dashboards can be denser than marketing pages. `/quieter` and `/distill` reduce density.

**Visual noise** — Elements that draw attention without adding information. Gratuitous borders, shadows, icons, competing font sizes. `/quieter` and `/distill` eliminate this.

**Semantic color** — Color that carries meaning: red for danger, green for success, yellow for warning. Must come from tokens. `/colorize` and `/token-check` enforce this.

**Breathing room** — Generous padding and whitespace that makes content feel considered rather than rushed. `/breathe` adds this.

**Empty state** — What a component shows when there's no data. Good empty states explain why and tell users what to do. `/harden` adds these.

**Loading state** — The in-progress view while data fetches. Should use Zephr skeletons, never a blank space. `/harden` adds these.

**Error recovery** — Messaging that explains what went wrong and gives a clear next step. Required for all forms and API calls. `/harden` adds these.

---

## AI editor setup

### Claude Code

```bash
zephr add-skills --editor claude-code
# Writes to .claude/commands/
```

Use any command in conversation: `/polish`, `/scaffold settings`, `/audit`

### Cursor

```bash
zephr add-skills --editor cursor
# Writes to .cursor/rules/zephr.mdc
```

### Codex CLI

```bash
zephr add-skills --editor codex
# Writes to AGENTS.md
```

### Universal (any editor)

```bash
zephr add-skills --editor universal
# Creates ZEPHR.md — reference from any custom instructions
```

---

## Running the docs playground

```bash
git clone https://github.com/your-org/zephr
cd zephr
pnpm install
pnpm dev
# Opens at http://localhost:4172
```

The playground includes:
- **Component gallery** — all 40+ components with interactive variant pickers
- **Edit section** — AI-ready prompts and prop schemas per component
- **Widget catalog** — 50+ interactive widget patterns with copy-ready source
- **Template gallery** — 25 full page templates
- **Foundations** — color tokens, typography scale, style pack switcher
- **Getting started** — setup guides for Claude Code, Cursor, and Codex

---

## Repository structure

```
zephr/
├── apps/
│   └── docs-playground/     # Interactive docs site
├── packages/
│   ├── ui-react/            # Component library
│   ├── core/                # Token system + style packs
│   ├── ai-registry/         # Machine-readable component registry
│   ├── mcp-server/          # MCP server
│   ├── cli/                 # CLI tool
│   ├── blocks/              # Pre-assembled UI blocks
│   ├── forms/               # Form utilities
│   ├── icons-material/      # Material icon catalog
│   ├── avatars/             # Avatar styles
│   └── logos/               # Logo catalog
└── logo/                    # Brand assets
```

---

## Contributing

### Adding a component

1. Add the component to `packages/ui-react/src/atoms/` or `/molecules/`
2. Export from `packages/ui-react/src/index.ts`
3. Add a registry entry to `packages/ai-registry/src/registry/components.json` with `propsSchema`, `aiHints`, and `usageExamples`
4. Add it to the docs playground gallery in `apps/docs-playground/src/App.tsx`

### Adding a widget

1. Add the component to `packages/ui-react/src/widgets/Widgets.tsx`
2. Register it in `apps/docs-playground/src/views/widgetsCatalog.ts`

### Adding a command

1. Write the skill file under `.claude/commands/[command-name].md`
2. Document it in `COMMANDS.md`
3. Add CLI support in `packages/cli/src/commands/`

### Commit conventions

```
feat: add /colorize command
fix: DataTable sort direction on empty rows
docs: expand MCP server setup guide
chore: bump ui-react to 0.3.0
```

---

## Design principles

**Vocabulary before components.** A component library without a command vocabulary is just another npm package. The slash commands are what make Zephr useful to non-designers.

**AI-native from the start.** Every component has a machine-readable schema. The MCP server is first-class. `zephr init` configures every AI tool in your project automatically.

**Tokens everywhere.** No hardcoded values. If it's a color, size, or spacing value, it's a token. `/token-check` enforces this.

**Interactive, not decorative.** Widgets and templates are working React code with real state and handlers. No screenshots, no Figma exports, no placeholders.

**Production-ready defaults.** Loading, error, empty, and disabled states ship with every component. These aren't edge cases — they're requirements.

**One primary action per surface.** Every layout needs one clearly dominant action. `/focus` and `/bolder` enforce this.

---

## License

MIT © Akhil Krishnan and contributors

---

*The goal is not to replace designers, but to give everyone enough design vocabulary to build at designer quality.*
