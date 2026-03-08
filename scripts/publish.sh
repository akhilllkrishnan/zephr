#!/usr/bin/env bash
# scripts/publish.sh
#
# Zephr npm publish pipeline.
#
# Usage:
#   bash scripts/publish.sh              # dry-run (default, no files pushed)
#   bash scripts/publish.sh --no-dry-run # publish for real
#
# Publishes the following packages (in dependency order):
#   @zephrui/core
#   @zephrui/icons-material
#   @zephrui/avatars
#   @zephrui/logos
#   @zephrui/ai-registry
#   @zephrui/ui-react
#   @zephrui/cli
#   @zephrui/mcp-server
#
# Prerequisites:
#   - Logged in to npm: npm whoami
#   - Clean git working tree
#   - All release:check steps pass

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "${ROOT_DIR}"

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

DRY_RUN=true
for arg in "$@"; do
  if [[ "${arg}" == "--no-dry-run" ]]; then
    DRY_RUN=false
  fi
done

PUBLISHABLE_PACKAGES=(
  "packages/core"
  "packages/icons-material"
  "packages/avatars"
  "packages/logos"
  "packages/ai-registry"
  "packages/ui-react"
  "packages/cli"
  "packages/mcp-server"
)

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

run_step() {
  local label="$1"
  shift
  echo ""
  echo "==> ${label}"
  "$@"
}

check_git_clean() {
  if ! git diff --quiet HEAD 2>/dev/null; then
    echo ""
    echo "ERROR: Git working tree is not clean. Commit or stash changes before publishing."
    echo ""
    git status --short
    exit 1
  fi
}

# ---------------------------------------------------------------------------
# Pre-flight
# ---------------------------------------------------------------------------

echo ""
echo "========================================"
echo "  Zephr npm publish pipeline"
if [[ "${DRY_RUN}" == "true" ]]; then
  echo "  MODE: DRY RUN (pass --no-dry-run to publish)"
else
  echo "  MODE: LIVE PUBLISH"
fi
echo "========================================"

run_step "Checking git working tree" check_git_clean
run_step "Running release hardening checks" bash scripts/release-check.sh
run_step "Building all packages" corepack pnpm build

# ---------------------------------------------------------------------------
# Publish
# ---------------------------------------------------------------------------

PUBLISHED=()
SKIPPED=()

for pkg_dir in "${PUBLISHABLE_PACKAGES[@]}"; do
  pkg_json="${ROOT_DIR}/${pkg_dir}/package.json"
  pkg_name=$(node -e "process.stdout.write(require('${pkg_json}').name)")
  pkg_version=$(node -e "process.stdout.write(require('${pkg_json}').version)")

  echo ""
  echo "==> Publishing ${pkg_name}@${pkg_version} from ${pkg_dir}"

  if [[ "${DRY_RUN}" == "true" ]]; then
    corepack pnpm --filter "${pkg_name}" publish --access public --dry-run --no-git-checks
    PUBLISHED+=("${pkg_name}@${pkg_version} [DRY RUN]")
  else
    corepack pnpm --filter "${pkg_name}" publish --access public --no-git-checks
    PUBLISHED+=("${pkg_name}@${pkg_version}")
  fi
done

# ---------------------------------------------------------------------------
# Summary
# ---------------------------------------------------------------------------

echo ""
echo "========================================"
echo "  Publish summary"
echo "========================================"
for entry in "${PUBLISHED[@]}"; do
  echo "  ✓ ${entry}"
done
if [[ ${#SKIPPED[@]} -gt 0 ]]; then
  for entry in "${SKIPPED[@]}"; do
    echo "  - ${entry} (skipped)"
  done
fi

if [[ "${DRY_RUN}" == "true" ]]; then
  echo ""
  echo "Dry run complete. Re-run with --no-dry-run to publish for real."
else
  echo ""
  echo "All packages published successfully."
fi
