---
description: UX and visual design review — hierarchy, CTA clarity, density, and copy
---

Give a design and UX critique of the current component or page. Review every dimension below. Be concrete and specific — name the element, describe the problem, give the fix.

**Visual hierarchy**
Is there one clearly dominant element? If multiple elements have equal visual weight (same font size, same button variant, same color), flag this. The viewer's eye should have an unambiguous first stop.

Fix pattern: Demote secondary elements to `variant="secondary"` or `variant="ghost"`. Reserve `variant="primary"` for the single most important action.

**CTA prominence**
Is the primary call-to-action immediately visible? Does it have the highest contrast on the page? Is it above the fold? If competing buttons exist, name them and show how to create hierarchy.

**Information density**
Count the number of distinct pieces of information in the first viewport. If it exceeds ~7 items, flag information overload. For dashboards this threshold is higher; for marketing/onboarding pages it should be lower.

**Empty and loading states**
Does every data-dependent section have both states? An empty state must explain WHY it's empty and WHAT to do next. A loading state must use a skeleton or spinner — never a blank space.

**Copy clarity**
Review every label, button, heading, and placeholder. Flag:
- Generic labels ("Submit", "OK", "Name", "Value")
- Vague CTAs that don't describe the outcome
- Error messages that don't explain recovery
- Section headings that repeat the page title

**Spacing rhythm**
Are section gaps consistent? Does padding feel intentional or arbitrary? Flag any section where spacing breaks the visual rhythm.

**Output format**
Write in paragraph form, organized by section heading. End each section with a concrete "Do this instead" recommendation using Zephr component props where relevant.

If $ARGUMENTS is provided (e.g. "mobile", "onboarding"), focus the critique on that context.
