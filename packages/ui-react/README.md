# @zephyr/ui-react

React component library for the [Zephyr design system](https://zephyr.design).  
40+ production-ready components across atoms, molecules, organisms, and full page templates.

## Install

```sh
pnpm add @zephyr/core @zephyr/ui-react
```

## Quick Start

```tsx
import { generateCssVariables } from "@zephyr/core/browser";
import { Button, FormField, Input } from "@zephyr/ui-react";

// 1. Inject CSS variables once at app entry
const css = generateCssVariables({ stylePack: "Studio" });
const style = document.createElement("style");
style.textContent = css;
document.head.appendChild(style);

// 2. Use components
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

## Component Catalog

### Atoms
`Button` · `Input` · `Textarea` · `Select` · `Checkbox` · `Radio` · `Switch` · `Badge` · `Avatar` · `Logo` · `IconButton`

### Molecules
`FormField` · `SearchBox` · `InputGroup` · `Tabs` · `Accordion` · `Breadcrumbs` · `Pagination` · `Dropdown` · `CommandBar` · `Toast` · `Alert`

### Organisms (Pro)
`DataTable` · `SearchResultsPanel` · `Navbar` · `Header` · `SidebarNav` · `LayoutShell`

### Page Templates (Pro)
`DashboardPage` · `AuthPage` · `SettingsPage` · `OnboardingPage`

## AI Integration

Use `@zephyr/mcp-server` to give your AI coding assistant (Claude Code, Cursor, Codex) direct access to the component registry:

```json
{
  "mcpServers": {
    "zephyr": {
      "command": "npx",
      "args": ["-y", "@zephyr/mcp-server"]
    }
  }
}
```

## License

MIT
