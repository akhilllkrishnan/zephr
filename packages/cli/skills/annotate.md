---
description: Add inline comments explaining design decisions, token choices, and component structure
---

Add inline JSX and CSS comments to the current component explaining the design decisions. The goal is to make the code self-documenting for the next developer — they should understand not just *what* the code does but *why* it was written this way.

If $ARGUMENTS specifies a section, focus there.

---

**What to annotate**

**1. Component variant choices**
When a non-default variant is used, explain why:

```tsx
{/* Using intent="ghost" rather than "secondary" because this action
    is available but not recommended — it should be visually deprioritized
    relative to the primary Save action. */}
<Button intent="ghost">Discard</Button>
```

**2. Token value rationale**
When a specific spacing or size token is chosen for a layout reason:

```tsx
{/* --z-space-8 (32px) here creates visual separation between the header
    and content sections. Using --z-space-6 collapsed them too tightly
    in testing with dense content. */}
<div style={{ paddingTop: "var(--z-space-8)" }}>
```

**3. Intentional spacing asymmetry**
When padding or margin is deliberately uneven:

```tsx
{/* Padding-left is doubled (--z-space-8) to visually align the text
    baseline with the card title above, accounting for the 16px icon
    on the left side. */}
<div style={{ paddingLeft: "var(--z-space-8)", paddingRight: "var(--z-space-4)" }}>
```

**4. Empty/error/loading states**
Explain what each state is designed to communicate:

```tsx
{/* Empty state: user has no projects yet (first-time experience).
    The CTA here is the *only* path — there's no other way to create
    a project from this screen, so it should be prominent. */}
{projects.length === 0 && (
  <EmptyState
    title="No projects yet"
    description="Create your first project to get started"
    action={<Button intent="primary">Create project</Button>}
  />
)}
```

**5. Z-index and stacking context**
Any explicit z-index value needs justification:

```tsx
{/* z-index: 50 — this dropdown must appear above the sticky table header
    (z-index: 40) but below modal overlays (z-index: 100). */}
<div style={{ zIndex: 50 }}>
```

**6. Accessibility decisions**
When ARIA attributes, focus management, or keyboard behavior requires explanation:

```tsx
{/* aria-live="polite" so screen readers announce search results after
    the user stops typing, not on every keystroke. Using "assertive"
    would interrupt other announcements. */}
<div aria-live="polite" aria-atomic="true">
  {results.length} results
</div>
```

**7. Conditional rendering logic**
When visibility logic isn't obvious:

```tsx
{/* Only show the bulk-action toolbar when ≥ 1 row is selected.
    Do not render it collapsed — the toolbar appearing/disappearing
    gives clearer feedback than a permanently disabled state. */}
{selectedRows.length > 0 && <BulkActionToolbar count={selectedRows.length} />}
```

**8. Layout structure comments**
For complex layouts, add a structural overview comment at the top:

```tsx
{/*
  Layout structure:
  ┌─ PageShell (sticky header + scrollable main)
  │  ├─ HeaderBar (title, breadcrumb, primary action)
  │  ├─ FiltersBar (search + filter dropdowns)
  │  └─ ContentArea
  │     ├─ TableSection (sortable DataTable)
  │     └─ PaginationBar
*/}
```

---

**CSS annotation style**

For style rules that aren't self-explanatory:

```css
/* Using -2px translateY on hover (not box-shadow alone) because
   the card has a border — shadow changes look muddy against the border.
   The lift motion is more visible and feels more intentional. */
.gallery-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--z-shadow-md);
}
```

```css
/* max-width: 65ch constrains line length for optimal readability
   (roughly 65–75 characters per line). The `ch` unit scales with
   the current font size, so this holds across type scale changes. */
.body-text {
  max-width: 65ch;
}
```

---

**Annotation rules**

- [ ] Every non-obvious prop choice gets a comment
- [ ] Every token that was *changed* from a default gets a reason
- [ ] Every state (empty, error, loading) gets a one-sentence description of what it communicates
- [ ] Comments describe *why*, not *what* — `// primary button` is useless; `// primary because this is the only irreversible action on screen` is useful
- [ ] Keep comments ≤ 3 lines unless explaining complex layout structure
- [ ] Use JSX `{/* */}` for component comments, CSS `/* */` for style comments — never `//` in JSX

**Output**

Apply comments directly to the file. Do not rewrite any logic — annotations only.
