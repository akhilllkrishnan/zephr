# Zephyr Project Handoff

Last updated: March 4, 2026 (Session 7: Zephr-Audit Lite extended + deploy fixes)

## 0) Latest Delta (March 4, 2026 — Session 7: Zephr-Audit Lite extended + deploy fixes)

Completed in this pass:

1. **Zephr-Audit Lite completed end-to-end**
   - Added top-level `Audit` tab in docs playground.
   - Added audit form with URL, screenshot URL, notes.
   - Added direct API key controls on the audit page itself (`Save API key`, `Use local only`).
   - Added results UI: score, status, issue cards, recommendations, predicted attention map.
   - Added generated **AI remediation prompt** with one-click copy for Codex/Claude/Cursor workflows.

2. **Cloud API audit route added**
   - `POST /v1/audit/url` added in `apps/cloud-api/src/index.ts`.
   - New heuristic scanner module `apps/cloud-api/src/audit.ts` with checks for:
     - title/meta/viewport/lang/main landmarks
     - heading hierarchy
     - image alt coverage
     - form labels
     - CTA clarity/navigation semantics
   - Returns structured report with score + status + recommendations + predicted attention areas.

3. **Cloud SDK audit support added**
   - Added audit request/report interfaces in `packages/cloud-sdk/src/types.ts`.
   - Added `runUrlAudit()` client method in `packages/cloud-sdk/src/index.ts`.

4. **Validation and tests**
   - `@zephyr/cloud-sdk` tests passing.
   - `@zephyr/cloud-api` tests passing (module + HTTP).
   - `@zephyr/docs-playground` build passing.
   - Monorepo build passing.

5. **Vercel deployment path issue resolved**
   - Updated `vercel.json` to resilient build/output behavior for monorepo path differences.
   - Verified successful production deployment in Vercel logs after fix.

6. **Git status / commits**
   - `e51bccf` — Add Zephr-Audit Lite MVP with cloud and docs integration.
   - `1b21960` — Add direct API key controls to Audit Lite page.
   - Both pushed to `origin/main`.

### Runbook (current)

1. Start cloud API:
   - `corepack pnpm --filter @zephyr/cloud-api build`
   - `node apps/cloud-api/dist/index.js`
2. Start docs playground:
   - `corepack pnpm --filter @zephyr/docs-playground dev`
3. Open:
   - `http://localhost:4172/?view=audit` (or current Vite port)
4. For cloud scan mode, use key:
   - `dev_local_key`

### Known Open Decisions / Pending

1. **Product naming alignment**
   - Project docs currently use both `Zephyr` and `Zephr-*` naming variants.
   - Decision needed: lock brand string to `Zephyr` or `Zephr` across UI, domain, and package docs.

2. **Theme model simplification**
   - User preference is moving toward single base theme + accent-only personalization.
   - Current docs still contain style pack controls in some places; cleanup pass pending.

3. **Audit roadmap (next implementation)**
   - Add screenshot file upload (not only URL).
   - Add saved audit history endpoint + UI.
   - Add export actions (markdown/json/ticket payload).
   - Add continuous deploy-hook checks for `Zephr-Guard`.

---

## 0) Latest Delta (March 4, 2026 — Session 6: Zephr-Audit Lite MVP)

Completed in this pass:

1. **Audit service model added**
   - New cloud-sdk types for audit: `UrlAuditRequest`, `UrlAuditReport`, `UrlAuditIssue`, `UrlAuditHeatmapArea`.
   - New client method: `ZephyrCloudClient.runUrlAudit(payload)` calling `POST /v1/audit/url`.

2. **Cloud API endpoint added**
   - New route: `POST /v1/audit/url` (auth + `assets:read` scope).
   - Added `apps/cloud-api/src/audit.ts` with a real heuristic engine:
     - title/meta checks
     - viewport/lang/main landmark checks
     - heading hierarchy checks
     - image alt coverage checks
     - form label coverage checks
     - CTA clarity heuristics
   - Response includes:
     - numeric score and pass/warn/fail status
     - prioritized issues with severity + evidence + recommendation
     - top recommendations
     - predicted attention map (hero/mid/footer).

3. **Docs Playground: new Audit tab/page**
   - Top nav now includes `Audit`.
   - New `view="audit"` route state and left-nav section.
   - New page `Zephr-Audit Lite` with:
     - URL input
     - optional screenshot URL
     - optional context notes
     - `Run Audit Lite` action
   - Result view includes:
     - score badge + metadata
     - issue cards
     - recommendation list
     - predicted attention map bars
     - generated **AI remediation prompt** with one-click copy.

4. **Fallback behavior implemented**
   - Added `apps/docs-playground/src/auditLite.ts`.
   - If cloud client/key is unavailable or scan fails, docs auto-generates a local-lite heuristic report and surfaces fallback message.

5. **Tests and builds**
   - `@zephyr/cloud-sdk` tests pass (includes new audit client method test).
   - `@zephyr/cloud-api` tests pass (module + HTTP).
   - `@zephyr/docs-playground` build passes.
   - Full monorepo build passes.

### Next Steps

- Add screenshot file upload (not just URL) with local preview thumbnail in audit form.
- Add authenticated report history (`/v1/audit/history`) for saved scans.
- Add export actions: markdown report, JSON report, and issue ticket payload (Linear/Jira).
- Add deploy hook integration so Zephr-Guard can run audit automatically per preview URL.

---

## 0) Latest Delta (March 4, 2026 — Session 5: Component Preview Redesign)

Completed in this pass:

1. **BrowserPreviewFrame redesigned to match reference mockup**
   - New browser chrome: sidebar toggle icon, back/forward/refresh nav, centered address bar with lock + link icons, right-side circle + plus action buttons.
   - Added `toolbar` render prop slot — renders a `preview-toolbar-zone` bar between the chrome and the canvas.

