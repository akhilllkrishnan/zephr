---
description: Reduce padding and spacing inconsistencies — use when UI feels loose or unfinished
---

Tighten the spacing in the current component or page. The goal is to make the layout feel intentional and structured rather than loose or padded.

**Identify loose spacing**
Look for these symptoms:
- Section padding larger than `var(--z-space-8)` (32px) without a clear reason
- Gaps between list items larger than `var(--z-space-4)` (16px)
- Padding inside cards or panels that varies across similar sections
- Vertical space between a label and its input larger than `var(--z-space-2)` (8px)
- Margins that don't create a clear grouping relationship between elements

**Tightening rules**
- Body text line-height should be 1.5–1.6. Headings should be 1.2–1.3.
- Card internal padding: `var(--z-space-5)` (20px) or `var(--z-space-6)` (24px). Not 32px unless the card is unusually large.
- Between label and input: `var(--z-space-1)` (4px) or `var(--z-space-2)` (8px) max.
- Between form fields: `var(--z-space-4)` (16px) or `var(--z-space-5)` (20px).
- Between sections: `var(--z-space-8)` (32px) to `var(--z-space-12)` (48px).
- Button padding: managed by the `size` prop — don't override it unless you have a specific reason.

**What NOT to change**
Don't reduce spacing that creates a clear visual grouping. If two items are intentionally far apart to signal they belong to different sections, leave it. The goal is consistency, not compression.

**Output**
Apply changes directly. List every spacing change made with the old and new value.

If $ARGUMENTS is a specific section name or component, focus only there.
