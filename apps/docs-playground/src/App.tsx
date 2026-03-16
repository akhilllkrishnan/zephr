import { CSSProperties, FormEvent, ReactNode, Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";
import {
  Accordion,
  Alert,
  AlertDialog,
  AuthPage,
  Avatar,
  Badge,
  Box,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Card,
  Checkbox,
  ColorPicker,
  ComboBox,
  CommandBar,
  DashboardPage,
  DataTable,
  DatePicker,
  Divider,
  Dropdown,
  FiltersBar,
  FormField,
  Grid,
  Header,
  IconButton,
  Input,
  InputGroup,
  LayoutShell,
  Logo,
  MarketingPage,
  ModalDialog,
  Navbar,
  NumberInput,
  OnboardingPage,
  Pagination,
  Popover,
  Progress,
  Radio,
  RichEditor,
  SearchBox,
  SearchResultsPanel,
  Select,
  SettingsPage,
  Sheet,
  SidebarNav,
  Skeleton,
  Slider,
  Spacer,
  Stack,
  Switch,
  TagInput,
  Tabs,
  Toast,
  Tooltip,
  Textarea,
  IconLibrary,
  AvatarLibrary,
  LogoLibrary
} from "@zephrui/ui-react";
import {
  generateCssVariables,
  stylePacks,
  type DesignTokens,
  type StylePackName
} from "@zephrui/core/browser";
import {
  generateComponentPrompt,
  getComponentPropsTable,
  getComponentTemplate,
  getDefaultIntent,
  type RegistryEntry
} from "@zephrui/ai-registry";
import registryData from "@zephrui/ai-registry/registry/components.json";
import { ZephrCloudClient } from "@zephrui/cloud-sdk";
import type { AvatarStyleDefinition } from "@zephrui/avatars";
import type { MaterialIconDefinition, MaterialIconStyle } from "@zephrui/icons-material";
import type { LogoCatalogEntry } from "@zephrui/logos";
import zephrLogoDark from "../../../logo/zephr-dark.png";
import zephrLogoLight from "../../../logo/zephr-light.png";
import { widgetCatalogMeta, widgetsV2CatalogIds } from "./views/widgetsCatalog";
import { templateCatalogMeta, templatesV2CatalogIds } from "./views/templatesCatalog";
// Theme CSS is injected dynamically via <style> tag — no static import needed

const registry = registryData as unknown as RegistryEntry[];
const DEFAULT_STYLE_PACK: StylePackName = "notion";
const WidgetsPage = lazy(() => import("./views/WidgetsPage"));
const TemplatesPage = lazy(() => import("./views/TemplatesPage"));

type WorkspaceView =
  "introduction" |
  "getting-started" |
  "speed-insights" |
  "foundations" |
  "mission" |
  "team" |
  "component-gallery" |
  "components" |
  "api-reference" |
  "widgets" |
  "templates";
type TopTab = "setup" | "components" | "pages" | "changelog";
type ShowcaseVersion = "v1" | "v2";

interface SearchResultItem {
  id: string;
  kind: "doc" | "component";
  label: string;
  detail: string;
  tab: TopTab;
  view: WorkspaceView;
  anchor?: string;
  componentId?: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  squad: string;
}

type AiToolKey = "codex" | "claude" | "cursor";
type AiProjectPreset = "vite-react" | "nextjs";
type AiPackageManager = "npm" | "pnpm" | "yarn" | "bun";
type CloudAssetSource = "local" | "cloud" | "fallback";
type ButtonGroupQuantityOption = 2 | 3 | 4 | 5 | 6;
type ButtonGroupSizeOption = "sm" | "xs" | "2xs";
type PreviewStateKey =
  "default" |
  "hover" |
  "pressed" |
  "loading" |
  "disabled" |
  "filled" |
  "error" |
  "success" |
  "warning" |
  "empty" |
  "open";

type AlertSeverityOption = "red" | "yellow" | "green" | "blue" | "grey";
type AlertSizeOption = "small" | "wide" | "toast";
type AlertStyleOption = "solid" | "light" | "stroke";
type AccordionStateOption = "default" | "hover" | "active";
type TooltipTypeOption =
  "top-left" |
  "top-center" |
  "top-right" |
  "bottom-left" |
  "bottom-center" |
  "bottom-right" |
  "right" |
  "left";
type TooltipSizeOption = "2xs" | "xs" | "large";
type TooltipToneOption = "light" | "dark";
type SwitchPatternOption = "switch" | "switch-label" | "switch-card";
type SwitchStateOption = "default" | "hover" | "pressed" | "disabled";
type SwitchCardTypeOption = "basic" | "left-icon" | "avatar";
type DividerOrientationOption = "horizontal" | "vertical";
type DividerStrokeOption = "solid" | "dashed" | "dotted";
type DividerLabelOption = "none" | "text" | "chip";
type DividerInsetOption = "none" | "sm" | "md";
type DatePickerModeOption = "single" | "range";
type ColorPickerFormatOption = "hex" | "rgb" | "hsl";
type PaginationTypeOption = "basic" | "group" | "full-radius";
type ProgressVariantOption = "line" | "line-label" | "circle";
type ProgressToneOption = "primary" | "success" | "danger" | "warning" | "neutral";
type ProgressLineSizeOption = "sm" | "md" | "lg";
type ProgressCircleSizeOption = 48 | 56 | 64 | 72 | 80;
type ProgressLabelPlacementOption = "top" | "right";
type RichEditorVariantOption = "01" | "02" | "03" | "04";
type BadgeTypeOption = "basic" | "dot" | "left-icon" | "right-icon";
type BadgeStyleOption = "filled" | "lighter" | "stroke" | "white";
type BadgeColorOption =
  | "gray"
  | "blue"
  | "orange"
  | "red"
  | "green"
  | "yellow"
  | "purple"
  | "sky"
  | "pink"
  | "teal";
type SurfaceStyleOption = "shadow" | "flat";
interface CloudAssetState {
  source: CloudAssetSource;
  loading: boolean;
  message: string;
}

const tableRows: TeamMember[] = [
  { id: "1", name: "Akhil Krishnan", role: "Product Designer", squad: "Core" },
  { id: "2", name: "Maya Carter", role: "Frontend Engineer", squad: "Platform" },
  { id: "3", name: "Noah Kim", role: "Design Systems", squad: "Identity" },
  { id: "4", name: "Liam Torres", role: "Product Manager", squad: "Growth" },
  { id: "5", name: "Ivy Singh", role: "Developer Advocate", squad: "Community" }
];

const accentPresets = [
  "#121212",
  "#47c2ff",
  "#7d52f4",
  "#f6b51e",
  "#fa7319",
  "#1fc16b",
  "#111827"
];

const colorTokenGroups: Array<{
  id: string;
  label: string;
  description: string;
  tokens: string[];
}> = [
    {
      id: "static",
      label: "Static",
      description: "Constant values used for hard contrast and fixed tones.",
      tokens: ["staticBlack", "staticWhite"]
    },
    {
      id: "background",
      label: "Background",
      description: "Canvas and surface layers used for page scaffolding.",
      tokens: [
        "background950",
        "background800",
        "background600",
        "background400",
        "background200",
        "background100",
        "background0"
      ]
    },
    {
      id: "text",
      label: "Text",
      description: "Readable foreground values for content and hierarchy.",
      tokens: ["text950", "text700", "text500", "text300"]
    },
    {
      id: "stroke",
      label: "Stroke",
      description: "Borders, dividers, and structural outlines.",
      tokens: ["stroke400", "stroke300", "stroke200", "stroke100"]
    },
    {
      id: "accent",
      label: "Accent",
      description: "Brand/action colors and feature highlights.",
      tokens: ["accent900", "accent700", "accent500", "accent300"]
    },
    {
      id: "semantic",
      label: "Semantic",
      description: "Status and feedback colors for system messaging.",
      tokens: [
        "semanticRed900",
        "semanticRed700",
        "semanticRed500",
        "semanticRed300",
        "semanticYellow900",
        "semanticYellow700",
        "semanticYellow500",
        "semanticYellow300",
        "semanticGreen900",
        "semanticGreen700",
        "semanticGreen500",
        "semanticGreen300"
      ]
    }
  ];

const typographyGroups: Array<{
  id: string;
  label: string;
  description: string;
  rows: Array<{
    token: string;
    label: string;
    size: string;
    weightValue: string;
    weightLabel: "Medium" | "Regular";
    family: "inter" | "monaco";
    previewTitle: string;
    previewLine: string;
    caps?: boolean;
    letterSpacing?: string;
  }>;
}> = [
    {
      id: "heading",
      label: "Heading",
      description: "H1 to H6 heading hierarchy.",
      rows: [
        { token: "heading-h1", label: "H1", size: "3rem", weightValue: "500", weightLabel: "Medium", family: "inter", previewTitle: "Design system foundations", previewLine: "Build consistent interfaces at scale" },
        { token: "heading-h2", label: "H2", size: "2.5rem", weightValue: "500", weightLabel: "Medium", family: "inter", previewTitle: "Design system foundations", previewLine: "Build consistent interfaces at scale" },
        { token: "heading-h3", label: "H3", size: "2rem", weightValue: "500", weightLabel: "Medium", family: "inter", previewTitle: "Design system foundations", previewLine: "Build consistent interfaces at scale" },
        { token: "heading-h4", label: "H4", size: "1.5rem", weightValue: "500", weightLabel: "Medium", family: "inter", previewTitle: "Design system foundations", previewLine: "Build consistent interfaces at scale" },
        { token: "heading-h5", label: "H5", size: "1.25rem", weightValue: "500", weightLabel: "Medium", family: "inter", previewTitle: "Design system foundations", previewLine: "Build consistent interfaces at scale" },
        { token: "heading-h6", label: "H6", size: "1.125rem", weightValue: "500", weightLabel: "Medium", family: "inter", previewTitle: "Design system foundations", previewLine: "Build consistent interfaces at scale" }
      ]
    },
    {
      id: "title",
      label: "Titles",
      description: "Title scale from XL to XS.",
      rows: [
        { token: "title-xl", label: "XL", size: "1.5rem", weightValue: "500", weightLabel: "Medium", family: "inter", previewTitle: "Workspace settings", previewLine: "Manage profile, team, and billing" },
        { token: "title-lg", label: "LG", size: "1.25rem", weightValue: "500", weightLabel: "Medium", family: "inter", previewTitle: "Workspace settings", previewLine: "Manage profile, team, and billing" },
        { token: "title-md", label: "MD", size: "1.125rem", weightValue: "500", weightLabel: "Medium", family: "inter", previewTitle: "Workspace settings", previewLine: "Manage profile, team, and billing" },
        { token: "title-sm", label: "SM", size: "1rem", weightValue: "500", weightLabel: "Medium", family: "inter", previewTitle: "Workspace settings", previewLine: "Manage profile, team, and billing" },
        { token: "title-xs", label: "XS", size: "0.875rem", weightValue: "500", weightLabel: "Medium", family: "inter", previewTitle: "Workspace settings", previewLine: "Manage profile, team, and billing" }
      ]
    },
    {
      id: "body",
      label: "Body",
      description: "Body text scale from XL to XS.",
      rows: [
        { token: "body-xl", label: "XL", size: "1.25rem", weightValue: "400", weightLabel: "Regular", family: "inter", previewTitle: "Product update", previewLine: "New filters are now available" },
        { token: "body-lg", label: "LG", size: "1.125rem", weightValue: "400", weightLabel: "Regular", family: "inter", previewTitle: "Product update", previewLine: "New filters are now available" },
        { token: "body-md", label: "MD", size: "1rem", weightValue: "400", weightLabel: "Regular", family: "inter", previewTitle: "Product update", previewLine: "New filters are now available" },
        { token: "body-sm", label: "SM", size: "0.875rem", weightValue: "400", weightLabel: "Regular", family: "inter", previewTitle: "Product update", previewLine: "New filters are now available" },
        { token: "body-xs", label: "XS", size: "0.75rem", weightValue: "400", weightLabel: "Regular", family: "inter", previewTitle: "Product update", previewLine: "New filters are now available" }
      ]
    },
    {
      id: "mono",
      label: "Mono",
      description: "Monospace scale from XL to XS.",
      rows: [
        { token: "mono-xl", label: "XL", size: "1.25rem", weightValue: "500", weightLabel: "Medium", family: "monaco", previewTitle: "npm run build", previewLine: "Compiled in 1.4 seconds" },
        { token: "mono-lg", label: "LG", size: "1.125rem", weightValue: "500", weightLabel: "Medium", family: "monaco", previewTitle: "npm run build", previewLine: "Compiled in 1.4 seconds" },
        { token: "mono-md", label: "MD", size: "1rem", weightValue: "500", weightLabel: "Medium", family: "monaco", previewTitle: "npm run build", previewLine: "Compiled in 1.4 seconds" },
        { token: "mono-sm", label: "SM", size: "0.875rem", weightValue: "500", weightLabel: "Medium", family: "monaco", previewTitle: "npm run build", previewLine: "Compiled in 1.4 seconds" },
        { token: "mono-xs", label: "XS", size: "0.75rem", weightValue: "500", weightLabel: "Medium", family: "monaco", previewTitle: "npm run build", previewLine: "Compiled in 1.4 seconds" }
      ]
    },
    {
      id: "label",
      label: "Labels",
      description: "Label scale from XL to XS (full caps).",
      rows: [
        { token: "label-xl", label: "XL", size: "1rem", weightValue: "500", weightLabel: "Medium", family: "inter", previewTitle: "Primary action", previewLine: "Status and metadata label", caps: true, letterSpacing: "0.08em" },
        { token: "label-lg", label: "LG", size: "0.875rem", weightValue: "500", weightLabel: "Medium", family: "inter", previewTitle: "Primary action", previewLine: "Status and metadata label", caps: true, letterSpacing: "0.08em" },
        { token: "label-md", label: "MD", size: "0.8125rem", weightValue: "500", weightLabel: "Medium", family: "inter", previewTitle: "Primary action", previewLine: "Status and metadata label", caps: true, letterSpacing: "0.08em" },
        { token: "label-sm", label: "SM", size: "0.75rem", weightValue: "500", weightLabel: "Medium", family: "inter", previewTitle: "Primary action", previewLine: "Status and metadata label", caps: true, letterSpacing: "0.08em" },
        { token: "label-xs", label: "XS", size: "0.6875rem", weightValue: "500", weightLabel: "Medium", family: "inter", previewTitle: "Primary action", previewLine: "Status and metadata label", caps: true, letterSpacing: "0.08em" }
      ]
    }
  ];

const aiToolLabels: Record<AiToolKey, string> = {
  codex: "Codex",
  claude: "Claude Code",
  cursor: "Cursor"
};

const aiProjectLabels: Record<AiProjectPreset, string> = {
  "vite-react": "Vite + React",
  nextjs: "Next.js"
};

const previewStateConfig: Partial<Record<string, { label: string; options: { value: PreviewStateKey; label: string }[] }>> = {
  input: {
    label: "Input state",
    options: [
      { value: "default", label: "Default" },
      { value: "filled", label: "Filled" },
      { value: "error", label: "Error" },
      { value: "disabled", label: "Disabled" }
    ]
  },
  accordion: {
    label: "Accordion state",
    options: [
      { value: "open", label: "First section open" },
      { value: "filled", label: "Second section open" },
      { value: "default", label: "All closed" }
    ]
  },
  alert: {
    label: "Alert state",
    options: [
      { value: "error", label: "Error" },
      { value: "success", label: "Success" },
      { value: "warning", label: "Warning" },
      { value: "default", label: "Info" }
    ]
  },
  toast: {
    label: "Toast state",
    options: [
      { value: "success", label: "Success" },
      { value: "warning", label: "Warning" },
      { value: "default", label: "Info" }
    ]
  },
  "data-table": {
    label: "Table state",
    options: [
      { value: "default", label: "With rows" },
      { value: "loading", label: "Loading" },
      { value: "empty", label: "Empty" }
    ]
  },
  "search-results-panel": {
    label: "Search state",
    options: [
      { value: "default", label: "With results" },
      { value: "loading", label: "Loading" },
      { value: "empty", label: "Empty" }
    ]
  }
};

function defaultCloudAssetState(message = "Using local asset catalog."): CloudAssetState {
  return {
    source: "local",
    loading: false,
    message
  };
}

function parseCloudError(feature: "icons" | "avatars" | "logos", error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);
  if (message.includes("429")) {
    return `Cloud ${feature} rate limit reached. Falling back to local catalog.`;
  }
  if (message.includes("401")) {
    return `Cloud API key is invalid or missing for ${feature}. Using local catalog.`;
  }
  if (message.toLowerCase().includes("failed to fetch") || message.toLowerCase().includes("network")) {
    return `Cloud ${feature} service is unreachable. Using local catalog.`;
  }
  return `Cloud ${feature} unavailable. Using local catalog.`;
}

function managerInstallCommand(manager: AiPackageManager, dependencies: string[]): string {
  const joined = dependencies.join(" ");
  if (manager === "npm") return `npm install ${joined}`;
  if (manager === "yarn") return `yarn add ${joined}`;
  if (manager === "bun") return `bun add ${joined}`;
  return `pnpm add ${joined}`;
}

function managerProjectInitCommand(project: AiProjectPreset, manager: AiPackageManager): string {
  if (project === "nextjs") {
    if (manager === "npm") return "npx create-next-app@latest my-app --ts";
    if (manager === "pnpm") return "pnpm create next-app@latest my-app --ts";
    if (manager === "yarn") return "yarn create next-app my-app --ts";
    return "bunx create-next-app@latest my-app --ts";
  }

  if (manager === "npm") return "npm create vite@latest my-app -- --template react-ts";
  if (manager === "pnpm") return "pnpm create vite my-app --template react-ts";
  if (manager === "yarn") return "yarn create vite my-app --template react-ts";
  return "bun create vite my-app --template react-ts";
}

function aiContextFile(tool: AiToolKey): string {
  if (tool === "claude") {
    return "CLAUDE.md";
  }
  if (tool === "cursor") {
    return ".cursor/rules/zephr.mdc";
  }
  return "AGENTS.md";
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
  const hex = normalizeHexColor(backgroundHex) ?? "#121212";
  const channels = hex
    .slice(1)
    .match(/.{2}/g)
    ?.map((part) => Number.parseInt(part, 16) / 255) ?? [0.145, 0.388, 0.922];
  const [r, g, b] = channels.map((channel) =>
    channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  );
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.45 ? "#111827" : "#ffffff";
}

