# Zephyr Cloud API

Local development server for Zephyr cloud endpoints.

## Environment

The server auto-loads env files from:

1. repo root: `.env`, `.env.local`
2. `apps/cloud-api`: `.env`, `.env.local`

Use `apps/cloud-api/.env.example` as the template.

## Run

```bash
pnpm --filter @zephyr/cloud-api build
node apps/cloud-api/dist/index.js
```

Default local API key: `dev_local_key`

Use header:

```http
Authorization: Bearer dev_local_key
```

## Endpoints

- `GET /health`
- `GET /v1/components`
- `GET /v1/themes`
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
