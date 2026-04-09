import { CSSProperties, FormEvent, ReactNode, Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";
import Fuse from "fuse.js";
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
  Tag,
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
import { TopNav } from "./components/TopNav";
import { SnippetItem } from "./components/SnippetItem";
import { DocPageNav } from "./components/DocPageNav";
import { PreviewSurface } from "./components/PreviewSurface";
import { Sidebar } from "./components/Sidebar";
import type {
  PreviewStateKey,
  ButtonGroupQuantityOption,
  ButtonGroupSizeOption,
  SwitchPatternOption,
  SwitchStateOption,
  SwitchCardTypeOption,
  AccordionStateOption,
  TooltipTypeOption,
  TooltipSizeOption,
  TooltipToneOption,
  AlertSeverityOption,
  AlertSizeOption,
  AlertStyleOption,
  DividerOrientationOption,
  DividerStrokeOption,
  DividerLabelOption,
  DividerInsetOption,
  DatePickerModeOption,
  PaginationTypeOption,
  ProgressVariantOption,
  ProgressToneOption,
  ProgressLineSizeOption,
  ProgressCircleSizeOption,
  ProgressLabelPlacementOption,
  RichEditorVariantOption,
  ColorPickerFormatOption,
  BadgeTypeOption,
  BadgeStyleOption,
  BadgeColorOption
} from "./components/PreviewSurface";
import type { TopTab, ShowcaseVersion, SearchResultItem, WorkspaceView } from "./types";
import { GettingStartedView } from "./views/GettingStartedView";
import { ApiReferenceView } from "./views/ApiReferenceView";
import { ComponentDetailsView } from "./views/ComponentDetailsView";
// Theme CSS is injected dynamically via <style> tag — no static import needed

const registry = registryData as unknown as RegistryEntry[];
const DEFAULT_STYLE_PACK: StylePackName = "notion";
const WidgetsPage = lazy(() => import("./views/WidgetsPage"));
const TemplatesPage = lazy(() => import("./views/TemplatesPage"));
const SlashCommandsPage = lazy(() => import("./views/SlashCommandsPage"));
const IconsPage = lazy(() => import("./views/IconsPage").then((m) => ({ default: m.IconsPage })));
const LogosPage = lazy(() => import("./views/LogosPage").then((m) => ({ default: m.LogosPage })));
const FoundationsPage = lazy(() => import("./views/FoundationsPage").then((m) => ({ default: m.FoundationsPage })));
const BenefitsPage = lazy(() => import("./views/BenefitsPage").then((m) => ({ default: m.BenefitsPage })));
const IntroductionPage = lazy(() => import("./views/IntroductionPage").then((m) => ({ default: m.IntroductionPage })));
const ComponentGalleryPage = lazy(() => import("./views/ComponentGalleryPage").then((m) => ({ default: m.ComponentGalleryPage })));
const ChangelogPage = lazy(() => import("./views/ChangelogPage").then((m) => ({ default: m.ChangelogPage })));
const ExportCodePage = lazy(() => import("./views/ExportCodePage").then((m) => ({ default: m.ExportCodePage })));

type AiToolKey = "codex" | "claude" | "cursor";
type AiProjectPreset = "vite-react" | "nextjs";
type AiPackageManager = "npm" | "pnpm" | "yarn" | "bun";
type CloudAssetSource = "local" | "cloud" | "fallback";
type SurfaceStyleOption = "shadow" | "flat";
interface CloudAssetState {
  source: CloudAssetSource;
  loading: boolean;
  message: string;
}

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
            viewParam === "slash-commands" ? "slash-commands" :
            viewParam === "foundations" ? "foundations" :
              viewParam === "widgets" ? "widgets" :
                    viewParam === "templates" ? "templates" :
                    viewParam === "icons" ? "icons" :
                    viewParam === "code-export" ? "code-export" :
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
  if (view === "icons") return "icons";
  if (view === "logos") return "logos";
  if (view === "avatars") return "avatars";
  if (view === "widgets" || view === "templates") return "components";
  if (view === "component-gallery" || view === "components" || view === "api-reference" || view === "code-export") return "components";
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


function StatusTag({ tone = "neutral", children }: { tone?: "neutral" | "info"; children: ReactNode }) {
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

export default function App() {
  const initial = fromSearchParams();

  const [stylePack, setStylePack] = useState<StylePackName>(() => {
    const stored = sessionStorage.getItem("zephr-style-pack") as StylePackName | null;
    return (stored && ["notion", "stripe", "linear", "framer"].includes(stored)) ? stored : DEFAULT_STYLE_PACK;
  });
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
  const [buttonSize, setButtonSize] = useState<"xs" | "sm" | "md" | "lg">("md");
  const [previewState, setPreviewState] = useState<PreviewStateKey>("default");
  const [previewProps, setPreviewProps] = useState<Record<string, string>>({});

  // Button variant grid filters
  const [btnFilterType, setBtnFilterType] = useState<"all" | "primary" | "secondary" | "ghost" | "danger">("all");
  const [btnFilterSize, setBtnFilterSize] = useState<"all" | "xs" | "sm" | "md" | "lg">("all");
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
  const [showAppSwitcher, setShowAppSwitcher] = useState(false);
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
  const mainColRef = useRef<HTMLElement | null>(null);
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

  // ── Scroll to top on navigation ──────────────────────────────
  useEffect(() => {
    mainColRef.current?.scrollTo({ top: 0 });
    rightRailRef.current?.scrollTo({ top: 0 });
  }, [view]);

  useEffect(() => {
    rightRailRef.current?.scrollTo({ top: 0 });
  }, [activeRegistryId]);

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
    if (typeof window === "undefined") return;
    sessionStorage.setItem("zephr-style-pack", stylePack);
    // Update accent to the pack's default when switching packs, unless user has customised it
    const packDefault = defaultAccentForPack(stylePack);
    const storedAccent = sessionStorage.getItem("zephr-accent-color");
    const isDefaultAccent = !storedAccent || ["notion", "stripe", "linear", "framer"].some(
      p => defaultAccentForPack(p as StylePackName) === accentColor
    );
    if (isDefaultAccent) {
      setAccentColor(packDefault);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stylePack]);

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
    // Exclude templates and library entries (icons/avatars/logos have dedicated tabs)
    const LIBRARY_IDS = new Set(["icon-library", "avatar-library", "logo-library"]);
    const components = registry.filter((e) => e.category !== "template" && !LIBRARY_IDS.has(e.id));
    if (!normalized) return components;
    return components.filter((entry) =>
      entry.id.toLowerCase().includes(normalized) ||
      entry.name.toLowerCase().includes(normalized) ||
      entry.description.toLowerCase().includes(normalized)
    );
  }, [catalogSearch]);

  // Full search corpus — rebuilt only when registry/templates change (not on every keystroke)
  const searchCorpus = useMemo<SearchResultItem[]>(() => {
    const docs: SearchResultItem[] = [
      { id: "doc-setup-introduction", kind: "doc", label: "Introduction", detail: "Setup", keywords: "overview welcome start", tab: "setup", view: "introduction", anchor: "setup-introduction" },
      { id: "doc-setup-start", kind: "doc", label: "Get Started", detail: "Setup · AI quick start", keywords: "install setup quickstart", tab: "setup", view: "getting-started", anchor: "overview" },
      { id: "doc-setup-foundations", kind: "doc", label: "Foundations", detail: "Setup · Tokens & primitives", keywords: "design tokens colors spacing typography", tab: "setup", view: "foundations", anchor: "foundations-overview" },
      { id: "doc-setup-slash-commands", kind: "doc", label: "Slash Commands", detail: "Setup · 22 AI editor commands", keywords: "ai commands editor shortcuts", tab: "setup", view: "slash-commands", anchor: "slash-overview" },
      { id: "doc-pages-templates", kind: "doc", label: "Page Templates", detail: "Components · Dashboards, auth, settings", keywords: "layouts pages scaffolds", tab: "components", view: "templates", anchor: "templates-overview" },
      { id: "doc-pages-widgets", kind: "doc", label: "Widgets", detail: "Components · Assembled widget examples", keywords: "assembled examples compositions", tab: "components", view: "widgets", anchor: "widgets-overview" },
      { id: "doc-components-api", kind: "doc", label: "API Reference", detail: "Components · Props, types, defaults", keywords: "props api types documentation", tab: "components", view: "api-reference", anchor: "api-overview" },
      { id: "doc-changelog", kind: "doc", label: "Release Notes", detail: "Changelog", keywords: "updates releases versions history", tab: "changelog", view: "introduction", anchor: "changelog-overview" },
      { id: "doc-changelog-roadmap", kind: "doc", label: "Roadmap", detail: "Changelog · Upcoming milestones", keywords: "future planned upcoming features", tab: "changelog", view: "introduction", anchor: "release-upcoming" },
      { id: "doc-mcp-server", kind: "doc", label: "MCP Server", detail: "Setup · Claude Code, Cursor, Windsurf", keywords: "mcp tools ai integration cursor windsurf codex", tab: "setup", view: "getting-started", anchor: "mcp-section" },
      { id: "doc-render-tool", kind: "doc", label: "zephr_render", detail: "Setup · Visual verification tool", keywords: "render preview screenshot playwright visual", tab: "setup", view: "getting-started", anchor: "mcp-section" },
      { id: "doc-setup-benefits", kind: "doc", label: "Why Zephr?", detail: "Setup · Benefits & comparison", keywords: "benefits why dark mode tokens ai shipping production quality comparison before after", tab: "setup", view: "benefits", anchor: "benefits-overview" },
      { id: "doc-icons", kind: "doc", label: "Icon Browser", detail: "Icons · Material Symbols library", keywords: "icons material symbols search browse", tab: "icons", view: "icons", anchor: "" },
      { id: "doc-logos", kind: "doc", label: "Logo Browser", detail: "Logos · Brand logo library", keywords: "logos brands company icons svgs", tab: "logos", view: "logos", anchor: "" },
      { id: "doc-avatars", kind: "doc", label: "Avatar Library", detail: "Avatars · Customisable avatar illustrations", keywords: "avatars illustrations profile pictures user library", tab: "avatars", view: "avatars", anchor: "" },
    ];

    const components: SearchResultItem[] = registry
      .filter((entry) => entry.category !== "template")
      .map((entry) => ({
        id: `component-${entry.id}`,
        kind: "component" as const,
        label: entry.name,
        detail: entry.category ? `${entry.category[0].toUpperCase()}${entry.category.slice(1)}` : "Component",
        keywords: [entry.id, entry.description ?? "", entry.category ?? "", ...entry.aiHints.positive, ...entry.aiHints.negative].join(" "),
        tab: "components" as const,
        view: "components" as const,
        componentId: entry.id,
      }));

    const templates: SearchResultItem[] = templateCatalogMeta.map((t) => ({
      id: `template-${t.id}`,
      kind: "doc" as const,
      label: t.label,
      detail: t.category === "template" ? "Components · Template" : "Components · Example",
      keywords: t.id,
      tab: "components" as const,
      view: "templates" as const,
      anchor: t.id,
    }));

    return [...docs, ...components, ...templates];
  }, []);

  const searchFuse = useMemo(
    () =>
      new Fuse(searchCorpus, {
        keys: [
          { name: "label", weight: 0.5 },
          { name: "detail", weight: 0.3 },
          { name: "keywords", weight: 0.2 },
        ],
        threshold: 0.35,
        includeScore: true,
        ignoreLocation: true,
        minMatchCharLength: 2,
      }),
    [searchCorpus]
  );

  const searchResults = useMemo<SearchResultItem[]>(() => {
    const q = catalogSearch.trim();
    if (!q) return [];
    return searchFuse.search(q, { limit: 12 }).map((r) => r.item);
  }, [catalogSearch, searchFuse]);

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
    if (tab === "icons") {
      setView("icons");
      return;
    }
    if (tab === "logos") {
      setView("logos");
      return;
    }
    if (tab === "avatars") {
      setView("avatars");
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

  const RELATED_MAP: Record<string, string[]> = {
    "button": ["icon-button", "button-group", "form-field"],
    "icon-button": ["button", "button-group", "tooltip"],
    "button-group": ["button", "tabs"],
    "input": ["textarea", "form-field", "input-group", "search-box"],
    "textarea": ["input", "form-field", "rich-editor"],
    "input-group": ["input", "form-field", "search-box"],
    "select": ["dropdown", "combo-box", "form-field"],
    "checkbox": ["radio", "switch", "form-field"],
    "radio": ["checkbox", "switch", "form-field"],
    "switch": ["checkbox", "radio", "form-field"],
    "form-field": ["input", "select", "checkbox", "radio"],
    "badge": ["alert", "toast", "progress"],
    "alert": ["badge", "toast", "modal-dialog"],
    "toast": ["alert", "badge"],
    "modal-dialog": ["sheet", "alert-dialog", "popover"],
    "alert-dialog": ["modal-dialog", "sheet"],
    "sheet": ["modal-dialog", "popover"],
    "popover": ["tooltip", "dropdown", "modal-dialog"],
    "tooltip": ["popover", "icon-button", "badge"],
    "dropdown": ["select", "popover", "combo-box"],
    "combo-box": ["select", "tag-input", "search-box"],
    "tag-input": ["input", "form-field", "combo-box"],
    "search-box": ["command-bar", "search-results-panel", "combo-box"],
    "command-bar": ["search-box", "search-results-panel"],
    "search-results-panel": ["search-box", "command-bar"],
    "data-table": ["pagination", "filters-bar", "search-box"],
    "pagination": ["data-table", "search-results-panel"],
    "filters-bar": ["search-box", "data-table"],
    "tabs": ["sidebar-nav", "navbar", "accordion"],
    "accordion": ["tabs", "card"],
    "navbar": ["sidebar-nav", "header", "breadcrumbs"],
    "header": ["navbar", "sidebar-nav"],
    "sidebar-nav": ["navbar", "header", "tabs"],
    "breadcrumbs": ["navbar", "header"],
    "card": ["modal-dialog", "sheet", "accordion"],
    "avatar": ["avatar-library", "badge"],
    "logo": ["logo-library"],
    "icon-library": ["avatar-library", "logo-library"],
    "avatar-library": ["icon-library", "logo-library"],
    "logo-library": ["icon-library", "avatar-library"],
    "progress": ["skeleton", "badge"],
    "skeleton": ["progress", "card"],
    "slider": ["number-input", "form-field"],
    "number-input": ["slider", "input", "form-field"],
    "date-picker": ["form-field", "input"],
    "color-picker": ["form-field"],
    "rich-editor": ["textarea", "form-field"],
    "layout-shell": ["sidebar-nav", "header", "navbar"],
    "grid": ["stack", "box"],
    "stack": ["grid", "box"],
    "box": ["stack", "grid"],
    "spacer": ["stack", "grid"],
    "divider": ["stack", "card"],
  };

  const relatedComponents = useMemo(() => {
    const ids = RELATED_MAP[selectedEntry.id] ?? [];
    const fromMap = ids
      .map(id => registry.find(e => e.id === id))
      .filter((e): e is RegistryEntry => !!e)
      .slice(0, 4);
    if (fromMap.length >= 2) return fromMap;
    // fallback: same category
    return registry
      .filter(e => e.id !== selectedEntry.id && e.category === selectedEntry.category &&
        (e.category === "atom" || e.category === "molecule" || e.category === "organism"))
      .slice(0, 4);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEntry.id]);
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
      <TopNav
        brandLogoSrc={brandLogoSrc}
        onBrandClick={() => {
          setTopTab("setup");
          setView("introduction");
          setMobileNavOpen(false);
        }}
        topTab={topTab}
        onTabChange={activateTopTab}
        catalogSearch={catalogSearch}
        onSearchChange={setCatalogSearch}
        searchFocused={searchFocused}
        onSearchFocus={() => setSearchFocused(true)}
        searchResults={searchResults}
        searchActiveIndex={searchActiveIndex}
        onSearchActiveIndexChange={setSearchActiveIndex}
        onSearchResultNavigate={navigateToSearchResult}
        searchPanelRef={searchPanelRef}
        searchInputRef={searchInputRef}
        darkMode={darkMode}
        onDarkModeToggle={() => setDarkMode((d) => !d)}
        mobileNavOpen={mobileNavOpen}
        onMobileNavToggle={() => setMobileNavOpen((o) => !o)}
        showAppSwitcher={showAppSwitcher}
        onAppSwitcherToggle={() => setShowAppSwitcher((s) => !s)}
        onAppSwitcherClose={() => setShowAppSwitcher(false)}
      />

      {toastMessage ? <p className="copy-toast" role="status" aria-live="polite">{toastMessage}</p> : null}

      <div className={`docs-layout${(topTab === "icons" || topTab === "logos" || topTab === "avatars") ? " docs-layout--asset-browser" : ""}`}>
        <Sidebar
          leftRailRef={leftRailRef}
          mobileNavOpen={mobileNavOpen}
          sidebarIndicator={sidebarIndicator}
          topTab={topTab}
          view={view}
          setView={setView}
          setTopTab={setTopTab}
          setMobileNavOpen={setMobileNavOpen}
          expandedGroups={expandedGroups}
          toggleGroup={toggleGroup}
          registry={registry}
          catalog={catalog}
          catalogSearch={catalogSearch}
          selectedEntry={selectedEntry}
          selectComponent={selectComponent}
        />

        <main ref={mainColRef} className="content-column">
          {topTab === "changelog" ? (
            <Suspense fallback={<div className="doc-section" style={{ color: "var(--muted)" }}>Loading…</div>}>
              <ChangelogPage onCopy={copyAndFlash} />
            </Suspense>

          ) : view === "introduction" ? (
            <Suspense fallback={<div className="doc-section" style={{ color: "var(--muted)" }}>Loading…</div>}>
              <IntroductionPage
                onNavigate={(tab, view, setupTab) => {
                  setTopTab(tab);
                  setView(view);
                  if (setupTab) setSetupTab(setupTab);
                  setMobileNavOpen(false);
                }}
                copyAndFlash={copyAndFlash}
              />
            </Suspense>
          ) : view === "getting-started" ? (
            <GettingStartedView
              stylePack={stylePack}
              setStylePack={setStylePack}
              accentColor={accentColor}
              setAccentColor={setAccentColor}
              accentDraft={accentDraft}
              setAccentDraft={setAccentDraft}
              applyAccentDraft={applyAccentDraft}
              setAccentIfValid={setAccentIfValid}
              setupTab={setupTab}
              setSetupTab={setSetupTab}
              setupTabsRef={setupTabsRef}
              setupIndicator={setupIndicator}
              configSnippet={configSnippet}
              aiTool={aiTool}
              setAiTool={setAiTool}
              aiProject={aiProject}
              setAiProject={setAiProject}
              aiPackageManager={aiPackageManager}
              setAiPackageManager={setAiPackageManager}
              aiProjectInitCommand={aiProjectInitCommand}
              aiInstallCommand={aiInstallCommand}
              aiCloudInstallCommand={aiCloudInstallCommand}
              aiContextPath={aiContextPath}
              aiContextSnippet={aiContextSnippet}
              aiPromptSnippet={aiPromptSnippet}
              selectComponent={selectComponent}
              copyAndFlash={copyAndFlash}
              setView={setView}
            />
          ) : view === "slash-commands" ? (
            <Suspense fallback={<div className="doc-section" style={{ color: "var(--muted)" }}>Loading…</div>}>
              <SlashCommandsPage onCopy={copyAndFlash} onNavigate={(tab, v) => { setTopTab(tab as any); setView(v as any); }} />
            </Suspense>
          ) : view === "foundations" ? (
            <Suspense
              fallback={(
                <section className="doc-section">
                  <div className="widget-empty-state">
                    <strong>Loading…</strong>
                  </div>
                </section>
              )}
            >
              <FoundationsPage
                foundationColorGroups={foundationColorGroups}
                typographyGroups={typographyGroups}
                darkMode={darkMode}
                onNavigate={(tab, v) => { setTopTab(tab as any); setView(v as any); }}
              />
            </Suspense>
          ) : view === "benefits" ? (
            <Suspense fallback={<div className="doc-section" style={{ color: "var(--muted)" }}>Loading…</div>}>
              <BenefitsPage
                onNavigate={(tab, v) => { setTopTab(tab as any); setView(v as any); }}
              />
            </Suspense>
          ) : view === "api-reference" ? (
            <ApiReferenceView
              selectedEntry={selectedEntry}
              apiPropRows={apiPropRows}
              importSnippet={importSnippet}
              installCommand={installCommand}
              setView={setView}
              copyAndFlash={copyAndFlash}
            />
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
          ) : view === "icons" ? (
            <Suspense
              fallback={(
                <section className="doc-section">
                  <div className="widget-empty-state">
                    <strong>Loading icons…</strong>
                    <p>Preparing the icon library.</p>
                  </div>
                </section>
              )}
            >
              <IconsPage />
            </Suspense>
          ) : view === "logos" ? (
            <Suspense
              fallback={(
                <section className="doc-section">
                  <div className="widget-empty-state">
                    <strong>Loading logos…</strong>
                    <p>Preparing the logo library.</p>
                  </div>
                </section>
              )}
            >
              <LogosPage />
            </Suspense>
          ) : view === "avatars" ? (
            <section className="doc-section">
              <p className="breadcrumbs">Avatars</p>
              <h1>Avatar Library</h1>
              <p className="lead">Customisable avatar illustrations — token-driven colours, consistent style, ready to copy.</p>
              <AvatarLibrary
                query={avatarQuery}
                onQueryChange={setAvatarQuery}
                seed={avatarSeed}
                onSeedChange={setAvatarSeed}
                styles={avatarCloudResults}
                onCopy={(value) => copyAndFlash(`avatar style: ${value}`, value)}
              />
            </section>
          ) : view === "component-gallery" ? (
            <Suspense fallback={<div className="doc-section" style={{ color: "var(--muted)" }}>Loading…</div>}>
              <ComponentGalleryPage
                registry={registry}
                gallerySearch={gallerySearch}
                setGallerySearch={setGallerySearch}
                galleryCat={galleryCat}
                setGalleryCat={setGalleryCat}
                onSelectComponent={selectComponent}
              />
            </Suspense>
          ) : view === "code-export" ? (
            <Suspense fallback={<div className="doc-section" style={{ color: "var(--muted)" }}>Loading…</div>}>
              <ExportCodePage
                entry={selectedEntry}
                importSnippet={importSnippet}
                onViewChange={(v) => setView(v)}
              />
            </Suspense>
          ) : (
            <ComponentDetailsView
              selectedEntry={selectedEntry}
              setView={setView}
              previewState={previewState}
              setPreviewState={setPreviewState}
              previewProps={previewProps}
              setPreviewProps={setPreviewProps}
              buttonLabel={buttonLabel}
              buttonVariant={buttonVariant}
              buttonSize={buttonSize}
              btnFilterType={btnFilterType}
              btnFilterSize={btnFilterSize}
              btnFilterState={btnFilterState}
              btnOnlyIcon={btnOnlyIcon}
              buttonGroupQuantity={buttonGroupQuantity}
              setButtonGroupQuantity={setButtonGroupQuantity}
              buttonGroupSize={buttonGroupSize}
              setButtonGroupSize={setButtonGroupSize}
              buttonGroupActiveIndex={buttonGroupActiveIndex}
              setButtonGroupActiveIndex={setButtonGroupActiveIndex}
              buttonGroupDisabled={buttonGroupDisabled}
              setButtonGroupDisabled={setButtonGroupDisabled}
              switchPattern={switchPattern}
              setSwitchPattern={setSwitchPattern}
              switchState={switchState}
              setSwitchState={setSwitchState}
              switchActive={switchActive}
              setSwitchActive={setSwitchActive}
              switchSize={switchSize}
              setSwitchSize={setSwitchSize}
              switchCardType={switchCardType}
              setSwitchCardType={setSwitchCardType}
              switchShowSublabel={switchShowSublabel}
              setSwitchShowSublabel={setSwitchShowSublabel}
              switchShowBadge={switchShowBadge}
              setSwitchShowBadge={setSwitchShowBadge}
              accordionState={accordionState}
              setAccordionState={setAccordionState}
              accordionFlipIcon={accordionFlipIcon}
              setAccordionFlipIcon={setAccordionFlipIcon}
              tooltipType={tooltipType}
              setTooltipType={setTooltipType}
              tooltipSize={tooltipSize}
              setTooltipSize={setTooltipSize}
              tooltipTone={tooltipTone}
              setTooltipTone={setTooltipTone}
              tooltipTail={tooltipTail}
              setTooltipTail={setTooltipTail}
              tooltipLeftIcon={tooltipLeftIcon}
              setTooltipLeftIcon={setTooltipLeftIcon}
              tooltipDismissible={tooltipDismissible}
              setTooltipDismissible={setTooltipDismissible}
              tooltipVisible={tooltipVisible}
              setTooltipVisible={setTooltipVisible}
              alertSeverity={alertSeverity}
              setAlertSeverity={setAlertSeverity}
              alertSize={alertSize}
              setAlertSize={setAlertSize}
              alertStyle={alertStyle}
              setAlertStyle={setAlertStyle}
              alertDismissible={alertDismissible}
              setAlertDismissible={setAlertDismissible}
              badgeType={badgeType}
              setBadgeType={setBadgeType}
              badgeStyle={badgeStyle}
              setBadgeStyle={setBadgeStyle}
              badgeColor={badgeColor}
              setBadgeColor={setBadgeColor}
              badgeSize={badgeSize}
              setBadgeSize={setBadgeSize}
              badgeNumber={badgeNumber}
              setBadgeNumber={setBadgeNumber}
              badgeDisabled={badgeDisabled}
              setBadgeDisabled={setBadgeDisabled}
              datePickerMode={datePickerMode}
              setDatePickerMode={setDatePickerMode}
              datePickerShowTimeFilters={datePickerShowTimeFilters}
              setDatePickerShowTimeFilters={setDatePickerShowTimeFilters}
              datePickerShowFooter={datePickerShowFooter}
              setDatePickerShowFooter={setDatePickerShowFooter}
              paginationType={paginationType}
              setPaginationType={setPaginationType}
              paginationShowFirstLast={paginationShowFirstLast}
              setPaginationShowFirstLast={setPaginationShowFirstLast}
              paginationShowPrevNext={paginationShowPrevNext}
              setPaginationShowPrevNext={setPaginationShowPrevNext}
              paginationShowAdvanced={paginationShowAdvanced}
              setPaginationShowAdvanced={setPaginationShowAdvanced}
              paginationPageSize={paginationPageSize}
              setPaginationPageSize={setPaginationPageSize}
              progressVariant={progressVariant}
              setProgressVariant={setProgressVariant}
              progressTone={progressTone}
              setProgressTone={setProgressTone}
              progressLineSize={progressLineSize}
              setProgressLineSize={setProgressLineSize}
              progressCircleSize={progressCircleSize}
              setProgressCircleSize={setProgressCircleSize}
              progressValue={progressValue}
              setProgressValue={setProgressValue}
              progressShowValue={progressShowValue}
              setProgressShowValue={setProgressShowValue}
              progressLabelPlacement={progressLabelPlacement}
              setProgressLabelPlacement={setProgressLabelPlacement}
              progressShowDescription={progressShowDescription}
              setProgressShowDescription={setProgressShowDescription}
              progressShowAction={progressShowAction}
              setProgressShowAction={setProgressShowAction}
              richEditorVariant={richEditorVariant}
              setRichEditorVariant={setRichEditorVariant}
              richEditorShowMore={richEditorShowMore}
              setRichEditorShowMore={setRichEditorShowMore}
              richEditorDisabled={richEditorDisabled}
              setRichEditorDisabled={setRichEditorDisabled}
              colorPickerFormat={colorPickerFormat}
              setColorPickerFormat={setColorPickerFormat}
              colorPickerShowRecommended={colorPickerShowRecommended}
              setColorPickerShowRecommended={setColorPickerShowRecommended}
              colorPickerDisabled={colorPickerDisabled}
              setColorPickerDisabled={setColorPickerDisabled}
              dividerOrientation={dividerOrientation}
              setDividerOrientation={setDividerOrientation}
              dividerStroke={dividerStroke}
              setDividerStroke={setDividerStroke}
              dividerLabel={dividerLabel}
              setDividerLabel={setDividerLabel}
              dividerInset={dividerInset}
              setDividerInset={setDividerInset}
              dividerThickness={dividerThickness}
              setDividerThickness={setDividerThickness}
              iconQuery={iconQuery}
              setIconQuery={setIconQuery}
              iconStyleVariant={iconStyleVariant}
              setIconStyleVariant={setIconStyleVariant}
              iconCloudResults={iconCloudResults}
              avatarQuery={avatarQuery}
              setAvatarQuery={setAvatarQuery}
              avatarSeed={avatarSeed}
              setAvatarSeed={setAvatarSeed}
              avatarCloudResults={avatarCloudResults}
              logoQuery={logoQuery}
              setLogoQuery={setLogoQuery}
              logoCloudResults={logoCloudResults}
              apiPropRows={apiPropRows}
              genericEnumRows={genericEnumRows}
              selectedPreviewStateConfig={selectedPreviewStateConfig}
              blockPrompt={blockPrompt}
              installCommand={installCommand}
              importSnippet={importSnippet}
              usageSnippet={usageSnippet}
              configSnippet={configSnippet}
              relatedComponents={relatedComponents}
              brandLogoSrc={brandLogoSrc}
              selectComponent={selectComponent}
              copyAndFlash={copyAndFlash}
            />
          )}
        </main>

        {topTab !== "icons" && topTab !== "logos" && topTab !== "changelog" && (
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
              <a className="toc-link" href="#install">Quickstart</a>
              <a className="toc-link" href="#mcp-section">MCP Integration</a>
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
          {view === "slash-commands" && (
            <>
              <a className="toc-link" href="#slash-overview">Overview</a>
              <a className="toc-link" href="#sc-cat-build">Build</a>
              <a className="toc-link" href="#sc-cat-refine">Refine</a>
              <a className="toc-link" href="#sc-cat-quality">Quality</a>
              <a className="toc-link" href="#sc-cat-adapt">Adapt</a>
              <a className="toc-link" href="#sc-cat-context">Context</a>
              <a className="toc-link" href="#sc-how-to-use">How to use</a>
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
          {view === "benefits" && (
            <>
              <a className="toc-link" href="#benefits-overview">Overview</a>
              <a className="toc-link" href="#benefits-cards">Key benefits</a>
              <a className="toc-link" href="#benefits-comparison">Before &amp; after</a>
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
              <a className="toc-link" href="#when-to-use">When to use</a>
              <a className="toc-link" href="#examples">Examples</a>
              {apiPropRows.length > 0 ? (
                <a className="toc-link" href="#customize">Props</a>
              ) : null}
              <a className="toc-link" href="#use">AI Prompt</a>
              {["button", "data-table", "skeleton", "avatar", "command-bar", "combo-box"].includes(activeRegistryId) ? (
                <a className="toc-link" href="#states">States</a>
              ) : null}
              {relatedComponents.length > 0 ? (
                <a className="toc-link" href="#related">Related</a>
              ) : null}
              <a className="toc-link" href="#installation">Installation</a>
            </>
          )}
          {view === "api-reference" && (
            <>
              <a className="toc-link" href="#api-overview">Overview</a>
              <a className="toc-link" href="#api-props">Props</a>
              <a className="toc-link" href="#api-contract">Contract notes</a>
            </>
          )}
        </aside>
        )}
      </div >

    </div >
  );
}
