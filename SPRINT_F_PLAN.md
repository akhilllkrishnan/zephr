# Zephr — Sprint F: Foundation
**Status:** Ready to execute
**Author:** Owner + Claude synthesis (March 5, 2026)
**For:** Any AI agent (Claude Code, Codex, Cursor, Gemini) picking up this work

---

## What This Project Is

Zephr is a CSS-custom-properties-native React UI component library — a zero-config replacement for Tailwind + shadcn targeting vibe coders (AI-assisted developers). It is a monorepo managed with pnpm workspaces + Turborepo.

**Key constraint:** No Tailwind. Ever. All styling is done through CSS custom properties with a `--z-*` namespace.

---

## Monorepo Layout

```
/Users/akhilkrishnan/Documents/Design System Library/
├── apps/
│   ├── docs-playground/        ← The docs site + component explorer (Vite + React)
│   └── audit/                  ← Standalone UX scanner app (Vite + React)
├── packages/
│   ├── core/                   ← Token system, style pack definitions, CSS compiler
│   │   └── src/
│   │       ├── types.ts        ← StylePackName type, DesignTokens interface
│   │       ├── stylePacks.ts   ← Current style pack JS objects (to be migrated)
│   │       ├── tokens.ts       ← resolveConfig(), resolveTokens()
│   │       └── compiler.ts     ← generateCssVariables() — flattens tokens to CSS string
│   ├── ui-react/               ← The published component library
│   │   └── src/
│   │       ├── atoms/          ← Button, Input, Badge, etc.
│   │       ├── molecules/      ← Navbar, DataTable, etc.
│   │       ├── organisms/      ← Complex multi-part components
│   │       ├── templates/      ← Full page templates
│   │       └── themes/         ← *** DOES NOT EXIST YET — Sprint F creates this ***
│   ├── ai-registry/            ← Component registry used by docs + CLI
│   └── cloud-sdk/              ← API client types
└── pnpm-workspace.yaml
```

**Dev server commands** (run from monorepo root):
```bash
corepack pnpm --filter @zephrui/docs-playground dev --host 127.0.0.1 --port 4172
corepack pnpm --filter @zephrui/audit dev --host 127.0.0.1 --port 4175
```

**Typecheck:**
```bash
node_modules/.bin/tsc -p apps/docs-playground/tsconfig.json --noEmit
node_modules/.bin/tsc -p apps/audit/tsconfig.json --noEmit
```

---

## Current State (What Exists Today)

### Token system — BROKEN for the goal
- `packages/core/src/types.ts` defines `StylePackName` as the OLD six names:
  `"Studio" | "Editorial" | "NeoBrutal" | "SoftTech" | "Enterprise" | "Clarity"`
- `packages/core/src/stylePacks.ts` defines these as JS objects with flat colour keys
  (e.g., `color.background`, `color.surface`, `color.primary`) — not the `--z-*` semantic structure we need
- `packages/core/src/compiler.ts` → `generateCssVariables()` flattens the JS object to a CSS string like:
  `--z-color-background: #f7f8fb; --z-color-surface: #ffffff;` etc.
- `packages/ui-react/src/themes/` — **does not exist**

### Docs playground — BROKEN for the goal
- `apps/docs-playground/src/styles.css` (~4234 lines) contains **raw hex values** for colours, spacing, radii throughout — it does NOT consume `--z-*` tokens
- The playground injects theme CSS at runtime via `generateCssVariables()` into a `<style>` tag (id=`zephr-docs-playground-theme`), which updates component previews BUT NOT the playground's own chrome (header, sidebar, nav, buttons)
- `apps/docs-playground/src/App.tsx` line ~694: `themeCss()` function calls `generateCssVariables()` and returns a string that gets injected into the `<style>` tag — this is what needs to become a `<link>` swap
- The current style switcher UI is in the left sidebar (`surfaceStyle` state: `"flat" | "shadow"`)

### What the `--z-*` variables currently look like (from generateCssVariables output)
```css
--z-color-background: #f7f8fb;
--z-color-surface: #ffffff;
--z-color-text: #111827;
--z-color-muted: #6b7280;
--z-color-primary: #121212;
--z-color-primaryContrast: #ffffff;
--z-color-accent: #f97316;
--z-color-border: #e5e7eb;
--z-color-success: #059669;
--z-color-danger: #dc2626;
--z-space-0: 0; --z-space-1: 0.25rem; /* ... */
--z-radius-none: 0; --z-radius-sm: 0.25rem; /* ... */
--z-shadow-none: none; --z-shadow-sm: 0 1px 2px rgba(0,0,0,0.08); /* ... */
--z-type-size-xs: 0.75rem; /* ... */
[data-theme="dark"] { --z-color-background: #0f1117; /* ... */ }
```

---

## Sprint F: 5 Tasks

Sprint F transforms the token system from "JS-generated-at-runtime" to "CSS-file-loaded-at-mount" and makes the docs playground consume its own tokens.

