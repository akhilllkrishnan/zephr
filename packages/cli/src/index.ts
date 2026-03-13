#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import readline from "node:readline/promises";
import {
  generateComponentScaffold,
  getComponentSpec,
  listComponents,
  searchComponents
} from "@zephrui/ai-registry";
import {
  LEGACY_STYLE_PACK_MAP,
  generateCssVariables,
  loadZephrConfig,
  resolveConfig,
  resolveStylePackName,
  stylePackNames,
  type ResolvedZephrConfig,
  type StylePackName
} from "@zephrui/core";

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
  "zephr.config.ts",
  "zephr.config.js",
  "zephr.config.cjs",
  "zephr.config.mjs",
  "zephr.config.json"
];

const MANAGED_START = "// zephr-managed:start";
const MANAGED_END = "// zephr-managed:end";
const DEFAULT_STYLE_PACK: StylePackName = "notion";

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

function resolveRequestedStylePack(
  requested: string | undefined,
  fallback: StylePackName
): StylePackName | null {
  if (!requested) {
    return fallback;
  }

  if (stylePackNames.includes(requested as StylePackName)) {
    return requested as StylePackName;
  }

  if (requested in LEGACY_STYLE_PACK_MAP) {
    return resolveStylePackName(requested);
  }

  return null;
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
    apiKey: process.env.ZEPHR_API_KEY
  }
};
`;
}

function buildClaudeContext(stylePack: StylePackName, accent: string): string {
  return [
    "# Zephr Workspace Context",
    "",
    "## What is Zephyr?",
    "Zephr is a token-native React UI library for AI-assisted SaaS product development.",
    "Every component is built on `--z-*` CSS custom properties. Do not hardcode colors, radii, or spacing.",
    "",
    "## Configuration",
    `- Style pack: \`${stylePack}\``,
    `- Accent color: \`${accent}\``,
    "- Config file: `zephr.config.ts` (source of truth for theme overrides)",
    "- Generated CSS: `src/styles/zephr.css` (import this in your root layout)",
    "",
    "## Critical rules",
    "1. Always import from `@zephrui/ui-react` — never write raw `<button>`, `<input>`, `<select>`, or `<textarea>` when a Zephr equivalent exists.",
    "2. Never hardcode hex colors. Use `var(--z-color-*)` tokens or let components handle their own color.",
    "3. Use `FormField` to wrap any labeled input — it handles label, hint, and error text.",
    "4. Use `LayoutShell` + `SidebarNav` for any multi-page admin/dashboard layout — do not build custom sidebar scaffolding.",
    "5. Use `DataTable` + `SearchBox` + `FiltersBar` for any tabular data view.",
    "6. Use `ModalDialog` or `Sheet` for confirmation dialogs and slide-over panels — never `<dialog>` directly.",
    "7. Keep components accessible: pass `aria-label` to icon-only buttons, link labels to inputs via `htmlFor`/`id`.",
    "",
    "## Component catalogue",
    "",
    "### Atoms (import all from `@zephrui/ui-react`)",
    "| Component | Key props | Notes |",
    "|---|---|---|",
    "| `Button` | `variant` (primary\|secondary\|ghost\|danger), `size` (sm\|md\|lg), `loading`, `disabled` | Default: primary md |",
    "| `Input` | `value`, `onChange`, `placeholder`, `type` | Wrap in `FormField` for labels |",
    "| `Textarea` | `value`, `onChange`, `rows`, `placeholder` | Wrap in `FormField` for labels |",
    "| `Select` | `value`, `onChange`, `children` (option elements) | Wrap in `FormField` for labels |",
    "| `Checkbox` | `checked`, `onChange`, `disabled` | Wrap with `<label>` text |",
    "| `Switch` | `checked`, `onChange(next: boolean)`, `disabled` | For feature flags |",
    "| `Badge` | `color` (gray\|blue\|green\|red\|orange…), `variant` (filled\|lighter\|stroke), `type` (basic\|dot) | Prefer `type=dot` for passive status |",
    "| `Avatar` | `name`, `src`, `size` | Shows initials fallback |",
    "| `Progress` | `value` (0–100), `size` (sm\|md) | Linear progress indicator |",
    "| `Skeleton` | `width`, `height`, `radius` | Loading placeholder |",
    "",
    "### Molecules",
    "| Component | Key props | Notes |",
    "|---|---|---|",
    "| `FormField` | `label`, `hint`, `error`, `htmlFor`, `children` | Wraps any input |",
    "| `SearchBox` | `value`, `onChange`, `placeholder` | Pair with `FiltersBar` and `DataTable` |",
    "| `Tabs` | `items` ([{id,label}]), `activeId`, `onChange` | Top-level page tabs |",
    "| `Dropdown` | `trigger`, `items` ([{label,onClick}]) | Action menus, context menus |",
    "| `Alert` | `status` (info\|success\|warning\|error), `title`, `children` | Inline status messages |",
    "| `Toast` | `message`, `tone`, show via state | Ephemeral notifications |",
    "| `CommandBar` | `placeholder`, `items`, `onSelect` | Keyboard-driven command palette |",
    "| `Pagination` | `page`, `totalPages`, `onChange` | Table and list pagination |",
    "| `Tooltip` | `content`, `children` | Wraps any triggering element |",
    "",
    "### Organisms",
    "| Component | Key props | Notes |",
    "|---|---|---|",
    "| `Navbar` | `brand`, `actions`, `navItems` | Top nav — use at app root |",
    "| `SidebarNav` | `items` ([{id,label,icon,href}]), `activeId` | Left rail navigation |",
    "| `LayoutShell` | `sidebar`, `navbar`, `children` | Full page shell — use once per layout |",
    "| `DataTable` | `columns` ([{id,header,cell}]), `rows`, `onRowClick` | Main data grid |",
    "| `FiltersBar` | `filters` ([{id,label,options}]), `value`, `onChange` | Filter strip above `DataTable` |",
    "| `ModalDialog` | `open`, `onClose`, `title`, `children`, `footer` | Confirmation dialogs |",
    "| `Sheet` | `open`, `onClose`, `title`, `children` | Slide-over detail panel |",
    "| `SearchResultsPanel` | `results`, `onSelect` | Floating search results |",
    "",
    "### Layout primitives",
    "`Stack`, `Grid`, `Box`, `Spacer` — composable layout wrappers.",
    "",
    "## Common composition recipes",
    "",
    "### CRM / admin table page",
    "```tsx",
    `import { LayoutShell, SidebarNav, DataTable, SearchBox, FiltersBar, Button } from '@zephrui/ui-react';`,
    "// 1. Wrap the page in <LayoutShell>",
    "// 2. Pass <SidebarNav items={navItems} activeId={currentRoute} /> to sidebar prop",
    "// 3. Above the table: <SearchBox /> and <FiltersBar />",
    "// 4. <DataTable columns={cols} rows={data} onRowClick={openDetail} />",
    "// 5. Detail opens in <Sheet> slide-over",
    "```",
    "",
    "### Settings page",
    "```tsx",
    `import { FormField, Input, Switch, Button, Tabs } from '@zephrui/ui-react';`,
    "// 1. <Tabs> for Settings sections (General, Security, Notifications, Billing)",
    "// 2. Each section uses <FormField> wrapping <Input> or <Switch>",
    "// 3. Submit row: <Button variant='primary'>Save changes</Button>",
    "```",
    "",
    "## MCP Server (optional — greatly improves output quality)",
    "If the `zephr` MCP server is connected, use these tools before generating any component:",
    "- `zephr_search` — find the right component by keyword",
    "- `zephr_spec` — get full prop schema for a specific component",
    "- `zephr_scaffold_page` — scaffold a full page template",
    "",
    "Add to Claude Desktop (`~/Library/Application Support/Claude/claude_desktop_config.json`):",
    "```json",
    "{",
    '  "mcpServers": {',
    '    "zephr": { "command": "npx", "args": ["@zephrui/mcp@latest"] }',
    "  }",
    "}",
    "```",
    "For Cursor: add the same block to `.cursor/mcp.json` in your project root."
  ].join("\n") + "\n";
}

