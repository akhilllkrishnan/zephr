# Zephyr Cloud API

Local development server for Zephyr cloud endpoints.

## Environment

The server auto-loads env files from:

1. repo root: `.env`, `.env.local`
2. `apps/cloud-api`: `.env`, `.env.local`

Use `apps/cloud-api/.env.example` as the template.

Recommended production settings:

- `ZEPHYR_REQUIRE_WEBHOOK_SIGNATURE=true`
- `ZEPHYR_ALLOW_LOCAL_LICENSE_FALLBACK=false`
- configure Supabase persistence:
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - apply schema at `apps/cloud-api/supabase/schema.sql`
- map your Lemon Squeezy variant IDs:
  - `ZEPHYR_LS_VARIANT_INDIVIDUAL`
  - `ZEPHYR_LS_VARIANT_STARTUP`
  - `ZEPHYR_LS_VARIANT_ENTERPRISE`
- set plan checkout URLs:
  - `ZEPHYR_LS_CHECKOUT_INDIVIDUAL`
  - `ZEPHYR_LS_CHECKOUT_STARTUP`
  - `ZEPHYR_LS_CHECKOUT_ENTERPRISE`
- set `ZEPHYR_LICENSE_STORE_PATH` to persistent storage path

## Run

```bash
pnpm --filter @zephyr/cloud-api build
node apps/cloud-api/dist/index.js
```

## Storage backends

- Default fallback: file-backed JSON store (`ZEPHYR_LICENSE_STORE_PATH`).
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
  "licenseKey": "zephyr-pro-demo-2026"
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
  "instanceName": "my-zephyr-workspace"
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
