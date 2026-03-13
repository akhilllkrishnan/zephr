---
description: Final refinement pass — tighten spacing, align type, normalize radii, fix tokens
---

Perform a final polish pass on the current component or page. Apply every fix below in a single pass.

**1. Spacing normalization**
Round all padding, margin, and gap values to the nearest 4px scale value. Replace with `--z-space-*` tokens. Be conservative — don't change spacing that is clearly intentional (e.g. a 1px optical correction).

**2. Type scale alignment**
Ensure all font sizes match the Zephr type scale. If a size is between scale values, use the smaller one. Ensure heading levels follow a clear hierarchy (don't skip sizes).

**3. Border radius consistency**
All border-radius values within a single component should be consistent. Cards and containers use `--z-radius-lg`. Buttons and inputs use `--z-radius-md`. Pills and badges use `--z-radius-full`.

**4. Token violations**
Replace all hardcoded colors, spacing, and sizing values with their correct `--z-color-*`, `--z-space-*`, and `--z-font-*` counterparts.

**5. Interactive states**
Verify hover, focus-visible, and disabled states exist for every interactive element. If any are missing, add them using the appropriate Zephr token values:
- Hover background: `var(--z-color-background-100)`
- Focus ring: `outline: 2px solid var(--z-color-accent-500); outline-offset: 2px`
- Disabled: `opacity: 0.45; cursor: not-allowed; pointer-events: none`

**6. Redundant wrapper cleanup**
Remove unnecessary wrapper divs that exist only to hold a single child. Flatten structure where possible without breaking layout.

**Output**
Apply all changes directly to the code. After the changes, summarize what was fixed in a brief list. Do not ask for confirmation — make the changes.
