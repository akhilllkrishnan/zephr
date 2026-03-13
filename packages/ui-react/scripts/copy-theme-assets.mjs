import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, "..");
const sourceDir = path.join(packageRoot, "src", "themes");
const targetDir = path.join(packageRoot, "dist", "themes");

if (!fs.existsSync(sourceDir)) {
  process.exit(0);
}

fs.mkdirSync(targetDir, { recursive: true });

for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
  if (!entry.isFile() || !entry.name.endsWith(".css")) {
    continue;
  }

  const sourcePath = path.join(sourceDir, entry.name);
  const targetPath = path.join(targetDir, entry.name);
  fs.copyFileSync(sourcePath, targetPath);
}

// Copy tokens.css (consumer entry point — defaults to Notion pack)
const tokensSrc = path.join(packageRoot, "src", "tokens.css");
const tokensDst = path.join(packageRoot, "dist", "tokens.css");
if (fs.existsSync(tokensSrc)) {
  fs.copyFileSync(tokensSrc, tokensDst);
}
