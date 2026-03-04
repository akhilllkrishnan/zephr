import components from "./registry/components.json";

export type ComponentCategory = "foundation" | "atom" | "molecule" | "organism" | "template";
export type ComponentTier = "free" | "pro";
export type AssistantTool = "Codex" | "Claude" | "Cursor";
export type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

export interface StructuredPropSchema {
  type: string | string[];
  description?: string;
  required?: boolean;
  default?: unknown;
  deprecated?: boolean;
  values?: unknown[];
}

export type RegistryPropDefinition = string | string[] | StructuredPropSchema;

export interface RegistryPropRow {
  name: string;
  type: string;
  acceptedValues: string;
  description: string;
  required: boolean;
  defaultValue: string;
  deprecated: boolean;
}

export interface RegistryEntry {
  id: string;
  name: string;
  tier: ComponentTier;
  category: ComponentCategory;
  description: string;
  propsSchema: Record<string, RegistryPropDefinition>;
  a11yNotes: string[];
  dependencies: string[];
  stylePackSupport: string[];
  aiHints: string[];
  usageExamples?: string[];
}

export interface ComponentTemplateOptions {
  packageManager?: PackageManager;
  includeCoreDependency?: boolean;
}

export interface ComponentTemplate {
  component: RegistryEntry;
  dependencies: string[];
  installCommand: string;
  installSteps: string[];
  importSnippet: string;
  usageSnippet: string;
  defaultIntent: string;
}

export interface PromptGenerationOptions extends ComponentTemplateOptions {
  assistant?: AssistantTool;
  stylePack?: string;
  accentColor?: string;
  configSnippet?: string;
  intent?: string;
  includeCloudHint?: boolean;
}

export interface ScaffoldGenerationOptions extends PromptGenerationOptions {
  snippetHeaderComment?: boolean;
}

export interface ComponentScaffold {
  snippetFileName: string;
  promptFileName: string;
  snippetContent: string;
  promptContent: string;
  template: ComponentTemplate;
}

type RawRegistryEntry = Omit<RegistryEntry, "tier"> & { tier?: ComponentTier };

const registry: RegistryEntry[] = (components as unknown as RawRegistryEntry[]).map((entry) => ({
  ...entry,
  tier: entry.tier ?? "free"
}));

function normalizedManager(value?: PackageManager): PackageManager {
  if (!value) {
    return "pnpm";
  }
  return value;
}

function componentFromInput(componentOrId: string | RegistryEntry): RegistryEntry | null {
  if (typeof componentOrId === "string") {
    return getComponentSpec(componentOrId);
  }
  return componentOrId;
}

function dedupe(values: string[]): string[] {
  return Array.from(new Set(values));
}

function humanizePropName(name: string): string {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim()
    .toLowerCase();
}

