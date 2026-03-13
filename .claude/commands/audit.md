---
description: Technical design audit — find token violations, missing states, and inconsistencies
---

Perform a technical design audit on the current file or component. Check every item below and output a ranked issue list.

**Token violations**
- Find every hardcoded color value (`#`, `rgb(`, `rgba(`, `hsl(`). For each one, identify the correct `--z-color-*` token.
- Find spacing/padding/margin values that are not on the 4px base scale (4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96). Show the nearest `--z-space-*` token.
- Find font-size values not matching Zephr's type scale (0.6875rem, 0.75rem, 0.8125rem, 0.875rem, 1rem, 1.125rem, 1.25rem, 1.5rem, 2rem, 2.5rem, 3rem). Show the correct `--z-font-*` token.
- Find border-radius values not matching (2px, 4px, 6px, 8px, 12px, 16px, 24px, 9999px). Show the correct token.

**Missing interactive states**
- Every `<button>`, `<a>`, or interactive Zephr component must have `:hover`, `:focus-visible`, and `:disabled` handling.
- Every form input must have error and filled states.
- Every data list must handle loading and empty states.

**Component misuse**
- Raw `<button>`, `<input>`, `<select>`, `<textarea>` where a Zephr equivalent exists → flag and show the correct import.
- Missing `FormField` wrapper around labeled inputs.
- Missing `aria-label` on icon-only buttons.

**Output format**
List issues grouped by severity:

```
HIGH
- [location]: [issue] → fix: [specific correction]

MEDIUM
- [location]: [issue] → fix: [specific correction]

LOW
- [location]: [issue] → fix: [specific correction]
```

Be specific about file location (line number if possible). After the list, output the total count per severity.

If $ARGUMENTS is provided, focus the audit on that specific aspect (e.g. "tokens", "states", "accessibility").