2. **Button variant grid with filter toolbar**
   - Filter bar inside the browser frame: Type (All/Primary/Secondary/Ghost/Danger), Size (All/Small/Medium/Large), State (Default/Hover/Pressed/Loading/Disabled) dropdowns + "Only Icon" toggle switch.
   - PreviewSurface button section now renders a 3-column `variant-grid` with `variant-cell` items. Each cell shows a centered button + uppercase label (e.g. "PRIMARY / LOADING").
   - Filters are combinatorial: selecting a specific type shows one cell; selecting "All" with a state shows all 4 variants in that state.
   - "Only Icon" toggle replaces text labels with a "+" SVG icon inside each button.

3. **Old button controls removed**
   - The "Button props" panel (label input, variant dropdown, size dropdown) below the preview has been replaced by the in-frame filter toolbar.

4. **New CSS added**
   - `.preview-chrome-btn`, `.preview-browser-nav`, `.preview-browser-actions` — browser chrome icon buttons.
   - `.preview-address` updated — flex layout with lock/link icons, rounded-rect border.
   - `.preview-toolbar-zone` — filter bar zone between chrome and canvas.
   - `.variant-filters`, `.variant-filter-dropdown` — filter dropdowns with chevron SVG background.
   - `.variant-toggle`, `.variant-toggle-track`, `.variant-toggle-thumb` — custom toggle switch with accent coloring.
   - `.variant-grid`, `.variant-cell`, `.variant-cell-label` — grid layout with subtle cell borders.

5. **Verified in light + dark mode** — all new elements respond correctly to theme tokens.

### Next Steps
- User review of Button page. Once approved, extend variant grid pattern to all other component preview pages.
- Remaining: component states (loading/error/empty) for non-button components.

---

## 0.prev) Previous Delta (March 4, 2026 — Sprint 4 P0)

Completed in this pass:

1. **`"use client"` SSR audit — 30 files**
   - Every hook-using component now declares `"use client"` as its first line, making the entire library safe for Next.js App Router.
   - **`@zephyr/ui-react` atoms (10):** `Button`, `IconButton`, `Avatar`, `Checkbox`, `Input`, `Textarea`, `Select`, `Radio`, `Switch`, `Slider`
   - **`@zephyr/ui-react` molecules (9):** `Accordion`, `Breadcrumbs`, `ComboBox`, `Dropdown`, `NumberInput`, `Popover`, `Tabs`, `TagInput`, `Tooltip`
   - **`@zephyr/ui-react` organisms (5):** `AlertDialog`, `AvatarLibrary`, `IconLibrary`, `LogoLibrary`, `Sheet`
   - **`@zephyr/ui-react` templates (4):** `AuthPage`, `DashboardPage`, `OnboardingPage`, `SettingsPage`
   - **`@zephyr/blocks` (1):** `TestimonialCarousel`
   - **`@zephyr/forms` (1):** `useZephyrForm`
   - Pure render / type-only files (`Badge`, `Logo`, `FormField`, `ZephyrFormField`, layout primitives) remain server-safe — no directive needed.

2. **GitHub Actions CI workflow enhanced** (`.github/workflows/ci.yml`)
   - **4 jobs:** Build & Test → Storybook Build (artifact 7d) → Docs Playground Build (artifact 7d) → Changeset Release (main-only)
   - **Concurrency cancellation** on PRs to avoid queueing stale runs.
   - Storybook and docs playground outputs uploaded as `actions/upload-artifact@v4` for review on every PR.
   - Changeset release job uses `changesets/action@v1` and only fires on `main` pushes.

3. **Docs playground `App.tsx` JSX fix**
   - Fixed the `Blocks` sidebar nav section: it was nesting outside the `{topTab === "components" && ...}` conditional, causing a JSX parse error (`Expected ")" but found "{"`).
   - Moved the Blocks section inside the `nav-group` div before it closes.
   - `@zephyr/docs-playground` now builds cleanly: **108 modules, ✓ 1.02s**.

4. **`LiveCodeEditor` wired into docs-playground** (carried forward from Sprint 3)
   - Embedded below the Usage snippet in both **API Reference** and **Guide** (component detail) views.
   - Editor resets automatically when switching components (keyed on `selectedEntry.id`).

### Next Steps (remaining P0)

- **P0.2 — Chromatic visual regression:** Add `chromatic` job to CI after Storybook build. Requires `CHROMATIC_PROJECT_TOKEN` secret in repo settings. Use `chromatic-hq/action@v11` with `exitZeroOnChanges: true`.
- **P0.3 — Publish dry-run CI gate:** Add `pnpm release:dry` step in `build-and-test` job, conditional on `github.event_name == 'pull_request'`.

### P1 (queued)
- Fix `LiveCodeEditor` scope — pass `@zephyr/ui-react` namespace into `new Function()` so interactive previews actually render components.
- `llms.txt` auto-generation from the AI registry as part of `pnpm build`.
- MCP `scaffold_page` tool (v0.5.0 roadmap).
- Dark mode forwarding into the LiveCodeEditor preview container.
- Blocks view detail in the docs playground (clicking a block shows preview + snippet).
- Changelog v0.5.0 entry.

---

## 0.1) Previous Delta (March 4, 2026 — Session 3: P1 + P2 Sprint)


Completed in this pass:

1. **Cloud API production hardening**
   - `SqliteRateLimiter` added to `apps/cloud-api/src/rateLimit.ts` — uses `node:sqlite` (Node 22, no native build) for persistence across restarts. Falls back to `InMemoryRateLimiter` if unavailable.
   - `createRateLimiter()` factory chooses SQLite when `ZEPHYR_RATE_LIMIT_DB` env is set.
   - `hasScope(principal, scope)` helper added to `auth.ts`.
   - All `/v1` routes now enforce scopes: `assets:read`, `assets:write`, `compliance:write`.
   - `GET /v1/me` endpoint added — returns `{ key, scopes }` for principal introspection.
   - Audit log now optionally appends to a file via `ZEPHYR_AUDIT_LOG` env var.