function stringifyDefaultValue(value: unknown): string {
  if (typeof value === "undefined" || value === null || value === "") {
    return "—";
  }
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

export function normalizePropDefinition(
  name: string,
  definition: RegistryPropDefinition
): StructuredPropSchema {
  if (Array.isArray(definition)) {
    return {
      type: "enum",
      values: definition,
      description: `Available options for ${humanizePropName(name)}.`,
      required: false,
      default: definition[0] ?? null,
      deprecated: false
    };
  }

  if (typeof definition === "string") {
    return {
      type: definition,
      description: `Configuration for ${humanizePropName(name)}.`,
      required: false,
      default: null,
      deprecated: false
    };
  }

  const fallbackType = Array.isArray(definition.values)
    ? "enum"
    : (Array.isArray(definition.type) ? "enum" : (definition.type ?? "string"));

  return {
    type: definition.type ?? fallbackType,
    values: Array.isArray(definition.values)
      ? definition.values
      : Array.isArray(definition.type)
        ? definition.type
        : undefined,
    description: definition.description ?? `Configuration for ${humanizePropName(name)}.`,
    required: definition.required ?? false,
    default: typeof definition.default === "undefined" ? null : definition.default,
    deprecated: definition.deprecated ?? false
  };
}

export function getComponentPropsTable(componentOrId: string | RegistryEntry): RegistryPropRow[] {
  const component = componentFromInput(componentOrId);
  if (!component) {
    return [];
  }

  return Object.entries(component.propsSchema).map(([name, rawDefinition]) => {
    const normalized = normalizePropDefinition(name, rawDefinition);
    const normalizedType = Array.isArray(normalized.type)
      ? normalized.type.map((value) => JSON.stringify(value)).join(" | ")
      : normalized.type;
    const acceptedValues = Array.isArray(normalized.values) && normalized.values.length
      ? normalized.values.map((value) => String(value)).join(", ")
      : (normalizedType === "enum" ? "See type union" : "Any valid value");

    return {
      name,
      type: normalizedType,
      acceptedValues,
      description: normalized.description ?? "",
      required: normalized.required ?? false,
      defaultValue: stringifyDefaultValue(normalized.default),
      deprecated: normalized.deprecated ?? false
    };
  });
}

function buildInstallCommand(dependencies: string[], packageManager: PackageManager): string {
  const deps = dedupe(dependencies);
  switch (packageManager) {
    case "npm":
      return `npm install ${deps.join(" ")}`;
    case "yarn":
      return `yarn add ${deps.join(" ")}`;
    case "bun":
      return `bun add ${deps.join(" ")}`;
    default:
      return `pnpm add ${deps.join(" ")}`;
  }
}

function categoryIntent(category: ComponentCategory): string {
  switch (category) {
    case "foundation":
      return "Create a reusable foundation block with strong token mapping and clear semantics.";
    case "atom":
      return "Build a clean production-ready UI block with responsive behavior and clear hierarchy.";
    case "molecule":
      return "Compose multiple primitives into a cohesive interaction block with robust accessibility states.";
    case "organism":
      return "Create a full feature section with clear structure, responsive layout, and production-ready interactions.";
    case "template":
      return "Use this Zephyr page template as a drop-in starting point. Wire props to real data, customize sections, and extend layout as needed.";
    default:
      return "Create a production-ready UI block with strong accessibility and responsive behavior.";
  }
}

function defaultIntent(entry: RegistryEntry): string {
  if (entry.aiHints.length > 0) {
    return `${categoryIntent(entry.category)} ${entry.aiHints[0]}`;
  }
  return categoryIntent(entry.category);
}

export function listComponents(): RegistryEntry[] {
  return [...registry];
}

export function searchComponents(query: string): RegistryEntry[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return listComponents();
  }

  return registry.filter((entry) => {
    return (
      entry.id.toLowerCase().includes(normalized) ||
      entry.name.toLowerCase().includes(normalized) ||
      entry.description.toLowerCase().includes(normalized) ||
      entry.aiHints.some((hint) => hint.toLowerCase().includes(normalized))
    );
  });
}

export function getComponentSpec(id: string): RegistryEntry | null {
  return registry.find((entry) => entry.id === id) ?? null;
}

export function getFreeTierComponents(): RegistryEntry[] {
  return registry.filter((entry) => entry.tier === "free");
}

export function getProTierComponents(): RegistryEntry[] {
  return registry.filter((entry) => entry.tier === "pro");
}

export function getTemplateCatalog(): RegistryEntry[] {
  return registry.filter((entry) => entry.category === "template");
}

export function getComponentTemplate(
  componentOrId: string | RegistryEntry,
  options: ComponentTemplateOptions = {}
): ComponentTemplate | null {
  const component = componentFromInput(componentOrId);
  if (!component) {
    return null;
  }

  const includeCoreDependency = options.includeCoreDependency ?? true;
  const dependencies = includeCoreDependency
    ? dedupe(["@zephyr/core", ...component.dependencies])
    : dedupe(component.dependencies);
  const manager = normalizedManager(options.packageManager);
  const installCommand = buildInstallCommand(dependencies, manager);
  const importSnippet = `import { ${component.name} } from "@zephyr/ui-react";`;
  const usageSnippet = component.usageExamples?.[0] ?? importSnippet;

  return {
    component,
    dependencies,
    installCommand,
    installSteps: [
      installCommand,
      importSnippet,
      "Ensure your app includes compiled Zephyr CSS variables from @zephyr/core."
    ],
    importSnippet,
    usageSnippet,
    defaultIntent: defaultIntent(component)
  };
}

