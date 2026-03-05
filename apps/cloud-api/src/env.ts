import fs from "node:fs";
import path from "node:path";

let envLoaded = false;

function parseEnvFile(contents: string): Record<string, string> {
  const values: Record<string, string> = {};
  const lines = contents.split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const match = line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!match) {
      continue;
    }

    const key = match[1];
    let value = match[2] ?? "";

    if (
      (value.startsWith("\"") && value.endsWith("\"")) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    } else {
      value = value.replace(/\s+#.*$/, "").trim();
    }

    value = value
      .replace(/\\n/g, "\n")
      .replace(/\\r/g, "\r")
      .replace(/\\t/g, "\t");

    values[key] = value;
  }

  return values;
}

function resolveEnvCandidates(): string[] {
  const appDir = path.resolve(__dirname, "..");
  const repoRootFromApp = path.resolve(appDir, "../..");
  const cwd = process.cwd();

  return [
    path.resolve(repoRootFromApp, ".env"),
    path.resolve(repoRootFromApp, ".env.local"),
    path.resolve(appDir, ".env"),
    path.resolve(appDir, ".env.local"),
    path.resolve(cwd, ".env"),
    path.resolve(cwd, ".env.local")
  ];
}

export function ensureCloudEnvLoaded(): void {
  if (envLoaded) {
    return;
  }
  envLoaded = true;

  const seen = new Set<string>();
  for (const candidate of resolveEnvCandidates()) {
    if (seen.has(candidate)) {
      continue;
    }
    seen.add(candidate);

    if (!fs.existsSync(candidate)) {
      continue;
    }

    let raw = "";
    try {
      raw = fs.readFileSync(candidate, "utf8");
    } catch {
      continue;
    }

    const values = parseEnvFile(raw);
    for (const [key, value] of Object.entries(values)) {
      if (process.env[key] === undefined) {
        process.env[key] = value;
      }
    }
  }
}

