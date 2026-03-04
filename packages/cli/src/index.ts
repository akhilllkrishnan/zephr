#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import readline from "node:readline/promises";
import {
  generateComponentScaffold,
  getComponentSpec,
  listComponents,
  searchComponents
} from "@zephyr/ai-registry";
import {
  generateCssVariables,
  loadZephyrConfig,
  resolveConfig,
  stylePackNames,
  type ResolvedZephyrConfig,
  type StylePackName
} from "@zephyr/core";

type AssistantTool = "Codex" | "Claude" | "Cursor";
type DoctorStatus = "PASS" | "WARN" | "FAIL";

interface ParsedInput {
  positionals: string[];
  flags: Record<string, string | boolean>;
}

interface DoctorCheck {
  label: string;
  status: DoctorStatus;
  detail: string;
}

const CONFIG_CANDIDATES = [
  "zephyr.config.ts",
  "zephyr.config.js",
  "zephyr.config.cjs",
  "zephyr.config.mjs",
  "zephyr.config.json"
];

const MANAGED_START = "// zephyr-managed:start";
const MANAGED_END = "// zephyr-managed:end";

function parseInput(args: string[]): ParsedInput {
  const positionals: string[] = [];
  const flags: Record<string, string | boolean> = {};

  for (let index = 0; index < args.length; index += 1) {
    const token = args[index];
    if (!token.startsWith("--")) {
      positionals.push(token);
      continue;
    }

    const key = token.slice(2);
    const next = args[index + 1];
    if (next && !next.startsWith("--")) {
      flags[key] = next;
      index += 1;
    } else {
      flags[key] = true;
    }
  }

  return { positionals, flags };
}

function readFlag(input: ParsedInput, name: string): string | undefined {
  const value = input.flags[name];
  return typeof value === "string" ? value : undefined;
}

function hasFlag(input: ParsedInput, name: string): boolean {
  return input.flags[name] === true;
}

function writeFile(filePath: string, content: string): void {
  fs.writeFileSync(filePath, content, "utf8");
}

function ensureDir(dirPath: string): void {
  fs.mkdirSync(dirPath, { recursive: true });
}

function findConfigPath(cwd: string): string | null {
  for (const filename of CONFIG_CANDIDATES) {
    const fullPath = path.join(cwd, filename);
    if (fs.existsSync(fullPath)) {
      return fullPath;
    }
  }

  return null;
}

function normalizeHexColor(value?: string | null): string | null {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  const full = /^#?([0-9a-fA-F]{6})$/.exec(trimmed);
  if (full) {
    return `#${full[1].toLowerCase()}`;
  }

  const short = /^#?([0-9a-fA-F]{3})$/.exec(trimmed);
  if (short) {
    const [r, g, b] = short[1].toLowerCase().split("");
    return `#${r}${r}${g}${g}${b}${b}`;
  }

  return null;
}

function accentTextColor(backgroundHex: string): string {
  const normalized = normalizeHexColor(backgroundHex) ?? "#121212";
  const channels = normalized
    .slice(1)
    .match(/.{2}/g)
    ?.map((part) => Number.parseInt(part, 16) / 255) ?? [0.145, 0.388, 0.922];
  const [r, g, b] = channels.map((channel) =>
    channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  );
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.45 ? "#111827" : "#ffffff";
}

function defaultAccentForPack(stylePack: StylePackName): string {
  return resolveConfig({ stylePack }).tokens.color.primary;
}

function managedThemeBlock(stylePack: StylePackName, accent: string): string {
  const contrast = accentTextColor(accent);
  return [
    `  ${MANAGED_START}`,
    `  stylePack: "${stylePack}",`,
    `  prefix: "z",`,
    "  tokens: {",
    "    color: {",
    `      primary: "${accent}",`,
    `      accent: "${accent}",`,
    `      primaryContrast: "${contrast}"`,
    "    }",
    "  },",
    `  ${MANAGED_END}`
  ].join("\n");
}

function buildDefaultConfig(stylePack: StylePackName, accent: string): string {
  return `export default {
${managedThemeBlock(stylePack, accent)},
  semanticAliases: {
    "color.page": "color.background",
    "color.card": "color.surface",
    "color.copy": "color.text"
  },
  plugins: [],
  cloud: {
    baseUrl: "http://localhost:8787",
    apiKey: process.env.ZEPHYR_API_KEY
  }
};
`;
}

function buildCss(config: ResolvedZephyrConfig): string {
  return generateCssVariables(config.tokens, config.prefix);
}

