# Zephr Project Handoff

Last updated: March 18, 2026

---

## 1) Product Scope (Current)

Zephr is a single-product UI system focused on:

- token-native theming,
- React component primitives + composed blocks,
- AI-first integration (CLI context files, registry hints, MCP tools),
- plug-and-play setup for AI-assisted app building.
- a single premium public theme in docs, with accent-color customization.

Multi-product experiments are out of scope for this phase.

### March 10 product-direction update

The current public UX direction is no longer "multiple themes exposed in docs." The active direction is:

- one premium default public theme,
- accent-only customization in docs,
- `Pages` as the showcase layer,
- `Components` as the technical reference layer,
- `Pages > V2` as the curated premium SaaS direction.

`Pages > V2` is now being rebuilt against Attio-style product UI benchmarks:

- calmer white/neutral surfaces,
- thin borders,
- low shadow,
- compact SaaS spacing,
- tables, split views, pipelines, sidebars, settings, search, and record-detail patterns,
- less decorative gallery art and more reusable product surfaces.

---

## 2) Locked Architecture Decisions

1. No Tailwind dependency in core product flow.
2. Zephr tokens are the source of truth (`--z-*` namespace).
3. Theme packs still exist in the codebase as static CSS assets, but public docs UX is currently simplified to a single premium theme plus accent selection.
4. `Pages` uses a `V1 / V2` comparison model:
   - `V1` preserves the broader exploratory showcase
   - `V2` is the curated premium SaaS direction
5. Docs playground must consume the same token/component primitives as package consumers.
6. AI integration is required, not optional:
   - `zephr init` writes `CLAUDE.md`, `AGENTS.md`, `llms.txt`
   - registry entries include structured `aiHints`
   - MCP exposes `scaffold_page` and `apply_theme`

---

## 3) Public Interface Snapshot

### Style pack type

`StylePackName = "notion" | "stripe" | "linear" | "framer"`

### Config

`zephr.config.ts` accepts:

- `stylePack`
- `tokens`
- `semanticAliases`
- `prefix`
- `plugins`
- `cloud`

### CLI (current key commands)

- `zephr init`
- `zephr add <component>`
- `zephr theme [<pack>] [--accent <hex>] [--list]`
- `zephr doctor`
- `zephr list`

### Compatibility window

Legacy pack names are still read via a mapper with deprecation warnings for one transition cycle.

### Docs UX note

The docs currently do **not** expose public multi-theme switching. The visible public customization path is:

- one premium default theme,
- accent color selection,
- `Pages > V1 / V2` for showcase comparison only.

---

## 4) Sprint F Status

### Completed

1. Token contract standardized under `--z-*`.
2. Four style packs implemented and exported as CSS assets:
   - `packages/ui-react/src/themes/notion.css`
   - `packages/ui-react/src/themes/stripe.css`
   - `packages/ui-react/src/themes/linear.css`
   - `packages/ui-react/src/themes/framer.css`
3. Docs playground style switching wired to theme asset swapping.
4. Structured registry `aiHints` implemented.
5. CLI context-file generation implemented in `init`.
6. MCP tools include `scaffold_page` + `apply_theme`.
7. Guard script added to catch raw theme color literals in docs styles.
8. Token pipeline fixed: `buildExpandedColorPalettes` (App.tsx) no longer overrides pack-defined background/stroke/text tones with computed gradients — pack values from `stylePacks.ts` are now authoritative for neutral scales; only accent and semantic color scales remain computed from the accent color.
9. Notion pack token values corrected (March 9, 2026):
   - `background100`: `#f5f5f5` → `#f7f7f7` (JS `stylePacks.ts` + `notion.css`)
   - `stroke100`: `#f3f4f6` → `#ebebeb` (JS `stylePacks.ts`; `notion.css` was already `#EBEBEB`)
10. Docs playground visual polish (March 9, 2026):
    - Right-rail ("On this page") `border-left` changed to `var(--line)` — consistent with all other structural borders.
    - Colors page redesigned: split swatch (light left / dark right) replaced with a single 80px swatch showing the active mode's color; table simplified from 3 columns to 2 ("Variable Name" / "Value"); `foundationColorGroups` useMemo now takes `darkMode` as a dependency and computes `activeColor` per token.

