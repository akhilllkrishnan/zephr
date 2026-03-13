---
description: Add meaningful motion to state changes and micro-interactions using Zephr transition tokens
---

Add motion to the current component. Every animation must serve a purpose — helping the user understand state changes, confirm actions, or follow the flow. Decorative animation that adds no information should not be added.

If $ARGUMENTS names a specific interaction (e.g., "the form submission" or "the loading skeleton"), focus there.

---

**Zephr transition tokens**

Always use these — never hardcode durations or easing functions:

```css
/* Duration */
--z-duration-fast:   120ms   /* micro-interactions: checkbox, toggle */
--z-duration-base:   200ms   /* most UI transitions: button states, show/hide */
--z-duration-slow:   320ms   /* larger elements: modal in, drawer open */
--z-duration-slower: 500ms   /* page-level: skeleton → content, onboarding steps */

/* Easing */
--z-ease-out:   cubic-bezier(0.0, 0.0, 0.2, 1)  /* elements entering the screen */
--z-ease-in:    cubic-bezier(0.4, 0.0, 1, 1)    /* elements leaving the screen */
--z-ease-inout: cubic-bezier(0.4, 0.0, 0.2, 1)  /* elements that move within the screen */
--z-ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1) /* playful spring, use sparingly */
```

**Always include `prefers-reduced-motion`:**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

**Step 1: Button and interactive states**

All interactive controls need transition on their state changes:

```css
/* Button */
.button {
  transition:
    background-color var(--z-duration-fast) var(--z-ease-out),
    box-shadow var(--z-duration-fast) var(--z-ease-out),
    transform var(--z-duration-fast) var(--z-ease-out);
}
.button:active {
  transform: scale(0.97);
}

/* Input focus */
.input {
  transition:
    border-color var(--z-duration-fast) var(--z-ease-out),
    box-shadow var(--z-duration-fast) var(--z-ease-out);
}
```

---

**Step 2: Loading skeleton shimmer**

Replace blank loading states with shimmer skeletons:

```tsx
// Add to any component that fetches data
{isLoading ? (
  <div className="skeleton-container">
    <div className="skeleton skeleton-title" />
    <div className="skeleton skeleton-body" />
    <div className="skeleton skeleton-body short" />
  </div>
) : (
  <ActualContent />
)}
```

```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--z-color-background-100) 25%,
    var(--z-color-background-200) 50%,
    var(--z-color-background-100) 75%
  );
  background-size: 400% 100%;
  animation: skeleton-shimmer 1.5s var(--z-ease-inout) infinite;
  border-radius: var(--z-radius-sm);
}

@keyframes skeleton-shimmer {
  0%   { background-position: 100% 0; }
  100% { background-position: -100% 0; }
}
```

---

**Step 3: Content entry (skeleton → real content)**

When data loads and replaces a skeleton, fade in the content:

```css
.content-enter {
  animation: content-fade-in var(--z-duration-slower) var(--z-ease-out) forwards;
}

@keyframes content-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

Apply `content-enter` class when transitioning from loading → loaded.

---

**Step 4: Toast / notification entry and exit**

```css
/* Enter from top-right */
.toast-enter {
  animation: toast-in var(--z-duration-slow) var(--z-ease-out) forwards;
}
.toast-exit {
  animation: toast-out var(--z-duration-base) var(--z-ease-in) forwards;
}

@keyframes toast-in {
  from { opacity: 0; transform: translateX(24px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes toast-out {
  from { opacity: 1; transform: translateX(0); }
  to   { opacity: 0; transform: translateX(24px); }
}
```

---

**Step 5: Modal and dialog entry**

```css
.modal-overlay {
  animation: overlay-fade-in var(--z-duration-base) var(--z-ease-out);
}
.modal-panel {
  animation: modal-slide-up var(--z-duration-slow) var(--z-ease-out);
}

@keyframes overlay-fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes modal-slide-up {
  from { opacity: 0; transform: translateY(16px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
```

---

**Step 6: Checkbox and toggle micro-interaction**

```css
/* Checkbox checkmark draw */
.checkbox-check {
  stroke-dasharray: 20;
  stroke-dashoffset: 20;
  transition: stroke-dashoffset var(--z-duration-fast) var(--z-ease-out);
}
.checkbox:checked .checkbox-check {
  stroke-dashoffset: 0;
}

/* Toggle thumb slide */
.toggle-thumb {
  transition: transform var(--z-duration-base) var(--z-ease-spring);
}
.toggle:checked .toggle-thumb {
  transform: translateX(20px);
}
```

---

**Step 7: Page-level fade-in**

For the initial render of any content-heavy screen:

```css
.page-content {
  animation: page-fade-in var(--z-duration-slower) var(--z-ease-out);
}

@keyframes page-fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
```

---

**Animation rules (never break these)**

- [ ] Always pair `animation-duration` with `var(--z-duration-*)` — never `0.3s` or `300ms` hardcoded
- [ ] Always pair `animation-timing-function` with `var(--z-ease-*)` — never `ease-in-out` hardcoded
- [ ] Every animation file must include `prefers-reduced-motion` override
- [ ] No animation should loop infinitely unless it's a loading state
- [ ] Spring easing (`--z-ease-spring`) is for playful micro-interactions only — not modals or page transitions
- [ ] Hover animations on cards: max `200ms`, `translateY(-2px)` only — no dramatic effects

**Output**

Apply animations directly. List each animation added, what state change it corresponds to, and the duration + easing used.