2. **HTTP integration tests** (`apps/cloud-api/test/cloud-api-http.test.ts`)
   - 14 new HTTP-level tests: health, 401 without auth, 200 with auth, /v1/me, icons/avatars/logos, compliance scope guard, license validate (valid/invalid/missing/400), rate limit assertion, 404.
   - All 20 cloud-api tests pass (14 HTTP + 6 module unit).

3. **npm publish pipeline**
   - `scripts/publish.sh` — guards dirty git state, runs release:check, builds all packages, publishes `@zephyr/core`, `@zephyr/ai-registry`, `@zephyr/ui-react`, `@zephyr/cli`, `@zephyr/mcp-server`. Dry-run by default; pass `--no-dry-run` to publish live.
   - Root `package.json` gains `release:dry` and `release` scripts.
   - `@zephyr/ui-react/package.json` gains `exports` field for ESM resolution.

4. **MCP `install_plan` tool** added to `packages/mcp-server/src/tools.ts`
   - Input: `{ framework, packageManager, components[] }`
   - Output: numbered step-by-step plan with exact shell commands for Vite / Next.js / Remix / CRA × pnpm / npm / yarn / bun.
   - Wired into `listTools()` and `callTool()` dispatcher.
   - 4/4 MCP tests pass (2 new install_plan tests added).

5. **Figma sync pipeline**
   - `scripts/export-figma-tokens.js` — real implementation: parses W3C Design Token and Style Dictionary JSON exports, maps Figma keys to Zephyr token paths, writes non-destructive snapshot to `packages/core/src/tokens/figma-export.ts`. Supports `--dry-run` and `--input` flags.
   - `figma/FIGMA_SYNC.md` — comprehensive guide: export steps, token naming convention, Figma→Zephyr key mapping table, known gaps.

6. **Pre-existing type fix** in `apps/docs-playground/src/App.tsx` — `parts` array typed as `string[]` to allow pushing size/state values.

7. **Full monorepo build** — 11/11 packages, 0 errors. `release:check` passed end-to-end.


Completed in this pass:

1. **PRO style pack gating**
   - `handleStylePackChange()` now checks tier — free users clicking a PRO pack see the upgrade modal instead of switching.
   - `StylePackCard` has `isLocked` prop — locked cards show dimmed/desaturated mockup (opacity 0.55, grayscale 0.3) + lock icon SVG + "Upgrade to Pro" label.
   - Verified visually: lock overlay renders, click opens upgrade modal.

2. **Prompt QA audit**
   - Audited all 42 components: 100% have usage examples, AI hints, and a11y notes.
   - Generated sample prompts for Button, DataTable, DashboardPage — verified structure: framework lock → theme/accent → install → config → key props → a11y → AI hints → pasteable code instruction.

3. **Foundations page overhaul**
   - Added "How the token system works" section: 3-step visual flow (Style Pack → CSS Variables → Components) with SVG icons and numbered badges.
   - Added "Naming convention" section: 6 cards showing token prefixes (--z-color-, --z-space-, --z-radius-, --z-shadow-, --z-type-, --z-motion-) with descriptions and examples.
   - New CSS: `.token-flow`, `.token-naming-grid` with responsive breakpoints.

4. **Team page enhancement**
   - Added `<Avatar name={…} size={48} />` and `<Badge tone="neutral" size="sm">` to team cards.
   - Replaced bullet-point "How we ship" with 4-step process grid with numbered badges.
   - New CSS: `.process-grid`, `.process-step`, `.process-step-num`.

5. **Changelog expansion** (v0.1.0 → v0.4.0)
   - Restructured releases with `release-header` (version badge + date + "Latest" tag), `release-summary`, and categorized change lists (New features / Improvements / Breaking changes).
   - Added v0.3.0 (P0 sprint: dark mode, layout primitives, tier, utility removal) and v0.4.0 (style packs, PRO gating, templates, narrative pages).
   - Updated left sidebar nav and right-rail TOC with new version links.

6. **Roadmap redesign**
   - Replaced generic bullet list with visual timeline track.
   - 3 milestones: v0.5.0 (In progress — npm publish + MCP action tools), v0.6.0 (Planned — cloud features + Figma sync), v1.0.0 (Planned — production GA).
   - New CSS: `.roadmap-track`, `.roadmap-milestone`, `.roadmap-marker` with accent-colored active state.

7. **Mission & Vision visual overhaul**
   - Mission pillars: 3 cards with SVG icons, accent-tinted icon backgrounds, tag chips (MCP tools, llms.txt, etc.), hover accent border.
   - New "Design philosophy" section: side-by-side comparison (Traditional approach vs Zephyr approach) with strike-through on traditional items.
   - Vision: vertical timeline with accent-gradient connector line and dot markers.
   - New CSS: `.mission-pillars-grid`, `.mission-pillar`, `.philosophy-comparison`, `.vision-timeline`.

8. **Full monorepo build** — 11/11 packages, 0 errors after every change batch.

## 0.1) Previous Delta (March 4, 2026 — Style Pack Picker + Premium Templates)

Completed in previous session:

1. **Style Pack Picker reintroduced** in Get Started view
   - Replaced hardcoded `BASE_STYLE_PACK = "Clarity"` with real `useState<StylePackName>` + sessionStorage persistence.
   - Added `STYLE_PACK_META` record with labels, descriptions, and free/pro flags for all 6 packs.
   - Created `StylePackCard` component with mini-app mockup (sidebar + header + stat cards + table rows + palette strip) that uses CSS custom properties (`--spc-*`) from actual pack tokens — each card looks dramatically different.
   - Switching packs resets accent to the new pack's default primary via `handleStylePackChange()`.
   - PRO badges shown on Editorial, NeoBrutal, SoftTech, Enterprise cards.

