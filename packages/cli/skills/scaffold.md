---
description: Scaffold a full page using a Zephr template — /scaffold dashboard, settings, auth, onboarding, marketing
---

Scaffold a complete page using the Zephr template that matches "$ARGUMENTS".

**Available page types and what they include:**

`dashboard`
- Top-level `<Tabs>` with Overview, Analytics, Reports tabs
- Metric cards section (4 KPIs with trend indicators using `<Badge>`)
- Charts placeholder section
- Activity feed using `<Badge>` and `<Avatar>` for user actions
- Tab-conditional rendering (stats/charts hide on Reports tab, summary shows)

`settings`
- `<LayoutShell>` with `<SidebarNav>` for Profile, Security, Notifications, Billing sections
- Each section uses `<FormField>` wrapping `<Input>`, `<Select>`, `<Switch>`
- Save/reset action row at the bottom of each section with loading state
- `<Alert status="success">` confirmation after save

`auth`
- Sign in and sign up views with state toggle
- `<FormField>` with email and password inputs with proper validation
- Social auth button row (GitHub, Google) with `<Divider>` separator
- Error `<Alert>` for failed login
- Link to terms and privacy policy

`onboarding`
- Step progress indicator using `<Progress>` or step dots
- Multi-step form with `<FormField>` inputs per step
- Back/continue navigation with step validation
- Skip option (ghost button, not visually dominant)
- Final confirmation/success state

`marketing`
- Hero section with heading, subheading, primary CTA `<Button>`, optional secondary CTA
- Features grid (3-column, icon + title + description per feature)
- Pricing section with plan cards, feature lists, and CTA per plan
- Monthly/Annual billing toggle that updates displayed prices
- Footer with nav links

**Instructions for generation:**
1. Import all components from `@zephrui/ui-react`
2. Use `useState` for all interactive state
3. Use realistic placeholder data — not "Lorem ipsum" or "Item 1"
4. All values must use `--z-color-*`, `--z-space-*`, and `--z-font-*` tokens
5. Include loading, empty, and error states where relevant
6. Make it immediately runnable — no TODOs, no placeholder functions that throw

If $ARGUMENTS contains additional context (e.g. "dashboard for a CRM"), incorporate that domain context into the placeholder data and section naming.

If $ARGUMENTS is empty or unrecognized, list the available page types and ask which to scaffold.