11. Widgets library shipped (March 8–9, 2026):
    - 60 widget components in `packages/ui-react/src/widgets/Widgets.tsx` (4244 lines).
    - All widgets implement `WidgetSurface` type: `"elevated" | "outlined"`.
    - Exported via `packages/ui-react/src/index.ts` → `export * from "./widgets/Widgets"`.
12. Docs playground architecture refactored (March 8–9, 2026):
    - `WidgetsPage.tsx` (879 lines): interactive widget showcase with category filtering and search.
    - `TemplatesPage.tsx` (2116 lines): template showcase with tier-aware access (free/pro) and code snippets.
    - `widgetsCatalog.ts`: 49 navigation entries covering workflow, forms, team, settings domains.
    - `templatesCatalog.ts`: 24 page examples (OpsCenter, TeamWorkspace, AdminHub, etc.) with category flags.
    - App.tsx reduced by ~925 lines via extraction into dedicated view files; lazy-loads WidgetsPage and TemplatesPage.
13. README overhaul (March 7, 2026):
    - All package READMEs rewritten for GitHub and npm: `core`, `ui-react`, `ai-registry`, `cli`, `mcp-server`, `avatars`, `icons-material`, `logos`.
    - Root README updated with product positioning and package overview.
14. MCP server npx support (March 7, 2026):
    - `package.json` now has `bin` entry: `zephr-mcp` → `dist/index.js`.
    - Shebang added to `src/index.ts` for direct CLI execution.
15. Vercel routing fixes (March 6–7, 2026):
    - Multiple iterations to resolve multi-segment API path routing.
    - Final solution: `api/[[...route]].ts` catch-all with `vercel.json` rewrites.
    - Root `vercel.json` cleaned to remove docs-specific settings (separate project).
    - Workspace dist files committed for Vercel deployment.
16. npm scope rename (March 6, 2026):
    - All packages renamed from `@zephr/*` → `@zephrui/*`.
    - Publish scripts corrected to match new scope.
17. Theme CSS files fully expanded (March 8–9, 2026):
    - All four packs (`notion.css`, `stripe.css`, `linear.css`, `framer.css`) now ~6.5 KB each.
    - Complete `--z-color-*` variable coverage: background, text, stroke, accent, semantic scales.
    - Light + dark mode mappings in all four files.
18. Layout polish (March 9, 2026):
    - Component gallery cards switched to 4-column grid.
    - `BrowserPreviewFrame` changed to stroke-only (no fill background).
    - Right-rail border consistency applied across all structural borders.
19. Monetization restructure (March 9, 2026):
    - **Old model**: 3 tiers (Individual/Startup/Enterprise), components gated, style packs gated.
    - **New model**: Single $49 one-time payment, ALL components + ALL 4 style packs free, 20 premium example templates are the paid gate.
    - `CheckoutPlanId` type simplified: `"individual" | "startup" | "enterprise"` → `"templates"`.
    - `CHECKOUT_PLAN_META` reduced to single "Templates" entry.
    - `LicenseKeyModal` redesigned: single feature card ($49 · one-time, feature list, "Get Templates — $49" CTA) + key input below.
    - Header CTA: "Unlock Pro" → "Get Templates"; "✓ Pro" → "✓ Templates".
    - All component-level PRO badges removed from sidebar nav + gallery grid.
    - Templates sidebar link: PRO badge removed (template section always visible, 20 premium examples gated within TemplatesPage).
    - `cloud-api/src/billing.ts`: `LicensePlan` simplified to `"pro" | "free"`, entitlement for "pro" = `["ui.page-templates"]` only, single `getBillingPlans()` returning "templates" plan.
    - `packages/cloud-sdk/src/types.ts`: `CloudBillingPlan.id` widened to `string` (future-proofed).
    - Env vars: `VITE_ZEPHR_CHECKOUT_INDIVIDUAL/STARTUP/ENTERPRISE` removed → `VITE_ZEPHR_CHECKOUT_TEMPLATES`.
    - Lemon Squeezy: update to single product "Zephr Templates", set `ZEPHR_LS_VARIANT_TEMPLATES`.
20. Docs UX direction (March 9, 2026):
    - Default view changed from `"introduction"` → `"component-gallery"` (oat.ink-inspired, tool-first).
    - Mission & Vision + Team removed from Setup sidebar nav (→ future marketing site).
    - Reference sites: **oat.ink** = Phase 1 docs target (component-first, zero friction); **solodesign.cc** = Sprint M marketing site target (story-driven, single price, visual hero).
