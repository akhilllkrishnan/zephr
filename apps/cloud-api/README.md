# Zephyr Cloud API

Local development server for Zephyr cloud endpoints.

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
