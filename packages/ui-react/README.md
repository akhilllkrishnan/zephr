# @zephrui/ui-react

React component library for the Zephr design system.  
40+ production-ready components across atoms, molecules, organisms, and full page templates.

## Install

```sh
pnpm add @zephrui/core @zephrui/ui-react
```

## Quick Start

```tsx
import { generateCssVariables } from "@zephrui/core/browser";
import { Button, FormField, Input } from "@zephrui/ui-react";

// 1. Inject CSS variables once at app entry
const css = generateCssVariables({ stylePack: "notion" });
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

Use `@zephrui/mcp-server` to give your AI coding assistant (Claude Code, Cursor, Codex) direct access to the component registry:

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

## License

MIT
