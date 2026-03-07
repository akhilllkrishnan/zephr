export type ComponentCategory = "foundation" | "atom" | "molecule" | "organism" | "template";
export type ComponentTier = "free" | "pro";
export type AssistantTool = "Codex" | "Claude" | "Cursor";
export type PackageManager = "pnpm" | "npm" | "yarn" | "bun";
export type RegistryStylePackName = "notion" | "stripe" | "linear" | "framer";
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
export interface RegistryAiHints {
    positive: string[];
    negative: string[];
    preferredImports: string[];
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
    stylePackSupport: RegistryStylePackName[];
    aiHints: RegistryAiHints;
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
export declare function normalizePropDefinition(name: string, definition: RegistryPropDefinition): StructuredPropSchema;
export declare function getComponentPropsTable(componentOrId: string | RegistryEntry): RegistryPropRow[];
export declare function listComponents(): RegistryEntry[];
export declare function searchComponents(query: string): RegistryEntry[];
export declare function getComponentSpec(id: string): RegistryEntry | null;
export declare function getFreeTierComponents(): RegistryEntry[];
export declare function getProTierComponents(): RegistryEntry[];
export declare function getTemplateCatalog(): RegistryEntry[];
export declare function getComponentTemplate(componentOrId: string | RegistryEntry, options?: ComponentTemplateOptions): ComponentTemplate | null;
export declare function getInstallSteps(id: string): string[];
export declare function getUsageExamples(id: string): string[];
export declare function getThemeVariants(id: string): string[];
export declare function getDefaultIntent(id: string): string;
export declare function generateComponentPrompt(componentOrId: string | RegistryEntry, options?: PromptGenerationOptions): string | null;
export declare function generateComponentScaffold(componentOrId: string | RegistryEntry, options?: ScaffoldGenerationOptions): ComponentScaffold | null;
