# Zephyr Project Handoff

Last updated: March 5, 2026

---

## 1) Product Scope (Current)

Zephyr is a single-product UI system focused on:

- token-native theming,
- React component primitives + composed blocks,
- AI-first integration (CLI context files, registry hints, MCP tools),
- plug-and-play setup for AI-assisted app building.

Multi-product experiments are out of scope for this phase.

---

## 2) Locked Architecture Decisions

1. No Tailwind dependency in core product flow.
2. Zephyr tokens are the source of truth (`--z-*` namespace).
3. Theme packs are static CSS assets, swapped by `<link>` (not runtime JS variable generation for docs theming).
4. Public style packs are exactly:
   - `notion` (default)
   - `stripe`
   - `linear`
   - `framer`
5. Docs playground must consume the same token/component primitives as package consumers.
6. AI integration is required, not optional:
   - `zephyr init` writes `CLAUDE.md`, `AGENTS.md`, `llms.txt`
   - registry entries include structured `aiHints`
   - MCP exposes `scaffold_page` and `apply_theme`

---

## 3) Public Interface Snapshot

### Style pack type

`StylePackName = "notion" | "stripe" | "linear" | "framer"`

### Config

`zephyr.config.ts` accepts:

- `stylePack`
- `tokens`
- `semanticAliases`
- `prefix`
- `plugins`
- `cloud`

### CLI (current key commands)

- `zephyr init`
- `zephyr add <component>`
- `zephyr theme [<pack>] [--accent <hex>] [--list]`
- `zephyr doctor`
- `zephyr list`

### Compatibility window

Legacy pack names are still read via a mapper with deprecation warnings for one transition cycle.

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

### In progress / pending

1. Finish full docs-shell parity audit so all shell colors/typography resolve from `--z-*` aliases only.
2. Complete visual regression coverage across all 4 packs in light/dark.
3. Expand generated AI snippets and MCP scaffolds for page-level quality consistency.
4. Continue component-depth pass (variant completeness + interaction states) with consistent token usage.

---

## 5) Package Responsibilities

- `@zephyr/core`: token model, style pack resolution, config resolution, compiler utilities.
- `@zephyr/ui-react`: component library + theme CSS assets + templates.
- `@zephyr/ai-registry`: component metadata, schemas, AI hint structures.
- `@zephyr/mcp-server`: AI tooling surface (`search`, `spec`, `scaffold_page`, `apply_theme`, etc.).
- `@zephyr/cli`: project bootstrap and configuration workflows.
- `@zephyr/cloud-sdk` / `apps/cloud-api`: cloud feature surface and API integration.
- `apps/docs-playground`: product docs + interactive component playground.

---

## 6) Docs Playground Baseline

The docs playground is the single visual QA and demonstration surface:

- style pack selector values: `notion`, `stripe`, `linear`, `framer`
- default pack: `notion`
- no retired pack labels in docs controls or generated snippets

---

## 7) Local Runbook

From repo root:

1. Install:
   - `corepack pnpm install`
2. Docs dev:
   - `corepack pnpm --filter @zephyr/docs-playground dev`
3. Docs build:
   - `corepack pnpm --filter @zephyr/docs-playground build`
4. Monorepo validation:
   - `corepack pnpm test`
   - `corepack pnpm build`

---

## 8) Release Readiness Checklist

1. Style switch visibly re-themes full shell + previews in under 1s.
2. Token parity checks pass for all 4 packs (light/dark key parity).
3. Docs theme-color guard passes (no disallowed raw shell colors).
4. `zephyr init` emits all AI context files correctly.
5. Registry schema validates structured AI hints for all components.
6. MCP contract tests pass for `scaffold_page` and `apply_theme`.
7. Accessibility smoke pass on top-tier components in each style pack.

---

## 9) Immediate Next Steps

1. Finalize docs-shell token parity and remove remaining local visual exceptions where possible.
2. Expand component variant/state coverage in docs playground previews.
3. Stabilize visual QA matrix for `notion/stripe/linear/framer` in light/dark.
4. Tighten AI output quality with richer `aiHints` negative guidance and scaffold examples.

---

## 10) Files to Read First (for New Agent)

1. `/Users/akhilkrishnan/Documents/Design System Library/packages/core/src/types.ts`
2. `/Users/akhilkrishnan/Documents/Design System Library/packages/core/src/stylePacks.ts`
3. `/Users/akhilkrishnan/Documents/Design System Library/packages/core/src/tokens.ts`
4. `/Users/akhilkrishnan/Documents/Design System Library/packages/ui-react/src/themes/notion.css`
5. `/Users/akhilkrishnan/Documents/Design System Library/apps/docs-playground/src/App.tsx`
6. `/Users/akhilkrishnan/Documents/Design System Library/apps/docs-playground/src/styles.css`
7. `/Users/akhilkrishnan/Documents/Design System Library/packages/ai-registry/src/index.ts`
8. `/Users/akhilkrishnan/Documents/Design System Library/packages/mcp-server/src/tools.ts`
9. `/Users/akhilkrishnan/Documents/Design System Library/packages/cli/src/index.ts`

---

## 11) Non-Negotiable Guardrails

1. Do not reintroduce Tailwind as required setup.
2. Do not add new public style pack names outside the locked 4 without explicit owner sign-off.
3. Do not hardcode shell theme colors where token aliases can be used.
4. Do not generate raw HTML controls in snippets when Zephyr component equivalents exist.
5. Keep docs, CLI, registry, and MCP terminology aligned to the same pack names and token contract.

---

## 12) Hardening Pass (March 5, 2026)

### Shipped in this pass

1. Cloud API request hardening:
   - JSON parsing now validates malformed payloads (`400 INVALID_JSON`).
   - Request size guard added (`413 PAYLOAD_TOO_LARGE`, 1 MB default).
   - Optional strict JSON content type enforcement for POST endpoints (`415 UNSUPPORTED_MEDIA_TYPE`).
   - Central `HttpError` handling added so malformed requests never crash route handling.
2. Cloud API response hardening:
   - Added security headers in `sendJson`: `X-Content-Type-Options`, `Referrer-Policy`, `Cache-Control`.
   - Added explicit CORS methods and configurable CORS origin via `ZEPHYR_CORS_ORIGIN`.
3. Cloud SDK hardening:
   - Base URL validation added (must be valid `http` or `https` URL).
   - Request timeout support (`timeoutMs`, default 10s).
   - Typed non-2xx errors via `ZephyrCloudError`.
   - Invalid JSON responses now fail fast with explicit error.
4. Docs runtime resilience:
   - Added `AppErrorBoundary` in docs playground entrypoint to avoid blank-screen failures.
   - Added user-facing fallback card with reload action on runtime exceptions.
5. CI/test stability:
   - `@zephyr/forms` test script now uses `--passWithNoTests` to avoid false-negative CI failures.

### Validation status

1. `corepack pnpm --filter @zephyr/cloud-api test` ✅
2. `corepack pnpm --filter @zephyr/cloud-sdk test` ✅
3. `corepack pnpm --filter @zephyr/docs-playground build` ✅
4. `corepack pnpm test` (monorepo) ✅
5. `corepack pnpm build` (monorepo) ✅
