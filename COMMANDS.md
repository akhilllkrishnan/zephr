# Zephr Command Reference

20 slash commands that give you designer vocabulary. Use them in Claude Code, Cursor, Codex CLI, or any AI editor that supports custom instructions.

Install:
```bash
npx @zephrui/cli add-skills --editor claude-code   # Claude Code
npx @zephrui/cli add-skills --editor cursor        # Cursor
npx @zephrui/cli add-skills --editor codex         # Codex CLI
npx @zephrui/cli add-skills --editor universal     # ZEPHR.md for any editor
```

---

## Quick lookup

| Feeling | Command |
|---|---|
| "This looks flat" | `/bolder` |
| "Too much going on" | `/quieter` or `/distill` |
| "Looks unfinished" | `/polish` or `/harden` |
| "I need a full page" | `/scaffold [type]` |
| "Something's wrong, I can't name it" | `/critique` |
| "Wrong colors everywhere" | `/token-check` |
| "Copy feels vague" | `/clarify` |
| "Add some life to it" | `/colorize` or `/animate` |
| "I want to drop in a table / feed / form" | `/widget [name]` |
| "Too many words, too many sections" | `/distill` |
| "Feels too wide / too tall" | `/tighten` |
| "Too compressed, needs air" | `/breathe` |

---

## Diagnostic commands

Run these first when something feels wrong but you can't name it.

---

### `/audit`

**What it does:** Technical quality audit of the current component or page.

Checks for:
- Hardcoded color values that should be tokens (`#fff`, `rgba(...)`)
- Spacing values not on the scale (`padding: 13px`)
- Missing interactive states (hover, focus, disabled, loading, error)
- Accessibility gaps (missing aria attributes, color contrast issues)
- Typography sizes not on the type scale
- Inconsistent border radii within the same component

**Output:** A ranked issue list with severity (high / medium / low), location, and the correct fix.

**Combine with:** `/normalize` to fix the issues it finds, `/token-check` to go deeper on token violations.

**Example:**
```
/audit
→ 3 high issues, 5 medium issues found.
  HIGH: Button uses hardcoded #3b82f6 — should be var(--z-color-accent-500)
  HIGH: Input missing :focus-visible outline
  MED:  Card padding is 13px — nearest token is --z-space-3 (12px)
  ...
```

---

### `/critique`

**What it does:** UX and design review of the current screen.

Reviews:
- Visual hierarchy — is there one clearly dominant element?
- CTA prominence — does the primary action stand out?
- Information density — is the first viewport overloaded?
- Empty state quality — does it explain why and what to do?
- Copy clarity — are labels, headings, and CTAs action-oriented?
- Spacing rhythm — does the layout feel measured or random?

**Output:** Narrative observations grouped by category, with specific recommendations.

**Combine with:** `/bolder`, `/focus`, `/clarify`, `/breathe` based on what it surfaces.

**Example:**
```
/critique
→ Hierarchy: The page has three blue buttons of equal weight. None reads as primary.
   Recommendation: Make the main CTA use intent="primary", demote others to "secondary" or "ghost".

   Density: First viewport contains 8 metric cards, 2 tables, and a toolbar.
   Recommendation: Show 4 key metrics above the fold, put tables below.
```

---

### `/token-check`

**What it does:** Scans the current file for hardcoded values that should be design tokens.

Finds:
- Hardcoded hex/rgb/hsl colors → shows the correct `--z-color-*` token
- Pixel values not on the spacing scale → shows the nearest `--z-space-*` token
- Font sizes not on the type scale → shows the correct `--z-font-*` token
- Border radii → shows the correct `--z-radius-*` token

**Output:** A diff-style list of replacements.

**Combine with:** `/normalize` to apply all replacements at once.

---

## Quality commands

Use these to fix specific problems after `/audit` or `/critique` identifies them.

---

### `/polish`

**What it does:** Final refinement pass before shipping.

Does all of these:
- Tightens inconsistent spacing to the nearest scale value
- Aligns type sizes to the typography scale
- Normalizes border radii across the component
- Ensures all interactive states are handled
- Fixes token violations
- Removes redundant wrapper elements

**When to use:** After you're mostly done but something still feels off. Think of it as "AI code review for visual quality."

**Combine with:** `/harden` if interactive states are missing, `/clarify` if the copy still needs work.

---

### `/normalize`

**What it does:** Aligns the current component to Zephr design system conventions.

Covers:
- Token usage (replaces hardcoded values)
- Component naming patterns
- Props API conventions
- CSS variable namespacing
- Import paths and structure

**When to use:** After migrating code from another library, or when a component was built without Zephr conventions.

**Combine with:** `/audit` to identify what needs normalizing first.