21. Public docs simplified to single-theme UX (March 10, 2026):
    - public multi-theme controls removed from docs header/sidebar
    - accent color remains
    - style-pack infrastructure remains in codebase but is no longer the active public docs story
22. `Pages` now has `V1 / V2` showcase comparison (March 10, 2026):
    - selector appears in navbar when `Pages` is active
    - `V1` preserves earlier exploratory gallery work
    - `V2` is the premium rebuild track and should be treated as the primary direction
23. `Pages > V2` is now curated and intentionally narrow (March 10, 2026):
    - widgets sidebar in V2 only shows the curated subset from `widgetsV2CatalogIds`
    - templates sidebar in V2 only shows the curated subset from `templatesV2CatalogIds`
    - visible density reduced to:
      - widgets: 3 spotlight + 3 library entries
      - templates: 2 spotlight + 3 library entries
24. `Pages > V2` shifted from decorative gallery art to Attio-style SaaS preview language (March 10, 2026):
    - tables
    - split detail views
    - pipelines / kanban boards
    - list-detail shells
    - support queue / detail patterns
    - calmer neutral surfaces and thinner borders
25. Widgets page shell cleanup (March 10, 2026):
    - right rail removed from `Pages`
    - `Preview / Code / Copy` shell aligned with other pages for consistency
    - extra gradients, hero metrics, widget-count pills, helper lines, and section marketing copy removed
    - gallery sections flattened to line-separated editorial sections rather than nested cards
26. Widget internals flattened substantially (March 10, 2026):
    - repeated card-in-card patterns replaced with divider rows and simpler bands
    - premium/featured widgets cleaned first, then older utility widgets
    - current gap is now art direction and full-page SaaS fidelity, not raw structural clutter

27. Docs content audit and fluff removal (March 18, 2026):
    - **Removed pages**: Speed Insights (Vercel product, unrelated to Zephr), Mission (philosophy fluff), Team (low-value at this stage).
    - **Removed content blocks**: `zephr_render` demo section, "How It Works" 3-step flow, `cloud-assets` section from component pages, raw JSON registry schema section from API Reference.
    - **Removed stale TOC links**: `#cloud-assets` and `#api-examples` links from right-rail TOC.
    - **Removed from sidebar nav**: Speed Insights button removed from Setup section.
    - **Docs philosophy locked**: Content must be minimal, clear, and direct for Developers, Founders, and Early Vibe Coders. No fluff. No philosophy. No self-congratulatory copy.
    - Net change: ~1200 lines removed from `App.tsx`.
28. Docs CSS premium polish pass (March 18, 2026):
    - Applied consistent white `#ffffff` bg + `1px solid #e5e7eb` border + `border-radius 16px` design language to all remaining docs pages: Slash Commands, Foundations, Widgets, Templates.
    - Component page polish: larger hero h1 (`clamp(2rem, 3vw, 2.75rem) / 800 weight`), refined breadcrumbs, `.preview-browser` at 14px radius, `.api-meta-card` white bg, `.install-step-number` solid accent squircle, `.related-card` and `.gallery-card` white bg + 14px radius.
    - Solid accent step numbers (no gradients) used consistently across all install/how-to step sequences.
    - CSS corrections appended at end of file using `!important` source-order win to override older layered rules without refactoring specificity.
29. Social meta image updated (March 18, 2026):
    - OG and Twitter Card image updated to `/social/meta-image.png` (1800×945).
    - `index.html` `og:image:width` / `og:image:height` corrected to match.
30. Vercel deployment fixed (March 18, 2026):
    - Changed `vercel.json` `buildCommand` from `pnpm docs:build` to `pnpm --filter @zephrui/docs-playground build` — the root alias was not being resolved when Vercel detected Turbo.
    - Added `"framework": null` to `vercel.json` — Vercel's Turbo auto-detection was overriding `outputDirectory`, causing a "no dist found" failure even when the build succeeded.
    - Vite output goes to `apps/docs-playground/dist`; `outputDirectory` in `vercel.json` must remain `apps/docs-playground/dist`.
    - Turbo detection interference: any time Vercel logs "Detected Turbo. Adjusting default settings...", treat it as a flag that `framework: null` is needed to lock custom build/output settings.

### In progress / pending

1. Complete visual regression coverage across all 4 packs in light/dark.
2. Expand generated AI snippets and MCP scaffolds for page-level quality consistency.
3. Continue component-depth pass (variant completeness + interaction states) with consistent token usage.
4. Audit remaining packs (stripe/linear/framer) — confirm their JS token values in `stylePacks.ts` match their CSS theme files after the token pipeline fix.