function buildAgentsContext(stylePack: StylePackName, accent: string): string {
  return [
    "# AGENTS",
    "",
    "## Zephr usage policy",
    `- Style pack: \`${stylePack}\` · Accent: \`${accent}\``,
    "- Import all UI components from `@zephrui/ui-react`.",
    "- Never emit raw `<button>`, `<input>`, `<select>`, `<textarea>`, or `<dialog>` when an equivalent Zephr component exists.",
    "- Never hardcode colors — use `var(--z-color-*)` tokens.",
    "- Always wrap labeled inputs in `<FormField>`.",
    "- For any data list / table view, use `DataTable` + `SearchBox` + `FiltersBar`.",
    "- For slide-over panels, use `<Sheet>`. For modals, use `<ModalDialog>`.",
    "- For page layout, use `<LayoutShell>` with `<SidebarNav>` — do not build custom sidebar scaffolding.",
    "",
    "## Available components (import from `@zephrui/ui-react`)",
    "",
    "Atoms: Button, Input, Textarea, Select, Checkbox, Radio, Switch, Badge, Avatar, Logo, Progress, Skeleton, Slider",
    "Molecules: FormField, SearchBox, Tabs, Dropdown, Alert, Toast, CommandBar, Pagination, Tooltip, Accordion, DatePicker, ButtonGroup, TagInput, NumberInput",
    "Organisms: Navbar, SidebarNav, LayoutShell, DataTable, FiltersBar, ModalDialog, Sheet, SearchResultsPanel",
    "Layout: Stack, Grid, Box, Spacer",
    "",
    "## Key prop signatures",
    "```ts",
    "Button: variant='primary'|'secondary'|'ghost'|'danger', size='sm'|'md'|'lg', loading?, disabled?",
    "Badge: color='gray'|'blue'|'green'|'red'|'orange'|'purple'|'teal'|'sky'|'pink'|'yellow', variant='filled'|'lighter'|'stroke', type='basic'|'dot'",
    "DataTable: columns=[{id, header, cell:(row)=>ReactNode}], rows=[...], onRowClick?",
    "Tabs: items=[{id,label}], activeId, onChange",
    "ModalDialog: open, onClose, title, children, footer?",
    "Sheet: open, onClose, title, children",
    "LayoutShell: sidebar, navbar?, children",
    "SidebarNav: items=[{id,label,icon?,href?}], activeId",
    "FormField: label, hint?, error?, htmlFor, children",
    "Alert: status='info'|'success'|'warning'|'error', title, children?",
    "```"
  ].join("\n") + "\n";
}

