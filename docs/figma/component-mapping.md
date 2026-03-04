# Zephyr Figma Mapping

## Token Sync

- Source: `@zephyr/core` style packs and tokens
- Export: `figma/variables.generated.json` via `pnpm figma:export`
- Figma Variables groups:
  - `Color/*`
  - `Space/*`
  - `Radius/*`
  - `Shadow/*`
  - `Type/Size/*`

## Component Parity (v1)

1. Button
2. Input
3. Badge
4. SearchBox
5. Navbar
6. DataTable
7. ModalDialog

## Guidance

- Keep prop names aligned between Figma variants and React props.
- Do not fork component APIs per style pack.
- Theme variation should route through token selection only.
