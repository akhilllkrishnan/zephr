---
description: Rewrite all UI copy to be clear, specific, and action-oriented
---

Rewrite the copy in the current component. Every label, heading, button, placeholder, empty state, and error message should tell the user exactly what will happen — no generic filler.

If $ARGUMENTS specifies a section (e.g., "just the form labels" or "only error messages"), scope the rewrite there.

---

**The clarify rules**

**Buttons**
Every button label must describe the outcome, not just the action.

| Before | After |
|---|---|
| Submit | Save changes |
| OK | Got it, continue |
| Cancel | Discard changes |
| Send | Send message |
| Confirm | Yes, delete this |
| Continue | Next: review order |
| Update | Update profile |
| Yes | Yes, remove access |

Rule: if the button triggers something irreversible (delete, remove, send, publish), the label must name what's being acted on.

**Form labels**
Use the most specific label the context supports.

| Before | After |
|---|---|
| Name | Full name |
| Email | Work email |
| Password | Create password |
| Phone | Mobile number |
| Address | Billing address |
| Company | Company name |
| Message | Your message |

Rule: if the same field name appears twice on a page with different purposes (shipping vs billing address), differentiate them — never let duplicate labels coexist.

**Placeholders**
Placeholders show the format, not a restatement of the label.

| Before | After |
|---|---|
| Enter your name | e.g. Alex Kim |
| Enter email | name@company.com |
| Search... | Search components... |
| Type here | Describe the issue |
| MM/DD/YYYY | 01/31/2025 |

Rule: placeholder text is the lightest copy on the page. Keep it short — ≤ 30 characters. Never use it as the only label.

**Error messages**
Error messages must: (1) say what went wrong, (2) say how to fix it.

| Before | After |
|---|---|
| Invalid input | That email is already registered — try signing in |
| Error 422 | The username can only contain letters and numbers |
| Please try again | We couldn't connect — check your network and retry |
| Required field | Add your work email to continue |
| Invalid date | Enter a date in MM/DD/YYYY format |
| Something went wrong | We hit a snag saving your changes — try again |

Rule: Never say "invalid." Describe what format is required or what conflict occurred.

**Empty states**
Empty states explain why and offer a path forward.

| Before | After |
|---|---|
| No items | No projects yet — create your first one |
| Nothing here | No team members added yet |
| No results | No results for "design tokens" — try a shorter search |
| Empty | You haven't connected any integrations |
| N/A | No activity in the last 30 days |

Structure: `[What's missing] — [What to do about it]`
Add a CTA button below the empty state message that triggers the creation flow.

**Section headings**
Headings should orient, not just label.

| Before | After |
|---|---|
| Settings | Account settings |
| Details | Payment details |
| Info | About this project |
| Data | Usage & billing data |
| Overview | Team performance overview |

Rule: "Settings" alone is never a sufficient heading — settings for what?

**Loading states**
Loading messages tell the user what's being loaded.

| Before | After |
|---|---|
| Loading... | Loading your projects... |
| Please wait | Saving changes... |
| (spinner only) | Fetching latest data... |
| Processing... | Sending your message... |

**Tooltips and help text**
Help text below a field answers "why do we need this?" or "what should I enter?"

| Before | After |
|---|---|
| Required | We'll only use this to send order updates |
| Optional | You can always add this later in Settings |
| (no help text) | Your handle appears on comments and @mentions |

---

**After rewriting, verify:**
- [ ] No button says "Submit," "OK," "Yes," or "No" without context
- [ ] No error message says "invalid" or "please try again" without explanation
- [ ] Every empty state has a CTA or next-step instruction
- [ ] No two fields on the same form share the same label
- [ ] Placeholder text is ≤ 30 characters and shows format, not a label echo

**Output**

Apply changes directly. List every piece of copy changed and the reason in a brief summary after the diff.