---

## 5) Component Surface (as of March 10, 2026)

### Atoms (15)
Button, Input, Textarea, Select, Checkbox, Radio, Switch, Badge, Avatar, Logo, Card, Divider, Progress, Skeleton, Slider

### Molecules (20)
SearchBox, FormField, InputGroup, Dropdown, Tabs, Accordion, DatePicker, ColorPicker, Alert, Toast, Breadcrumbs, Pagination, CommandBar, ButtonGroup, RichEditor, Tooltip, Popover, ComboBox, NumberInput, TagInput

### Organisms (13)
Navbar, Header, SidebarNav, DataTable, SearchResultsPanel, FiltersBar, ModalDialog, LayoutShell, IconLibrary, AvatarLibrary, LogoLibrary, Sheet, AlertDialog

### Layout (4)
Stack, Grid, Box, Spacer

### Templates (5)
DashboardPage, AuthPage, SettingsPage, OnboardingPage, MarketingPage

### Widgets (60)
Full widget library in `packages/ui-react/src/widgets/Widgets.tsx`. All implement `WidgetSurface` type.

### Page Examples (20)
OpsCenter, TeamWorkspace, AdminHub, GrowthWorkspace, SupportDesk, DevConsole, ReleaseCenter, AnalyticsWorkspace, BillingConsole, CRMWorkspace, AuditCenter, ContentStudio, SupportPortal, FinanceWorkspace, ProductReviewBoard, CustomerOnboarding, ReferralCenter, AIComposerStudio, DeliveryOperations, GrowthInsights.

---

## 6) Package Responsibilities

- `@zephrui/core`: token model, style pack resolution, config resolution, compiler utilities.
- `@zephrui/ui-react`: component library + theme CSS assets + templates.
- `@zephrui/ai-registry`: component metadata, schemas, AI hint structures.
- `@zephrui/mcp-server`: AI tooling surface (`search`, `spec`, `scaffold_page`, `apply_theme`, etc.).
- `@zephrui/cli`: project bootstrap and configuration workflows.
- `@zephrui/cloud-sdk` / `apps/cloud-api`: cloud feature surface and API integration.
- `apps/docs-playground`: product docs + interactive component playground.

---

## 7) Docs Playground Baseline

The docs playground is the single visual QA and demonstration surface:

- public docs UX uses a single premium default theme
- accent color selection remains
- `Pages` exposes `V1 / V2` showcase comparison
- `Pages > V2` is the active premium SaaS rebuild path
- `Pages` does not show the right-rail "On this page" sidebar
- shared `Preview / Code / Copy` shell should be visually consistent across Components and Pages

### Architecture (as of March 10, 2026)

Key files and sizes:

| File | Lines | Purpose |
|---|---|---|
| `App.tsx` | ~7544 | Main app shell, routing, showcase mode state, component detail views |
| `styles.css` | ~6064 | Structural layout, docs shell, V2 showcase styling, token-bridge aliases |
| `views/WidgetsPage.tsx` | ~1190 | Widget showcase with V1/V2 behavior, curation, category filtering, and search |
| `views/TemplatesPage.tsx` | ~2506 | Template/page showcase with V1/V2 behavior and curated premium previews |
| `views/widgetsCatalog.ts` | 50 entries | Widget navigation metadata + curated V2 widget subset IDs |
| `views/templatesCatalog.ts` | 25 entries | Template/example navigation metadata + curated V2 template subset IDs |

Public navigation emphasis: Setup, Components, Pages, Changelog.

WidgetsPage and TemplatesPage are lazy-loaded from App.tsx.

### Current V2 showcase state

- `Pages > V2` is the premium SaaS exploration track
- benchmark has shifted from Sigma-style library curation to Attio-style SaaS product UI
- current V2 work favors:
  - recruiting tables
  - CRM detail views
  - split activity/detail shells
  - support queues
  - settings and record management surfaces
- V2 is curated on purpose; breadth should not increase until the visual system is stable

---

## 8) Local Runbook

From repo root:

1. Install:
   - `corepack pnpm install`
2. Docs dev:
   - `corepack pnpm --filter ./apps/docs-playground dev`
3. Docs build:
   - `corepack pnpm --filter ./apps/docs-playground build`
4. Monorepo validation:
   - `corepack pnpm test`
   - `corepack pnpm build`