---

### `/tighten`

**What it does:** Reduces padding and spacing inconsistencies.

Signs you need this:
- The layout feels "floaty" or unfocused
- Gaps between elements are all different sizes
- There's too much whitespace inside cards or panels
- The spacing doesn't feel intentional

**Combine with:** `/normalize` to fix tokens, `/breathe` if you went too far.

---

### `/harden`

**What it does:** Adds missing states and edge case handling.

Adds:
- **Error state** — inline validation messages, red borders, error icons
- **Loading state** — skeletons for data, spinners for actions
- **Empty state** — explains why there's nothing and what to do
- **Disabled state** — visual and aria treatment for inactive controls
- **Success/confirmation** — feedback after actions complete

**When to use:** Any time you've built the happy path but not the edge cases. These aren't optional polish — they're what makes a UI feel production-quality.

**Combine with:** `/polish` for the finishing pass, `/clarify` to improve the copy in these states.

---

## Expression commands

Use these to change the tone and energy of a UI.

---

### `/bolder`

**What it does:** Amplifies a timid or flat design.

Makes:
- Type sizes larger and weights heavier
- Color contrast higher
- The primary action more visually dominant
- Section headings more defined
- Spacing more decisive

**Signs you need this:** The UI looks "nice" but forgettable. Nothing commands attention. The CTA doesn't feel important.

**Opposite:** `/quieter`

---

### `/quieter`

**What it does:** Tones down a busy or overwrought design.

Makes:
- Secondary and tertiary elements less prominent
- Color usage more restrained
- Borders and shadows lighter
- The visual weight of non-primary actions lower

**Signs you need this:** There are too many things competing for attention. The UI feels "busy" or "loud." It's hard to know where to look first.

**Opposite:** `/bolder`

---

### `/breathe`

**What it does:** Adds vertical rhythm and whitespace.

Increases:
- Line height for better readability
- Section padding and gaps
- Margin between distinct content blocks
- Internal padding in cards and panels

**Signs you need this:** The layout feels compressed or rushed. Text is hard to scan. Sections don't feel distinct from each other.

**Opposite:** `/tighten`

---

### `/focus`

**What it does:** Sharpens the primary user action.

Does:
- Identifies the one action that matters most on this screen
- Ensures it uses `intent="primary"` with full visual weight
- Demotes competing actions to `secondary` or `ghost` variants
- Removes elements that distract from the critical path
- Checks that the CTA is visible without scrolling

**Signs you need this:** Multiple buttons have equal visual weight. It's unclear what the user is supposed to do. The page has no clear "next step."

---

## Composition commands

Use these to build new screens and drop in components.

---

### `/scaffold [page-type]`

**What it does:** Generates a full page using the matching Zephr template with all components wired up.

Available page types:
- `dashboard` — metric cards, charts section, activity feed, tab navigation
- `settings` — sidebar nav, form sections, save/reset controls
- `auth` — sign in / sign up with social auth options
- `onboarding` — step progress, form sections, skip controls
- `marketing` — hero, features, pricing with billing toggle

**What you get:** Working React with Zephr component imports, realistic placeholder data, and correct token usage. Not a wireframe — production-ready structure.

**Example:**
```
/scaffold settings
→ Generates SettingsPage.tsx with SidebarNav, FormField, Input, Switch, Button
  Includes: Profile, Security, Notifications, Billing sections
  All props typed, all tokens correct, ready to wire to real data
```

---

### `/widget [name]`

**What it does:** Drops in a specific Zephr widget fully wired up.

All 50+ widgets available. Examples:
- `/widget data-table` — sortable, selectable table with header checkboxes
- `/widget command-palette` — live-search command launcher
- `/widget notification-feed` — grouped, mark-read notification list
- `/widget settings-panel` — save/saving/saved feedback cycle
- `/widget metrics-dashboard` — period-selector metric cards
- `/widget kanban-board` — drag-reorderable task columns
- `/widget billing-usage` — usage meters with threshold indicators

**What you get:** The full React source with `useState` hooks, realistic data, and correct Zephr component imports. Interactive out of the box.

---

### `/compose`

**What it does:** Assembles a layout from Zephr components based on a natural language description.

Understands the full Zephr component API — correct props, correct imports, correct token usage. Unlike a generic prompt, `/compose` knows that `DataTable` needs `columns` typed as `Column[]`, that `Alert` has a `severity` prop not a `type` prop, and that `Badge` colors come from the semantic token set.

