---
description: Strip a UI to its essential structure — remove decoration, redundancy, and non-essential sections
---

Distill the current component to its essential structure. Remove everything that doesn't directly serve the user's primary task.

**Step 1: Identify the primary task**
What is the one thing a user comes to this screen to do? Name it explicitly. Everything that doesn't help that task is a candidate for removal or demotion.

**Step 2: Apply the distillation checklist**

Remove:
- [ ] Decorative illustrations or icons that don't convey information
- [ ] Section headings that restate the page title or are already obvious from context
- [ ] "How it works" steps or onboarding copy that returning users will never read
- [ ] Empty placeholder sections ("Feature coming soon")
- [ ] Social proof, testimonials, or marketing copy on internal app screens
- [ ] Duplicate entry points to the same action (two buttons that do the same thing)
- [ ] "View all" links when the full list is just 3–5 items
- [ ] Descriptive subtitles under every heading that just repeat the heading

Simplify:
- [ ] Replace multi-step interactions with a single clear path where possible
- [ ] Collapse rarely-used controls into a `•••` overflow menu
- [ ] Merge similar sections if they serve the same purpose
- [ ] Replace complex custom UI patterns with a standard Zephr component that works out of the box

Keep:
- The primary action (the one button / form / control the user is here for)
- Status and feedback (alerts, badges, progress indicators that tell the user something)
- Navigation that's required to get to other primary tasks

**Step 3: After removal, re-check hierarchy**
After removing elements, verify the visual hierarchy still makes sense. Run `/focus` if the primary action is no longer visually dominant.

**Output**
Apply changes directly. List every element removed and why. If removing something would require a product decision (e.g. "should we remove the testimonials section entirely?"), flag it as a question rather than removing it.

If $ARGUMENTS specifies a section or element, focus distillation there.
