---
description: Add strategic color to a currently neutral UI using Zephr semantic tokens
---

Add purposeful color to the current component. The goal is signal, not decoration — color should tell the user something (status, priority, brand, interaction).

If $ARGUMENTS names a specific element or intent (e.g., "the status badges" or "the header"), focus color application there.

---

**Step 1: Audit the current color state**

Count the distinct non-neutral colors currently in use:
- 0 colors → the UI is fully greyscale. Apply brand and semantic color.
- 1 color → likely only the primary button. Extend to status indicators and accents.
- 3+ colors → risk of noise. Add only if existing colors are inconsistent or semantically wrong.

---

**Step 2: Apply color by category**

**Brand / action color** — use `--z-color-accent-*`

The primary action (the main button, the key link, the active state) should use:
```css
background: var(--z-color-accent-500);
color: var(--z-color-accent-contrast);
```

Accent shades for supporting uses:
- Hover: `--z-color-accent-600`
- Active/pressed: `--z-color-accent-700`
- Subtle background tint: `--z-color-accent-50`
- Border accent: `--z-color-accent-200`

**Status / semantic color** — use `--z-color-semantic-*`

| Status | Token | Use case |
|---|---|---|
| Success | `--z-color-semantic-green-500` | Confirmation, completed steps, positive metrics |
| Warning | `--z-color-semantic-yellow-500` | Degraded state, approaching limits, soft alerts |
| Danger | `--z-color-semantic-red-500` | Errors, destructive actions, failed states |
| Info | `--z-color-semantic-blue-500` | Informational alerts, tips, neutral notices |

Apply via `<Alert severity="success|warning|error|info">` and `<Badge color="green|yellow|red|blue">` — never hardcode hex values.

**Muted / secondary color**

Supporting text, metadata, timestamps, secondary labels:
```css
color: var(--z-color-text-400);
```
Borders and dividers:
```css
border-color: var(--z-color-border);
```

---

**Step 3: Status badge cluster**

If the component shows status values (active, inactive, pending, error, archived), ensure each status maps to the correct semantic token:

```tsx
const statusColors = {
  active:   "green",
  pending:  "yellow",
  error:    "red",
  archived: "gray",
  info:     "blue",
} as const;

<Badge color={statusColors[status]}>{status}</Badge>
```

---

**Step 4: Metric deltas and trend indicators**

For metric cards showing change values:
- Positive delta: `color: var(--z-color-semantic-green-600)` + ↑ arrow
- Negative delta: `color: var(--z-color-semantic-red-600)` + ↓ arrow
- Neutral: `color: var(--z-color-text-400)`

```tsx
<span style={{ color: delta > 0
  ? "var(--z-color-semantic-green-600)"
  : delta < 0
    ? "var(--z-color-semantic-red-600)"
    : "var(--z-color-text-400)"
}}>
  {delta > 0 ? "↑" : "↓"} {Math.abs(delta)}%
</span>
```

---

**Step 5: Hero section accent**

For marketing pages, hero sections, or empty states that need visual energy:
- Add a subtle gradient background using accent tokens:
```css
background: linear-gradient(
  135deg,
  var(--z-color-accent-50) 0%,
  var(--z-color-background-0) 60%
);
```
- Add an accent line under the primary heading:
```css
h1::after {
  content: '';
  display: block;
  width: 48px;
  height: 3px;
  background: var(--z-color-accent-500);
  margin-top: var(--z-space-2);
}
```

---

**Step 6: Navigation active states**

Active nav items must be visually distinct from inactive:
```css
/* Active */
background: var(--z-color-accent-50);
color: var(--z-color-accent-600);
border-left: 2px solid var(--z-color-accent-500);

/* Inactive */
color: var(--z-color-text-600);
background: transparent;
```

---

**Color rules (never break these)**

- [ ] Never hardcode `#hex`, `rgb()`, or `hsl()` — always use `--z-color-*` tokens
- [ ] Never use color as the only differentiator — pair with a label, icon, or shape
- [ ] Green = success only. Never use green for branding on a page that also shows success states
- [ ] Red = danger/error only. Never use red for decorative accents
- [ ] Accent color should appear in ≤ 3 places per screen — primary action, active state, one accent element
- [ ] Check contrast: text on colored backgrounds must meet WCAG AA (4.5:1 for body, 3:1 for large text)

**Output**

Apply color additions directly. List every color addition and the semantic reason for each.
