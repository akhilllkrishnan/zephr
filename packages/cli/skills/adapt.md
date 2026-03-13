---
description: Adapt a component or layout for a different device or context
---

Adapt the current component for the context specified in $ARGUMENTS. If no context is provided, default to `mobile`.

**Supported contexts:**
- `mobile` — small-screen layout with touch-optimized targets
- `tablet` — intermediate breakpoint treatment
- `dark` — dark mode token mapping
- `print` — paper-optimized layout, strip interactivity
- `email` — inline table-based layout for email clients

---

**`/adapt mobile`**

Apply these rules in order:

1. **Layout**
   - Replace multi-column grids with single-column stacks (`flex-direction: column`)
   - Sidebar nav collapses to a bottom tab bar or hamburger drawer — use `SidebarNav` mobile prop if available
   - Horizontal `<Tabs>` scrolls rather than wrapping
   - Data tables switch to card-per-row layout on screens < 640px

2. **Touch targets**
   - All interactive elements must be ≥ 44px tall — increase Button size to `lg` if currently `sm`
   - Form inputs: `height: 48px`, `font-size: 16px` (prevents iOS zoom on focus)
   - Increase `Checkbox` and `Radio` hit area with padding, not size alone

3. **Typography**
   - Body: `--z-font-body-md` (do not increase — mobile is already denser)
   - Headings: drop one scale step. `h1` that was `displayLg` → `displaySm`
   - Line-length: `max-width: 100%` — remove desktop `max-width: 65ch` constraints

4. **Spacing**
   - Horizontal padding: `--z-space-4` (16px) on all page-level containers
   - Reduce section gaps from `--z-space-12` → `--z-space-8` (48px → 32px)
   - Remove excess card padding: `--z-space-4` inside cards (not `--z-space-6`)

5. **Navigation**
   - Sticky header: `position: sticky; top: 0; z-index: 100`
   - Remove hover-only disclosure patterns — use tap-to-expand accordions

6. **Wrap with responsive class or media query:**
```css
@media (max-width: 639px) {
  /* applied changes here */
}
```

---

**`/adapt tablet`**

- 2-column grid where desktop uses 3–4 columns
- Sidebar remains visible but collapses to icon-only mode (`collapsed` prop)
- Touch target rules from mobile apply (≥ 44px)
- Keep desktop typography scale

---

**`/adapt dark`**

Replace surface and text tokens with their dark counterparts:

| Light token | Dark equivalent |
|---|---|
| `--z-color-background-0` | `--z-color-background-950` |
| `--z-color-background-50` | `--z-color-background-900` |
| `--z-color-text-950` | `--z-color-text-50` |
| `--z-color-text-500` | `--z-color-text-400` |
| `--z-color-accent-500` | `--z-color-accent-400` |

Rules:
- Never use `filter: invert()` — replace tokens explicitly
- Borders: reduce opacity (`--z-color-border` → `--z-color-border-muted`) in dark
- Shadows: reduce shadow intensity — `--z-shadow-sm` in light → `none` or `--z-shadow-inset` in dark
- Illustrations or decorative images: wrap in `opacity: 0.85` to reduce glare
- Check all `--z-color-semantic-*` tokens have dark counterparts — red/green/yellow need reduced saturation in dark mode

---

**`/adapt print`**

Strip for paper:
- Remove: navigation, sidebar, buttons, tooltips, modals, toasts, interactive controls
- Remove: `box-shadow`, `border-radius` on major containers (flatten layout)
- Typography: body → 11pt, headings → 14–18pt, use system serif or sans-serif
- Colors: convert all semantic colors to grayscale unless ink printing is confirmed
- Page breaks: add `page-break-before: always` before major sections
- URLs: expand link text to show the href → `a::after { content: " (" attr(href) ")"; }`
- Tables: ensure all borders are 1px solid #000 (not variable tokens)
- Add `@media print { ... }` wrapper around all changes

---

**`/adapt email`**

Convert to email-safe structure:
- Replace all `<div>` layout with `<table cellpadding="0" cellspacing="0">` nested tables
- Replace all CSS custom properties with inline hex values (email clients don't support variables)
- Replace `display: flex` / `display: grid` with table cell alignment
- Max width: 600px centered table
- Fonts: specify full stack `font-family: -apple-system, Helvetica, Arial, sans-serif`
- Images: explicit `width` and `height` attributes on all `<img>` tags
- Links: full absolute URLs only
- Buttons: table-based, not `<button>` elements
- Background colors: on `<td>` elements, not `<div>`
- Remove all JavaScript, event handlers, hover states

Output plain HTML — no React, no JSX. The result should paste directly into an ESP template.

---

**Output**

Apply changes directly to the current file. Add a comment block at the top of any new `@media` rules explaining which context they target.