---

## 9) Release Readiness Checklist

1. Accent switching visibly updates docs previews and shared component surfaces without breaking contrast or layout.
2. Shared `Preview / Code / Copy` shell is consistent between Components and Pages.
3. `Pages > V2` stays curated and visually calmer than `V1`.
4. Docs theme-color guard passes (no disallowed raw shell colors).
5. `zephr init` emits all AI context files correctly.
6. Registry schema validates structured AI hints for all components.
7. MCP contract tests pass for `scaffold_page` and `apply_theme`.
8. Accessibility smoke pass covers top-tier SaaS widgets/pages, not only primitive components.

---

## 10) Immediate Next Steps

1. Rebuild `Pages > V2` full-page examples around Attio-style SaaS patterns:
   - record detail
   - recruiting / CRM tables
   - split activity/detail views
   - pipelines / kanban boards
   - support queue / detail shells
2. Redesign the top V2 widgets so their internals match the same product language as the page examples.
3. Keep V2 curated; do not add more breadth until visual consistency is solved.
4. Finalize docs-shell token parity and remove remaining local visual exceptions where possible.
5. Tighten AI output quality with richer `aiHints` negative guidance and scaffold examples.

---

## 11) Token Pipeline Architecture (Critical for Docs Playground)

The docs playground injects design tokens at runtime via JS — it does **not** import `notion.css` directly.

### Flow

```
stylePacks.ts (notion light/dark PackColors)
  → composeColorTokens()         → flat { background100, stroke100, ... }
  → buildExpandedColorPalettes() → adds computed accent + semantic scales
  → buildGlobalThemeCss()        → merges into DesignTokens, spreads expanded palette
  → generateCssVariables()       → emits :root { --z-color-background100: ...; ... }
  → <style> tag in React          → CSS custom properties available to all components
```

### Key rule

**Background / stroke / text tones are authoritative from `stylePacks.ts`.**
`buildExpandedColorPalettes` (App.tsx ~line 578) spreads `...lightBase` and `...darkBase` from `composeColorTokens()`, which already contains all neutral tones. The function then adds computed accent and semantic scales on top — it must NOT re-assign `background*`, `stroke*`, or `text*` keys, as that would override the hand-crafted pack values.

### Where to change token values

| Token category | Authoritative source |
|---|---|
| background, stroke, text, accent, semantic colors | `packages/core/src/stylePacks.ts` → `createPack(light, dark)` |
| CSS theme files (static consumers) | `packages/ui-react/src/themes/notion.css` etc. |
| Computed accent scales in docs | `buildExpandedColorPalettes()` in `apps/docs-playground/src/App.tsx` |
| Bridge aliases for docs shell | `apps/docs-playground/src/styles.css` `:root` block |

Changes to `notion.css` do **not** affect the playground (it uses JS-generated vars). Changes must be made in `stylePacks.ts`.

---

## 12) Files to Read First (for New Agent)

1. `packages/core/src/types.ts`
2. `packages/core/src/stylePacks.ts`
3. `packages/core/src/tokens.ts`
4. `packages/ui-react/src/themes/notion.css`
5. `apps/docs-playground/src/App.tsx`
6. `apps/docs-playground/src/styles.css`
7. `apps/docs-playground/src/views/WidgetsPage.tsx`
8. `apps/docs-playground/src/views/TemplatesPage.tsx`
9. `packages/ui-react/src/widgets/Widgets.tsx`
10. `packages/ai-registry/src/index.ts`
11. `packages/mcp-server/src/tools.ts`
12. `packages/cli/src/index.ts`

---

## 13) Non-Negotiable Guardrails

1. Do not reintroduce Tailwind as required setup.
2. Do not add new public style pack names outside the locked 4 without explicit owner sign-off.
3. Do not hardcode shell theme colors where token aliases can be used.
4. Do not generate raw HTML controls in snippets when Zephr component equivalents exist.
5. Keep docs, CLI, registry, and MCP terminology aligned to the same pack names and token contract.

---

## 14) Hardening Pass (March 5, 2026)

### Shipped in this pass

1. Cloud API request hardening:
   - JSON parsing now validates malformed payloads (`400 INVALID_JSON`).
   - Request size guard added (`413 PAYLOAD_TOO_LARGE`, 1 MB default).
   - Optional strict JSON content type enforcement for POST endpoints (`415 UNSUPPORTED_MEDIA_TYPE`).
   - Central `HttpError` handling added so malformed requests never crash route handling.
