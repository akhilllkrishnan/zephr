---
description: Assemble a layout from Zephr components based on a description
---

Build a React component using Zephr UI based on the description in "$ARGUMENTS".

**How to interpret the description:**
- Identify the data shape (what is being shown)
- Identify the actions (what the user can do)
- Identify the layout (card, table, list, form, split panel, etc.)
- Match each element to the correct Zephr component

**Zephr component selection rules:**

Use `<DataTable>` when: rows of structured data, sortable, selectable, filterable
Use `<Card>` when: a contained unit of information with clear boundaries
Use `<FormField>` + `<Input/Select/Switch>` when: user needs to input or configure values
Use `<ModalDialog>` when: a focused, blocking interaction (confirm, create, edit)
Use `<Sheet>` when: a side panel for detail view or secondary configuration
Use `<Tabs>` when: switching between distinct views of the same context
Use `<Alert>` when: surfacing status, warnings, or confirmations in-line
Use `<Badge>` when: showing status, category, or count on a data item
Use `<CommandBar>` when: keyboard-driven search or command input
Use `<Accordion>` when: progressive disclosure of dense content
Use `<LayoutShell>` + `<SidebarNav>` when: multi-section app layout with navigation

**Generation rules:**
1. All components import from `@zephrui/ui-react`
2. All values use `--z-color-*`, `--z-space-*`, `--z-font-*` tokens — no hardcoded values
3. Use `useState` for interaction (active tab, open modal, form values, etc.)
4. Include realistic placeholder data
5. Handle loading, empty, and error states where the component needs data
6. All action buttons must be wired to handlers (even if the handler is a console.log placeholder clearly labeled as such)
7. The output must be a copy-paste-ready, working React component

**Output format:**
Single `.tsx` file with a named export. Include the import block at the top.

If $ARGUMENTS is empty or unclear, ask for a description of what to build.
