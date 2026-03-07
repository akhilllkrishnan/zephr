"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizePropDefinition = normalizePropDefinition;
exports.getComponentPropsTable = getComponentPropsTable;
exports.listComponents = listComponents;
exports.searchComponents = searchComponents;
exports.getComponentSpec = getComponentSpec;
exports.getFreeTierComponents = getFreeTierComponents;
exports.getProTierComponents = getProTierComponents;
exports.getTemplateCatalog = getTemplateCatalog;
exports.getComponentTemplate = getComponentTemplate;
exports.getInstallSteps = getInstallSteps;
exports.getUsageExamples = getUsageExamples;
exports.getThemeVariants = getThemeVariants;
exports.getDefaultIntent = getDefaultIntent;
exports.generateComponentPrompt = generateComponentPrompt;
exports.generateComponentScaffold = generateComponentScaffold;
const components_json_1 = __importDefault(require("./registry/components.json"));
function normalizeAiHints(componentName, hints) {
    const defaultImport = `import { ${componentName} } from "@zephrui/ui-react";`;
    if (Array.isArray(hints)) {
        return {
            positive: hints,
            negative: [
                "Do not fall back to raw HTML controls when the Zephr component exists."
            ],
            preferredImports: [defaultImport]
        };
    }
    return {
        positive: hints.positive ?? [],
        negative: hints.negative ?? [
            "Do not fall back to raw HTML controls when the Zephr component exists."
        ],
        preferredImports: hints.preferredImports?.length ? hints.preferredImports : [defaultImport]
    };
}
const registry = components_json_1.default.map((entry) => ({
    ...entry,
    tier: entry.tier ?? "free",
    aiHints: normalizeAiHints(entry.name, entry.aiHints)
}));
function normalizedManager(value) {
    if (!value) {
        return "pnpm";
    }
    return value;
}
function componentFromInput(componentOrId) {
    if (typeof componentOrId === "string") {
        return getComponentSpec(componentOrId);
    }
    return componentOrId;
}
function dedupe(values) {
    return Array.from(new Set(values));
}
function humanizePropName(name) {
    return name
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
        .replace(/[_-]+/g, " ")
        .trim()
        .toLowerCase();
}
function stringifyDefaultValue(value) {
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
    }
    catch {
        return String(value);
    }
}
function normalizePropDefinition(name, definition) {
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
function getComponentPropsTable(componentOrId) {
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
function buildInstallCommand(dependencies, packageManager) {
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
function categoryIntent(category) {
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
            return "Use this Zephr page template as a drop-in starting point. Wire props to real data, customize sections, and extend layout as needed.";
        default:
            return "Create a production-ready UI block with strong accessibility and responsive behavior.";
    }
}
function defaultIntent(entry) {
    if (entry.aiHints.positive.length > 0) {
        return `${categoryIntent(entry.category)} ${entry.aiHints.positive[0]}`;
    }
    return categoryIntent(entry.category);
}
function listComponents() {
    return [...registry];
}
function searchComponents(query) {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
        return listComponents();
    }
    return registry.filter((entry) => {
        return (entry.id.toLowerCase().includes(normalized) ||
            entry.name.toLowerCase().includes(normalized) ||
            entry.description.toLowerCase().includes(normalized) ||
            entry.aiHints.positive.some((hint) => hint.toLowerCase().includes(normalized)) ||
            entry.aiHints.negative.some((hint) => hint.toLowerCase().includes(normalized)));
    });
}
function getComponentSpec(id) {
    return registry.find((entry) => entry.id === id) ?? null;
}
function getFreeTierComponents() {
    return registry.filter((entry) => entry.tier === "free");
}
function getProTierComponents() {
    return registry.filter((entry) => entry.tier === "pro");
}
function getTemplateCatalog() {
    return registry.filter((entry) => entry.category === "template");
}
function getComponentTemplate(componentOrId, options = {}) {
    const component = componentFromInput(componentOrId);
    if (!component) {
        return null;
    }
    const includeCoreDependency = options.includeCoreDependency ?? true;
    const dependencies = includeCoreDependency
        ? dedupe(["@zephrui/core", ...component.dependencies])
        : dedupe(component.dependencies);
    const manager = normalizedManager(options.packageManager);
    const installCommand = buildInstallCommand(dependencies, manager);
    const importSnippet = `import { ${component.name} } from "@zephrui/ui-react";`;
    const usageSnippet = component.usageExamples?.[0] ?? importSnippet;
    return {
        component,
        dependencies,
        installCommand,
        installSteps: [
            installCommand,
            importSnippet,
            "Ensure your app includes compiled Zephr CSS variables from @zephrui/core."
        ],
        importSnippet,
        usageSnippet,
        defaultIntent: defaultIntent(component)
    };
}
function getInstallSteps(id) {
    const template = getComponentTemplate(id);
    if (!template) {
        return ["Component not found in registry."];
    }
    return template.installSteps;
}
function getUsageExamples(id) {
    return getComponentSpec(id)?.usageExamples ?? [];
}
function getThemeVariants(id) {
    return getComponentSpec(id)?.stylePackSupport ?? [];
}
function getDefaultIntent(id) {
    const component = getComponentSpec(id);
    if (!component) {
        return categoryIntent("atom");
    }
    return defaultIntent(component);
}
function generateComponentPrompt(componentOrId, options = {}) {
    const template = getComponentTemplate(componentOrId, options);
    if (!template) {
        return null;
    }
    const stylePack = options.stylePack ?? "notion";
    const accentColor = options.accentColor ?? "#121212";
    const intent = options.intent?.trim() ? options.intent : template.defaultIntent;
    // Only include cloud hint for asset-library components
    const isAssetComponent = ["icon-library", "avatar-library", "logo-library"].includes(template.component.id);
    const includeCloudHint = options.includeCloudHint ?? isAssetComponent;
    const lines = [
        "Use Zephr UI framework only. Do not replace components with external UI libraries.",
        ""
    ];
    if (options.assistant) {
        lines.push(`Assistant: ${options.assistant}`);
    }
    lines.push(`Theme: ${stylePack}`, `Accent color: ${accentColor}`, `Component block: ${template.component.name} (${template.component.id})`, `Install command: ${template.installCommand}  # Note: @zephrui/ui-react is in private beta — not yet on npm`);
    if (options.configSnippet) {
        lines.push("", "Zephr config:", options.configSnippet);
    }
    lines.push("", "Reference snippet:", template.usageSnippet, "", "Block intent:", intent);
    const keyProps = getComponentPropsTable(template.component).slice(0, 6);
    if (keyProps.length) {
        lines.push("", "Key props:", ...keyProps.map((prop) => {
            const optional = prop.required ? "required" : "optional";
            // Use accepted values for enum props so AI knows the exact allowed values
            const typeDisplay = prop.acceptedValues && prop.acceptedValues !== "Any valid value"
                ? prop.acceptedValues.split(", ").join(" | ")
                : prop.type;
            const base = `- ${prop.name}: ${typeDisplay} (${optional})`;
            return prop.defaultValue !== "—" ? `${base}, default=${prop.defaultValue}` : base;
        }));
    }
    if (template.component.a11yNotes.length) {
        lines.push("", "A11y notes:", ...template.component.a11yNotes.map((note) => `- ${note}`));
    }
    if (template.component.aiHints.preferredImports.length) {
        lines.push("", "Preferred imports:", ...template.component.aiHints.preferredImports.map((hint) => `- ${hint}`));
    }
    if (template.component.aiHints.positive.length) {
        lines.push("", "AI hints (do):", ...template.component.aiHints.positive.map((hint) => `- ${hint}`));
    }
    if (template.component.aiHints.negative.length) {
        lines.push("", "AI hints (avoid):", ...template.component.aiHints.negative.map((hint) => `- ${hint}`));
    }
    lines.push("", "Keep accessibility notes and ship final React code that can be pasted directly.");
    if (includeCloudHint) {
        lines.push("If assets are needed, use Authorization: Bearer <ZEPHR_API_KEY>.");
    }
    return lines.join("\n");
}
function generateComponentScaffold(componentOrId, options = {}) {
    const template = getComponentTemplate(componentOrId, options);
    if (!template) {
        return null;
    }
    const prompt = generateComponentPrompt(componentOrId, options);
    if (!prompt) {
        return null;
    }
    const includeHeader = options.snippetHeaderComment ?? true;
    validateZephrSnippet(template.usageSnippet);
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
function validateZephrSnippet(snippet) {
    const forbiddenRawControls = /<(button|input|select|textarea)\b/i;
    const containsZephrComponent = /<([A-Z][A-Za-z0-9]*)\b/.test(snippet);
    if (forbiddenRawControls.test(snippet) && !containsZephrComponent) {
        throw new Error("Registry snippet validation failed: raw HTML control found where a Zephr component should be used.");
    }
}
//# sourceMappingURL=index.js.map