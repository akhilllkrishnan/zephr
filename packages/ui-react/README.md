# @zephrui/ui-react

React component library for the Zephr design system.  
40+ production-ready components across atoms, molecules, organisms, and full page templates.

## Install

```sh
npm install @zephrui/ui-react
```

## Quick Start

```tsx
// 1. Import a theme once at your app entry point
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

Available themes: `notion` (free), `stripe`, `linear`, `framer` (Pro).

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
