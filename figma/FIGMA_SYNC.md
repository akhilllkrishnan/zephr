# Figma Sync Pipeline

How to export Figma tokens and apply them to the Zephyr design system.

---

## Overview

Zephyr uses a **token-first** approach: all component styles are driven by CSS variables that flow from style pack tokens. The Figma sync pipeline bridges the gap between Figma Variables (source of truth for the design team) and the `@zephyr/core` token definitions consumed by the component library.

```
Figma Variables
      ↓  Export JSON
figma/tokens.json
      ↓  node scripts/export-figma-tokens.js
packages/core/src/tokens/figma-export.ts  (snapshot — review before committing)
      ↓  Manual review + cherry-pick
packages/core/src/packs/*.ts             (authoritative style pack files)
      ↓  generateCssVariables()
:root { --z-color-primary: ...; }
      ↓
Components (inline styles using CSS variables)
```

---

## Step-by-Step Export Process

### 1. Export tokens from Figma

1. Open the Figma file containing the design system.
2. Press **Ctrl/Cmd + /** → search "Variables".
3. In the Variables panel, click the **Export** icon (⬇) in the top-right.
4. Choose **JSON** format. Figma exports a W3C Design Token-compatible file.
5. Save the file to **`figma/tokens.json`** at the repo root. (Overwrite the existing file.)

> [!TIP]
> If your Figma file uses the **Figma Variables REST API** or a plugin like **Token Studio**, the exported JSON format may differ slightly. The export script handles both W3C `$value`-style and plain-value Style Dictionary formats automatically.

---

### 2. Run the export script

```bash
# Dry run — prints the mapped tokens to stdout, writes nothing
node scripts/export-figma-tokens.js --dry-run

# Normal run — writes packages/core/src/tokens/figma-export.ts
node scripts/export-figma-tokens.js

# Or via the root package.json script
pnpm figma:export
```

The script outputs two sections:

- **`figmaTokens`** — tokens that were automatically mapped to Zephyr token paths.
- **`unmappedFigmaTokens`** — tokens that couldn't be auto-mapped (e.g. custom component-level tokens). These need manual review.

---

### 3. Review the generated snapshot

```bash
git diff packages/core/src/tokens/figma-export.ts
```

The snapshot file is intentionally kept separate from the authoritative style pack files so that a bad Figma export can never break a production build. **Never import `figma-export.ts` from production code.**

---

### 4. Apply changes to style packs

Style pack definitions live in `packages/core/src/packs/`. Each file exports a typed `StylePack` object with `color`, `colorDark`, `space`, `radius`, `shadow`, `type`, and `motion` sections.

Cherry-pick the mapped tokens from `figma-export.ts` into the appropriate style pack file(s). Typical workflow:

```bash
# Open the Studio pack alongside the snapshot
code packages/core/src/packs/studio.ts packages/core/src/tokens/figma-export.ts
```

> [!IMPORTANT]
> Always add `colorDark` when updating `color` — dark mode is a first-class requirement. See Section 13.4 in `PROJECT_HANDOFF.md`.

---

### 5. Build and verify

```bash
corepack pnpm --filter @zephyr/core build
corepack pnpm release:check
```

---

## Token Naming Convention

All Zephyr CSS variables follow the `--z-<category>-<name>` pattern:

| Category | Prefix | Example |
|---|---|---|
| Color | `--z-color-` | `--z-color-primary` |
| Space / Spacing | `--z-space-` | `--z-space-4` |
| Border radius | `--z-radius-` | `--z-radius-md` |
| Shadow | `--z-shadow-` | `--z-shadow-sm` |
| Typography | `--z-type-` | `--z-type-font-family-base` |
| Motion | `--z-motion-` | `--z-motion-duration-fast` |

### Figma → Zephyr key mapping

The export script applies the following automatic mappings:

| Figma key pattern | Zephyr token path |
|---|---|
| `color.background` | `color.background` |
| `color.primary` | `color.primary` |
| `color.text` | `color.text` |
| `color.border` | `color.border` |
| `spacing.*` | `space.*` |
| `borderRadius.*` | `radius.*` |
| `fontFamily.*` | `type.fontFamily.*` |
| `fontSize.*` | `type.fontSize.*` |
| `shadow.*` | `shadow.*` |
| `duration.*` | `motion.duration.*` |
| `easing.*` | `motion.easing.*` |

Tokens that don't match any pattern appear in `unmappedFigmaTokens` and require manual mapping.

---

## Notes & Known Gaps

- **Typography tokens** — Figma's font weight values (e.g. `"Medium"`) may need to be converted to numeric values (`500`) before use in CSS.
- **Composite shadow tokens** — Figma exports shadow as `{ color, blur, spread, x, y }`. The script currently passes the `$value` string directly; you may need to convert it to a CSS `box-shadow` shorthand.
- **Semantic aliases** — The `semanticAliases` config in `zephyr.config.ts` lets you remap token paths (e.g. `"color.page": "color.background"`). Figma-sourced color names may need aliasing here.
