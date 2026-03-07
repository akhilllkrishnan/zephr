# Zephr Project Handoff

Last updated: March 6, 2026

---

## 1) Product Scope (Current)

Zephr is a single-product UI system focused on:

- token-native theming,
- React component primitives + composed blocks,
- AI-first integration (CLI context files, registry hints, MCP tools),
- plug-and-play setup for AI-assisted app building.

Multi-product experiments are out of scope for this phase.

---

## 2) Locked Architecture Decisions

1. No Tailwind dependency in core product flow.
2. Zephr tokens are the source of truth (`--z-*` namespace).
3. Theme packs are static CSS assets, swapped by `<link>` (not runtime JS variable generation for docs theming).
4. Public style packs are exactly:
   - `notion` (default)
   - `stripe`
   - `linear`
   - `framer`
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

- `@zephrui/core`: token model, style pack resolution, config resolution, compiler utilities.
- `@zephrui/ui-react`: component library + theme CSS assets + templates.
- `@zephrui/ai-registry`: component metadata, schemas, AI hint structures.
- `@zephrui/mcp-server`: AI tooling surface (`search`, `spec`, `scaffold_page`, `apply_theme`, etc.).
- `@zephrui/cli`: project bootstrap and configuration workflows.
- `@zephrui/cloud-sdk` / `apps/cloud-api`: cloud feature surface and API integration.
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
   - `corepack pnpm --filter @zephrui/docs-playground dev`
3. Docs build:
   - `corepack pnpm --filter @zephrui/docs-playground build`
4. Monorepo validation:
   - `corepack pnpm test`
   - `corepack pnpm build`

---

## 8) Release Readiness Checklist

1. Style switch visibly re-themes full shell + previews in under 1s.
2. Token parity checks pass for all 4 packs (light/dark key parity).
3. Docs theme-color guard passes (no disallowed raw shell colors).
4. `zephr init` emits all AI context files correctly.
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
4. Do not generate raw HTML controls in snippets when Zephr component equivalents exist.
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

## 13) Billing + Licensing Architecture (Locked)

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

## 14) Deployment Direction (Cost-Optimized)

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

## 15) Minimal Vercel Refactor Plan

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

## 16) Immediate Next Steps (Business + Infra)

1. Wire real Lemon Squeezy production env values.
2. Configure Supabase schema and production service-role access.
3. Complete one real purchase and verify:
   - webhook delivery
   - license persistence
   - validate
   - activate
4. Decide whether to:
   - launch quickly on a cheap Node host first, or
   - do the Vercel Functions refactor now and keep a single-platform deployment model
5. If public launch is close, prioritize:
   - license/account UX
   - refund/cancellation handling
   - legal pages
   - support/contact path

---

## 17) Launch Checklist (Minimum Public Release)

### Billing + license flow

1. `GET /v1/licenses/plans` returns 3 available plans with real checkout URLs.
2. Docs Unlock modal opens the correct hosted checkout for each plan.
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

## 18) Vercel Refactor Estimate (Based on Current Code)

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