2. **All 5 page templates redesigned to premium quality**
   - **MarketingPage**: Gradient hero with SVG dot grid, stats row, 6 feature cards, 3-tier pricing with checkmarks, testimonials.
   - **AuthPage**: Split layout with testimonial panel, social auth buttons (GitHub/Google/Apple), divider.
   - **DashboardPage**: Stat cards with SVG sparklines and delta indicators, activity timeline.
   - **OnboardingPage**: Split layout with step-specific SVG illustrations, StepIndicator.
   - **SettingsPage**: Sidebar nav + content panel, avatar upload, team section, danger zone.

3. **~500 lines of new CSS** — style pack card grid, mockup element styles, palette strips, active selection ring.

4. **Accordion propsSchema fix** — Added missing `emptyState` field.

5. **Full monorepo build** — 11/11 packages, 0 errors.

## 0.2) Previous Delta (March 3, 2026 — single-theme + validation pass)

Completed in this pass:

1. Docs pivoted to one base theme + global accent
- Removed style-pack picker from Setup flow in docs playground.
- Kept one fixed base theme (`Clarity`) and made accent selection the primary visual control.
- Accent now persists via `sessionStorage` and applies across page switches/reloads.
- Updated copy, TOC links, and setup snippets to match accent-first workflow.

2. Interactive browser-window previews + explicit state controls
- Added browser-like preview shell (traffic lights + address bar) around component and page template previews.
- Added per-component preview state selector for key components:
  - Button (default/hover/pressed/loading/disabled)
  - Input (default/filled/error/disabled)
  - Accordion, Alert, Toast, DataTable, SearchResultsPanel
- Preview controls now combine accent switching + state switching in one toolbar.

3. Real cloud-backed license validation flow
- Added public endpoint: `POST /v1/licenses/validate` in `@zephyr/cloud-api`:
  - format validation
  - known key validation
  - revoked/expired handling
  - rate-limit for anonymous validation attempts
- Added SDK support in `@zephyr/cloud-sdk`:
  - `validateLicense({ licenseKey })`
- Updated docs `LicenseKeyModal`:
  - async submit with loading state
  - cloud validation call
  - user-facing error handling when service is unavailable

4. Docs/contracts + smoke alignment
- Updated API docs for license validation route:
  - `apps/cloud-api/README.md`
  - `docs/openapi.yaml`
  - `docs/llms.txt`
  - `docs/llms-full.txt`
- Updated `scripts/ui-agent-smoke.sh` URLs to accent-first format (no theme query).

Validation completed after implementation:
- `corepack pnpm release:check` (all steps passed)
- `corepack pnpm ui:smoke:agent` (passed; screenshots + snapshot artifacts generated)

## 0.3) Previous Delta (March 3, 2026 — Competitor Parity Pass)

Completed in `apps/docs-playground`:
- Added a real **API Reference mode** under Components (`view=api-reference`) with auto-generated prop tables from `propsSchema` in the registry.
- Added **command-palette style search navigation** for docs search:
  - `Cmd/Ctrl + K` focuses search.
  - `ArrowUp/ArrowDown` moves active result.
  - `Enter` opens selected result.
  - `Escape` closes result panel.
- Added **Setup narrative pages**:
  - Mission & Vision (`view=mission`)
  - Team (`view=team`)
- Expanded **Pages** nav and TOC to deep-link each template section.
- Added **versioned changelog + migrations**:
  - `v0.2.0`, `v0.1.0`, `Migrations`, and `Migration 0.1 -> 0.2`.

Validation completed:
- `corepack pnpm --filter @zephyr/docs-playground typecheck`
- `corepack pnpm --filter @zephyr/docs-playground build`
- `corepack pnpm ui:smoke:agent`

Additional visual polish pass (same date):
- Refined API Reference presentation:
  - Premium segmented toggle for Guides/API mode.
  - Improved API table spacing, zebra rows, hover states, and code-pill readability.
  - Improved API contract cards (rhythm, typography, surface treatment).
- Validation rerun after polish:
  - `corepack pnpm --filter @zephyr/docs-playground build`
  - `corepack pnpm ui:smoke:agent`

## 1) Product Definition

Zephyr is an AI-native, plug-and-play UI component system — a complete, self-contained alternative to third-party component libraries. Built for vibe coders: developers and non-technical builders who build with AI coding assistants and IDE agents.

Core goals:
- Provide a complete visual system with one production base theme + accent control in docs workflow. No external utility-class framework dependency.
- Provide reusable UI primitives and complex blocks styled entirely via CSS variables — no utility classes required.
- Enable one-command onboarding (`npm install @zephyr/ui-react` works with zero config).
- Expose machine-readable metadata so AI agents can discover/install/use components without manual lookup.
- Keep local component usage fully free with no account or API key required.
- Gate premium style packs, complex components, and templates behind a license key (Pro tier).

## 2) Guardrails and Constraints

- Do not mention external purchased design-system brand names in product copy, code comments, or docs.
- Keep Zephyr naming and API stable across style packs.
- Theme changes must be token-driven, not API-breaking component forks.
- Local package usage must work without cloud API key or license key (free tier).
- Cloud endpoints must enforce bearer auth + rate limits.
- No utility-class framework dependency. No utility class output. Components self-style via CSS variables only.
- Free tier must be genuinely useful — not a crippled demo.

## 3) Current Architecture

Monorepo: `pnpm` workspaces + Turborepo.

Apps:
- `apps/docs-playground` → interactive docs + preview + accent/state workflow.
- `apps/cloud-api` → `/v1` cloud endpoints with auth + rate limiting.