function buildLlmsContext(stylePack: StylePackName, accent: string): string {
  return [
    "# Zephr UI — llms.txt",
    "",
    "Zephr is a token-native React UI library for AI-assisted SaaS product development.",
    `Style pack: ${stylePack} · Accent: ${accent}`,
    "",
    "## Install",
    "```",
    "npm install @zephrui/ui-react @zephrui/core",
    "# Then import generated tokens in your root layout:",
    "import 'src/styles/zephr.css';",
    "```",
    "",
    "## Rules",
    "- Use Zephr components before raw HTML.",
    "- Never hardcode hex — use `var(--z-color-*)` tokens.",
    "- Wrap every labeled input in `<FormField label=\"...\" htmlFor=\"...\">...</FormField>`.",
    "- Use `<LayoutShell>` + `<SidebarNav>` for multi-page layouts.",
    "- Use `<DataTable columns rows>` for tabular data — pair with `<SearchBox>` and `<FiltersBar>`.",
    "",
    "## Component quick-reference",
    "```tsx",
    `// Button
import { Button } from '@zephrui/ui-react';
<Button variant='primary' size='md'>Save</Button>
<Button variant='secondary'>Cancel</Button>
<Button variant='danger'>Delete</Button>`,
    "",
    `// Badge
import { Badge } from '@zephrui/ui-react';
<Badge color='green' variant='lighter' type='dot'>Active</Badge>
<Badge color='red' variant='filled'>Error</Badge>`,
    "",
    `// FormField + Input
import { FormField, Input } from '@zephrui/ui-react';
<FormField label='Email' htmlFor='email' hint='We will never share this.'>
  <Input id='email' type='email' value={email} onChange={e => setEmail(e.target.value)} />
</FormField>`,
    "",
    `// DataTable
import { DataTable } from '@zephrui/ui-react';
const columns = [
  { id: 'name', header: 'Name', cell: (row) => row.name },
  { id: 'status', header: 'Status', cell: (row) => <Badge color='green' variant='lighter'>{row.status}</Badge> },
];
<DataTable columns={columns} rows={data} onRowClick={openDetail} />`,
    "",
    `// LayoutShell
import { LayoutShell, SidebarNav, Navbar } from '@zephrui/ui-react';
<LayoutShell
  navbar={<Navbar brand='MyApp' />}
  sidebar={<SidebarNav items={navItems} activeId={currentPage} />}
>
  {children}
</LayoutShell>`,
    "",
    `// ModalDialog
import { ModalDialog, Button } from '@zephrui/ui-react';
<ModalDialog open={open} onClose={() => setOpen(false)} title='Confirm delete'
  footer={<Button variant='danger' onClick={handleDelete}>Delete</Button>}
>
  This action cannot be undone.
</ModalDialog>`,
    "```"
  ].join("\n") + "\n";
}

