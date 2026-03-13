---
description: Align component to Zephr design system conventions — tokens, imports, API patterns
---

Normalize the current component to Zephr design system conventions. Make every change below.

**1. Replace raw HTML controls**
Swap every raw `<button>`, `<input>`, `<select>`, `<textarea>`, `<dialog>` with its Zephr equivalent:
- `<button>` → `<Button variant="..." size="...">` from `@zephrui/ui-react`
- `<input>` → `<Input>` wrapped in `<FormField>`
- `<select>` → `<Select>` wrapped in `<FormField>`
- `<textarea>` → `<Textarea>` wrapped in `<FormField>`
- `<dialog>` / custom modal → `<ModalDialog>` or `<Sheet>`

**2. Fix all imports**
All UI components must import from `@zephrui/ui-react`. Remove any component-level path imports. Ensure a single named import line.

**3. Token replacement**
Replace all hardcoded colors, spacing, and typography values with `--z-*` CSS custom properties. See `token-check` for the full mapping.

**4. FormField wrapping**
Every labeled input needs `<FormField label="..." htmlFor="...">` wrapping. Add hint and error props where appropriate (even if empty for now).

**5. Prop API alignment**
- Buttons: use `variant` (primary/secondary/ghost/danger), `size` (sm/md/lg), `loading`, `disabled`
- Badges: use `color`, `variant` (filled/lighter/stroke), `type` (basic/dot)
- Alerts: use `status` (info/success/warning/error), not `type` or `severity`
- DataTable: `columns` must be typed as `Array<{id: string, header: string, cell: (row) => ReactNode}>`

**6. Layout pattern**
If the component is a full page or panel, wrap it in `<LayoutShell>` with `<SidebarNav>`. Don't build custom sidebar scaffolding.

**Output**
Apply all changes directly. Summarize what was normalized.