function clampChannel(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function hexToRgb(hex: string): [number, number, number] | null {
  const normalized = normalizeHexColor(hex);
  if (!normalized) {
    return null;
  }

  const [r, g, b] = normalized
    .slice(1)
    .match(/.{2}/g)!
    .map((part) => Number.parseInt(part, 16));
  return [r, g, b];
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${clampChannel(r).toString(16).padStart(2, "0")}${clampChannel(g).toString(16).padStart(2, "0")}${clampChannel(b).toString(16).padStart(2, "0")}`;
}

function mixHex(colorA: string, colorB: string, ratio: number): string {
  const a = hexToRgb(colorA) ?? [0, 0, 0];
  const b = hexToRgb(colorB) ?? [255, 255, 255];
  const t = Math.max(0, Math.min(1, ratio));
  return rgbToHex(
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t
  );
}

function ensureHex(value: string | undefined, fallback: string): string {
  return normalizeHexColor(value) ?? fallback;
}

function buildToneScale(baseColor: string): [string, string, string, string] {
  const base = ensureHex(baseColor, "#121212");
  return [
    mixHex(base, "#000000", 0.2),
    mixHex(base, "#000000", 0.08),
    base,
    mixHex(base, "#ffffff", 0.3)
  ];
}

function buildExpandedColorPalettes(stylePack: StylePackName, accentColor: string): {
  light: Record<string, string>;
  dark: Record<string, string>;
} {
  const lightBase = stylePacks[stylePack].color as Record<string, string>;
  const darkBase = (stylePacks[stylePack].colorDark ?? {}) as Record<string, string>;

  const lightBlack = ensureHex(lightBase.strong ?? lightBase.text, "#171717");
  const lightWhite = ensureHex(lightBase.white ?? lightBase.surface, "#ffffff");
  const darkBlack = ensureHex(darkBase.background, "#111111");
  const darkWhite = ensureHex(darkBase.text ?? lightBase.text, "#f5f5f5");

  const bgStops = [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1];
  const textStops = [0, 0.28, 0.55, 0.82];
  const strokeStops = [0, 0.3, 0.6, 0.88];

  const backgroundLight = bgStops.map((stop) => mixHex(lightBlack, lightWhite, stop));
  const backgroundDarkRaw = bgStops.map((stop) => mixHex(darkBlack, darkWhite, stop));
  const textLight = textStops.map((stop) => mixHex(lightBlack, lightWhite, stop));
  const textDarkRaw = textStops.map((stop) => mixHex(darkBlack, darkWhite, stop));

  const strokeStartLight = mixHex(lightBlack, lightWhite, 0.72);
  const strokeStartDark = mixHex(darkBlack, darkWhite, 0.55);
  const strokeLight = strokeStops.map((stop) => mixHex(strokeStartLight, lightWhite, stop));
  const strokeDarkRaw = strokeStops.map((stop) => mixHex(strokeStartDark, darkWhite, stop));

  const accentScaleLight = buildToneScale(accentColor);
  const accentScaleDarkRaw = buildToneScale(ensureHex(darkBase.accent ?? accentColor, accentColor));

  const redScaleLight = buildToneScale(lightBase.danger ?? "#ef4444");
  const yellowScaleLight = buildToneScale(lightBase.warning ?? lightBase.accent ?? "#f59e0b");
  const greenScaleLight = buildToneScale(lightBase.success ?? "#16a34a");
  const redScaleDarkRaw = buildToneScale(darkBase.danger ?? lightBase.danger ?? "#f87171");
  const yellowScaleDarkRaw = buildToneScale(darkBase.warning ?? darkBase.accent ?? lightBase.warning ?? "#fbbf24");
  const greenScaleDarkRaw = buildToneScale(darkBase.success ?? lightBase.success ?? "#4ade80");

  // Dark mode columns show the alternative token value when the theme switches.
  // We invert the shade order by family so a "strong" light tone maps to the
  // corresponding readable alternative in dark mode.
  const backgroundDark = [...backgroundDarkRaw].reverse();
  const textDark = [...textDarkRaw].reverse();
  const strokeDark = [...strokeDarkRaw].reverse();
  const accentScaleDark = [...accentScaleDarkRaw].reverse() as [string, string, string, string];
  const redScaleDark = [...redScaleDarkRaw].reverse() as [string, string, string, string];
  const yellowScaleDark = [...yellowScaleDarkRaw].reverse() as [string, string, string, string];
  const greenScaleDark = [...greenScaleDarkRaw].reverse() as [string, string, string, string];

  const expandedLight: Record<string, string> = {
    ...lightBase,
    staticBlack: "#111111",
    staticWhite: "#ffffff",
    accent900: accentScaleLight[0],
    accent700: accentScaleLight[1],
    accent500: accentScaleLight[2],
    accent300: accentScaleLight[3],
    semanticRed900: redScaleLight[0],
    semanticRed700: redScaleLight[1],
    semanticRed500: redScaleLight[2],
    semanticRed300: redScaleLight[3],
    semanticYellow900: yellowScaleLight[0],
    semanticYellow700: yellowScaleLight[1],
    semanticYellow500: yellowScaleLight[2],
    semanticYellow300: yellowScaleLight[3],
    semanticGreen900: greenScaleLight[0],
    semanticGreen700: greenScaleLight[1],
    semanticGreen500: greenScaleLight[2],
    semanticGreen300: greenScaleLight[3]
  };

  const expandedDark: Record<string, string> = {
    ...darkBase,
    staticBlack: "#111111",
    staticWhite: "#ffffff",
    accent900: accentScaleDark[0],
    accent700: accentScaleDark[1],
    accent500: accentScaleDark[2],
    accent300: accentScaleDark[3],
    semanticRed900: redScaleDark[0],
    semanticRed700: redScaleDark[1],
    semanticRed500: redScaleDark[2],
    semanticRed300: redScaleDark[3],
    semanticYellow900: yellowScaleDark[0],
    semanticYellow700: yellowScaleDark[1],
    semanticYellow500: yellowScaleDark[2],
    semanticYellow300: yellowScaleDark[3],
    semanticGreen900: greenScaleDark[0],
    semanticGreen700: greenScaleDark[1],
    semanticGreen500: greenScaleDark[2],
    semanticGreen300: greenScaleDark[3]
  };

  return {
    light: expandedLight,
    dark: expandedDark
  };
}

function defaultAccentForPack(stylePack: StylePackName): string {
  return stylePacks[stylePack]?.color.primary ?? "#121212";
}

function migrateLegacyAccent(stylePack: StylePackName, accentColor: string | null): string {
  const defaultAccent = defaultAccentForPack(stylePack);
  if (!accentColor) {
    return defaultAccent;
  }

  const legacyDefaults: Partial<Record<StylePackName, string[]>> = {
    notion: ["#335cff", "#4d75ff", "#2563eb"]
  };

  if ((legacyDefaults[stylePack] ?? []).includes(accentColor)) {
    return defaultAccent;
  }

  return accentColor;
}

function scopeThemeCssToPreviewSurface(css: string): string {
  return css
    .replace(/:root\s*\{/g, ".preview-theme-scope{")
    .replace(
      /\[data-theme="dark"\]\s*\{/g,
      "[data-theme=\"dark\"] .preview-theme-scope,.preview-theme-scope[data-theme=\"dark\"],.preview-theme-scope [data-theme=\"dark\"]{"
    )
    .replace(/@media \(prefers-color-scheme:dark\)\{:root:not\(\[data-theme="light"\]\)\{[^}]*\}\}/g, "");
}

function buildPreviewThemeCss(
  stylePack: StylePackName,
  accentColor: string,
  surfaceStyle: SurfaceStyleOption,
  expandedPalettes: { light: Record<string, string>; dark: Record<string, string> }
): string {
  const contrast = accentTextColor(accentColor);
  const baseTokens = stylePacks[stylePack];
  const light = expandedPalettes.light;
  const dark = expandedPalettes.dark;
  const darkBase = baseTokens.colorDark ?? baseTokens.color;

  const themedTokens: DesignTokens = {
    ...baseTokens,
    color: {
      ...baseTokens.color,
      ...light,
      primary: accentColor,
      accent: accentColor,
      primaryContrast: contrast,
      info: light.accent500,
      "info-light": light.accent300,
      verified: light.accent500,
      feature: light.accent900
    },
    colorDark: {
      ...darkBase,
      ...dark,
      primary: accentColor,
      accent: accentColor,
      primaryContrast: contrast,
      info: dark.accent500,
      "info-light": dark.accent300,
      verified: dark.accent500,
      feature: dark.accent900
    },
    shadow:
      surfaceStyle === "flat"
        ? {
            ...baseTokens.shadow,
            sm: "none",
            md: "none",
            lg: "none"
          }
        : baseTokens.shadow
  };

  return scopeThemeCssToPreviewSurface(generateCssVariables(themedTokens, "z"));
}

function buildGlobalThemeCss(
  stylePack: StylePackName,
  accentColor: string,
  surfaceStyle: SurfaceStyleOption,
  expandedPalettes: { light: Record<string, string>; dark: Record<string, string> }
): string {
  const contrast = accentTextColor(accentColor);
  const baseTokens = stylePacks[stylePack];
  const light = expandedPalettes.light;
  const dark = expandedPalettes.dark;
  const darkBase = baseTokens.colorDark ?? baseTokens.color;

  const themedTokens: DesignTokens = {
    ...baseTokens,
    color: {
      ...baseTokens.color,
      ...light,
      primary: accentColor,
      accent: accentColor,
      primaryContrast: contrast,
      info: light.accent500,
      "info-light": light.accent300,
      verified: light.accent500,
      feature: light.accent900
    },
    colorDark: {
      ...darkBase,
      ...dark,
      primary: accentColor,
      accent: accentColor,
      primaryContrast: contrast,
      info: dark.accent500,
      "info-light": dark.accent300,
      verified: dark.accent500,
      feature: dark.accent900
    },
    shadow:
      surfaceStyle === "flat"
        ? {
            ...baseTokens.shadow,
            sm: "none",
            md: "none",
            lg: "none"
          }
        : baseTokens.shadow
  };

  return generateCssVariables(themedTokens, "z");
}

function fromSearchParams(): {
  stylePack: StylePackName;
  componentId: string;
  accentColor: string;
  view: WorkspaceView;
  showcaseVersion: ShowcaseVersion;
} {
  if (typeof window === "undefined") {
    return {
      stylePack: DEFAULT_STYLE_PACK,
      componentId: "button",
      accentColor: defaultAccentForPack(DEFAULT_STYLE_PACK),
      view: "component-gallery",
      showcaseVersion: "v1"
    };
  }

  const params = new URLSearchParams(window.location.search);
  const componentId = params.get("component") ?? "button";
  const storedAccent = normalizeHexColor(sessionStorage.getItem("zephr-accent-color"));
  const storedShowcaseVersion = sessionStorage.getItem("zephr-showcase-version");
  const accentColor = migrateLegacyAccent(
    DEFAULT_STYLE_PACK,
    normalizeHexColor(params.get("accent")) ?? storedAccent
  );
  const showcaseVersionParam = params.get("showcase");
  const showcaseVersion: ShowcaseVersion =
    showcaseVersionParam === "v1" || storedShowcaseVersion === "v1" ? "v1" : "v2";
  const viewParam = params.get("view");
  const view: WorkspaceView =
    viewParam === "introduction" ? "introduction" :
      viewParam === "component-gallery" ? "component-gallery" :
      viewParam === "components" ? "components" :
        viewParam === "api-reference" ? "api-reference" :
          viewParam === "getting-started" ? "getting-started" :
            viewParam === "foundations" ? "foundations" :
              viewParam === "speed-insights" ? "speed-insights" :
                viewParam === "mission" ? "mission" :
                  viewParam === "team" ? "team" :
                    viewParam === "widgets" ? "widgets" :
                    viewParam === "templates" ? "templates" :
                      "introduction";

  return {
    stylePack: DEFAULT_STYLE_PACK,
    componentId: registry.some((entry) => entry.id === componentId) ? componentId : "button",
    accentColor,
    view,
    showcaseVersion
  };
}

function updateSearchParams(
  componentId: string,
  accentColor: string,
  view: WorkspaceView,
  showcaseVersion: ShowcaseVersion
): void {
  if (typeof window === "undefined") {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  params.delete("theme");
  params.set("component", componentId);
  if (accentColor === defaultAccentForPack(DEFAULT_STYLE_PACK)) {
    params.delete("accent");
  } else {
    params.set("accent", accentColor);
  }
  params.delete("surface");
  params.set("view", view);
  if (showcaseVersion === "v2") {
    params.set("showcase", "v2");
  } else {
    params.delete("showcase");
  }

  const next = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState({}, "", next);
}

function getTopTabForView(view: WorkspaceView): TopTab {
  if (view === "widgets" || view === "templates") return "pages";
  if (view === "component-gallery" || view === "components" || view === "api-reference") return "components";
  return "setup";
}

async function copyText(text: string): Promise<boolean> {
  try {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    return false;
  }

  return false;
}

function PreviewSurface({
  entry,
  previewState,
  buttonLabel,
  buttonVariant,
  buttonSize,
  buttonGroupQuantity,
  buttonGroupSize,
  buttonGroupActiveIndex,
  buttonGroupDisabled,
  onButtonGroupValueChange,
  switchPattern,
  switchState,
  switchActive,
  switchSize,
  switchCardType,
  switchShowSublabel,
  switchShowBadge,
  btnFilterType,
  btnFilterSize,
  btnFilterState,
  btnOnlyIcon,
  accordionState,
  accordionFlipIcon,
  tooltipType,
  tooltipSize,
  tooltipTone,
  tooltipTail,
  tooltipLeftIcon,
  tooltipDismissible,
  tooltipVisible,
  alertSeverity,
  alertSize,
  alertStyle,
  alertDismissible,
  dividerOrientation,
  dividerStroke,
  dividerLabel,
  dividerInset,
  dividerThickness,
  datePickerMode,
  datePickerShowTimeFilters,
  datePickerShowFooter,
  paginationType,
  paginationShowFirstLast,
  paginationShowPrevNext,
  paginationShowAdvanced,
  paginationPageSize,
  onPaginationPageSizeChange,
  progressVariant,
  progressTone,
  progressLineSize,
  progressCircleSize,
  progressValue,
  progressShowValue,
  progressLabelPlacement,
  progressShowDescription,
  progressShowAction,
  richEditorVariant,
  richEditorShowMore,
  richEditorDisabled,
  colorPickerFormat,
  colorPickerShowRecommended,
  colorPickerDisabled,
  badgeType,
  badgeStyle,
  badgeColor,
  badgeSize,
  badgeNumber,
  badgeDisabled,
  zephrLogoSrc,
  iconQuery,
  iconStyleVariant,
  iconResults,
  onIconQueryChange,
  onIconStyleVariantChange,
  avatarQuery,
  avatarSeed,
  avatarStyles,
  onAvatarQueryChange,
  onAvatarSeedChange,
  logoQuery,
  logoResults,
  onLogoQueryChange
}: {
  entry: RegistryEntry;
  previewState: PreviewStateKey;
  buttonLabel: string;
  buttonVariant: "primary" | "secondary" | "ghost" | "danger";
  buttonSize: "sm" | "md" | "lg";
  buttonGroupQuantity: ButtonGroupQuantityOption;
  buttonGroupSize: ButtonGroupSizeOption;
  buttonGroupActiveIndex: number;
  buttonGroupDisabled: boolean;
  onButtonGroupValueChange: (nextIndex: number) => void;
  switchPattern: SwitchPatternOption;
  switchState: SwitchStateOption;
  switchActive: boolean;
  switchSize: "sm" | "md";
  switchCardType: SwitchCardTypeOption;
  switchShowSublabel: boolean;
  switchShowBadge: boolean;
  btnFilterType: "all" | "primary" | "secondary" | "ghost" | "danger";
  btnFilterSize: "all" | "sm" | "md" | "lg";
  btnFilterState: "all" | "default" | "hover" | "pressed" | "loading" | "disabled";
  btnOnlyIcon: boolean;
  accordionState: AccordionStateOption;
  accordionFlipIcon: boolean;
  tooltipType: TooltipTypeOption;
  tooltipSize: TooltipSizeOption;
  tooltipTone: TooltipToneOption;
  tooltipTail: boolean;
  tooltipLeftIcon: boolean;
  tooltipDismissible: boolean;
  tooltipVisible: boolean;
  alertSeverity: AlertSeverityOption;
  alertSize: AlertSizeOption;
  alertStyle: AlertStyleOption;
  alertDismissible: boolean;
  dividerOrientation: DividerOrientationOption;
  dividerStroke: DividerStrokeOption;
  dividerLabel: DividerLabelOption;
  dividerInset: DividerInsetOption;
  dividerThickness: 1 | 2 | 3;
  datePickerMode: DatePickerModeOption;
  datePickerShowTimeFilters: boolean;
  datePickerShowFooter: boolean;
  paginationType: PaginationTypeOption;
  paginationShowFirstLast: boolean;
  paginationShowPrevNext: boolean;
  paginationShowAdvanced: boolean;
  paginationPageSize: number;
  onPaginationPageSizeChange: (nextPageSize: number) => void;
  progressVariant: ProgressVariantOption;
  progressTone: ProgressToneOption;
  progressLineSize: ProgressLineSizeOption;
  progressCircleSize: ProgressCircleSizeOption;
  progressValue: 0 | 25 | 50 | 75 | 100;
  progressShowValue: boolean;
  progressLabelPlacement: ProgressLabelPlacementOption;
  progressShowDescription: boolean;
  progressShowAction: boolean;
  richEditorVariant: RichEditorVariantOption;
  richEditorShowMore: boolean;
  richEditorDisabled: boolean;
  colorPickerFormat: ColorPickerFormatOption;
  colorPickerShowRecommended: boolean;
  colorPickerDisabled: boolean;
  badgeType: BadgeTypeOption;
  badgeStyle: BadgeStyleOption;
  badgeColor: BadgeColorOption;
  badgeSize: "sm" | "md";
  badgeNumber: boolean;
  badgeDisabled: boolean;
  zephrLogoSrc: string;
  iconQuery: string;
  iconStyleVariant: MaterialIconStyle;
  iconResults?: MaterialIconDefinition[];
  onIconQueryChange: (nextQuery: string) => void;
  onIconStyleVariantChange: (nextStyle: MaterialIconStyle) => void;
  avatarQuery: string;
  avatarSeed: string;
  avatarStyles?: AvatarStyleDefinition[];
  onAvatarQueryChange: (nextQuery: string) => void;
  onAvatarSeedChange: (nextSeed: string) => void;
  logoQuery: string;
  logoResults?: LogoCatalogEntry[];
  onLogoQueryChange: (nextQuery: string) => void;
}) {
  const [searchQuery, setSearchQuery] = useState("design tokens");
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(2);
  const [commandQuery, setCommandQuery] = useState("deploy");
  const [groupValue, setGroupValue] = useState("2500");
  const [textareaValue, setTextareaValue] = useState("Draft the release summary for design system updates.");
  const [selectValue, setSelectValue] = useState("Pending");
  const [checkboxChecked, setCheckboxChecked] = useState(true);
  const [radioValue, setRadioValue] = useState("Design");
  const [dropdownLabel, setDropdownLabel] = useState("No action selected");
  const [resultMessage, setResultMessage] = useState("");
  const [sliderValue, setSliderValue] = useState(42);
  const [numberInputValue, setNumberInputValue] = useState(5);
  const [tagInputValue, setTagInputValue] = useState<string[]>(["React", "TypeScript"]);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [comboValue, setComboValue] = useState("");

  if (entry.id === "button") {
    const allVariants: Array<"primary" | "secondary" | "ghost" | "danger"> = ["primary", "secondary", "ghost", "danger"];
    const allSizes: Array<"sm" | "md" | "lg"> = ["sm", "md", "lg"];
    const allStates: Array<"default" | "hover" | "pressed" | "loading" | "disabled"> = ["default", "hover", "pressed", "loading", "disabled"];

    const activeVariants = btnFilterType === "all" ? allVariants : [btnFilterType];
    const activeSizes = btnFilterSize === "all" ? ["md" as const] : [btnFilterSize];
    const activeStates = btnFilterState === "all" ? ["default" as const] : [btnFilterState];

    const cells: Array<{ variant: "primary" | "secondary" | "ghost" | "danger"; size: "sm" | "md" | "lg"; state: "default" | "hover" | "pressed" | "loading" | "disabled"; label: string }> = [];

    for (const variant of activeVariants) {
      for (const size of activeSizes) {
        for (const state of activeStates) {
          const parts: string[] = [variant];
          if (btnFilterSize !== "all") parts.push(size);
          if (btnFilterState !== "all") parts.push(state);
          cells.push({ variant, size, state, label: parts.join(" / ") });
        }
      }
    }

    const forcedStyleFor = (state: string): React.CSSProperties | undefined => {
      if (state === "hover") return { transform: "translateY(-1px)", filter: "brightness(1.03)" };
      if (state === "pressed") return { transform: "scale(0.97)", filter: "brightness(0.95)" };
      return undefined;
    };

    const iconPlaceholder = <span className="ms" style={{ fontSize: 16 }}>star</span>;

    return (
      <div className="variant-grid" style={{ gridTemplateColumns: `repeat(${Math.min(cells.length, 3)}, 1fr)` }}>
        {cells.map((c) => (
          <div className="variant-cell" key={c.label}>
            <Button
              variant={c.variant}
              size={c.size}
              loading={c.state === "loading"}
              disabled={c.state === "disabled"}
              style={forcedStyleFor(c.state)}
            >
              {btnOnlyIcon ? iconPlaceholder : "Button"}
            </Button>
            <span className="variant-cell-label">{c.label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (entry.id === "button-group") {
    const labels = Array.from(
      { length: buttonGroupQuantity },
      () => "Button"
    );

    return (
      <div className="preview-stack">
        <p>Button group block</p>
        <ButtonGroup
          quantity={buttonGroupQuantity}
          size={buttonGroupSize}
          labels={labels}
          value={Math.min(buttonGroupActiveIndex, buttonGroupQuantity - 1)}
          disabled={buttonGroupDisabled}
          onValueChange={(nextIndex) => {
            onButtonGroupValueChange(nextIndex);
            setResultMessage(`Selected button ${nextIndex + 1}`);
          }}
        />
        {resultMessage ? <p className="preview-note">{resultMessage}</p> : null}
      </div>
    );
  }

  if (entry.id === "input") {
    const inputHasError = previewState === "error";
    const inputDisabled = previewState === "disabled";
    return (
      <div className="preview-stack">
        <p>Form input block</p>
        <div style={{ display: "grid", gap: "0.75rem", width: "100%", maxWidth: "560px" }}>
          <FormField
            label="Work email"
            htmlFor="preview-input-email"
            required
            hint="We only use this for product updates."
          >
            <Input
              id="preview-input-email"
              placeholder="Type your email"
              defaultValue={previewState === "filled" ? "hello@zephr.local" : ""}
              disabled={inputDisabled}
            />
          </FormField>
          {inputHasError ? (
            <FormField
              label="Backup email"
              htmlFor="preview-input-email-error"
              error="Please enter a valid email address."
            >
              <Input
                id="preview-input-email-error"
                defaultValue="invalid-email"
                aria-invalid="true"
              />
            </FormField>
          ) : null}
        </div>
      </div>
    );
  }

  if (entry.id === "textarea") {
    return (
      <div className="preview-stack">
        <p>Multiline text block</p>
        <Textarea
          value={textareaValue}
          rows={5}
          onChange={(event) => setTextareaValue(event.target.value)}
          placeholder="Write project notes"
        />
      </div>
    );
  }

  if (entry.id === "select") {
    const selectOptions = ["Pending", "In progress", "Done"];
    return (
      <div className="preview-stack">
        <p>Select field block</p>
        <Select
          value={selectValue}
          onChange={(event) => setSelectValue(event.target.value)}
        >
          {selectOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
        <p className="preview-note">Selected: {selectValue}</p>
      </div>
    );
  }

  if (entry.id === "checkbox") {
    return (
      <div className="preview-stack">
        <p>Checkbox block</p>
        <label style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
          <Checkbox checked={checkboxChecked} onChange={(event) => setCheckboxChecked(event.target.checked)} />
          Enable release notifications
        </label>
      </div>
    );
  }

  if (entry.id === "radio") {
    const radioOptions = ["Design", "Engineering"];
    return (
      <div className="preview-stack">
        <p>Radio group block</p>
        {radioOptions.map((option) => (
          <label key={option} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
            <Radio
              name="team-preview"
              checked={radioValue === option}
              onChange={() => setRadioValue(option)}
            />
            {option}
          </label>
        ))}
      </div>
    );
  }

  if (entry.id === "switch") {
    const visualState = switchState;
    const isDisabled = switchState === "disabled";
    const isHover = switchState === "hover";
    const isPressed = switchState === "pressed";

    const cardSurfaceStyle: CSSProperties = {
      width: "min(520px, 100%)",
      borderRadius: "12px",
      border: switchActive && !isDisabled
        ? "1px solid var(--z-color-primary, #121212)"
        : "1px solid var(--z-color-border, #ebebeb)",
      background: isHover || isPressed ? "var(--z-color-weak, #f7f7f7)" : "var(--z-color-surface, #ffffff)",
      padding: "16px",
      display: "flex",
      alignItems: "flex-start",
      gap: "14px",
      boxShadow: isHover || isPressed ? "none" : "0 1px 2px rgba(10, 13, 20, 0.03)",
      opacity: isDisabled ? 0.72 : 1,
      transform: isPressed ? "scale(0.992)" : "scale(1)",
      transition: "transform 120ms ease, background 120ms ease, border-color 120ms ease"
    };

    const cardLeading =
      switchCardType === "left-icon" ? (
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "999px",
            border: "1px solid var(--z-color-border, #ebebeb)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--z-color-surface, #ffffff)",
            fontSize: "16px",
            color: "var(--z-color-muted, #5c5c5c)"
          }}
        >
          <span className="ms">person</span>
        </div>
      ) : switchCardType === "avatar" ? (
        <Avatar name="Akhil Krishnan" size={40} />
      ) : null;

    const sublabelTone = isDisabled ? "var(--z-color-text300, #a3a3a3)" : "var(--z-color-muted, #5c5c5c)";
    const labelTone = isDisabled ? "var(--z-color-muted, #5c5c5c)" : "var(--z-color-text, #171717)";

    return (
      <div className="preview-stack">
        <p>Switch block</p>
        {switchPattern === "switch" ? (
          <div style={{ display: "grid", gap: "0.5rem" }}>
            <Switch
              checked={switchActive}
              onChange={() => { }}
              visualState={visualState}
              disabled={isDisabled}
              size={switchSize}
              label="Enable beta features"
            />
            <p className="preview-note">
              State: {switchState} · Active: {switchActive ? "On" : "Off"} · Size: {switchSize.toUpperCase()}
            </p>
          </div>
        ) : switchPattern === "switch-label" ? (
          <div
            style={{
              width: "min(520px, 100%)",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "1rem",
              padding: "8px 0"
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", marginBottom: switchShowSublabel ? "4px" : 0 }}>
                <span style={{ fontSize: "14px", fontWeight: 500, color: labelTone }}>Label</span>
                {switchShowSublabel ? (
                  <span style={{ fontSize: "12px", color: sublabelTone }}>(Sublabel)</span>
                ) : null}
                {switchShowBadge ? <Badge tone={isDisabled ? "neutral" : "info"}>New</Badge> : null}
              </div>
              <p className="preview-note" style={{ marginTop: 0, color: sublabelTone }}>
                Insert the switch description here.
              </p>
            </div>
            <Switch
              checked={switchActive}
              onChange={() => { }}
              visualState={visualState}
              disabled={isDisabled}
              size={switchSize}
              label="Label"
            />
          </div>
        ) : (
          <div style={cardSurfaceStyle}>
            {cardLeading}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", marginBottom: switchShowSublabel ? "4px" : 0 }}>
                <span style={{ fontSize: "14px", fontWeight: 500, color: labelTone }}>Label</span>
                {switchShowSublabel ? (
                  <span style={{ fontSize: "12px", color: sublabelTone }}>(Sublabel)</span>
                ) : null}
                {switchShowBadge ? <Badge tone={isDisabled ? "neutral" : "info"}>New</Badge> : null}
              </div>
              <p className="preview-note" style={{ marginTop: 0, color: sublabelTone }}>
                Insert the checkbox description here.
              </p>
            </div>
            <Switch
              checked={switchActive}
              onChange={() => { }}
              visualState={visualState}
              disabled={isDisabled}
              size={switchSize}
              label="Switch card"
            />
          </div>
        )}
      </div>
    );
  }

  if (entry.id === "badge") {
    const badgeNode = (
      <Badge
        type={badgeType}
        variant={badgeStyle}
        color={badgeColor}
        size={badgeSize}
        number={badgeNumber ? 8 : undefined}
        disabled={badgeDisabled}
        icon={<span className="ms" style={{ fontSize: badgeSize === "sm" ? 11 : 12 }}>bolt</span>}
      >
        {badgeNumber ? undefined : "Badge"}
      </Badge>
    );

    return (
      <div className="preview-stack">
        <p>Status badge block</p>
        <div
          style={{
            display: "grid",
            gap: "0.75rem",
            width: "100%"
          }}
        >
          <div
            style={{
              border: "1px solid var(--z-color-border, #ebebeb)",
              borderRadius: "10px",
              background: badgeStyle === "white" ? "#344054" : "var(--z-color-surface, #ffffff)",
              padding: "16px",
              minHeight: "72px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {badgeNode}
          </div>
          <p className="preview-note">
            Type: {badgeType.replace("-", " ")} · Style: {badgeStyle} · Color: {badgeColor}
          </p>
        </div>
      </div>
    );
  }

  if (entry.id === "avatar") {
    return (
      <div className="preview-stack">
        <p>Avatar block</p>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <Avatar name="Akhil Krishnan" />
          <Avatar name="Maya Carter" />
          <Avatar name="Noah Kim" size={48} />
          <Avatar name="Loading User" size={40} loading />
          <Avatar name="Loading User" size={48} loading />
        </div>
        <p className="preview-note">Last 2 show loading skeleton state.</p>
      </div>
    );
  }

  if (entry.id === "logo") {
    return (
      <div className="preview-stack">
        <p>Logo block</p>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <img src={zephrLogoSrc} alt="Zephr logo" style={{ height: 28, width: "auto" }} />
          <Logo name="OpenAI" size={40} />
          <Logo name="GitHub" size={40} />
          <Logo name="Stripe" size={40} />
        </div>
      </div>
    );
  }

  if (entry.id === "icon-button") {
    return (
      <div className="preview-stack">
        <p>Icon button block</p>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <IconButton icon={<span aria-hidden>|||</span>} label="Open menu" />
          <IconButton icon={<span aria-hidden>+</span>} label="Create item" tone="primary" />
          <IconButton icon={<span aria-hidden>x</span>} label="Delete item" tone="danger" />
        </div>
      </div>
    );
  }

  if (entry.id === "divider") {
    const dividerColor = "var(--z-color-stroke100, var(--z-color-border, #eaecf0))";
    const insetPadding = dividerInset === "none" ? 0 : dividerInset === "sm" ? 24 : 48;
    const labelNode =
      dividerLabel === "text" ? (
        <span
          style={{
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--z-color-muted, #667085)"
          }}
        >
          Section
        </span>
      ) : dividerLabel === "chip" ? (
        <Badge tone="neutral">OR</Badge>
      ) : null;

    const horizontalLineStyle: CSSProperties =
      dividerStroke === "solid"
        ? {
          background: dividerColor,
          height: dividerThickness
        }
        : {
          background: "transparent",
          height: 0,
          borderTop: `${dividerThickness}px ${dividerStroke} ${dividerColor}`
        };

    const verticalLineStyle: CSSProperties =
      dividerStroke === "solid"
        ? {
          background: dividerColor,
          width: dividerThickness
        }
        : {
          background: "transparent",
          width: 0,
          borderLeft: `${dividerThickness}px ${dividerStroke} ${dividerColor}`
        };

    if (dividerOrientation === "vertical") {
      return (
        <div className="preview-stack">
          <p>Divider block</p>
          <div style={{ width: "min(640px, 100%)", display: "grid", gap: "0.625rem" }}>
            {labelNode ? (
              <div style={{ display: "flex", justifyContent: "center" }}>{labelNode}</div>
            ) : null}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr",
                columnGap: "0.75rem",
                alignItems: "stretch",
                minHeight: "136px",
                border: "1px solid var(--z-color-stroke100, var(--z-color-border, #eaecf0))",
                borderRadius: "10px",
                background: "var(--z-color-background0, #ffffff)",
                padding: "0.75rem",
                boxSizing: "border-box"
              }}
            >
              <div
                style={{
                  border: "1px solid var(--z-color-stroke100, #eaecf0)",
                  borderRadius: "8px",
                  background: "var(--z-color-background200, #f2f4f7)",
                  padding: "0.75rem",
                  fontSize: "0.875rem",
                  color: "var(--z-color-muted, #667085)"
                }}
              >
                Left content area
              </div>
              <Divider orientation="vertical" thickness={dividerThickness} style={verticalLineStyle} />
              <div
                style={{
                  border: "1px solid var(--z-color-stroke100, #eaecf0)",
                  borderRadius: "8px",
                  background: "var(--z-color-background200, #f2f4f7)",
                  padding: "0.75rem",
                  fontSize: "0.875rem",
                  color: "var(--z-color-muted, #667085)"
                }}
              >
                Right content area
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="preview-stack">
        <p>Divider block</p>
        <div
          style={{
            width: "100%",
            display: "grid",
            gap: "0.75rem",
            paddingInline: `${insetPadding}px`,
            boxSizing: "border-box"
          }}
        >
          <p className="preview-note" style={{ margin: 0 }}>
            Section one content appears above the divider.
          </p>
          {labelNode ? (
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
              <Divider thickness={dividerThickness} style={{ ...horizontalLineStyle, flex: 1 }} />
              {labelNode}
              <Divider thickness={dividerThickness} style={{ ...horizontalLineStyle, flex: 1 }} />
            </div>
          ) : (
            <Divider thickness={dividerThickness} style={horizontalLineStyle} />
          )}
          <p className="preview-note" style={{ margin: 0 }}>
            Section two content starts after the divider.
          </p>
        </div>
      </div>
    );
  }

  if (entry.id === "progress") {
    const descriptionText = "to unlock unlimited data storage.";
    return (
      <div className="preview-stack">
        <p>Progress block</p>
        {progressVariant === "circle" ? (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              alignItems: "center"
            }}
          >
            <Progress
              variant="circle"
              value={progressValue}
              circleSize={progressCircleSize}
              tone={progressTone}
              showValue={progressShowValue}
              label="Circular progress"
            />
          </div>
        ) : (
          <Progress
            variant={progressVariant}
            value={progressValue}
            size={progressLineSize}
            tone={progressTone}
            showValue={progressShowValue}
            labelPlacement={progressLabelPlacement}
            title="Data Storage"
            description={progressShowDescription ? descriptionText : undefined}
            actionLabel={progressShowDescription && progressShowAction ? "Upgrade" : undefined}
            onAction={() => setResultMessage("Upgrade action clicked")}
            style={{ width: "320px" }}
          />
        )}
        {resultMessage ? <p className="preview-note">{resultMessage}</p> : null}
      </div>
    );
  }

  if (entry.id === "date-picker") {
    return (
      <div className="preview-stack">
        <p>Date picker block</p>
        <DatePicker
          mode={datePickerMode}
          showTimeFilters={datePickerShowTimeFilters}
          showFooter={datePickerShowFooter}
          onApply={() => setResultMessage("Date range applied")}
          onCancel={() => setResultMessage("Date selection cancelled")}
        />
        {resultMessage ? <p className="preview-note">{resultMessage}</p> : null}
      </div>
    );
  }

  if (entry.id === "color-picker") {
    return (
      <div className="preview-stack">
        <p>Color picker block</p>
        <ColorPicker
          format={colorPickerFormat}
          showRecommendedColors={colorPickerShowRecommended}
          disabled={colorPickerDisabled}
          value="#335cff"
        />
      </div>
    );
  }

  if (entry.id === "icon-library") {
    return (
      <div className="preview-stack">
        <p>Material icon browser</p>
        <IconLibrary
          query={iconQuery}
          onQueryChange={onIconQueryChange}
          styleVariant={iconStyleVariant}
          onStyleVariantChange={onIconStyleVariantChange}
          icons={iconResults}
          limit={84}
          onCopy={(value) => setResultMessage(`Copied icon: ${value}`)}
        />
        {resultMessage ? <p className="preview-note">{resultMessage}</p> : null}
      </div>
    );
  }

  if (entry.id === "avatar-library") {
    return (
      <div className="preview-stack">
        <p>Avatar style browser</p>
        <AvatarLibrary
          query={avatarQuery}
          onQueryChange={onAvatarQueryChange}
          seed={avatarSeed}
          onSeedChange={onAvatarSeedChange}
          styles={avatarStyles}
          onCopy={(value) => setResultMessage(`Copied avatar style: ${value}`)}
        />
        {resultMessage ? <p className="preview-note">{resultMessage}</p> : null}
      </div>
    );
  }

  if (entry.id === "logo-library") {
    return (
      <div className="preview-stack">
        <p>Brand logo browser</p>
        <LogoLibrary
          query={logoQuery}
          onQueryChange={onLogoQueryChange}
          logos={logoResults}
          onCopy={(value) => setResultMessage(`Copied domain: ${value}`)}
        />
        {resultMessage ? <p className="preview-note">{resultMessage}</p> : null}
      </div>
    );
  }

  if (entry.id === "form-field") {
    return (
      <div className="preview-stack">
        <p>Form field block</p>
        <div style={{ display: "grid", gap: "0.75rem", width: "100%", maxWidth: "480px" }}>
          <FormField label="Work email" htmlFor="preview-form-email" hint="We will use this for release updates.">
            <Input id="preview-form-email" placeholder="name@company.com" />
          </FormField>
          <FormField label="Display name" htmlFor="preview-form-name" pending>
            <Input id="preview-form-name" defaultValue="Akhil Krishnan" />
          </FormField>
          <FormField label="Username" htmlFor="preview-form-user" success="Username is available!">
            <Input id="preview-form-user" defaultValue="akhil.z" />
          </FormField>
        </div>
      </div>
    );
  }

  if (entry.id === "search-box") {
    return (
      <div className="preview-stack">
        <p>Search block</p>
        <SearchBox
          value={searchQuery}
          onValueChange={setSearchQuery}
          onSearch={setSearchQuery}
          placeholder="Search projects"
        />
      </div>
    );
  }

  if (entry.id === "tabs") {
    return (
      <div className="preview-stack">
        <p>Tabs block</p>
        <Tabs
          items={[
            {
              id: "overview",
              label: "Overview",
              content: <p className="preview-note">Overview content for this component section.</p>
            },
            {
              id: "usage",
              label: "Usage",
              content: <p className="preview-note">Usage details and integration notes.</p>
            },
            {
              id: "api",
              label: "API",
              content: <p className="preview-note">Props and examples are available in AI reference.</p>
            }
          ]}
        />
      </div>
    );
  }

  if (entry.id === "tooltip") {
    const placementByType: Record<TooltipTypeOption, { side: "top" | "bottom" | "left" | "right"; align: "start" | "center" | "end" }> = {
      "top-left": { side: "top", align: "start" },
      "top-center": { side: "top", align: "center" },
      "top-right": { side: "top", align: "end" },
      "bottom-left": { side: "bottom", align: "start" },
      "bottom-center": { side: "bottom", align: "center" },
      "bottom-right": { side: "bottom", align: "end" },
      right: { side: "right", align: "center" },
      left: { side: "left", align: "center" }
    };
    const placement = placementByType[tooltipType];
    return (
      <div className="preview-stack">
        <p>Tooltip block</p>
        <div style={{ minHeight: "240px", display: "grid", placeItems: "center", width: "100%" }}>
          <Tooltip
            content="Insert Tooltip"
            description={
              tooltipSize === "large"
                ? "Insert tooltip description here. It would look much better as three lines of text."
                : undefined
            }
            side={placement.side}
            align={placement.align}
            size={tooltipSize === "2xs" ? "2xs" : tooltipSize === "xs" ? "xs" : "lg"}
            variant={tooltipTone}
            showTail={tooltipTail}
            showIcon={tooltipLeftIcon}
            dismissible={tooltipDismissible}
            open={tooltipVisible}
            delayMs={140}
          >
            <Button size="sm" variant="secondary">Hover trigger</Button>
          </Tooltip>
        </div>
      </div>
    );
  }

  if (entry.id === "accordion") {
    const openIds = accordionState === "active" ? ["1"] : [];
    const forceHoveredId = accordionState === "hover" ? "1" : null;
    const iconPosition = accordionFlipIcon ? "left" as const : "right" as const;
    const leadingIcon = accordionFlipIcon ? undefined : (
      <span
        style={{
          width: "18px",
          height: "18px",
          border: "1px solid var(--z-color-muted, #8b8b8b)",
          borderRadius: "999px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--z-color-muted, #6b7280)",
          fontSize: "12px",
          lineHeight: 1,
          fontWeight: 600,
          boxSizing: "border-box"
        }}
      >
        ?
      </span>
    );
    return (
      <div className="preview-stack">
        <p>Accordion block</p>
        <Accordion
          key={`${accordionState}-${accordionFlipIcon ? "flip" : "default"}`}
          defaultOpenIds={openIds}
          forceHoveredId={forceHoveredId}
          iconPosition={iconPosition}
          leadingIcon={leadingIcon}
          items={[
            {
              id: "1",
              title: "Insert your accordion title here",
              description:
                "Insert the accordion description here. It would look better as two lines of text.",
              content: (
                <p className="preview-note">
                  Use this pattern for FAQs, setup docs, and progressive disclosure.
                </p>
              ),
              defaultOpen: accordionState === "active"
            },
            {
              id: "2",
              title: "Insert your accordion title here",
              description: "Insert the accordion description here. It would look better as two lines of text."
            },
            {
              id: "3",
              title: "Insert your accordion title here",
              description: "Insert the accordion description here. It would look better as two lines of text."
            }
          ]}
        />
      </div>
    );
  }

  if (entry.id === "alert") {
    const statusBySeverity: Record<AlertSeverityOption, "error" | "warning" | "success" | "info" | "neutral"> = {
      red: "error",
      yellow: "warning",
      green: "success",
      blue: "info",
      grey: "neutral"
    };
    const status = statusBySeverity[alertSeverity];
    const variantByStyle: Record<AlertStyleOption, "filled" | "lighter" | "stroke"> = {
      solid: "filled",
      light: "lighter",
      stroke: "stroke"
    };
    const variant = variantByStyle[alertStyle];
    const alertSizeProps =
      alertSize === "wide"
        ? { size: "xs" as const, width: "100%" }
        : alertSize === "small"
          ? { size: "sm" as const, width: "min(420px, 100%)" }
          : { size: "xs" as const, width: "min(390px, 100%)" };
    const titleBySeverity: Record<AlertSeverityOption, string> = {
      red: "Deployment failed. Please review build logs.",
      yellow: "API usage nearing current quota.",
      green: "Accent updated successfully.",
      blue: "New registry schema available.",
      grey: "Maintenance window starts in 30 minutes."
    };
    const descriptionBySeverity: Record<AlertSeverityOption, string> = {
      red: "Check CI logs, fix the failing step, and redeploy.",
      yellow: "Upgrade the plan or reduce request volume to prevent throttling.",
      green: "Your latest visual token changes were applied across all previews.",
      blue: "You can regenerate prompts to include the latest component metadata.",
      grey: "Some editor features may be temporarily unavailable."
    };
    const actionBySeverity: Record<AlertSeverityOption, string | undefined> = {
      red: "Retry",
      yellow: "Upgrade",
      green: undefined,
      blue: "View changes",
      grey: "Learn more"
    };
    return (
      <div className="preview-stack">
        <p>Alert block</p>
        <div style={{ width: alertSizeProps.width }}>
          <Alert
            status={status}
            size={alertSizeProps.size}
            variant={variant}
            title={titleBySeverity[alertSeverity]}
            description={alertSize === "toast" ? undefined : descriptionBySeverity[alertSeverity]}
            actionLabel={actionBySeverity[alertSeverity]}
            dismissible={alertDismissible}
            onDismiss={() => setResultMessage("Alert dismissed")}
          />
        </div>
        {resultMessage ? <p className="preview-note">{resultMessage}</p> : null}
      </div>
    );
  }

  if (entry.id === "toast") {
    const status = previewState === "warning" ? "warning" : previewState === "success" ? "success" : "info";
    return (
      <div className="preview-stack">
        <p>Toast block</p>
        <div style={{ display: "grid", gap: "0.5rem", maxWidth: "520px" }}>
          <Toast
            status={status}
            title={
              status === "warning"
                ? "API key missing for cloud assets."
                : status === "success"
                  ? "Block prompt copied."
                  : "Catalog sync running."
            }
            description={
              status === "warning"
                ? "Add a key to enable cloud-only assets."
                : status === "success"
                  ? "Paste it in your coding assistant to generate the section."
                  : "Local fallback is active during sync."
            }
            actionLabel={status === "warning" ? "Add key" : undefined}
            onClose={() => setResultMessage("Toast dismissed")}
            onAction={() => setResultMessage("Open API key settings")}
          />
        </div>
        {resultMessage ? <p className="preview-note">{resultMessage}</p> : null}
      </div>
    );
  }

  if (entry.id === "breadcrumbs") {
    return (
      <div className="preview-stack">
        <p>Breadcrumbs block</p>
        <Breadcrumbs
          items={[
            { id: "home", label: "Home", href: "#" },
            { id: "components", label: "Components", href: "#" },
            { id: "current", label: "Data Table" }
          ]}
        />
      </div>
    );
  }

  if (entry.id === "pagination") {
    return (
      <div className="preview-stack">
        <p>Pagination block</p>
        <Pagination
          page={page}
          totalPages={16}
          onPageChange={setPage}
          type={paginationType}
          showFirstLast={paginationShowFirstLast}
          showPrevNext={paginationShowPrevNext}
          showMeta={paginationShowAdvanced}
          showPageSizeSelect={paginationShowAdvanced}
          pageSize={paginationPageSize}
          onPageSizeChange={onPaginationPageSizeChange}
          pageSizeOptions={[7, 10, 20, 50]}
        />
      </div>
    );
  }

  if (entry.id === "command-bar") {
    const [cmdLoading, setCmdLoading] = useState(false);
    return (
      <div className="preview-stack">
        <p>Command bar block</p>
        <CommandBar
          query={commandQuery}
          onQueryChange={setCommandQuery}
          loading={cmdLoading}
          actions={[
            {
              id: "run",
              label: "Run",
              onRun: (query) => {
                setCmdLoading(true);
                setResultMessage("");
                window.setTimeout(() => { setCmdLoading(false); setResultMessage(`Ran: ${query}`); }, 1800);
              }
            },
            { id: "save", label: "Save", onRun: (query) => setResultMessage(`Saved: ${query}`) }
          ]}
        />
        {resultMessage ? <p className="preview-note">{resultMessage}</p> : null}
        <p className="preview-note">Click Run to see the loading state.</p>
      </div>
    );
  }

  if (entry.id === "rich-editor") {
    return (
      <div className="preview-stack">
        <p>Rich editor toolbar block</p>
        <RichEditor
          variant={richEditorVariant}
          showMore={richEditorShowMore}
          disabled={richEditorDisabled}
          onAction={(action) => setResultMessage(`Toolbar action: ${action}`)}
        />
        {resultMessage ? <p className="preview-note">{resultMessage}</p> : null}
      </div>
    );
  }

  if (entry.id === "input-group") {
    return (
      <div className="preview-stack">
        <p>Input group block</p>
        <InputGroup
          startAdornment="$"
          endAdornment="USD"
          value={groupValue}
          onChange={(event) => setGroupValue(event.target.value)}
        />
      </div>
    );
  }

  if (entry.id === "dropdown") {
    return (
      <div className="preview-stack">
        <p>Dropdown block</p>
        <Dropdown
          label="Project actions"
          items={[
            { id: "duplicate", label: "Duplicate", onSelect: () => setDropdownLabel("Duplicate selected") },
            { id: "archive", label: "Archive", onSelect: () => setDropdownLabel("Archive selected") },
            { id: "export", label: "Export", onSelect: () => setDropdownLabel("Export selected") }
          ]}
          trigger={<Button variant="secondary">Open actions</Button>}
        />
        <p className="preview-note">{dropdownLabel}</p>
      </div>
    );
  }

  if (entry.id === "navbar") {
    return (
      <div className="preview-stack">
        <p>Navigation block</p>
        <Navbar
          brand={<strong>Zephr</strong>}
          links={[
            { id: "overview", label: "Overview", href: "#" },
            { id: "components", label: "Components", href: "#" },
            { id: "tokens", label: "Tokens", href: "#" }
          ]}
          actions={<Badge tone="info">Live</Badge>}
        />
      </div>
    );
  }

  if (entry.id === "header") {
    return (
      <div className="preview-stack">
        <p>Header block</p>
        <Header
          title="Component workspace"
          subtitle="Manage your blocks, prompts, and integration snippets."
          actions={<Button size="sm">New block</Button>}
        />
      </div>
    );
  }

  if (entry.id === "layout-shell") {
    return (
      <div className="preview-stack">
        <p>Layout shell block</p>
        <LayoutShell
          topNav={(
            <Navbar
              brand={<strong>Zephr</strong>}
              links={[
                { id: "docs", label: "Docs", href: "#" },
                { id: "components", label: "Components", href: "#" }
              ]}
              actions={<Button size="sm">Deploy</Button>}
            />
          )}
          sidebar={(
            <SidebarNav
              sections={[
                {
                  id: "guides",
                  title: "Guides",
                  items: [
                    { id: "quickstart", label: "Quickstart", href: "#", active: true },
                    { id: "tokens", label: "Tokens", href: "#" }
                  ]
                }
              ]}
            />
          )}
          header={<Header title="Workspace" subtitle="A complete app frame ready for prompts." />}
          rightRail={(
            <div className="table-shell" style={{ padding: "0.75rem" }}>
              <p className="preview-note">Right rail notes and checklist.</p>
            </div>
          )}
        >
          <div className="table-shell" style={{ padding: "0.75rem", display: "grid", gap: "0.5rem" }}>
            <p className="preview-note">Main content surface for generated blocks.</p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <Badge tone="info">Accent-ready</Badge>
              <Badge tone="success">Ready</Badge>
            </div>
          </div>
        </LayoutShell>
      </div>
    );
  }

  if (entry.id === "sidebar-nav") {
    return (
      <div className="preview-stack">
        <p>Sidebar nav block</p>
        <SidebarNav
          sections={[
            {
              id: "getting-started",
              title: "Get Started",
              items: [
                { id: "quickstart", label: "Quickstart", href: "#" },
                { id: "setup", label: "Visual setup", href: "#", active: true }
              ]
            },
            {
              id: "components",
              title: "Components",
              items: [
                { id: "atoms", label: "Atoms", href: "#" },
                { id: "organisms", label: "Organisms", href: "#" }
              ]
            }
          ]}
        />
      </div>
    );
  }

  if (entry.id === "data-table") {
    const [tableLoading, setTableLoading] = useState(false);
    const [tableEmpty, setTableEmpty] = useState(false);
    const forcedLoading = previewState === "loading";
    const forcedEmpty = previewState === "empty";
    const columns = [
      { id: "name", header: "Name", accessor: "name" as keyof TeamMember },
      { id: "role", header: "Role", accessor: "role" as keyof TeamMember },
      { id: "squad", header: "Squad", accessor: "squad" as keyof TeamMember }
    ];
    return (
      <div className="preview-stack">
        <p>Data block</p>
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <Button size="sm" variant="ghost" onClick={() => { setTableLoading(true); window.setTimeout(() => setTableLoading(false), 2000); }}>
            Simulate load
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setTableEmpty((e) => !e)}>
            {tableEmpty ? "Show data" : "Show empty"}
          </Button>
        </div>
        <div className="table-shell">
          <DataTable
            data={tableEmpty || forcedEmpty ? [] : tableRows}
            rowKey={(row) => row.id}
            columns={columns}
            loading={tableLoading || forcedLoading}
          />
        </div>
      </div>
    );
  }

  if (entry.id === "filters-bar") {
    return (
      <div className="preview-stack">
        <p>Filters bar block</p>
        <FiltersBar
          items={[
            {
              id: "status",
              label: "Status",
              control: (
                <Select>
                  <option>All</option>
                  <option>Active</option>
                  <option>Archived</option>
                </Select>
              )
            },
            {
              id: "owner",
              label: "Owner",
              control: <Input placeholder="Type owner name" />
            }
          ]}
          onReset={() => setResultMessage("Filters reset")}
        />
        {resultMessage ? <p className="preview-note">{resultMessage}</p> : null}
      </div>
    );
  }

  if (entry.id === "search-results-panel") {
    const [srpLoading, setSrpLoading] = useState(false);
    const [srpEmpty, setSrpEmpty] = useState(false);
    const forcedLoading = previewState === "loading";
    const forcedEmpty = previewState === "empty";
    return (
      <div className="preview-stack">
        <p>Search results block</p>
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <Button size="sm" variant="ghost" onClick={() => { setSrpLoading(true); window.setTimeout(() => setSrpLoading(false), 1800); }}>
            Simulate search
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setSrpEmpty((e) => !e)}>
            {srpEmpty ? "Show results" : "Show empty"}
          </Button>
        </div>
        <SearchResultsPanel
          query="design system"
          loading={srpLoading || forcedLoading}
          results={srpEmpty || forcedEmpty ? [] : [
            {
              id: "1",
              title: "Design tokens migration",
              description: "Update semantic aliases for the default visual system.",
              metadata: "Updated today",
              onSelect: () => setResultMessage("Opened: Design tokens migration")
            },
            {
              id: "2",
              title: "Component API reference",
              description: "Props and examples for core atoms and molecules.",
              metadata: "Updated yesterday",
              onSelect: () => setResultMessage("Opened: Component API reference")
            }
          ]}
        />
        {resultMessage ? <p className="preview-note">{resultMessage}</p> : null}
      </div>
    );
  }

  if (entry.id === "modal-dialog") {
    return (
      <div className="preview-stack">
        <p>Modal block</p>
        <Button onClick={() => setModalOpen(true)}>Open Preview Modal</Button>
        <ModalDialog
          open={modalOpen}
          title="Confirm action"
          description="This is Zephr modal preview in the current theme."
          onCancel={() => setModalOpen(false)}
          onConfirm={() => setModalOpen(false)}
        >
          <p className="preview-note">Use this block in confirmation and short workflows.</p>
        </ModalDialog>
      </div>
    );
  }

  if (entry.id === "card") {
    return (
      <div className="preview-stack">
        <Card shadow="sm" padding="md">
          <p style={{ margin: 0, fontSize: 13 }}>Default card — small shadow, medium padding.</p>
        </Card>
        <Card shadow="md" padding="lg">
          <strong style={{ display: "block", marginBottom: 4, fontSize: 13 }}>Elevated card</strong>
          <p style={{ margin: 0, fontSize: 12, color: "var(--z-color-text500)" }}>Stronger shadow for floating surfaces like panels and drawers.</p>
        </Card>
      </div>
    );
  }

  if (entry.id === "skeleton") {
    return (
      <div className="preview-stack">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Skeleton width={44} height={44} radius="full" />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
            <Skeleton width="65%" height={12} />
            <Skeleton width="45%" height={10} />
          </div>
        </div>
        <Skeleton lines={3} height={11} />
        <Skeleton width={120} height={32} radius="md" />
      </div>
    );
  }

  if (entry.id === "slider") {
    return (
      <div className="preview-stack">
        <Slider value={sliderValue} min={0} max={100} step={1} onChange={setSliderValue} label="Volume" />
        <p className="preview-note">Current value: {sliderValue}</p>
        <Slider value={30} min={0} max={100} step={10} disabled label="Disabled" />
      </div>
    );
  }

  if (entry.id === "number-input") {
    return (
      <div className="preview-stack">
        <NumberInput value={numberInputValue} min={0} max={99} step={1} onChange={setNumberInputValue} label="Quantity" />
        <NumberInput value={1.5} min={0} max={10} step={0.5} label="Step 0.5" />
        <NumberInput value={0} min={0} max={100} disabled label="Disabled" />
      </div>
    );
  }

  if (entry.id === "tag-input") {
    return (
      <div className="preview-stack">
        <TagInput value={tagInputValue} onChange={setTagInputValue} placeholder="Add a tag and press Enter…" />
        <p className="preview-note">{tagInputValue.length} tag{tagInputValue.length !== 1 ? "s" : ""} added</p>
      </div>
    );
  }

  if (entry.id === "combo-box") {
    const comboOptions = [
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
      { value: "svelte", label: "Svelte" },
      { value: "angular", label: "Angular" },
      { value: "solid", label: "SolidJS" },
    ];
    return (
      <div className="preview-stack">
        <ComboBox options={comboOptions} value={comboValue} onChange={setComboValue} placeholder="Search frameworks…" />
        {comboValue && <p className="preview-note">Selected: {comboOptions.find(o => o.value === comboValue)?.label}</p>}
      </div>
    );
  }

  if (entry.id === "popover") {
    return (
      <div className="preview-stack" style={{ alignItems: "center", minHeight: 200, justifyContent: "center" }}>
        <Popover
          trigger={<Button size="sm">Open popover</Button>}
          side="bottom"
          align="center"
        >
          <div style={{ padding: "0.75rem 1rem" }}>
            <strong style={{ fontSize: 13 }}>Popover content</strong>
            <p style={{ margin: "4px 0 0", fontSize: 12, color: "var(--z-color-text500)" }}>Anchored to its trigger element.</p>
          </div>
        </Popover>
      </div>
    );
  }

  if (entry.id === "sheet") {
    return (
      <div className="preview-stack">
        <Button size="sm" onClick={() => setSheetOpen(true)}>Open sheet</Button>
        <Sheet open={sheetOpen} onClose={() => setSheetOpen(false)} title="Sheet panel" side="right">
          <p style={{ margin: 0, fontSize: 13 }}>Sheet content slides in from the edge of the viewport. Use for forms, filters, and detail panels.</p>
        </Sheet>
        <p className="preview-note">Slides in from the right edge. Set <code>side</code> to change direction.</p>
      </div>
    );
  }

  if (entry.id === "alert-dialog") {
    return (
      <div className="preview-stack">
        <Button size="sm" variant="danger" onClick={() => setAlertDialogOpen(true)}>Delete item</Button>
        <AlertDialog
          open={alertDialogOpen}
          onClose={() => setAlertDialogOpen(false)}
          title="Delete this item?"
          description="This action cannot be undone. The item will be permanently removed from your workspace."
          confirmLabel="Delete"
          cancelLabel="Cancel"
          onConfirm={() => setAlertDialogOpen(false)}
        />
        <p className="preview-note">Blocks interaction until the user confirms or cancels.</p>
      </div>
    );
  }

  if (entry.id === "stack") {
    return (
      <div className="preview-stack">
        <p className="preview-note">Horizontal</p>
        <Stack direction="horizontal" gap={2} align="center">
          <Button size="sm" variant="primary">One</Button>
          <Button size="sm" variant="secondary">Two</Button>
          <Button size="sm" variant="ghost">Three</Button>
        </Stack>
        <p className="preview-note">Vertical</p>
        <Stack direction="vertical" gap={2}>
          <Input placeholder="First name" />
          <Input placeholder="Last name" />
        </Stack>
      </div>
    );
  }

  if (entry.id === "grid") {
    return (
      <div className="preview-stack">
        <Grid columns={3} gap={2}>
          {[1, 2, 3, 4, 5, 6].map(n => (
            <div key={n} style={{ padding: "0.75rem", background: "var(--z-color-background100)", borderRadius: 8, border: "1px solid var(--z-color-stroke200)", textAlign: "center", fontSize: 12, color: "var(--z-color-text500)" }}>
              Cell {n}
            </div>
          ))}
        </Grid>
      </div>
    );
  }

  if (entry.id === "box") {
    return (
      <div className="preview-stack">
        <Box padding={4} style={{ border: "1px solid var(--z-color-stroke200)", borderRadius: 10, background: "var(--z-color-background100)" }}>
          <p style={{ margin: 0, fontSize: 13 }}><code>Box</code> with <code>padding=4</code> (1rem).</p>
        </Box>
        <Box paddingX={6} paddingY={2} style={{ border: "1px dashed var(--z-color-stroke200)", borderRadius: 8 }}>
          <p style={{ margin: 0, fontSize: 13 }}>Asymmetric padding via <code>paddingX</code> and <code>paddingY</code>.</p>
        </Box>
      </div>
    );
  }

  if (entry.id === "spacer") {
    return (
      <div className="preview-stack">
        <p className="preview-note">Spacer pushes content to opposite ends of a flex row</p>
        <Stack direction="horizontal" align="center" style={{ border: "1px dashed var(--z-color-stroke300)", borderRadius: 8, padding: "0.5rem 0.75rem" }}>
          <span style={{ fontSize: 13 }}>Left</span>
          <Spacer />
          <Button size="sm">Action</Button>
        </Stack>
        <Stack direction="horizontal" align="center" style={{ border: "1px dashed var(--z-color-stroke300)", borderRadius: 8, padding: "0.5rem 0.75rem" }}>
          <Badge tone="success">Status</Badge>
          <Spacer />
          <span style={{ fontSize: 12, color: "var(--z-color-text500)" }}>12 items</span>
        </Stack>
      </div>
    );
  }

  if (entry.id === "dashboard-page") {
    return (
      <div className="page-template-preview-wrap">
        <div className="page-template-preview-scale">
          <DashboardPage />
        </div>
      </div>
    );
  }

  if (entry.id === "auth-page") {
    return (
      <div className="page-template-preview-wrap">
        <div className="page-template-preview-scale">
          <AuthPage />
        </div>
      </div>
    );
  }

  if (entry.id === "settings-page") {
    return (
      <div className="page-template-preview-wrap">
        <div className="page-template-preview-scale">
          <SettingsPage />
        </div>
      </div>
    );
  }

  if (entry.id === "onboarding-page") {
    return (
      <div className="page-template-preview-wrap">
        <div className="page-template-preview-scale">
          <OnboardingPage />
        </div>
      </div>
    );
  }

  if (entry.id === "marketing-page") {
    return (
      <div className="page-template-preview-wrap">
        <div className="page-template-preview-scale">
          <MarketingPage />
        </div>
      </div>
    );
  }

  return (
    <div className="preview-stack">
      <p>No dedicated preview registered for this component yet.</p>
    </div>
  );
}

function BrowserPreviewFrame({

  children,
  address = "preview.zephr.local",
  minHeight,
  toolbar,
  flush = false
}: {
  children: ReactNode;
  address?: string;
  minHeight?: string;
  toolbar?: ReactNode;
  flush?: boolean;
}) {
  return (
    <div className="preview-browser">
      <div className="preview-browser-top">
        <div className="preview-traffic" aria-hidden>
          <span className="traffic-dot traffic-red" />
          <span className="traffic-dot traffic-yellow" />
          <span className="traffic-dot traffic-green" />
        </div>
        {/* Sidebar toggle icon */}
        <button type="button" className="preview-chrome-btn" aria-label="Toggle sidebar" tabIndex={-1}>
          <span className="ms">dock_to_left</span>
        </button>
        {/* Navigation icons */}
        <div className="preview-browser-nav" aria-hidden>
          <span className="preview-chrome-btn"><span className="ms">chevron_left</span></span>
          <span className="preview-chrome-btn"><span className="ms">chevron_right</span></span>
          <span className="preview-chrome-btn"><span className="ms">refresh</span></span>
        </div>
        {/* Address bar */}
        <div className="preview-address">
          <span className="preview-address-lock ms">lock</span>
          <span>{address}</span>
          <span className="preview-address-link ms">open_in_new</span>
        </div>
        {/* Right side actions */}
        <div className="preview-browser-actions" aria-hidden>
          <span className="preview-chrome-btn"><span className="ms">extension</span></span>
          <span className="preview-chrome-btn"><span className="ms">add</span></span>
        </div>
      </div>
      <div className="preview-surface-shell">
        {toolbar && <div className="preview-toolbar-zone">{toolbar}</div>}
        <div className={`preview-canvas${flush ? " preview-canvas--flush" : ""}`} style={minHeight ? { minHeight } : undefined}>
          {children}
        </div>
      </div>
    </div>
  );
}

function SnippetItem({ label, code, onCopy, beta }: { label: string; code: string; onCopy: () => void; beta?: boolean }) {
  return (
    <div className="snippet-item">
      <div className="snippet-item-head">
        <span className="snippet-item-label">{label}</span>
        <div className="snippet-item-actions">
          {beta ? (
            <Badge size="md" variant="stroke" color="yellow">
              Private Beta
            </Badge>
          ) : null}
          <button type="button" className="snippet-item-copy" onClick={onCopy}>Copy</button>
        </div>
      </div>
      <pre>{code}</pre>
    </div>
  );
}

function Tag({ tone = "neutral", children }: { tone?: "neutral" | "info"; children: ReactNode }) {
  return <Badge tone={tone} size="sm">{children}</Badge>;
}

/* ── Install tab block ─── */
type PkgManager = "npm" | "pnpm" | "yarn";
const PKG_INSTALL: Record<PkgManager, string> = {
  npm: "npm install",
  pnpm: "pnpm add",
  yarn: "yarn add",
};
function InstallTabBlock({
  packageName,
  onCopy,
}: {
  packageName: string;
  onCopy: (cmd: string) => void;
}) {
  const [pm, setPm] = useState<PkgManager>("npm");
  const verb = PKG_INSTALL[pm];
  const cmd = `${verb} ${packageName}`;
  return (
    <div className="itb-block">
      <div className="itb-root">
        <div className="itb-file-row">
          <div className="itb-tabrow">
            {(["npm", "pnpm", "yarn"] as PkgManager[]).map((p) => (
              <button key={p} type="button" className={`itb-tab${pm === p ? " active" : ""}`} onClick={() => setPm(p)}>
                {p}
              </button>
            ))}
          </div>
          <button type="button" className="snippet-item-copy" onClick={() => onCopy(cmd)} aria-label="Copy command">
            Copy
          </button>
        </div>
        <pre className="itb-code">
          <span className={pm === "npm" ? "itb-cmd-npm" : pm === "pnpm" ? "itb-cmd-pnpm" : "itb-cmd-yarn"}>{pm}</span>
          {" "}
          <span className="itb-cmd-verb">{pm === "npm" ? "install" : pm === "pnpm" ? "add" : "add"}</span>
          {" "}
          <span className="itb-cmd-pkg">{packageName}</span>
        </pre>
      </div>
    </div>
  );
}

/* ─── ComponentThumbnail ────────────────────────────────────────────────────
   Unique SVG mini-previews for each component in the gallery grid.
   Uses CSS variables so they adapt to light/dark mode + accent color.
────────────────────────────────────────────────────────────────────────── */
function ComponentThumbnail({ name }: { name: string }) {
  const vb = "0 0 180 80";
  const acc = "var(--accent)";
  const ln = "var(--line)";
  const mu = "var(--muted)";
  const fg = "var(--fg)";
  const ff = "system-ui,-apple-system,sans-serif";
  const ss: CSSProperties = { width: "100%", height: "80px", display: "block" };

  switch (name) {
    /* ── Atoms ──────────────────────────────────────────────────────────── */
    case "Button":
      return (
        <svg style={ss} viewBox={vb}>
          {/* Primary */}
          <rect x="14" y="22" width="72" height="28" rx="7" fill={acc} />
          <text x="50" y="40" textAnchor="middle" fill="white" fontSize="11" fontWeight="600" fontFamily={ff}>Button</text>
          {/* Secondary */}
          <rect x="94" y="22" width="72" height="28" rx="7" fill="none" stroke={ln} strokeWidth="1.5" />
          <text x="130" y="40" textAnchor="middle" fill={fg} fontSize="11" fontWeight="500" fontFamily={ff} opacity="0.6">Cancel</text>
        </svg>
      );

    case "Input":
      return (
        <svg style={ss} viewBox={vb}>
          <text x="20" y="17" fill={fg} fontSize="9" fontWeight="600" fontFamily={ff} opacity="0.55">Email</text>
          <rect x="20" y="22" width="140" height="26" rx="5" fill="none" stroke={ln} strokeWidth="1.5" />
          <rect x="32" y="31" width="60" height="7" rx="3" fill={mu} opacity="0.3" />
          <rect x="96" y="30" width="1.5" height="9" rx="1" fill={acc} />
          <text x="20" y="61" fill={acc} fontSize="8.5" fontFamily={ff} opacity="0.7">✓ Looks good!</text>
        </svg>
      );

    case "IconButton":
      return (
        <svg style={ss} viewBox={vb}>
          {/* Filled */}
          <rect x="30" y="20" width="36" height="36" rx="9" fill={acc} />
          <line x1="48" y1="30" x2="48" y2="46" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="40" y1="38" x2="56" y2="38" stroke="white" strokeWidth="2" strokeLinecap="round" />
          {/* Outlined */}
          <rect x="74" y="20" width="36" height="36" rx="9" fill="none" stroke={ln} strokeWidth="1.5" />
          <line x1="92" y1="30" x2="86" y2="46" stroke={fg} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="92" y1="30" x2="98" y2="46" stroke={fg} strokeWidth="1.5" strokeLinecap="round" />
          {/* Ghost small */}
          <rect x="118" y="24" width="28" height="28" rx="7" fill={acc} opacity="0.1" />
          <rect x="124" y="34" width="16" height="2" rx="1" fill={acc} />
          <rect x="124" y="39" width="10" height="2" rx="1" fill={acc} />
        </svg>
      );

    case "Textarea":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="18" y="10" width="144" height="56" rx="6" fill="none" stroke={ln} strokeWidth="1.5" />
          <rect x="28" y="22" width="84" height="7" rx="3" fill={mu} opacity="0.25" />
          <rect x="28" y="34" width="108" height="7" rx="3" fill={mu} opacity="0.2" />
          <rect x="28" y="46" width="64" height="7" rx="3" fill={mu} opacity="0.18" />
          <line x1="150" y1="58" x2="160" y2="48" stroke={mu} strokeWidth="1" opacity="0.4" />
          <line x1="154" y1="62" x2="164" y2="52" stroke={mu} strokeWidth="1" opacity="0.25" />
        </svg>
      );

    case "Select":
      return (
        <svg style={ss} viewBox={vb}>
          <text x="20" y="17" fill={fg} fontSize="9" fontWeight="600" fontFamily={ff} opacity="0.55">Country</text>
          <rect x="20" y="22" width="140" height="26" rx="5" fill="none" stroke={ln} strokeWidth="1.5" />
          <rect x="32" y="31" width="52" height="7" rx="3" fill={fg} opacity="0.22" />
          <line x1="140" y1="22" x2="140" y2="48" stroke={ln} strokeWidth="1" />
          <polyline points="145,33 150,38 155,33" fill="none" stroke={mu} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "Checkbox":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="24" y="14" width="18" height="18" rx="4" fill={acc} />
          <polyline points="28,23 32,27 39,18" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="52" y="17" width="66" height="7" rx="3" fill={fg} opacity="0.22" />
          <rect x="52" y="28" width="44" height="5" rx="2.5" fill={mu} opacity="0.15" />
          <rect x="24" y="42" width="18" height="18" rx="4" fill={acc} opacity="0.12" stroke={acc} strokeWidth="1.5" />
          <rect x="52" y="45" width="74" height="7" rx="3" fill={fg} opacity="0.18" />
          <rect x="52" y="56" width="50" height="5" rx="2.5" fill={mu} opacity="0.12" />
        </svg>
      );

    case "Radio":
      return (
        <svg style={ss} viewBox={vb}>
          <circle cx="35" cy="23" r="10" fill="none" stroke={acc} strokeWidth="2" />
          <circle cx="35" cy="23" r="5" fill={acc} />
          <rect x="54" y="17" width="66" height="7" rx="3" fill={fg} opacity="0.22" />
          <rect x="54" y="28" width="44" height="5" rx="2.5" fill={mu} opacity="0.15" />
          <circle cx="35" cy="53" r="10" fill="none" stroke={ln} strokeWidth="1.5" />
          <rect x="54" y="47" width="74" height="7" rx="3" fill={fg} opacity="0.18" />
          <rect x="54" y="58" width="50" height="5" rx="2.5" fill={mu} opacity="0.12" />
        </svg>
      );

    case "Switch":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="20" y="18" width="46" height="24" rx="12" fill={acc} />
          <circle cx="54" cy="30" r="10" fill="white" />
          <rect x="78" y="22" width="76" height="7" rx="3" fill={fg} opacity="0.22" />
          <rect x="78" y="34" width="52" height="5" rx="2.5" fill={mu} opacity="0.15" />
          <rect x="20" y="50" width="46" height="24" rx="12" fill={ln} />
          <circle cx="32" cy="62" r="10" fill="white" />
          <rect x="78" y="54" width="76" height="7" rx="3" fill={fg} opacity="0.18" />
          <rect x="78" y="66" width="52" height="5" rx="2.5" fill={mu} opacity="0.12" />
        </svg>
      );

    case "Badge":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="14" y="16" width="46" height="20" rx="10" fill={acc} opacity="0.15" />
          <rect x="14" y="16" width="46" height="20" rx="10" fill="none" stroke={acc} strokeWidth="1" />
          <rect x="22" y="22" width="30" height="7" rx="3" fill={acc} opacity="0.65" />
          <rect x="68" y="16" width="46" height="20" rx="10" fill="#1fc16b22" />
          <rect x="68" y="16" width="46" height="20" rx="10" fill="none" stroke="#1fc16b" strokeWidth="1" />
          <rect x="76" y="22" width="30" height="7" rx="3" fill="#1fc16b" opacity="0.65" />
          <rect x="122" y="16" width="46" height="20" rx="10" fill="#fa731922" />
          <rect x="122" y="16" width="46" height="20" rx="10" fill="none" stroke="#fa7319" strokeWidth="1" />
          <rect x="130" y="22" width="30" height="7" rx="3" fill="#fa7319" opacity="0.65" />
          <rect x="14" y="44" width="38" height="16" rx="8" fill={acc} />
          <rect x="22" y="48" width="22" height="7" rx="3" fill="white" opacity="0.8" />
          <rect x="60" y="44" width="38" height="16" rx="8" fill="#7d52f4" />
          <rect x="68" y="48" width="22" height="7" rx="3" fill="white" opacity="0.8" />
          <rect x="106" y="44" width="38" height="16" rx="8" fill="none" stroke={ln} strokeWidth="1.5" />
          <rect x="114" y="48" width="22" height="7" rx="3" fill={fg} opacity="0.2" />
        </svg>
      );

    case "Avatar":
      return (
        <svg style={ss} viewBox={vb}>
          <circle cx="42" cy="40" r="26" fill={acc} opacity="0.12" />
          <circle cx="42" cy="40" r="26" fill="none" stroke={acc} strokeWidth="1.5" />
          <text x="42" y="44" textAnchor="middle" fill={acc} fontSize="14" fontWeight="700" fontFamily={ff}>AK</text>
          <circle cx="98" cy="36" r="18" fill="#7d52f422" />
          <circle cx="98" cy="36" r="18" fill="none" stroke="#7d52f4" strokeWidth="1.5" />
          <text x="98" y="40" textAnchor="middle" fill="#7d52f4" fontSize="11" fontWeight="700" fontFamily={ff}>MJ</text>
          <circle cx="138" cy="42" r="12" fill="#1fc16b22" />
          <circle cx="138" cy="42" r="12" fill="none" stroke="#1fc16b" strokeWidth="1.5" />
          <text x="138" y="46" textAnchor="middle" fill="#1fc16b" fontSize="8" fontWeight="700" fontFamily={ff}>SA</text>
        </svg>
      );

    case "Logo":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="50" y="22" width="26" height="26" rx="7" fill={acc} />
          <text x="63" y="39" textAnchor="middle" fill="white" fontSize="14" fontWeight="800" fontFamily={ff}>Z</text>
          <text x="84" y="38" fill={fg} fontSize="16" fontWeight="700" fontFamily={ff} opacity="0.8">ephyr</text>
        </svg>
      );

    case "Card":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="14" y="8" width="152" height="64" rx="9" fill="none" stroke={ln} strokeWidth="1.5" />
          <rect x="24" y="18" width="72" height="9" rx="4" fill={fg} opacity="0.28" />
          <rect x="24" y="31" width="128" height="6" rx="3" fill={mu} opacity="0.2" />
          <rect x="24" y="41" width="110" height="6" rx="3" fill={mu} opacity="0.17" />
          <rect x="24" y="55" width="56" height="6" rx="3" fill={acc} opacity="0.4" />
        </svg>
      );

    case "Divider":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="20" y="12" width="140" height="7" rx="3" fill={mu} opacity="0.2" />
          <line x1="20" y1="40" x2="70" y2="40" stroke={ln} strokeWidth="1.5" />
          <rect x="72" y="32" width="36" height="16" rx="4" fill="none" stroke={ln} strokeWidth="1" />
          <rect x="77" y="36" width="26" height="7" rx="3" fill={mu} opacity="0.25" />
          <line x1="110" y1="40" x2="160" y2="40" stroke={ln} strokeWidth="1.5" />
          <rect x="20" y="58" width="140" height="7" rx="3" fill={mu} opacity="0.15" />
        </svg>
      );

    case "Progress":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="20" y="16" width="140" height="9" rx="4.5" fill={ln} />
          <rect x="20" y="16" width="95" height="9" rx="4.5" fill={acc} />
          <text x="161" y="24" textAnchor="end" fill={acc} fontSize="9" fontWeight="700" fontFamily={ff}>68%</text>
          <circle cx="90" cy="56" r="20" fill="none" stroke={ln} strokeWidth="5" />
          <circle cx="90" cy="56" r="20" fill="none" stroke={acc} strokeWidth="5"
            strokeDasharray="77 48" strokeLinecap="round" transform="rotate(-90 90 56)" />
          <text x="90" y="60" textAnchor="middle" fill={fg} fontSize="9" fontWeight="700" fontFamily={ff}>68%</text>
        </svg>
      );

    case "Skeleton":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="18" y="10" width="42" height="42" rx="7" fill={ln} opacity="0.55" />
          <rect x="70" y="12" width="80" height="10" rx="5" fill={ln} opacity="0.5" />
          <rect x="70" y="27" width="60" height="8" rx="4" fill={ln} opacity="0.38" />
          <rect x="18" y="58" width="144" height="9" rx="4" fill={ln} opacity="0.45" />
          <rect x="18" y="71" width="100" height="9" rx="4" fill={ln} opacity="0.3" />
        </svg>
      );

    case "Slider":
      return (
        <svg style={ss} viewBox={vb}>
          <text x="20" y="18" fill={mu} fontSize="9" fontFamily={ff}>0</text>
          <text x="160" y="18" textAnchor="end" fill={mu} fontSize="9" fontFamily={ff}>100</text>
          <text x="106" y="18" textAnchor="middle" fill={acc} fontSize="10" fontWeight="700" fontFamily={ff}>62</text>
          <rect x="20" y="36" width="140" height="6" rx="3" fill={ln} />
          <rect x="20" y="36" width="86" height="6" rx="3" fill={acc} />
          <circle cx="106" cy="39" r="11" fill="white" stroke={acc} strokeWidth="2.5" />
          <rect x="20" y="56" width="140" height="4" rx="2" fill={ln} />
          <rect x="20" y="56" width="52" height="4" rx="2" fill={acc} opacity="0.5" />
          <circle cx="72" cy="58" r="7" fill="white" stroke={acc} strokeWidth="2" opacity="0.7" />
        </svg>
      );

    case "Alert":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="14" y="10" width="152" height="24" rx="5" fill="#3b9eff" opacity="0.08" />
          <rect x="14" y="10" width="3" height="24" rx="1.5" fill="#3b9eff" />
          <circle cx="28" cy="22" r="5" fill="#3b9eff" opacity="0.35" />
          <text x="27" y="25" textAnchor="middle" fill="#3b9eff" fontSize="7" fontWeight="800" fontFamily={ff}>i</text>
          <rect x="38" y="17" width="54" height="6" rx="3" fill="#3b9eff" opacity="0.45" />
          <rect x="38" y="26" width="80" height="5" rx="2.5" fill="#3b9eff" opacity="0.28" />
          <rect x="14" y="42" width="152" height="24" rx="5" fill="#ff4d6a" opacity="0.08" />
          <rect x="14" y="42" width="3" height="24" rx="1.5" fill="#ff4d6a" />
          <circle cx="28" cy="54" r="5" fill="#ff4d6a" opacity="0.35" />
          <text x="27" y="57" textAnchor="middle" fill="#ff4d6a" fontSize="8" fontWeight="800" fontFamily={ff}>!</text>
          <rect x="38" y="49" width="48" height="6" rx="3" fill="#ff4d6a" opacity="0.45" />
          <rect x="38" y="58" width="70" height="5" rx="2.5" fill="#ff4d6a" opacity="0.28" />
        </svg>
      );

    case "Toast":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="14" y="14" width="152" height="48" rx="9" fill="none" stroke={ln} strokeWidth="1.5" />
          <circle cx="36" cy="34" r="9" fill="#1fc16b" opacity="0.18" />
          <circle cx="36" cy="34" r="9" fill="none" stroke="#1fc16b" strokeWidth="1.5" />
          <polyline points="31,34 35,38 42,28" fill="none" stroke="#1fc16b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="52" y="26" width="70" height="8" rx="4" fill={fg} opacity="0.25" />
          <rect x="52" y="39" width="92" height="6" rx="3" fill={mu} opacity="0.2" />
          <line x1="151" y1="22" x2="159" y2="30" stroke={mu} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="159" y1="22" x2="151" y2="30" stroke={mu} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case "FormField":
      return (
        <svg style={ss} viewBox={vb}>
          <text x="20" y="16" fill={fg} fontSize="9.5" fontWeight="600" fontFamily={ff} opacity="0.6">Full name</text>
          <rect x="20" y="20" width="140" height="26" rx="5" fill="none" stroke={ln} strokeWidth="1.5" />
          <rect x="32" y="29" width="68" height="7" rx="3" fill={mu} opacity="0.22" />
          <text x="20" y="60" fill="#ff4d6a" fontSize="9" fontFamily={ff}>This field is required</text>
          <rect x="157" y="24" width="3" height="14" rx="1.5" fill={acc} opacity="0.4" />
        </svg>
      );

    case "Tabs":
      return (
        <svg style={ss} viewBox={vb}>
          <text x="20" y="27" fill={acc} fontSize="11" fontWeight="600" fontFamily={ff}>Overview</text>
          <rect x="20" y="32" width="50" height="2" rx="1" fill={acc} />
          <text x="82" y="27" fill={mu} fontSize="11" fontFamily={ff}>Analytics</text>
          <text x="140" y="27" fill={mu} fontSize="11" fontFamily={ff}>Settings</text>
          <line x1="14" y1="34" x2="166" y2="34" stroke={ln} strokeWidth="1" />
          <rect x="14" y="44" width="90" height="8" rx="4" fill={fg} opacity="0.18" />
          <rect x="14" y="57" width="140" height="6" rx="3" fill={mu} opacity="0.13" />
          <rect x="14" y="68" width="110" height="6" rx="3" fill={mu} opacity="0.1" />
        </svg>
      );

    case "Dropdown":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="52" y="6" width="76" height="22" rx="5" fill="none" stroke={ln} strokeWidth="1.5" />
          <rect x="62" y="12" width="44" height="7" rx="3" fill={fg} opacity="0.2" />
          <polyline points="112,11 117,16 122,11" fill="none" stroke={mu} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="52" y="32" width="76" height="44" rx="6" fill="none" stroke={ln} strokeWidth="1.5" />
          <rect x="60" y="40" width="52" height="6" rx="3" fill={fg} opacity="0.22" />
          <rect x="60" y="51" width="52" height="6" rx="3" fill={acc} opacity="0.25" />
          <rect x="60" y="62" width="52" height="6" rx="3" fill={fg} opacity="0.18" />
          <rect x="60" y="69" width="52" height="1" rx="0.5" fill={ln} />
        </svg>
      );

    case "Tooltip":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="20" y="40" width="140" height="24" rx="6" fill={fg} opacity="0.85" />
          <rect x="30" y="47" width="70" height="6" rx="3" fill="white" opacity="0.6" />
          <rect x="30" y="57" width="50" height="5" rx="2.5" fill="white" opacity="0.35" />
          <polygon points="80,37 87,40 93,37" fill={fg} opacity="0.85" />
          <rect x="74" y="16" width="32" height="20" rx="5" fill={acc} opacity="0.15" />
          <rect x="74" y="16" width="32" height="20" rx="5" fill="none" stroke={acc} strokeWidth="1" />
          <rect x="80" y="22" width="20" height="7" rx="3" fill={acc} opacity="0.5" />
        </svg>
      );

    case "Popover":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="54" y="4" width="72" height="22" rx="5" fill={acc} opacity="0.12" />
          <rect x="54" y="4" width="72" height="22" rx="5" fill="none" stroke={acc} strokeWidth="1" />
          <rect x="64" y="10" width="52" height="7" rx="3" fill={acc} opacity="0.45" />
          <polygon points="82,26 90,30 98,26" fill="none" stroke={ln} strokeWidth="1.5" />
          <rect x="30" y="30" width="120" height="44" rx="8" fill="none" stroke={ln} strokeWidth="1.5" />
          <rect x="40" y="40" width="80" height="7" rx="3.5" fill={fg} opacity="0.22" />
          <rect x="40" y="52" width="100" height="6" rx="3" fill={mu} opacity="0.17" />
          <rect x="40" y="62" width="64" height="6" rx="3" fill={mu} opacity="0.13" />
        </svg>
      );

    case "ComboBox":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="18" y="22" width="144" height="26" rx="5" fill="none" stroke={ln} strokeWidth="1.5" />
          <rect x="30" y="30" width="52" height="8" rx="3" fill={fg} opacity="0.22" />
          <line x1="138" y1="22" x2="138" y2="48" stroke={ln} strokeWidth="1" />
          <polyline points="143,33 148,38 153,33" fill="none" stroke={mu} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="18" y="52" width="144" height="24" rx="5" fill="none" stroke={ln} strokeWidth="1" />
          <rect x="26" y="58" width="55" height="6" rx="3" fill={acc} opacity="0.22" />
          <rect x="26" y="64" width="0" height="0" />
          <rect x="87" y="56" width="55" height="6" rx="3" fill={fg} opacity="0.15" />
          <rect x="87" y="65" width="55" height="5" rx="2.5" fill={mu} opacity="0.1" />
        </svg>
      );

    /* ── Molecules ───────────────────────────────────────────────────────── */
    case "SearchBox":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="18" y="22" width="144" height="30" rx="7" fill="none" stroke={ln} strokeWidth="1.5" />
          <circle cx="40" cy="37" r="8" fill="none" stroke={mu} strokeWidth="1.5" />
          <line x1="46" y1="43" x2="52" y2="49" stroke={mu} strokeWidth="1.5" strokeLinecap="round" />
          <rect x="58" y="33" width="72" height="7" rx="3" fill={mu} opacity="0.22" />
          <rect x="138" y="31" width="16" height="11" rx="3" fill={mu} opacity="0.12" />
          <text x="146" y="40" textAnchor="middle" fill={mu} fontSize="8" fontFamily={ff}>⌘K</text>
        </svg>
      );

    case "CommandBar":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="12" y="6" width="156" height="68" rx="10" fill={fg} opacity="0.06" />
          <rect x="12" y="6" width="156" height="68" rx="10" fill="none" stroke={ln} strokeWidth="1" />
          <rect x="18" y="12" width="144" height="20" rx="5" fill={fg} opacity="0.04" />
          <circle cx="32" cy="22" r="5.5" fill="none" stroke={mu} strokeWidth="1.2" />
          <line x1="36" y1="26" x2="40" y2="30" stroke={mu} strokeWidth="1.2" strokeLinecap="round" />
          <rect x="46" y="18" width="80" height="7" rx="3" fill={mu} opacity="0.18" />
          <rect x="144" y="15" width="12" height="12" rx="3" fill={fg} opacity="0.08" />
          <text x="150" y="24" textAnchor="middle" fill={mu} fontSize="7" fontFamily={ff}>Esc</text>
          <rect x="18" y="37" width="52" height="6" rx="3" fill={acc} opacity="0.45" />
          <rect x="18" y="48" width="90" height="5" rx="2.5" fill={fg} opacity="0.14" />
          <rect x="18" y="58" width="72" height="5" rx="2.5" fill={fg} opacity="0.11" />
        </svg>
      );

    case "Pagination":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="8" y="26" width="24" height="24" rx="5" fill="none" stroke={ln} strokeWidth="1.5" />
          <polyline points="22,32 18,38 22,44" fill="none" stroke={mu} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="36" y="26" width="24" height="24" rx="5" fill="none" stroke={ln} strokeWidth="1.5" />
          <text x="48" y="42" textAnchor="middle" fill={mu} fontSize="11" fontFamily={ff}>1</text>
          <rect x="64" y="26" width="24" height="24" rx="5" fill={acc} />
          <text x="76" y="42" textAnchor="middle" fill="white" fontSize="11" fontWeight="700" fontFamily={ff}>2</text>
          <rect x="92" y="26" width="24" height="24" rx="5" fill="none" stroke={ln} strokeWidth="1.5" />
          <text x="104" y="42" textAnchor="middle" fill={mu} fontSize="11" fontFamily={ff}>3</text>
          <text x="128" y="42" textAnchor="middle" fill={mu} fontSize="14" fontFamily={ff}>…</text>
          <rect x="148" y="26" width="24" height="24" rx="5" fill="none" stroke={ln} strokeWidth="1.5" />
          <polyline points="154,32 158,38 154,44" fill="none" stroke={mu} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "Breadcrumbs":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="18" y="32" width="28" height="8" rx="4" fill={mu} opacity="0.3" />
          <text x="52" y="39" fill={mu} fontSize="13" fontFamily={ff}>/</text>
          <rect x="62" y="32" width="36" height="8" rx="4" fill={mu} opacity="0.25" />
          <text x="104" y="39" fill={mu} fontSize="13" fontFamily={ff}>/</text>
          <rect x="114" y="29" width="46" height="14" rx="5" fill={acc} opacity="0.12" />
          <rect x="116" y="32" width="42" height="8" rx="4" fill={acc} opacity="0.5" />
        </svg>
      );

    case "InputGroup":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="18" y="22" width="40" height="30" rx="5 0 0 5" fill={ln} opacity="0.4" />
          <text x="38" y="40" textAnchor="middle" fill={fg} fontSize="10" fontFamily={ff} opacity="0.55">$</text>
          <rect x="58" y="22" width="102" height="30" rx="0 5 5 0" fill="none" stroke={ln} strokeWidth="1.5" />
          <rect x="66" y="32" width="60" height="8" rx="4" fill={mu} opacity="0.22" />
          <line x1="58" y1="22" x2="58" y2="52" stroke={ln} strokeWidth="1" />
        </svg>
      );

    case "Accordion":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="14" y="6" width="152" height="22" rx="5" fill={acc} opacity="0.08" />
          <rect x="14" y="6" width="152" height="22" rx="5" fill="none" stroke={acc} strokeWidth="1" opacity="0.5" />
          <rect x="22" y="14" width="76" height="7" rx="3" fill={fg} opacity="0.28" />
          <polyline points="152,12 157,17 162,12" fill="none" stroke={acc} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="14" y="30" width="152" height="18" rx="5" fill="none" stroke={ln} strokeWidth="1" />
          <rect x="22" y="37" width="62" height="6" rx="3" fill={fg} opacity="0.2" />
          <polyline points="152,34 157,39 152,44" fill="none" stroke={mu} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="14" y="52" width="152" height="18" rx="5" fill="none" stroke={ln} strokeWidth="1" />
          <rect x="22" y="59" width="72" height="6" rx="3" fill={fg} opacity="0.17" />
          <polyline points="152,56 157,61 152,66" fill="none" stroke={mu} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "ButtonGroup":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="14" y="22" width="48" height="30" rx="6 0 0 6" fill={acc} />
          <text x="38" y="41" textAnchor="middle" fill="white" fontSize="10" fontWeight="600" fontFamily={ff}>Edit</text>
          <rect x="62" y="22" width="48" height="30" rx="0" fill={acc} opacity="0.7" />
          <line x1="62" y1="22" x2="62" y2="52" stroke="white" strokeWidth="0.75" opacity="0.3" />
          <text x="86" y="41" textAnchor="middle" fill="white" fontSize="10" fontFamily={ff}>Copy</text>
          <rect x="110" y="22" width="48" height="30" rx="0 6 6 0" fill={acc} opacity="0.5" />
          <line x1="110" y1="22" x2="110" y2="52" stroke="white" strokeWidth="0.75" opacity="0.3" />
          <text x="134" y="41" textAnchor="middle" fill="white" fontSize="10" fontFamily={ff}>Share</text>
        </svg>
      );

    case "DatePicker":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="14" y="6" width="152" height="68" rx="7" fill="none" stroke={ln} strokeWidth="1.5" />
          <rect x="14" y="6" width="152" height="18" rx="7 7 0 0" fill={acc} opacity="0.08" />
          <text x="90" y="19" textAnchor="middle" fill={fg} fontSize="9" fontWeight="600" fontFamily={ff}>March 2026</text>
          {["M","T","W","T","F","S","S"].map((d, i) => (
            <text key={`dh-${i}`} x={24+i*19} y="33" textAnchor="middle" fill={mu} fontSize="7.5" fontFamily={ff}>{d}</text>
          ))}
          {[1,2,3,4,5,6,7].map((d, i) => (
            <g key={`dr-${d}`}>
              {d === 5 && <circle cx={24+i*19} cy={47} r="8" fill={acc} />}
              <text x={24+i*19} y={50} textAnchor="middle"
                fill={d === 5 ? "white" : fg} fontSize="8" fontFamily={ff} opacity={d === 5 ? 1 : 0.6}>{d}</text>
            </g>
          ))}
          {[8,9,10,11,12,13,14].map((d, i) => (
            <text key={`dr2-${d}`} x={24+i*19} y={64} textAnchor="middle" fill={fg} fontSize="8" fontFamily={ff} opacity="0.45">{d}</text>
          ))}
        </svg>
      );

    case "ColorPicker":
      return (
        <svg style={ss} viewBox={vb}>
          {[["#ff4d6a",12],["#fa7319",36],["#f6b51e",60],["#1fc16b",84],["#3b9eff",108],["#7d52f4",132]].map(([c, x]) => (
            <circle key={c} cx={Number(x)} cy="28" r="12" fill={String(c)} />
          ))}
          <circle cx={108} cy={28} r={12} fill="none" stroke="white" strokeWidth="2.5" />
          <rect x="18" y="48" width="100" height="18" rx="4" fill="none" stroke={ln} strokeWidth="1.5" />
          <text x="28" y="61" fill={fg} fontSize="10" fontFamily={ff} opacity="0.6">#3b9eff</text>
          <rect x="126" y="48" width="36" height="18" rx="4" fill="#3b9eff" />
        </svg>
      );

    case "RichEditor":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="14" y="8" width="152" height="18" rx="5 5 0 0" fill={ln} opacity="0.35" />
          {["B","I","U","⁄","≡","≔"].map((t, i) => (
            <text key={t} x={24+i*22} y="21" fill={fg} fontSize="9.5" fontWeight={i===0?"800":i===1?"600":"400"} fontFamily={ff} fontStyle={i===1?"italic":"normal"} opacity="0.65">{t}</text>
          ))}
          <rect x="14" y="26" width="152" height="46" rx="0 0 5 5" fill="none" stroke={ln} strokeWidth="1" />
          <rect x="22" y="34" width="88" height="8" rx="4" fill={fg} opacity="0.2" />
          <rect x="22" y="47" width="120" height="6" rx="3" fill={mu} opacity="0.15" />
          <rect x="22" y="57" width="96" height="6" rx="3" fill={mu} opacity="0.12" />
        </svg>
      );

    case "NumberInput":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="18" y="24" width="144" height="28" rx="5" fill="none" stroke={ln} strokeWidth="1.5" />
          <rect x="18" y="24" width="36" height="28" rx="5 0 0 5" fill={ln} opacity="0.35" />
          <text x="36" y="42" textAnchor="middle" fill={fg} fontSize="16" fontFamily={ff} opacity="0.6">−</text>
          <text x="90" y="42" textAnchor="middle" fill={fg} fontSize="13" fontWeight="600" fontFamily={ff} opacity="0.7">42</text>
          <rect x="126" y="24" width="36" height="28" rx="0 5 5 0" fill={ln} opacity="0.35" />
          <text x="144" y="41" textAnchor="middle" fill={fg} fontSize="16" fontFamily={ff} opacity="0.6">+</text>
          <line x1="54" y1="24" x2="54" y2="52" stroke={ln} strokeWidth="1" />
          <line x1="126" y1="24" x2="126" y2="52" stroke={ln} strokeWidth="1" />
        </svg>
      );

    case "TagInput":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="14" y="18" width="152" height="40" rx="6" fill="none" stroke={ln} strokeWidth="1.5" />
          <rect x="22" y="26" width="36" height="16" rx="8" fill={acc} opacity="0.15" />
          <rect x="23" y="27" width="34" height="14" rx="7" fill="none" stroke={acc} strokeWidth="1" />
          <rect x="26" y="30" width="22" height="6" rx="3" fill={acc} opacity="0.55" />
          <rect x="66" y="26" width="42" height="16" rx="8" fill={acc} opacity="0.15" />
          <rect x="67" y="27" width="40" height="14" rx="7" fill="none" stroke={acc} strokeWidth="1" />
          <rect x="70" y="30" width="28" height="6" rx="3" fill={acc} opacity="0.55" />
          <rect x="116" y="30" width="32" height="6" rx="3" fill={mu} opacity="0.2" />
        </svg>
      );

    /* ── Organisms ──────────────────────────────────────────────────────── */
    case "Navbar":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="0" y="0" width="180" height="80" rx="0" fill={ln} opacity="0.25" />
          <rect x="14" y="28" width="18" height="18" rx="5" fill={acc} opacity="0.7" />
          <text x="18" y="40" textAnchor="middle" fill="white" fontSize="9" fontWeight="800" fontFamily={ff}>Z</text>
          <rect x="38" y="33" width="28" height="6" rx="3" fill={fg} opacity="0.2" />
          {[56, 90, 124].map(x => (
            <rect key={x} x={x} y="33" width="22" height="6" rx="3" fill={mu} opacity="0.2" />
          ))}
          <rect x="140" y="28" width="28" height="18" rx="5" fill={acc} />
          <rect x="144" y="32" width="20" height="6" rx="3" fill="white" opacity="0.75" />
        </svg>
      );

    case "Header":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="14" y="10" width="100" height="12" rx="6" fill={fg} opacity="0.28" />
          <rect x="14" y="27" width="140" height="7" rx="3" fill={mu} opacity="0.17" />
          <rect x="14" y="38" width="110" height="7" rx="3" fill={mu} opacity="0.13" />
          <rect x="14" y="54" width="70" height="22" rx="6" fill={acc} />
          <rect x="20" y="60" width="58" height="8" rx="4" fill="white" opacity="0.7" />
          <rect x="92" y="54" width="28" height="22" rx="6" fill="none" stroke={ln} strokeWidth="1.5" />
          <rect x="100" y="60" width="12" height="8" rx="4" fill={mu} opacity="0.25" />
        </svg>
      );

    case "DataTable":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="8" y="8" width="164" height="12" rx="3" fill={ln} opacity="0.4" />
          {["Name","Role","Status"].map((_, i) => (
            <rect key={i} x={10+i*55} y="10" width={48} height="8" rx="3" fill={fg} opacity="0.25" />
          ))}
          {[0,1,2].map(row => (
            <g key={row}>
              <rect x="8" y={24+row*18} width="164" height="16" rx="2"
                fill={row === 1 ? acc : "transparent"} opacity={row === 1 ? 0.07 : 1} />
              {[0,1,2].map(col => (
                <rect key={col} x={10+col*55} y={28+row*18} width={40+col*2} height="6" rx="3"
                  fill={row === 1 ? acc : fg} opacity={row === 1 ? 0.35 : 0.18} />
              ))}
            </g>
          ))}
        </svg>
      );

    case "ModalDialog":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="0" y="0" width="180" height="80" fill={fg} opacity="0.08" />
          <rect x="22" y="8" width="136" height="64" rx="10" fill="none" stroke={ln} strokeWidth="1.5" />
          <rect x="30" y="18" width="80" height="9" rx="4" fill={fg} opacity="0.28" />
          <rect x="30" y="32" width="120" height="6" rx="3" fill={mu} opacity="0.2" />
          <rect x="30" y="42" width="100" height="6" rx="3" fill={mu} opacity="0.15" />
          <rect x="70" y="56" width="36" height="13" rx="5" fill={acc} />
          <rect x="74" y="59" width="28" height="6" rx="3" fill="white" opacity="0.7" />
          <rect x="112" y="56" width="36" height="13" rx="5" fill="none" stroke={ln} strokeWidth="1" />
          <rect x="116" y="59" width="28" height="6" rx="3" fill={fg} opacity="0.18" />
        </svg>
      );

    case "SidebarNav":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="0" y="0" width="52" height="80" fill={ln} opacity="0.2" />
          <rect x="6" y="8" width="40" height="10" rx="4" fill={fg} opacity="0.22" />
          {[0,1,2,3].map(i => (
            <rect key={i} x="6" y={26+i*14} width={i===1?44:36} height="9" rx="4"
              fill={i===1?acc:mu} opacity={i===1?0.2:0.15} />
          ))}
          <rect x="60" y="8" width="108" height="9" rx="4" fill={fg} opacity="0.22" />
          <rect x="60" y="22" width="108" height="6" rx="3" fill={mu} opacity="0.15" />
          <rect x="60" y="32" width="88" height="6" rx="3" fill={mu} opacity="0.12" />
          <rect x="60" y="48" width="60" height="16" rx="5" fill={acc} />
          <rect x="66" y="52" width="48" height="7" rx="3" fill="white" opacity="0.7" />
        </svg>
      );

    case "FiltersBar":
      return (
        <svg style={ss} viewBox={vb}>
          <text x="14" y="20" fill={mu} fontSize="9" fontWeight="500" fontFamily={ff}>Filter by:</text>
          {[["All",true,14],["Design",false,40],["React",false,76],["Pro",false,108]].map(([label, active, x]) => (
            <g key={String(label)}>
              <rect x={Number(x)} y="28" width={String(label).length*7+12} height="20" rx="10"
                fill={active ? acc : "none"} opacity={active ? 1 : 1}
                stroke={active ? acc : ln} strokeWidth="1" />
              <text x={Number(x)+String(label).length*3.5+6} y="42" textAnchor="middle"
                fill={active ? "white" : mu} fontSize="9.5" fontFamily={ff}>{String(label)}</text>
            </g>
          ))}
          <rect x="14" y="55" width="152" height="1" rx="0.5" fill={ln} opacity="0.5" />
        </svg>
      );

    case "SearchResultsPanel":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="14" y="8" width="152" height="16" rx="5" fill="none" stroke={ln} strokeWidth="1.2" />
          <circle cx="26" cy="16" r="4.5" fill="none" stroke={mu} strokeWidth="1.2" />
          <rect x="34" y="12" width="60" height="6" rx="3" fill={mu} opacity="0.2" />
          {[0,1,2].map(i => (
            <g key={i}>
              <rect x="14" y={30+i*16} width="152" height="14" rx="4"
                fill={i===0?acc:"transparent"} opacity={i===0?0.07:1} />
              <rect x="20" y={34+i*16} width={80-i*10} height="6" rx="3"
                fill={i===0?acc:fg} opacity={i===0?0.45:0.2} />
              <rect x={108-i*8} y={34+i*16} width={48+i*8} height="6" rx="3"
                fill={mu} opacity="0.15" />
            </g>
          ))}
        </svg>
      );

    case "LayoutShell":
      return (
        <svg style={ss} viewBox={vb}>
          {/* Top nav */}
          <rect x="0" y="0" width="180" height="16" fill={ln} opacity="0.3" />
          {/* Sidebar */}
          <rect x="0" y="16" width="36" height="64" fill={ln} opacity="0.18" />
          <rect x="6" y="22" width="24" height="6" rx="3" fill={fg} opacity="0.2" />
          <rect x="6" y="32" width="24" height="5" rx="2.5" fill={acc} opacity="0.3" />
          <rect x="6" y="41" width="22" height="5" rx="2.5" fill={mu} opacity="0.15" />
          <rect x="6" y="50" width="22" height="5" rx="2.5" fill={mu} opacity="0.12" />
          {/* Content area */}
          <rect x="42" y="22" width="130" height="10" rx="4" fill={fg} opacity="0.2" />
          <rect x="42" y="38" width="130" height="8" rx="3" fill={ln} opacity="0.4" />
          <rect x="42" y="50" width="60" height="20" rx="4" fill={acc} opacity="0.1" />
          <rect x="108" y="50" width="64" height="20" rx="4" fill={acc} opacity="0.08" />
        </svg>
      );

    case "Sheet":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="0" y="0" width="180" height="80" fill={fg} opacity="0.06" />
          <rect x="80" y="0" width="100" height="80" fill="none" stroke={ln} strokeWidth="1.5" />
          <rect x="88" y="12" width="60" height="10" rx="4" fill={fg} opacity="0.28" />
          <rect x="88" y="28" width="84" height="6" rx="3" fill={mu} opacity="0.2" />
          <rect x="88" y="38" width="74" height="6" rx="3" fill={mu} opacity="0.16" />
          <rect x="88" y="56" width="52" height="18" rx="5" fill={acc} />
          <rect x="92" y="60" width="44" height="8" rx="4" fill="white" opacity="0.7" />
          <line x1="154" y1="14" x2="162" y2="22" stroke={mu} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="162" y1="14" x2="154" y2="22" stroke={mu} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case "AlertDialog":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="0" y="0" width="180" height="80" fill={fg} opacity="0.06" />
          <rect x="20" y="8" width="140" height="64" rx="10" fill="none" stroke={ln} strokeWidth="1.5" />
          <circle cx="90" cy="24" r="10" fill="#ff4d6a" opacity="0.15" />
          <circle cx="90" cy="24" r="10" fill="none" stroke="#ff4d6a" strokeWidth="1.5" />
          <text x="89" y="28" textAnchor="middle" fill="#ff4d6a" fontSize="12" fontWeight="800" fontFamily={ff}>!</text>
          <rect x="30" y="40" width="70" height="8" rx="4" fill={fg} opacity="0.25" />
          <rect x="30" y="52" width="60" height="20" rx="5" fill="#ff4d6a" />
          <rect x="34" y="57" width="52" height="8" rx="4" fill="white" opacity="0.7" />
          <rect x="96" y="52" width="60" height="20" rx="5" fill="none" stroke={ln} strokeWidth="1" />
          <rect x="100" y="57" width="52" height="8" rx="4" fill={fg} opacity="0.18" />
        </svg>
      );

    /* ── Layout primitives ──────────────────────────────────────────────── */
    case "Stack":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="20" y="8" width="140" height="16" rx="4" fill={acc} opacity="0.18" />
          <rect x="20" y="28" width="140" height="16" rx="4" fill={acc} opacity="0.28" />
          <rect x="20" y="48" width="140" height="16" rx="4" fill={acc} opacity="0.38" />
          <text x="90" y="19" textAnchor="middle" fill={acc} fontSize="8" fontWeight="600" fontFamily={ff}>Item 1</text>
          <text x="90" y="39" textAnchor="middle" fill={acc} fontSize="8" fontWeight="600" fontFamily={ff}>Item 2</text>
          <text x="90" y="59" textAnchor="middle" fill={acc} fontSize="8" fontWeight="600" fontFamily={ff}>Item 3</text>
        </svg>
      );

    case "Grid":
      return (
        <svg style={ss} viewBox={vb}>
          {[[10,8],[66,8],[122,8],[10,46],[66,46],[122,46]].map(([x,y],i) => (
            <rect key={i} x={x} y={y} width="48" height="26" rx="4"
              fill={acc} opacity={0.12+i*0.04} />
          ))}
        </svg>
      );

    case "Box":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="20" y="10" width="140" height="60" rx="8" fill={acc} opacity="0.08" />
          <rect x="20" y="10" width="140" height="60" rx="8" fill="none" stroke={acc} strokeWidth="1.5" strokeDasharray="5 3" />
          <rect x="36" y="26" width="70" height="9" rx="4" fill={acc} opacity="0.3" />
          <rect x="36" y="40" width="100" height="7" rx="3" fill={mu} opacity="0.2" />
        </svg>
      );

    case "Spacer":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="30" y="18" width="120" height="10" rx="4" fill={fg} opacity="0.18" />
          <line x1="30" y1="35" x2="150" y2="35" stroke={acc} strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1="30" y1="32" x2="30" y2="38" stroke={acc} strokeWidth="1.5" />
          <line x1="150" y1="32" x2="150" y2="38" stroke={acc} strokeWidth="1.5" />
          <text x="90" y="30" textAnchor="middle" fill={acc} fontSize="9" fontFamily={ff}>16px</text>
          <rect x="30" y="46" width="120" height="10" rx="4" fill={fg} opacity="0.18" />
        </svg>
      );

    /* ── Libraries ──────────────────────────────────────────────────────── */
    case "IconLibrary":
      return (
        <svg style={ss} viewBox={vb}>
          {[[14,10],[44,10],[74,10],[104,10],[134,10],
            [14,42],[44,42],[74,42],[104,42],[134,42]].map(([x,y],i) => (
            <g key={i}>
              <rect x={x} y={y} width="26" height="26" rx="6" fill={acc} opacity={0.06+i*0.012} />
              <rect x={x+5} y={y+5} width="16" height="16" rx="3" fill={acc} opacity={0.2+i*0.03} />
            </g>
          ))}
        </svg>
      );

    case "AvatarLibrary":
      return (
        <svg style={ss} viewBox={vb}>
          {["#ff4d6a","#fa7319","#f6b51e","#1fc16b","#3b9eff","#7d52f4","#ff4d6a","#1fc16b","#3b9eff","#fa7319"].map((c,i) => {
            const row = Math.floor(i / 5);
            const col = i % 5;
            return (
              <g key={i}>
                <circle cx={26+col*32} cy={22+row*32} r="13" fill={c} opacity="0.15" />
                <circle cx={26+col*32} cy={22+row*32} r="13" fill="none" stroke={c} strokeWidth="1" />
                <text x={26+col*32} y={26+row*32} textAnchor="middle" fill={c} fontSize="8" fontWeight="700" fontFamily={ff}>
                  {["AK","MJ","SA","LT","IS","NK","EL","DR","PR","CW"][i]}
                </text>
              </g>
            );
          })}
        </svg>
      );

    case "LogoLibrary":
      return (
        <svg style={ss} viewBox={vb}>
          {[[14,10],[60,10],[106,10],[14,46],[60,46],[106,46]].map(([x,y],i) => (
            <g key={i}>
              <rect x={x} y={y} width="40" height="24" rx="5" fill={ln} opacity="0.35" />
              <rect x={x+5} y={y+7} width="30" height="9" rx="3" fill={mu} opacity="0.35" />
            </g>
          ))}
        </svg>
      );

    /* ── Page templates ─────────────────────────────────────────────────── */
    case "DashboardPage":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="0" y="0" width="180" height="14" fill={fg} opacity="0.1" />
          <rect x="0" y="14" width="38" height="66" fill={fg} opacity="0.06" />
          {[0,1,2,3].map(i => <rect key={i} x="6" y={20+i*12} width="26" height="7" rx="3" fill={mu} opacity="0.2" />)}
          {[0,1].map(col => [0,1].map(row => (
            <rect key={`${col}-${row}`} x={44+col*68} y={20+row*28} width="60" height="22" rx="5"
              fill={acc} opacity={0.06+col*0.04+row*0.04} />
          )))}
          <rect x="44" y="56" width="128" height="20" rx="5" fill={ln} opacity="0.35" />
          {[0,1,2,3].map(i => <rect key={i} x={50+i*30} y="60" width="24" height="10" rx="3" fill={fg} opacity="0.15" />)}
        </svg>
      );

    case "AuthPage":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="0" y="0" width="90" height="80" fill={acc} opacity="0.06" />
          <rect x="20" y="28" width="50" height="10" rx="4" fill={acc} opacity="0.35" />
          <rect x="20" y="44" width="42" height="7" rx="3" fill={mu} opacity="0.2" />
          <rect x="20" y="56" width="52" height="7" rx="3" fill={mu} opacity="0.15" />
          <rect x="96" y="14" width="74" height="52" rx="6" fill="none" stroke={ln} strokeWidth="1.2" />
          <rect x="104" y="22" width="58" height="8" rx="3" fill={fg} opacity="0.2" />
          <rect x="104" y="34" width="58" height="10" rx="4" fill="none" stroke={ln} strokeWidth="1" />
          <rect x="104" y="48" width="58" height="10" rx="4" fill={acc} />
          <rect x="108" y="51" width="50" height="6" rx="3" fill="white" opacity="0.7" />
        </svg>
      );

    case "SettingsPage":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="8" y="8" width="164" height="10" rx="4" fill={fg} opacity="0.22" />
          <rect x="8" y="22" width="38" height="54" rx="5" fill={ln} opacity="0.25" />
          {[0,1,2,3].map(i => <rect key={i} x="14" y={28+i*12} width="26" height="6" rx="3" fill={mu} opacity={i===0?0.35:0.18} />)}
          <rect x="52" y="22" width="120" height="54" rx="5" fill="none" stroke={ln} strokeWidth="1.2" />
          <rect x="60" y="30" width="60" height="7" rx="3" fill={fg} opacity="0.22" />
          <rect x="60" y="42" width="104" height="10" rx="4" fill="none" stroke={ln} strokeWidth="1" />
          <rect x="60" y="57" width="44" height="14" rx="5" fill={acc} />
          <rect x="64" y="61" width="36" height="6" rx="3" fill="white" opacity="0.7" />
        </svg>
      );

    case "OnboardingPage":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="0" y="0" width="70" height="80" fill={fg} opacity="0.08" />
          <rect x="8" y="12" width="16" height="16" rx="4" fill={acc} />
          <rect x="8" y="34" width="54" height="5" rx="2.5" fill={mu} opacity="0.2" />
          <rect x="8" y="43" width="54" height="5" rx="2.5" fill={mu} opacity="0.15" />
          <rect x="8" y="52" width="40" height="5" rx="2.5" fill={mu} opacity="0.12" />
          <rect x="76" y="12" width="96" height="10" rx="4" fill={fg} opacity="0.22" />
          <rect x="76" y="28" width="96" height="7" rx="3" fill={mu} opacity="0.18" />
          <rect x="76" y="40" width="80" height="7" rx="3" fill={mu} opacity="0.15" />
          <rect x="76" y="58" width="56" height="16" rx="5" fill={acc} />
          <rect x="80" y="62" width="48" height="7" rx="3" fill="white" opacity="0.7" />
        </svg>
      );

    case "MarketingPage":
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="0" y="0" width="180" height="80" fill={fg} opacity="0.05" />
          <rect x="0" y="0" width="180" height="14" fill={fg} opacity="0.1" />
          <rect x="12" y="4" width="18" height="6" rx="3" fill={fg} opacity="0.3" />
          <rect x="140" y="3" width="32" height="8" rx="4" fill={acc} />
          <rect x="40" y="22" width="100" height="10" rx="4" fill={fg} opacity="0.25" />
          <rect x="52" y="36" width="76" height="7" rx="3" fill={mu} opacity="0.18" />
          <rect x="54" y="50" width="34" height="16" rx="5" fill={acc} />
          <rect x="94" y="50" width="34" height="16" rx="5" fill="none" stroke={ln} strokeWidth="1.5" />
        </svg>
      );

    /* ── Default fallback ────────────────────────────────────────────────── */
    default:
      return (
        <svg style={ss} viewBox={vb}>
          <rect x="58" y="24" width="64" height="32" rx="8" fill={acc} opacity="0.12" />
          <rect x="58" y="24" width="64" height="32" rx="8" fill="none" stroke={acc} strokeWidth="1.5" />
          <rect x="70" y="34" width="40" height="6" rx="3" fill={acc} opacity="0.45" />
          <rect x="76" y="44" width="28" height="5" rx="2.5" fill={acc} opacity="0.3" />
        </svg>
      );
  }
}

export default function App() {
  const initial = fromSearchParams();

  const stylePack: StylePackName = "stripe";
  const surfaceStyle: SurfaceStyleOption = "shadow";
  const [accentColor, setAccentColor] = useState(initial.accentColor);
  const [accentDraft, setAccentDraft] = useState(initial.accentColor);
  const [view, setView] = useState<WorkspaceView>(initial.view);
  const [showcaseVersion, setShowcaseVersion] = useState<ShowcaseVersion>(initial.showcaseVersion);
  const [topTab, setTopTab] = useState<TopTab>(() => getTopTabForView(initial.view));
  const [activeRegistryId, setActiveRegistryId] = useState(initial.componentId);
  const [catalogSearch, setCatalogSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchActiveIndex, setSearchActiveIndex] = useState(0);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    () => new Set(["atom", "molecule", "organism"])
  );
  const [setupTab, setSetupTab] = useState<"npm" | "pnpm" | "cli" | "ai">("npm");
  const [aiTool, setAiTool] = useState<AiToolKey>("codex");
  const [aiProject, setAiProject] = useState<AiProjectPreset>("vite-react");
  const [framework, setFramework] = useState<"nextjs" | "nextjs-app" | "react" | "remix" | "sveltekit" | "vue" | "nuxt" | "astro" | "html" | "other">("nextjs");
  const [packageManager, setPackageManager] = useState<"npm" | "pnpm" | "yarn" | "bun">("pnpm");
  const [aiPackageManager, setAiPackageManager] = useState<AiPackageManager>("npm");
  const [componentUseMode, setComponentUseMode] = useState<"prompt" | "code">("prompt");

  const [cloudApiKey, setCloudApiKey] = useState<string>(() =>
    typeof window !== "undefined" ? sessionStorage.getItem("zephr-cloud-api-key") ?? "" : ""
  );
  const [cloudApiKeyDraft, setCloudApiKeyDraft] = useState<string>(() =>
    typeof window !== "undefined" ? sessionStorage.getItem("zephr-cloud-api-key") ?? "" : ""
  );
  const [iconQuery, setIconQuery] = useState("settings");
  const [iconStyleVariant, setIconStyleVariant] = useState<MaterialIconStyle>("filled");
  const [avatarQuery, setAvatarQuery] = useState("");
  const [avatarSeed, setAvatarSeed] = useState("zephr");
  const [logoQuery, setLogoQuery] = useState("developer");
  const [iconCloudResults, setIconCloudResults] = useState<MaterialIconDefinition[] | undefined>(undefined);
  const [avatarCloudResults, setAvatarCloudResults] = useState<AvatarStyleDefinition[] | undefined>(undefined);
  const [logoCloudResults, setLogoCloudResults] = useState<LogoCatalogEntry[] | undefined>(undefined);
  const [iconCloudState, setIconCloudState] = useState<CloudAssetState>(() =>
    defaultCloudAssetState("Using local icon catalog. Add API key to use cloud sync.")
  );
  const [avatarCloudState, setAvatarCloudState] = useState<CloudAssetState>(() =>
    defaultCloudAssetState("Using local avatar styles. Add API key to use cloud sync.")
  );
  const [logoCloudState, setLogoCloudState] = useState<CloudAssetState>(() =>
    defaultCloudAssetState("Using local logo catalog. Add API key to use cloud sync.")
  );

  const pageWidgetNavItems = useMemo(() => (
    showcaseVersion === "v2"
      ? widgetCatalogMeta.filter((item) => widgetsV2CatalogIds.includes(item.id as (typeof widgetsV2CatalogIds)[number]))
      : widgetCatalogMeta
  ), [showcaseVersion]);

  const pageTemplateNavItems = useMemo(() => (
    showcaseVersion === "v2"
      ? templateCatalogMeta.filter((item) => templatesV2CatalogIds.includes(item.id as (typeof templatesV2CatalogIds)[number]))
      : templateCatalogMeta
  ), [showcaseVersion]);

  const [intentText] = useState(() => getDefaultIntent(initial.componentId));

  const [buttonLabel, setButtonLabel] = useState("Launch Campaign");
  const [buttonVariant, setButtonVariant] = useState<"primary" | "secondary" | "ghost" | "danger">(
    "primary"
  );
  const [buttonSize, setButtonSize] = useState<"sm" | "md" | "lg">("md");
  const [previewState, setPreviewState] = useState<PreviewStateKey>("default");
  const [previewProps, setPreviewProps] = useState<Record<string, string>>({});

  // Button variant grid filters
  const [btnFilterType, setBtnFilterType] = useState<"all" | "primary" | "secondary" | "ghost" | "danger">("all");
  const [btnFilterSize, setBtnFilterSize] = useState<"all" | "sm" | "md" | "lg">("all");
  const [btnFilterState, setBtnFilterState] = useState<"all" | "default" | "hover" | "pressed" | "loading" | "disabled">("all");
  const [btnOnlyIcon, setBtnOnlyIcon] = useState(false);
  const [buttonGroupQuantity, setButtonGroupQuantity] = useState<ButtonGroupQuantityOption>(6);
  const [buttonGroupSize, setButtonGroupSize] = useState<ButtonGroupSizeOption>("sm");
  const [buttonGroupActiveIndex, setButtonGroupActiveIndex] = useState(0);
  const [buttonGroupDisabled, setButtonGroupDisabled] = useState(false);
  const [switchPattern, setSwitchPattern] = useState<SwitchPatternOption>("switch");
  const [switchState, setSwitchState] = useState<SwitchStateOption>("default");
  const [switchActive, setSwitchActive] = useState(false);
  const [switchSize, setSwitchSize] = useState<"sm" | "md">("sm");
  const [switchCardType, setSwitchCardType] = useState<SwitchCardTypeOption>("basic");
  const [switchShowSublabel, setSwitchShowSublabel] = useState(true);
  const [switchShowBadge, setSwitchShowBadge] = useState(true);
  const [accordionState, setAccordionState] = useState<AccordionStateOption>("default");
  const [accordionFlipIcon, setAccordionFlipIcon] = useState(false);
  const [tooltipType, setTooltipType] = useState<TooltipTypeOption>("top-left");
  const [tooltipSize, setTooltipSize] = useState<TooltipSizeOption>("large");
  const [tooltipTone, setTooltipTone] = useState<TooltipToneOption>("light");
  const [tooltipTail, setTooltipTail] = useState(true);
  const [tooltipLeftIcon, setTooltipLeftIcon] = useState(true);
  const [tooltipDismissible, setTooltipDismissible] = useState(true);
  const [tooltipVisible, setTooltipVisible] = useState(true);
  const [alertSeverity, setAlertSeverity] = useState<AlertSeverityOption>("red");
  const [alertSize, setAlertSize] = useState<AlertSizeOption>("small");
  const [alertStyle, setAlertStyle] = useState<AlertStyleOption>("solid");
  const [alertDismissible, setAlertDismissible] = useState(true);
  const [datePickerMode, setDatePickerMode] = useState<DatePickerModeOption>("single");
  const [datePickerShowTimeFilters, setDatePickerShowTimeFilters] = useState(true);
  const [datePickerShowFooter, setDatePickerShowFooter] = useState(true);
  const [paginationType, setPaginationType] = useState<PaginationTypeOption>("basic");
  const [paginationShowFirstLast, setPaginationShowFirstLast] = useState(true);
  const [paginationShowPrevNext, setPaginationShowPrevNext] = useState(true);
  const [paginationShowAdvanced, setPaginationShowAdvanced] = useState(true);
  const [paginationPageSize, setPaginationPageSize] = useState(7);
  const [progressVariant, setProgressVariant] = useState<ProgressVariantOption>("line-label");
  const [progressTone, setProgressTone] = useState<ProgressToneOption>("primary");
  const [progressLineSize, setProgressLineSize] = useState<ProgressLineSizeOption>("md");
  const [progressCircleSize, setProgressCircleSize] = useState<ProgressCircleSizeOption>(64);
  const [progressValue, setProgressValue] = useState<0 | 25 | 50 | 75 | 100>(75);
  const [progressShowValue, setProgressShowValue] = useState(true);
  const [progressLabelPlacement, setProgressLabelPlacement] = useState<ProgressLabelPlacementOption>("top");
  const [progressShowDescription, setProgressShowDescription] = useState(true);
  const [progressShowAction, setProgressShowAction] = useState(true);
  const [richEditorVariant, setRichEditorVariant] = useState<RichEditorVariantOption>("01");
  const [richEditorShowMore, setRichEditorShowMore] = useState(true);
  const [richEditorDisabled, setRichEditorDisabled] = useState(false);
  const [colorPickerFormat, setColorPickerFormat] = useState<ColorPickerFormatOption>("hex");
  const [colorPickerShowRecommended, setColorPickerShowRecommended] = useState(true);
  const [colorPickerDisabled, setColorPickerDisabled] = useState(false);
  const [badgeType, setBadgeType] = useState<BadgeTypeOption>("basic");
  const [badgeStyle, setBadgeStyle] = useState<BadgeStyleOption>("filled");
  const [badgeColor, setBadgeColor] = useState<BadgeColorOption>("gray");
  const [badgeSize, setBadgeSize] = useState<"sm" | "md">("sm");
  const [badgeNumber, setBadgeNumber] = useState(false);
  const [badgeDisabled, setBadgeDisabled] = useState(false);
  const [dividerOrientation, setDividerOrientation] = useState<DividerOrientationOption>("horizontal");
  const [dividerStroke, setDividerStroke] = useState<DividerStrokeOption>("solid");
  const [dividerLabel, setDividerLabel] = useState<DividerLabelOption>("none");
  const [dividerInset, setDividerInset] = useState<DividerInsetOption>("none");
  const [dividerThickness, setDividerThickness] = useState<1 | 2 | 3>(1);

  const [toastMessage, setToastMessage] = useState("");
  const toastTimeoutRef = useRef<number | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [gallerySearch, setGallerySearch] = useState('');
  const [galleryCat, setGalleryCat] = useState<'all' | 'atom' | 'molecule' | 'organism'>('all');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const searchPanelRef = useRef<HTMLDivElement | null>(null);
  const leftRailRef = useRef<HTMLDivElement | null>(null);
  const [sidebarIndicator, setSidebarIndicator] = useState({ top: 0, height: 20, opacity: 0 });
  const setupTabsRef = useRef<HTMLDivElement | null>(null);
  const [setupIndicator, setSetupIndicator] = useState({ left: 0, width: 0, opacity: 0 });
  const rightRailRef = useRef<HTMLDivElement | null>(null);
  const [tocIndicator, setTocIndicator] = useState({ top: 0, height: 0, opacity: 0 });

  useEffect(() => {
    const rail = leftRailRef.current;
    if (!rail) return;

    let raf = 0;
    const updateIndicator = () => {
      if (!rail) return;
      const active = rail.querySelector<HTMLElement>(".sidebar-link.is-active, .component-link.is-active");
      if (!active) {
        setSidebarIndicator((prev) => ({ ...prev, opacity: 0 }));
        return;
      }
      const railRect = rail.getBoundingClientRect();
      const activeRect = active.getBoundingClientRect();
      const height = Math.min(20, activeRect.height);
      const top = activeRect.top - railRect.top + rail.scrollTop + (activeRect.height - height) / 2;
      setSidebarIndicator({ top, height, opacity: 1 });
    };

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateIndicator);
    };

    schedule();
    rail.addEventListener("scroll", schedule);
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(raf);
      rail.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [topTab, view, activeRegistryId, catalogSearch, mobileNavOpen, showcaseVersion, pageWidgetNavItems.length, pageTemplateNavItems.length]);

  useEffect(() => {
    const tabs = setupTabsRef.current;
    if (!tabs) return;
    let raf = 0;
    const update = () => {
      const active = tabs.querySelector<HTMLElement>(".setup-inner-tab.is-active");
      if (!active) {
        setSetupIndicator((prev) => ({ ...prev, opacity: 0 }));
        return;
      }
      const parentRect = tabs.getBoundingClientRect();
      const activeRect = active.getBoundingClientRect();
      const left = activeRect.left - parentRect.left;
      const width = activeRect.width;
      setSetupIndicator({ left, width, opacity: 1 });
    };
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", schedule);
    };
  }, [setupTab]);

  // ── TOC active link tracker ──────────────────────────────────
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));
    if (!sections.length) return;

    let activeId = "";

    const markActive = (id: string) => {
      if (id === activeId) return;
      activeId = id;
      document.querySelectorAll<HTMLAnchorElement>("a.toc-link").forEach(a => {
        const href = a.getAttribute("href");
        const matches = href === `#${id}`;
        a.classList.toggle("is-active", matches);
      });
      const rail = rightRailRef.current;
      if (!rail) return;
      const activeLink = rail.querySelector<HTMLAnchorElement>(`a.toc-link[href="#${id}"]`);
      if (!activeLink) {
        setTocIndicator((prev) => ({ ...prev, opacity: 0 }));
        return;
      }
      const railRect = rail.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      const top = linkRect.top - railRect.top + rail.scrollTop;
      setTocIndicator({
        top,
        height: linkRect.height,
        opacity: 1
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        // Find topmost visible section
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          markActive((visible[0].target as HTMLElement).id);
        }
      },
      { rootMargin: "-10% 0px -70% 0px", threshold: 0 }
    );

    sections.forEach(s => observer.observe(s));
    // Mark first section as active on mount
    if (sections[0]?.id) markActive(sections[0].id);

    return () => observer.disconnect();
  }, [view, topTab]);


  const expandedColorPalettes = useMemo(
    () => buildExpandedColorPalettes(stylePack, accentColor),
    [stylePack, accentColor]
  );
  const previewThemeCss = useMemo(
    () => buildPreviewThemeCss(stylePack, accentColor, surfaceStyle, expandedColorPalettes),
    [stylePack, accentColor, expandedColorPalettes]
  );
  const globalThemeCss = useMemo(
    () => buildGlobalThemeCss(stylePack, accentColor, surfaceStyle, expandedColorPalettes),
    [stylePack, accentColor, expandedColorPalettes]
  );
  const configSnippet = useMemo(() => {
    return [
      `export default {`,
      `  tokens: {`,
      `    color: {`,
      `      primary: "${accentColor}",`,
      `      accent: "${accentColor}",`,
      `      primaryContrast: "${accentTextColor(accentColor)}"`,
      `    }`,
      `  }`,
      `};`
    ].join("\n");
  }, [accentColor]);
  const cloudBaseUrl = (import.meta.env.VITE_ZEPHR_CLOUD_URL as string | undefined)?.trim() || "http://localhost:8787";
  const cloudClient = useMemo(() => {
    const key = cloudApiKey.trim();
    if (!key) {
      return null;
    }
    return new ZephrCloudClient({
      baseUrl: cloudBaseUrl,
      apiKey: key
    });
  }, [cloudApiKey, cloudBaseUrl]);

  const aiProjectInitCommand = useMemo(
    () => managerProjectInitCommand(aiProject, aiPackageManager),
    [aiPackageManager, aiProject]
  );
  const aiInstallCommand = useMemo(
    () => managerInstallCommand(aiPackageManager, ["@zephrui/ui-react"]),
    [aiPackageManager]
  );
  const aiCloudInstallCommand = useMemo(
    () => managerInstallCommand(aiPackageManager, ["@zephrui/cloud-sdk"]),
    [aiPackageManager]
  );
  const aiContextPath = useMemo(() => aiContextFile(aiTool), [aiTool]);
  const aiContextSnippet = useMemo(() => {
    const assistantLabel = aiToolLabels[aiTool];
    return [
      `# ${assistantLabel} workspace instructions`,
      "",
      "- Use Zephr UI components from `@zephrui/ui-react`.",
      "- Use Zephr's default premium visual system.",
      `- Accent color: ${accentColor}.`,
      "- Prefer semantic component props over one-off style overrides.",
      "- Keep accessibility labels for icon-only and form controls."
    ].join("\n");
  }, [accentColor, aiTool]);
  const aiPromptSnippet = useMemo(() => {
    const assistantLabel = aiToolLabels[aiTool];
    return [
      `Set up Zephr UI in this ${aiProjectLabels[aiProject]} project.`,
      `Assistant target: ${assistantLabel}`,
      "",
      "Steps:",
      `1. Create app: ${aiProjectInitCommand}`,
      `2. Install Zephr: ${aiInstallCommand}`,
      "3. Import components from `@zephrui/ui-react`.",
      `4. Set accent to "${accentColor}".`,
      "5. Keep generated code accessible and production-ready."
    ].join("\n");
  }, [accentColor, aiInstallCommand, aiProject, aiProjectInitCommand, aiTool]);

  const foundationColorGroups = useMemo(() => {
    const lightPalette = expandedColorPalettes.light;
    const darkPalette = expandedColorPalettes.dark;

    return colorTokenGroups
      .map((group) => {
        const tokens = group.tokens
          .filter((token) => Boolean(lightPalette[token] || darkPalette[token]))
          .map((token) => {
            const light = lightPalette[token] ?? darkPalette[token];
            const dark = darkPalette[token] ?? light;
            return {
              token,
              variable: `--z-color-${token}`,
              light,
              dark,
              activeColor: darkMode ? dark : light
            };
          });

        return {
          ...group,
          tokens
        };
      })
      .filter((group) => group.tokens.length > 0);
  }, [expandedColorPalettes, darkMode]);

  useEffect(() => {
    setAccentDraft(accentColor);
  }, [accentColor]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    sessionStorage.setItem("zephr-accent-color", accentColor);
  }, [accentColor]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    sessionStorage.setItem("zephr-showcase-version", showcaseVersion);
  }, [showcaseVersion]);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current !== null) {
        window.clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    updateSearchParams(activeRegistryId, accentColor, view, showcaseVersion);
  }, [accentColor, activeRegistryId, showcaseVersion, view]);

  useEffect(() => {
    const config = previewStateConfig[activeRegistryId];
    const firstState = config?.options[0]?.value ?? "default";
    setPreviewState(firstState);
    setPreviewProps({});
  }, [activeRegistryId]);

  useEffect(() => {
    setComponentUseMode("prompt");
  }, [activeRegistryId, view]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent): void {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
        setSearchFocused(true);
      }

      if (event.key === "Escape") {
        setSearchFocused(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!searchFocused) {
      return;
    }

    function onPointerDown(event: MouseEvent): void {
      if (!searchPanelRef.current) {
        return;
      }
      if (!searchPanelRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
    }

    window.addEventListener("mousedown", onPointerDown);
    return () => window.removeEventListener("mousedown", onPointerDown);
  }, [searchFocused]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (cloudApiKey.trim()) {
      sessionStorage.setItem("zephr-cloud-api-key", cloudApiKey.trim());
    } else {
      sessionStorage.removeItem("zephr-cloud-api-key");
    }
  }, [cloudApiKey]);

  useEffect(() => {
    let cancelled = false;
    if (activeRegistryId !== "icon-library") {
      return;
    }
    if (!cloudClient) {
      setIconCloudResults(undefined);
      setIconCloudState(defaultCloudAssetState("Using local icon catalog. Add API key to use cloud sync."));
      return;
    }

    setIconCloudState({
      source: "cloud",
      loading: true,
      message: "Syncing icons from cloud catalog..."
    });

    cloudClient.searchIcons({ query: iconQuery, limit: 84, style: iconStyleVariant })
      .then((response) => {
        if (cancelled) {
          return;
        }
        setIconCloudResults(response.items as MaterialIconDefinition[]);
        setIconCloudState({
          source: "cloud",
          loading: false,
          message: `${response.items.length} icon results from cloud`
        });
      })
      .catch((error) => {
        if (cancelled) {
          return;
        }
        setIconCloudResults(undefined);
        setIconCloudState({
          source: "fallback",
          loading: false,
          message: parseCloudError("icons", error)
        });
      });

    return () => {
      cancelled = true;
    };
  }, [activeRegistryId, cloudClient, iconQuery, iconStyleVariant]);

  useEffect(() => {
    let cancelled = false;
    if (activeRegistryId !== "avatar-library") {
      return;
    }
    if (!cloudClient) {
      setAvatarCloudResults(undefined);
      setAvatarCloudState(defaultCloudAssetState("Using local avatar styles. Add API key to use cloud sync."));
      return;
    }

    setAvatarCloudState({
      source: "cloud",
      loading: true,
      message: "Syncing avatar styles from cloud catalog..."
    });

    cloudClient.listAvatarStyles({ query: avatarQuery, limit: 24 })
      .then((response) => {
        if (cancelled) {
          return;
        }
        const mapped = response.items.map((item) => ({
          ...item,
          id: item.id as AvatarStyleDefinition["id"]
        }));
        setAvatarCloudResults(mapped);
        setAvatarCloudState({
          source: "cloud",
          loading: false,
          message: `${mapped.length} avatar styles from cloud`
        });
      })
      .catch((error) => {
        if (cancelled) {
          return;
        }
        setAvatarCloudResults(undefined);
        setAvatarCloudState({
          source: "fallback",
          loading: false,
          message: parseCloudError("avatars", error)
        });
      });

    return () => {
      cancelled = true;
    };
  }, [activeRegistryId, avatarQuery, cloudClient]);

  useEffect(() => {
    let cancelled = false;
    if (activeRegistryId !== "logo-library") {
      return;
    }
    if (!cloudClient) {
      setLogoCloudResults(undefined);
      setLogoCloudState(defaultCloudAssetState("Using local logo catalog. Add API key to use cloud sync."));
      return;
    }

    setLogoCloudState({
      source: "cloud",
      loading: true,
      message: "Syncing logos from cloud catalog..."
    });

    cloudClient.searchLogos({ query: logoQuery, limit: 180 })
      .then((response) => {
        if (cancelled) {
          return;
        }
        setLogoCloudResults(response.items as LogoCatalogEntry[]);
        setLogoCloudState({
          source: "cloud",
          loading: false,
          message: `${response.items.length} logos from cloud`
        });
      })
      .catch((error) => {
        if (cancelled) {
          return;
        }
        setLogoCloudResults(undefined);
        setLogoCloudState({
          source: "fallback",
          loading: false,
          message: parseCloudError("logos", error)
        });
      });

    return () => {
      cancelled = true;
    };
  }, [activeRegistryId, cloudClient, logoQuery]);

  const catalog = useMemo(() => {
    const normalized = catalogSearch.trim().toLowerCase();
    // Always exclude templates from the flat catalog list — they live in the Templates nav
    const components = registry.filter((e) => e.category !== "template");
    if (!normalized) return components;
    return components.filter((entry) =>
      entry.id.toLowerCase().includes(normalized) ||
      entry.name.toLowerCase().includes(normalized) ||
      entry.description.toLowerCase().includes(normalized)
    );
  }, [catalogSearch]);

  const searchResults = useMemo<SearchResultItem[]>(() => {
    const normalized = catalogSearch.trim().toLowerCase();
    if (!normalized) {
      return [];
    }

    const docTargets: SearchResultItem[] = [
      {
        id: "doc-setup-introduction",
        kind: "doc",
        label: "Introduction",
        detail: "Setup",
        tab: "setup",
        view: "introduction",
        anchor: "setup-introduction"
      },
      {
        id: "doc-setup-start",
        kind: "doc",
        label: "Get Started",
        detail: "Setup",
        tab: "setup",
        view: "getting-started",
        anchor: "overview"
      },
      {
        id: "doc-setup-speed-insights",
        kind: "doc",
        label: "Speed Insights",
        detail: "Setup",
        tab: "setup",
        view: "speed-insights",
        anchor: "overview"
      },
      {
        id: "doc-setup-foundations",
        kind: "doc",
        label: "Foundations",
        detail: "Setup",
        tab: "setup",
        view: "foundations",
        anchor: "foundations-overview"
      },
      {
        id: "doc-pages-templates",
        kind: "doc",
        label: "Page Templates",
        detail: "Pages",
        tab: "pages",
        view: "templates",
        anchor: "templates-overview"
      },
      {
        id: "doc-pages-widgets",
        kind: "doc",
        label: "Widgets",
        detail: "Pages",
        tab: "pages",
        view: "widgets",
        anchor: "widgets-overview"
      },
      {
        id: "doc-components-api",
        kind: "doc",
        label: "API Reference",
        detail: "Components",
        tab: "components",
        view: "api-reference",
        anchor: "api-overview"
      },
      {
        id: "doc-changelog",
        kind: "doc",
        label: "Release notes",
        detail: "Change Log",
        tab: "changelog",
        view: "introduction",
        anchor: "changelog-overview"
      },
      {
        id: "doc-changelog-migration",
        kind: "doc",
        label: "Migration 0.1 to 0.2",
        detail: "Change Log",
        tab: "changelog",
        view: "introduction",
        anchor: "migration-0-1-to-0-2"
      }
    ];

    const docMatches = docTargets.filter((item) =>
      `${item.label} ${item.detail}`.toLowerCase().includes(normalized)
    );

    const componentMatches = registry
      .filter((entry) => entry.category !== "template")
      .filter((entry) =>
        entry.id.toLowerCase().includes(normalized) ||
        entry.name.toLowerCase().includes(normalized) ||
        entry.description.toLowerCase().includes(normalized)
      )
      .slice(0, 10)
      .map<SearchResultItem>((entry) => ({
        id: `component-${entry.id}`,
        kind: "component",
        label: entry.name,
        detail: `${entry.category} component`,
        tab: "components",
        view: "components",
        componentId: entry.id
      }));

    return [...docMatches, ...componentMatches].slice(0, 10);
  }, [catalogSearch]);

  useEffect(() => {
    setSearchActiveIndex(0);
  }, [catalogSearch, searchResults.length]);

  function showToast(message: string): void {
    setToastMessage(message);
    if (toastTimeoutRef.current !== null) {
      window.clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = window.setTimeout(() => {
      setToastMessage("");
      toastTimeoutRef.current = null;
    }, 2200);
  }

  function saveCloudApiKey(): void {
    const next = cloudApiKeyDraft.trim();
    setCloudApiKey(next);
    if (next) {
      showToast("Cloud API key saved");
    } else {
      showToast("Cloud API key cleared");
    }
  }

  function clearCloudApiKey(): void {
    setCloudApiKey("");
    setCloudApiKeyDraft("");
    showToast("Cloud key removed. Using local fallback.");
  }

  function activateTopTab(tab: TopTab): void {
    setTopTab(tab);
    if (tab === "setup") {
      setView("introduction");
      return;
    }
    if (tab === "components") {
      setView("component-gallery");
      return;
    }
    if (tab === "pages") {
      setView("widgets");
      return;
    }
  }

  function navigateToSearchResult(result: SearchResultItem): void {
    if (result.kind === "component" && result.componentId) {
      selectComponent(result.componentId, "components");
    } else {
      setTopTab(result.tab);
      if (result.tab !== "changelog") {
        setView(result.view);
      }
      setMobileNavOpen(false);
    }
    setCatalogSearch("");
    setSearchFocused(false);
    setSearchActiveIndex(0);

    if (typeof window !== "undefined" && result.anchor) {
      window.setTimeout(() => {
        const node = document.getElementById(result.anchor!);
        if (node) {
          node.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 40);
    }
  }

  function selectComponent(id: string, nextView: "components" | "api-reference" = view === "api-reference" ? "api-reference" : "components") {
    const entry = registry.find((e) => e.id === id);
    if (!entry) return;
    setActiveRegistryId(id);
    setView(nextView);
    setTopTab("components");
    setMobileNavOpen(false);
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      next.add(entry.category);
      return next;
    });
  }

  function toggleGroup(cat: string) {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }

  const selectedEntry = useMemo(
    () => registry.find((entry) => entry.id === activeRegistryId) ?? registry[0],
    [activeRegistryId]
  );
  const selectedPreviewStateConfig = previewStateConfig[selectedEntry.id];
  const apiPropRows = useMemo(() => getComponentPropsTable(selectedEntry), [selectedEntry]);

  const TOOLBAR_SPECIAL_CASED_IDS = new Set([
    "button-group", "switch", "accordion", "tooltip", "alert", "badge",
    "date-picker", "pagination", "progress", "rich-editor", "color-picker", "divider"
  ]);
  const genericEnumRows = useMemo(
    () => !TOOLBAR_SPECIAL_CASED_IDS.has(selectedEntry.id) && !selectedPreviewStateConfig
      ? apiPropRows.filter(row => row.type === "enum" && row.acceptedValues !== "See type union")
      : [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedEntry.id, apiPropRows, selectedPreviewStateConfig]
  );

  const componentTemplate = useMemo(
    () => getComponentTemplate(selectedEntry, { packageManager: "pnpm" }),
    [selectedEntry]
  );

  const installCommand = componentTemplate?.installCommand ?? "pnpm add @zephrui/core @zephrui/ui-react";
  const importSnippet = componentTemplate?.importSnippet ?? `import { ${selectedEntry.name} } from "@zephrui/ui-react";`;
  const usageSnippet = componentTemplate?.usageSnippet ?? `// No sample available for ${selectedEntry.name}`;

  const blockPrompt = useMemo(
    () =>
      generateComponentPrompt(selectedEntry, {

        stylePack,
        accentColor,
        configSnippet,
        intent: intentText,
        packageManager: "pnpm"
      }) ?? "",
    [accentColor, configSnippet, intentText, selectedEntry, stylePack]
  );
  const isAssetLibraryComponent =
    selectedEntry.id === "icon-library" ||
    selectedEntry.id === "avatar-library" ||
    selectedEntry.id === "logo-library";
  const activeAssetCloudState = selectedEntry.id === "icon-library"
    ? iconCloudState
    : selectedEntry.id === "avatar-library"
      ? avatarCloudState
      : selectedEntry.id === "logo-library"
        ? logoCloudState
        : defaultCloudAssetState();
  const brandLogoSrc = darkMode ? zephrLogoLight : zephrLogoDark;
  const widgetSurface = (surfaceStyle as SurfaceStyleOption) === "flat" ? "outlined" : "elevated";

  const shareUrl = useMemo(() => {
    const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost:4172";
    const path = typeof window !== "undefined" ? window.location.pathname : "/studio";
    const params = new URLSearchParams();
    params.set("component", selectedEntry.id);
    if (accentColor !== defaultAccentForPack(DEFAULT_STYLE_PACK)) {
      params.set("accent", accentColor);
    }
    params.set("view", view);
    return `${origin}${path}?${params.toString()}`;
  }, [accentColor, selectedEntry.id, view]);

  function setAccentIfValid(value: string): void {
    setAccentDraft(value);
    const normalized = normalizeHexColor(value);
    if (normalized) {
      setAccentColor(normalized);
    }
  }

  function applyAccentDraft(): void {
    const normalized = normalizeHexColor(accentDraft);
    if (normalized) {
      setAccentColor(normalized);
      setAccentDraft(normalized);
      return;
    }

    setAccentDraft(accentColor);
  }

  async function copyAndFlash(label: string, text: string): Promise<void> {
    const ok = await copyText(text);
    showToast(ok ? `${label} copied` : `Clipboard blocked for ${label}`);
  }

  return (
    <div className="docs-root">
      <style>{globalThemeCss}</style>
      <header className="top-nav">
        <div className="top-main">
          <button
            type="button"
            className="mobile-nav-toggle"
            onClick={() => setMobileNavOpen((o) => !o)}
            aria-label={mobileNavOpen ? "Close navigation" : "Open navigation"}
          >
            <span className="ms">{mobileNavOpen ? "close" : "menu"}</span>
          </button>
          <div className="brand-wrap">
            <button
              type="button"
              className="brand-home"
              onClick={() => {
                setTopTab("setup");
                setView("introduction");
                setMobileNavOpen(false);
              }}
              aria-label="Go to introduction"
            >
              <img src={brandLogoSrc} alt="Zephr" className="brand-logo" />
            </button>
          </div>

          <div className="top-search-wrap">
            <div className="top-search-inner" ref={searchPanelRef}>
              <span className="ms top-search-icon" aria-hidden>search</span>
              <input
                ref={searchInputRef}
                className="top-search"
                value={catalogSearch}
                onChange={(event) => setCatalogSearch(event.target.value)}
                onFocus={() => setSearchFocused(true)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown" && searchResults.length) {
                    event.preventDefault();
                    setSearchActiveIndex((index) => Math.min(index + 1, searchResults.length - 1));
                    return;
                  }
                  if (event.key === "ArrowUp" && searchResults.length) {
                    event.preventDefault();
                    setSearchActiveIndex((index) => Math.max(index - 1, 0));
                    return;
                  }
                  if (event.key === "Enter" && searchResults.length) {
                    event.preventDefault();
                    navigateToSearchResult(searchResults[searchActiveIndex] ?? searchResults[0]);
                  }
                }}
                placeholder="Search..."
                aria-label="Search"
              />
              {searchFocused && catalogSearch.trim() ? (
                <div className="top-search-results" role="listbox" aria-label="Search results">
                  {searchResults.length ? (
                    searchResults.map((result) => (
                      <button
                        key={result.id}
                        type="button"
                        className={`top-search-result ${searchResults[searchActiveIndex]?.id === result.id ? "is-active" : ""}`}
                        onClick={() => navigateToSearchResult(result)}
                        onMouseEnter={() => {
                          const index = searchResults.findIndex((item) => item.id === result.id);
                          if (index >= 0) {
                            setSearchActiveIndex(index);
                          }
                        }}
                      >
                        <span className="top-search-result-main">{result.label}</span>
                        <span className="top-search-result-meta">{result.detail}</span>
                      </button>
                    ))
                  ) : (
                    <p className="top-search-empty">No matches found.</p>
                  )}
                </div>
              ) : null}
            </div>
          </div>

          <div className="top-actions">
            {topTab === "pages" ? (
              <div className="top-version-control" aria-label="Pages showcase version">
                <Select
                  controlSize="xs"
                  className="top-version-select"
                  aria-label="Pages showcase version"
                  value={showcaseVersion}
                  onChange={(event) => setShowcaseVersion(event.target.value === "v2" ? "v2" : "v1")}
                >
                  <option value="v1">V1</option>
                  <option value="v2">V2</option>
                </Select>
              </div>
            ) : null}
            <a
              href="https://github.com/akhilllkrishnan/zephr"
              target="_blank"
              rel="noopener noreferrer"
              className="top-icon-action"
              aria-label="View Zephr on GitHub"
              title="View on GitHub"
            >
              <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
              </svg>
            </a>
            <button
              type="button"
              className="top-icon-action"
              onClick={() => setDarkMode((d) => !d)}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              <span className="ms">{darkMode ? "light_mode" : "dark_mode"}</span>
            </button>
          </div>
        </div>

        <nav className="top-tabs" aria-label="Top tabs">
          <button type="button" className={`tab ${topTab === "setup" ? "active" : ""}`} onClick={() => activateTopTab("setup")}>Setup</button>
          <button type="button" className={`tab ${topTab === "components" ? "active" : ""}`} onClick={() => activateTopTab("components")}>Components</button>
          <button type="button" className={`tab ${topTab === "pages" ? "active" : ""}`} onClick={() => activateTopTab("pages")}>Pages</button>
          <button type="button" className={`tab ${topTab === "changelog" ? "active" : ""}`} onClick={() => activateTopTab("changelog")}>Changelog</button>
        </nav>
      </header>

      {toastMessage ? <p className="copy-toast" role="status" aria-live="polite">{toastMessage}</p> : null}

      <div className={`docs-layout${topTab === "pages" ? " docs-layout--pages" : ""}`}>
        <aside ref={leftRailRef} className={`left-rail ${mobileNavOpen ? "is-mobile-open" : ""}`}>
          <span
            className="sidebar-active-indicator"
            aria-hidden="true"
            style={{
              transform: `translateY(${sidebarIndicator.top}px)`,
              height: sidebarIndicator.height,
              opacity: sidebarIndicator.opacity
            }}
          />
          {topTab === "setup" && (
            <div className="nav-group">
              <p className="group-title">Setup</p>
              <button
                type="button"
                className={`sidebar-link ${view === "introduction" ? "is-active" : ""}`}
                onClick={() => {
                  setTopTab("setup");
                  setView("introduction");
                  setMobileNavOpen(false);
                }}
              >
                Introduction
              </button>
              <button
                type="button"
                className={`sidebar-link ${view === "getting-started" ? "is-active" : ""}`}
                onClick={() => {
                  setTopTab("setup");
                  setView("getting-started");
                  setMobileNavOpen(false);
                }}
              >
                Get Started
              </button>
              <button
                type="button"
                className={`sidebar-link ${view === "speed-insights" ? "is-active" : ""}`}
                onClick={() => {
                  setTopTab("setup");
                  setView("speed-insights");
                  setMobileNavOpen(false);
                }}
              >
                Speed Insights
              </button>
              <button
                type="button"
                className={`sidebar-link ${view === "foundations" ? "is-active" : ""}`}
                onClick={() => {
                  setTopTab("setup");
                  setView("foundations");
                  setMobileNavOpen(false);
                }}
              >
                Foundations
              </button>
            </div>
          )}
          {topTab === "components" && (
            <div className="nav-group">
              {catalogSearch.trim() ? (
                <div className="component-list">
                  {catalog.map((entry) => (
                    <button
                      key={entry.id}
                      type="button"
                      className={`component-link ${entry.id === selectedEntry.id && (view === "components" || view === "api-reference") ? "is-active" : ""}`}
                      onClick={() => selectComponent(entry.id)}
                    >
                      {entry.name}
                    </button>
                  ))}
                </div>
              ) : (
                (["atom", "molecule", "organism"] as const).map((cat) => {
                  const label = cat === "atom" ? "Atoms" : cat === "molecule" ? "Molecules" : "Organisms";
                  const items = registry.filter((e) => e.category === cat);
                  const isOpen = expandedGroups.has(cat);
                  return (
                    <div key={cat}>
                      <button
                        type="button"
                        className="nav-collapse-btn"
                        onClick={() => toggleGroup(cat)}
                        aria-expanded={isOpen}
                      >
                        <span>{label}</span>
                        <span className={`nav-collapse-chevron ${isOpen ? "is-open" : ""}`}>›</span>
                      </button>
                      {isOpen && (
                        <div className="nav-collapse-inner">
                          {items.map((entry) => (
                            <button
                              key={entry.id}
                              type="button"
                              className={`component-link ${entry.id === selectedEntry.id && (view === "components" || view === "api-reference") ? "is-active" : ""}`}
                              onClick={() => selectComponent(entry.id)}
                            >
                              <span>{entry.name}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })
              )}

              {/* Blocks section */}
              <div>
                <button
                  type="button"
                  className="nav-collapse-btn"
                  onClick={() => toggleGroup("block")}
                  aria-expanded={expandedGroups.has("block")}
                >
                  <span>Blocks</span>
                  <span className={`nav-collapse-chevron ${expandedGroups.has("block") ? "is-open" : ""}`}>›</span>
                </button>
                {expandedGroups.has("block") && (
                  <div className="nav-collapse-inner">
                    {[
                      "HeroSection",
                      "FeatureGrid",
                      "PricingTable",
                      "TeamGrid",
                      "StatRow",
                      "StatCard",
                      "CtaBanner",
                      "TestimonialCarousel",
                      "FormSection",
                      "SplitLayout"
                    ].map((name) => (
                      <div
                        key={name}
                        style={{
                          padding: "5px 12px 5px 20px",
                          fontSize: 13,
                          color: "var(--z-color-muted, #737373)",
                          display: "flex",
                          alignItems: "center",
                          gap: 6
                        }}
                      >
                        <span style={{ fontSize: 10, opacity: 0.5 }}>◻</span>
                        <span>{name}</span>
                        <span className="pill-badge" style={{ fontSize: 10, marginLeft: "auto" }}>pkg</span>
                      </div>
                    ))}
                    <a
                      className="sidebar-link"
                      href="https://www.npmjs.com/package/@zephrui/blocks"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ marginTop: 4 }}
                    >
                      → @zephrui/blocks
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {topTab === "pages" && (
            <div className="nav-group">
              <p className="group-title">Pages</p>

              <button
                type="button"
                className={`sidebar-link ${view === "widgets" ? "is-active" : ""}`}
                onClick={() => {
                  setTopTab("pages");
                  setView("widgets");
                  setMobileNavOpen(false);
                }}
              >
                Widgets
              </button>
              {pageWidgetNavItems.map((widget) => (
                <a
                  key={widget.id}
                  className="sidebar-link"
                  href={`#${widget.id}`}
                  onClick={() => {
                    setTopTab("pages");
                    setView("widgets");
                    setMobileNavOpen(false);
                  }}
                >
                  {widget.label}
                </a>
              ))}

              <button
                type="button"
                className={`sidebar-link ${view === "templates" ? "is-active" : ""}`}
                onClick={() => {
                  setTopTab("pages");
                  setView("templates");
                  setMobileNavOpen(false);
                }}
              >
                Templates Overview
              </button>
              {pageTemplateNavItems.map((template) => (
                <a
                  key={template.id}
                  className="sidebar-link"
                  href={`#${template.id}`}
                  onClick={() => {
                    setTopTab("pages");
                    setView("templates");
                    setMobileNavOpen(false);
                  }}
                >
                  {template.label}
                </a>
              ))}
            </div>
          )}

          {topTab === "changelog" && (
            <div className="nav-group">
              <p className="group-title">Change Log</p>
              <a className="sidebar-link" href="#changelog-overview" onClick={() => setMobileNavOpen(false)}>
                Overview
              </a>
              <a className="sidebar-link changelog-version-link" href="#release-0-5-0" onClick={() => setMobileNavOpen(false)}>
                v0.5.0 — Latest
              </a>
              <a className="sidebar-link changelog-version-link" href="#release-0-4-0" onClick={() => setMobileNavOpen(false)}>
                v0.4.0
              </a>
              <a className="sidebar-link changelog-version-link" href="#release-0-3-0" onClick={() => setMobileNavOpen(false)}>
                v0.3.0
              </a>
              <a className="sidebar-link changelog-version-link" href="#release-0-2-0" onClick={() => setMobileNavOpen(false)}>
                v0.2.0
              </a>
              <a className="sidebar-link changelog-version-link" href="#release-0-1-0" onClick={() => setMobileNavOpen(false)}>
                v0.1.0
              </a>
              <a className="sidebar-link" href="#migrations-overview" onClick={() => setMobileNavOpen(false)}>
                Migrations
              </a>
              <a className="sidebar-link" href="#release-upcoming" onClick={() => setMobileNavOpen(false)}>
                Roadmap
              </a>
            </div>
          )}
        </aside>
        {
          mobileNavOpen && (
            <div className="mobile-nav-backdrop" onClick={() => setMobileNavOpen(false)} />
          )
        }

        <main className="content-column">
          {topTab === "changelog" ? (
            <>
              <section id="changelog-overview" className="doc-section hero">
                <p className="breadcrumbs">Product / Changelog</p>
                <h1>Release notes</h1>
                <p className="lead">
                  Every meaningful change to Zephr — component APIs, AI tooling, CLI, MCP server, and docs — tracked in one place.
                </p>
              </section>

              <section className="doc-section">
                <div className="cl-timeline">

                  {/* v0.5.0 */}
                  <div id="release-0-5-0" className="cl-entry cl-entry--latest">
                    <div className="cl-entry-head">
                      <span className="cl-version">v0.5.0</span>
                      <span className="cl-date">March 16, 2026</span>
                      <span className="cl-badge">Latest</span>
                    </div>
                    <p className="cl-summary">
                      Welcome banners, redesigned landing page, Introduction as homepage, Zephr Render highlighted, GitHub open-source icon.
                    </p>
                    <div className="cl-changes">
                      <div>
                        <p className="cl-category-label">✦ New features</p>
                        <ul className="cl-list">
                          <li>Branded ZEPHR pixel-block welcome banner on <code>npm install @zephrui/ui-react</code> — indigo block art, version number, next-step hints. Silent in CI/non-TTY.</li>
                          <li>Same banner on <code>zephr init</code> and <code>zephr add-skills</code> — fires when connecting to Claude Code, Cursor, or Codex.</li>
                          <li>Redesigned Introduction feature grid: 3 columns replacing 4, with expanded copy — AI-native tokens, 21 slash commands (with chip row), and Zephr Render MCP tool (new).</li>
                          <li>Zephr Render highlighted on the landing page with an "MCP Tool" badge and Playwright renderer explanation.</li>
                          <li>GitHub icon link added to the header — signals open-source status at a glance.</li>
                          <li>Introduction page set as the default homepage — no <code>?view=</code> param required.</li>
                        </ul>
                      </div>
                      <div>
                        <p className="cl-category-label">⚡ Improvements</p>
                        <ul className="cl-list">
                          <li>Feature cards now carry a primary description and a secondary sub-paragraph with a hairline separator — more detail without visual clutter.</li>
                          <li>Slash commands chip row in the feature card shows <code>/polish</code>, <code>/audit</code>, <code>/scaffold</code>, <code>/bolder</code>, <code>/harden</code>, <code>/tighten</code>, and a "+15 more" overflow pill.</li>
                          <li><code>@zephrui/ui-react</code> bumped to 0.1.2, <code>@zephrui/cli</code> republished — both live on npm.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* v0.4.0 */}
                  <div id="release-0-4-0" className="cl-entry">
                    <div className="cl-entry-head">
                      <span className="cl-version">v0.4.0</span>
                      <span className="cl-date">March 4, 2026</span>
                    </div>
                    <p className="cl-summary">Premium visual refinement, PRO gating, premium page templates, and docs narrative pages.</p>
                    <div className="cl-changes">
                      <div>
                        <p className="cl-category-label">✦ New features</p>
                        <ul className="cl-list">
                          <li>Premium docs shell with accent-driven previews and a single default Zephr theme.</li>
                          <li>PRO component and page gating — free-tier users see locked overlay and upgrade modal.</li>
                          <li>5 premium page templates: Dashboard, Auth, Settings, Onboarding, Marketing.</li>
                          <li>Foundations page with "How tokens work" visual flow and naming convention reference.</li>
                          <li>Team page with Avatar components and process grid.</li>
                        </ul>
                      </div>
                      <div>
                        <p className="cl-category-label">⚡ Improvements</p>
                        <ul className="cl-list">
                          <li>Template previews wrapped in <code>BrowserPreviewFrame</code> with address bar chrome.</li>
                          <li>Dashboard template: sparkline SVGs, stat variance indicators, activity timeline.</li>
                          <li>Auth template: social auth buttons, testimonial quote, split-panel layout.</li>
                          <li>Marketing template: gradient hero, 3-tier pricing cards, testimonial carousel.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* v0.3.0 */}
                  <div id="release-0-3-0" className="cl-entry">
                    <div className="cl-entry-head">
                      <span className="cl-version">v0.3.0</span>
                      <span className="cl-date">March 3, 2026</span>
                    </div>
                    <p className="cl-summary">P0 sprint: dark mode, layout primitives, tier system, utility compiler removal.</p>
                    <div className="cl-changes">
                      <div>
                        <p className="cl-category-label">✦ New features</p>
                        <ul className="cl-list">
                          <li>Dark mode with <code>[data-theme="dark"]</code> + <code>prefers-color-scheme</code> support.</li>
                          <li>Layout primitives: Stack, Grid, Box, Spacer — free tier.</li>
                          <li>License key tier system: <code>zephr upgrade --key</code> + <code>zephr whoami</code>.</li>
                          <li>Docs playground: dark mode toggle, tier simulator, PRO badges on components.</li>
                        </ul>
                      </div>
                      <div>
                        <p className="cl-category-label">💥 Breaking changes</p>
                        <ul className="cl-list">
                          <li>Removed utility class compiler — all <code>z-*</code> classes eliminated.</li>
                          <li>Components now self-style via CSS variables only (no external utility output).</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* v0.2.0 */}
                  <div id="release-0-2-0" className="cl-entry">
                    <div className="cl-entry-head">
                      <span className="cl-version">v0.2.0</span>
                      <span className="cl-date">March 2, 2026</span>
                    </div>
                    <p className="cl-summary">Docs parity upgrade: API reference mode, narrative pages, and command-style search.</p>
                    <div className="cl-changes">
                      <div>
                        <p className="cl-category-label">✦ New features</p>
                        <ul className="cl-list">
                          <li>Metadata-driven API Reference mode for every component.</li>
                          <li>Setup narrative pages: Mission &amp; Vision, Team operating model.</li>
                          <li>Keyboard-driven search with up/down/enter and Cmd/Ctrl+K focus.</li>
                        </ul>
                      </div>
                      <div>
                        <p className="cl-category-label">⚡ Improvements</p>
                        <ul className="cl-list">
                          <li>Expanded page templates navigation with deep links and section TOC.</li>
                          <li>Component search filters flat when active, restores grouped tree when cleared.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* v0.1.0 */}
                  <div id="release-0-1-0" className="cl-entry">
                    <div className="cl-entry-head">
                      <span className="cl-version">v0.1.0</span>
                      <span className="cl-date">March 1, 2026</span>
                    </div>
                    <p className="cl-summary">Initial release: component previews, accent system, and AI block prompts.</p>
                    <div className="cl-changes">
                      <div>
                        <p className="cl-category-label">✦ New features</p>
                        <ul className="cl-list">
                          <li>30 components across atoms, molecules, and organisms.</li>
                          <li>Accent switcher with persistent state via sessionStorage.</li>
                          <li>AI block prompts with one-click copy for Claude, Cursor, and Codex.</li>
                          <li>Install snippets (npm / pnpm / CLI) per component.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                </div>
              </section>

              <section id="migrations-overview" className="doc-section">
                <div className="section-heading">
                  <h2>Migrations</h2>
                  <p>Upgrade notes for documentation IA and deep links between versions.</p>
                </div>
                <ul className="release-list">
                  <li>Setup now includes dedicated Mission &amp; Vision and Team pages.</li>
                  <li>Components now supports both Guides mode and API Reference mode.</li>
                  <li>Page templates now expose stable section anchors for direct linking.</li>
                </ul>
              </section>

              <section id="migration-0-1-to-0-2" className="doc-section">
                <div className="section-heading">
                  <h2>Migration: v0.1.0 → v0.2.0</h2>
                  <p>Action list for existing links, docs wrappers, and agent scripts.</p>
                </div>
                <div className="snippet-stack changelog-snippet-stack">
                  <SnippetItem
                    label="What changed"
                    code={`1. Top-level navigation remains: Setup, Components, Pages, Change Log
2. Components now has two modes:
   - view=components
   - view=api-reference
3. New setup routes:
   - view=mission
   - view=team
4. New template anchors:
   #template-dashboard, #template-auth, #template-settings, #template-onboarding, #template-marketing`}
                    onCopy={() => copyAndFlash("Migration notes", `1. Top-level navigation remains: Setup, Components, Pages, Change Log
2. Components now has two modes:
   - view=components
   - view=api-reference
3. New setup routes:
   - view=mission
   - view=team
4. New template anchors:
   #template-dashboard, #template-auth, #template-settings, #template-onboarding, #template-marketing`)}
                  />
                </div>
              </section>

              <section id="release-upcoming" className="doc-section">
                <div className="section-heading">
                  <h2>Roadmap</h2>
                  <p>Upcoming milestones for the Zephr ecosystem.</p>
                </div>

                <div className="roadmap-track">
                  <div className="roadmap-milestone active">
                    <div className="roadmap-marker"></div>
                    <div className="roadmap-content">
                      <div className="roadmap-label">
                        <span className="roadmap-status in-progress">In progress</span>
                        <span className="roadmap-version">v0.5.0</span>
                      </div>
                      <h4>npm publish &amp; MCP action tools</h4>
                      <ul className="release-list">
                        <li>Publish <code>@zephrui/ui-react</code> to npm as a public package.</li>
                        <li>MCP action tools for page scaffolding, accent application, and component generation.</li>
                        <li>Loading / empty / error states on all organisms.</li>
                        <li>Per-tool AI prompt variants (Claude Code, Cursor, Codex, Lovable).</li>
                      </ul>
                    </div>
                  </div>

                  <div className="roadmap-milestone">
                    <div className="roadmap-marker"></div>
                    <div className="roadmap-content">
                      <div className="roadmap-label">
                        <span className="roadmap-status planned">Planned</span>
                        <span className="roadmap-version">v0.6.0</span>
                      </div>
                      <h4>Cloud features &amp; Figma sync</h4>
                      <ul className="release-list">
                        <li>Cloud API key flows for logo / avatar / icon providers.</li>
                        <li>Figma token import via Variables API.</li>
                        <li>Design-to-code sync: push Figma changes into core design tokens.</li>
                        <li>Team workspace with shared accent presets and visual defaults.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="roadmap-milestone">
                    <div className="roadmap-marker"></div>
                    <div className="roadmap-content">
                      <div className="roadmap-label">
                        <span className="roadmap-status planned">Planned</span>
                        <span className="roadmap-version">v1.0.0</span>
                      </div>
                      <h4>Production GA</h4>
                      <ul className="release-list">
                        <li>Stable API with semver guarantees.</li>
                        <li>Publishable docs presets for external projects.</li>
                        <li>Animation primitives (enter/exit/layout transitions).</li>
                        <li>Comprehensive test suite with visual regression coverage.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </>
          ) : view === "introduction" ? (
            <>
              {/* ── HERO ──────────────────────────────────────────────────── */}
              <section id="setup-introduction" className="doc-section hero">
                {/* Left column */}
                <p className="breadcrumbs">Setup / Introduction</p>
                <h1>
                  A design system{" "}
                  <span className="hero-accent-word">built for AI.</span>
                </h1>
                <p className="lead">
                  Every token, component, and AI hint in Zephr is engineered so
                  Claude, Cursor, Codex, and Lovable produce quality UI on the
                  first pass — no cleanup, no drift.
                </p>
                <div className="hero-cta-row">
                  <Button
                    onClick={() => {
                      setTopTab("components");
                      setView("component-gallery");
                    }}
                  >
                    Browse components
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setTopTab("setup");
                      setView("getting-started");
                      setSetupTab("ai");
                    }}
                  >
                    AI quick start →
                  </Button>
                </div>

                {/* Right column — terminal visual */}
                <div className="hero-terminal-col" aria-hidden="true">
                  <div className="hero-terminal">
                    <div className="hero-terminal-chrome">
                      <span className="hero-terminal-dot red" />
                      <span className="hero-terminal-dot yellow" />
                      <span className="hero-terminal-dot green" />
                      <span className="hero-terminal-title">zsh — 80×24</span>
                    </div>
                    <div className="hero-terminal-body">
                      <div className="hero-terminal-line">
                        <span className="hero-terminal-prompt">❯</span>
                        <span className="hero-terminal-cmd">npx zephr init</span>
                      </div>
                      <div className="hero-terminal-spacer" />
                      <div className="hero-terminal-line">
                        <span className="hero-terminal-check">✓</span>
                        <span className="hero-terminal-text">Detected React + TypeScript</span>
                      </div>
                      <div className="hero-terminal-line">
                        <span className="hero-terminal-check">✓</span>
                        <span className="hero-terminal-text">Writing <span style={{color:"#93c5fd"}}>CLAUDE.md</span></span>
                      </div>
                      <div className="hero-terminal-line">
                        <span className="hero-terminal-check">✓</span>
                        <span className="hero-terminal-text">Writing <span style={{color:"#93c5fd"}}>AGENTS.md</span></span>
                      </div>
                      <div className="hero-terminal-line">
                        <span className="hero-terminal-check">✓</span>
                        <span className="hero-terminal-text">Writing <span style={{color:"#93c5fd"}}>llms.txt</span></span>
                      </div>
                      <div className="hero-terminal-line">
                        <span className="hero-terminal-check">✓</span>
                        <span className="hero-terminal-text"><span style={{color:"#fbbf24"}}>49</span> components registered</span>
                      </div>
                      <div className="hero-terminal-divider" />
                      <div className="hero-terminal-line" style={{animationDelay:"1.25s"}}>
                        <span className="hero-terminal-success">✦ Your AI knows your design system.</span>
                      </div>
                      <div className="hero-terminal-line" style={{animationDelay:"1.35s"}}>
                        <span className="hero-terminal-prompt">❯</span>
                        <span className="hero-terminal-cursor" />
                      </div>
                    </div>
                  </div>
                  {/* Works-with brand row */}
                  <div className="hero-tools-row">
                    <span className="hero-tools-label">Works with</span>
                    <div className="hero-tools-pills">

                      {/* Claude Code */}
                      <div className="hero-tool-pill hero-tool-pill--claude">
                        <svg className="hero-tool-pill-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path
                            d="M13.827 2.7 12 6.944 10.173 2.7 6.827 3.573 8.654 7.817 4.41 6 3.537 9.346l4.244 1.827L3.537 13l.873 3.346 4.244-1.827L6.827 18.7l3.346.873L12 15.429l1.827 4.244 3.346-.873-1.827-4.244 4.244 1.827.873-3.346-4.244-1.827L22.463 9.346 21.59 6l-4.244 1.817 1.827-4.244z"
                            fill="currentColor"
                          />
                        </svg>
                        <span>Claude</span>
                      </div>

                      {/* Cursor */}
                      <div className="hero-tool-pill hero-tool-pill--cursor">
                        <svg className="hero-tool-pill-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M4 3L20 12L13 13.8L9.5 21L4 3Z" fill="currentColor" />
                          <path d="M13 13.8L16.5 20.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
                        </svg>
                        <span>Cursor</span>
                      </div>

                      {/* Codex / OpenAI */}
                      <div className="hero-tool-pill hero-tool-pill--codex">
                        <svg className="hero-tool-pill-icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .511 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855-5.805-3.387L15.15 7.2a.077.077 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.104v-5.678a.79.79 0 0 0-.407-.666zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
                        </svg>
                        <span>Codex</span>
                      </div>

                      {/* Lovable */}
                      <div className="hero-tool-pill hero-tool-pill--lovable">
                        <svg className="hero-tool-pill-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path
                            d="M12 21C12 21 3 15.5 3 8.5A5 5 0 0 1 12 5.93 5 5 0 0 1 21 8.5C21 15.5 12 21 12 21z"
                            fill="currentColor"
                          />
                          <path d="M9.5 9a2.5 2.5 0 0 1 2.5-2" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                        <span>Lovable</span>
                      </div>

                    </div>
                  </div>
                </div>
              </section>

              {/* ── 3-FEATURE GRID ────────────────────────────────────────── */}
              <section className="doc-section">
                <div className="intro-features intro-features--3col">

                  {/* 1 — AI-native tokens */}
                  <div className="intro-feature">
                    <div className="intro-feature-icon">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 2L9.5 6.5H14L10.25 9.25L11.75 13.75L8 11L4.25 13.75L5.75 9.25L2 6.5H6.5L8 2Z" fill="currentColor" opacity="0.85"/>
                      </svg>
                    </div>
                    <strong>AI-native design tokens</strong>
                    <p>
                      Every <code>--z-*</code> CSS variable is named for design
                      intent, not implementation detail — <code>--z-color-text</code>,
                      not <code>--gray-900</code>. AIs reason about them correctly
                      the first time, without correction.
                    </p>
                    <p className="intro-feature-sub">
                      49 production-ready SaaS components — atoms to full page
                      templates — each ship with a structured <code>aiHints</code> block
                      and four battle-tested style packs: Notion, Stripe, Linear, Framer.
                      One accent color swap themes everything.
                    </p>
                  </div>

                  {/* 2 — 21 slash commands */}
                  <div className="intro-feature intro-feature--highlight">
                    <div className="intro-feature-icon">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 4H14M2 8H10M2 12H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <strong>21 slash commands</strong>
                    <p>
                      A full designer vocabulary built into your AI editor.{" "}
                      <code>/polish</code> tightens spacing and fixes token
                      violations. <code>/audit</code> flags every hardcoded hex
                      and missing state. <code>/scaffold</code> drops a complete
                      page system in seconds.
                    </p>
                    <div className="intro-feature-chips">
                      <span className="intro-chip">/polish</span>
                      <span className="intro-chip">/audit</span>
                      <span className="intro-chip">/scaffold</span>
                      <span className="intro-chip">/bolder</span>
                      <span className="intro-chip">/harden</span>
                      <span className="intro-chip">/tighten</span>
                      <span className="intro-chip intro-chip--more">+15 more</span>
                    </div>
                    <p className="intro-feature-sub">
                      Works in Claude Code, Cursor, and Codex. Install once with{" "}
                      <code>zephr add-skills</code> — no config required.
                    </p>
                  </div>

                  {/* 3 — Zephr Render */}
                  <div className="intro-feature intro-feature--render">
                    <div className="intro-feature-icon">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" y="2" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M5 14H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M8 12V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        <circle cx="8" cy="7" r="2" fill="currentColor" opacity="0.6"/>
                      </svg>
                    </div>
                    <div className="intro-feature-badge">MCP Tool</div>
                    <strong>Zephr Render</strong>
                    <p>
                      The AI sees exactly what you see. Pass any JSX snippet to
                      the <code>zephr_render</code> MCP tool and get back a
                      pixel-accurate screenshot — light and dark — before a
                      single line lands in your codebase.
                    </p>
                    <p className="intro-feature-sub">
                      Powered by a headless Playwright renderer bundled inside
                      the MCP server. No browser setup. No external service. Just{" "}
                      <code>npx @zephrui/mcp@latest</code>.
                    </p>
                  </div>

                </div>
              </section>

              {/* ── MCP SERVER SETUP ──────────────────────────────────────── */}
              <section id="mcp-setup" className="doc-section">
                <div className="section-heading" style={{ marginBottom: "1.5rem" }}>
                  <p className="section-eyebrow">MCP Integration</p>
                  <h2>Give your AI direct access to the full registry.</h2>
                  <p>
                    The Zephr MCP server connects Claude, Cursor, and Codex to live component
                    specs, prop schemas, and a visual renderer — so the AI reads the design
                    system before it writes a single line.
                  </p>
                </div>

                {/* Tool cards */}
                <div className="mcp-section-grid">
                  <div className="mcp-tool-card">
                    <code className="mcp-tool-name">zephr_search</code>
                    <p className="mcp-tool-desc">Find components by keyword. Returns name, category, tier, and AI hints for every match.</p>
                  </div>
                  <div className="mcp-tool-card">
                    <code className="mcp-tool-name">zephr_spec</code>
                    <p className="mcp-tool-desc">Full prop schema for any component — types, defaults, accepted values, accessibility notes.</p>
                  </div>
                  <div className="mcp-tool-card">
                    <code className="mcp-tool-name">zephr_render</code>
                    <p className="mcp-tool-desc">Pass JSX, get a pixel-accurate screenshot back in light and dark mode — before any code lands in your repo.</p>
                  </div>
                  <div className="mcp-tool-card">
                    <code className="mcp-tool-name">zephr_scaffold_page</code>
                    <p className="mcp-tool-desc">Scaffold a complete page template — Dashboard, Auth, Settings, Onboarding, or Marketing — wired to real props.</p>
                  </div>
                </div>

                {/* Config snippets */}
                <div className="mcp-config-grid">
                  <div>
                    <p className="mcp-config-label">Claude Code / Claude Desktop</p>
                    <SnippetItem
                      label="claude_desktop_config.json"
                      code={`{\n  "mcpServers": {\n    "zephr": {\n      "command": "npx",\n      "args": ["@zephrui/mcp@latest"]\n    }\n  }\n}`}
                      onCopy={() => copyAndFlash("MCP config", `{\n  "mcpServers": {\n    "zephr": {\n      "command": "npx",\n      "args": ["@zephrui/mcp@latest"]\n    }\n  }\n}`)}
                    />
                  </div>
                  <div>
                    <p className="mcp-config-label">Cursor</p>
                    <SnippetItem
                      label=".cursor/mcp.json"
                      code={`{\n  "mcpServers": {\n    "zephr": {\n      "command": "npx",\n      "args": ["@zephrui/mcp@latest"]\n    }\n  }\n}`}
                      onCopy={() => copyAndFlash("MCP config", `{\n  "mcpServers": {\n    "zephr": {\n      "command": "npx",\n      "args": ["@zephrui/mcp@latest"]\n    }\n  }\n}`)}
                    />
                  </div>
                </div>
              </section>

              {/* ── HOW IT WORKS — 3-STEP FLOW ────────────────────────────── */}
              <section className="doc-section">
                <div className="section-heading" style={{ marginBottom: "1.5rem" }}>
                  <p className="section-eyebrow">How it works</p>
                  <h2>Zero config. AI-ready in one command.</h2>
                  <p>
                    Zephr wires your AI coding tool directly to the component
                    registry. The AI knows your design system before you write a
                    single prompt.
                  </p>
                </div>
                <div className="gs-flow">
                  <div className="gs-flow-step">
                    <div className="gs-flow-num">1</div>
                    <p className="gs-flow-title">Initialise your project</p>
                    <p className="gs-flow-desc">
                      One command writes <code>CLAUDE.md</code>, <code>AGENTS.md</code>, and <code>llms.txt</code> — context files that AI tools read automatically every session. Also generates your <code>zephr.css</code> token file.
                    </p>
                    <code className="gs-flow-code">npx zephr init</code>
                    <p className="gs-flow-hint">Then run <strong>zephr add-skills</strong> to install all 21 slash commands into Claude Code, Cursor, or Codex.</p>
                  </div>
                  <div className="gs-flow-step">
                    <div className="gs-flow-num">2</div>
                    <p className="gs-flow-title">Describe what you want</p>
                    <p className="gs-flow-desc">
                      Your AI reads the full registry — every component{"'"}s prop schema, design tokens, and <code>aiHints</code> — and generates production-ready code on the first pass. No prompt engineering required.
                    </p>
                    <code className="gs-flow-code">"Build a CRM table with filters and a slide-over detail panel"</code>
                    <p className="gs-flow-hint">The AI knows to use <strong>DataTable</strong> + <strong>FiltersBar</strong> + <strong>Sheet</strong> — because the registry told it to.</p>
                  </div>
                  <div className="gs-flow-step">
                    <div className="gs-flow-num">3</div>
                    <p className="gs-flow-title">Ship with confidence</p>
                    <p className="gs-flow-desc">
                      Every component self-styles via <code>--z-*</code> CSS variables. No token overrides, no style drift, no cleanup pass. Run <code>/audit</code> to catch violations before they ship.
                    </p>
                    <code className="gs-flow-code">npm run build → deploy</code>
                    <p className="gs-flow-hint">Use <strong>zephr_render</strong> via MCP to visually verify your output before it ever hits your codebase.</p>
                  </div>
                </div>
              </section>

              {/* ── QUICK INSTALL ─────────────────────────────────────────── */}
              <section id="install" className="doc-section">
                <div className="section-heading" style={{ marginBottom: "1rem" }}>
                  <h2>Quickstart</h2>
                  <p>Three steps from zero to AI-ready components in your React project.</p>
                </div>
                <div className="snippet-stack">
                  <SnippetItem
                    label="1 — Install the package"
                    code="npm install @zephrui/ui-react"
                    onCopy={() => copyAndFlash("Install", "npm install @zephrui/ui-react")}
                  />
                  <SnippetItem
                    label="2 — Initialise Zephr (writes AI context + CSS tokens)"
                    code="npx zephr init"
                    onCopy={() => copyAndFlash("Init", "npx zephr init")}
                  />
                  <SnippetItem
                    label="3 — Import tokens in your root layout"
                    code={`import './src/styles/zephr.css';\nimport { Button } from '@zephrui/ui-react';\n\nexport default function App() {\n  return <Button variant="primary">Get started</Button>;\n}`}
                    onCopy={() => copyAndFlash("Import snippet", `import './src/styles/zephr.css';\nimport { Button } from '@zephrui/ui-react';`)}
                  />
                </div>
              </section>

              {/* ── EXPLORE ───────────────────────────────────────────────── */}
              <section id="explore" className="doc-section">
                <div className="section-heading" style={{ marginBottom: "0.75rem" }}>
                  <h2>Explore</h2>
                  <p>Everything you need to build a complete SaaS product.</p>
                </div>
                <div className="intro-links intro-links-4">
                  <button
                    type="button"
                    className="intro-link-card"
                    onClick={() => {
                      setTopTab("components");
                      setView("component-gallery");
                      setMobileNavOpen(false);
                    }}
                  >
                    <span className="intro-link-icon">🧩</span>
                    <span className="intro-link-label">Components</span>
                    <span className="intro-link-desc">
                      49 components across atoms, molecules, and organisms
                    </span>
                    <span className="intro-link-count">49 components</span>
                  </button>
                  <button
                    type="button"
                    className="intro-link-card"
                    onClick={() => {
                      setTopTab("pages");
                      setView("templates");
                      setMobileNavOpen(false);
                    }}
                  >
                    <span className="intro-link-icon">📄</span>
                    <span className="intro-link-label">Pages</span>
                    <span className="intro-link-desc">
                      Full-page SaaS templates — CRM, ops, analytics, support
                    </span>
                    <span className="intro-link-count">Full templates</span>
                  </button>
                  <button
                    type="button"
                    className="intro-link-card"
                    onClick={() => {
                      setTopTab("pages");
                      setView("widgets");
                      setMobileNavOpen(false);
                    }}
                  >
                    <span className="intro-link-icon">⚡</span>
                    <span className="intro-link-label">Widgets</span>
                    <span className="intro-link-desc">
                      60+ SaaS-focused widgets — drop in fully wired
                    </span>
                    <span className="intro-link-count">60 widgets</span>
                  </button>
                  <button
                    type="button"
                    className="intro-link-card"
                    onClick={() => {
                      setTopTab("setup");
                      setView("getting-started");
                      setSetupTab("ai");
                      setMobileNavOpen(false);
                    }}
                  >
                    <span className="intro-link-icon">🤖</span>
                    <span className="intro-link-label">AI Setup</span>
                    <span className="intro-link-desc">
                      Claude, Cursor, Codex, Lovable — the exact prompt to use
                    </span>
                    <span className="intro-link-count">4 tools</span>
                  </button>
                </div>
              </section>
            </>
          ) : view === "getting-started" ? (
            <>
              {/* ── Hero ── */}
              <section id="overview" className="doc-section hero">
                <p className="breadcrumbs">Get Started</p>
                <h1>Set up in three steps</h1>
                <p className="lead">
                  Pick your accent color, install the package, and start building with AI-ready components.
                </p>
                {/* 3-step progress indicator */}
                <div className="gs-steps-row" role="list">
                  <div className="gs-step-item is-active" role="listitem">
                    <div className="gs-step-badge" aria-label="Step 1">1</div>
                    <span className="gs-step-label">Choose accent</span>
                  </div>
                  <div className="gs-step-line" aria-hidden="true" />
                  <div className="gs-step-item" role="listitem">
                    <div className="gs-step-badge" aria-label="Step 2">2</div>
                    <span className="gs-step-label">Install</span>
                  </div>
                  <div className="gs-step-line" aria-hidden="true" />
                  <div className="gs-step-item" role="listitem">
                    <div className="gs-step-badge" aria-label="Step 3">3</div>
                    <span className="gs-step-label">Build</span>
                  </div>
                </div>
              </section>

              {/* ── Step 1 — Accent color ── */}
              <section id="accent-selection" className="doc-section">
                <div className="gs-section-step" aria-hidden="true">
                  <div className="gs-section-step-num">1</div>
                  Choose your accent color
                </div>
                <div className="gs-accent-layout">
                  {/* Left — controls */}
                  <div>
                    <div className="section-heading" style={{ marginBottom: "1rem" }}>
                      <div className="section-heading-row">
                        <div>
                          <h2 style={{ marginBottom: "0.3rem" }}>Accent color</h2>
                          <p>Powers every primary action, link, focus ring, and component highlight. Changes propagate instantly across all previews.</p>
                        </div>
                        <Badge tone="neutral">{accentColor}</Badge>
                      </div>
                    </div>
                    <div className="accent-swatches" role="radiogroup" aria-label="Accent presets">
                      {accentPresets.map((color) => (
                        <button
                          key={color}
                          type="button"
                          role="radio"
                          aria-label={`Set accent ${color}`}
                          aria-checked={accentColor === color}
                          className={`accent-dot ${accentColor === color ? "is-active" : ""}`}
                          style={{ backgroundColor: color }}
                          onClick={() => setAccentColor(color)}
                        />
                      ))}
                    </div>
                    <div className="accent-input-row accent-inline-row">
                      <input
                        type="color"
                        value={accentColor}
                        onChange={(event) => {
                          setAccentColor(event.target.value);
                          setAccentDraft(event.target.value);
                        }}
                        aria-label="Accent color picker"
                      />
                      <input
                        type="text"
                        value={accentDraft}
                        onChange={(event) => setAccentIfValid(event.target.value)}
                        onBlur={applyAccentDraft}
                        onKeyDown={(event) => { if (event.key === "Enter") applyAccentDraft(); }}
                        placeholder="#121212"
                        aria-label="Accent color hex"
                      />
                    </div>
                  </div>

                  {/* Right — live preview card */}
                  <div className="gs-live-preview" aria-label="Live accent preview">
                    <div className="gs-live-preview-bar">
                      <div className="gs-live-preview-dot" />
                      <div className="gs-live-preview-dot" />
                      <div className="gs-live-preview-dot" />
                      <span className="gs-live-preview-bar-label">Live preview</span>
                    </div>
                    <div className="gs-live-preview-body">
                      <p className="gs-live-preview-title">Invite your team</p>
                      <p className="gs-live-preview-desc">
                        Add members to your workspace. They'll get access to all shared projects.
                      </p>
                      <div className="gs-live-preview-row">
                        <button className="gs-preview-btn gs-preview-btn-ghost">Cancel</button>
                        <button
                          className="gs-preview-btn gs-preview-btn-primary"
                          style={{ backgroundColor: accentColor }}
                          tabIndex={-1}
                          aria-hidden="true"
                        >
                          Send invites
                        </button>
                      </div>
                    </div>
                    <div className="gs-live-preview-tokens">
                      <div className="gs-live-preview-token">
                        <span
                          className="gs-live-preview-token-dot"
                          style={{ background: accentColor }}
                        />
                        <code>--z-color-primary</code>
                      </div>
                      <div className="gs-live-preview-token">
                        <span
                          className="gs-live-preview-token-dot"
                          style={{ background: `${accentColor}28`, border: `1px solid ${accentColor}44` }}
                        />
                        <code>--z-color-info-lighter</code>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ── Step 2 — Install ── */}
              <section id="setup" className="doc-section">
                <div className="gs-section-step" aria-hidden="true">
                  <div className="gs-section-step-num">2</div>
                  Install in your project
                </div>
                <div className="section-heading">
                  <h2>Install in your project</h2>
                  <p>Pick your package manager or tool below.</p>
                </div>
                <div ref={setupTabsRef} className="setup-inner-tabs" role="tablist">
                  <span
                    className="setup-inner-indicator"
                    aria-hidden="true"
                    style={{
                      transform: `translateX(${setupIndicator.left}px)`,
                      width: setupIndicator.width,
                      opacity: setupIndicator.opacity
                    }}
                  />
                  {(["npm", "pnpm", "cli", "ai"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      role="tab"
                      aria-selected={setupTab === t}
                      className={`setup-inner-tab ${setupTab === t ? "is-active" : ""}`}
                      onClick={() => setSetupTab(t)}
                    >
                      {t === "ai" ? "AI Tools" : t}
                    </button>
                  ))}
                </div>
                <div className="setup-tab-body">
                  {setupTab === "npm" && (
                    <div className="snippet-stack">
                      <SnippetItem label="Install" code={`npm install @zephrui/ui-react`} onCopy={() => copyAndFlash("Install", "npm install @zephrui/ui-react")} />
                      <SnippetItem label="zephr.config.ts" code={configSnippet} onCopy={() => copyAndFlash("Config", configSnippet)} />
                    </div>
                  )}
                  {setupTab === "pnpm" && (
                    <div className="snippet-stack">
                      <SnippetItem label="Install" code={`pnpm add @zephrui/ui-react`} onCopy={() => copyAndFlash("Install", "pnpm add @zephrui/ui-react")} />
                      <SnippetItem label="zephr.config.ts" code={configSnippet} onCopy={() => copyAndFlash("Config", configSnippet)} />
                    </div>
                  )}
                  {setupTab === "cli" && (
                    <div className="snippet-stack">
                      <SnippetItem label="Init" code={`npx zephr init --accent ${accentColor}`} onCopy={() => copyAndFlash("CLI", `npx zephr init --accent ${accentColor}`)} />
                      <SnippetItem label="Add a component" code={`npx zephr add button`} onCopy={() => copyAndFlash("Add", "npx zephr add button")} />
                    </div>
                  )}
                  {setupTab === "ai" && (
                    <div className="snippet-stack">
                      <div className="ai-generator-panel">
                        <label className="field">
                          <span>AI tool</span>
                          <div className="generator-chip-row">
                            {(Object.keys(aiToolLabels) as AiToolKey[]).map((tool) => (
                              <button
                                key={tool}
                                type="button"
                                className={`generator-chip ${aiTool === tool ? "is-active" : ""}`}
                                onClick={() => setAiTool(tool)}
                              >
                                {aiToolLabels[tool]}
                              </button>
                            ))}
                          </div>
                        </label>
                        <label className="field">
                          <span>Project preset</span>
                          <div className="generator-chip-row">
                            {(Object.keys(aiProjectLabels) as AiProjectPreset[]).map((project) => (
                              <button
                                key={project}
                                type="button"
                                className={`generator-chip ${aiProject === project ? "is-active" : ""}`}
                                onClick={() => setAiProject(project)}
                              >
                                {aiProjectLabels[project]}
                              </button>
                            ))}
                          </div>
                        </label>
                        <label className="field">
                          <span>Package manager</span>
                          <div className="generator-chip-row">
                            {(["npm", "pnpm", "yarn", "bun"] as const).map((manager) => (
                              <button
                                key={manager}
                                type="button"
                                className={`generator-chip ${aiPackageManager === manager ? "is-active" : ""}`}
                                onClick={() => setAiPackageManager(manager)}
                              >
                                {manager}
                              </button>
                            ))}
                          </div>
                        </label>
                      </div>
                      <SnippetItem
                        label="Create project"
                        code={aiProjectInitCommand}
                        onCopy={() => copyAndFlash("Project init", aiProjectInitCommand)}
                      />
                      <SnippetItem
                        label="Base install"
                        code={aiInstallCommand}
                        onCopy={() => copyAndFlash("Install", aiInstallCommand)}
                      />
                      <SnippetItem
                        label="Cloud assets SDK (optional)"
                        code={aiCloudInstallCommand}
                        onCopy={() => copyAndFlash("Cloud SDK install", aiCloudInstallCommand)}
                      />
                      <SnippetItem
                        label={aiContextPath}
                        code={aiContextSnippet}
                        onCopy={() => copyAndFlash(`${aiContextPath} snippet`, aiContextSnippet)}
                      />
                      <SnippetItem
                        label={`${aiToolLabels[aiTool]} prompt`}
                        code={aiPromptSnippet}
                        onCopy={() => copyAndFlash(`${aiToolLabels[aiTool]} prompt`, aiPromptSnippet)}
                      />
                    </div>
                  )}
                </div>
                {/* ── Step 3 — Build CTA ── */}
                <div className="gs-cta-card">
                  <div className="gs-cta-text">
                    <h3>
                      <span style={{ color: "var(--accent)" }}>Step 3</span> — Start building
                    </h3>
                    <p>Browse 58 AI-ready components, copy snippets, and ship faster.</p>
                  </div>
                  <Button onClick={() => selectComponent("button")}>Browse components →</Button>
                </div>
              </section>
            </>
                ) : view === "speed-insights" ? (
                <>
                  <section id="overview" className="doc-section hero">
                    <p className="breadcrumbs">Get Started</p>
                    <h1>Speed Insights</h1>
                    <p className="lead">
                      This guide will help you get started with using Vercel Speed Insights on your project, showing you how to enable it, add the package to your project, deploy your app to Vercel, and view your data in the dashboard.
                    </p>
                  </section>

                  <section id="prerequisites" className="doc-section">
                    <div className="section-heading">
                      <h2>Prerequisites</h2>
                    </div>
                    <ul className="doc-list">
                      <li>A Vercel account. If you don't have one, you can <a href="https://vercel.com/signup" target="_blank" rel="noopener noreferrer">sign up for free</a>.</li>
                      <li>A Vercel project. If you don't have one, you can <a href="https://vercel.com/new" target="_blank" rel="noopener noreferrer">create a new project</a>.</li>
                      <li>The Vercel CLI installed.</li>
                    </ul>
                  </section>

                  <section id="install-cli" className="doc-section">
                    <div className="section-heading">
                      <h3>Install the Vercel CLI</h3>
                      <p>Choose your package manager:</p>
                    </div>
                    <div className="setup-inner-tabs" role="tablist">
                      {(["pnpm", "yarn", "npm", "bun"] as const).map((pm) => (
                        <button
                          key={pm}
                          type="button"
                          role="tab"
                          aria-selected={packageManager === pm}
                          className={`setup-inner-tab ${packageManager === pm ? "is-active" : ""}`}
                          onClick={() => setPackageManager(pm)}
                        >
                          {pm}
                        </button>
                      ))}
                    </div>
                    <div className="snippet-stack">
                      {packageManager === "pnpm" && (
                        <SnippetItem label="Install CLI" code="pnpm i vercel" onCopy={() => copyAndFlash("Install CLI", "pnpm i vercel")} />
                      )}
                      {packageManager === "yarn" && (
                        <SnippetItem label="Install CLI" code="yarn add vercel" onCopy={() => copyAndFlash("Install CLI", "yarn add vercel")} />
                      )}
                      {packageManager === "npm" && (
                        <SnippetItem label="Install CLI" code="npm i vercel" onCopy={() => copyAndFlash("Install CLI", "npm i vercel")} />
                      )}
                      {packageManager === "bun" && (
                        <SnippetItem label="Install CLI" code="bun add vercel" onCopy={() => copyAndFlash("Install CLI", "bun add vercel")} />
                      )}
                    </div>
                  </section>

                  <section id="enable-insights" className="doc-section">
                    <div className="section-heading">
                      <h2>Enable Speed Insights in Vercel</h2>
                      <p>On the Vercel dashboard, select your Project followed by the <strong>Speed Insights</strong> tab. Then, select <strong>Enable</strong> from the dialog.</p>
                    </div>
                    <Alert status="info" title={<><strong>Note:</strong> Enabling Speed Insights will add new routes (scoped at <code>/_vercel/speed-insights/*</code>) after your next deployment.</>} />
                  </section>

                  <section id="add-package" className="doc-section">
                    <div className="section-heading">
                      <h2>Add @vercel/speed-insights to your project</h2>
                      <p>Using the package manager of your choice, add the @vercel/speed-insights package to your project:</p>
                    </div>
                    <div className="setup-inner-tabs" role="tablist">
                      {(["pnpm", "yarn", "npm", "bun"] as const).map((pm) => (
                        <button
                          key={pm}
                          type="button"
                          role="tab"
                          aria-selected={packageManager === pm}
                          className={`setup-inner-tab ${packageManager === pm ? "is-active" : ""}`}
                          onClick={() => setPackageManager(pm)}
                        >
                          {pm}
                        </button>
                      ))}
                    </div>
                    <div className="snippet-stack">
                      {packageManager === "pnpm" && (
                        <SnippetItem label="Install" code="pnpm i @vercel/speed-insights" onCopy={() => copyAndFlash("Install", "pnpm i @vercel/speed-insights")} />
                      )}
                      {packageManager === "yarn" && (
                        <SnippetItem label="Install" code="yarn add @vercel/speed-insights" onCopy={() => copyAndFlash("Install", "yarn add @vercel/speed-insights")} />
                      )}
                      {packageManager === "npm" && (
                        <SnippetItem label="Install" code="npm i @vercel/speed-insights" onCopy={() => copyAndFlash("Install", "npm i @vercel/speed-insights")} />
                      )}
                      {packageManager === "bun" && (
                        <SnippetItem label="Install" code="bun add @vercel/speed-insights" onCopy={() => copyAndFlash("Install", "bun add @vercel/speed-insights")} />
                      )}
                    </div>
                    <Alert status="info" title={<><strong>HTML Implementation Note:</strong> When using the HTML implementation, there is no need to install the @vercel/speed-insights package.</>} />
                  </section>

                  <section id="add-component" className="doc-section">
                    <div className="section-heading">
                      <h2>Add the SpeedInsights component</h2>
                      <p>Choose your framework to see specific implementation instructions:</p>
                    </div>
                    <div className="setup-inner-tabs" role="tablist">
                      {(["nextjs", "nextjs-app", "react", "remix", "sveltekit", "vue", "nuxt", "astro", "html", "other"] as const).map((fw) => (
                        <button
                          key={fw}
                          type="button"
                          role="tab"
                          aria-selected={framework === fw}
                          className={`setup-inner-tab ${framework === fw ? "is-active" : ""}`}
                          onClick={() => setFramework(fw)}
                        >
                          {fw === "nextjs" ? "Next.js Pages" :
                            fw === "nextjs-app" ? "Next.js App" :
                              fw === "react" ? "React" :
                                fw === "other" ? "Other" :
                                  fw.charAt(0).toUpperCase() + fw.slice(1)}
                        </button>
                      ))}
                    </div>

                    {framework === "nextjs" && (
                      <div className="snippet-stack">
                        <p>The SpeedInsights component is a wrapper around the tracking script, offering more seamless integration with Next.js.</p>
                        <p>Add the following component to your main app file:</p>
                        <SnippetItem
                          label="pages/_app.tsx"
                          code={`import type { AppProps } from 'next/app';
import { SpeedInsights } from '@vercel/speed-insights/next';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <SpeedInsights />
    </>
  );
}

export default MyApp;`}
                          onCopy={() => copyAndFlash("Next.js Pages", "Next.js Pages integration code")}
                        />
                        <Alert status="info" title={<><strong>For Next.js versions older than 13.5:</strong> Import the SpeedInsights component from <code>@vercel/speed-insights/react</code> and pass it the pathname of the route.</>} />
                      </div>
                    )}

                    {framework === "nextjs-app" && (
                      <div className="snippet-stack">
                        <p>The SpeedInsights component is a wrapper around the tracking script, offering more seamless integration with Next.js.</p>
                        <p>Add the following component to the root layout:</p>
                        <SnippetItem
                          label="app/layout.tsx"
                          code={`import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Next.js</title>
      </head>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}`}
                          onCopy={() => copyAndFlash("Next.js App", "Next.js App Router integration code")}
                        />
                        <Alert status="info" title={<><strong>For Next.js versions older than 13.5:</strong> Import from <code>@vercel/speed-insights/react</code> and create a dedicated component to avoid opting out from SSR on the layout.</>} />
                      </div>
                    )}

                    {framework === "react" && (
                      <div className="snippet-stack">
                        <p>The SpeedInsights component is a wrapper around the tracking script, offering more seamless integration with React.</p>
                        <p>Add the following component to the main app file:</p>
                        <SnippetItem
                          label="App.tsx"
                          code={`import { SpeedInsights } from '@vercel/speed-insights/react';

export default function App() {
  return (
    <div>
      {/* Your app content */}
      <SpeedInsights />
    </div>
  );
}`}
                          onCopy={() => copyAndFlash("React", "React integration code")}
                        />
                      </div>
                    )}

                    {framework === "remix" && (
                      <div className="snippet-stack">
                        <p>The SpeedInsights component is a wrapper around the tracking script, offering a seamless integration with Remix.</p>
                        <p>Add the following component to your root file:</p>
                        <SnippetItem
                          label="app/root.tsx"
                          code={`import { SpeedInsights } from '@vercel/speed-insights/remix';

export default function App() {
  return (
    <html lang="en">
      <body>
        {/* Your app content */}
        <SpeedInsights />
      </body>
    </html>
  );
}`}
                          onCopy={() => copyAndFlash("Remix", "Remix integration code")}
                        />
                      </div>
                    )}

                    {framework === "sveltekit" && (
                      <div className="snippet-stack">
                        <p>Add the following to your root file:</p>
                        <SnippetItem
                          label="src/routes/+layout.ts"
                          code={`import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";

injectSpeedInsights();`}
                          onCopy={() => copyAndFlash("SvelteKit", "SvelteKit integration code")}
                        />
                      </div>
                    )}

                    {framework === "vue" && (
                      <div className="snippet-stack">
                        <p>The SpeedInsights component is a wrapper around the tracking script, offering more seamless integration with Vue.</p>
                        <p>Add the following component to the main app template:</p>
                        <SnippetItem
                          label="src/App.vue"
                          code={`<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/vue';
</script>

<template>
  <SpeedInsights />
</template>`}
                          onCopy={() => copyAndFlash("Vue", "Vue integration code")}
                        />
                      </div>
                    )}

                    {framework === "nuxt" && (
                      <div className="snippet-stack">
                        <p>The SpeedInsights component is a wrapper around the tracking script, offering more seamless integration with Nuxt.</p>
                        <p>Add the following component to the default layout:</p>
                        <SnippetItem
                          label="layouts/default.vue"
                          code={`<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/vue';
</script>

<template>
  <SpeedInsights />
</template>`}
                          onCopy={() => copyAndFlash("Nuxt", "Nuxt integration code")}
                        />
                      </div>
                    )}

                    {framework === "astro" && (
                      <div className="snippet-stack">
                        <p>Speed Insights is available for both static and SSR Astro apps.</p>
                        <p>Declare the SpeedInsights component near the bottom of one of your layout components:</p>
                        <SnippetItem
                          label="BaseHead.astro"
                          code={`---
import SpeedInsights from '@vercel/speed-insights/astro';
const { title, description } = Astro.props;
---
<title>{title}</title>
<meta name="title" content={title} />
<meta name="description" content={description} />

<SpeedInsights />`}
                          onCopy={() => copyAndFlash("Astro", "Astro integration code")}
                        />
                        <Alert status="info" title={<><strong>Optional:</strong> You can remove sensitive information from the URL by adding a <code>speedInsightsBeforeSend</code> function to the global window object.</>} />
                      </div>
                    )}

                    {framework === "html" && (
                      <div className="snippet-stack">
                        <p>Add the following scripts before the closing tag of the body:</p>
                        <SnippetItem
                          label="index.html"
                          code={`<script>
  window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };
</script>
<script defer src="/_vercel/speed-insights/script.js"></script>`}
                          onCopy={() => copyAndFlash("HTML", "HTML integration code")}
                        />
                      </div>
                    )}

                    {framework === "other" && (
                      <div className="snippet-stack">
                        <p>Import the injectSpeedInsights function from the package, which will add the tracking script to your app. This should only be called once in your app, and must run in the client.</p>
                        <SnippetItem
                          label="main.ts"
                          code={`import { injectSpeedInsights } from "@vercel/speed-insights";

injectSpeedInsights();`}
                          onCopy={() => copyAndFlash("Other", "Generic integration code")}
                        />
                      </div>
                    )}
                  </section>

                  <section id="deploy" className="doc-section">
                    <div className="section-heading">
                      <h2>Deploy your app to Vercel</h2>
                      <p>You can deploy your app to Vercel's global CDN by running the following command from your terminal:</p>
                    </div>
                    <div className="snippet-stack">
                      <SnippetItem
                        label="Deploy"
                        code="vercel deploy"
                        onCopy={() => copyAndFlash("Deploy", "vercel deploy")}
                      />
                      <p>Alternatively, you can connect your project's git repository, which will enable Vercel to deploy your latest pushes and merges to main.</p>
                      <Alert status="info" title={<><strong>Note:</strong> If everything is set up correctly, you should be able to find the <code>/_vercel/speed-insights/script.js</code> script inside the body tag of your page.</>} />
                    </div>
                  </section>

                  <section id="view-data" className="doc-section">
                    <div className="section-heading">
                      <h2>View your data in the dashboard</h2>
                      <p>Once your app is deployed, and users have visited your site, you can view the data in the dashboard.</p>
                    </div>
                    <p>To do so, go to your dashboard, select your project, and click the <strong>Speed Insights</strong> tab.</p>
                    <p>After a few days of visitors, you'll be able to start exploring your metrics.</p>
                  </section>

                  <section id="next-steps" className="doc-section">
                    <div className="section-heading">
                      <h2>Next steps</h2>
                      <p>Now that you have Vercel Speed Insights set up, you can explore the following topics to learn more:</p>
                    </div>
                    <ul className="doc-list">
                      <li>Learn how to use the <code>@vercel/speed-insights</code> package</li>
                      <li>Learn about metrics</li>
                      <li>Read about privacy and compliance</li>
                      <li>Explore pricing</li>
                      <li>Troubleshooting</li>
                    </ul>
                    <div className="start-cta">
                      <Button onClick={() => selectComponent("button")}>Browse components</Button>
                    </div>
                  </section>
                </>
          ) : view === "foundations" ? (
            <>
              {/* ── Hero ── */}
              <section id="foundations-overview" className="doc-section hero">
                <p className="breadcrumbs">Foundations</p>
                <h1>Design Tokens</h1>
                <p className="lead">
                  Every Zephr component is built on CSS variables generated from a single token source — colors, spacing, typography, motion, and more. Change one token; everything updates.
                </p>
                {/* Stats row */}
                <div className="foundations-hero-stats" aria-label="Token system stats">
                  <div className="foundations-stat">
                    <span className="foundations-stat-num">200+</span>
                    <span className="foundations-stat-label">CSS tokens</span>
                  </div>
                  <div className="foundations-stat-divider" aria-hidden="true" />
                  <div className="foundations-stat">
                    <span className="foundations-stat-num">6</span>
                    <span className="foundations-stat-label">Token categories</span>
                  </div>
                  <div className="foundations-stat-divider" aria-hidden="true" />
                  <div className="foundations-stat">
                    <span className="foundations-stat-num">2</span>
                    <span className="foundations-stat-label">Built-in themes</span>
                  </div>
                  <div className="foundations-stat-divider" aria-hidden="true" />
                  <div className="foundations-stat">
                    <span className="foundations-stat-num">∞</span>
                    <span className="foundations-stat-label">Accent variants</span>
                  </div>
                </div>
              </section>

              {/* ── How the token system works ── */}
              <section id="how-tokens-work" className="doc-section">
                <div className="section-heading">
                  <h2>How the token system works</h2>
                  <p>Three layers transform a single design decision into every component in your UI.</p>
                </div>
                <div className="token-flow-premium" role="list">
                  {/* Step 1 */}
                  <div className="token-flow-card" role="listitem">
                    <div className="token-flow-card-header">
                      <div className="token-flow-card-icon" aria-hidden="true">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                        </svg>
                      </div>
                      <div className="token-flow-card-num">1</div>
                    </div>
                    <h3>Design tokens</h3>
                    <p>A single JSON/TS source of truth defines all colors, spacing, radii, shadows, and motion values.</p>
                    <div className="token-flow-card-example">color.primary: "#533afd"</div>
                  </div>

                  {/* Arrow */}
                  <div className="token-flow-arrow-premium" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
                    </svg>
                  </div>

                  {/* Step 2 */}
                  <div className="token-flow-card" role="listitem">
                    <div className="token-flow-card-header">
                      <div className="token-flow-card-icon" aria-hidden="true">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                        </svg>
                      </div>
                      <div className="token-flow-card-num">2</div>
                    </div>
                    <h3>CSS Variables</h3>
                    <p>Tokens compile into namespaced <code>--z-*</code> variables injected at <code>:root</code> — available to every rule on the page.</p>
                    <div className="token-flow-card-example">--z-color-primary: #533afd</div>
                  </div>

                  {/* Arrow */}
                  <div className="token-flow-arrow-premium" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
                    </svg>
                  </div>

                  {/* Step 3 */}
                  <div className="token-flow-card" role="listitem">
                    <div className="token-flow-card-header">
                      <div className="token-flow-card-icon" aria-hidden="true">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6"/><path d="M9 12h6"/><path d="M9 15h4"/>
                        </svg>
                      </div>
                      <div className="token-flow-card-num">3</div>
                    </div>
                    <h3>Components</h3>
                    <p>Every component reads CSS variables at render time. Swap a theme, change the accent — the UI updates everywhere, instantly.</p>
                    <div className="token-flow-card-example">background: var(--z-color-primary)</div>
                  </div>
                </div>
              </section>

              {/* ── Naming convention ── */}
              <section id="token-naming" className="doc-section">
                <div className="section-heading">
                  <h2>Naming convention</h2>
                  <p>All tokens follow one predictable pattern: <code>--z-&#123;category&#125;-&#123;name&#125;</code></p>
                </div>
                <div className="token-naming-grid-premium">
                  {/* Color */}
                  <div className="token-naming-card-premium">
                    <div className="token-naming-card-icon" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                      </svg>
                    </div>
                    <code className="token-naming-card-prefix">--z-color-</code>
                    <span className="token-naming-card-desc">Semantic color roles</span>
                    <div className="token-naming-card-examples">
                      {["primary", "surface", "muted", "danger", "success"].map(v => (
                        <span key={v} className="token-naming-card-example-chip">{v}</span>
                      ))}
                    </div>
                  </div>
                  {/* Space */}
                  <div className="token-naming-card-premium">
                    <div className="token-naming-card-icon" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 10 20 15 15 20"/><path d="M4 4v7a4 4 0 0 0 4 4h12"/>
                      </svg>
                    </div>
                    <code className="token-naming-card-prefix">--z-space-</code>
                    <span className="token-naming-card-desc">Spacing scale</span>
                    <div className="token-naming-card-examples">
                      {["1", "2", "3", "4", "6", "8", "12"].map(v => (
                        <span key={v} className="token-naming-card-example-chip">{v}</span>
                      ))}
                    </div>
                  </div>
                  {/* Radius */}
                  <div className="token-naming-card-premium">
                    <div className="token-naming-card-icon" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="5"/>
                      </svg>
                    </div>
                    <code className="token-naming-card-prefix">--z-radius-</code>
                    <span className="token-naming-card-desc">Corner rounding</span>
                    <div className="token-naming-card-examples">
                      {["none", "sm", "md", "lg", "xl", "pill"].map(v => (
                        <span key={v} className="token-naming-card-example-chip">{v}</span>
                      ))}
                    </div>
                  </div>
                  {/* Shadow */}
                  <div className="token-naming-card-premium">
                    <div className="token-naming-card-icon" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="16" height="16" rx="2"/><path d="M8 8h14v14H8z" strokeOpacity="0.4"/>
                      </svg>
                    </div>
                    <code className="token-naming-card-prefix">--z-shadow-</code>
                    <span className="token-naming-card-desc">Elevation levels</span>
                    <div className="token-naming-card-examples">
                      {["none", "sm", "md", "lg"].map(v => (
                        <span key={v} className="token-naming-card-example-chip">{v}</span>
                      ))}
                    </div>
                  </div>
                  {/* Type */}
                  <div className="token-naming-card-premium">
                    <div className="token-naming-card-icon" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/>
                      </svg>
                    </div>
                    <code className="token-naming-card-prefix">--z-type-</code>
                    <span className="token-naming-card-desc">Typography system</span>
                    <div className="token-naming-card-examples">
                      {["size-sm", "size-lg", "weight-bold", "family-sans"].map(v => (
                        <span key={v} className="token-naming-card-example-chip">{v}</span>
                      ))}
                    </div>
                  </div>
                  {/* Motion */}
                  <div className="token-naming-card-premium">
                    <div className="token-naming-card-icon" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                      </svg>
                    </div>
                    <code className="token-naming-card-prefix">--z-motion-</code>
                    <span className="token-naming-card-desc">Animation timing</span>
                    <div className="token-naming-card-examples">
                      {["duration-fast", "duration-slow", "easing-standard"].map(v => (
                        <span key={v} className="token-naming-card-example-chip">{v}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Color Palette */}
              <section id="color-palette" className="doc-section">
                <div className="section-heading">
                  <div className="section-heading-row">
                    <div>
                      <h2>Color Palette</h2>
                      <p>Grouped semantic tokens with light and dark mappings for background, text, accent, and system feedback.</p>
                    </div>
                    <Badge tone="info">Default theme</Badge>
                  </div>
                </div>
                <div className="foundation-color-groups">
                  {foundationColorGroups.map((group) => (
                    <article key={group.id} className="foundation-color-group">
                      <div className="foundation-color-head">
                        <h3>{group.label}</h3>
                        <p>{group.description}</p>
                      </div>

                      <div className="foundation-color-tiles">
                        {group.tokens.map((token) => (
                          <button
                            key={token.token}
                            type="button"
                            className="foundation-color-tile"
                            onClick={() => copyAndFlash(token.variable, `var(${token.variable})`)}
                            title={`Copy var(${token.variable})`}
                          >
                            <div
                              className="foundation-color-swatch"
                              style={{ background: token.activeColor }}
                              aria-hidden="true"
                            />
                            <div className="foundation-color-tile-meta">
                              <strong>{token.token}</strong>
                              <code>{token.variable}</code>
                            </div>
                          </button>
                        ))}
                      </div>

                      <div className="foundation-color-table-shell">
                        <table className="foundation-color-table">
                          <thead>
                            <tr>
                              <th>Variable name</th>
                              <th>Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {group.tokens.map((token) => (
                              <tr key={`${group.id}-${token.token}`}>
                                <td>
                                  <button
                                    type="button"
                                    className="foundation-color-var"
                                    onClick={() => copyAndFlash(token.variable, `var(${token.variable})`)}
                                    title={`Copy ${token.variable}`}
                                  >
                                    <code>{token.variable}</code>
                                  </button>
                                </td>
                                <td>
                                  <button
                                    type="button"
                                    className="foundation-color-chip"
                                    onClick={() => copyAndFlash(token.variable, token.activeColor)}
                                    title={`Copy ${token.activeColor}`}
                                  >
                                    <span className="foundation-color-dot" style={{ background: token.activeColor }} />
                                    <code>{token.activeColor}</code>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              {/* Token Variables */}
              <section id="token-variables" className="doc-section">
                <div className="section-heading">
                  <h2>Token Variables</h2>
                  <p>Spacing, corner radius, shadows, motion, and breakpoints — all available as CSS variables.</p>
                </div>

                <div className="token-table-group">
                  <h3>Space</h3>
                  <div className="token-table">
                    <div className="token-row token-header">
                      <span>Token</span><span>CSS Variable</span><span>Value</span><span>Preview</span>
                    </div>
                    {Object.entries(stylePacks[stylePack].space).map(([key, val]) => (
                      <button key={key} type="button" className="token-row" onClick={() => copyAndFlash(`--z-space-${key}`, `var(--z-space-${key})`)}>
                        <span className="token-name">space-{key}</span>
                        <code>--z-space-{key}</code>
                        <code>{val}</code>
                        <span className="token-bar" style={{ width: val, minWidth: "2px" }} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="token-table-group">
                  <h3>Corner Radius</h3>
                  <div className="token-table">
                    <div className="token-row token-header">
                      <span>Token</span><span>CSS Variable</span><span>Value</span><span>Preview</span>
                    </div>
                    {Object.entries(stylePacks[stylePack].radius).map(([key, val]) => (
                      <button key={key} type="button" className="token-row" onClick={() => copyAndFlash(`--z-radius-${key}`, `var(--z-radius-${key})`)}>
                        <span className="token-name">radius-{key}</span>
                        <code>--z-radius-{key}</code>
                        <code>{val}</code>
                        <span className="token-radius-preview" style={{ borderRadius: val }} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="token-table-group">
                  <h3>Shadows</h3>
                  <div className="token-table">
                    <div className="token-row token-header">
                      <span>Token</span><span>CSS Variable</span><span>Value</span><span>Preview</span>
                    </div>
                    {Object.entries(stylePacks[stylePack].shadow).map(([key, val]) => (
                      <button key={key} type="button" className="token-row" onClick={() => copyAndFlash(`--z-shadow-${key}`, `var(--z-shadow-${key})`)}>
                        <span className="token-name">shadow-{key}</span>
                        <code>--z-shadow-{key}</code>
                        <code className="token-value-sm">{val}</code>
                        <span className="token-shadow-preview" style={{ boxShadow: val }} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="token-table-group">
                  <h3>Motion</h3>
                  <div className="token-table">
                    <div className="token-row token-header">
                      <span>Token</span><span>CSS Variable</span><span>Value</span>
                    </div>
                    {Object.entries(stylePacks[stylePack].motion.duration).map(([key, val]) => (
                      <button key={`dur-${key}`} type="button" className="token-row" onClick={() => copyAndFlash(`--z-motion-duration-${key}`, `var(--z-motion-duration-${key})`)}>
                        <span className="token-name">duration-{key}</span>
                        <code>--z-motion-duration-{key}</code>
                        <code>{val}</code>
                      </button>
                    ))}
                    {Object.entries(stylePacks[stylePack].motion.easing).map(([key, val]) => (
                      <button key={`ease-${key}`} type="button" className="token-row" onClick={() => copyAndFlash(`--z-motion-easing-${key}`, `var(--z-motion-easing-${key})`)}>
                        <span className="token-name">easing-{key}</span>
                        <code>--z-motion-easing-{key}</code>
                        <code className="token-value-sm">{val}</code>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="token-table-group">
                  <h3>Breakpoints</h3>
                  <div className="token-table">
                    <div className="token-row token-header">
                      <span>Token</span><span>CSS Variable</span><span>Value</span>
                    </div>
                    {Object.entries(stylePacks[stylePack].breakpoints).map(([key, val]) => (
                      <button key={key} type="button" className="token-row" onClick={() => copyAndFlash(`--z-bp-${key}`, `var(--z-bp-${key})`)}>
                        <span className="token-name">bp-{key}</span>
                        <code>--z-bp-{key}</code>
                        <code>{val}</code>
                      </button>
                    ))}
                  </div>
                </div>
              </section>

              {/* Typography */}
              <section id="typography" className="doc-section">
                <div className="section-heading">
                  <h2>Typography</h2>
                  <p>Inter is the primary family and Monaco is used for monospace. Scales are grouped by use case.</p>
                </div>

                <div className="typography-family-row">
                  <div className="typography-family-card">
                    <div className="typography-family-letter">Aa</div>
                    <div className="typography-family-name">Inter</div>
                  </div>
                  <div className="typography-family-card typography-family-card--mono">
                    <div className="typography-family-letter">Aa</div>
                    <div className="typography-family-name">Monaco</div>
                  </div>
                </div>

                <div className="typography-groups">
                  {typographyGroups.map((group) => (
                    <article key={group.id} className="typography-group">
                      <div className="typography-group-head">
                        <h3>{group.label}</h3>
                        <p>{group.description}</p>
                      </div>

                      <div className="typography-table-shell">
                        <table className="typography-table">
                          <colgroup>
                            <col className="typography-col-style" />
                            <col className="typography-col-size" />
                            <col className="typography-col-weight" />
                            <col className="typography-col-preview" />
                          </colgroup>
                          <thead>
                            <tr>
                              <th>Style</th>
                              <th>Size</th>
                              <th>Weight</th>
                              <th>Preview</th>
                            </tr>
                          </thead>
                          <tbody>
                            {group.rows.map((row) => (
                              <tr key={`${group.id}-${row.token}`}>
                                <td>
                                  <div className="typography-style-name">
                                    <strong>{row.label}</strong>
                                    <code>{row.token}</code>
                                  </div>
                                </td>
                                <td><code>{row.size}</code></td>
                                <td><code>{row.weightLabel}</code></td>
                                <td>
                                  <div
                                    className="typography-specimen"
                                    style={{
                                      fontFamily: row.family === "monaco"
                                        ? "'Monaco', 'Menlo', 'Consolas', monospace"
                                        : "'Inter', 'Satoshi', 'Segoe UI', sans-serif",
                                      fontSize: row.size,
                                      fontWeight: row.weightValue,
                                      textTransform: row.caps ? "uppercase" : "none",
                                      letterSpacing: row.letterSpacing ?? "normal"
                                    }}
                                  >
                                    <span className="typography-specimen-title">{row.previewTitle}</span>
                                    <span className="typography-specimen-line">{row.previewLine}</span>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </>
          ) : view === "mission" ? (
            <>
              <section id="mission-overview" className="doc-section hero">
                <p className="breadcrumbs">Setup / Mission</p>
                <h1>Mission and vision</h1>
                <p className="lead">
                  Zephr helps vibe coders ship clean, production-ready interfaces without a full design or frontend team.
                </p>
              </section>

              <section id="mission-pillars" className="doc-section">
                <div className="section-heading">
                  <h2>Mission pillars</h2>
                  <p>Principles that keep Zephr useful for both designers and developers.</p>
                </div>
                <div className="mission-pillars-grid">
                  <article className="mission-pillar">
                    <div className="mission-pillar-icon">
                      <span className="ms" style={{ fontSize: 28 }}>layers</span>
                    </div>
                    <h3>AI-first developer experience</h3>
                    <p>Every component ships with prompt-ready snippets, registry metadata, and usage examples — so AI tools generate usable code on the first pass.</p>
                    <div className="mission-pillar-tags">
                      <span>MCP tools</span>
                      <span>llms.txt</span>
                      <span>Per-tool prompts</span>
                    </div>
                  </article>
                  <article className="mission-pillar">
                    <div className="mission-pillar-icon">
                      <span className="ms" style={{ fontSize: 28 }}>schedule</span>
                    </div>
                    <h3>Consistent visual language</h3>
                    <p>Shared design tokens prevent the random look and feel that plagues AI-generated UIs. One accent color, one source of truth.</p>
                    <div className="mission-pillar-tags">
                      <span>CSS variables</span>
                      <span>Default theme</span>
                      <span>Dark mode</span>
                    </div>
                  </article>
                  <article className="mission-pillar">
                    <div className="mission-pillar-icon">
                      <span className="ms" style={{ fontSize: 28 }}>description</span>
                    </div>
                    <h3>Plug-and-play adoption</h3>
                    <p>Install one package, set your accent, and start shipping. No config files, no utility class setup, no Tailwind prerequisite.</p>
                    <div className="mission-pillar-tags">
                      <span>Zero-config</span>
                      <span>One package</span>
                      <span>Instant defaults</span>
                    </div>
                  </article>
                </div>
              </section>

              <section id="design-philosophy" className="doc-section">
                <div className="section-heading">
                  <h2>Design philosophy</h2>
                  <p>What makes Zephr different from other component systems.</p>
                </div>
                <div className="philosophy-comparison">
                  <div className="philosophy-col before">
                    <h4>Traditional approach</h4>
                    <ul>
                      <li>Copy-paste components from shadcn</li>
                      <li>Configure Tailwind + PostCSS</li>
                      <li>Manual theming with utility overrides</li>
                      <li>AI generates inconsistent styles</li>
                      <li>Dark mode retrofitted after the fact</li>
                    </ul>
                  </div>
                  <div className="philosophy-col after">
                    <h4>Zephr approach</h4>
                    <ul>
                      <li>Import from a single package</li>
                      <li>Zero config — works instantly</li>
                      <li>Tokens drive all visual decisions</li>
                      <li>AI uses registry metadata for consistency</li>
                      <li>Dark mode built into every token</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section id="vision-principles" className="doc-section">
                <div className="section-heading">
                  <h2>Vision</h2>
                  <p>Make high-quality UI delivery accessible to any product team, regardless of frontend bandwidth.</p>
                </div>
                <div className="vision-timeline">
                  <div className="vision-item">
                    <div className="vision-dot"></div>
                    <div className="vision-text">
                      <strong>Unified component API</strong>
                      <p>Single API across light and dark modes with one refined default theme.</p>
                    </div>
                  </div>
                  <div className="vision-item">
                    <div className="vision-dot"></div>
                    <div className="vision-text">
                      <strong>Token-driven source of truth</strong>
                      <p>Design tokens power code, docs, and AI tooling — one change propagates everywhere.</p>
                    </div>
                  </div>
                  <div className="vision-item">
                    <div className="vision-dot"></div>
                    <div className="vision-text">
                      <strong>Cloud asset platform</strong>
                      <p>Icons, avatars, and logos under one platform with API-key access and CDN delivery.</p>
                    </div>
                  </div>
                  <div className="vision-item">
                    <div className="vision-dot"></div>
                    <div className="vision-text">
                      <strong>Agent-native ecosystem</strong>
                      <p>Registry metadata, MCP server, and per-tool prompts for Claude, Cursor, Codex, and Lovable.</p>
                    </div>
                  </div>
                </div>
              </section>
            </>
          ) : view === "team" ? (
            <>
              <section id="team-overview" className="doc-section hero">
                <p className="breadcrumbs">Setup / Team</p>
                <h1>Team and operating model</h1>
                <p className="lead">
                  Zephr is built as a cross-functional platform: product design, design systems, frontend engineering,
                  and developer relations moving on one release cadence.
                </p>
              </section>

              <section id="team-directory" className="doc-section">
                <div className="section-heading">
                  <h2>Core team</h2>
                  <p>Ownership model for v1 delivery and post-launch support.</p>
                </div>
                <div className="team-grid">
                  {tableRows.map((member) => (
                    <article key={member.id} className="team-card">
                      <Avatar name={member.name} size={48} />
                      <div className="team-card-info">
                        <strong>{member.name}</strong>
                        <p>{member.role}</p>
                        <Badge tone="neutral" size="sm">{member.squad}</Badge>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section id="team-process" className="doc-section">
                <div className="section-heading">
                  <h2>How we ship</h2>
                  <p>Process used to maintain parity with top component and docs ecosystems.</p>
                </div>
                <div className="process-grid">
                  <div className="process-step">
                    <div className="process-step-num">1</div>
                    <h3>Token first</h3>
                    <p>Design token updates land before component recipe changes — ensuring visual consistency.</p>
                  </div>
                  <div className="process-step">
                    <div className="process-step-num">2</div>
                    <h3>Build &amp; verify</h3>
                    <p>Every PR runs typecheck + build across all 11 packages. Agent-smoke tests for docs interactions.</p>
                  </div>
                  <div className="process-step">
                    <div className="process-step-num">3</div>
                    <h3>Registry sync</h3>
                    <p>Registry + MCP updates ship in the same PR as component updates — zero drift between CLI, docs, and code.</p>
                  </div>
                  <div className="process-step">
                    <div className="process-step-num">4</div>
                    <h3>Weekly releases</h3>
                    <p>Release train with changelog and regression checks. Every release updates <code>llms.txt</code> for AI tools.</p>
                  </div>
                </div>
              </section>
            </>
          ) : view === "api-reference" ? (
            <>
              <div className="component-page-tabs">
                <button type="button" className="component-page-tab" onClick={() => setView("components")}>Guides</button>
                <button type="button" className="component-page-tab is-active">API Reference</button>
              </div>
              <section id="api-overview" className="doc-section hero">
                <p className="breadcrumbs">API Reference / Components</p>
                <p className="eyebrow">{selectedEntry.category} • {selectedEntry.id}</p>
                <h1>{selectedEntry.name} API</h1>
                <p className="lead">
                  Generated from Zephr registry metadata. This is the canonical contract AI tools should follow.
                </p>
                <div className="hero-actions">
                  <Button onClick={() => copyAndFlash("Import snippet", importSnippet)}>Copy import</Button>
                  <Button variant="secondary" onClick={() => copyAndFlash("Install command", installCommand)}>Copy install</Button>
                </div>
              </section>

              <section id="api-props" className="doc-section">
                <div className="section-heading">
                  <h2>Props</h2>
                  <p>Table generated directly from <code>propsSchema</code> in the component registry.</p>
                </div>

                <div className="api-table-shell">
                  <table className="api-table">
                    <thead>
                      <tr>
                        <th scope="col">Prop</th>
                        <th scope="col">Type</th>
                        <th scope="col">Description</th>
                        <th scope="col">Accepted Values</th>
                        <th scope="col">Required</th>
                        <th scope="col">Default</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {apiPropRows.map((row) => (
                        <tr key={row.name}>
                          <td><code>{row.name}</code></td>
                          <td><code>{row.type}</code></td>
                          <td>{row.description}</td>
                          <td>{row.acceptedValues}</td>
                          <td>{row.required ? "Yes" : "No"}</td>
                          <td>{row.defaultValue}</td>
                          <td>{row.deprecated ? "Deprecated" : "Active"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="api-examples" className="doc-section">
                <div className="section-heading">
                  <h2>Registry schema</h2>
                  <p>Raw <code>propsSchema</code> from the component registry — the canonical contract for AI tools.</p>
                </div>
                <div className="snippet-stack">
                  <SnippetItem
                    label="propsSchema JSON"
                    code={JSON.stringify(selectedEntry.propsSchema, null, 2)}
                    onCopy={() => copyAndFlash("propsSchema JSON", JSON.stringify(selectedEntry.propsSchema, null, 2))}
                  />
                </div>
              </section>

              <section id="api-contract" className="doc-section">
                <div className="section-heading">
                  <h2>Contract notes</h2>
                  <p>Additional metadata for runtime compatibility, accessibility, and visual system support.</p>
                </div>
                <div className="api-meta-grid">
                  <article className="api-meta-card">
                    <h3>Dependencies</h3>
                    <p>{selectedEntry.dependencies.join(", ")}</p>
                  </article>
                  <article className="api-meta-card">
                    <h3>Visual system</h3>
                    <p>Default Zephr visual system with accent overrides</p>
                  </article>
                  <article className="api-meta-card">
                    <h3>Accessibility</h3>
                    <p>{selectedEntry.a11yNotes.join(" ")}</p>
                  </article>
                  <article className="api-meta-card">
                    <h3>AI Hints</h3>
                    <p>
                      Do: {selectedEntry.aiHints.positive.join(" ")}
                      {" "}
                      Avoid: {selectedEntry.aiHints.negative.join(" ")}
                    </p>
                  </article>
                </div>
              </section>
            </>
          ) : view === "widgets" ? (
            <Suspense
              fallback={(
                <section className="doc-section">
                  <div className="widget-empty-state">
                    <strong>Loading widgets…</strong>
                    <p>Preparing the gallery and code examples.</p>
                  </div>
                </section>
              )}
            >
              <WidgetsPage
                widgetSurface={widgetSurface}
                showcaseVersion={showcaseVersion}
                onCopy={copyAndFlash}
              />
            </Suspense>
          ) : view === "templates" ? (
            <Suspense
              fallback={(
                <section className="doc-section">
                  <div className="widget-empty-state">
                    <strong>Loading templates…</strong>
                    <p>Preparing the page previews and snippets.</p>
                  </div>
                </section>
              )}
            >
              <TemplatesPage
                widgetSurface={widgetSurface}
                showcaseVersion={showcaseVersion}
                onCopy={copyAndFlash}
              />
            </Suspense>
          ) : view === "component-gallery" ? (
            <>
              {/* ── Hero ─────────────────────────────────────────────────────── */}
              <section id="gallery-overview" className="doc-section gallery-hero">
                <p className="breadcrumbs">Components</p>
                <h1>
                  <span className="gallery-hero-num">
                    {registry.filter(e => e.category === "atom" || e.category === "molecule" || e.category === "organism").length}
                  </span>
                  {" "}production-ready components
                </h1>
                <p className="lead">
                  Token-driven, AI-native, and free. Every component ships with full prop types, accessibility notes, and AI context — ready to drop into any project.
                </p>

                {/* Search */}
                <div className="gallery-search-wrap">
                  <svg className="gallery-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                  <input
                    type="search"
                    className="gallery-search-input"
                    placeholder="Search components…"
                    value={gallerySearch}
                    onChange={(e) => setGallerySearch(e.target.value)}
                    aria-label="Search components"
                    autoComplete="off"
                  />
                  {gallerySearch && (
                    <button
                      type="button"
                      className="gallery-search-clear"
                      onClick={() => setGallerySearch("")}
                      aria-label="Clear search"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Category filter pills */}
                <div className="gallery-filter-pills" role="tablist" aria-label="Filter by category">
                  {(["all", "atom", "molecule", "organism"] as const).map((cat) => {
                    const label = cat === "all" ? "All" : cat === "atom" ? "Atoms" : cat === "molecule" ? "Molecules" : "Organisms";
                    const count = cat === "all"
                      ? registry.filter(e => e.category === "atom" || e.category === "molecule" || e.category === "organism").length
                      : registry.filter(e => e.category === cat).length;
                    return (
                      <button
                        key={cat}
                        type="button"
                        role="tab"
                        aria-selected={galleryCat === cat}
                        className={`gallery-filter-pill${galleryCat === cat ? " is-active" : ""}`}
                        onClick={() => setGalleryCat(cat)}
                      >
                        {label}
                        <span className="gallery-filter-count">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* ── Component grid ───────────────────────────────────────────── */}
              {(() => {
                const filtered = registry.filter((e) => {
                  if (e.category !== "atom" && e.category !== "molecule" && e.category !== "organism") return false;
                  if (galleryCat !== "all" && e.category !== galleryCat) return false;
                  if (gallerySearch) {
                    const q = gallerySearch.toLowerCase();
                    return e.name.toLowerCase().includes(q) || (e.description || "").toLowerCase().includes(q);
                  }
                  return true;
                });

                // Empty state
                if (!filtered.length) {
                  return (
                    <section className="doc-section">
                      <div className="gallery-empty">
                        <div className="gallery-empty-icon" aria-hidden="true">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                          </svg>
                        </div>
                        <p>No components match <strong>"{gallerySearch}"</strong></p>
                        <button type="button" className="gallery-empty-clear" onClick={() => setGallerySearch("")}>Clear search</button>
                      </div>
                    </section>
                  );
                }

                // Filtered / search mode — flat grid, no section headers
                if (galleryCat !== "all" || gallerySearch) {
                  return (
                    <section className="doc-section">
                      <div className="gallery-grid">
                        {filtered.map((entry) => (
                          <button key={entry.id} type="button" className="gallery-card" onClick={() => selectComponent(entry.id)}>
                            <div className="gallery-card-preview">
                              <ComponentThumbnail name={entry.name} />
                            </div>
                            <div className="gallery-card-body">
                              <div className="gallery-card-row">
                                <span className="gallery-card-name">{entry.name}</span>
                                <span className={`gallery-cat-chip gallery-cat-chip--${entry.category}`}>{entry.category}</span>
                              </div>
                              <p className="gallery-card-desc">{entry.description}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </section>
                  );
                }

                // Default — grouped by category with section headers
                return (["atom", "molecule", "organism"] as const).map((cat) => {
                  const entries = filtered.filter((e) => e.category === cat);
                  if (!entries.length) return null;
                  const catLabel = cat === "atom" ? "Atoms" : cat === "molecule" ? "Molecules" : "Organisms";
                  const catDesc =
                    cat === "atom" ? "Foundation-level primitives — buttons, inputs, badges, and more." :
                    cat === "molecule" ? "Composed patterns built from atoms — forms, navigation, feedback." :
                    "Full sections and complex UI patterns — layouts, tables, command bars.";
                  return (
                    <section key={cat} className="doc-section gallery-cat-section">
                      <div className="gallery-cat-header">
                        <div>
                          <h2 className="gallery-cat-title">{catLabel}</h2>
                          <p className="gallery-cat-desc-sub">{catDesc}</p>
                        </div>
                        <span className="gallery-cat-count" aria-label={`${entries.length} components`}>{entries.length}</span>
                      </div>
                      <div className="gallery-grid">
                        {entries.map((entry) => (
                          <button key={entry.id} type="button" className="gallery-card" onClick={() => selectComponent(entry.id)}>
                            <div className="gallery-card-preview">
                              <ComponentThumbnail name={entry.name} />
                            </div>
                            <div className="gallery-card-body">
                              <div className="gallery-card-row">
                                <span className="gallery-card-name">{entry.name}</span>
                                <span className={`gallery-cat-chip gallery-cat-chip--${cat}`}>{cat}</span>
                              </div>
                              <p className="gallery-card-desc">{entry.description}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </section>
                  );
                });
              })()}
            </>
          ) : (
            <>
              <div className="component-page-tabs">
                <button type="button" className="component-page-tab is-active">Guides</button>
                <button type="button" className="component-page-tab" onClick={() => setView("api-reference")}>API Reference</button>
              </div>
              <section id="overview" className="doc-section hero">
                <p className="breadcrumbs">Components / {selectedEntry.category.charAt(0).toUpperCase() + selectedEntry.category.slice(1)} / {selectedEntry.name}</p>
                <h1>{selectedEntry.name}</h1>
                <p className="lead">{selectedEntry.description}</p>
                <div className="comp-hero-meta">
                  <span className="comp-hero-chip comp-hero-chip--cat">
                    {selectedEntry.category.charAt(0).toUpperCase() + selectedEntry.category.slice(1)}
                  </span>
                  <span className="comp-hero-chip comp-hero-chip--pkg">@zephrui/ui-react</span>
                  <span className="comp-hero-chip comp-hero-chip--free">Free</span>
                  {selectedEntry.dependencies.length > 0 && (
                    <span className="comp-hero-chip comp-hero-chip--deps">
                      {selectedEntry.dependencies.length} dep{selectedEntry.dependencies.length !== 1 ? "s" : ""}
                    </span>
                  )}
                </div>
                <div className="hero-actions">
                  <Button onClick={() => copyAndFlash("AI block prompt", blockPrompt)}>
                    Copy AI Prompt
                  </Button>
                  <Button variant="secondary" onClick={() => copyAndFlash("Install command", installCommand)}>
                    Copy Install
                  </Button>
                </div>
              </section>


              {isAssetLibraryComponent && (
                <section id="cloud-assets" className="doc-section">
                  <div className="section-heading">
                    <h2>Cloud asset sync</h2>
                    <p>
                      Connect your API key to fetch {selectedEntry.name} results from Zephr Cloud.
                      If the key is missing, invalid, or rate-limited, the preview automatically falls back to local catalog data.
                    </p>
                  </div>
                  <div className="asset-cloud-panel">
                    <label className="field">
                      <span>Cloud API key</span>
                      <input
                        type="password"
                        value={cloudApiKeyDraft}
                        onChange={(event) => setCloudApiKeyDraft(event.target.value)}
                        placeholder="zphy_live_xxxxxxxxxxxxxxxx"
                        autoComplete="off"
                        spellCheck={false}
                      />
                    </label>
                    <div className="asset-cloud-actions">
                      <Button size="sm" onClick={saveCloudApiKey}>Save key</Button>
                      <Button size="sm" variant="secondary" onClick={clearCloudApiKey}>Use local only</Button>
                    </div>
                    <div className="asset-cloud-status">
                      <Badge tone={activeAssetCloudState.source === "cloud" ? "success" : activeAssetCloudState.source === "fallback" ? "danger" : "neutral"}>
                        {activeAssetCloudState.loading ? "Syncing…" : activeAssetCloudState.source}
                      </Badge>
                      <span>{activeAssetCloudState.message}</span>
                    </div>
                    <p className="preview-note">
                      Cloud endpoint: <code>{cloudBaseUrl}</code>
                    </p>
                  </div>
                </section>
              )}

              <section id="examples" className="doc-section">
                <div className="section-heading">
                  <div>
                    <h2>Examples</h2>
                    <p>Live preview of all component states and variants.</p>
                  </div>
                </div>

                {selectedPreviewStateConfig && selectedEntry.id !== "alert" && selectedEntry.id !== "accordion" && selectedEntry.id !== "tooltip" ? (
                      <div className="preview-toolbar">
                        <label className="field compact preview-state-field">
                          <span>{selectedPreviewStateConfig.label}</span>
                          <Select
                            value={previewState}
                            onChange={(event) => setPreviewState(event.target.value as PreviewStateKey)}
                          >
                            {selectedPreviewStateConfig.options.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </Select>
                        </label>
                      </div>
                    ) : null}

                    <BrowserPreviewFrame
                      address={`zephr.local/components/${selectedEntry.id}`}
                      toolbar={selectedEntry.id === "button-group" ? (
                        <div className="variant-filters">
                          <label className="variant-filter-dropdown">
                            <span>Quantity</span>
                            <select
                              value={String(buttonGroupQuantity)}
                              onChange={(e) => {
                                const next = Number(e.target.value) as ButtonGroupQuantityOption;
                                setButtonGroupQuantity(next);
                                setButtonGroupActiveIndex((current) => Math.min(current, next - 1));
                              }}
                            >
                              <option value="2">02</option>
                              <option value="3">03</option>
                              <option value="4">04</option>
                              <option value="5">05</option>
                              <option value="6">06</option>
                            </select>
                          </label>
                          <label className="variant-filter-dropdown">
                            <span>Size</span>
                            <select
                              value={buttonGroupSize}
                              onChange={(e) => setButtonGroupSize(e.target.value as ButtonGroupSizeOption)}
                            >
                              <option value="sm">Small (36)</option>
                              <option value="xs">X-Small (32)</option>
                              <option value="2xs">2X-Small (24)</option>
                            </select>
                          </label>
                          <label className="variant-filter-dropdown">
                            <span>Active</span>
                            <select
                              value={String(Math.min(buttonGroupActiveIndex, buttonGroupQuantity - 1))}
                              onChange={(e) => setButtonGroupActiveIndex(Number(e.target.value))}
                            >
                              {Array.from({ length: buttonGroupQuantity }, (_, index) => (
                                <option key={index} value={index}>
                                  {index + 1}
                                </option>
                              ))}
                            </select>
                          </label>
                          <label className="variant-toggle">
                            <span
                              className="variant-toggle-track"
                              data-on={buttonGroupDisabled || undefined}
                              onClick={() => setButtonGroupDisabled(!buttonGroupDisabled)}
                              role="switch"
                              aria-checked={buttonGroupDisabled}
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  setButtonGroupDisabled(!buttonGroupDisabled);
                                }
                              }}
                            >
                              <span className="variant-toggle-thumb" />
                            </span>
                            <span>Disabled</span>
                          </label>
                        </div>
                      ) : selectedEntry.id === "switch" ? (
                        <div className="variant-filters">
                          <label className="variant-filter-dropdown">
                            <span>Pattern</span>
                            <select value={switchPattern} onChange={(e) => setSwitchPattern(e.target.value as SwitchPatternOption)}>
                              <option value="switch">Switch</option>
                              <option value="switch-label">Switch Label</option>
                              <option value="switch-card">Switch Card</option>
                            </select>
                          </label>
                          <label className="variant-filter-dropdown">
                            <span>State</span>
                            <select value={switchState} onChange={(e) => setSwitchState(e.target.value as SwitchStateOption)}>
                              <option value="default">Default</option>
                              <option value="hover">Hover</option>
                              <option value="pressed">Pressed</option>
                              <option value="disabled">Disabled</option>
                            </select>
                          </label>
                          <label className="variant-filter-dropdown">
                            <span>Size</span>
                            <select value={switchSize} onChange={(e) => setSwitchSize(e.target.value as "sm" | "md")}>
                              <option value="sm">Small</option>
                              <option value="md">Medium</option>
                            </select>
                          </label>
                          {switchPattern === "switch-card" ? (
                            <label className="variant-filter-dropdown">
                              <span>Card type</span>
                              <select value={switchCardType} onChange={(e) => setSwitchCardType(e.target.value as SwitchCardTypeOption)}>
                                <option value="basic">Basic</option>
                                <option value="left-icon">Left Icon</option>
                                <option value="avatar">Avatar</option>
                              </select>
                            </label>
                          ) : null}
                          <label className="variant-toggle">
                            <span
                              className="variant-toggle-track"
                              data-on={switchActive || undefined}
                              onClick={() => setSwitchActive(!switchActive)}
                              role="switch"
                              aria-checked={switchActive}
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  setSwitchActive(!switchActive);
                                }
                              }}
                            >
                              <span className="variant-toggle-thumb" />
                            </span>
                            <span>Active</span>
                          </label>
                          <label className="variant-toggle">
                            <span
                              className="variant-toggle-track"
                              data-on={switchShowSublabel || undefined}
                              onClick={() => setSwitchShowSublabel(!switchShowSublabel)}
                              role="switch"
                              aria-checked={switchShowSublabel}
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  setSwitchShowSublabel(!switchShowSublabel);
                                }
                              }}
                            >
                              <span className="variant-toggle-thumb" />
                            </span>
                            <span>Sublabel</span>
                          </label>
                          <label className="variant-toggle">
                            <span
                              className="variant-toggle-track"
                              data-on={switchShowBadge || undefined}
                              onClick={() => setSwitchShowBadge(!switchShowBadge)}
                              role="switch"
                              aria-checked={switchShowBadge}
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  setSwitchShowBadge(!switchShowBadge);
                                }
                              }}
                            >
                              <span className="variant-toggle-thumb" />
                            </span>
                            <span>Badge</span>
                          </label>
                        </div>
                      ) : selectedEntry.id === "accordion" ? (
                        <div className="variant-filters">
                          <label className="variant-filter-dropdown">
                            <span>State</span>
                            <select value={accordionState} onChange={(e) => setAccordionState(e.target.value as AccordionStateOption)}>
                              <option value="default">Default</option>
                              <option value="hover">Hover</option>
                              <option value="active">Active</option>
                            </select>
                          </label>
                          <label className="variant-toggle">
                            <span
                              className="variant-toggle-track"
                              data-on={accordionFlipIcon || undefined}
                              onClick={() => setAccordionFlipIcon(!accordionFlipIcon)}
                              role="switch"
                              aria-checked={accordionFlipIcon}
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  setAccordionFlipIcon(!accordionFlipIcon);
                                }
                              }}
                            >
                              <span className="variant-toggle-thumb" />
                            </span>
                            <span>Flip icon</span>
                          </label>
                        </div>
                      ) : selectedEntry.id === "tooltip" ? (
                        <div className="variant-filters">
                          <label className="variant-filter-dropdown">
                            <span>Type</span>
                            <select value={tooltipType} onChange={(e) => setTooltipType(e.target.value as TooltipTypeOption)}>
                              <option value="top-left">Top Left</option>
                              <option value="top-center">Top Center</option>
                              <option value="top-right">Top Right</option>
                              <option value="bottom-left">Bottom Left</option>
                              <option value="bottom-center">Bottom Center</option>
                              <option value="bottom-right">Bottom Right</option>
                              <option value="right">Right</option>
                              <option value="left">Left</option>
                            </select>
                          </label>
                          <label className="variant-filter-dropdown">
                            <span>Size</span>
                            <select value={tooltipSize} onChange={(e) => setTooltipSize(e.target.value as TooltipSizeOption)}>
                              <option value="2xs">2X-Small</option>
                              <option value="xs">X-Small</option>
                              <option value="large">Large</option>
                            </select>
                          </label>
                          <label className="variant-filter-dropdown">
                            <span>Tone</span>
                            <select value={tooltipTone} onChange={(e) => setTooltipTone(e.target.value as TooltipToneOption)}>
                              <option value="light">Light</option>
                              <option value="dark">Dark</option>
                            </select>
                          </label>
                          <label className="variant-toggle">
                            <span
                              className="variant-toggle-track"
                              data-on={tooltipTail || undefined}
                              onClick={() => setTooltipTail(!tooltipTail)}
                              role="switch"
                              aria-checked={tooltipTail}
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  setTooltipTail(!tooltipTail);
                                }
                              }}
                            >
                              <span className="variant-toggle-thumb" />
                            </span>
                            <span>Tail</span>
                          </label>
                          <label className="variant-toggle">
                            <span
                              className="variant-toggle-track"
                              data-on={tooltipLeftIcon || undefined}
                              onClick={() => setTooltipLeftIcon(!tooltipLeftIcon)}
                              role="switch"
                              aria-checked={tooltipLeftIcon}
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  setTooltipLeftIcon(!tooltipLeftIcon);
                                }
                              }}
                            >
                              <span className="variant-toggle-thumb" />
                            </span>
                            <span>Left icon</span>
                          </label>
                          <label className="variant-toggle">
                            <span
                              className="variant-toggle-track"
                              data-on={tooltipDismissible || undefined}
                              onClick={() => setTooltipDismissible(!tooltipDismissible)}
                              role="switch"
                              aria-checked={tooltipDismissible}
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  setTooltipDismissible(!tooltipDismissible);
                                }
                              }}
                            >
                              <span className="variant-toggle-thumb" />
                            </span>
                            <span>Dismiss</span>
                          </label>
                          <label className="variant-toggle">
                            <span
                              className="variant-toggle-track"
                              data-on={tooltipVisible || undefined}
                              onClick={() => setTooltipVisible(!tooltipVisible)}
                              role="switch"
                              aria-checked={tooltipVisible}
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  setTooltipVisible(!tooltipVisible);
                                }
                              }}
                            >
                              <span className="variant-toggle-thumb" />
                            </span>
                            <span>Visible</span>
                          </label>
                        </div>
                      ) : selectedEntry.id === "alert" ? (
                        <div className="variant-filters">
                          <label className="variant-filter-dropdown">
                            <span>Severity</span>
                            <select value={alertSeverity} onChange={(e) => setAlertSeverity(e.target.value as AlertSeverityOption)}>
                              <option value="red">Red</option>
                              <option value="yellow">Yellow</option>
                              <option value="green">Green</option>
                              <option value="blue">Blue</option>
                              <option value="grey">Grey</option>
                            </select>
                          </label>
                          <label className="variant-filter-dropdown">
                            <span>Size</span>
                            <select value={alertSize} onChange={(e) => setAlertSize(e.target.value as AlertSizeOption)}>
                              <option value="small">Small</option>
                              <option value="wide">Wide</option>
                              <option value="toast">Toast</option>
                            </select>
                          </label>
                          <label className="variant-filter-dropdown">
                            <span>Style</span>
                            <select value={alertStyle} onChange={(e) => setAlertStyle(e.target.value as AlertStyleOption)}>
                              <option value="solid">Solid</option>
                              <option value="light">Light</option>
                              <option value="stroke">Stroke</option>
                            </select>
                          </label>
                          <label className="variant-toggle">
                            <span
                              className="variant-toggle-track"
                              data-on={alertDismissible || undefined}
                              onClick={() => setAlertDismissible(!alertDismissible)}
                              role="switch"
                              aria-checked={alertDismissible}
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  setAlertDismissible(!alertDismissible);
                                }
                              }}
                            >
                              <span className="variant-toggle-thumb" />
                            </span>
                            <span>Dismissable</span>
                          </label>
                        </div>
                      ) : selectedEntry.id === "badge" ? (
                        <div className="variant-filters">
                          <label className="variant-filter-dropdown">
                            <span>Type</span>
                            <select
                              value={badgeType}
                              onChange={(e) => setBadgeType(e.target.value as BadgeTypeOption)}
                            >
                              <option value="basic">Basic</option>
                              <option value="dot">With Dot</option>
                              <option value="left-icon">Left Icon</option>
                              <option value="right-icon">Right Icon</option>
                            </select>
                          </label>
                          <label className="variant-filter-dropdown">
                            <span>Style</span>
                            <select
                              value={badgeStyle}
                              onChange={(e) => setBadgeStyle(e.target.value as BadgeStyleOption)}
                            >
                              <option value="filled">Filled</option>
                              <option value="lighter">Lighter</option>
                              <option value="stroke">Stroke</option>
                              <option value="white">White</option>
                            </select>
                          </label>
                          <label className="variant-filter-dropdown">
                            <span>Color</span>
                            <select
                              value={badgeColor}
                              onChange={(e) => setBadgeColor(e.target.value as BadgeColorOption)}
                            >
                              <option value="gray">Gray</option>
                              <option value="blue">Blue</option>
                              <option value="orange">Orange</option>
                              <option value="red">Red</option>
                              <option value="green">Green</option>
                              <option value="yellow">Yellow</option>
                              <option value="purple">Purple</option>
                              <option value="sky">Sky</option>
                              <option value="pink">Pink</option>
                              <option value="teal">Teal</option>
                            </select>
                          </label>
                          <label className="variant-filter-dropdown">
                            <span>Size</span>
                            <select
                              value={badgeSize}
                              onChange={(e) => setBadgeSize(e.target.value as "sm" | "md")}
                            >
                              <option value="sm">Small (16)</option>
                              <option value="md">Medium (20)</option>
                            </select>
                          </label>
                          <label className="variant-toggle">
                            <span
                              className="variant-toggle-track"
                              data-on={badgeNumber || undefined}
                              onClick={() => setBadgeNumber(!badgeNumber)}
                              role="switch"
                              aria-checked={badgeNumber}
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  setBadgeNumber(!badgeNumber);
                                }
                              }}
                            >
                              <span className="variant-toggle-thumb" />
                            </span>
                            <span>Number</span>
                          </label>
                          <label className="variant-toggle">
                            <span
                              className="variant-toggle-track"
                              data-on={badgeDisabled || undefined}
                              onClick={() => setBadgeDisabled(!badgeDisabled)}
                              role="switch"
                              aria-checked={badgeDisabled}
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  setBadgeDisabled(!badgeDisabled);
                                }
                              }}
                            >
                              <span className="variant-toggle-thumb" />
                            </span>
                            <span>Disabled</span>
                          </label>
                        </div>
                      ) : selectedEntry.id === "date-picker" ? (
                        <div className="variant-filters">
                          <label className="variant-filter-dropdown">
                            <span>Type</span>
                            <select
                              value={datePickerMode}
                              onChange={(e) => setDatePickerMode(e.target.value as DatePickerModeOption)}
                            >
                              <option value="single">Date Picker</option>
                              <option value="range">Range Picker</option>
                            </select>
                          </label>
                          <label className="variant-toggle">
                            <span
                              className="variant-toggle-track"
                              data-on={datePickerShowTimeFilters || undefined}
                              onClick={() => setDatePickerShowTimeFilters(!datePickerShowTimeFilters)}
                              role="switch"
                              aria-checked={datePickerShowTimeFilters}
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  setDatePickerShowTimeFilters(!datePickerShowTimeFilters);
                                }
                              }}
                            >
                              <span className="variant-toggle-thumb" />
                            </span>
                            <span>Time filter</span>
                          </label>
                          <label className="variant-toggle">
                            <span
                              className="variant-toggle-track"
                              data-on={datePickerShowFooter || undefined}
                              onClick={() => setDatePickerShowFooter(!datePickerShowFooter)}
                              role="switch"
                              aria-checked={datePickerShowFooter}
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  setDatePickerShowFooter(!datePickerShowFooter);
                                }
                              }}
                            >
                              <span className="variant-toggle-thumb" />
                            </span>
                            <span>Footer</span>
                          </label>
                        </div>
                      ) : selectedEntry.id === "pagination" ? (
                        <div className="variant-filters">
                          <label className="variant-filter-dropdown">
                            <span>Type</span>
                            <select
                              value={paginationType}
                              onChange={(e) => setPaginationType(e.target.value as PaginationTypeOption)}
                            >
                              <option value="basic">Basic</option>
                              <option value="group">Group</option>
                              <option value="full-radius">Full Radius</option>
                            </select>
                          </label>
                          <label className="variant-filter-dropdown">
                            <span>Page size</span>
                            <select
                              value={String(paginationPageSize)}
                              onChange={(e) => setPaginationPageSize(Number(e.target.value))}
                            >
                              <option value="7">7 / page</option>
                              <option value="10">10 / page</option>
                              <option value="20">20 / page</option>
                              <option value="50">50 / page</option>
                            </select>
                          </label>
                          <label className="variant-toggle">
                            <span
                              className="variant-toggle-track"
                              data-on={paginationShowFirstLast || undefined}
                              onClick={() => setPaginationShowFirstLast(!paginationShowFirstLast)}
                              role="switch"
                              aria-checked={paginationShowFirstLast}
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  setPaginationShowFirstLast(!paginationShowFirstLast);
                                }
                              }}
                            >
                              <span className="variant-toggle-thumb" />
                            </span>
                            <span>First/Last</span>
                          </label>
                          <label className="variant-toggle">
                            <span
                              className="variant-toggle-track"
                              data-on={paginationShowPrevNext || undefined}
                              onClick={() => setPaginationShowPrevNext(!paginationShowPrevNext)}
                              role="switch"
                              aria-checked={paginationShowPrevNext}
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  setPaginationShowPrevNext(!paginationShowPrevNext);
                                }
                              }}
                            >
                              <span className="variant-toggle-thumb" />
                            </span>
                            <span>Previous/Next</span>
                          </label>
                          <label className="variant-toggle">
                            <span
                              className="variant-toggle-track"
                              data-on={paginationShowAdvanced || undefined}
                              onClick={() => setPaginationShowAdvanced(!paginationShowAdvanced)}
                              role="switch"
                              aria-checked={paginationShowAdvanced}
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  setPaginationShowAdvanced(!paginationShowAdvanced);
                                }
                              }}
                            >
                              <span className="variant-toggle-thumb" />
                            </span>
                            <span>Advanced</span>
                          </label>
                        </div>
                      ) : selectedEntry.id === "progress" ? (
                        <div className="variant-filters">
                          <label className="variant-filter-dropdown">
                            <span>Variant</span>
                            <select
                              value={progressVariant}
                              onChange={(e) => setProgressVariant(e.target.value as ProgressVariantOption)}
                            >
                              <option value="line-label">Bar + Label</option>
                              <option value="line">Bar</option>
                              <option value="circle">Circle</option>
                            </select>
                          </label>
                          <label className="variant-filter-dropdown">
                            <span>Value</span>
                            <select
                              value={String(progressValue)}
                              onChange={(e) => setProgressValue(Number(e.target.value) as 0 | 25 | 50 | 75 | 100)}
                            >
                              <option value="0">0%</option>
                              <option value="25">25%</option>
                              <option value="50">50%</option>
                              <option value="75">75%</option>
                              <option value="100">100%</option>
                            </select>
                          </label>
                          <label className="variant-filter-dropdown">
                            <span>Tone</span>
                            <select
                              value={progressTone}
                              onChange={(e) => setProgressTone(e.target.value as ProgressToneOption)}
                            >
                              <option value="primary">Blue</option>
                              <option value="success">Green</option>
                              <option value="warning">Yellow</option>
                              <option value="danger">Red</option>
                              <option value="neutral">Grey</option>
                            </select>
                          </label>
                          {progressVariant === "circle" ? (
                            <label className="variant-filter-dropdown">
                              <span>Size</span>
                              <select
                                value={String(progressCircleSize)}
                                onChange={(e) => setProgressCircleSize(Number(e.target.value) as ProgressCircleSizeOption)}
                              >
                                <option value="80">80</option>
                                <option value="72">72</option>
                                <option value="64">64</option>
                                <option value="56">56</option>
                                <option value="48">48</option>
                              </select>
                            </label>
                          ) : (
                            <label className="variant-filter-dropdown">
                              <span>Line size</span>
                              <select
                                value={progressLineSize}
                                onChange={(e) => setProgressLineSize(e.target.value as ProgressLineSizeOption)}
                              >
                                <option value="sm">Small</option>
                                <option value="md">Medium</option>
                                <option value="lg">Large</option>
                              </select>
                            </label>
                          )}
                          {progressVariant === "line-label" ? (
                            <>
                              <label className="variant-filter-dropdown">
                                <span>Label position</span>
                                <select
                                  value={progressLabelPlacement}
                                  onChange={(e) => setProgressLabelPlacement(e.target.value as ProgressLabelPlacementOption)}
                                >
                                  <option value="top">Top</option>
                                  <option value="right">Right</option>
                                </select>
                              </label>
                              <label className="variant-toggle">
                                <span
                                  className="variant-toggle-track"
                                  data-on={progressShowDescription || undefined}
                                  onClick={() => setProgressShowDescription(!progressShowDescription)}
                                  role="switch"
                                  aria-checked={progressShowDescription}
                                  tabIndex={0}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                      e.preventDefault();
                                      setProgressShowDescription(!progressShowDescription);
                                    }
                                  }}
                                >
                                  <span className="variant-toggle-thumb" />
                                </span>
                                <span>Description</span>
                              </label>
                              <label className="variant-toggle">
                                <span
                                  className="variant-toggle-track"
                                  data-on={progressShowAction || undefined}
                                  onClick={() => setProgressShowAction(!progressShowAction)}
                                  role="switch"
                                  aria-checked={progressShowAction}
                                  tabIndex={0}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                      e.preventDefault();
                                      setProgressShowAction(!progressShowAction);
                                    }
                                  }}
                                >
                                  <span className="variant-toggle-thumb" />
                                </span>
                                <span>Action link</span>
                              </label>
                            </>
                          ) : null}
                          <label className="variant-toggle">
                            <span
                              className="variant-toggle-track"
                              data-on={progressShowValue || undefined}
                              onClick={() => setProgressShowValue(!progressShowValue)}
                              role="switch"
                              aria-checked={progressShowValue}
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  setProgressShowValue(!progressShowValue);
                                }
                              }}
                            >
                              <span className="variant-toggle-thumb" />
                            </span>
                            <span>Show value</span>
                          </label>
                        </div>
                      ) : selectedEntry.id === "rich-editor" ? (
                        <div className="variant-filters">
                          <label className="variant-filter-dropdown">
                            <span>Variant</span>
                            <select
                              value={richEditorVariant}
                              onChange={(e) => setRichEditorVariant(e.target.value as RichEditorVariantOption)}
                            >
                              <option value="01">01</option>
                              <option value="02">02</option>
                              <option value="03">03</option>
                              <option value="04">04</option>
                            </select>
                          </label>
                          <label className="variant-toggle">
                            <span
                              className="variant-toggle-track"
                              data-on={richEditorShowMore || undefined}
                              onClick={() => setRichEditorShowMore(!richEditorShowMore)}
                              role="switch"
                              aria-checked={richEditorShowMore}
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  setRichEditorShowMore(!richEditorShowMore);
                                }
                              }}
                            >
                              <span className="variant-toggle-thumb" />
                            </span>
                            <span>Show more</span>
                          </label>
                          <label className="variant-toggle">
                            <span
                              className="variant-toggle-track"
                              data-on={richEditorDisabled || undefined}
                              onClick={() => setRichEditorDisabled(!richEditorDisabled)}
                              role="switch"
                              aria-checked={richEditorDisabled}
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  setRichEditorDisabled(!richEditorDisabled);
                                }
                              }}
                            >
                              <span className="variant-toggle-thumb" />
                            </span>
                            <span>Disabled</span>
                          </label>
                        </div>
                      ) : selectedEntry.id === "color-picker" ? (
                        <div className="variant-filters">
                          <label className="variant-filter-dropdown">
                            <span>Format</span>
                            <select
                              value={colorPickerFormat}
                              onChange={(e) => setColorPickerFormat(e.target.value as ColorPickerFormatOption)}
                            >
                              <option value="hex">Hex</option>
                              <option value="rgb">RGB</option>
                              <option value="hsl">HSL</option>
                            </select>
                          </label>
                          <label className="variant-toggle">
                            <span
                              className="variant-toggle-track"
                              data-on={colorPickerShowRecommended || undefined}
                              onClick={() => setColorPickerShowRecommended(!colorPickerShowRecommended)}
                              role="switch"
                              aria-checked={colorPickerShowRecommended}
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  setColorPickerShowRecommended(!colorPickerShowRecommended);
                                }
                              }}
                            >
                              <span className="variant-toggle-thumb" />
                            </span>
                            <span>Recommended</span>
                          </label>
                          <label className="variant-toggle">
                            <span
                              className="variant-toggle-track"
                              data-on={colorPickerDisabled || undefined}
                              onClick={() => setColorPickerDisabled(!colorPickerDisabled)}
                              role="switch"
                              aria-checked={colorPickerDisabled}
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  setColorPickerDisabled(!colorPickerDisabled);
                                }
                              }}
                            >
                              <span className="variant-toggle-thumb" />
                            </span>
                            <span>Disabled</span>
                          </label>
                        </div>
                      ) : selectedEntry.id === "divider" ? (
                        <div className="variant-filters">
                          <label className="variant-filter-dropdown">
                            <span>Orientation</span>
                            <select
                              value={dividerOrientation}
                              onChange={(e) => setDividerOrientation(e.target.value as DividerOrientationOption)}
                            >
                              <option value="horizontal">Horizontal</option>
                              <option value="vertical">Vertical</option>
                            </select>
                          </label>
                          <label className="variant-filter-dropdown">
                            <span>Style</span>
                            <select
                              value={dividerStroke}
                              onChange={(e) => setDividerStroke(e.target.value as DividerStrokeOption)}
                            >
                              <option value="solid">Solid</option>
                              <option value="dashed">Dashed</option>
                              <option value="dotted">Dotted</option>
                            </select>
                          </label>
                          <label className="variant-filter-dropdown">
                            <span>Thickness</span>
                            <select
                              value={String(dividerThickness)}
                              onChange={(e) => setDividerThickness(Number(e.target.value) as 1 | 2 | 3)}
                            >
                              <option value="1">1px</option>
                              <option value="2">2px</option>
                              <option value="3">3px</option>
                            </select>
                          </label>
                          <label className="variant-filter-dropdown">
                            <span>Label</span>
                            <select
                              value={dividerLabel}
                              onChange={(e) => setDividerLabel(e.target.value as DividerLabelOption)}
                            >
                              <option value="none">None</option>
                              <option value="text">Text</option>
                              <option value="chip">Chip</option>
                            </select>
                          </label>
                          <label className="variant-filter-dropdown">
                            <span>Inset</span>
                            <select
                              value={dividerInset}
                              onChange={(e) => setDividerInset(e.target.value as DividerInsetOption)}
                            >
                              <option value="none">None</option>
                              <option value="sm">Small</option>
                              <option value="md">Medium</option>
                            </select>
                          </label>
                        </div>
                      ) : genericEnumRows.length > 0 ? (
                        <div className="variant-filters">
                          {genericEnumRows.map(row => {
                            const values = row.acceptedValues.split(", ");
                            const currentVal = previewProps[row.name] ?? row.defaultValue ?? values[0] ?? "";
                            return (
                              <label key={row.name} className="variant-filter-dropdown">
                                <span>{row.name.charAt(0).toUpperCase() + row.name.slice(1)}</span>
                                <select
                                  value={currentVal}
                                  onChange={(e) => setPreviewProps(prev => ({ ...prev, [row.name]: e.target.value }))}
                                >
                                  {values.map(v => (
                                    <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>
                                  ))}
                                </select>
                              </label>
                            );
                          })}
                        </div>
                      ) : undefined}
                    >
                      <PreviewSurface
                        entry={selectedEntry}
                        previewState={previewState}
                        buttonLabel={buttonLabel}
                        buttonVariant={buttonVariant}
                        buttonSize={buttonSize}
                        buttonGroupQuantity={buttonGroupQuantity}
                        buttonGroupSize={buttonGroupSize}
                        buttonGroupActiveIndex={buttonGroupActiveIndex}
                        buttonGroupDisabled={buttonGroupDisabled}
                        onButtonGroupValueChange={setButtonGroupActiveIndex}
                        switchPattern={switchPattern}
                        switchState={switchState}
                        switchActive={switchActive}
                        switchSize={switchSize}
                        switchCardType={switchCardType}
                        switchShowSublabel={switchShowSublabel}
                        switchShowBadge={switchShowBadge}
                        btnFilterType={btnFilterType}
                        btnFilterSize={btnFilterSize}
                        btnFilterState={btnFilterState}
                        btnOnlyIcon={btnOnlyIcon}
                        accordionState={accordionState}
                        accordionFlipIcon={accordionFlipIcon}
                        tooltipType={tooltipType}
                        tooltipSize={tooltipSize}
                        tooltipTone={tooltipTone}
                        tooltipTail={tooltipTail}
                        tooltipLeftIcon={tooltipLeftIcon}
                        tooltipDismissible={tooltipDismissible}
                        tooltipVisible={tooltipVisible}
                        alertSeverity={alertSeverity}
                        alertSize={alertSize}
                        alertStyle={alertStyle}
                        alertDismissible={alertDismissible}
                        dividerOrientation={dividerOrientation}
                        dividerStroke={dividerStroke}
                        dividerLabel={dividerLabel}
                        dividerInset={dividerInset}
                        dividerThickness={dividerThickness}
                        datePickerMode={datePickerMode}
                        datePickerShowTimeFilters={datePickerShowTimeFilters}
                        datePickerShowFooter={datePickerShowFooter}
                        paginationType={paginationType}
                        paginationShowFirstLast={paginationShowFirstLast}
                        paginationShowPrevNext={paginationShowPrevNext}
                        paginationShowAdvanced={paginationShowAdvanced}
                        paginationPageSize={paginationPageSize}
                        onPaginationPageSizeChange={setPaginationPageSize}
                        progressVariant={progressVariant}
                        progressTone={progressTone}
                        progressLineSize={progressLineSize}
                        progressCircleSize={progressCircleSize}
                        progressValue={progressValue}
                        progressShowValue={progressShowValue}
                        progressLabelPlacement={progressLabelPlacement}
                        progressShowDescription={progressShowDescription}
                        progressShowAction={progressShowAction}
                        richEditorVariant={richEditorVariant}
                        richEditorShowMore={richEditorShowMore}
                        richEditorDisabled={richEditorDisabled}
                        colorPickerFormat={colorPickerFormat}
                        colorPickerShowRecommended={colorPickerShowRecommended}
                        colorPickerDisabled={colorPickerDisabled}
                        badgeType={badgeType}
                        badgeStyle={badgeStyle}
                        badgeColor={badgeColor}
                        badgeSize={badgeSize}
                        badgeNumber={badgeNumber}
                        badgeDisabled={badgeDisabled}
                        zephrLogoSrc={brandLogoSrc}
                        iconQuery={iconQuery}
                        iconStyleVariant={iconStyleVariant}
                        iconResults={iconCloudResults}
                        onIconQueryChange={setIconQuery}
                        onIconStyleVariantChange={setIconStyleVariant}
                        avatarQuery={avatarQuery}
                        avatarSeed={avatarSeed}
                        avatarStyles={avatarCloudResults}
                        onAvatarQueryChange={setAvatarQuery}
                        onAvatarSeedChange={setAvatarSeed}
                        logoQuery={logoQuery}
                        logoResults={logoCloudResults}
                        onLogoQueryChange={setLogoQuery}
                      />
                    </BrowserPreviewFrame>
              </section>

              <section id="use" className="doc-section">
                <div className="section-heading">
                  <h2>Use this component</h2>
                  <p>Choose prompt-first or code-first usage depending on your workflow.</p>
                </div>
                <div className="component-use-shell">
                  <div className="component-use-header">
                    <div className="itb-tabrow component-use-tabrow" role="tablist" aria-label="Component usage mode">
                      <button
                        type="button"
                        role="tab"
                        aria-selected={componentUseMode === "prompt"}
                        className={`itb-tab ${componentUseMode === "prompt" ? "active" : ""}`}
                        onClick={() => setComponentUseMode("prompt")}
                      >
                        AI prompt
                      </button>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={componentUseMode === "code"}
                        className={`itb-tab ${componentUseMode === "code" ? "active" : ""}`}
                        onClick={() => setComponentUseMode("code")}
                      >
                        Code
                      </button>
                    </div>
                  </div>
                  {componentUseMode === "prompt" ? (
                    <div className="component-use-panel">
                      <label className="field">
                        <span>Prompt to paste into Claude / Cursor</span>
                        <Textarea value={blockPrompt} readOnly rows={12} />
                      </label>
                      <div className="inline-actions">
                        <Button onClick={() => copyAndFlash("AI block prompt", blockPrompt)}>
                          Copy AI Prompt
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => copyAndFlash("API key placeholder", "ZEPHR_API_KEY=replace_me")}
                        >
                          Copy key token
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="component-use-code">
                      <div className="snippet-stack">
                        <SnippetItem
                          label="Import"
                          code={importSnippet}
                          onCopy={() => copyAndFlash("Import snippet", importSnippet)}
                        />
                        <SnippetItem
                          label="Usage"
                          code={usageSnippet}
                          onCopy={() => copyAndFlash("Usage snippet", usageSnippet)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {apiPropRows.length > 0 && (
                <section id="customize" className="doc-section">
                  <div className="section-heading">
                    <h2>Edit the {selectedEntry.name.toLowerCase()}</h2>
                    <p>Switch states and variants without rewriting your UI.</p>
                  </div>
                  <div className="component-edit-grid">
                    <div>
                      <h3>Try these prompts</h3>
                      <ul className="component-edit-list">
                        {selectedEntry.aiHints.positive.slice(0, 3).map((hint, i) => (
                          <li key={i}>
                            <button
                              type="button"
                              className="component-hint-chip"
                              onClick={() => copyAndFlash("Prompt hint", `"${hint}"`)}
                              title="Click to copy"
                            >
                              "{hint}"
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3>Usage example</h3>
                      <SnippetItem
                        label={selectedEntry.name}
                        code={selectedEntry.usageExamples?.[0] ?? ("<" + selectedEntry.name + " />")}
                        onCopy={() => copyAndFlash("Usage example", selectedEntry.usageExamples?.[0] ?? ("<" + selectedEntry.name + " />"))}
                      />
                    </div>
                  </div>
                  <div className="component-edit-table">
                    <h3>Core props</h3>
                    <table className="component-props-table">
                      <thead>
                        <tr>
                          <th scope="col">Prop</th>
                          <th scope="col">Type</th>
                          <th scope="col">Default</th>
                          <th scope="col">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {apiPropRows.map((row) => (
                          <tr key={row.name} className={row.deprecated ? "is-deprecated" : ""}>
                            <td>
                              <span className="prop-name-cell">
                                <code>{row.name}</code>
                                {row.required && <span className="prop-required" title="Required">*</span>}
                              </span>
                            </td>
                            <td>
                              <span className={`prop-type-badge prop-type-badge--${row.type}`}>
                                {row.acceptedValues && row.acceptedValues !== "See type union" ? row.acceptedValues : row.type}
                              </span>
                            </td>
                            <td className="prop-default-cell">
                              {row.defaultValue ? <code>{row.defaultValue}</code> : <span className="prop-no-default">—</span>}
                            </td>
                            <td className="prop-desc-cell">{row.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              <section id="installation" className="doc-section">
                <div className="section-heading">
                  <h2>Installation</h2>
                  <p>Get {selectedEntry.name} into your project in three steps.</p>
                </div>

                <ol className="install-steps">
                  <li className="install-step">
                    <div className="install-step-number">1</div>
                    <div className="install-step-body">
                      <p className="install-step-title">Install the package</p>
                      <InstallTabBlock
                        packageName="@zephrui/ui-react"
                        onCopy={(cmd) => copyAndFlash("Install command", cmd)}
                      />
                    </div>
                  </li>
                  <li className="install-step">
                    <div className="install-step-number">2</div>
                    <div className="install-step-body">
                      <p className="install-step-title">Import the component</p>
                      <SnippetItem
                        label="Import"
                        code={importSnippet}
                        onCopy={() => copyAndFlash("Import snippet", importSnippet)}
                      />
                    </div>
                  </li>
                  <li className="install-step">
                    <div className="install-step-number">3</div>
                    <div className="install-step-body">
                      <p className="install-step-title">Use it</p>
                      <SnippetItem
                        label="Usage"
                        code={usageSnippet}
                        onCopy={() => copyAndFlash("Usage snippet", usageSnippet)}
                      />
                    </div>
                  </li>
                </ol>

                {configSnippet && (
                  <SnippetItem
                    label="zephr.config.ts (optional)"
                    code={configSnippet}
                    onCopy={() => copyAndFlash("Config snippet", configSnippet)}
                  />
                )}
              </section>
            </>
          )}
        </main>

        {topTab !== "pages" && topTab !== "changelog" && (
        <aside ref={rightRailRef} className="right-rail">
          <span
            className="toc-active-indicator"
            aria-hidden="true"
            style={{
              transform: `translateY(${tocIndicator.top}px)`,
              height: tocIndicator.height,
              opacity: tocIndicator.opacity
            }}
          />
          <span className="rail-title">On this page</span>
          {view === "introduction" && (
            <>
              <a className="toc-link" href="#setup-introduction">Overview</a>
              <a className="toc-link" href="#install">Install</a>
              <a className="toc-link" href="#explore">Explore</a>
            </>
          )}
          {view === "getting-started" && (
            <>
              <a className="toc-link" href="#overview">Overview</a>
              <a className="toc-link" href="#accent-selection">Accent color</a>
              <a className="toc-link" href="#setup">Install</a>
            </>
          )}
          {view === "speed-insights" && (
            <>
              <a className="toc-link" href="#overview">Overview</a>
              <a className="toc-link" href="#prerequisites">Prerequisites</a>
              <a className="toc-link" href="#enable-insights">Enable Speed Insights</a>
              <a className="toc-link" href="#add-package">Add Package</a>
              <a className="toc-link" href="#add-component">Add Component</a>
              <a className="toc-link" href="#deploy">Deploy</a>
              <a className="toc-link" href="#view-data">View Data</a>
              <a className="toc-link" href="#next-steps">Next Steps</a>
            </>
          )}
          {view === "foundations" && (
            <>
              <a className="toc-link" href="#foundations-overview">Overview</a>
              <a className="toc-link" href="#color-palette">Color palette</a>
              <a className="toc-link" href="#token-variables">Token variables</a>
              <a className="toc-link" href="#typography">Typography</a>
            </>
          )}
          {view === "mission" && (
            <>
              <a className="toc-link" href="#mission-overview">Overview</a>
              <a className="toc-link" href="#mission-pillars">Mission pillars</a>
              <a className="toc-link" href="#vision-principles">Vision</a>
            </>
          )}
          {view === "team" && (
            <>
              <a className="toc-link" href="#team-overview">Overview</a>
              <a className="toc-link" href="#team-directory">Core team</a>
              <a className="toc-link" href="#team-process">How we ship</a>
            </>
          )}
          {view === "widgets" && (
            <>
              <a className="toc-link" href="#widgets-overview">Overview</a>
              {pageWidgetNavItems.map((widget) => (
                <a key={widget.id} className="toc-link" href={`#${widget.id}`}>{widget.label}</a>
              ))}
            </>
          )}
          {view === "templates" && (
            <>
              <a className="toc-link" href="#templates-overview">Overview</a>
              {pageTemplateNavItems.map((template) => (
                <a key={template.id} className="toc-link" href={`#${template.id}`}>{template.label}</a>
              ))}
            </>
          )}
          {view === "component-gallery" && (
            <>
              <a className="toc-link" href="#gallery-overview">Overview</a>
            </>
          )}
          {view === "components" && (
            <>
              <a className="toc-link" href="#overview">Overview</a>
              {isAssetLibraryComponent ? <a className="toc-link" href="#cloud-assets">Cloud asset sync</a> : null}
              <a className="toc-link" href="#examples">Examples</a>
              <a className="toc-link" href="#use">Use this component</a>
              {apiPropRows.length > 0 ? (
                <a className="toc-link" href="#customize">Edit the {selectedEntry.name.toLowerCase()}</a>
              ) : null}
              <a className="toc-link" href="#installation">Installation</a>
            </>
          )}
          {view === "api-reference" && (
            <>
              <a className="toc-link" href="#api-overview">Overview</a>
              <a className="toc-link" href="#api-props">Props</a>
              <a className="toc-link" href="#api-examples">Registry schema</a>
              <a className="toc-link" href="#api-contract">Contract notes</a>
            </>
          )}
        </aside>
        )}
      </div >

    </div >
  );
}
