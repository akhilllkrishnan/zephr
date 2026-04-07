#!/usr/bin/env node
// Wrapper: sets cwd to docs-playground before spawning vite
const { spawn } = require("child_process");
const path = require("path");

const appDir = path.resolve(__dirname, "../apps/docs-playground");
const vite = path.resolve(appDir, "node_modules/vite/bin/vite.js");

const child = spawn(process.execPath, [vite, "--host", "127.0.0.1", "--port", "4172"], {
  cwd: appDir,
  stdio: "inherit",
  env: { ...process.env, PATH: "/usr/local/bin:" + (process.env.PATH || "") },
});

child.on("exit", (code) => process.exit(code ?? 0));
