# Zephr UI — Foundation & Strategy

> Written: 2026-03-05  
> Status: Working document

---

## 1. Core philosophy

Zephr is a **framework-grade UI library** — not a utility toolkit, not a component collection bolted on top of another system.

The goal: a vibe coder explains their product to an AI agent and, because Zephr is installed, never has to think about UI or UX decisions. The AI reaches for Zephr components automatically, the result looks premium out of the box, and the theme matches the app's personality.

---

## 2. Tailwind — build on top or replace?

**Decision: no Tailwind dependency. Zephr uses pure CSS custom properties.**

| Concern | Building on Tailwind | Zephr's own tokens |
|---|---|---|
| Scalability | Consumer apps need Tailwind configured | One `zephr.css` import, zero build config |
| Reliability | Each Tailwind major (v3→v4) is absorbed as a breaking change | You fully own the contract |
| Performance | ~6–10 KB base even after purge; utility classes inflate HTML | ~3–4 KB scoped CSS vars |
| AI legibility | `className="flex items-center gap-4 rounded-lg"` — AI reads presentation | `<Button variant="secondary">` — AI reads intent |
| Override story | `!important` wars or `@layer` gymnastics | Override one token → everything updates |

Shadcn's core limitation is requiring Tailwind — it becomes a liability for projects on CSS Modules, Emotion, or plain CSS. Zephr should work **anywhere React works, zero config**.

---

## 3. Token architecture

Every visual decision lives in a CSS custom property. Components read tokens; tokens read theme packs.

```
/packages/ui-react/
  tokens.css          ← base tokens (color, type, space, radius, shadow)
  themes/
    notion.css        ← flat, white, minimal
    stripe.css        ← depth, blue primary, card elevation
    linear.css        ← dense, dark sidebar, high contrast
    ios.css           ← large targets, blur panels, 16px radii
```

Each theme file is just overrides:

```css
/* notion.css */
:root {
  --z-radius-md:   4px;
  --z-shadow-sm:   none;
  --z-font-sans:   'Inter', sans-serif;
  --z-panel:       #ffffff;
  --z-page:        #f7f6f3;   /* warm off-white */
}
```

Switch a 4 KB file → the entire app rethemes. No JS required.

---

## 4. The four theme packs (v1 targets)

| Name | Vibe | Key traits |
|---|---|---|
| **Notion** | Flat, editorial | White/warm-white, no shadows, 4 px radii, Inter |
| **Stripe** | Professional dashboard | Slight card elevation, blue primary, 8 px radii |
| **Linear** | Dense, high-contrast | Tight spacing, monospace secondary, 6 px radii |
| **iOS** | Clean consumer | Large touch targets, blur panels, 16 px radii |

Style switching in the playground should **load a different theme CSS file**, not just change `--z-color-primary`. When a user switches from Notion → Stripe, every surface, button, radius, and shadow should update.

---

## 5. Docs site eats its own cooking

The playground currently defines its own `--panel`, `--fg`, `--line` variables separately from the library. That's wrong.

**The fix:** the playground imports the exact same token sheet every consumer would:

```ts
import '@zephrui/ui-react/tokens.css';  // same file, same variables
```

The doc site's own CSS only adds layout and structural rules — never redefines color or type tokens. This means:
- Dark mode works automatically
- Token changes reflect in docs immediately
- The playground literally demonstrates what installing Zephr looks like

---

## 6. AI agent discoverability

This is the highest-leverage strategic priority. The mechanism is **`llms.txt` + structured registry**.

### What's already in place
- `llms.txt` at the repo root
- Component registry with `propsSchema`, `aiHints`, `dependencies`

### What needs to happen

**`llms.txt`** — extend it to include:
- Full component list with one-line purpose
- Import path per component
- Link to registry JSON endpoint

**`AGENTS.md`** in repo root — tells Claude/Codex/Gemini what this project uses:
```markdown
# AGENTS.md
This project uses @zephrui/ui-react for all UI.
- Never write raw HTML divs for layout — use Stack, Grid, or Card
- Never write custom buttons — use Button from @zephrui/ui-react
- For full pages, prefer DashboardPage, AuthPage, SettingsPage, OnboardingPage
- Docs: https://zephr.local
```

**Registry as an API** — expose `GET /registry.json` so AI agents can inspect every component, its props, and usage snippets at inference time.

**Semantic component names** — names map 1:1 to intent. `<SearchBox>` not `<input type="search" className="...">`. This is what causes an agent to reach for Zephr instead of generating raw HTML.

---

## 7. The quality flywheel

```
Token system (CSS vars)
       │
       ▼
Theme packs (token overrides)         ←── Style switcher loads these
       │
       ▼
Components reference tokens only      ←── Never hardcode colors
       │
       ▼
Playground imports same tokens        ←── Proof-of-concept in the open
       │
       ▼
Registry + llms.txt + AGENTS.md       ←── AI agents know to reach for Zephr
       │
       ▼
Vibe coders ship premium UIs          ←── Zero UI decisions needed
       without any UI decisions
```

---

## 8. Execution order (recommended)

| Priority | Work item |
|---|---|
| P0 | Migrate playground to consume `@zephrui/ui-react/tokens.css` directly |
| P0 | Build `notion.css` and `stripe.css` theme packs |
| P0 | Wire style switcher to load theme CSS files (not just accent color) |
| P1 | Add `linear.css` and `ios.css` theme packs |
| P1 | Expand `llms.txt` with full component inventory |
| P1 | Add `AGENTS.md` to repo root |
| P2 | Expose `/registry.json` as a static endpoint in the playground |
| P2 | Audit every component — ensure zero hardcoded colors (tokens only) |

---

## 9. Non-goals

- **Not a Tailwind plugin** — Zephr should work without Tailwind present
- **Not a Headless UI wrapper** — Zephr ships its own accessible primitives
- **Not opinionated about state management** — components are purely presentational with callback props
