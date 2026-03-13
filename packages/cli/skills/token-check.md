---
description: Find every hardcoded value that should be a Zephr design token
---

Scan the current file for every hardcoded design value. For each one, show the correct Zephr CSS custom property replacement.

**Colors** — find `#`, `rgb(`, `rgba(`, `hsl(`, `oklch(` values that are not inside comments or strings used as data.

Map common values to tokens:
- White/near-white backgrounds → `var(--z-color-background-0)` or `var(--z-color-background-100)`
- Dark/near-black backgrounds → `var(--z-color-background-950)`
- Primary text → `var(--z-color-text-950)`
- Secondary/muted text → `var(--z-color-text-500)` or `var(--z-color-text-300)`
- Borders/dividers → `var(--z-color-stroke-200)` or `var(--z-color-stroke-300)`
- Brand/action color → `var(--z-color-accent-500)`
- Danger/red → `var(--z-color-semantic-red-500)`
- Success/green → `var(--z-color-semantic-green-500)`
- Warning/yellow → `var(--z-color-semantic-yellow-500)`

**Spacing** — find `padding`, `margin`, `gap`, `top`, `left`, `right`, `bottom` with pixel values not on the 4px scale. Show the nearest `--z-space-N` token (--z-space-1=4px, --z-space-2=8px, --z-space-3=12px, --z-space-4=16px, --z-space-5=20px, --z-space-6=24px, --z-space-8=32px, --z-space-10=40px, --z-space-12=48px, --z-space-16=64px).

**Font sizes** — find `font-size` with px/rem values not matching the Zephr type scale. Show the correct `--z-font-*` token.

**Border radius** — find `border-radius` values. Map to `--z-radius-sm` (4px), `--z-radius-md` (8px), `--z-radius-lg` (16px), `--z-radius-full` (9999px).

**Output format**
Show as a diff-style replacement list:

```
Line 14:  background: #ffffff        →  background: var(--z-color-background-0)
Line 27:  color: #6b7280             →  color: var(--z-color-text-500)
Line 31:  padding: 13px 18px         →  padding: var(--z-space-3) var(--z-space-4)  [12px 16px]
Line 45:  border-radius: 6px         →  border-radius: var(--z-radius-md)
```

Then output the total count of violations found. If zero violations, say so explicitly.