Packages:
- `@zephyr/core` → tokens, style packs, config loader, CSS variable generator. Utility compiler removed.
- `@zephyr/ui-react` → component library (atoms/molecules/organisms/layout primitives).
- `@zephyr/ai-registry` → JSON component registry + shared generator APIs.
- `@zephyr/mcp-server` → MCP tool bridge for AI clients.
- `@zephyr/cli` → `init`, `add`, `theme`, `doctor`, `list`, `upgrade`, `whoami`.
- `@zephyr/cloud-sdk` → typed cloud client.
- `@zephyr/logos` → first-party logo catalog search + resolver/fallback/compliance denylist support.
- `@zephyr/avatars` → deterministic avatar generator + searchable style catalog.
- `@zephyr/icons-material` → expanded Material-style icon catalog + semantic search + style variants.

## 4) What Is Implemented

### 4.1 Design system foundation
- Token engine, style packs, semantic alias support in `@zephyr/core`.
- Style packs: `Studio` (free), `Editorial`, `NeoBrutal`, `SoftTech`, `Enterprise`, `Clarity` (all Pro).
- Every style pack has both light and dark color sets (`color` + `colorDark`).
- `generateCssVariables()` emits `:root` (light) + `[data-theme="dark"]` + `@media (prefers-color-scheme: dark)` blocks.
- Utility class compiler (`compileUtilities`) has been removed. Components self-style via CSS variables only.

### 4.2 Component library
- Registry has 42 entries (11 atoms, 11 molecules, 11 organisms, 4 layout primitives, 5 templates).
- All components use inline styles + CSS variables. Zero utility classes.
- **Free atoms:** `button`, `input`, `icon-button`, `textarea`, `select`, `checkbox`, `radio`, `switch`, `badge`, `avatar`, `logo`
- **Free feedback:** `alert`, `toast`
- **Free near-atoms:** `form-field`, `tabs`, `dropdown`
- **Free layout:** `stack`, `grid`, `box`, `spacer`
- **Pro molecules:** `search-box`, `command-bar`, `pagination`, `breadcrumbs`, `input-group`, `accordion`
- **Pro organisms:** `navbar`, `header`, `data-table`, `modal-dialog`, `sidebar-nav`, `filters-bar`, `search-results-panel`, `layout-shell`, `icon-library`, `avatar-library`, `logo-library`
- **Pro templates:** `dashboard-page`, `auth-page`, `settings-page`, `onboarding-page`, `marketing-page`

### 4.3 Docs playground
Complete UI overhaul done March 3, 2026. Inspired by Coinbase Docs + Mintlify.

**Top-level tabs:**
- **Setup** — Introduction, Get Started, Foundations, Mission & Vision, Team
- **Components** — Guides mode + API Reference mode
- **Pages** — Template pages
- **Change Log** — release notes + migrations

**Setup flow:**
- Style Pack Picker with 6 distinct `StylePackCard` mini-app mockups. PRO packs show lock overlay for free-tier users.
- Accent-first controls (preset dots + color picker + hex input).
- Accent + style pack persists across pages and reloads (`sessionStorage`).

**New component previews added (March 3, 2026):**
- `IconLibrary` preview with semantic search (e.g. gear/settings) and click-to-copy icon name.
- `AvatarLibrary` preview with searchable styles + deterministic seed input and copy style id.
- `LogoLibrary` preview with brand/domain/category search and copy domain workflow.

**Preview system (latest):**
- Browser-window style preview shell (`BrowserPreviewFrame`) around component and page previews.
- Explicit state selector in preview toolbar for key components (button/input/accordion/alert/toast/table/search-results).
- Shared preview toolbar combines accent control + state selection.

**Navigation (left rail):**
- Setup group: Introduction, Get Started, Foundations, Mission & Vision, Team
- Components group: collapsible Atoms / Molecules / Organisms (expand/collapse per group)
- Pages group: Templates + deep links
- Pro components show PRO badge in nav
- Clicking a component auto-expands its parent group
- Header search filters flat when active, restores grouped tree when cleared
- AI tool configuration (Codex/Claude/Cursor etc.) is under Setup > AI Tools

**Top nav controls:**
- ☾ Dark / ☀ Light — toggles `data-theme` attribute for dark mode
- Unlock Pro / ✓ Pro — validates key via cloud API and enables Pro tier in session

**Key helper components in App.tsx:**
- `BrowserPreviewFrame` — browser-style wrapper used for component and template previews
- `SnippetItem` — code block with label header + copy button
- Collapsible nav with chevron animation
- Setup tabs + component mode switch + search keyboard navigation

**Known gap:** `@zephyr/ui-react` not published to npm — install commands in docs are aspirational.

### 4.4 Tier system
- `tier: "free" | "pro"` is set on ALL 42 entries in `components.json` (no more runtime fallback needed).
- `getFreeTierComponents()` and `getProTierComponents()` helpers in `@zephyr/ai-registry`.
- Docs playground shows PRO badge on locked components/templates and supports unlock flow.

### 4.5 AI-native integration
- Registry schema + component metadata.
- MCP tools implemented:
  - `search_components`
  - `get_component_spec`
  - `get_install_steps`
  - `get_usage_examples`
  - `get_theme_variants`
- AI docs exist in:
  - `docs/llms.txt`
  - `docs/llms-full.txt`

### 4.6 Cloud API baseline
- Health endpoint: `GET /health`.
- Public endpoint:
  - `POST /v1/licenses/validate` (no bearer required; rate-limited)
- Auth-protected `/v1` endpoints:
  - `GET /v1/components`
  - `GET /v1/themes`
  - `GET /v1/icons`
  - `GET /v1/avatars/styles`
  - `GET /v1/logos`
  - `GET /v1/logos/:domain`
  - `POST /v1/avatars`
  - `POST /v1/snippets`
  - `POST /v1/compliance/takedown`
  - `GET /v1/providers/health`
