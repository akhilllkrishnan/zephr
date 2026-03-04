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

run_step "AI registry build" corepack pnpm --filter @zephyr/ai-registry build
run_step "AI registry tests" corepack pnpm --filter @zephyr/ai-registry test
run_step "Cloud SDK build" corepack pnpm --filter @zephyr/cloud-sdk build
run_step "Cloud SDK tests" corepack pnpm --filter @zephyr/cloud-sdk test
run_step "Cloud API typecheck" corepack pnpm --filter @zephyr/cloud-api typecheck
run_step "Cloud API tests" corepack pnpm --filter @zephyr/cloud-api test
run_step "UI React build" corepack pnpm --filter @zephyr/ui-react build
run_step "Docs playground typecheck" corepack pnpm --filter @zephyr/docs-playground typecheck
run_step "Docs playground build" corepack pnpm --filter @zephyr/docs-playground build

echo ""
echo "Release hardening checks completed successfully."