function writeAiContextFiles(
  cwd: string,
  stylePack: StylePackName,
  accent: string,
  force = false
): void {
  const files: Array<{ path: string; content: string }> = [
    {
      path: path.join(cwd, "CLAUDE.md"),
      content: buildClaudeContext(stylePack, accent)
    },
    {
      path: path.join(cwd, "AGENTS.md"),
      content: buildAgentsContext(stylePack, accent)
    },
    {
      path: path.join(cwd, "llms.txt"),
      content: buildLlmsContext(stylePack, accent)
    }
  ];

  for (const file of files) {
    if (fs.existsSync(file.path) && !force) {
      continue;
    }
    writeFile(file.path, file.content);
    console.log(`Created ${path.relative(cwd, file.path)}`);
  }
}

function buildCss(config: ResolvedZephrConfig): string {
  return generateCssVariables(config.tokens, config.prefix);
}

function writeCssFile(cwd: string, config: ResolvedZephrConfig): string {
  const stylesDir = path.join(cwd, "src", "styles");
  ensureDir(stylesDir);
  const cssPath = path.join(stylesDir, "zephr.css");
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

function currentConfigOrFallback(cwd: string, stylePack: StylePackName, accent: string): ResolvedZephrConfig {
  try {
    return loadZephrConfig(cwd);
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
  const pack = resolveRequestedStylePack(requestedPack, DEFAULT_STYLE_PACK);
  if (!pack) {
    console.error(`Invalid style pack '${requestedPack}'. Use one of: ${stylePackNames.join(", ")}`);
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

  const configPath = path.join(cwd, "zephr.config.ts");
  if (fs.existsSync(configPath) && !force) {
    console.log("zephr.config.ts already exists. Reusing current config (use --force to overwrite).");
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
        "# Required for Zephr cloud APIs.",
        "ZEPHR_API_KEY=replace_me"
      ].join("\n") + "\n"
    );
    console.log(`Created ${path.relative(cwd, envPath)}`);
  }

  const resolved = currentConfigOrFallback(cwd, pack, accent);
  const cssPath = writeCssFile(cwd, resolved);
  console.log(`Generated ${path.relative(cwd, cssPath)}`);
  writeAiContextFiles(cwd, resolved.stylePack, resolved.tokens.color.primary, force);
}

async function commandAdd(input: ParsedInput): Promise<void> {
  const componentId = input.positionals[0];
  if (!componentId) {
    console.error("Usage: zephr add <component> [--tool Codex|Claude|Cursor] [--out <dir>] [--force]");
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
  const outDir = readFlag(input, "out") ?? "zephr-snippets";
  const force = hasFlag(input, "force");
  const snippetsDir = path.join(process.cwd(), outDir);
  ensureDir(snippetsDir);

  const resolved = loadZephrConfig(process.cwd());
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
    console.error("No Zephr config found. Run 'zephr init' first.");
    process.exitCode = 1;
    return;
  }

  if (hasFlag(input, "list")) {
    console.log("Available style packs:");
    stylePackNames.forEach((pack) => console.log(`- ${pack}`));
    return;
  }

  let nextPackRaw = input.positionals[0];
  let nextAccent = normalizeHexColor(readFlag(input, "accent"));
  if (readFlag(input, "accent") && !nextAccent) {
    console.error("Accent color must be a hex value like #335cff.");
    process.exitCode = 1;
    return;
  }

  const current = loadZephrConfig(cwd);

  if (!nextPackRaw) {
    if (!process.stdin.isTTY || hasFlag(input, "yes")) {
      console.error(`Usage: zephr theme <stylePack> [--accent <hex>] or run interactively in a terminal.`);
      process.exitCode = 1;
      return;
    }

    try {
      nextPackRaw = await promptStylePack(current.stylePack);
      if (!nextAccent) {
        nextAccent = await promptAccent(current.tokens.color.primary);
      }
    } catch (error) {
      console.error(error instanceof Error ? error.message : "Theme prompt failed.");
      process.exitCode = 1;
      return;
    }
  }

  const nextPack = resolveRequestedStylePack(nextPackRaw, current.stylePack);
  if (!nextPack) {
    console.error(`Invalid style pack '${nextPackRaw}'. Use one of: ${stylePackNames.join(", ")}`);
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

  let resolved: ResolvedZephrConfig;
  try {
    resolved = loadZephrConfig(cwd);
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
      label: "Zephr config",
      status: "FAIL",
      detail: "Missing zephr.config.* (run 'zephr init')"
    });
  } else {
    checks.push({
      label: "Zephr config",
      status: "PASS",
      detail: path.relative(cwd, configPath)
    });
  }

  let resolvedConfig: ResolvedZephrConfig | null = null;
  if (configPath) {
    try {
      resolvedConfig = loadZephrConfig(cwd);
      checks.push({
        label: "Config parse",
        status: "PASS",
        detail: `Style pack: ${resolvedConfig.stylePack}`
      });
    } catch (error) {
      checks.push({
        label: "Config parse",
        status: "FAIL",
        detail: error instanceof Error ? error.message : "Failed to parse Zephr config."
      });
    }
  }

  const cssPath = path.join(cwd, "src", "styles", "zephr.css");
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
      detail: "Missing src/styles/zephr.css (run 'zephr init' or 'zephr theme')."
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
    const hasCore = hasDependency(packageJson, "@zephrui/core");
    const hasUi = hasDependency(packageJson, "@zephrui/ui-react");
    if (hasCore && hasUi) {
      checks.push({
        label: "Zephr deps",
        status: "PASS",
        detail: "@zephrui/core and @zephrui/ui-react are declared"
      });
    } else {
      checks.push({
        label: "Zephr deps",
        status: "WARN",
        detail: "Declare @zephrui/core and @zephrui/ui-react in package.json"
      });
    }
  }

  const apiKey = process.env.ZEPHR_API_KEY ?? resolvedConfig?.cloud.apiKey;
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
      detail: "Missing ZEPHR_API_KEY. Local usage is fine; cloud endpoints require it."
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

  console.log("Zephr doctor complete.");
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
  ".zephr",
  "credentials"
);

