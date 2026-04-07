#!/bin/bash
export PATH="/usr/local/bin:$PATH"
exec /usr/local/bin/node /usr/local/lib/node_modules/corepack/dist/corepack.js pnpm --filter "@zephrui/docs-playground" dev --host 127.0.0.1 --port 4172