export function getInstallSteps(id: string): string[] {
  const template = getComponentTemplate(id);
  if (!template) {
    return ["Component not found in registry."];
  }
  return template.installSteps;
}

export function getUsageExamples(id: string): string[] {
  return getComponentSpec(id)?.usageExamples ?? [];
}

export function getThemeVariants(id: string): string[] {
  return getComponentSpec(id)?.stylePackSupport ?? [];
}

export function getDefaultIntent(id: string): string {
  const component = getComponentSpec(id);
  if (!component) {
    return categoryIntent("atom");
  }
  return defaultIntent(component);
}

export function generateComponentPrompt(
  componentOrId: string | RegistryEntry,
  options: PromptGenerationOptions = {}
): string | null {
  const template = getComponentTemplate(componentOrId, options);
  if (!template) {
    return null;
  }

  const stylePack = options.stylePack ?? "Studio";
  const accentColor = options.accentColor ?? "#121212";
  const intent = options.intent?.trim() ? options.intent : template.defaultIntent;
  const includeCloudHint = options.includeCloudHint ?? true;

  const lines: string[] = [
    "Use Zephyr UI framework only. Do not replace components with external UI libraries.",
    ""
  ];

  if (options.assistant) {
    lines.push(`Assistant: ${options.assistant}`);
  }

  lines.push(
    `Theme: ${stylePack}`,
    `Accent color: ${accentColor}`,
    `Component block: ${template.component.name} (${template.component.id})`,
    `Install command: ${template.installCommand}`
  );

  if (options.configSnippet) {
    lines.push("", "Zephyr config:", options.configSnippet);
  }

  lines.push("", "Reference snippet:", template.usageSnippet, "", "Block intent:", intent);

  const keyProps = getComponentPropsTable(template.component).slice(0, 6);
  if (keyProps.length) {
    lines.push(
      "",
      "Key props:",
      ...keyProps.map((prop) => {
        const optional = prop.required ? "required" : "optional";
        const base = `- ${prop.name}: ${prop.type} (${optional})`;
        return prop.defaultValue !== "—" ? `${base}, default=${prop.defaultValue}` : base;
      })
    );
  }

  if (template.component.a11yNotes.length) {
    lines.push("", "A11y notes:", ...template.component.a11yNotes.map((note) => `- ${note}`));
  }

  if (template.component.aiHints.length) {
    lines.push("", "AI hints:", ...template.component.aiHints.map((hint) => `- ${hint}`));
  }

  lines.push("", "Keep accessibility notes and ship final React code that can be pasted directly.");

  if (includeCloudHint) {
    lines.push("If assets are needed, use Authorization: Bearer <ZEPHYR_API_KEY>.");
  }

  return lines.join("\n");
}

export function generateComponentScaffold(
  componentOrId: string | RegistryEntry,
  options: ScaffoldGenerationOptions = {}
): ComponentScaffold | null {
  const template = getComponentTemplate(componentOrId, options);
  if (!template) {
    return null;
  }

  const prompt = generateComponentPrompt(componentOrId, options);
  if (!prompt) {
    return null;
  }

  const includeHeader = options.snippetHeaderComment ?? true;
  const snippetContent = includeHeader
    ? [
      `// ${template.component.name}`,
      `// ${template.component.description}`,
      "",
      template.usageSnippet,
      ""
    ].join("\n")
    : `${template.usageSnippet}\n`;

  return {
    snippetFileName: `${template.component.id}.tsx`,
    promptFileName: `${template.component.id}.prompt.md`,
    snippetContent,
    promptContent: `${prompt}\n`,
    template
  };
}
