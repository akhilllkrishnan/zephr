// Copies scripts/postinstall.mjs → postinstall.mjs (package root) so it is
// accessible at the path declared in package.json "postinstall" script after
// the package is installed by a consumer.
import { copyFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = join(__dirname, "postinstall.mjs");
const dest = join(__dirname, "..", "postinstall.mjs");

copyFileSync(src, dest);
console.log("Copied postinstall.mjs to package root.");
