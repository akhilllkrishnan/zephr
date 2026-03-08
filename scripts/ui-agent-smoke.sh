#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PORT="${PORT:-4174}"
BASE_URL="${BASE_URL:-http://127.0.0.1:${PORT}}"
SESSION="${SESSION:-}"
OUT_DIR="${OUT_DIR:-${ROOT_DIR}/artifacts/agent-browser}"
DEV_LOG="${OUT_DIR}/docs-dev.log"

mkdir -p "${OUT_DIR}"

dev_pid=""

cleanup() {
  if [[ -n "${dev_pid}" ]] && kill -0 "${dev_pid}" >/dev/null 2>&1; then
    kill "${dev_pid}" >/dev/null 2>&1 || true
  fi

  if [[ -n "${SESSION}" ]]; then
    agent-browser --session "${SESSION}" close >/dev/null 2>&1 || true
  else
    agent-browser close >/dev/null 2>&1 || true
  fi
}

trap cleanup EXIT

run_browser() {
  if [[ -n "${SESSION}" ]]; then
    agent-browser --session "${SESSION}" "$@"
  else
    agent-browser "$@"
  fi
}

wait_for_server() {
  local url="$1"
  local max_tries="${2:-40}"
  local delay="${3:-0.5}"
  local i

  for ((i = 1; i <= max_tries; i += 1)); do
    if curl -fsS "${url}" >/dev/null 2>&1; then
      return 0
    fi
    sleep "${delay}"
  done

  return 1
}

if ! command -v agent-browser >/dev/null 2>&1; then
  echo "agent-browser not found. Install it first:"
  echo "npm install -g agent-browser && agent-browser install"
  exit 1
fi

if ! curl -fsS "${BASE_URL}" >/dev/null 2>&1; then
  echo "Starting docs playground on ${BASE_URL}..."
  corepack pnpm --filter @zephrui/docs-playground dev --host 127.0.0.1 --port "${PORT}" >"${DEV_LOG}" 2>&1 &
  dev_pid="$!"

  if ! wait_for_server "${BASE_URL}" 60 0.5; then
    echo "Failed to start docs playground. See ${DEV_LOG}"
    exit 1
  fi
fi

# Reset session once before test flow to avoid stale daemon/session state.
run_browser close >/dev/null 2>&1 || true

if ! run_browser open "about:blank" >/dev/null 2>&1; then
  echo "agent-browser daemon/browser failed to start."
  echo "Try:"
  echo "  agent-browser close"
  echo "  agent-browser install"
  echo "  agent-browser --debug open about:blank"
  exit 1
fi

echo "Running agent-browser smoke flow..."

run_browser open "${BASE_URL}/?view=getting-started&accent=%23121212"
run_browser wait 1200
run_browser screenshot "${OUT_DIR}/01-getting-started.png"

run_browser open "${BASE_URL}/?view=components&component=accordion&accent=%23121212"
run_browser wait 1000
run_browser screenshot "${OUT_DIR}/02-accordion.png"
run_browser click "button[aria-controls='accordion-panel-2']"
run_browser wait 500
run_browser screenshot "${OUT_DIR}/03-accordion-open.png"

run_browser open "${BASE_URL}/?view=components&component=alert&accent=%23121212"
run_browser wait 900
run_browser screenshot "${OUT_DIR}/04-alert.png"

run_browser open "${BASE_URL}/?view=components&component=toast&accent=%23121212"
run_browser wait 900
run_browser screenshot "${OUT_DIR}/05-toast.png"
run_browser find nth 0 "button[aria-label='Dismiss alert']" click || true
run_browser wait 500
run_browser screenshot "${OUT_DIR}/06-toast-dismissed.png"

run_browser open "${BASE_URL}/?view=components&component=input&accent=%23121212"
run_browser wait 900
run_browser screenshot "${OUT_DIR}/07-input.png"
run_browser snapshot > "${OUT_DIR}/07-input-snapshot.txt"

echo "Smoke flow completed."
echo "Artifacts: ${OUT_DIR}"