2. Cloud API response hardening:
   - Added security headers in `sendJson`: `X-Content-Type-Options`, `Referrer-Policy`, `Cache-Control`.
   - Added explicit CORS methods and configurable CORS origin via `ZEPHR_CORS_ORIGIN`.
3. Cloud SDK hardening:
   - Base URL validation added (must be valid `http` or `https` URL).
   - Request timeout support (`timeoutMs`, default 10s).
   - Typed non-2xx errors via `ZephrCloudError`.
   - Invalid JSON responses now fail fast with explicit error.
4. Docs runtime resilience:
   - Added `AppErrorBoundary` in docs playground entrypoint to avoid blank-screen failures.
   - Added user-facing fallback card with reload action on runtime exceptions.
5. CI/test stability:
   - `@zephrui/forms` test script now uses `--passWithNoTests` to avoid false-negative CI failures.

### Validation status

1. `corepack pnpm --filter @zephrui/cloud-api test` ✅
2. `corepack pnpm --filter @zephrui/cloud-sdk test` ✅
3. `corepack pnpm --filter @zephrui/docs-playground build` ✅
4. `corepack pnpm test` (monorepo) ✅
5. `corepack pnpm build` (monorepo) ✅

---

## 15) Billing + Licensing Architecture (Locked)

### Recommended public checkout model

Zephr should use the simplest reliable commercial flow:

1. Lemon Squeezy hosted checkout links for exactly 3 one-time plans:
   - `individual`
   - `startup`
   - `enterprise`
2. Lemon Squeezy webhooks as the source of truth for fulfillment.
3. Supabase as the production persistence layer for license state.
4. Zephr docs app only opens checkout URLs and validates / activates licenses through Zephr API.

### Why this is the locked recommendation

1. Lowest ongoing complexity:
   - no custom checkout UI
   - no local payment state machine in frontend
   - no subscription-first lifecycle unless product strategy explicitly changes
2. Lowest practical cost without compromising reliability:
   - Lemon Squeezy handles checkout, tax, payment methods, receipts, and fraud surface
   - Supabase free/pro tiers are sufficient for early-stage license persistence
3. Best operational model:
   - user flow depends on checkout redirect UX
   - business state depends on webhook delivery + persisted license records

### Explicit guardrails

1. Do not rely on success-return query params to grant access.
2. Do not make client-side plan state authoritative.
3. Do not add a custom payment form before product-market fit.
4. Do not ship production with file-backed license storage as the primary store.
5. Do not enable unsigned webhook acceptance in production.

### Current implementation status

Already implemented in repo:

1. `GET /v1/licenses/plans`
2. `POST /v1/webhooks/lemonsqueezy`
3. `POST /v1/licenses/validate`
4. `POST /v1/licenses/activate`
5. `POST /v1/licenses/deactivate`
6. Supabase-first license persistence with file fallback
7. docs-playground Unlock modal with plan-aware checkout buttons

### Production env requirements

Cloud API:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `LEMON_SQUEEZY_API_KEY`
- `LEMON_SQUEEZY_WEBHOOK_SECRET`
- `ZEPHR_REQUIRE_WEBHOOK_SIGNATURE=true`
- `ZEPHR_ALLOW_LOCAL_LICENSE_FALLBACK=false`
- `ZEPHR_LS_VARIANT_INDIVIDUAL`
- `ZEPHR_LS_VARIANT_STARTUP`
- `ZEPHR_LS_VARIANT_ENTERPRISE`
- `ZEPHR_LS_CHECKOUT_INDIVIDUAL`
- `ZEPHR_LS_CHECKOUT_STARTUP`
- `ZEPHR_LS_CHECKOUT_ENTERPRISE`
- `ZEPHR_CORS_ORIGIN`

Docs app:

- `VITE_ZEPHR_CLOUD_URL`

Optional docs fallback only:

- `VITE_ZEPHR_CHECKOUT_INDIVIDUAL`
- `VITE_ZEPHR_CHECKOUT_STARTUP`
- `VITE_ZEPHR_CHECKOUT_ENTERPRISE`

---

## 16) Deployment Direction (Cost-Optimized)

### Vercel docs deployment config (locked, March 18 2026)

`vercel.json` at repo root:

