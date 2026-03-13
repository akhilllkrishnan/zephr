# Zephr Workspace Context

## What is Zephyr?
Zephr is a token-native React UI library for AI-assisted SaaS product development.
Every component is built on `--z-*` CSS custom properties. Do not hardcode colors, radii, or spacing.

## Configuration
- Style pack: `notion`
- Accent color: `#2563eb`
- Config file: `zephr.config.ts` (source of truth for theme overrides)
- Generated CSS: `src/styles/zephr.css` (import this in your root layout)

## Critical rules
1. Always import from `@zephrui/ui-react` — never write raw `<button>`, `<input>`, `<select>`, or `<textarea>` when a Zephr equivalent exists.
2. Never hardcode hex colors. Use `var(--z-color-*)` tokens or let components handle their own color.
3. Use `FormField` to wrap any labeled input — it handles label, hint, and error text.
4. Use `LayoutShell` + `SidebarNav` for any multi-page admin/dashboard layout — do not build custom sidebar scaffolding.
5. Use `DataTable` + `SearchBox` + `FiltersBar` for any tabular data view.
6. Use `ModalDialog` or `Sheet` for confirmation dialogs and slide-over panels — never `<dialog>` directly.
7. Keep components accessible: pass `aria-label` to icon-only buttons, link labels to inputs via `htmlFor`/`id`.

## Component catalogue

### Atoms (import all from `@zephrui/ui-react`)
| Component | Key props | Notes |
|---|---|---|
| `Button` | `variant` (primary|secondary|ghost|danger), `size` (sm|md|lg), `loading`, `disabled` | Default: primary md |
| `Input` | `value`, `onChange`, `placeholder`, `type` | Wrap in `FormField` for labels |
| `Textarea` | `value`, `onChange`, `rows`, `placeholder` | Wrap in `FormField` for labels |
| `Select` | `value`, `onChange`, `children` (option elements) | Wrap in `FormField` for labels |
| `Checkbox` | `checked`, `onChange`, `disabled` | Wrap with `<label>` text |
| `Switch` | `checked`, `onChange(next: boolean)`, `disabled` | For feature flags |
| `Badge` | `color` (gray|blue|green|red|orange…), `variant` (filled|lighter|stroke), `type` (basic|dot) | Prefer `type=dot` for passive status |
| `Avatar` | `name`, `src`, `size` | Shows initials fallback |
| `Progress` | `value` (0–100), `size` (sm|md) | Linear progress indicator |
| `Skeleton` | `width`, `height`, `radius` | Loading placeholder |

### Molecules
| Component | Key props | Notes |
|---|---|---|
| `FormField` | `label`, `hint`, `error`, `htmlFor`, `children` | Wraps any input |
| `SearchBox` | `value`, `onChange`, `placeholder` | Pair with `FiltersBar` and `DataTable` |
| `Tabs` | `items` ([{id,label}]), `activeId`, `onChange` | Top-level page tabs |
| `Dropdown` | `trigger`, `items` ([{label,onClick}]) | Action menus, context menus |
| `Alert` | `status` (info|success|warning|error), `title`, `children` | Inline status messages |
| `Toast` | `message`, `tone`, show via state | Ephemeral notifications |
| `CommandBar` | `placeholder`, `items`, `onSelect` | Keyboard-driven command palette |
| `Pagination` | `page`, `totalPages`, `onChange` | Table and list pagination |
| `Tooltip` | `content`, `children` | Wraps any triggering element |

### Organisms
| Component | Key props | Notes |
|---|---|---|
| `Navbar` | `brand`, `actions`, `navItems` | Top nav — use at app root |
| `SidebarNav` | `items` ([{id,label,icon,href}]), `activeId` | Left rail navigation |
| `LayoutShell` | `sidebar`, `navbar`, `children` | Full page shell — use once per layout |
| `DataTable` | `columns` ([{id,header,cell}]), `rows`, `onRowClick` | Main data grid |
| `FiltersBar` | `filters` ([{id,label,options}]), `value`, `onChange` | Filter strip above `DataTable` |
| `ModalDialog` | `open`, `onClose`, `title`, `children`, `footer` | Confirmation dialogs |
| `Sheet` | `open`, `onClose`, `title`, `children` | Slide-over detail panel |
| `SearchResultsPanel` | `results`, `onSelect` | Floating search results |

### Layout primitives
`Stack`, `Grid`, `Box`, `Spacer` — composable layout wrappers.

## Common composition recipes

### CRM / admin table page
```tsx
import { LayoutShell, SidebarNav, DataTable, SearchBox, FiltersBar, Button } from '@zephrui/ui-react';
// 1. Wrap the page in <LayoutShell>
// 2. Pass <SidebarNav items={navItems} activeId={currentRoute} /> to sidebar prop
// 3. Above the table: <SearchBox /> and <FiltersBar />
// 4. <DataTable columns={cols} rows={data} onRowClick={openDetail} />
// 5. Detail opens in <Sheet> slide-over
```

### Settings page
```tsx
import { FormField, Input, Switch, Button, Tabs } from '@zephrui/ui-react';
// 1. <Tabs> for Settings sections (General, Security, Notifications, Billing)
// 2. Each section uses <FormField> wrapping <Input> or <Switch>
// 3. Submit row: <Button variant='primary'>Save changes</Button>
```

## MCP Server (optional — greatly improves output quality)
If the `zephr` MCP server is connected, use these tools before generating any component:
- `zephr_search` — find the right component by keyword
- `zephr_spec` — get full prop schema for a specific component
- `zephr_scaffold_page` — scaffold a full page template

Add to Claude Desktop (`~/Library/Application Support/Claude/claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "zephr": { "command": "npx", "args": ["@zephrui/mcp@latest"] }
  }
}
```
For Cursor: add the same block to `.cursor/mcp.json` in your project root.