interface ZephrCredentials {
  licenseKey: string;
  tier: "pro";
  activatedAt: string;
}

function readCredentials(): ZephrCredentials | null {
  try {
    const raw = fs.readFileSync(CREDENTIALS_PATH, "utf8");
    return JSON.parse(raw) as ZephrCredentials;
  } catch {
    return null;
  }
}

function commandUpgrade(input: ParsedInput): void {
  const key = readFlag(input, "key");

  if (!key) {
    console.error("Error: --key <license-key> is required.");
    console.error("  Usage: zephr upgrade --key <your-license-key>");
    process.exitCode = 1;
    return;
  }

  const credentialsDir = path.dirname(CREDENTIALS_PATH);
  if (!fs.existsSync(credentialsDir)) {
    fs.mkdirSync(credentialsDir, { recursive: true });
  }

  const credentials: ZephrCredentials = {
    licenseKey: key,
    tier: "pro",
    activatedAt: new Date().toISOString()
  };

  fs.writeFileSync(CREDENTIALS_PATH, JSON.stringify(credentials, null, 2), "utf8");

  console.log("✓ Zephr Pro activated.");
  console.log(`  License key saved to ${CREDENTIALS_PATH}`);
  console.log("  You now have access to all Pro components and premium style packs.");
}

function commandWhoami(): void {
  const credentials = readCredentials();

  if (!credentials) {
    console.log("Tier: free (no license key found)");
    console.log("  Run `zephr upgrade --key <key>` to activate Pro.");
    return;
  }

  console.log(`Tier:    ${credentials.tier}`);
  console.log(`Key:     ${credentials.licenseKey.slice(0, 8)}...`);
  console.log(`Since:   ${new Date(credentials.activatedAt).toLocaleDateString()}`);
}