**Example:**
```
/compose a card with a header showing a user's name and role,
a section with three stat numbers, and a footer with two action buttons

→ Generates:
  <Card>
    <CardHeader>...</CardHeader>  // with Zephr Avatar + title pattern
    <div className="stat-row">...</div>  // with correct spacing tokens
    <CardFooter>
      <Button intent="primary">...</Button>
      <Button intent="secondary">...</Button>
    </CardFooter>
  </Card>
```

---

### `/distill`

**What it does:** Strips a UI to its essential structure.

Removes:
- Decorative elements that don't convey information
- Redundant labels (if the icon is self-explanatory, remove the text)
- Duplicate content (same thing said two different ways)
- Secondary sections that dilute the primary purpose
- Anything that makes the user think without helping them act

**Signs you need this:** The page has too many sections. It's unclear what's important. Every element feels equally weighted.

**Combine with:** `/focus` to ensure what remains is correctly prioritized.

---

### `/adapt [context]`

**What it does:** Adapts a component for a different device or context.

Contexts:
- `/adapt mobile` — collapses multi-column layouts, enlarges tap targets, adjusts type scale
- `/adapt tablet` — intermediate breakpoint treatment
- `/adapt dark` — ensures all tokens have dark mode counterparts
- `/adapt print` — strips interactive elements, optimizes for paper layout
- `/adapt email` — converts to table-based inline layout for email clients

---

## Design thinking commands

Use these for copy, context, and deeper design reasoning.

---

### `/clarify`

**What it does:** Rewrites all copy on the current screen to be clearer and more action-oriented.

Improves:
- Button labels (from "Submit" → "Save changes", from "OK" → "Got it, continue")
- Empty state copy (from "No items" → "No projects yet — create your first one")
- Error messages (from "Error 422" → "That email is already registered. Try signing in instead.")
- Form labels (from "Name" → "Full name" or "Display name" depending on context)
- Section headings (from "Settings" → "Account settings" or "Workspace settings")

**Signs you need this:** Labels are vague or generic. Error messages don't explain what to do. CTAs don't describe what happens next.

---

### `/colorize`

**What it does:** Adds strategic color to a currently neutral UI.

Uses:
- `--z-color-accent-*` for brand / action color
- `--z-color-semantic-*` for status indicators
- Badge and Alert components for contextual color
- Gradient accents for hero sections (via Zephr's motion tokens)

**Signs you need this:** Everything is grey. There's no color signal for success, danger, or brand identity.

---

### `/animate`

**What it does:** Adds meaningful motion to a UI.

Adds:
- State transition animations (loading → content, empty → filled)
- Micro-interactions (button press, checkbox check, toast entry/exit)
- Skeleton shimmer for loading states
- Page-level fade-in for initial content load

Uses Zephr's transition token set (`--z-duration-*`, `--z-ease-*`). All animations are `prefers-reduced-motion` aware.

**Signs you need this:** The UI feels static and lifeless. State changes are jarring. There's no feedback for user actions.

---

### `/annotate`

**What it does:** Adds inline JSX comments explaining design decisions.

Covers:
- Why a specific component variant was chosen
- What a token value represents at this scale
- Why spacing is intentionally larger or smaller here
- What the empty/error/loading state is designed to communicate

**When to use:** Before code review, when handing off to another developer, or when building a component that will be reused.

---

### `/teach-zephr`

**What it does:** Gathers one-time project context to personalize all subsequent commands.

Asks about:
- App domain and primary user actions
- Brand tone (formal, casual, technical, friendly)
- Primary user persona and their goals
- Key screens and workflows
- Design constraints or existing patterns to preserve

After running `/teach-zephr`, all other commands understand your specific context. `/clarify` will match your brand voice. `/scaffold` will align with your app's information architecture. `/bolder` will know which action is actually primary in your product.

**Run once per project, at the start.**

---

## Command combinations

Some common workflows use multiple commands in sequence:

**"Build and ship a new page"**
```
/scaffold [type] → /harden → /polish
```

**"Fix a page that feels off"**
```
/critique → /bolder (or /quieter) → /focus → /polish
```

**"Migrate to Zephr"**
```
/token-check → /normalize → /audit → /polish
```

**"Add a self-contained widget"**
```
/widget [name] → /adapt mobile → /clarify
```

**"Improve an existing form"**
```
/audit → /clarify → /harden → /tighten
```

**"First day on a new project"**
```
/teach-zephr → /scaffold dashboard → /critique
```

---

## Adding your own commands

Zephr's command system is open. Add project-specific commands to `.claude/commands/`:

```
.claude/commands/
├── my-brand-voice.md      # Custom /brand-voice command
├── our-table-pattern.md   # Custom /table command specific to your app
└── ...
```

Each `.md` file becomes a slash command. The filename is the command name.

See [`.claude/commands/`](.claude/commands/) for the built-in implementations as templates.