function writeCssFile(cwd: string, config: ResolvedZephyrConfig): string {
  const stylesDir = path.join(cwd, "src", "styles");
  ensureDir(stylesDir);
  const cssPath = path.join(stylesDir, "zephyr.css");
  writeFile(cssPath, buildCss(config));
  return cssPath;
}

function detectPackageManager(cwd: string): "pnpm" | "npm" | "yarn" | "bun" {
  if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) {
    return "pnpm";
  }
  if (fs.existsSync(path.join(cwd, "bun.lockb")) || fs.existsSync(path.join(cwd, "bun.lock"))) {
    return "bun";
  }
  if (fs.existsSync(path.join(cwd, "yarn.lock"))) {
    return "yarn";
  }
  return "npm";
}

function currentConfigOrFallback(cwd: string, stylePack: StylePackName, accent: string): ResolvedZephyrConfig {
  try {
    return loadZephyrConfig(cwd);
  } catch {
    return resolveConfig({
      stylePack,
      prefix: "z",
      tokens: {
        color: {
          primary: accent,
          accent,
          primaryContrast: accentTextColor(accent)
        }
      }
    });
  }
}

function patchConfigWithTheme(configSource: string, stylePack: StylePackName, accent: string): {
  nextSource: string;
  usedManagedPatch: boolean;
} {
  const managedRange = new RegExp(
    `${MANAGED_START.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${MANAGED_END.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`
  );
  if (managedRange.test(configSource)) {
    return {
      nextSource: configSource.replace(managedRange, managedThemeBlock(stylePack, accent)),
      usedManagedPatch: true
    };
  }

  if (/stylePack\s*:\s*["'`][^"'`]+["'`]/.test(configSource)) {
    return {
      nextSource: configSource.replace(
        /stylePack\s*:\s*["'`][^"'`]+["'`]/,
        `stylePack: "${stylePack}"`
      ),
      usedManagedPatch: false
    };
  }

  const exportDefaultIndex = configSource.indexOf("export default {");
  if (exportDefaultIndex >= 0) {
    const insertionPoint = exportDefaultIndex + "export default {".length;
    return {
      nextSource:
        configSource.slice(0, insertionPoint) +
        `\n  stylePack: "${stylePack}",` +
        configSource.slice(insertionPoint),
      usedManagedPatch: false
    };
  }

  return {
    nextSource: buildDefaultConfig(stylePack, accent),
    usedManagedPatch: false
  };
}

