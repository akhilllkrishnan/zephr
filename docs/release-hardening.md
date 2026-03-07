# Release Hardening Checklist

Last updated: March 3, 2026

## Scope

This checklist is the minimum quality gate before cutting a Zephr beta/release candidate.

It covers:
- Registry contract integrity
- Cloud API and SDK compatibility
- UI package build health
- Docs playground type/build safety

## One-command verification

Run from repository root:

```bash
corepack pnpm release:check
```

This executes:
1. `@zephrui/ai-registry` build + tests
2. `@zephrui/cloud-sdk` build + tests
3. `@zephrui/cloud-api` typecheck + tests
4. `@zephrui/ui-react` build
5. `@zephrui/docs-playground` typecheck + build

## Manual validation (required)

Run these after `release:check` passes:

1. Start cloud API:
```bash
corepack pnpm --filter @zephrui/cloud-api build
node apps/cloud-api/dist/index.js
```

2. Start docs playground:
```bash
corepack pnpm --filter @zephrui/docs-playground dev --host 127.0.0.1 --port 4174
```

3. Verify asset libraries in docs:
- `IconLibrary` with API key set (cloud source)
- `AvatarLibrary` with API key set (cloud source)
- `LogoLibrary` with API key set (cloud source)
- Remove/clear key and verify local fallback message appears
- Force invalid key and verify fallback + clear error messaging

4. Run browser smoke:
```bash
corepack pnpm ui:smoke:agent
```

## Release sign-off notes

Before release, confirm:
- Registry `propsSchema` is structured and API table renders with type/description/default/status.
- AI setup snippets in Get Started -> AI Tools are generated from tool + manager + project selectors.
- Cloud endpoints used by docs are stable:
  - `GET /v1/icons`
  - `GET /v1/avatars/styles`
  - `GET /v1/logos`
- Docs does not hardcode per-component API copy where registry metadata exists.
