# Zephr Cloud API

Local development server for Zephr cloud endpoints.

## Environment

The server auto-loads env files from:

1. repo root: `.env`, `.env.local`
2. `apps/cloud-api`: `.env`, `.env.local`

Use `apps/cloud-api/.env.example` as the template.

Recommended production settings:

- `ZEPHR_REQUIRE_WEBHOOK_SIGNATURE=true`
- `ZEPHR_ALLOW_LOCAL_LICENSE_FALLBACK=false`
- configure Supabase persistence:
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - apply schema at `apps/cloud-api/supabase/schema.sql`
- map your Lemon Squeezy variant IDs:
  - `ZEPHR_LS_VARIANT_INDIVIDUAL`
  - `ZEPHR_LS_VARIANT_STARTUP`
  - `ZEPHR_LS_VARIANT_ENTERPRISE`
- set plan checkout URLs:
  - `ZEPHR_LS_CHECKOUT_INDIVIDUAL`
  - `ZEPHR_LS_CHECKOUT_STARTUP`
  - `ZEPHR_LS_CHECKOUT_ENTERPRISE`
- set `ZEPHR_LICENSE_STORE_PATH` to persistent storage path

## Run

```bash
pnpm --filter @zephrui/cloud-api build
node apps/cloud-api/dist/index.js
```

## Vercel deployment shape

The API can now be deployed as its own Vercel project rooted at `apps/cloud-api`.

Relevant files:

- `api/[[...route]].ts` — Vercel function entrypoint
- `vercel.json` — rewrites `/health` and `/v1/*` to the Vercel function
- `src/app.ts` — framework-neutral route handler
- `src/nodeAdapter.ts` — Node/Vercel adapter layer

Important details:

- webhook raw-body verification is preserved because the Vercel entrypoint disables body parsing
- pretty public paths stay the same:
  - `GET /health`
  - `GET /v1/licenses/plans`
  - `POST /v1/webhooks/lemonsqueezy`
  - `POST /v1/licenses/validate`
  - `POST /v1/licenses/activate`
  - `POST /v1/licenses/deactivate`
- `typecheck` now validates both `src/**/*` and `api/**/*`

Suggested Vercel project setup:

1. Project root: `apps/cloud-api`
2. No static output directory
3. Set production env values in Vercel project settings
4. Point Lemon Squeezy webhook to:
   - `https://<your-api-project>.vercel.app/v1/webhooks/lemonsqueezy`

## Storage backends

- Default fallback: file-backed JSON store (`ZEPHR_LICENSE_STORE_PATH`).
- Production recommended: Supabase/Postgres via REST (`SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`).
- When Supabase is configured, the API uses Supabase first and falls back to file store if Supabase is temporarily unavailable.

Default local API key: `dev_local_key`

Use header:

```http
Authorization: Bearer dev_local_key
```

## Endpoints

- `GET /health`
- `GET /v1/components`
- `GET /v1/themes`
- `GET /v1/licenses/plans` (public endpoint, returns checkout URLs for individual/startup/enterprise)
- `POST /v1/licenses/validate` (public endpoint, no bearer token required)
- `POST /v1/licenses/activate` (public endpoint, no bearer token required)
- `POST /v1/licenses/deactivate` (public endpoint, no bearer token required)
- `POST /v1/webhooks/lemonsqueezy` (public endpoint, HMAC verified when webhook secret is set)
- `POST /v1/audit/url`
- `GET /v1/icons?q=&limit=&style=`
- `GET /v1/avatars/styles?q=&limit=`
- `GET /v1/logos?q=&limit=`
- `GET /v1/logos/:domain`
- `POST /v1/avatars`
- `POST /v1/snippets`
- `POST /v1/compliance/takedown`

## License validation payload

```json
{
  "licenseKey": "zephr-pro-demo-2026"
}
```

## Plan discovery payload

`GET /v1/licenses/plans`

Sample response fields:

```json
{
  "plans": [
    {
      "id": "individual",
      "label": "Individual",
      "description": "For solo builders and personal projects.",
      "checkoutUrl": "https://...",
      "available": true
    },
    {
      "id": "startup",
      "label": "Startup",
      "description": "For small teams shipping products quickly.",
      "recommended": true,
      "checkoutUrl": "https://...",
      "available": true
    },
    {
      "id": "enterprise",
      "label": "Enterprise",
      "description": "For larger teams with advanced support needs.",
      "checkoutUrl": "https://...",
      "available": true
    }
  ]
}
```

Sample response fields:

```json
{
  "valid": true,
  "tier": "pro",
  "plan": "startup",
  "status": "active",
  "message": "License valid (startup plan).",
  "source": "lemonsqueezy",
  "entitlements": ["ui.components", "ui.page-templates", "cloud.assets", "cloud.audit", "mcp.actions"]
}
```

## License activation payload

```json
{
  "licenseKey": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "instanceName": "my-zephr-workspace"
}
```

## License deactivation payload

```json
{
  "licenseKey": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "instanceId": "instance_123"
}
```

## URL audit payload

```json
{
  "url": "https://example.com",
  "screenshotUrl": "https://cdn.example.com/screen.png",
  "notes": "Improve onboarding conversion for first-time users."
}
```