- Includes in-memory rate limiter and audit logging.

### 4.7 CLI
- `zephyr init --style-pack <name> --accent <hex> [--force]`
- `zephyr add <component> --tool Codex|Claude|Cursor [--out <dir>] [--force]`
- `zephyr theme [<stylePack>] [--accent <hex>] [--list]`
- `zephyr doctor [--strict]`
- `zephyr list [--search <query>] [--category ...]` — now shows `[PRO]` tag per entry
- `zephyr upgrade --key <license-key>` — stores key in `~/.zephyr/credentials`
- `zephyr whoami` — displays current tier and key

### 4.8 Asset library implementation details (latest)
- `@zephyr/icons-material` now includes:
  - larger in-repo icon catalog metadata (`name`, `title`, `category`, `keywords`)
  - semantic alias search (`settings` resolves from `gear`, `billing`/`payment` intents, etc.)
  - style variants (`filled`, `outlined`, `rounded`, `sharp`)
- `@zephyr/avatars` now includes:
  - `AvatarStyle` system (`initials`, `beam`, `ring`, `blob`, `pixel`, `sunset`, `soft`, `capsule`, `mono`, `orbit`)
  - searchable style catalog (`listAvatarStyles`, `searchAvatarStyles`)
  - deterministic SVG generation per style + seed
- `@zephyr/logos` now includes:
  - large first-party in-repo brand catalog (`name`, `domain`, `category`, `tags`)
  - `searchLogoCatalog` + `getLogoByDomain`
  - `CatalogLogoProvider` as default provider for `LogoClient` (first-party catalog first, SVG fallback second)
- `@zephyr/ui-react` exports new organisms:
  - `IconLibrary`
  - `AvatarLibrary`
  - `LogoLibrary`
- Registry entries added:
  - `icon-library`
  - `avatar-library`
  - `logo-library`

## 5) Critical Improvements Completed

### Shared generator architecture
Shared generation logic lives in `@zephyr/ai-registry` and is consumed by both CLI and docs.
- No hardcoded prompt/install composition in docs.
- `zephyr add` and docs prompt panel come from the same generator.
- Reduced drift risk between docs output and CLI output.

Shared APIs: `getComponentTemplate()`, `generateComponentPrompt()`, `generateComponentScaffold()`, `getDefaultIntent()`

### P0 sprint (March 3, 2026)
All four P0 items were completed in one session:
1. **Dark mode** — light/dark token pairs per style pack, CSS variable emission, playground toggle.
2. **Utility compiler removal** — `compileUtilities` deleted, all 30 components migrated to inline styles.
3. **Tier system + license key CLI** — registry tagged, `upgrade`/`whoami` commands, docs gating.
4. **Layout primitives** — Stack, Grid, Box, Spacer added as free-tier components.

## 6) Known Technical Notes

- `@zephyr/core` config loader export handling was fixed so `zephyr.config.ts` values are correctly applied.
- `generateCssVariables()` is the only public API from `compiler.ts` — `compileUtilities` is gone.
- Layout primitive components (`Stack`, `Grid`, `Box`, `Spacer`) live in `packages/ui-react/src/layout/`.
- Agent-browser smoke script exists at `artifacts/agent-browser`.
- Figma MCP server configured at `http://127.0.0.1:3845/mcp` (SSE transport, name: "figma") — requires Figma desktop app running with Dev Mode MCP enabled.
- `@zephyr/ui-react` is NOT published to npm. Install commands in docs playground are aspirational — must be published or flagged "coming soon" before sharing publicly.
- Copy prompt quality (generateComponentPrompt output) has NOT been validated end-to-end in real AI tools. Needs manual testing in Claude Code / Cursor before claiming this works.
- The "Unlock Pro" button in docs is cloud-validated against `/v1/licenses/validate`. If cloud API is down, modal shows actionable service error.
- If docs playground shows a blank screen in local dev, the most likely cause is missing Vite source aliases in `apps/docs-playground/vite.config.ts`.
  - **Root cause (fixed March 3, 2026):** vite.config was missing aliases for `@zephyr/logos`, `@zephyr/avatars`, and `@zephyr/icons-material`. Without these, Vite loaded their CJS dist files during dev server, causing a silent reload loop where React never mounted.
  - **Fix:** `vite.config.ts` now aliases all six workspace packages to their `src/` directories. This ensures consistent TypeScript source resolution in dev mode — no pre-built dist needed.
  - If the page is still blank after this fix, also try: `corepack pnpm --filter @zephyr/ui-react build` (only if you see dist-related import errors in build output).

## 7) Command Runbook

From repo root:

Install/build:
```bash
corepack pnpm install
corepack pnpm build
```

Release hardening:
```bash
corepack pnpm release:check
```

Docs playground:
```bash
corepack pnpm --filter @zephyr/icons-material build
corepack pnpm --filter @zephyr/avatars build
corepack pnpm --filter @zephyr/logos build
corepack pnpm --filter @zephyr/ui-react build
corepack pnpm --filter @zephyr/docs-playground dev --host 127.0.0.1 --port 4174
```

Storybook:
```bash
corepack pnpm storybook
```

Cloud API:
```bash
corepack pnpm --filter @zephyr/cloud-api build
node apps/cloud-api/dist/index.js
```

CLI package:
```bash
corepack pnpm --filter @zephyr/cli build
node packages/cli/dist/index.js --help
```

Smoke automation:
```bash
npm install -g agent-browser
agent-browser install
corepack pnpm ui:smoke:agent
```

## 8) Test Status

Last build: March 4, 2026 — `corepack pnpm build` passed (11/11 packages, 0 errors) after docs polish pass (changelog, mission, foundations, team enhancements).