Complete tasks in order. Each has a "done" checklist to verify before moving on.

---

## Task 1 — Rename `StylePackName` to the four new packs

**Files to change:**
1. `packages/core/src/types.ts`
2. `packages/core/src/stylePacks.ts`
3. `packages/core/src/tokens.ts` (the `resolveStylePackName` fallback)
4. `apps/docs-playground/src/App.tsx` (every reference to old pack names)

### 1a. `packages/core/src/types.ts`

Replace:
```typescript
export type StylePackName =
  | "Studio"
  | "Editorial"
  | "NeoBrutal"
  | "SoftTech"
  | "Enterprise"
  | "Clarity";
```

With:
```typescript
export type StylePackName =
  | "notion"
  | "stripe"
  | "linear"
  | "framer";
```

### 1b. `packages/core/src/stylePacks.ts`

The `stylePacks` record currently has keys `Studio`, `Editorial`, `NeoBrutal`, `SoftTech`, `Enterprise`, `Clarity`. Replace with four packs. The JS objects remain (they're still used by `generateCssVariables` for programmatic/SSR use). Keep the same token shape, update the colour values:

```typescript
export const stylePacks: Record<StylePackName, DesignTokens> = {
  notion: createPack(
    {
      background: "#f7f6f3",    // warm white, Notion signature
      surface: "#ffffff",
      text: "#1a1a1a",
      muted: "#787774",
      primary: "#2382e2",
      primaryContrast: "#ffffff",
      accent: "#2382e2",
      border: "#e9e9e7",
      success: "#0f7b6c",
      danger: "#d44c47"
    },
    {
      background: "#191919",
      surface: "#252525",
      text: "#f0efed",
      muted: "#9b9b9b",
      primary: "#4a9eed",
      primaryContrast: "#ffffff",
      accent: "#4a9eed",
      border: "#373737",
      success: "#4d9e7f",
      danger: "#e06c75"
    }
  ),
  stripe: createPack(
    {
      background: "#f6f9fc",
      surface: "#ffffff",
      text: "#1a1f36",
      muted: "#697386",
      primary: "#635bff",
      primaryContrast: "#ffffff",
      accent: "#635bff",
      border: "#e3e8ef",
      success: "#1ea672",
      danger: "#df1b41"
    },
    {
      background: "#0d1117",
      surface: "#161b22",
      text: "#f0f6fc",
      muted: "#8b949e",
      primary: "#7b74ff",
      primaryContrast: "#ffffff",
      accent: "#7b74ff",
      border: "#30363d",
      success: "#3fb950",
      danger: "#f85149"
    }
  ),
  linear: createPack(
    {
      background: "#f4f4f5",
      surface: "#ffffff",
      text: "#09090b",
      muted: "#71717a",
      primary: "#5e6ad2",
      primaryContrast: "#ffffff",
      accent: "#5e6ad2",
      border: "#e4e4e7",
      success: "#16a34a",
      danger: "#dc2626"
    },
    {
      background: "#09090b",
      surface: "#18181b",
      text: "#fafafa",
      muted: "#71717a",
      primary: "#7c86e0",
      primaryContrast: "#ffffff",
      accent: "#7c86e0",
      border: "#27272a",
      success: "#22c55e",
      danger: "#ef4444"
    }
  ),
  framer: createPack(
    {
      background: "#f0f0f0",
      surface: "#ffffff",
      text: "#0d0d0d",
      muted: "#666666",
      primary: "#0055ff",
      primaryContrast: "#ffffff",
      accent: "#0055ff",
      border: "#dedede",
      success: "#00a878",
      danger: "#ff3333"
    },
    {
      background: "#111111",
      surface: "#1c1c1c",
      text: "#f5f5f5",
      muted: "#999999",
      primary: "#3377ff",
      primaryContrast: "#ffffff",
      accent: "#3377ff",
      border: "#2e2e2e",
      success: "#00d4a0",
      danger: "#ff5555"
    }
  )
};
```

Also update the `radius` and `shadow` tokens per pack since these define the visual signature. Add overrides inside each `createPack` call by replacing `baseRadius` and `baseShadow`:

```typescript
// In createPack signature, allow optional overrides:
function createPack(
  color: DesignTokens["color"],
  colorDark?: DesignTokens["colorDark"],
  radiusOverrides?: Partial<typeof baseRadius>,
  shadowOverrides?: Partial<typeof baseShadow>
): DesignTokens {
  return {
    color,
    ...(colorDark ? { colorDark } : {}),
    type: { ...baseTypography },
    space: { ...baseSpace },
    radius: { ...baseRadius, ...radiusOverrides },
    shadow: { ...baseShadow, ...shadowOverrides },
    motion: { ...baseMotion },
    breakpoints: { ...baseBreakpoints }
  };
}
```

Then pass overrides:
- `notion`: `{ radius: { sm: "0.25rem", md: "0.35rem", lg: "0.5rem" } }`, shadow all `"none"`
- `stripe`: `{ radius: { sm: "0.375rem", md: "0.5rem", lg: "0.75rem" } }`, default shadows
- `linear`: `{ radius: { sm: "0.25rem", md: "0.375rem", lg: "0.5rem" } }`, default shadows
- `framer`: `{ radius: { sm: "0.5rem", md: "0.75rem", lg: "1rem" } }`, stronger shadows

### 1c. `packages/core/src/tokens.ts`

Change the fallback in `resolveStylePackName`:
```typescript
// Before:
return "Studio";
// After:
return "notion";
```

### 1d. `apps/docs-playground/src/App.tsx`

Search for every literal reference to old pack names and update:
- `"Studio"` → `"notion"` (including the `DEFAULT_STYLE_PACK` constant)
- `"Editorial"` → `"framer"`
- `"NeoBrutal"` → `"notion"` (drop it — no equivalent)
- `"SoftTech"` → `"stripe"`
- `"Enterprise"` → `"linear"`
- `"Clarity"` → `"linear"` (drop it — no equivalent)

Search for these with:
```bash
grep -n '"Studio"\|"Editorial"\|"NeoBrutal"\|"SoftTech"\|"Enterprise"\|"Clarity"' apps/docs-playground/src/App.tsx
```

Also update any `<option>` labels in the style switcher select to show `Notion`, `Stripe`, `Linear`, `Framer`.

**Done when:**
- `node_modules/.bin/tsc -p apps/docs-playground/tsconfig.json --noEmit` → zero errors
- No old pack name strings remain in `App.tsx`, `types.ts`, `stylePacks.ts`, `tokens.ts`

---

## Task 2 — Create the four theme CSS files

Create the directory and four files:

```
packages/ui-react/src/themes/
  notion.css
  stripe.css
  linear.css
  framer.css
```

Each file is a `:root {}` block (plus `[data-theme="dark"] {}` block) that defines every `--z-*` token the playground and components consume. These files are the source of truth for each theme — they replace the JS objects for runtime browser use.

### Token naming contract

The CSS variables must match exactly what `generateCssVariables()` currently outputs, because components already reference these names. The current output shape (prefix `z`, group `color`):

```
--z-color-background
--z-color-surface
--z-color-text
--z-color-muted
--z-color-primary
--z-color-primaryContrast
--z-color-accent
--z-color-border
--z-color-success
--z-color-danger
--z-space-0 through --z-space-12
--z-radius-none, -sm, -md, -lg, -xl, -pill
--z-shadow-none, -sm, -md, -lg
--z-type-size-xs through -3xl
--z-type-weight-regular, -medium, -semibold, -bold
--z-type-line-tight, -normal, -relaxed
--z-motion-duration-fast, -normal, -slow
--z-motion-easing-standard, -expressive, -calm
```

### `packages/ui-react/src/themes/notion.css`

```css
/* Notion theme — warm white, flat, no shadows, Inter */
:root {
  /* Colour */
  --z-color-background:       #f7f6f3;
  --z-color-surface:          #ffffff;
  --z-color-text:             #1a1a1a;
  --z-color-muted:            #787774;
  --z-color-primary:          #2382e2;
  --z-color-primaryContrast:  #ffffff;
  --z-color-accent:           #2382e2;
  --z-color-border:           #e9e9e7;
  --z-color-success:          #0f7b6c;
  --z-color-danger:           #d44c47;

  /* Radius — flat, tight */
  --z-radius-none:  0;
  --z-radius-sm:    0.25rem;
  --z-radius-md:    0.35rem;
  --z-radius-lg:    0.5rem;
  --z-radius-xl:    0.75rem;
  --z-radius-pill:  9999px;

  /* Shadow — none (flat aesthetic) */
  --z-shadow-none:  none;
  --z-shadow-sm:    none;
  --z-shadow-md:    none;
  --z-shadow-lg:    none;

  /* Typography */
  --z-type-family-sans:  'Inter', 'Segoe UI', sans-serif;
  --z-type-family-mono:  'JetBrains Mono', monospace;
  --z-type-size-xs:      0.75rem;
  --z-type-size-sm:      0.875rem;
  --z-type-size-md:      1rem;
  --z-type-size-lg:      1.125rem;
  --z-type-size-xl:      1.25rem;
  --z-type-size-2xl:     1.5rem;
  --z-type-size-3xl:     1.875rem;
  --z-type-weight-regular:   400;
  --z-type-weight-medium:    500;
  --z-type-weight-semibold:  600;
  --z-type-weight-bold:      700;
  --z-type-line-tight:    1.2;
  --z-type-line-normal:   1.5;
  --z-type-line-relaxed:  1.7;

  /* Space */
  --z-space-0:   0;
  --z-space-1:   0.25rem;
  --z-space-2:   0.5rem;
  --z-space-3:   0.75rem;
  --z-space-4:   1rem;
  --z-space-5:   1.25rem;
  --z-space-6:   1.5rem;
  --z-space-8:   2rem;
  --z-space-10:  2.5rem;
  --z-space-12:  3rem;

  /* Motion */
  --z-motion-duration-fast:    120ms;
  --z-motion-duration-normal:  180ms;
  --z-motion-duration-slow:    280ms;
  --z-motion-easing-standard:   cubic-bezier(0.2, 0, 0, 1);
  --z-motion-easing-expressive: cubic-bezier(0.34, 1.56, 0.64, 1);
  --z-motion-easing-calm:       cubic-bezier(0.16, 1, 0.3, 1);
}

[data-theme="dark"] {
  --z-color-background:       #191919;
  --z-color-surface:          #252525;
  --z-color-text:             #f0efed;
  --z-color-muted:            #9b9b9b;
  --z-color-primary:          #4a9eed;
  --z-color-primaryContrast:  #ffffff;
  --z-color-accent:           #4a9eed;
  --z-color-border:           #373737;
  --z-color-success:          #4d9e7f;
  --z-color-danger:           #e06c75;
}
```

### `packages/ui-react/src/themes/stripe.css`

```css
/* Stripe theme — soft elevation, blue accent, generous radii */
:root {
  --z-color-background:       #f6f9fc;
  --z-color-surface:          #ffffff;
  --z-color-text:             #1a1f36;
  --z-color-muted:            #697386;
  --z-color-primary:          #635bff;
  --z-color-primaryContrast:  #ffffff;
  --z-color-accent:           #635bff;
  --z-color-border:           #e3e8ef;
  --z-color-success:          #1ea672;
  --z-color-danger:           #df1b41;

  --z-radius-none:  0;
  --z-radius-sm:    0.375rem;
  --z-radius-md:    0.5rem;
  --z-radius-lg:    0.75rem;
  --z-radius-xl:    1rem;
  --z-radius-pill:  9999px;

  --z-shadow-none:  none;
  --z-shadow-sm:    0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
  --z-shadow-md:    0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04);
  --z-shadow-lg:    0 12px 32px rgba(0,0,0,0.10), 0 4px 8px rgba(0,0,0,0.06);

  --z-type-family-sans:  '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', sans-serif;
  --z-type-family-mono:  'JetBrains Mono', monospace;
  --z-type-size-xs:      0.75rem;
  --z-type-size-sm:      0.875rem;
  --z-type-size-md:      1rem;
  --z-type-size-lg:      1.125rem;
  --z-type-size-xl:      1.25rem;
  --z-type-size-2xl:     1.5rem;
  --z-type-size-3xl:     1.875rem;
  --z-type-weight-regular:   400;
  --z-type-weight-medium:    500;
  --z-type-weight-semibold:  600;
  --z-type-weight-bold:      700;
  --z-type-line-tight:    1.2;
  --z-type-line-normal:   1.5;
  --z-type-line-relaxed:  1.7;

  --z-space-0:   0;
  --z-space-1:   0.25rem;
  --z-space-2:   0.5rem;
  --z-space-3:   0.75rem;
  --z-space-4:   1rem;
  --z-space-5:   1.25rem;
  --z-space-6:   1.5rem;
  --z-space-8:   2rem;
  --z-space-10:  2.5rem;
  --z-space-12:  3rem;

  --z-motion-duration-fast:    120ms;
  --z-motion-duration-normal:  180ms;
  --z-motion-duration-slow:    280ms;
  --z-motion-easing-standard:   cubic-bezier(0.2, 0, 0, 1);
  --z-motion-easing-expressive: cubic-bezier(0.34, 1.56, 0.64, 1);
  --z-motion-easing-calm:       cubic-bezier(0.16, 1, 0.3, 1);
}

[data-theme="dark"] {
  --z-color-background:       #0d1117;
  --z-color-surface:          #161b22;
  --z-color-text:             #f0f6fc;
  --z-color-muted:            #8b949e;
  --z-color-primary:          #7b74ff;
  --z-color-primaryContrast:  #ffffff;
  --z-color-accent:           #7b74ff;
  --z-color-border:           #30363d;
  --z-color-success:          #3fb950;
  --z-color-danger:           #f85149;
}
```

### `packages/ui-react/src/themes/linear.css`

```css
/* Linear theme — compact, data-dense, 6px radius, mono details */
:root {
  --z-color-background:       #f4f4f5;
  --z-color-surface:          #ffffff;
  --z-color-text:             #09090b;
  --z-color-muted:            #71717a;
  --z-color-primary:          #5e6ad2;
  --z-color-primaryContrast:  #ffffff;
  --z-color-accent:           #5e6ad2;
  --z-color-border:           #e4e4e7;
  --z-color-success:          #16a34a;
  --z-color-danger:           #dc2626;

  --z-radius-none:  0;
  --z-radius-sm:    0.25rem;
  --z-radius-md:    0.375rem;
  --z-radius-lg:    0.5rem;
  --z-radius-xl:    0.75rem;
  --z-radius-pill:  9999px;

  --z-shadow-none:  none;
  --z-shadow-sm:    0 1px 2px rgba(0,0,0,0.07);
  --z-shadow-md:    0 4px 10px rgba(0,0,0,0.09);
  --z-shadow-lg:    0 10px 28px rgba(0,0,0,0.11);

  --z-type-family-sans:  'Inter', 'Segoe UI', sans-serif;
  --z-type-family-mono:  'JetBrains Mono', 'SF Mono', monospace;
  --z-type-size-xs:      0.72rem;
  --z-type-size-sm:      0.82rem;
  --z-type-size-md:      0.9rem;
  --z-type-size-lg:      1rem;
  --z-type-size-xl:      1.125rem;
  --z-type-size-2xl:     1.375rem;
  --z-type-size-3xl:     1.75rem;
  --z-type-weight-regular:   400;
  --z-type-weight-medium:    500;
  --z-type-weight-semibold:  600;
  --z-type-weight-bold:      700;
  --z-type-line-tight:    1.2;
  --z-type-line-normal:   1.45;
  --z-type-line-relaxed:  1.65;

  --z-space-0:   0;
  --z-space-1:   0.2rem;
  --z-space-2:   0.4rem;
  --z-space-3:   0.6rem;
  --z-space-4:   0.875rem;
  --z-space-5:   1.1rem;
  --z-space-6:   1.375rem;
  --z-space-8:   1.75rem;
  --z-space-10:  2.25rem;
  --z-space-12:  2.75rem;

  --z-motion-duration-fast:    100ms;
  --z-motion-duration-normal:  150ms;
  --z-motion-duration-slow:    240ms;
  --z-motion-easing-standard:   cubic-bezier(0.2, 0, 0, 1);
  --z-motion-easing-expressive: cubic-bezier(0.34, 1.56, 0.64, 1);
  --z-motion-easing-calm:       cubic-bezier(0.16, 1, 0.3, 1);
}

[data-theme="dark"] {
  --z-color-background:       #09090b;
  --z-color-surface:          #18181b;
  --z-color-text:             #fafafa;
  --z-color-muted:            #71717a;
  --z-color-primary:          #7c86e0;
  --z-color-primaryContrast:  #ffffff;
  --z-color-accent:           #7c86e0;
  --z-color-border:           #27272a;
  --z-color-success:          #22c55e;
  --z-color-danger:           #ef4444;
}
```

### `packages/ui-react/src/themes/framer.css`

```css
/* Framer theme — editorial, large type delta, expressive contrast */
:root {
  --z-color-background:       #f0f0f0;
  --z-color-surface:          #ffffff;
  --z-color-text:             #0d0d0d;
  --z-color-muted:            #666666;
  --z-color-primary:          #0055ff;
  --z-color-primaryContrast:  #ffffff;
  --z-color-accent:           #0055ff;
  --z-color-border:           #dedede;
  --z-color-success:          #00a878;
  --z-color-danger:           #ff3333;

  --z-radius-none:  0;
  --z-radius-sm:    0.5rem;
  --z-radius-md:    0.75rem;
  --z-radius-lg:    1rem;
  --z-radius-xl:    1.25rem;
  --z-radius-pill:  9999px;

  --z-shadow-none:  none;
  --z-shadow-sm:    0 2px 6px rgba(0,0,0,0.10);
  --z-shadow-md:    0 8px 20px rgba(0,0,0,0.12);
  --z-shadow-lg:    0 20px 48px rgba(0,0,0,0.14);

  --z-type-family-sans:  'Inter', 'Helvetica Neue', sans-serif;
  --z-type-family-mono:  'JetBrains Mono', monospace;
  --z-type-size-xs:      0.75rem;
  --z-type-size-sm:      0.875rem;
  --z-type-size-md:      1rem;
  --z-type-size-lg:      1.25rem;
  --z-type-size-xl:      1.5rem;
  --z-type-size-2xl:     2rem;
  --z-type-size-3xl:     2.5rem;
  --z-type-weight-regular:   400;
  --z-type-weight-medium:    500;
  --z-type-weight-semibold:  600;
  --z-type-weight-bold:      800;
  --z-type-line-tight:    1.15;
  --z-type-line-normal:   1.55;
  --z-type-line-relaxed:  1.75;

  --z-space-0:   0;
  --z-space-1:   0.25rem;
  --z-space-2:   0.5rem;
  --z-space-3:   0.75rem;
  --z-space-4:   1rem;
  --z-space-5:   1.5rem;
  --z-space-6:   2rem;
  --z-space-8:   2.5rem;
  --z-space-10:  3rem;
  --z-space-12:  4rem;

  --z-motion-duration-fast:    140ms;
  --z-motion-duration-normal:  220ms;
  --z-motion-duration-slow:    340ms;
  --z-motion-easing-standard:   cubic-bezier(0.2, 0, 0, 1);
  --z-motion-easing-expressive: cubic-bezier(0.34, 1.56, 0.64, 1);
  --z-motion-easing-calm:       cubic-bezier(0.16, 1, 0.3, 1);
}

[data-theme="dark"] {
  --z-color-background:       #111111;
  --z-color-surface:          #1c1c1c;
  --z-color-text:             #f5f5f5;
  --z-color-muted:            #999999;
  --z-color-primary:          #3377ff;
  --z-color-primaryContrast:  #ffffff;
  --z-color-accent:           #3377ff;
  --z-color-border:           #2e2e2e;
  --z-color-success:          #00d4a0;
  --z-color-danger:           #ff5555;
}
```

**Done when:**
- All four files exist at `packages/ui-react/src/themes/*.css`
- Each file has `:root {}` and `[data-theme="dark"] {}` blocks
- All `--z-*` variable names exactly match the output of `generateCssVariables()` (no new names, no renamed names)

---

## Task 3 — Wire the style switcher to CSS `<link>` swap

**Context:** Currently in `apps/docs-playground/src/App.tsx`:
- The `themeCss()` function (line ~694) builds a CSS string and injects it into a `<style>` tag
- The style choice is stored in `stylePack` state (currently `StylePackName`) and `surfaceStyle` ("flat" | "shadow")
- The `useEffect` at line ~3849 updates the `<style>` tag on every pack/accent change

**What to change:**

### 3a. Move theme files to be statically served

The four CSS files need to be accessible at a URL the browser can load. Copy them to the docs-playground's public directory:

```
apps/docs-playground/public/themes/notion.css
apps/docs-playground/public/themes/stripe.css
apps/docs-playground/public/themes/linear.css
apps/docs-playground/public/themes/framer.css
```

(These are copies of the files from `packages/ui-react/src/themes/`. In a build step, they would be copied automatically — for now, manual copy is fine.)

### 3b. Replace the `<style>` tag injection with a `<link>` swap

In `apps/docs-playground/src/App.tsx`, find the `useEffect` that sets `styleTag.textContent = scoped` and replace the entire theme injection mechanism:

```typescript
// Replace the existing theme useEffect with this:
const THEME_LINK_ID = "zephr-theme-pack";

useEffect(() => {
  // Remove old link if present
  const existing = document.getElementById(THEME_LINK_ID) as HTMLLinkElement | null;
  if (existing) existing.remove();

  // Inject new theme link
  const link = document.createElement("link");
  link.id = THEME_LINK_ID;
  link.rel = "stylesheet";
  link.href = `/themes/${stylePack}.css`;
  document.head.appendChild(link);
}, [stylePack]);
```

Keep `generateCssVariables()` and the accent colour injection separately — the accent override still needs to be a `<style>` tag because it's user-controlled at runtime:

```typescript
// Separate effect for accent colour (runtime override only):
const ACCENT_STYLE_ID = "zephr-accent-override";

useEffect(() => {
  const accentHex = accentColor;
  const contrast = accentTextColor(accentHex);

  let accentTag = document.getElementById(ACCENT_STYLE_ID) as HTMLStyleElement | null;
  if (!accentTag) {
    accentTag = document.createElement("style");
    accentTag.id = ACCENT_STYLE_ID;
    document.head.appendChild(accentTag);
  }

  accentTag.textContent = `:root {
    --z-color-primary: ${accentHex};
    --z-color-accent: ${accentHex};
    --z-color-primaryContrast: ${contrast};
  }
  [data-theme="dark"] {
    --z-color-primary: ${accentHex};
    --z-color-accent: ${accentHex};
    --z-color-primaryContrast: ${contrast};
  }`;
}, [accentColor]);
```

The `surfaceStyle` ("flat" | "shadow") toggle can be a third small effect that overrides shadow tokens:

```typescript
// Effect for flat/shadow surface toggle:
const SURFACE_STYLE_ID = "zephr-surface-override";

useEffect(() => {
  let tag = document.getElementById(SURFACE_STYLE_ID) as HTMLStyleElement | null;
  if (!tag) {
    tag = document.createElement("style");
    tag.id = SURFACE_STYLE_ID;
    document.head.appendChild(tag);
  }

  if (surfaceStyle === "flat") {
    tag.textContent = `:root {
      --z-shadow-none: none;
      --z-shadow-sm: none;
      --z-shadow-md: none;
      --z-shadow-lg: none;
    }`;
  } else {
    tag.textContent = ""; // let the theme file control shadows
  }
}, [surfaceStyle]);
```

**Done when:**
- Switching from `notion` to `stripe` in the sidebar reloads a CSS file (check Network tab — you should see `/themes/stripe.css` requested)
- The entire playground (header, sidebar, buttons, nav) changes visual style — not just component previews
- Accent colour picker still overrides the primary/accent variables

---

## Task 4 — Strip hex values from `styles.css` and add the alias bridge

**Context:** `apps/docs-playground/src/styles.css` is ~4234 lines. It contains hardcoded hex colours throughout that prevent style pack switching from fully re-theming the playground chrome.

**Goal:** Every colour reference in `styles.css` must resolve through a `--z-*` token. The only raw hex values allowed are in browser fallbacks.

### 4a. Add the token import at the top of `styles.css`

The playground's `main.tsx` imports `styles.css`. Styles.css should begin with:

```css
/* styles.css — structural/layout rules only. Colours resolve from --z-* tokens. */

/* ── Alias bridge (resolves from --z-* tokens, never defines hex) ── */
:root {
  --bg:     var(--z-color-background);
  --panel:  var(--z-color-surface);
  --text:   var(--z-color-text);
  --muted:  var(--z-color-muted);
  --line:   var(--z-color-border);
  --accent: var(--z-color-accent);
  --fg:     var(--z-color-text);

  /* Component shorthand aliases */
  --panel-soft: color-mix(in srgb, var(--z-color-surface) 60%, var(--z-color-background));
  --surface-active: color-mix(in srgb, var(--z-color-accent) 8%, transparent);
  --subtle: var(--z-color-muted);
  --radius-sm: var(--z-radius-sm);
  --radius-md: var(--z-radius-md);
  --radius-lg: var(--z-radius-lg);
}
```

### 4b. Replace hardcoded hex colours

Search for hex patterns (`#[0-9a-fA-F]{3,6}`) in `styles.css` and replace with the appropriate `--z-*` variable. Common mapping:

| Hex pattern | Replace with |
|---|---|
| White backgrounds `#fff`, `#ffffff` | `var(--panel)` |
| Off-white surfaces | `var(--bg)` |
| Dark text `#111`, `#1a1a1a`, `#09090b` | `var(--text)` |
| Grey muted `#666`, `#787774`, `#71717a` | `var(--muted)` |
| Border grey `#e5e5e5`, `#e9e9e7`, `#e4e4e7` | `var(--line)` |
| Accent/primary blue/purple | `var(--accent)` |
| Success green | `var(--z-color-success)` |
| Danger red | `var(--z-color-danger)` |
| Border radius values | `var(--radius-sm)` / `var(--radius-md)` |

**Do NOT replace:**
- Hex values inside `rgba()` for transparent overlays (e.g. `rgba(0,0,0,0.12)`) — keep as is
- Hex values in `ComponentThumbnail` SVGs (those are decorative, not theme-sensitive)
- Any `color-mix()` expressions that are already using tokens

**Approach:** Work section by section through `styles.css`. Use search-and-replace carefully. The file is large — focus on the most visible sections first:
1. Header/top bar styles
2. Sidebar/left rail styles
3. Tab and nav styles
4. Button and form element styles
5. Card and panel styles

**Done when:**
- Switching style pack makes the entire playground chrome change (not just previews)
- `grep -c "#[0-9a-fA-F]\{3,6\}" apps/docs-playground/src/styles.css` returns a much lower number (residual rgba values are OK)
- No `--bg:`, `--panel:`, `--text:` etc. definitions anywhere in `styles.css` except the alias bridge block at the top

---

## Task 5 — Generate `CLAUDE.md`, `AGENTS.md`, `llms.txt` from `zephr init`

**Context:** `packages/cli/src/index.ts` contains the CLI commands. The `init` command exists but does not yet generate AI context files.

**Goal:** After `npx zephr init`, the user's project root contains three files that make any AI agent automatically use Zephr components.

### Files to generate

#### `CLAUDE.md` (read automatically by Claude Code)

```markdown
# Zephr UI — Claude Instructions

This project uses **@zephrui/ui-react** for all UI components.

## Rules
- NEVER write raw `<button>`, `<input>`, `<a>`, `<div>` for UI elements — always use the Zephr equivalent
- NEVER write inline styles or CSS classes for visual styling — use Zephr component props
- ALWAYS import components from `@zephrui/ui-react` only
- For full-page layouts, use page templates from `@zephrui/ui-react/templates`

## Available components (import from `@zephrui/ui-react`)

### Atoms
Button, IconButton, Input, Textarea, Select, Checkbox, Radio, Switch, Badge, Avatar, Tooltip, Alert, Divider, Spinner, Progress, ColorPicker, DatePicker, RichEditor

### Molecules
Navbar, Sidebar, DataTable, Pagination, Accordion, Modal, Dropdown, CommandPalette, SearchBar, Card, Form, Tabs, Toast, EmptyState, SortableList

### Organisms
DashboardShell, AuthShell, SettingsShell, DataView, KanbanBoard, FileUploader, ActivityFeed, PricingTable, InvoiceBuilder, NotificationCenter

### Layout primitives
Stack, Grid, Box, Spacer

### Page templates
DashboardPage, AuthPage, SettingsPage, OnboardingPage, MarketingPage

## Active theme: {{STYLE_PACK}}
## Accent colour: {{ACCENT_COLOR}}

## Example usage
```tsx
import { Button, Stack, Input } from '@zephrui/ui-react';

function MyForm() {
  return (
    <Stack gap={4}>
      <Input label="Email" type="email" />
      <Button variant="primary">Submit</Button>
    </Stack>
  );
}
```

## Anti-patterns (never do these)
- `<button className="btn btn-primary">` ❌ → `<Button variant="primary">` ✓
- `<div style={{ display: 'flex', gap: 16 }}>` ❌ → `<Stack gap={4}>` ✓
- `import { Button } from './components/Button'` ❌ → `import { Button } from '@zephrui/ui-react'` ✓
```

#### `AGENTS.md` (read by Codex and Gemini agents)

Same content as `CLAUDE.md` — these files serve the same purpose for different agents.

#### `llms.txt` (web AI discovery standard)

```
# Zephr UI

> A zero-config React component library for vibe coders. Install once, never think about UI again.

## Install
npm install @zephrui/ui-react

## Import
All components from: @zephrui/ui-react
Never write raw HTML/CSS — use Zephr components.

## Component list
Button, IconButton, Input, Textarea, Select, Checkbox, Radio, Switch, Badge, Avatar, Tooltip, Alert, Divider, Spinner, Progress, ColorPicker, DatePicker, RichEditor, Navbar, Sidebar, DataTable, Pagination, Accordion, Modal, Dropdown, CommandPalette, SearchBar, Card, Form, Tabs, Toast, EmptyState, SortableList, DashboardShell, AuthShell, SettingsShell, DataView, KanbanBoard, FileUploader, ActivityFeed, PricingTable, InvoiceBuilder, NotificationCenter, Stack, Grid, Box, Spacer, DashboardPage, AuthPage, SettingsPage, OnboardingPage, MarketingPage

## Theme packs
notion (free), stripe (pro), linear (pro), framer (pro)

## Registry
https://zephrui.com/registry/components.json
```

### Implementation in CLI

In `packages/cli/src/index.ts`, find the `init` command handler and add file generation:

```typescript
// In the init command:
import { writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const cwd = process.cwd();
const claudeMd = generateClaudeMd(resolvedConfig);
const agentsMd = claudeMd; // same content
const llmsTxt = generateLlmsTxt();

writeFileSync(join(cwd, "CLAUDE.md"), claudeMd);
writeFileSync(join(cwd, "AGENTS.md"), agentsMd);
writeFileSync(join(cwd, "llms.txt"), llmsTxt);

console.log("✓ Generated CLAUDE.md — Claude Code will now use Zephr automatically");
console.log("✓ Generated AGENTS.md — Codex and Gemini will now use Zephr automatically");
console.log("✓ Generated llms.txt — web AI discovery enabled");
```

**Done when:**
- Running `zephr init` in a test directory creates all three files
- `CLAUDE.md` lists all component names and has the anti-patterns section
- Template variables `{{STYLE_PACK}}` and `{{ACCENT_COLOR}}` are replaced with the actual configured values

---

## Verification Checklist (run after all 5 tasks)

```bash
# 1. Typecheck
node_modules/.bin/tsc -p apps/docs-playground/tsconfig.json --noEmit
# Expected: zero errors

# 2. No old pack names
grep -rn '"Studio"\|"Editorial"\|"NeoBrutal"\|"SoftTech"\|"Enterprise"\|"Clarity"' \
  packages/core/src/ apps/docs-playground/src/
# Expected: zero matches

# 3. Theme files exist
ls packages/ui-react/src/themes/
# Expected: notion.css  stripe.css  linear.css  framer.css

# 4. No raw hex in styles.css (only rgba() fallbacks should remain)
grep -c ":[[:space:]]*#[0-9a-fA-F]" apps/docs-playground/src/styles.css
# Expected: < 20 (down from ~300+)

# 5. Theme link swap works
# Start dev server, open browser devtools Network tab
# Switch style pack → should see /themes/stripe.css requested
# Full playground chrome should change appearance
```

---

## What NOT to Change

- **`generateCssVariables()`** in `packages/core/src/compiler.ts` — keep it, it's used for SSR and programmatic use
- **Component internals** — components already use `--z-*` variables; don't touch them
- **`apps/audit/`** — this app has its own token system, leave it
- **`pnpm-workspace.yaml`** — no changes needed
- **Any test files** — not in scope for Sprint F

---

## Architectural Principles (non-negotiable)

1. **No Tailwind** — ever, anywhere in the stack
2. **`--z-*` namespace** — all Zephr tokens use this prefix; user-facing aliases (--bg, --panel) must resolve FROM `--z-*`, never define raw values
3. **Theme packs are CSS files** — not JS objects injected at runtime
4. **Docs eats its own cooking** — playground uses the same tokens as any consumer would
5. **AI context files are P1** — `CLAUDE.md`, `AGENTS.md`, `llms.txt` are not optional extras

---

*This file is the source of truth for Sprint F. Other strategy documents: `PROJECT_HANDOFF.md` (full history), `MEMORY.md` (agent memory).*
