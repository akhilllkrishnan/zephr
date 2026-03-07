import {
  generateComponentScaffold,
  getComponentSpec,
  getComponentTemplate,
  getInstallSteps,
  getTemplateCatalog,
  getThemeVariants,
  getUsageExamples,
  listComponents,
  searchComponents
} from "@zephrui/ai-registry";
import type { AssistantTool, PackageManager } from "@zephrui/ai-registry";

export type McpToolName =
  | "search_components"
  | "get_component_spec"
  | "get_install_steps"
  | "get_usage_examples"
  | "get_theme_variants"
  | "generate_component"
  | "list_templates"
  | "scaffold_page"
  | "apply_theme"
  | "install_plan";

const STYLE_PACKS = ["notion", "stripe", "linear", "framer"] as const;
const LEGACY_STYLE_PACK_MAP: Record<string, (typeof STYLE_PACKS)[number]> = {
  Studio: "notion",
  Editorial: "stripe",
  NeoBrutal: "framer",
  SoftTech: "stripe",
  Enterprise: "linear",
  Clarity: "notion"
};

export interface McpToolCall {
  name: McpToolName;
  arguments?: Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// Tool definitions (returned by tools/list)
// ---------------------------------------------------------------------------

export function listTools() {
  return [
    // --- Info / retrieval tools (existing) ---
    {
      name: "search_components",
      description: "Search Zephr components by name, id, or intent",
      inputSchema: {
        type: "object",
        properties: { query: { type: "string" } },
        required: ["query"]
      }
    },
    {
      name: "get_component_spec",
      description: "Get full component metadata, props, a11y notes, and dependencies",
      inputSchema: {
        type: "object",
        properties: { id: { type: "string" } },
        required: ["id"]
      }
    },
    {
      name: "get_install_steps",
      description: "Return installation/import instructions for a component",
      inputSchema: {
        type: "object",
        properties: { id: { type: "string" } },
        required: ["id"]
      }
    },
    {
      name: "get_usage_examples",
      description: "Return component usage snippets",
      inputSchema: {
        type: "object",
        properties: { id: { type: "string" } },
        required: ["id"]
      }
    },
    {
      name: "get_theme_variants",
      description: "Return supported style packs for a component",
      inputSchema: {
        type: "object",
        properties: { id: { type: "string" } },
        required: ["id"]
      }
    },
    {
      name: "list_templates",
      description:
        "List all available Zephr Pro page templates (DashboardPage, AuthPage, SettingsPage, OnboardingPage). Returns id, name, description, and usage snippet for each template.",
      inputSchema: {
        type: "object",
        properties: {},
        required: []
      }
    },

    // --- Action tools (new) ---
    {
      name: "generate_component",
      description:
        "Generate a ready-to-paste component snippet and AI prompt for a specific Zephr component. Returns the source snippet, a formatted AI prompt, and suggested file names.",
      inputSchema: {
        type: "object",
        properties: {
          id: { type: "string", description: "Component id, e.g. 'button', 'modal-dialog'" },
          stylePack: {
            type: "string",
            description: "Style pack name. One of: notion, stripe, linear, framer. Defaults to notion."
          },
          accentColor: {
            type: "string",
            description: "Accent hex color, e.g. '#121212'. Defaults to '#121212'."
          },
          assistant: {
            type: "string",
            description: "Target AI assistant: Codex, Claude, or Cursor. Defaults to Codex."
          },
          packageManager: {
            type: "string",
            description: "Package manager: pnpm, npm, yarn, or bun. Defaults to pnpm."
          }
        },
        required: ["id"]
      }
    },
    {
      name: "scaffold_page",
      description:
        "Generate a complete, paste-ready React page that composes multiple Zephr components with the selected style pack. Returns the full page source, a zephr.config.ts snippet, and the combined install command.",
      inputSchema: {
        type: "object",
        properties: {
          components: {
            type: "array",
            items: { type: "string" },
            description: "List of component ids to include on the page, e.g. ['navbar', 'button', 'input']"
          },
          stylePack: {
            type: "string",
            description: "Style pack name. Defaults to notion."
          },
          accentColor: {
            type: "string",
            description: "Accent hex color. Defaults to '#121212'."
          },
          pageTitle: {
            type: "string",
            description: "Title of the generated page component. Defaults to 'Page'."
          },
          assistant: {
            type: "string",
            description: "Target AI assistant: Codex, Claude, or Cursor. Defaults to Codex."
          },
          packageManager: {
            type: "string",
            description: "Package manager: pnpm, npm, yarn, or bun. Defaults to pnpm."
          }
        },
        required: ["components"]
      }
    },
    {
      name: "apply_theme",
      description:
        "Generate a zephr.config.ts file content for a given style pack and accent color. Returns the config source string ready to be written to disk, plus the install command.",
      inputSchema: {
        type: "object",
        properties: {
          stylePack: {
            type: "string",
            description: "Style pack name. One of: notion, stripe, linear, framer."
          },
          accentColor: {
            type: "string",
            description: "Accent hex color. Defaults to '#121212'."
          },
          packageManager: {
            type: "string",
            description: "Package manager: pnpm, npm, yarn, or bun. Defaults to pnpm."
          }
        },
        required: ["stylePack"]
      }
    },
    {
      name: "install_plan",
      description:
        "Generate a step-by-step install plan for Zephr components tailored to the user's framework and package manager. Returns numbered steps with exact shell commands, config snippets, and CSS import instructions.",
      inputSchema: {
        type: "object",
        properties: {
          framework: {
            type: "string",
            description: "Target framework: vite, nextjs, remix, or cra. Defaults to vite."
          },
          packageManager: {
            type: "string",
            description: "Package manager: pnpm, npm, yarn, or bun. Defaults to npm."
          },
          components: {
            type: "array",
            items: { type: "string" },
            description: "List of Zephr component IDs to include, e.g. ['button', 'input']. If empty, installs the base package only."
          }
        },
        required: []
      }
    }
  ];
}

// ---------------------------------------------------------------------------
// Tool call handlers
// ---------------------------------------------------------------------------

function str(val: unknown, fallback = ""): string {
  return typeof val === "string" ? val : fallback;
}

function handleGenerateComponent(args: Record<string, unknown>): unknown {
  const id = str(args.id);
  const stylePack = normalizeStylePack(str(args.stylePack), "notion");
  const accentColor = str(args.accentColor, "#121212");
  const assistant = str(args.assistant, "Codex") as AssistantTool;
  const packageManager = str(args.packageManager, "pnpm") as PackageManager;

  const scaffold = generateComponentScaffold(id, {
    stylePack,
    accentColor,
    assistant,
    packageManager,
    includeCloudHint: true,
    snippetHeaderComment: true
  });

  if (!scaffold) {
    return { error: `Component '${id}' not found in registry.` };
  }

  return {
    snippetFileName: scaffold.snippetFileName,
    promptFileName: scaffold.promptFileName,
    snippetContent: scaffold.snippetContent,
    promptContent: scaffold.promptContent,
    installCommand: scaffold.template.installCommand,
    importSnippet: scaffold.template.importSnippet
  };
}

function handleScaffoldPage(args: Record<string, unknown>): unknown {
  const componentIds = Array.isArray(args.components)
    ? (args.components as unknown[]).map(String)
    : [];

  if (componentIds.length === 0) {
    return { error: "At least one component id is required." };
  }

  const stylePack = normalizeStylePack(str(args.stylePack), "notion");
  const accentColor = str(args.accentColor, "#121212");
  const pageTitle = str(args.pageTitle, "Page");
  const assistant = str(args.assistant, "Codex") as AssistantTool;
  const packageManager = str(args.packageManager, "pnpm") as PackageManager;

  // Resolve component entries and collect unique dependencies
  const resolvedComponents: Array<{ id: string; name: string; importSnippet: string }> = [];
  const allDeps = new Set<string>(["@zephrui/core", "@zephrui/ui-react"]);
  const missingIds: string[] = [];

  for (const id of componentIds) {
    const template = getComponentTemplate(id, { packageManager, includeCoreDependency: true });
    if (!template) {
      missingIds.push(id);
      continue;
    }
    resolvedComponents.push({
      id: template.component.id,
      name: template.component.name,
      importSnippet: template.importSnippet
    });
    for (const dep of template.dependencies) {
      allDeps.add(dep);
    }
  }

  // Build install command
  const depsArray = Array.from(allDeps);
  const installCommand = buildInstallCommand(depsArray, packageManager);

  // Build imports block (deduplicated by package)
  const importsByPackage = new Map<string, string[]>();
  for (const c of resolvedComponents) {
    // e.g. import { Button } from "@zephrui/ui-react";
    const match = c.importSnippet.match(/import \{ (.+?) \} from "(.+?)"/);
    if (match) {
      const [, namedImport, pkg] = match;
      if (!importsByPackage.has(pkg)) importsByPackage.set(pkg, []);
      importsByPackage.get(pkg)!.push(namedImport.trim());
    }
  }

  const importLines: string[] = [];
  for (const [pkg, names] of importsByPackage.entries()) {
    const dedupedNames = Array.from(new Set(names)).join(", ");
    importLines.push(`import { ${dedupedNames} } from "${pkg}";`);
  }

  // Build JSX usage block — use first usage example line when available (templates need props)
  const jsxLines = resolvedComponents.map((c) => {
    const spec = getComponentSpec(c.id);
    const exampleLine = spec?.usageExamples?.[0]?.split("\n").find((l: string) => l.trim().startsWith("<"));
    const jsx = exampleLine?.trim() ?? `<${c.name} />`;
    return `      {/* ${c.name} */}\n      ${jsx}`;
  });

  const pageSource = [
    `// ${pageTitle}`,
    `// Generated by Zephr MCP — style pack: ${stylePack}, accent: ${accentColor}`,
    `// Assistant: ${assistant}`,
    "",
    ...importLines,
    "",
    `export default function ${pageTitle.replace(/\s+/g, "")}() {`,
    `  return (`,
    `    <div>`,
    ...jsxLines,
    `    </div>`,
    `  );`,
    `}`
  ].join("\n");

  // Config snippet
  const configSource = buildConfigSource(stylePack, accentColor);

  const warnings = missingIds.length > 0
    ? [`The following component ids were not found and were skipped: ${missingIds.join(", ")}`]
    : [];

  return {
    pageSource,
    configSource,
    installCommand,
    componentCount: resolvedComponents.length,
    includedComponents: resolvedComponents.map((c) => c.id),
    warnings
  };
}

function handleApplyTheme(args: Record<string, unknown>): unknown {
  const requestedPack = str(args.stylePack);
  const accentColor = str(args.accentColor, "#121212");
  const packageManager = str(args.packageManager, "pnpm") as PackageManager;

  const stylePack = normalizeStylePack(requestedPack, "notion");
  if (!STYLE_PACKS.includes(stylePack as (typeof STYLE_PACKS)[number])) {
    return {
      error: `Unknown style pack '${requestedPack}'. Valid values: ${STYLE_PACKS.join(", ")}.`
    };
  }

  const configSource = buildConfigSource(stylePack, accentColor);
  const installCommand = buildInstallCommand(["@zephrui/core", "@zephrui/ui-react"], packageManager);
  const warnings = requestedPack in LEGACY_STYLE_PACK_MAP
    ? [`Style pack "${requestedPack}" is deprecated. Using "${stylePack}".`]
    : [];

  return {
    configSource,
    fileName: "zephr.config.ts",
    installCommand,
    warnings,
    cssNote:
      `Import static theme CSS once in your app entry point: import "@zephrui/ui-react/themes/${stylePack}.css";`
  };
}

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

function buildInstallCommand(deps: string[], packageManager: PackageManager): string {
  const unique = Array.from(new Set(deps));
  switch (packageManager) {
    case "npm": return `npm install ${unique.join(" ")}`;
    case "yarn": return `yarn add ${unique.join(" ")}`;
    case "bun": return `bun add ${unique.join(" ")}`;
    default: return `pnpm add ${unique.join(" ")}`;
  }
}

function buildConfigSource(stylePack: string, accentColor: string): string {
  return [
    `import type { ZephrConfig } from "@zephrui/core";`,
    ``,
    `const config: ZephrConfig = {`,
    `  stylePack: "${stylePack}",`,
    `  tokens: {`,
    `    color: {`,
    `      primary: "${accentColor}",`,
    `      accent: "${accentColor}"`,
    `    }`,
    `  }`,
    `};`,
    ``,
    `export default config;`
  ].join("\n");
}

function normalizeStylePack(input: string, fallback: (typeof STYLE_PACKS)[number]): string {
  if (!input) {
    return fallback;
  }

  if (STYLE_PACKS.includes(input as (typeof STYLE_PACKS)[number])) {
    return input;
  }

  if (input in LEGACY_STYLE_PACK_MAP) {
    return LEGACY_STYLE_PACK_MAP[input];
  }

  return input;
}

// ---------------------------------------------------------------------------
// install_plan handler
// ---------------------------------------------------------------------------

type Framework = "vite" | "nextjs" | "remix" | "cra";

function normalizeFramework(raw: string): Framework {
  if (raw === "nextjs" || raw === "next") return "nextjs";
  if (raw === "remix") return "remix";
  if (raw === "cra" || raw === "create-react-app") return "cra";
  return "vite";
}

function frameworkLabel(fw: Framework): string {
  return { vite: "Vite", nextjs: "Next.js", remix: "Remix", cra: "Create React App" }[fw];
}

function cssImportInstruction(fw: Framework): string {
  switch (fw) {
    case "nextjs":
      return 'In your `app/layout.tsx` (App Router) or `pages/_app.tsx` (Pages Router), add:\n\n```ts\nimport \'../src/styles/zephr.css\'\n```';
    case "remix":
      return 'In `app/root.tsx`, add to the `links` export:\n\n```ts\nimport zephrStyles from \'../src/styles/zephr.css\'\nexport const links: LinksFunction = () => [\n  { rel: \'stylesheet\', href: zephrStyles }\n];\n```';
    default:
      return 'In your app entry point (e.g. `src/main.tsx`), add:\n\n```ts\nimport \'./styles/zephr.css\'\n```';
  }
}

function handleInstallPlan(args: Record<string, unknown>): unknown {
  const frameworkRaw = str(args.framework, "vite");
  const packageManager = str(args.packageManager, "npm") as PackageManager;
  const componentIds = Array.isArray(args.components)
    ? (args.components as unknown[]).map(String)
    : [];

  const framework = normalizeFramework(frameworkRaw);
  const fwLabel = frameworkLabel(framework);

  // Resolve component names for display
  const resolved: Array<{ id: string; name: string }> = [];
  const notFound: string[] = [];
  for (const id of componentIds) {
    const spec = getComponentSpec(id);
    if (spec) {
      resolved.push({ id: spec.id, name: spec.name });
    } else {
      notFound.push(id);
    }
  }

  // Build install command
  const deps = ["@zephrui/core", "@zephrui/ui-react"];
  const installCmd = buildInstallCommand(deps, packageManager);

  // Component-specific add commands
  const addCommands = resolved.map(({ id }) => {
    const tool = packageManager === "npm" ? "npx" :
      packageManager === "yarn" ? "yarn dlx" :
        packageManager === "bun" ? "bunx" : "pnpm dlx";
    return `${tool} zephr add ${id}`;
  });

  const steps: Array<{ step: number; title: string; command?: string; note?: string }> = [
    {
      step: 1,
      title: `Install Zephr packages into your ${fwLabel} project`,
      command: installCmd
    },
    {
      step: 2,
      title: "Initialise Zephr config (generates zephr.config.ts + zephr.css)",
      command: buildInstallCommand(["@zephrui/cli"], packageManager).replace(
        "install", packageManager === "npm" ? "install -g" :
        packageManager === "yarn" ? "global add" :
          packageManager === "bun" ? "add -g" : "add -g"
      ) + ` && zephr init --style-pack notion`
    },
    {
      step: 3,
      title: "Import the generated CSS variables into your app entry point",
      note: cssImportInstruction(framework)
    },
    ...(addCommands.length > 0
      ? addCommands.map((cmd, i) => ({
        step: 4 + i,
        title: `Generate scaffold for ${resolved[i].name}`,
        command: cmd
      }))
      : []),
    {
      step: addCommands.length > 0 ? 4 + addCommands.length : 4,
      title: "Verify your setup",
      command: "zephr doctor"
    }
  ];

  return {
    framework: fwLabel,
    packageManager,
    components: resolved.map((c) => c.id),
    steps,
    warnings: notFound.length > 0
      ? [`These component IDs were not found in the registry and were skipped: ${notFound.join(", ")}`]
      : []
  };
}

// ---------------------------------------------------------------------------
// Main dispatcher
// ---------------------------------------------------------------------------

export function callTool(call: McpToolCall): unknown {
  const args = call.arguments ?? {};
  const id = str(args.id);

  switch (call.name) {
    // Info tools
    case "search_components":
      return searchComponents(str(args.query));
    case "get_component_spec":
      return getComponentSpec(id);
    case "get_install_steps":
      return getInstallSteps(id);
    case "get_usage_examples":
      return getUsageExamples(id);
    case "get_theme_variants":
      return getThemeVariants(id);

    // Action tools
    case "generate_component":
      return handleGenerateComponent(args);
    case "list_templates":
      return getTemplateCatalog().map((t) => ({
        id: t.id,
        name: t.name,
        description: t.description,
        usageExample: t.usageExamples?.[0] ?? `import { ${t.name} } from '@zephrui/ui-react';\n<${t.name} />`
      }));
    case "scaffold_page":
      return handleScaffoldPage(args);
    case "apply_theme":
      return handleApplyTheme(args);
    case "install_plan":
      return handleInstallPlan(args);

    default:
      throw new Error(`Unsupported tool: ${call.name}`);
  }
}

// Re-export for convenience (used by some callers)
export { listComponents };
