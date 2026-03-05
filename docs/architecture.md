# Zephyr v1 Architecture

## Monorepo

- Package manager: pnpm workspaces
- Task orchestration: Turborepo
- Language: TypeScript

## Core Layers

1. `@zephyr/core`
- Source of truth for tokens and style packs
- Utility CSS compiler
- `zephyr.config.ts` loading and normalization

2. `@zephyr/ui-react`
- Component primitives (atoms, molecules, organisms)
- Stable prop APIs across style packs

3. Asset services
- `@zephyr/logos`: provider abstraction, cache, denylist/takedown
- `@zephyr/avatars`: deterministic local generator + optional API flow

4. AI integration
- `@zephyr/ai-registry`: machine-readable metadata
- `@zephyr/mcp-server`: searchable tools for AI assistants

5. Cloud
- `apps/cloud-api`: authenticated `/v1` endpoints
- `@zephyr/cloud-sdk`: typed client for app/tool integration

6. Developer Experience
- `apps/docs-playground`: live prop playground with style-pack switching

## Security and Compliance

- Bearer auth required for cloud endpoints.
- In-memory rate limiting by API key.
- Audit logging per request.
- Logo denylist + takedown workflow.

## Figma

- Token export script writes `figma/variables.generated.json`.
- Docs map core React components to Figma component kit parity.
