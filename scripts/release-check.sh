#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "${ROOT_DIR}"

run_step() {
  local label="$1"
  shift
  echo ""
  echo "==> ${label}"
  "$@"
}

run_step "AI registry build" corepack pnpm --filter @zephrui/ai-registry build
run_step "AI registry tests" corepack pnpm --filter @zephrui/ai-registry test
run_step "Cloud SDK build" corepack pnpm --filter @zephrui/cloud-sdk build
run_step "Cloud SDK tests" corepack pnpm --filter @zephrui/cloud-sdk test
run_step "Cloud API typecheck" corepack pnpm --filter @zephrui/cloud-api typecheck
run_step "Cloud API tests" corepack pnpm --filter @zephrui/cloud-api test
run_step "UI React build" corepack pnpm --filter @zephrui/ui-react build
run_step "Docs playground typecheck" corepack pnpm --filter @zephrui/docs-playground typecheck
run_step "Docs playground build" corepack pnpm --filter @zephrui/docs-playground build

echo ""
echo "Release hardening checks completed successfully."
