#!/usr/bin/env node
// Bundles @zephrui/ui-react as a browser IIFE so the render harness
// can use window.Zephr.Button etc. without a real bundler.
import { build } from "esbuild";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "../../..");
const entry = path.join(root, "packages/ui-react/src/index.ts");
const outfile = path.join(__dirname, "../src/renderer/zephr-bundle.js");

// Ensure renderer dir exists
fs.mkdirSync(path.dirname(outfile), { recursive: true });

await build({
  entryPoints: [entry],
  bundle: true,
  format: "iife",
  globalName: "Zephr",
  outfile,
  external: ["react", "react-dom"],
  loader: {
    ".ts": "ts",
    ".tsx": "tsx",
    ".css": "empty",
    ".png": "empty",
    ".svg": "empty",
    ".jpg": "empty",
    ".jpeg": "empty",
    ".gif": "empty",
    ".webp": "empty",
  },
  define: {
    "process.env.NODE_ENV": '"production"',
  },
  minify: false,
  logLevel: "info",
}).catch((e) => {
  console.error("esbuild bundle failed:", e.message);
  // Write an empty bundle so the build doesn't completely fail
  fs.writeFileSync(outfile, "window.Zephr = {};");
});
