---
description: Add vertical rhythm and whitespace — use when layout feels compressed or rushed
---

Add breathing room to the current component or page. The goal is to make the layout feel measured and considered rather than compressed.

**Increase section spacing**
Between distinct content sections (not items within a section), use `var(--z-space-12)` (48px) or `var(--z-space-16)` (64px). If sections are currently separated by `var(--z-space-4)` or less, they probably don't feel like distinct sections.

**Increase line height**
- Body text: `line-height: 1.6` minimum. Long-form or explanatory text: `1.7`.
- Headings: `line-height: 1.2` to `1.35`. Very large headings (3rem+): `line-height: 1.1`.
- Labels and captions: `line-height: 1.4`.

**Card and panel padding**
A card with content that matters should have at least `var(--z-space-6)` (24px) padding. Don't compress cards to `var(--z-space-3)` or less — the content can't breathe.

**Add space above section headings**
Section headings should have `margin-top` at least 1.5× the `margin-bottom`. This makes the heading clearly belong to the content below it, not the content above.

**Form field spacing**
Between form fields: `var(--z-space-5)` (20px) minimum. Between a label and its input: `var(--z-space-2)` (8px) maximum. If fields feel cramped together, they're harder to fill out correctly.

**List item spacing**
Items in a list should have `gap: var(--z-space-3)` (12px) or `var(--z-space-4)` (16px). If items feel crowded, they're harder to scan.

**Max content width**
Body text should have a `max-width` of `65ch` to `75ch` for readability. Full-width text blocks that span hundreds of pixels are harder to read.

**Output**
Apply all changes directly. Note every spacing adjustment made.

If $ARGUMENTS specifies a section, focus only there.
