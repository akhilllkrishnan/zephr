# AGENTS

## Zephr usage policy
- Style pack: `notion` · Accent: `#2563eb`
- Import all UI components from `@zephrui/ui-react`.
- Never emit raw `<button>`, `<input>`, `<select>`, `<textarea>`, or `<dialog>` when an equivalent Zephr component exists.
- Never hardcode colors — use `var(--z-color-*)` tokens.
- Always wrap labeled inputs in `<FormField>`.
- For any data list / table view, use `DataTable` + `SearchBox` + `FiltersBar`.
- For slide-over panels, use `<Sheet>`. For modals, use `<ModalDialog>`.
- For page layout, use `<LayoutShell>` with `<SidebarNav>` — do not build custom sidebar scaffolding.

## Available components (import from `@zephrui/ui-react`)

Atoms: Button, Input, Textarea, Select, Checkbox, Radio, Switch, Badge, Avatar, Logo, Progress, Skeleton, Slider
Molecules: FormField, SearchBox, Tabs, Dropdown, Alert, Toast, CommandBar, Pagination, Tooltip, Accordion, DatePicker, ButtonGroup, TagInput, NumberInput
Organisms: Navbar, SidebarNav, LayoutShell, DataTable, FiltersBar, ModalDialog, Sheet, SearchResultsPanel
Layout: Stack, Grid, Box, Spacer

## Key prop signatures
```ts
Button: variant='primary'|'secondary'|'ghost'|'danger', size='sm'|'md'|'lg', loading?, disabled?
Badge: color='gray'|'blue'|'green'|'red'|'orange'|'purple'|'teal'|'sky'|'pink'|'yellow', variant='filled'|'lighter'|'stroke', type='basic'|'dot'
DataTable: columns=[{id, header, cell:(row)=>ReactNode}], rows=[...], onRowClick?
Tabs: items=[{id,label}], activeId, onChange
ModalDialog: open, onClose, title, children, footer?
Sheet: open, onClose, title, children
LayoutShell: sidebar, navbar?, children
SidebarNav: items=[{id,label,icon?,href?}], activeId
FormField: label, hint?, error?, htmlFor, children
Alert: status='info'|'success'|'warning'|'error', title, children?
```