Last full hardening run (March 3, 2026):
- `corepack pnpm release:check` passed end-to-end:
  - `@zephyr/ai-registry` build + tests
  - `@zephyr/cloud-sdk` build + tests
  - `@zephyr/cloud-api` typecheck + tests
  - `@zephyr/ui-react` build
  - `@zephyr/docs-playground` typecheck + build
- `corepack pnpm ui:smoke:agent` passed and generated fresh artifacts under `artifacts/agent-browser/`.

## 9) P1 Sprint Progress (March 3, 2026 — Updated)

### ✅ DONE — Registry foundation
- All 42 entries in `components.json` now have explicit `tier: “free”` or `tier: “pro”` (was missing from all 33 original entries).
- 4 layout primitive entries added to `components.json` (stack, grid, box, spacer — `category: “foundation”`, `tier: “free”`). Were implemented in code but missing from registry JSON.
- 5 template entries added to `components.json` (dashboard-page, auth-page, settings-page, onboarding-page, marketing-page — `category: “template”`, `tier: “pro”`).
- Fixed “CSS variables/utilities” → “CSS variables” in `ai-registry/src/index.ts` (utility compiler was removed in P0).
- Added `AssistantTool` type (`”Codex” | “Claude” | “Cursor”`) and `assistant` field to `PromptGenerationOptions` in `ai-registry/src/index.ts`.
- `generateComponentPrompt()` now outputs an `Assistant:` line when assistant is specified.
- `@zephyr/ai-registry` builds clean, 7/7 tests pass.

### ✅ DONE — MCP action tools
Already implemented in `packages/mcp-server/src/tools.ts` — discovered during exploration:
- `scaffold_page` — generates full page with active style pack
- `apply_theme` — modifies project config
- `generate_component` — returns ready-to-paste component source

### ✅ DONE — Component depth (loading/empty/error states)
Added to 5 components:
- **SidebarNav** (`organisms`): `loading?: boolean` (skeleton shimmer, 2 sections × 3 items), `emptyState?: ReactNode`
- **FiltersBar** (`organisms`): `loading?: boolean` (opacity overlay, pointerEvents disabled, Reset button disabled)
- **ModalDialog** (`organisms`): `loading?: boolean` (passed to confirm Button), `error?: string` (role=”alert” message above footer)
- **Accordion** (`molecules`): `emptyState?: ReactNode` (early return when items empty, default “No items.” text)
- **Pagination** (`molecules`): `loading?: boolean` (opacity 0.6, buttons disabled, aria-busy)
- Pattern reference: DataTable's `SkeletonRows` + `@keyframes z-shimmer` (already existed).
- `components.json` propsSchema updated for all 5 components.

### ✅ DONE — Docs playground phase updates
- Upgrade flow banner and license modal improvements are implemented.
- Private beta notice is present under install snippets.
- AI setup now uses tool/project/manager generator controls instead of static copy blocks.
- Mobile-friendly navigation shell and responsive behavior are in place.
- Templates (including MarketingPage) are wired in docs pages view.

## 10) What Is Still Pending

### P1 (remaining)

#### 🚀 Deploy docs playground for external sharing
**Goal:** Give testers a real URL — no local setup required.
**Blockers to shareability (as of March 4, 2026):**
- `@zephyr/ui-react` not published to npm — install commands in docs are aspirational, not functional
- Docs playground runs on `localhost` only — no public URL exists
- No hosted demo means every tester must clone + run the monorepo locally

**Tasks:**
1. **Deploy docs playground to Vercel** ← fastest win, unblocks sharing immediately
   - `vercel.json` already exists with a resilient build config (from Session 7)
   - Set build command: `pnpm --filter @zephyr/docs-playground build`
   - Set output dir: `apps/docs-playground/dist`
   - Verify Vite aliases survive Vercel's build environment
   - Result: shareable URL like `zephyr-docs.vercel.app`

2. **Mark install commands "coming soon"** (before sharing)
   - Any snippet showing `npm install @zephyr/ui-react` should have a "Private beta — install via CLI coming soon" note
   - Prevents confusion when testers try to actually install and get a 404 from npm

3. **Publish `@zephyr/ui-react` to npm** ← required for full usability
   - `scripts/publish.sh` exists with dry-run guard
   - Needs: npm org `@zephyr` claimed, `NPM_TOKEN` secret set, then run `--no-dry-run`
   - Once published, remove the "coming soon" notes and install commands work for real

**Priority:** Deploy to Vercel first (30 min), npm publish second (separate task).

---

- ~~All other P1 items complete~~ — see session 3 delta above.


### P1 (done — no longer pending)
- ~~Real backend license validation~~ — `POST /v1/licenses/validate` + SDK method + docs modal integration
- ~~MCP action tools~~ — already implemented
- ~~Component depth: loading/empty/error states~~ — done for 5 components
- ~~Page templates~~ — all 5 exist (dashboard, auth, settings, onboarding, marketing)
- ~~Page templates premium overhaul~~ — all 5 redesigned to Stripe/Linear quality with inline SVGs, gradients, split layouts
- ~~Style pack differentiation~~ — `StylePackCard` with distinct mini-app mockups, real pack switching, sessionStorage persistence
- ~~PRO style pack gating~~ — lock overlay, upgrade modal trigger, dimmed mockup on free-tier
- ~~Docs narrative pages polish~~ — Foundations token flow + naming, Team avatars + process grid, Mission pillars + philosophy comparison + vision timeline
- ~~Changelog expansion~~ — 4 versioned releases (v0.1–v0.4) with categorized changes, visual roadmap timeline with 3 milestones
- ~~Registry tier tagging~~ — all 42 entries tagged
- ~~AI-registry utilities wording fix~~ — done
- ~~AssistantTool type + prompt output~~ — done
- ~~Registry prop schema modernization + API table enrichment~~ — done
- ~~AI install generator flows~~ — done
- ~~Cloud-connected asset library flow with key/fallback UX~~ — done
- ~~Release hardening command + docs~~ — done