// ---------------------------------------------------------------------------
// add-skills
// ---------------------------------------------------------------------------

type SupportedEditor = "claude-code" | "cursor" | "codex" | "universal";

const SKILL_FILES = [
  "adapt",
  "animate",
  "annotate",
  "audit",
  "bolder",
  "breathe",
  "clarify",
  "colorize",
  "compose",
  "critique",
  "distill",
  "focus",
  "harden",
  "normalize",
  "polish",
  "quieter",
  "scaffold",
  "teach-zephr",
  "tighten",
  "token-check",
  "widget"
] as const;

function resolveSkillsSourceDir(): string {
  // When installed via npm the skills directory sits next to src/ at package root
  // __dirname resolves to dist/ after compilation, so go up one level
  const candidates = [
    path.resolve(__dirname, "..", "skills"),
    path.resolve(__dirname, "skills")
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }
  throw new Error(
    `Could not locate the Zephr skills directory. Expected one of:\n  ${candidates.join("\n  ")}`
  );
}

function writeFileEnsureDir(filePath: string, content: string): void {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
}

function buildCursorRules(skillsDir: string): string {
  const lines: string[] = [
    "# Zephr Commands — Cursor Rules",
    "",
    "These slash commands are part of the Zephr design system command vocabulary.",
    "Use them in Cursor AI chat to apply designer-quality changes to your UI.",
    ""
  ];

  for (const skill of SKILL_FILES) {
    const skillPath = path.join(skillsDir, `${skill}.md`);
    if (!fs.existsSync(skillPath)) continue;
    const raw = fs.readFileSync(skillPath, "utf8");
    // Extract the description from frontmatter
    const descMatch = /^description:\s*(.+)$/m.exec(raw);
    const desc = descMatch ? descMatch[1].trim() : skill;
    lines.push(`## /${skill}`);
    lines.push(`> ${desc}`);
    lines.push("");
    // Include skill body (strip frontmatter)
    const body = raw.replace(/^---[\s\S]*?---\n?/, "").trim();
    lines.push(body);
    lines.push("");
    lines.push("---");
    lines.push("");
  }

  return lines.join("\n");
}

function buildAgentsDoc(skillsDir: string): string {
  const lines: string[] = [
    "# Zephr Command Reference — AGENTS.md",
    "",
    "Zephr slash commands are available in this project.",
    "Use them in any AI coding session to apply design system conventions.",
    ""
  ];

  for (const skill of SKILL_FILES) {
    const skillPath = path.join(skillsDir, `${skill}.md`);
    if (!fs.existsSync(skillPath)) continue;
    const raw = fs.readFileSync(skillPath, "utf8");
    const descMatch = /^description:\s*(.+)$/m.exec(raw);
    const desc = descMatch ? descMatch[1].trim() : skill;
    lines.push(`### /${skill}`);
    lines.push(`${desc}`);
    lines.push("");
    const body = raw.replace(/^---[\s\S]*?---\n?/, "").trim();
    lines.push(body);
    lines.push("");
  }

  return lines.join("\n");
}