function readPackageJson(cwd: string): Record<string, unknown> | null {
  const packagePath = path.join(cwd, "package.json");
  if (!fs.existsSync(packagePath)) {
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(packagePath, "utf8")) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function hasDependency(packageJson: Record<string, unknown>, dependency: string): boolean {
  const deps = (packageJson.dependencies as Record<string, string> | undefined) ?? {};
  const devDeps = (packageJson.devDependencies as Record<string, string> | undefined) ?? {};
  const peerDeps = (packageJson.peerDependencies as Record<string, string> | undefined) ?? {};
  return Boolean(deps[dependency] || devDeps[dependency] || peerDeps[dependency]);
}

async function promptStylePack(defaultPack: StylePackName): Promise<StylePackName> {
  console.log("Pick a style pack:");
  stylePackNames.forEach((pack, index) => {
    const marker = pack === defaultPack ? " (default)" : "";
    console.log(`  ${index + 1}. ${pack}${marker}`);
  });

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const answer = (await rl.question(`Style pack [${defaultPack}]: `)).trim();
  rl.close();

  if (!answer) {
    return defaultPack;
  }

  const numeric = Number.parseInt(answer, 10);
  if (!Number.isNaN(numeric) && numeric >= 1 && numeric <= stylePackNames.length) {
    return stylePackNames[numeric - 1];
  }

  if (stylePackNames.includes(answer as StylePackName)) {
    return answer as StylePackName;
  }

  throw new Error(`Invalid style pack '${answer}'.`);
}

async function promptAccent(defaultAccent: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const answer = (await rl.question(`Accent color [${defaultAccent}]: `)).trim();
  rl.close();

  if (!answer) {
    return defaultAccent;
  }

  const normalized = normalizeHexColor(answer);
  if (!normalized) {
    throw new Error("Accent color must be a hex value like #335cff.");
  }

  return normalized;
}

async function commandInit(input: ParsedInput): Promise<void> {
  const cwd = process.cwd();
  const requestedPack = readFlag(input, "style-pack");
  const force = hasFlag(input, "force");
  const pack = (requestedPack ?? "Studio") as StylePackName;
  if (!stylePackNames.includes(pack)) {
    console.error(`Invalid style pack '${pack}'. Use one of: ${stylePackNames.join(", ")}`);
    process.exitCode = 1;
    return;
  }

  const requestedAccent = readFlag(input, "accent");
  const accent = normalizeHexColor(requestedAccent) ?? defaultAccentForPack(pack);
  if (requestedAccent && !normalizeHexColor(requestedAccent)) {
    console.error("Accent color must be a hex value like #335cff.");
    process.exitCode = 1;
    return;
  }

  const configPath = path.join(cwd, "zephyr.config.ts");
  if (fs.existsSync(configPath) && !force) {
    console.log("zephyr.config.ts already exists. Reusing current config (use --force to overwrite).");
  } else {
    writeFile(configPath, buildDefaultConfig(pack, accent));
    console.log(`Created ${path.relative(cwd, configPath)}`);
  }

  const envPath = path.join(cwd, ".env.example");
  if (!fs.existsSync(envPath)) {
    writeFile(
      envPath,
      [
        "# Optional for local package usage.",
        "# Required for Zephyr cloud APIs.",
        "ZEPHYR_API_KEY=replace_me"
      ].join("\n") + "\n"
    );
    console.log(`Created ${path.relative(cwd, envPath)}`);
  }

  const resolved = currentConfigOrFallback(cwd, pack, accent);
  const cssPath = writeCssFile(cwd, resolved);
  console.log(`Generated ${path.relative(cwd, cssPath)}`);
}

async function commandAdd(input: ParsedInput): Promise<void> {
  const componentId = input.positionals[0];
  if (!componentId) {
    console.error("Usage: zephyr add <component> [--tool Codex|Claude|Cursor] [--out <dir>] [--force]");
    process.exitCode = 1;
    return;
  }

  const component = getComponentSpec(componentId);
  if (!component) {
    const suggestions = searchComponents(componentId).slice(0, 5).map((entry) => entry.id);
    console.error(`Component '${componentId}' not found.`);
    if (suggestions.length) {
      console.error(`Try: ${suggestions.join(", ")}`);
    }
    process.exitCode = 1;
    return;
  }

  const toolValue = readFlag(input, "tool") ?? "Codex";
  const tool = toolValue === "Claude" || toolValue === "Cursor" ? toolValue : "Codex";
  const outDir = readFlag(input, "out") ?? "zephyr-snippets";
  const force = hasFlag(input, "force");
  const snippetsDir = path.join(process.cwd(), outDir);
  ensureDir(snippetsDir);

  const resolved = loadZephyrConfig(process.cwd());
  const manager = detectPackageManager(process.cwd());
  const scaffold = generateComponentScaffold(component, {
    packageManager: manager,
    assistant: tool,
    stylePack: resolved.stylePack,
    accentColor: resolved.tokens.color.primary
  });
  if (!scaffold) {
    console.error(`Unable to generate scaffold for '${componentId}'.`);
    process.exitCode = 1;
    return;
  }

  const snippetPath = path.join(snippetsDir, scaffold.snippetFileName);
  const promptPath = path.join(snippetsDir, scaffold.promptFileName);

  if (!fs.existsSync(snippetPath) || force) {
    writeFile(snippetPath, scaffold.snippetContent);
  }

  if (!fs.existsSync(promptPath) || force) {
    writeFile(promptPath, scaffold.promptContent);
  }

  console.log(`Component: ${component.name} (${component.id})`);
  console.log(`Install: ${scaffold.template.installCommand}`);
  console.log(`Snippet: ${path.relative(process.cwd(), snippetPath)}`);
  console.log(`Prompt:  ${path.relative(process.cwd(), promptPath)}`);
}

async function commandTheme(input: ParsedInput): Promise<void> {
  const cwd = process.cwd();
  const configPath = findConfigPath(cwd);
  if (!configPath) {
    console.error("No Zephyr config found. Run 'zephyr init' first.");
    process.exitCode = 1;
    return;
  }

  if (hasFlag(input, "list")) {
    console.log("Available style packs:");
    stylePackNames.forEach((pack) => console.log(`- ${pack}`));
    return;
  }

  let nextPack = input.positionals[0] as StylePackName | undefined;
  let nextAccent = normalizeHexColor(readFlag(input, "accent"));
  if (readFlag(input, "accent") && !nextAccent) {
    console.error("Accent color must be a hex value like #335cff.");
    process.exitCode = 1;
    return;
  }

  const current = loadZephyrConfig(cwd);

  if (!nextPack) {
    if (!process.stdin.isTTY || hasFlag(input, "yes")) {
      console.error(`Usage: zephyr theme <stylePack> [--accent <hex>] or run interactively in a terminal.`);
      process.exitCode = 1;
      return;
    }

    try {
      nextPack = await promptStylePack(current.stylePack);
      if (!nextAccent) {
        nextAccent = await promptAccent(current.tokens.color.primary);
      }
    } catch (error) {
      console.error(error instanceof Error ? error.message : "Theme prompt failed.");
      process.exitCode = 1;
      return;
    }
  }

  if (!stylePackNames.includes(nextPack)) {
    console.error(`Invalid style pack '${nextPack}'. Use one of: ${stylePackNames.join(", ")}`);
    process.exitCode = 1;
    return;
  }

  const accent = nextAccent ?? defaultAccentForPack(nextPack);
  const source = fs.readFileSync(configPath, "utf8");
  const { nextSource, usedManagedPatch } = patchConfigWithTheme(source, nextPack, accent);
  writeFile(configPath, nextSource);

  if (!usedManagedPatch && nextAccent) {
    console.log(
      "Warning: accent was applied to generated CSS, but config tokens were not patched because this file is unmanaged."
    );
  }

  let resolved: ResolvedZephyrConfig;
  try {
    resolved = loadZephyrConfig(cwd);
  } catch {
    resolved = resolveConfig({
      stylePack: nextPack,
      prefix: "z",
      tokens: {
        color: {
          primary: accent,
          accent,
          primaryContrast: accentTextColor(accent)
        }
      }
    });
  }

  const cssPath = writeCssFile(cwd, resolved);
  console.log(`Theme updated: ${resolved.stylePack}`);
  console.log(`Accent: ${resolved.tokens.color.primary}`);
  console.log(`Regenerated ${path.relative(cwd, cssPath)}`);
}

async function commandDoctor(input: ParsedInput): Promise<void> {
  const strict = hasFlag(input, "strict");
  const cwd = process.cwd();
  const checks: DoctorCheck[] = [];

  const nodeMajor = Number(process.versions.node.split(".")[0]);
  if (Number.isNaN(nodeMajor) || nodeMajor < 18) {
    checks.push({
      label: "Node runtime",
      status: "FAIL",
      detail: `Detected ${process.versions.node}; require Node.js 18+`
    });
  } else {
    checks.push({
      label: "Node runtime",
      status: "PASS",
      detail: `Detected ${process.versions.node}`
    });
  }

  const configPath = findConfigPath(cwd);
  if (!configPath) {
    checks.push({
      label: "Zephyr config",
      status: "FAIL",
      detail: "Missing zephyr.config.* (run 'zephyr init')"
    });
  } else {
    checks.push({
      label: "Zephyr config",
      status: "PASS",
      detail: path.relative(cwd, configPath)
    });
  }

  let resolvedConfig: ResolvedZephyrConfig | null = null;
  if (configPath) {
    try {
      resolvedConfig = loadZephyrConfig(cwd);
      checks.push({
        label: "Config parse",
        status: "PASS",
        detail: `Style pack: ${resolvedConfig.stylePack}`
      });
    } catch (error) {
      checks.push({
        label: "Config parse",
        status: "FAIL",
        detail: error instanceof Error ? error.message : "Failed to parse Zephyr config."
      });
    }
  }

  const cssPath = path.join(cwd, "src", "styles", "zephyr.css");
  if (fs.existsSync(cssPath)) {
    checks.push({
      label: "Compiled CSS",
      status: "PASS",
      detail: path.relative(cwd, cssPath)
    });
  } else {
    checks.push({
      label: "Compiled CSS",
      status: "FAIL",
      detail: "Missing src/styles/zephyr.css (run 'zephyr init' or 'zephyr theme')."
    });
  }

  const packageJson = readPackageJson(cwd);
  if (!packageJson) {
    checks.push({
      label: "package.json",
      status: "WARN",
      detail: "No package.json found in current directory."
    });
  } else {
    checks.push({
      label: "package.json",
      status: "PASS",
      detail: "Found package.json"
    });
    const hasCore = hasDependency(packageJson, "@zephyr/core");
    const hasUi = hasDependency(packageJson, "@zephyr/ui-react");
    if (hasCore && hasUi) {
      checks.push({
        label: "Zephyr deps",
        status: "PASS",
        detail: "@zephyr/core and @zephyr/ui-react are declared"
      });
    } else {
      checks.push({
        label: "Zephyr deps",
        status: "WARN",
        detail: "Declare @zephyr/core and @zephyr/ui-react in package.json"
      });
    }
  }

  const apiKey = process.env.ZEPHYR_API_KEY ?? resolvedConfig?.cloud.apiKey;
  if (apiKey) {
    checks.push({
      label: "Cloud API key",
      status: "PASS",
      detail: "API key available (env/config)"
    });
  } else {
    checks.push({
      label: "Cloud API key",
      status: "WARN",
      detail: "Missing ZEPHYR_API_KEY. Local usage is fine; cloud endpoints require it."
    });
  }

  for (const check of checks) {
    console.log(`[${check.status}] ${check.label}: ${check.detail}`);
  }

  const hasFailures = checks.some((check) => check.status === "FAIL");
  const hasWarnings = checks.some((check) => check.status === "WARN");
  if (hasFailures || (strict && hasWarnings)) {
    process.exitCode = 1;
    return;
  }

  console.log("Zephyr doctor complete.");
}

function commandList(input: ParsedInput): void {
  const query = readFlag(input, "search");
  const category = readFlag(input, "category");
  const entries = query ? searchComponents(query) : listComponents();
  const filtered = category ? entries.filter((entry) => entry.category === category) : entries;

  if (!filtered.length) {
    console.log("No components matched your query.");
    return;
  }

  for (const entry of filtered) {
    const tier = entry.tier === "pro" ? " [PRO]" : "      ";
    console.log(`${entry.id.padEnd(22)} ${entry.category.padEnd(9)} ${tier} ${entry.name}`);
  }
}

const CREDENTIALS_PATH = path.join(
  process.env.HOME ?? process.env.USERPROFILE ?? "~",
  ".zephyr",
  "credentials"
);

interface ZephyrCredentials {
  licenseKey: string;
  tier: "pro";
  activatedAt: string;
}

function readCredentials(): ZephyrCredentials | null {
  try {
    const raw = fs.readFileSync(CREDENTIALS_PATH, "utf8");
    return JSON.parse(raw) as ZephyrCredentials;
  } catch {
    return null;
  }
}

function commandUpgrade(input: ParsedInput): void {
  const key = readFlag(input, "key");

  if (!key) {
    console.error("Error: --key <license-key> is required.");
    console.error("  Usage: zephyr upgrade --key <your-license-key>");
    process.exitCode = 1;
    return;
  }

  const credentialsDir = path.dirname(CREDENTIALS_PATH);
  if (!fs.existsSync(credentialsDir)) {
    fs.mkdirSync(credentialsDir, { recursive: true });
  }

  const credentials: ZephyrCredentials = {
    licenseKey: key,
    tier: "pro",
    activatedAt: new Date().toISOString()
  };

  fs.writeFileSync(CREDENTIALS_PATH, JSON.stringify(credentials, null, 2), "utf8");

  console.log("✓ Zephyr Pro activated.");
  console.log(`  License key saved to ${CREDENTIALS_PATH}`);
  console.log("  You now have access to all Pro components and style packs.");
}

function commandWhoami(): void {
  const credentials = readCredentials();

  if (!credentials) {
    console.log("Tier: free (no license key found)");
    console.log("  Run `zephyr upgrade --key <key>` to activate Pro.");
    return;
  }

  console.log(`Tier:    ${credentials.tier}`);
  console.log(`Key:     ${credentials.licenseKey.slice(0, 8)}...`);
  console.log(`Since:   ${new Date(credentials.activatedAt).toLocaleDateString()}`);
}

function printHelp(): void {
  console.log(`Zephyr CLI

Usage:
  zephyr init [--style-pack <name>] [--accent <hex>] [--force]
  zephyr add <component> [--tool Codex|Claude|Cursor] [--out <dir>] [--force]
  zephyr theme [<stylePack>] [--accent <hex>] [--list]
  zephyr doctor [--strict]
  zephyr list [--search <query>] [--category foundation|atom|molecule|organism]
  zephyr upgrade --key <license-key>
  zephyr whoami

Examples:
  zephyr init --style-pack Clarity --accent #335cff
  zephyr add button --tool Codex
  zephyr theme Editorial --accent #1d4ed8
  zephyr doctor
  zephyr upgrade --key ZEPHYR-PRO-XXXX-XXXX
  zephyr whoami
`);
}

async function main(): Promise<void> {
  const [command, ...rest] = process.argv.slice(2);
  const input = parseInput(rest);

  switch (command) {
    case "init":
      await commandInit(input);
      return;
    case "add":
      await commandAdd(input);
      return;
    case "theme":
      await commandTheme(input);
      return;
    case "doctor":
      await commandDoctor(input);
      return;
    case "list":
      commandList(input);
      return;
    case "upgrade":
      commandUpgrade(input);
      return;
    case "whoami":
      commandWhoami();
      return;
    case "help":
    case "--help":
    case "-h":
    case undefined:
      printHelp();
      return;
    default:
      console.error(`Unknown command: ${command}`);
      printHelp();
      process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
