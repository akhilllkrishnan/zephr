# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- Cloud catalog endpoints with auth/rate-limit support:
  - `GET /v1/icons`
  - `GET /v1/avatars/styles`
  - `GET /v1/logos`
- Public license validation endpoint:
  - `POST /v1/licenses/validate`
- `@zephrui/cloud-sdk` typed search methods:
  - `searchIcons`
  - `listAvatarStyles`
  - `searchLogos`
- `@zephrui/cloud-sdk` license validation method:
  - `validateLicense`
- Release hardening runbook and script:
  - `docs/release-hardening.md`
  - `corepack pnpm release:check`

### Changed
- Docs playground now supports global style-pack switching (`notion`, `stripe`, `linear`, `framer`) with persistent accent control.
- Component preview area now uses browser-window style interactive canvas with explicit state selector for key components.
- Zephr Pro modal now validates keys through cloud API with async loading/error handling.
- Docs playground AI Tools setup now uses generator controls (assistant, project preset, package manager) and emits dynamic install/context/prompt snippets.
- Docs playground asset-library previews now support cloud API key sync with local fallback messaging.
- Registry API reference table now uses structured prop metadata (type, description, values, required, default, status) from shared registry helpers.

## [0.1.0] — 2026-03-03

### Added
- Initial public release
- `@zephrui/core`: token system, config model with 6 style packs, CSS variable generation
- `@zephrui/ui-react`: 40+ components — Button, Input, Avatar, DataTable, SearchResultsPanel, CommandBar, and more
- **Component depth**: loading states (Button, Avatar, DataTable, CommandBar), empty states (DataTable, SearchResultsPanel), async form states (FormField pending/success)
- **Pro page templates**: DashboardPage, AuthPage, SettingsPage, OnboardingPage
- `@zephrui/ai-registry`: machine-readable component registry with props schema, a11y notes, and AI hints
- `@zephrui/mcp-server`: MCP tools — `search_components`, `get_component_spec`, `generate_component`, `scaffold_page`, `apply_theme`, `list_templates`