function commandAddSkills(input: ParsedInput): void {
  const rawEditor = readFlag(input, "editor") ?? "claude-code";
  const editor = rawEditor as SupportedEditor;
  const validEditors: SupportedEditor[] = ["claude-code", "cursor", "codex", "universal"];

  if (!validEditors.includes(editor)) {
    console.error(
      `Unknown editor "${editor}". Valid options: ${validEditors.join(", ")}`
    );
    process.exitCode = 1;
    return;
  }

  let skillsDir: string;
  try {
    skillsDir = resolveSkillsSourceDir();
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
    return;
  }

  const cwd = process.cwd();

  if (editor === "claude-code") {
    const destDir = path.join(cwd, ".claude", "commands");
    fs.mkdirSync(destDir, { recursive: true });
    let written = 0;
    for (const skill of SKILL_FILES) {
      const src = path.join(skillsDir, `${skill}.md`);
      if (!fs.existsSync(src)) {
        console.warn(`  ⚠ Skill file not found, skipping: ${skill}.md`);
        continue;
      }
      const dest = path.join(destDir, `${skill}.md`);
      fs.copyFileSync(src, dest);
      written += 1;
    }
    console.log(`✓ Installed ${written} Zephr commands to .claude/commands/`);
    console.log("  Use them in any Claude Code conversation:");
    console.log("    /polish    /audit    /bolder    /scaffold dashboard");
  } else if (editor === "cursor") {
    const destFile = path.join(cwd, ".cursor", "rules", "zephr.mdc");
    const content = buildCursorRules(skillsDir);
    writeFileEnsureDir(destFile, content);
    console.log(`✓ Zephr commands written to .cursor/rules/zephr.mdc`);
    console.log("  Use /slash commands in Cursor AI chat.");
  } else if (editor === "codex") {
    const destFile = path.join(cwd, "AGENTS.md");
    const existing = fs.existsSync(destFile) ? fs.readFileSync(destFile, "utf8") : "";
    const marker = "<!-- zephr-skills -->";
    const block = `${marker}\n${buildAgentsDoc(skillsDir)}\n${marker}`;
    const updated = existing.includes(marker)
      ? existing.replace(new RegExp(`${marker}[\\s\\S]*?${marker}`), block)
      : `${existing}\n\n${block}`.trimStart();
    fs.writeFileSync(destFile, updated, "utf8");
    console.log(`✓ Zephr commands appended to AGENTS.md`);
  } else {
    // universal
    const destFile = path.join(cwd, "ZEPHR-COMMANDS.md");
    const content = buildAgentsDoc(skillsDir);
    fs.writeFileSync(destFile, content, "utf8");
    console.log(`✓ Zephr commands written to ZEPHR-COMMANDS.md`);
    console.log("  Reference this file from any AI editor's custom instructions.");
  }
}

function printHelp(): void {
  console.log(`Zephr CLI

Usage:
  zephr init [--style-pack <name>] [--accent <hex>] [--force]
  zephr add <component> [--tool Codex|Claude|Cursor] [--out <dir>] [--force]
  zephr add-skills [--editor claude-code|cursor|codex|universal]
  zephr theme [<stylePack>] [--accent <hex>] [--list]
  zephr doctor [--strict]
  zephr list [--search <query>] [--category foundation|atom|molecule|organism]
  zephr upgrade --key <license-key>
  zephr whoami

Examples:
  zephr init --style-pack notion --accent #335cff
  zephr add button --tool Codex
  zephr add-skills --editor claude-code
  zephr add-skills --editor cursor
  zephr theme stripe --accent #1d4ed8
  zephr doctor
  zephr upgrade --key ZEPHR-PRO-XXXX-XXXX
  zephr whoami

Commands:
  init         Set up Zephr in an existing project
  add          Generate a component scaffold for your AI tool
  add-skills   Install Zephr slash commands into your AI editor
  theme        Switch the active style pack
  doctor       Check your Zephr setup for issues
  list         Browse available components
  upgrade      Activate a Pro license key
  whoami       Show current license status
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
    case "add-skills":
      commandAddSkills(input);
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
