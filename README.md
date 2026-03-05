# Zephyr

Zephyr is an AI-native design system platform that combines:

- A framework-agnostic styling core with token-driven theming
- A React-first UI component library
- Cloud APIs for logos, avatars, and snippet generation
- AI discovery via a machine-readable registry and MCP server
- Figma token/component sync artifacts

## Monorepo Layout

- `packages/core` - tokens, style packs, utility compiler, config loader
- `packages/ui-react` - atoms, molecules, organisms
- `packages/icons-material` - material-style icon wrappers
- `packages/logos` - logo provider abstraction and fallback
- `packages/avatars` - deterministic avatar generation and cloud client helper
- `packages/ai-registry` - schemas and AI-facing component metadata
- `packages/mcp-server` - MCP-compatible tool surface for AI assistants
- `packages/cli` - `zephyr` CLI (`init`, `add`, `theme`, `doctor`)
- `packages/cloud-sdk` - typed REST client for Zephyr cloud APIs
- `apps/cloud-api` - Node API implementing `/v1` endpoints
- `apps/docs-playground` - live docs playground with accent controls + interactive preview states
- `docs` - human + AI docs (`llms.txt`, `llms-full.txt`, OpenAPI)

## Quick Start

```bash
pnpm install
pnpm build
```

Generate a starter config:

```bash
pnpm --filter @zephyr/cli build
node packages/cli/dist/index.js init
```

Zephyr CLI workflows:

```bash
# Initialize with theme + accent
node packages/cli/dist/index.js init --style-pack notion --accent #335cff

# Scaffold a component snippet + AI prompt
node packages/cli/dist/index.js add button --tool Codex

# Switch theme quickly
node packages/cli/dist/index.js theme stripe --accent #1d4ed8

# Health checks (config/css/deps/api-key)
node packages/cli/dist/index.js doctor
```

Run cloud API locally:

```bash
pnpm --filter @zephyr/cloud-api build
node apps/cloud-api/dist/index.js
```

For Lemon Squeezy local integration, copy `apps/cloud-api/.env.example` to `apps/cloud-api/.env` and set:

- `LEMON_SQUEEZY_API_KEY`
- `LEMON_SQUEEZY_WEBHOOK_SECRET`

Run docs playground:

```bash
pnpm docs:dev
```

Optional checkout wiring for the Pro modal:

- copy `apps/docs-playground/.env.example` to `apps/docs-playground/.env`
- set one or more:
  - `VITE_ZEPHYR_CHECKOUT_INDIVIDUAL=https://your-individual-checkout`
  - `VITE_ZEPHYR_CHECKOUT_STARTUP=https://your-startup-checkout`
  - `VITE_ZEPHYR_CHECKOUT_ENTERPRISE=https://your-enterprise-checkout`

## Deploy + Custom Domain (Vercel)

This repo includes [`vercel.json`](/Users/akhilkrishnan/Documents/Design%20System%20Library/vercel.json) for monorepo deployment of `@zephyr/docs-playground`.

1. In Vercel, import GitHub repo: `akhilllkrishnan/zephyr`.
2. Framework preset: `Other`.
3. Vercel will use:
   - install: `corepack enable && corepack pnpm install --frozen-lockfile`
   - build: `corepack pnpm --filter @zephyr/docs-playground build && rm -rf dist && mkdir -p dist && cp -R apps/docs-playground/dist/. dist/`
   - output: `dist`
4. After first deploy, open Project Settings -> Domains and add your domain.
5. Add DNS records in your domain provider exactly as Vercel shows.

## API Key Model

- Local package usage: no API key required
- Cloud endpoints: `Authorization: Bearer <api_key>` required

## Style Packs

`notion`, `stripe`, `linear`, `framer`

## Browser Automation Smoke Test

Install browser automation CLI once:

```bash
npm install -g agent-browser
agent-browser install
```

Run the docs smoke flow (screenshots + snapshot output):

```bash
pnpm ui:smoke:agent
```

Artifacts are written to `artifacts/agent-browser`.
