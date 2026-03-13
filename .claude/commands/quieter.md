---
description: Tone down busy designs — reduce noise, soften secondary elements, create breathing room
---

Make the current design quieter. The goal is to reduce visual noise so that what matters becomes clearer.

**Demote secondary elements**
- Identify every element that is not the primary action or primary content. Reduce its visual weight.
- Secondary buttons → `variant="ghost"` instead of `variant="secondary"`. Tertiary actions → plain text links.
- Supporting labels and metadata → `var(--z-color-text-300)` or `var(--z-color-text-500)`. They should whisper, not shout.

**Reduce border and shadow noise**
- Remove borders that don't create meaningful grouping. A card on a white page doesn't need a border AND a shadow.
- Replace heavy `box-shadow` values with lighter ones or none. Use `box-shadow: 0 1px 3px rgba(0,0,0,0.06)` as a maximum for subtle elevation.
- Remove borders from form inputs inside cards — the card already creates the container.

**Compress the color palette**
- Count the number of distinct colors in use. If more than 3–4, eliminate the extras.
- Replace decorative color accents (colored sections, colorful icons, varied badge colors) with neutral versions unless color carries semantic meaning.
- Icons should use `var(--z-color-text-500)` unless they need to signal status.

**Reduce competing type weights**
- If there are more than 3 distinct font-weight values, consolidate. Most surfaces only need `400` (body) and `500` (labels/emphasis).
- Remove bold text from body copy that doesn't need emphasis.

**Increase whitespace to separate rather than decorate**
- Instead of borders between items, use space. Add `var(--z-space-4)` between list items as separation.

**Output**
Apply all changes directly. Briefly describe what was quieted and why.
