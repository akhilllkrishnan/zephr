# @zephrui/ui-react

[![npm](https://img.shields.io/npm/v/@zephrui/ui-react?color=blue)](https://www.npmjs.com/package/@zephrui/ui-react)
[![license](https://img.shields.io/npm/l/@zephrui/ui-react)](https://github.com/akhilllkrishnan/zephr/blob/main/LICENSE)

The AI-native UI component library for React. 58 components, 4 theme packs, zero config.

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

No providers, no config files, no Tailwind. One CSS import and you're building.

## Theme Packs

| Theme | Import | Style |
|-------|--------|-------|
| **Notion** | `themes/notion.css` | Warm white, no shadows, 4px radii |
| **Stripe** | `themes/stripe.css` | Soft elevation, blue accent, 8px radii |
| **Linear** | `themes/linear.css` | Compact, data-dense, 6px radii |
| **Framer** | `themes/framer.css` | Large type scale, bold contrast |

Notion is free. Stripe, Linear, and Framer are Pro.

## Components

**Atoms:** `Button` `Input` `Textarea` `Select` `Checkbox` `Radio` `Switch` `Badge` `Avatar` `Logo` `IconButton` `Card` `Divider` `Progress` `Skeleton` `Slider` `Tooltip` `Popover`

**Molecules:** `FormField` `SearchBox` `InputGroup` `Tabs` `Accordion` `Breadcrumbs` `Pagination` `Dropdown` `CommandBar` `Toast` `Alert` `DatePicker` `ColorPicker` `ComboBox` `NumberInput` `TagInput` `Sheet` `AlertDialog` `ButtonGroup` `RichEditor`

**Organisms:** `DataTable` `SearchResultsPanel` `Navbar` `Header` `SidebarNav` `LayoutShell` `ModalDialog` `FiltersBar`

**Layout:** `Stack` `Grid` `Box` `Spacer`

**Page Templates:** `DashboardPage` `AuthPage` `SettingsPage` `OnboardingPage` `MarketingPage`

## AI Integration

Give your AI coding assistant direct access to the component registry:

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

## Docs

[zephr-docs.vercel.app](https://zephr-docs.vercel.app)

## License

[MIT](https://github.com/akhilllkrishnan/zephr/blob/main/LICENSE)
