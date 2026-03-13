---
description: Sharpen the primary action — one dominant CTA, remove competing weights, clear the critical path
---

Sharpen the visual focus of the current component or page. Every surface needs exactly one clearly dominant action.

**Step 1: Identify the primary action**
Read the component and determine what the user is supposed to do. If there are multiple competing actions, choose the one that is most important. If the primary action is unclear, that is itself the problem — flag it explicitly.

**Step 2: Make the primary action visually dominant**
- The primary action button uses `variant="primary"` and `size="md"` (or `size="lg"` for landing pages and key workflows).
- It should have the highest contrast element on the surface it lives on.
- It should be visible without scrolling on the screen sizes where it's relevant.
- Consider: is it large enough? Does it use the accent color? Does it have enough surrounding whitespace to breathe?

**Step 3: Demote everything else**
- Secondary actions (cancel, go back, learn more) → `variant="secondary"` or `variant="ghost"`
- Tertiary actions (less common, destructive, or low-stakes) → text links or `variant="ghost"`
- Destructive actions → `variant="danger"` (but only if genuinely destructive)
- Remove or hide actions the user rarely needs

**Step 4: Clear the critical path**
Remove decorative elements between the user's eye and the primary action:
- Excessive introductory text before the CTA
- Multiple competing calls-to-action at the same visual level
- Banner alerts or info boxes that interrupt the primary workflow
- Unrelated navigation or links that pull attention away

**Step 5: Check button placement**
- On a form: the submit button should be at the bottom of the form, aligned with the inputs.
- On a dialog: the primary action goes in the footer, on the right.
- On a landing/hero section: the CTA should be within the first screen viewport.

**Output**
Apply all changes directly. Explain what was identified as the primary action and what was demoted or removed.