```json
{
  "framework": null,
  "installCommand": "corepack enable && corepack pnpm install --frozen-lockfile",
  "buildCommand": "pnpm --filter @zephrui/docs-playground build",
  "outputDirectory": "apps/docs-playground/dist",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Key rules:
- `framework: null` is required — Vercel's Turbo auto-detection overrides `outputDirectory` if not disabled.
- `buildCommand` must use `--filter` directly, not the root `docs:build` alias, because the alias is not resolved under Turbo detection.
- `outputDirectory` must be the full path from repo root (`apps/docs-playground/dist`).

### Recommended near-term deployment

If speed matters more than platform consolidation:

1. Docs: Vercel
2. Cloud API: any cheap Node host
3. Persistence: Supabase

This works immediately because current `apps/cloud-api` is still a long-running Node server.

### Recommended long-term deployment

If cost minimization and reduced moving parts matter more than zero-refactor deployment:

1. Docs: Vercel
2. API: Vercel Functions
3. Persistence: Supabase
4. Billing: Lemon Squeezy hosted checkout + webhooks

This is the preferred end state because it removes the extra API host without reducing production quality, as long as the API is fully stateless.

### Quality / performance position

Refactoring the API to Vercel Functions does not reduce quality if these conditions are met:

1. No local filesystem persistence in production path.
2. Supabase is authoritative for license / webhook / activation state.
3. Webhook handlers are idempotent.
4. Read endpoints use appropriate caching.
5. Request validation, auth, and rate limiting remain intact.

---

## 17) Minimal Vercel Refactor Plan

### Goal

Convert `apps/cloud-api` from a manually hosted Node server into request-based handlers that can run on Vercel Functions.

### Minimum required changes

1. Replace `createServer(...).listen(...)` entrypoint with request handler exports.
2. Split route logic from server bootstrap:
   - keep route parsing / business logic in reusable functions
   - expose a thin handler per endpoint or a single shared catch-all adapter
3. Remove file-store dependency from production path:
   - keep file fallback for local dev only
   - production should fail loudly if Supabase is missing
4. Keep webhook verification and idempotent persistence exactly as-is conceptually.
5. Ensure all endpoints are stateless and do not assume process-local memory.

### Suggested execution order

1. Extract pure request handling from `apps/cloud-api/src/index.ts`
2. Introduce serverless adapter layer for Vercel
3. Gate file fallback to development only
4. Re-run current API tests against handler entrypoints
5. Deploy API on Vercel only after webhook + validation smoke tests pass

### Not required for this refactor

1. No billing model change
2. No checkout UX rewrite
3. No docs UI rewrite
4. No CLI / registry interface changes

---

## 18) Immediate Next Steps (Business + Infra)

1. Wire real Lemon Squeezy production env values.
2. Configure Supabase schema and production service-role access.
3. Complete one real purchase and verify:
   - webhook delivery
   - license persistence
   - validate
   - activate
4. Keep docs and API on separate Vercel projects (`zephr-docs`, `zephr-api`) and finish production env validation there before adding more infra.
5. If public launch is close, prioritize:
   - license/account UX
   - refund/cancellation handling
   - legal pages
   - support/contact path

---

## 19) Launch Checklist (Minimum Public Release)

### Billing + license flow

1. `GET /v1/licenses/plans` returns the single paid `templates` plan with a real checkout URL.
2. Docs "Get Templates" modal opens the correct hosted checkout.
3. Lemon Squeezy webhook is configured and signed.
4. One real purchase has been completed end-to-end.
5. Purchased key validates successfully via `POST /v1/licenses/validate`.
6. Purchased key activates successfully via `POST /v1/licenses/activate`.
7. Deactivation flow works via `POST /v1/licenses/deactivate`.

### Production safety

1. `ZEPHR_REQUIRE_WEBHOOK_SIGNATURE=true`
2. `ZEPHR_ALLOW_LOCAL_LICENSE_FALLBACK=false`
3. Supabase is configured and being used as primary backend.
4. CORS is restricted to real docs domain.
5. Production API key is set for protected cloud endpoints.
6. Health endpoint confirms Lemon Squeezy + licensing integration state.

### User-facing readiness

1. Pricing page / upgrade messaging matches actual plan names.
2. Legal pages exist:
   - Terms
   - Privacy
   - Refund / support policy
3. Contact/support path exists.
4. Install docs are accurate for current package state.
5. AI setup docs cover:
   - `zephr init`
   - `CLAUDE.md`
   - `AGENTS.md`
   - `llms.txt`

### QA

1. Docs build passes.
2. Cloud API build passes.
3. Cloud SDK tests pass.
4. Critical component pages are visually checked in both light and dark mode.
5. License modal and checkout CTA are verified on mobile width.

### Separate Vercel API project checklist

Create a second Vercel project for `apps/cloud-api` with:

1. root directory:
   - `apps/cloud-api`
2. framework preset:
   - `Other`
3. output directory:
   - leave unset
4. config source:
   - `apps/cloud-api/vercel.json`

Required env vars for the API project:

- `NODE_ENV=production`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `LEMON_SQUEEZY_API_KEY`
- `LEMON_SQUEEZY_WEBHOOK_SECRET`
- `ZEPHR_REQUIRE_WEBHOOK_SIGNATURE=true`
- `ZEPHR_ALLOW_LOCAL_LICENSE_FALLBACK=false`
- `ZEPHR_LS_VARIANT_INDIVIDUAL`
- `ZEPHR_LS_VARIANT_STARTUP`
- `ZEPHR_LS_VARIANT_ENTERPRISE`
- `ZEPHR_LS_CHECKOUT_INDIVIDUAL`
- `ZEPHR_LS_CHECKOUT_STARTUP`
- `ZEPHR_LS_CHECKOUT_ENTERPRISE`
- `ZEPHR_CORS_ORIGIN`
- `ZEPHR_API_KEYS`

Required env var for the docs project:

- `VITE_ZEPHR_CLOUD_URL=https://<your-api-project>.vercel.app`