### P2
- **Cloud production hardening:** persistent store, key scopes, stronger rate limits, observability.
- **Web tool strategy** (Lovable, Figma Make): partnership problem, not technical. Requires outreach.
- **MCP install plan tool** by package manager/framework.
- **Figma sync pipeline:** formal export/import, design-to-code mapping docs.
- **Packaging/release pipeline:** publish strategy, changelog automation, versioning policy.

## 11) Files New Agent Should Read First

1. `README.md`
2. `PROJECT_HANDOFF.md` (this file)
3. `apps/docs-playground/src/App.tsx`
4. `apps/docs-playground/src/styles.css`
5. `packages/ui-react/src/organisms/IconLibrary.tsx`
6. `packages/ui-react/src/organisms/AvatarLibrary.tsx`
7. `packages/ui-react/src/organisms/LogoLibrary.tsx`
8. `packages/icons-material/src/index.tsx`
9. `packages/avatars/src/catalog.ts`
10. `packages/logos/src/catalog.ts`
11. `packages/ai-registry/src/index.ts`
12. `packages/ai-registry/src/registry/components.json`

## 12) Handoff Prompt for Next AI Agent

Use this exact instruction to continue:

"Continue Zephyr P1 sprint from `PROJECT_HANDOFF.md`. Read sections 0 and 10 first. P0 is complete, docs now run a single-base-theme + accent-first workflow, and cloud license validation is integrated. Immediate focus: cloud production hardening (persistent rate limits, scoped keys, audit pipeline), publish readiness, and real AI-tool prompt QA. Keep docs + CLI registry-driven from shared generators. No utility-class dependency — components self-style via CSS variables only. Respect free/pro tier split in Section 13.3. Run `corepack pnpm release:check` before reporting done."

## 13) Architectural Decisions (Confirmed — Do Not Revisit Without Owner Sign-off)

These decisions were made and confirmed by the product owner. Do not change without explicit instruction.

### 13.1 No utility-class framework relationship
Zephyr is a complete, self-contained UI system — not a plugin or extension of any utility-class framework.
- No utility-class preset output.
- No utility class compiler. `compileUtilities` has been deleted from `@zephyr/core`.
- Components style themselves entirely via CSS variables defined by the token system.
- Users write semantic JSX props (`variant`, `size`, `color`), not class strings.
- Layout is handled by layout primitive components (`Stack`, `Grid`, `Box`, `Spacer`), not utility classes.

### 13.2 Install model
Primary install is a single npm command — no config required out of the box:
```bash
npm install @zephyr/ui-react
```
- Defaults to Studio style pack with no `zephyr.config.ts` needed.
- CLI (`zephyr init`, `zephyr add`, etc.) enhances the experience but is not required.
- `llms.txt` / `llms-full.txt` enables AI agent discovery without user instruction.
- MCP server gives AI agents tool-level access for richer workflows.
- Works in Lovable and similar web tools (free tier, no key needed). Pro requires key in env.

### 13.3 Monetization model — License key, gated by style packs + components + templates
**Gating mechanism:** License key validated by CLI at scaffold time. Key stored in `~/.zephyr/credentials`. No private npm registry.

**Free tier (no account, no key, works offline):**
- Foundation: all tokens, config system, CSS variables, Studio style pack, dark mode support
- Atoms: `button`, `input`, `textarea`, `select`, `checkbox`, `radio`, `switch`, `badge`, `avatar`, `logo`, `icon-button`
- Feedback: `alert`, `toast`
- Near-atoms (free for usability): `form-field`, `tabs`, `dropdown`
- Layout primitives: `Stack`, `Grid`, `Box`, `Spacer`

**Pro tier (license key required):**
- All premium style packs: `NeoBrutal`, `Editorial`, `SoftTech`, `Enterprise`, `Clarity`
- Molecules: `search-box`, `command-bar`, `pagination`, `breadcrumbs`, `input-group`, `accordion`
- Organisms: `navbar`, `header`, `data-table`, `modal-dialog`, `sidebar-nav`, `filters-bar`, `search-results-panel`, `layout-shell`
- Page templates: dashboard, auth, settings, marketing, onboarding
- Per-tool AI prompt variants (Claude-optimized, Codex-optimized, Cursor-optimized)
- Cloud features: logos, avatars

**Rationale:**
- Free tier is enough to build complete auth flows and simple apps — genuinely useful, not crippled.
- Paid tier gates at natural product milestones (navbar, dashboard, data table).
- Style packs are the emotional driver for upgrade — vibe coders pay for aesthetics, not functionality.
- Upgrade pitch: "You've built your forms. Now build your product."

### 13.4 Dark mode
Dark mode is built into the token system. Each style pack defines both `color` (light) and `colorDark` (dark) token sets. `generateCssVariables()` emits both. Controlled via `[data-theme="dark"]` attribute on `<html>` or the OS `prefers-color-scheme` media query. Do not retrofit — always add `colorDark` when creating a new style pack.

### 13.5 Docs playground as sales page
For now, docs should use one polished base theme and accent-first controls (no style-pack switcher in UI). Pro gating stays focused on component/template availability and cloud/license features. Re-introduce style-pack switching in docs only after product owner sign-off.

### 13.6 MCP scaffold tools are P1, not P2
The high-value MCP tools for vibe coders are action tools, not info-retrieval tools:
- `scaffold_page` — generate a full page with active style pack
- `apply_theme` — modify project config
- `generate_component` — return ready-to-paste component source

These are P1 because they are the core AI-native differentiator.

### 13.7 Web tool strategy (Lovable, Figma Make)
This is a partnership and distribution problem, not a technical one. Free tier works with no key via npm install. Pro users add their key to the tool's environment. No special integration required beyond good TypeScript types and `llms.txt`.
