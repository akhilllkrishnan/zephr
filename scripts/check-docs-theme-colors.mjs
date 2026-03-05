import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");
const cssPath = path.join(repoRoot, "apps", "docs-playground", "src", "styles.css");
const allowlistPath = path.join(repoRoot, "scripts", "docs-theme-color-allowlist.json");

const css = fs.readFileSync(cssPath, "utf8");
const allowlist = new Set(JSON.parse(fs.readFileSync(allowlistPath, "utf8")));
const foundHex = [...new Set((css.match(/#[0-9a-fA-F]{3,8}/g) ?? []).map((value) => value.toLowerCase()))];
const disallowed = foundHex.filter((value) => !allowlist.has(value)).sort();

if (disallowed.length > 0) {
  console.error("Found raw hex colors outside the approved docs allowlist:");
  for (const hex of disallowed) {
    console.error(`- ${hex}`);
  }
  console.error(
    "Use token aliases (var(--z-*)), or explicitly add approved artifacts to scripts/docs-theme-color-allowlist.json."
  );
  process.exit(1);
}

console.log(`Docs color guard passed (${foundHex.length} tracked raw hex values).`);