Required Lemon Squeezy webhook target:

- `https://<your-api-project>.vercel.app/v1/webhooks/lemonsqueezy`

---

## 20) Vercel Refactor Estimate (Based on Current Code)

### Current shape

The refactor is moderate, not extreme.

Most business logic already exists in reusable modules:

1. `apps/cloud-api/src/license.ts`
2. `apps/cloud-api/src/licenseStore.ts`
3. `apps/cloud-api/src/billing.ts`
4. `apps/cloud-api/src/lemonsqueezy.ts`
5. `apps/cloud-api/src/audit.ts`

The main server-specific coupling is concentrated in:

1. `apps/cloud-api/src/index.ts`
2. `apps/cloud-api/src/http.ts`
3. `apps/cloud-api/src/auth.ts`

### Current extraction status

As of March 6, 2026:

1. Framework-neutral app handler exists in:
   - `apps/cloud-api/src/app.ts`
2. `apps/cloud-api/src/index.ts` is now a thin Node adapter:
   - reads raw request body
   - constructs app request
   - delegates to `handleAppRequest(...)`
   - serializes returned response via `sendJson(...)`
3. HTTP integration tests now exercise the extracted app handler instead of mirroring route logic manually.
4. First Vercel function entrypoint exists in:
   - `apps/cloud-api/api/[[...route]].ts`
5. Vercel route rewrites for pretty public endpoints exist in:
   - `apps/cloud-api/vercel.json`

This means the next Vercel pass should start from `app.ts`, not from the old server bootstrap.

### Main blockers to Vercel Functions

1. `index.ts` is still built around `IncomingMessage` / `ServerResponse`.
2. `http.ts` reads raw request streams and writes directly to Node responses.
3. `auth.ts` depends on Node request typing instead of plain headers.
4. `auditLog()` optionally writes to filesystem; that should be stdout-only in serverless.
5. In-memory rate limiters are process-local and become soft / non-deterministic on serverless instances.

### What this means in practice

The route logic itself is not the hard part. The real work is:

1. extracting a framework-neutral request context,
2. returning plain response objects instead of mutating Node response streams,
3. swapping the bootstrap layer for Vercel handlers,
4. deciding whether current in-memory rate limiting is acceptable for hobby launch.

### Practical estimate

Assuming no product-scope changes, this is roughly:

1. 1 pass to extract handler core from `index.ts`
2. 1 pass to adapt `http.ts` + `auth.ts` to a request/response abstraction
3. 1 pass to add Vercel function entrypoints and smoke tests
4. 1 pass to verify webhooks, raw body handling, and Supabase persistence in deployed environment

That is a realistic small refactor, not a rewrite.

### Recommendation

If launch speed is the top priority, launch first on a cheap Node host + Supabase.

If minimizing long-term cost and platform sprawl is the top priority, do the Vercel Functions refactor before public launch. The current codebase is close enough that this is a reasonable next milestone.
