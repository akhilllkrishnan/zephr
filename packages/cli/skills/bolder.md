---
description: Amplify timid designs — increase contrast, strengthen hierarchy, dominate the primary action
---

Make the current design bolder. Apply every change below to increase confidence and visual impact.

**Strengthen type hierarchy**
- The primary heading should be at least 2 sizes larger than body text. If it's not, increase it.
- Make headings `font-weight: 600` or `700`. Body text should be `400`. Labels and supporting text should be `500`.
- Reduce the number of distinct font sizes — aim for at most 3–4 across the entire component.

**Dominate the primary action**
- Identify the one button or action the user should take. Make it `variant="primary"` with `size="md"` or `size="lg"`.
- All other actions should be `variant="secondary"` or `variant="ghost"`. None should compete.
- If the primary button doesn't immediately draw the eye, increase its visual weight further — consider adding a box-shadow or making it full-width on mobile.

**Increase color contrast**
- Primary text should use `var(--z-color-text-950)` — the darkest available text token.
- Secondary text should use `var(--z-color-text-700)` at minimum — not so muted it disappears.
- Surface background should create clear separation from the page background. Use `var(--z-color-background-0)` for cards on a `var(--z-color-background-100)` page.

**Sharpen section edges**
- Add clear visual separation between sections using a combination of whitespace and either a `<Divider>` or a distinct background change.
- Section headings should be visually distinct from the content they head. Add more space above them.

**Eliminate neutral decoration**
- Remove light grey borders that don't create meaningful grouping.
- Remove subtle background shading that doesn't distinguish sections.
- Keep only structural elements that carry meaning.

**Output**
Apply all changes directly to the code. Briefly describe what was made bolder and why.
