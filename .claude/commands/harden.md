---
description: Add missing states — error, loading, empty, disabled, success — to every component
---

Harden the current component by adding every missing interactive state. These are not optional polish — they are production requirements.

**For every data-dependent section (list, table, chart, feed):**

Add a loading state:
```tsx
{isLoading ? (
  <div className="loading-state">
    {/* Use Zephr Skeleton component for each row/card */}
    <Skeleton height={40} radius={4} />
    <Skeleton height={40} radius={4} />
    <Skeleton height={40} radius={4} />
  </div>
) : data.length === 0 ? (
  <div className="empty-state">
    <p>[Icon or illustration]</p>
    <strong>[Why it's empty]</strong>
    <p>[What to do next]</p>
    <Button variant="primary" onClick={...}>[Primary action]</Button>
  </div>
) : (
  // normal render
)}
```

The empty state copy must: (1) explain why there's nothing, (2) tell the user what to do.

**For every form:**

Add an error state per field using `FormField`'s `error` prop:
```tsx
<FormField label="Email" htmlFor="email" error={errors.email}>
  <Input id="email" value={email} onChange={...} />
</FormField>
```

Add a form-level error Alert for server errors:
```tsx
{serverError && <Alert status="error" title="Something went wrong">{serverError}</Alert>}
```

Add a success state after submission:
```tsx
{submitted && <Alert status="success" title="Changes saved">Your settings have been updated.</Alert>}
```

**For every button that triggers async actions:**

Add a loading state using the `loading` prop:
```tsx
<Button loading={isSaving} disabled={isSaving} onClick={handleSave}>
  {isSaving ? "Saving…" : "Save changes"}
</Button>
```

**For every interactive control:**

Ensure `disabled` prop handling is wired through. A disabled button should look, feel, and behave disabled.

**Output**
Apply all changes directly. List every state that was added.
