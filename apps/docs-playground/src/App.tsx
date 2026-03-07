import { CSSProperties, FormEvent, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Accordion,
  Alert,
  Avatar,
  Badge,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Checkbox,
  CommandBar,
  DataTable,
  DatePicker,
  ColorPicker,
  Divider,
  Dropdown,
  FiltersBar,
  FormField,
  Header,
  IconButton,
  Input,
  InputGroup,
  LayoutShell,
  Logo,
  ModalDialog,
  Navbar,
  Pagination,
  Progress,
  Radio,
  RichEditor,
  SearchBox,
  SearchResultsPanel,
  Select,
  SidebarNav,
  Switch,
  Tabs,
  Toast,
  Tooltip,
  Textarea,
  DashboardPage,
  AuthPage,
  SettingsPage,
  OnboardingPage,
  MarketingPage,
  IconLibrary,
  AvatarLibrary,
  LogoLibrary
} from "@zephrui/ui-react";
import {
  generateCssVariables,
  resolveStylePackName,
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
import { ZephrCloudClient, type CloudBillingPlan } from "@zephrui/cloud-sdk";
import type { AvatarStyleDefinition } from "@zephrui/avatars";
import type { MaterialIconDefinition, MaterialIconStyle } from "@zephrui/icons-material";
import type { LogoCatalogEntry } from "@zephrui/logos";
import zephrLogoDark from "../../../logo/zephr-dark.png";
import zephrLogoLight from "../../../logo/zephr-light.png";
import "@zephrui/ui-react/themes/notion.css";

const registry = registryData as unknown as RegistryEntry[];
const DEFAULT_STYLE_PACK: StylePackName = "notion";

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
  "templates";
type TopTab = "setup" | "components" | "pages" | "changelog";

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
type CheckoutPlanId = "individual" | "startup" | "enterprise";

interface CheckoutPlanOption {
  id: CheckoutPlanId;
  label: string;
  description: string;
  recommended?: boolean;
  checkoutUrl?: string;
  available: boolean;
}

interface CloudAssetState {
  source: CloudAssetSource;
  loading: boolean;
  message: string;
}

const SURFACE_STYLE_META: Record<SurfaceStyleOption, { label: string; description: string }> = {
  shadow: {
    label: "Cards with shadows",
    description: "Subtle elevation for cards, menus, and overlays."
  },
  flat: {
    label: "Flat design",
    description: "No elevation. Clean, minimal surfaces with border separation."
  }
};

const STYLE_PACK_META: Record<StylePackName, { label: string; description: string; tier: "free" | "pro" }> = {
  notion: {
    label: "Notion",
    description: "Warm white surfaces with minimal shadow.",
    tier: "free"
  },
  stripe: {
    label: "Stripe",
    description: "Bright accent-driven surfaces with soft elevation.",
    tier: "pro"
  },
  linear: {
    label: "Linear",
    description: "Compact data-dense rhythm with crisp edges.",
    tier: "pro"
  },
  framer: {
    label: "Framer",
    description: "Expressive contrast and bolder typography scale.",
    tier: "pro"
  }
};

const CHECKOUT_PLAN_META: Record<CheckoutPlanId, { label: string; description: string; recommended?: boolean }> = {
  individual: {
    label: "Individual",
    description: "For solo builders and personal projects."
  },
  startup: {
    label: "Startup",
    description: "For small teams shipping products quickly.",
    recommended: true
  },
  enterprise: {
    label: "Enterprise",
    description: "For larger teams with advanced support needs."
  }
};

function normalizeCheckoutPlans(plans: CloudBillingPlan[]): CheckoutPlanOption[] {
  return plans
    .filter((plan): plan is CloudBillingPlan & { id: CheckoutPlanId } =>
      plan.id === "individual" || plan.id === "startup" || plan.id === "enterprise"
    )
    .map((plan) => ({
      id: plan.id,
      label: plan.label || CHECKOUT_PLAN_META[plan.id].label,
      description: plan.description || CHECKOUT_PLAN_META[plan.id].description,
      recommended: plan.recommended ?? CHECKOUT_PLAN_META[plan.id].recommended,
      checkoutUrl: plan.checkoutUrl,
      available: Boolean(plan.available && plan.checkoutUrl)
    }));
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
    background950: backgroundLight[0],
    background800: backgroundLight[1],
    background600: backgroundLight[2],
    background400: backgroundLight[3],
    background200: backgroundLight[4],
    background100: backgroundLight[5],
    background0: backgroundLight[6],
    text950: textLight[0],
    text700: textLight[1],
    text500: textLight[2],
    text300: textLight[3],
    stroke400: strokeLight[0],
    stroke300: strokeLight[1],
    stroke200: strokeLight[2],
    stroke100: strokeLight[3],
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
    background950: backgroundDark[0],
    background800: backgroundDark[1],
    background600: backgroundDark[2],
    background400: backgroundDark[3],
    background200: backgroundDark[4],
    background100: backgroundDark[5],
    background0: backgroundDark[6],
    text950: textDark[0],
    text700: textDark[1],
    text500: textDark[2],
    text300: textDark[3],
    stroke400: strokeDark[0],
    stroke300: strokeDark[1],
    stroke200: strokeDark[2],
    stroke100: strokeDark[3],
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

function fromSearchParams(): {
  stylePack: StylePackName;
  componentId: string;
  accentColor: string;
  view: WorkspaceView;
} {
  if (typeof window === "undefined") {
    return {
      stylePack: DEFAULT_STYLE_PACK,
      componentId: "button",
      accentColor: defaultAccentForPack(DEFAULT_STYLE_PACK),
      view: "introduction"
    };
  }

  const params = new URLSearchParams(window.location.search);
  const componentId = params.get("component") ?? "button";
  const stylePack = resolveStylePackName(
    params.get("theme") ?? sessionStorage.getItem("zephr-style-pack") ?? DEFAULT_STYLE_PACK
  );
  const storedAccent = normalizeHexColor(sessionStorage.getItem("zephr-accent-color"));
  const accentColor = migrateLegacyAccent(
    stylePack,
    normalizeHexColor(params.get("accent")) ?? storedAccent
  );
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
                    viewParam === "templates" ? "templates" :
                      "introduction";

  return {
    stylePack,
    componentId: registry.some((entry) => entry.id === componentId) ? componentId : "button",
    accentColor,
    view
  };
}

function updateSearchParams(
  componentId: string,
  accentColor: string,
  view: WorkspaceView,
  currentPack: StylePackName,
  surfaceStyle: SurfaceStyleOption = "shadow"
): void {
  if (typeof window === "undefined") {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  if (currentPack === DEFAULT_STYLE_PACK) {
    params.delete("theme");
  } else {
    params.set("theme", currentPack);
  }
  params.set("component", componentId);
  if (accentColor === defaultAccentForPack(currentPack)) {
    params.delete("accent");
  } else {
    params.set("accent", accentColor);
  }
  if (surfaceStyle === "flat") {
    params.set("surface", "flat");
  } else {
    params.delete("surface");
  }
  params.set("view", view);

  const next = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState({}, "", next);
}

function getTopTabForView(view: WorkspaceView): TopTab {
  if (view === "templates") return "pages";
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
      green: "Theme synced successfully.",
      blue: "New registry schema available.",
      grey: "Maintenance window starts in 30 minutes."
    };
    const descriptionBySeverity: Record<AlertSeverityOption, string> = {
      red: "Check CI logs, fix the failing step, and redeploy.",
      yellow: "Upgrade the plan or reduce request volume to prevent throttling.",
      green: "Your latest token changes were applied across all previews.",
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
              <Badge tone="info">Theme-ready</Badge>
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
                { id: "setup", label: "Theme setup", href: "#", active: true }
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
              description: "Update semantic aliases for notion and stripe packs.",
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

  return (
    <div className="preview-stack">
      <p>No dedicated preview registered for this component yet.</p>
    </div>
  );
}

/* ─── TemplateBrowserFrame ────────────────────────────────────── */
type TplDevice = "desktop" | "tablet" | "mobile";
const DEVICE_WIDTHS: Record<TplDevice, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "390px",
};
const DEVICE_ICONS: Record<TplDevice, string> = {
  desktop: "M20 3H4a1 1 0 00-1 1v12a1 1 0 001 1h7v2H8v2h8v-2h-3v-2h7a1 1 0 001-1V4a1 1 0 00-1-1zM4 16V4h16v12H4z",
  tablet: "M17 2H7a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V4a2 2 0 00-2-2zm-5 18a1 1 0 110-2 1 1 0 010 2z",
  mobile: "M17 1H7a2 2 0 00-2 2v18a2 2 0 002 2h10a2 2 0 002-2V3a2 2 0 00-2-2zm-5 20a1 1 0 110-2 1 1 0 010 2z",
};

function TemplateBrowserFrame({
  children,
  address,
  minHeight,
}: {
  children: ReactNode;
  address?: string;
  minHeight?: string;
}) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [device, setDevice] = useState<TplDevice>("desktop");
  const [width, setWidth] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ startX: number; startW: number } | null>(null);

  // Mouse-drag resize logic
  function onDragStart(e: React.MouseEvent) {
    e.preventDefault();
    const el = containerRef.current;
    if (!el) return;
    dragRef.current = { startX: e.clientX, startW: el.getBoundingClientRect().width };
    const onMove = (me: MouseEvent) => {
      if (!dragRef.current) return;
      const delta = me.clientX - dragRef.current.startX;
      const next = Math.max(320, dragRef.current.startW + delta);
      setWidth(next);
      setDevice("desktop"); // reset device pill when manually resizing
    };
    const onUp = () => {
      dragRef.current = null;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }

  function selectDevice(d: TplDevice) {
    setDevice(d);
    setWidth(null); // let CSS drive width from DEVICE_WIDTHS
  }

  const containerStyle: React.CSSProperties = {
    maxWidth: "100%",
    width: width != null ? `${width}px` : DEVICE_WIDTHS[device],
    transition: width != null ? "none" : "width 0.25s cubic-bezier(0.4,0,0.2,1)",
    position: "relative",
  };

  return (
    <div>
      {/* ── Toolbar: sits above the browser frame ── */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: "10px", gap: "12px",
      }}>
        {/* Device switcher */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "2px",
          background: "var(--panel-soft, #f3f4f6)", border: "1px solid var(--line)",
          borderRadius: "10px", padding: "3px",
        }}>
          {(["desktop", "tablet", "mobile"] as TplDevice[]).map(d => (
            <button
              key={d}
              type="button"
              title={d.charAt(0).toUpperCase() + d.slice(1)}
              onClick={() => selectDevice(d)}
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                gap: "5px", padding: "5px 10px", borderRadius: "7px", border: "none",
                background: device === d ? "var(--panel, #fff)" : "transparent",
                color: device === d ? "var(--fg, #111)" : "var(--muted, #888)",
                fontSize: "12px", fontWeight: device === d ? 600 : 400,
                cursor: "pointer", fontFamily: "inherit",
                boxShadow: device === d ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                transition: "all 0.12s ease",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d={DEVICE_ICONS[d]} />
              </svg>
              {d.charAt(0).toUpperCase() + d.slice(1)}
            </button>
          ))}
        </div>

        {/* Theme toggle */}
        <button
          type="button"
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          onClick={() => setTheme(t => t === "light" ? "dark" : "light")}
          style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            padding: "5px 12px", borderRadius: "8px", border: "1px solid var(--line)",
            background: "var(--panel, #fff)", color: "var(--fg, #111)",
            fontSize: "12px", fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
            boxShadow: "0 1px 2px rgba(0,0,0,0.04)", transition: "all 0.12s",
          }}
        >
          {theme === "light" ? (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
          ) : (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          )}
          {theme === "light" ? "Light" : "Dark"}
        </button>
      </div>

      {/* ── Resizable container ── */}
      <div ref={containerRef} style={containerStyle}>
        <div data-theme={theme === "dark" ? "dark" : undefined}>
          <BrowserPreviewFrame address={address} minHeight={minHeight} flush>
            {children}
          </BrowserPreviewFrame>
        </div>
        {/* Drag handle */}
        <div
          onMouseDown={onDragStart}
          title="Drag to resize"
          style={{
            position: "absolute", top: 0, right: -6, width: 12, height: "100%",
            cursor: "ew-resize", display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 10, userSelect: "none",
          }}
        >
          <div style={{
            width: 4, height: 40, borderRadius: 9999,
            background: "var(--line, #e5e7eb)",
            transition: "background 0.12s",
          }} />
        </div>
      </div>

      {/* ── Width label ── */}
      {width != null && (
        <div style={{ fontSize: "11px", color: "var(--muted)", marginTop: "6px", textAlign: "center" }}>
          {Math.round(width)}px
        </div>
      )}
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
    <div className="preview-theme-scope preview-browser">
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

/* ── Preview / Code tab block ─── */
function PreviewCodeBlock({
  preview,
  code,
  onCopy,
}: {
  preview: ReactNode;
  code: string;
  onCopy: () => void;
}) {
  const [tab, setTab] = useState<"preview" | "code">("preview");
  return (
    <div className="pcb-root">
      <div className="pcb-toolbar">
        <button
          type="button"
          className={`pcb-tab${tab === "preview" ? " active" : ""}`}
          onClick={() => setTab("preview")}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
          </svg>
          Preview
        </button>
        <button
          type="button"
          className={`pcb-tab${tab === "code" ? " active" : ""}`}
          onClick={() => setTab("code")}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
          </svg>
          Code
        </button>
        <button type="button" className="pcb-copy" onClick={onCopy}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
          </svg>
          Copy
        </button>
      </div>
      {tab === "preview" ? (
        <div className="pcb-preview-area">{preview}</div>
      ) : (
        <pre className="pcb-code-area">{code}</pre>
      )}
    </div>
  );
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
  beta,
}: {
  packageName: string;
  onCopy: (cmd: string) => void;
  beta?: boolean;
}) {
  const [pm, setPm] = useState<PkgManager>("npm");
  const verb = PKG_INSTALL[pm];
  const cmd = `${verb} ${packageName}`;
  return (
    <div className="itb-block">
      <div className="itb-tabrow">
        {(["npm", "pnpm", "yarn"] as PkgManager[]).map((p) => (
          <button key={p} type="button" className={`itb-tab${pm === p ? " active" : ""}`} onClick={() => setPm(p)}>
            {p}
          </button>
        ))}
      </div>
      <div className="itb-root">
        <div className="itb-file-row">
          <span className="itb-file-label">terminal</span>
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
        {beta && (
          <div className="itb-beta-note">
            <Badge size="md" variant="stroke" color="yellow" style={{ marginRight: "0.5rem" }}>
              Private Beta
            </Badge>
            @zephrui/ui-react is not yet published to npm — install command coming soon.
          </div>
        )}
      </div>
    </div>
  );
}

function LicenseKeyModal({
  licenseKey,
  plans,
  onSubmit,
  onGetKey,
  onRemove,
  onClose
}: {
  licenseKey: string;
  plans: CheckoutPlanOption[];
  onSubmit: (key: string) => Promise<void> | void;
  onGetKey: (planId: CheckoutPlanId) => void;
  onRemove: () => void;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState(licenseKey);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isPro = licenseKey.length >= 8;

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (draft.trim().length < 8) {
      setError("License key must be at least 8 characters.");
      return;
    }
    try {
      setIsSubmitting(true);
      await onSubmit(draft.trim());
      setError("");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to validate license key.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="upgrade-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Zephr Pro license key"
    >
      <div className="upgrade-modal" onClick={(e) => e.stopPropagation()}>
        <div className="upgrade-modal-header">
          <span>Zephr Pro</span>
          <button type="button" className="upgrade-modal-close" onClick={onClose} aria-label="Close"><span className="ms">close</span></button>
        </div>
        <div className="upgrade-modal-body">
          {isPro ? (
            <>
              <p className="upgrade-modal-note upgrade-modal-note--success">✓ Pro access active</p>
              <p className="upgrade-modal-note">Current key: <code>{licenseKey.slice(0, 4)}••••••••</code></p>
              <div className="upgrade-modal-actions">
                <button type="button" className="upgrade-modal-remove" onClick={onRemove}>Remove key &amp; downgrade</button>
              </div>
            </>
          ) : (
            <form className="upgrade-modal-form" onSubmit={handleSubmit}>
              <p className="upgrade-modal-note">Enter your license key to unlock Pro molecules, organisms, and page templates.</p>
              {plans.length > 0 && (
                <div className="upgrade-modal-plan-grid">
                  {plans.map((plan) => (
                    <button
                      key={plan.id}
                      type="button"
                      className="upgrade-modal-plan"
                      disabled={!plan.available || isSubmitting}
                      onClick={() => onGetKey(plan.id)}
                    >
                      <span className="upgrade-modal-plan-title">
                        {plan.label}
                        {plan.recommended ? <Badge tone="neutral">Popular</Badge> : null}
                      </span>
                      <span className="upgrade-modal-plan-copy">{plan.description}</span>
                    </button>
                  ))}
                </div>
              )}
              <input
                className="upgrade-modal-input"
                type="text"
                value={draft}
                onChange={(e) => { setDraft(e.target.value); setError(""); }}
                placeholder="zephr-xxxxxxxxxxxxxxxx"
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
                spellCheck={false}
                disabled={isSubmitting}
              />
              {error && <p className="upgrade-modal-error">{error}</p>}
              <div className="upgrade-modal-actions">
                <Button type="submit" size="sm" loading={isSubmitting} disabled={isSubmitting}>
                  Unlock Pro
                </Button>
              </div>
            </form>
          )}
        </div>
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

  const [stylePack, setStylePack] = useState<StylePackName>(initial.stylePack);
  const [surfaceStyle, setSurfaceStyle] = useState<SurfaceStyleOption>(() => {
    if (typeof window === "undefined") return "shadow";
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get("surface");
    const fromSession = sessionStorage.getItem("zephr-surface-style");
    const raw = fromQuery ?? fromSession;
    return raw === "flat" ? "flat" : "shadow";
  });
  const [accentColor, setAccentColor] = useState(initial.accentColor);
  const [accentDraft, setAccentDraft] = useState(initial.accentColor);
  const [accentPopoverOpen, setAccentPopoverOpen] = useState(false);
  const [accentPopoverPos, setAccentPopoverPos] = useState<{ top: number; left: number } | null>(null);
  const accentPopoverRef = useRef<HTMLDivElement>(null);
  const accentTriggerRef = useRef<HTMLButtonElement>(null);
  const [view, setView] = useState<WorkspaceView>(initial.view);
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

  const [intentText, setIntentText] = useState(() => getDefaultIntent(initial.componentId));

  const [buttonLabel, setButtonLabel] = useState("Launch Campaign");
  const [buttonVariant, setButtonVariant] = useState<"primary" | "secondary" | "ghost" | "danger">(
    "primary"
  );
  const [buttonSize, setButtonSize] = useState<"sm" | "md" | "lg">("md");
  const [previewState, setPreviewState] = useState<PreviewStateKey>("default");
  const [componentDetailTab, setComponentDetailTab] = useState<"preview" | "code">("preview");

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
  const [licenseKey, setLicenseKey] = useState<string>(() =>
    typeof window !== "undefined" ? sessionStorage.getItem("zephr-license-key") ?? "" : ""
  );
  const [userTier, setUserTier] = useState<"free" | "pro">(() =>
    typeof window !== "undefined" && sessionStorage.getItem("zephr-license-key") ? "pro" : "free"
  );
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const searchPanelRef = useRef<HTMLDivElement | null>(null);

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
    [accentColor, stylePack]
  );
  const previewThemeCss = useMemo(
    () => buildPreviewThemeCss(stylePack, accentColor, surfaceStyle, expandedColorPalettes),
    [accentColor, expandedColorPalettes, stylePack, surfaceStyle]
  );
  const configSnippet = useMemo(() => {
    return [
      `export default {`,
      `  stylePack: "${stylePack}",`,
      `  tokens: {`,
      `    color: {`,
      `      primary: "${accentColor}",`,
      `      accent: "${accentColor}",`,
      `      primaryContrast: "${accentTextColor(accentColor)}"`,
      `    }`,
      `  }`,
      `};`
    ].join("\n");
  }, [accentColor, stylePack]);
  const cloudBaseUrl = (import.meta.env.VITE_ZEPHR_CLOUD_URL as string | undefined)?.trim() || "http://localhost:8787";
  const checkoutEnvUrls: Record<CheckoutPlanId, string> = {
    individual: (import.meta.env.VITE_ZEPHR_CHECKOUT_INDIVIDUAL as string | undefined)?.trim() || "",
    startup: (import.meta.env.VITE_ZEPHR_CHECKOUT_STARTUP as string | undefined)?.trim() || "",
    enterprise: (import.meta.env.VITE_ZEPHR_CHECKOUT_ENTERPRISE as string | undefined)?.trim() || ""
  };
  const [checkoutPlans, setCheckoutPlans] = useState<CheckoutPlanOption[]>(() =>
    (Object.keys(CHECKOUT_PLAN_META) as CheckoutPlanId[]).map((id) => ({
      id,
      ...CHECKOUT_PLAN_META[id],
      checkoutUrl: checkoutEnvUrls[id] || undefined,
      available: Boolean(checkoutEnvUrls[id])
    }))
  );
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

  useEffect(() => {
    let cancelled = false;
    const client = new ZephrCloudClient({ baseUrl: cloudBaseUrl });
    client
      .getLicensePlans()
      .then((plans) => {
        if (cancelled) return;
        const normalized = normalizeCheckoutPlans(plans);
        if (normalized.length > 0) {
          setCheckoutPlans(
            normalized.map((plan) => ({
              ...plan,
              checkoutUrl: plan.checkoutUrl || checkoutEnvUrls[plan.id] || undefined,
              available: Boolean(plan.checkoutUrl || checkoutEnvUrls[plan.id])
            }))
          );
          return;
        }
        throw new Error("No billing plans returned.");
      })
      .catch(() => {
        if (cancelled) return;
        setCheckoutPlans(
          (Object.keys(CHECKOUT_PLAN_META) as CheckoutPlanId[]).map((id) => ({
            id,
            ...CHECKOUT_PLAN_META[id],
            checkoutUrl: checkoutEnvUrls[id] || undefined,
            available: Boolean(checkoutEnvUrls[id])
          }))
        );
      });
    return () => {
      cancelled = true;
    };
  }, [cloudBaseUrl, checkoutEnvUrls.enterprise, checkoutEnvUrls.individual, checkoutEnvUrls.startup]);

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
      `- Base theme: ${stylePack}.`,
      `- Surface style: ${SURFACE_STYLE_META[surfaceStyle].label}.`,
      `- Accent color: ${accentColor}.`,
      "- Prefer semantic component props over one-off style overrides.",
      "- Keep accessibility labels for icon-only and form controls."
    ].join("\n");
  }, [accentColor, aiTool, stylePack, surfaceStyle]);
  const aiPromptSnippet = useMemo(() => {
    const assistantLabel = aiToolLabels[aiTool];
    return [
      `Set up Zephr UI in this ${aiProjectLabels[aiProject]} project.`,
      `Assistant target: ${assistantLabel}`,
      "",
      "Note: @zephrui/ui-react is in private beta and not yet published to npm.",
      "Skip the install step for now — import paths will work once the package is published.",
      "",
      "Steps:",
      `1. Create app: ${aiProjectInitCommand}`,
      `2. Install Zephr (coming soon): ${aiInstallCommand}`,
      "3. Import components from `@zephrui/ui-react`.",
      `4. Set accent to "${accentColor}" (base theme is "${stylePack}").`,
      "5. Keep generated code accessible and production-ready."
    ].join("\n");
  }, [accentColor, aiInstallCommand, aiProject, aiProjectInitCommand, aiTool, stylePack]);

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
              dark
            };
          });

        return {
          ...group,
          tokens
        };
      })
      .filter((group) => group.tokens.length > 0);
  }, [expandedColorPalettes]);

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
    sessionStorage.setItem("zephr-style-pack", stylePack);
  }, [stylePack]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    sessionStorage.setItem("zephr-surface-style", surfaceStyle);
  }, [surfaceStyle]);

  // Close accent popover on outside click (portal-aware)
  useEffect(() => {
    if (!accentPopoverOpen) return;
    function handleOutside(e: MouseEvent) {
      const t = e.target as Node;
      const inTrigger = accentPopoverRef.current?.contains(t);
      const inPortal = (t as Element).closest?.(".accent-dropdown-popover");
      if (!inTrigger && !inPortal) setAccentPopoverOpen(false);
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [accentPopoverOpen]);

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
    updateSearchParams(activeRegistryId, accentColor, view, stylePack, surfaceStyle);
  }, [accentColor, activeRegistryId, stylePack, surfaceStyle, view]);

  useEffect(() => {
    setIntentText(getDefaultIntent(activeRegistryId));
  }, [activeRegistryId]);

  useEffect(() => {
    const config = previewStateConfig[activeRegistryId];
    const firstState = config?.options[0]?.value ?? "default";
    setPreviewState(firstState);
    setComponentDetailTab("preview");
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
        id: "doc-setup-mission",
        kind: "doc",
        label: "Mission and Vision",
        detail: "Setup",
        tab: "setup",
        view: "mission",
        anchor: "mission-overview"
      },
      {
        id: "doc-setup-team",
        kind: "doc",
        label: "Team",
        detail: "Setup",
        tab: "setup",
        view: "team",
        anchor: "team-overview"
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
      setView("templates");
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

  const shareUrl = useMemo(() => {
    const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost:4172";
    const path = typeof window !== "undefined" ? window.location.pathname : "/studio";
    const params = new URLSearchParams();
    params.set("component", selectedEntry.id);
    if (stylePack !== DEFAULT_STYLE_PACK) {
      params.set("theme", stylePack);
    }
    if (accentColor !== defaultAccentForPack(stylePack)) {
      params.set("accent", accentColor);
    }
    if (surfaceStyle === "flat") {
      params.set("surface", "flat");
    }
    params.set("view", view);
    return `${origin}${path}?${params.toString()}`;
  }, [accentColor, selectedEntry.id, stylePack, surfaceStyle, view]);

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

  function handleSurfaceStyleChange(nextStyle: SurfaceStyleOption): void {
    setSurfaceStyle(nextStyle);
  }

  function handleStylePackChange(nextPack: StylePackName): void {
    if (STYLE_PACK_META[nextPack].tier === "pro" && userTier !== "pro") {
      setShowUpgradeModal(true);
      showToast("Unlock Pro to use this style pack");
      return;
    }

    const wasUsingDefaultAccent = accentColor === defaultAccentForPack(stylePack);
    setStylePack(nextPack);
    if (wasUsingDefaultAccent) {
      const nextAccent = defaultAccentForPack(nextPack);
      setAccentColor(nextAccent);
      setAccentDraft(nextAccent);
    }
  }

  async function copyAndFlash(label: string, text: string): Promise<void> {
    const ok = await copyText(text);
    showToast(ok ? `${label} copied` : `Clipboard blocked for ${label}`);
  }

  return (
    <div className="docs-root">
      <style>{previewThemeCss}</style>
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
                placeholder="Search docs and components..."
                aria-label="Search docs and components"
              />
              <kbd className="search-kbd">⌘K</kbd>
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
            <Button
              size="sm"
              variant={userTier === "pro" ? "secondary" : "primary"}
              onClick={() => setShowUpgradeModal(true)}
            >
              {userTier === "pro" ? "✓ Pro" : "Unlock Pro"}
            </Button>
            <span className="btn-hide-mobile">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => showToast("Support portal coming soon")}
              >
                Support
              </Button>
            </span>
            <span className="btn-hide-mobile">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => showToast("Feature request portal coming soon")}
              >
                Feature Request
              </Button>
            </span>
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

      <div className="docs-layout">
        <aside className={`left-rail ${mobileNavOpen ? "is-mobile-open" : ""}`}>

          {/* ── Sidebar Theme & Accent ── */}
          <div className="sidebar-theme-section">
            <p className="sidebar-theme-label">Style &amp; Accent</p>
            <div className="sidebar-theme-controls">
              <select
                className="sidebar-theme-select"
                value={surfaceStyle}
                onChange={(e) => handleSurfaceStyleChange(e.target.value as SurfaceStyleOption)}
                aria-label="Select surface style"
              >
                {(Object.keys(SURFACE_STYLE_META) as SurfaceStyleOption[]).map((mode) => (
                  <option key={mode} value={mode}>{SURFACE_STYLE_META[mode].label}</option>
                ))}
              </select>
              <div className="accent-dropdown" ref={accentPopoverRef}>
                <button
                  ref={accentTriggerRef}
                  type="button"
                  className="header-accent-trigger"
                  onClick={() => {
                    if (!accentPopoverOpen && accentTriggerRef.current) {
                      const r = accentTriggerRef.current.getBoundingClientRect();
                      setAccentPopoverPos({ top: r.bottom + 6, left: r.left });
                    }
                    setAccentPopoverOpen((o) => !o);
                  }}
                  aria-label="Choose accent color"
                  aria-expanded={accentPopoverOpen}
                >
                  <span className="accent-dropdown-dot" style={{ backgroundColor: accentColor }} />
                  <span className="ms accent-dropdown-chevron">expand_more</span>
                </button>
                {accentPopoverOpen && accentPopoverPos && createPortal(
                  <div
                    className="accent-dropdown-popover"
                    style={{ position: "fixed", top: accentPopoverPos.top, left: accentPopoverPos.left, zIndex: 300 }}
                  >
                    <div className="accent-dropdown-swatches">
                      {accentPresets.map((color) => (
                        <button
                          key={color}
                          type="button"
                          className={`accent-dot ${accentColor === color ? "is-active" : ""}`}
                          style={{ backgroundColor: color }}
                          aria-label={`Set accent ${color}`}
                          onClick={() => { setAccentColor(color); setAccentDraft(color); setAccentPopoverOpen(false); }}
                        />
                      ))}
                    </div>
                    <div className="accent-dropdown-inputs">
                      <input
                        type="color"
                        value={accentColor}
                        onChange={(e) => { setAccentColor(e.target.value); setAccentDraft(e.target.value); }}
                        aria-label="Accent color picker"
                      />
                      <input
                        type="text"
                        value={accentDraft}
                        onChange={(e) => setAccentIfValid(e.target.value)}
                        onBlur={applyAccentDraft}
                        onKeyDown={(e) => { if (e.key === "Enter") applyAccentDraft(); }}
                        placeholder="#121212"
                        aria-label="Accent color hex"
                      />
                    </div>
                  </div>,
                  document.body
                )}
              </div>
            </div>
          </div>

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
              <button
                type="button"
                className={`sidebar-link ${view === "mission" ? "is-active" : ""}`}
                onClick={() => {
                  setTopTab("setup");
                  setView("mission");
                  setMobileNavOpen(false);
                }}
              >
                Mission &amp; Vision
              </button>
              <button
                type="button"
                className={`sidebar-link ${view === "team" ? "is-active" : ""}`}
                onClick={() => {
                  setTopTab("setup");
                  setView("team");
                  setMobileNavOpen(false);
                }}
              >
                Team
              </button>
            </div>
          )}
          {topTab === "components" && (
            <div className="nav-group">
              <p className="group-title">Components</p>
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
                              className={`component-link ${entry.tier === "pro" ? "with-tag" : ""} ${entry.id === selectedEntry.id && (view === "components" || view === "api-reference") ? "is-active" : ""}`}
                              onClick={() => selectComponent(entry.id)}
                            >
                              <span>{entry.name}</span>
                              {entry.tier === "pro" && (
                                <span className={`pill-badge ${userTier === "pro" ? "" : "is-locked"}`}>PRO</span>
                              )}
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
                className={`sidebar-link with-tag ${view === "templates" ? "is-active" : ""}`}
                onClick={() => {
                  setTopTab("pages");
                  setView("templates");
                  setMobileNavOpen(false);
                }}
              >
                <span className="sidebar-link-label">Templates Overview</span>
                <span className={`pill-badge ${userTier === "pro" ? "" : "is-locked"}`}>PRO</span>
              </button>
              <a
                className="sidebar-link"
                href="#template-dashboard"
                onClick={() => {
                  setTopTab("pages");
                  setView("templates");
                  setMobileNavOpen(false);
                }}
              >
                Dashboard
              </a>
              <a
                className="sidebar-link"
                href="#template-auth"
                onClick={() => {
                  setTopTab("pages");
                  setView("templates");
                  setMobileNavOpen(false);
                }}
              >
                Auth
              </a>
              <a
                className="sidebar-link"
                href="#template-settings"
                onClick={() => {
                  setTopTab("pages");
                  setView("templates");
                  setMobileNavOpen(false);
                }}
              >
                Settings
              </a>
              <a
                className="sidebar-link"
                href="#template-onboarding"
                onClick={() => {
                  setTopTab("pages");
                  setView("templates");
                  setMobileNavOpen(false);
                }}
              >
                Onboarding
              </a>
              <a
                className="sidebar-link"
                href="#template-marketing"
                onClick={() => {
                  setTopTab("pages");
                  setView("templates");
                  setMobileNavOpen(false);
                }}
              >
                Marketing
              </a>
            </div>
          )}

          {topTab === "changelog" && (
            <div className="nav-group">
              <p className="group-title">Change Log</p>
              <a className="sidebar-link" href="#changelog-overview" onClick={() => setMobileNavOpen(false)}>
                Overview
              </a>
              <a className="sidebar-link with-tag changelog-version-link" href="#release-0-4-0" onClick={() => setMobileNavOpen(false)}>
                <span className="changelog-version-tags">
                  <Tag tone="neutral">v0.4.0</Tag>
                  <Tag tone="info">Latest</Tag>
                </span>
              </a>
              <a className="sidebar-link with-tag changelog-version-link" href="#release-0-3-0" onClick={() => setMobileNavOpen(false)}>
                <Tag tone="neutral">v0.3.0</Tag>
              </a>
              <a className="sidebar-link with-tag changelog-version-link" href="#release-0-2-0" onClick={() => setMobileNavOpen(false)}>
                <Tag tone="neutral">v0.2.0</Tag>
              </a>
              <a className="sidebar-link with-tag changelog-version-link" href="#release-0-1-0" onClick={() => setMobileNavOpen(false)}>
                <Tag tone="neutral">v0.1.0</Tag>
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
                <p className="lead">Track updates across docs UX, component APIs, and AI integration tooling.</p>
              </section>

              <section id="release-0-4-0" className="doc-section">
                <div className="release-header">
                  <div className="release-version-tags">
                    <Tag tone="neutral">v0.4.0</Tag>
                    <Tag tone="info">Latest</Tag>
                  </div>
                  <div className="release-meta">
                    <span className="release-date">March 4, 2026</span>
                  </div>
                </div>
                <p className="release-summary">Style pack differentiation, PRO gating, premium page templates, and docs narrative pages.</p>
                <div className="release-changes">
                  <div className="release-category">
                    <h4>✦ New features</h4>
                    <ul className="release-list">
                      <li>Style pack picker with visual mini-app mockups — each pack renders a unique UI.</li>
                      <li>PRO style pack gating — free-tier users see locked overlay and upgrade modal.</li>
                      <li>5 premium page templates: Dashboard, Auth, Settings, Onboarding, Marketing.</li>
                      <li>Foundations page with "How tokens work" visual flow and naming convention reference.</li>
                      <li>Team page with Avatar components and process grid.</li>
                    </ul>
                  </div>
                  <div className="release-category">
                    <h4>⚡ Improvements</h4>
                    <ul className="release-list">
                      <li>Template previews wrapped in <code>BrowserPreviewFrame</code> with address bar chrome.</li>
                      <li>Dashboard template: sparkline SVGs, stat variance indicators, activity timeline.</li>
                      <li>Auth template: social auth buttons, testimonial quote, split-panel layout.</li>
                      <li>Marketing template: gradient hero, 3-tier pricing cards, testimonial carousel.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section id="release-0-3-0" className="doc-section">
                <div className="release-header">
                  <div className="release-version-tags">
                    <Tag tone="neutral">v0.3.0</Tag>
                  </div>
                  <div className="release-meta">
                    <span className="release-date">March 3, 2026</span>
                  </div>
                </div>
                <p className="release-summary">P0 sprint: dark mode, layout primitives, tier system, utility compiler removal.</p>
                <div className="release-changes">
                  <div className="release-category">
                    <h4>✦ New features</h4>
                    <ul className="release-list">
                      <li>Dark mode with <code>[data-theme="dark"]</code> + <code>prefers-color-scheme</code> support.</li>
                      <li>Layout primitives: Stack, Grid, Box, Spacer — free tier.</li>
                      <li>License key tier system: <code>zephr upgrade --key</code> + <code>zephr whoami</code>.</li>
                      <li>Docs playground: dark mode toggle, tier simulator, PRO badges on components.</li>
                    </ul>
                  </div>
                  <div className="release-category">
                    <h4>💥 Breaking changes</h4>
                    <ul className="release-list">
                      <li>Removed utility class compiler — all <code>z-*</code> classes eliminated.</li>
                      <li>Components now self-style via CSS variables only (no external utility output).</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section id="release-0-2-0" className="doc-section">
                <div className="release-header">
                  <div className="release-version-tags">
                    <Tag tone="neutral">v0.2.0</Tag>
                  </div>
                  <div className="release-meta">
                    <span className="release-date">March 2, 2026</span>
                  </div>
                </div>
                <p className="release-summary">Docs parity upgrade: API reference mode, narrative pages, and command-style search.</p>
                <div className="release-changes">
                  <div className="release-category">
                    <h4>✦ New features</h4>
                    <ul className="release-list">
                      <li>Metadata-driven API Reference mode for every component.</li>
                      <li>Setup narrative pages: Mission &amp; Vision, Team operating model.</li>
                      <li>Keyboard-driven search with up/down/enter and Cmd/Ctrl+K focus.</li>
                    </ul>
                  </div>
                  <div className="release-category">
                    <h4>⚡ Improvements</h4>
                    <ul className="release-list">
                      <li>Expanded page templates navigation with deep links and section TOC.</li>
                      <li>Component search filters flat when active, restores grouped tree when cleared.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section id="release-0-1-0" className="doc-section">
                <div className="release-header">
                  <div className="release-version-tags">
                    <Tag tone="neutral">v0.1.0</Tag>
                  </div>
                  <div className="release-meta">
                    <span className="release-date">March 1, 2026</span>
                  </div>
                </div>
                <p className="release-summary">Initial release: component previews, accent system, and AI block prompts.</p>
                <div className="release-changes">
                  <div className="release-category">
                    <h4>✦ New features</h4>
                    <ul className="release-list">
                      <li>30 components across atoms, molecules, and organisms.</li>
                      <li>4 style packs: notion, stripe, linear, framer.</li>
                      <li>Accent switcher with persistent state via sessionStorage.</li>
                      <li>AI block prompts with one-click copy for Claude, Cursor, and Codex.</li>
                      <li>Install snippets (npm / pnpm / CLI) per component.</li>
                    </ul>
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
                        <li>MCP action tools: <code>scaffold_page</code>, <code>apply_theme</code>, <code>generate_component</code>.</li>
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
                        <li>Design-to-code sync: push Figma changes to style pack tokens.</li>
                        <li>Team workspace with shared style packs.</li>
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
              <div id="setup-introduction" className="intro-hero">
                <div className="hero-mesh-decoration" aria-hidden="true">
                  <img src="/hero.svg" alt="" className="hero-mesh-svg" />
                </div>
                <div>
                  <p className="eyebrow">Design System</p>
                </div>
                <h1>Build beautiful UIs — the instant your AI does.</h1>
                <p className="lead">
                  Zephr is a complete UI component system for vibe coders. Set your accent once, drop in
                  components, and ship — with Claude Code, Cursor, Codex, or Lovable.
                </p>
                <div className="hero-actions">
                  <Button onClick={() => {
                    setTopTab("setup");
                    setView("getting-started");
                  }}>Get started</Button>
                  <Button variant="secondary" onClick={() => { setTopTab("components"); setView("component-gallery"); setMobileNavOpen(false); }}>Browse components</Button>
                </div>
              </div>

              <section id="why-zephr" className="doc-section">
                <div className="section-heading">
                  <h2>Why Zephr</h2>
                  <p>Everything your AI needs to build a production-quality UI, out of the box.</p>
                </div>
                <div className="intro-features">
                  <div className="intro-feature">
                    <strong>Zero-config install</strong>
                    <p>One package. Defaults that look great immediately. No utility-class setup or config file required.</p>
                  </div>
                  <div className="intro-feature">
                    <strong>AI-native registry</strong>
                    <p>MCP tools, <code>llms.txt</code>, and per-tool prompts let any AI agent find and use components without manual lookup.</p>
                  </div>
                  <div className="intro-feature">
                    <strong>Production style packs</strong>
                    <p>Pick notion, stripe, linear, or framer and keep every generated UI consistent across projects and tools.</p>
                  </div>
                  <div className="intro-feature">
                    <strong>No extra setup required</strong>
                    <p>Components self-style via CSS variables. Your AI writes semantic JSX props, not class strings.</p>
                  </div>
                </div>
              </section>
            </>
          ) : view === "getting-started" ? (
            <>
              <section id="overview" className="doc-section hero">
                <p className="breadcrumbs">Get Started</p>
                <h1>Set up your visual system</h1>
                <p className="lead">
                  Choose a style pack to set your design personality, then pick an accent color. Both apply across previews, snippets, and prompts.
                </p>
              </section>

              <section id="style-pack-selection" className="doc-section">
                <div className="section-heading">
                  <div className="section-heading-row">
                    <div>
                      <h2>Choose a style pack</h2>
                      <p>Pick one visual baseline for component previews and generated snippets.</p>
                    </div>
                    <Badge tone="neutral">{STYLE_PACK_META[stylePack].label}</Badge>
                  </div>
                </div>
                <div className="style-pack-grid">
                  {(Object.keys(STYLE_PACK_META) as StylePackName[]).map((pack) => (
                    <button
                      key={pack}
                      type="button"
                      className={`style-pack-card surface-style-card ${stylePack === pack ? "is-active" : ""}`}
                      onClick={() => handleStylePackChange(pack)}
                    >
                      <div className={`surface-style-preview ${pack === "notion" ? "is-flat" : ""}`}>
                        <div className="surface-style-preview-card is-large" />
                        <div className="surface-style-preview-row">
                          <div className="surface-style-preview-card" />
                          <div className="surface-style-preview-card" />
                        </div>
                      </div>
                      <div className="spc-label">
                        <div className="spc-label-row">
                          <span className="spc-name">{STYLE_PACK_META[pack].label}</span>
                          {STYLE_PACK_META[pack].tier === "pro" ? <Badge tone="neutral">Pro</Badge> : null}
                        </div>
                        <span className="spc-desc">{STYLE_PACK_META[pack].description}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              <section id="accent-selection" className="doc-section">
                <div className="section-heading">
                  <div className="section-heading-row">
                    <div>
                      <h2>Choose an accent color</h2>
                      <p>Used for primary actions, links, and focus rings. This choice persists across all pages until you change it.</p>
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
              </section>

              <section id="setup" className="doc-section">
                <div className="section-heading">
                  <h2>Install in your project</h2>
                  <p>Pick your package manager or tool below.</p>
                </div>
                <div className="setup-inner-tabs" role="tablist">
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
                      <SnippetItem beta label="Install" code={`npm install @zephrui/ui-react`} onCopy={() => copyAndFlash("Install", "npm install @zephrui/ui-react")} />
                      <p className="beta-notice">Zephr is in private beta — not yet published to npm.</p>
                      <SnippetItem label="zephr.config.ts" code={configSnippet} onCopy={() => copyAndFlash("Config", configSnippet)} />
                    </div>
                  )}
                  {setupTab === "pnpm" && (
                    <div className="snippet-stack">
                      <SnippetItem beta label="Install" code={`pnpm add @zephrui/ui-react`} onCopy={() => copyAndFlash("Install", "pnpm add @zephrui/ui-react")} />
                      <p className="beta-notice">Zephr is in private beta — not yet published to npm.</p>
                      <SnippetItem label="zephr.config.ts" code={configSnippet} onCopy={() => copyAndFlash("Config", configSnippet)} />
                    </div>
                  )}
                  {setupTab === "cli" && (
                    <div className="snippet-stack">
                      <SnippetItem label="Init" code={`npx zephr init --accent ${accentColor}`} onCopy={() => copyAndFlash("CLI", `npx zephr init --accent ${accentColor}`)} />
                      <SnippetItem label="Add a component" code={`npx zephr add button`} onCopy={() => copyAndFlash("Add", "npx zephr add button")} />
                      <p className="beta-notice">Zephr is in private beta — not yet published to npm.</p>
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
                      <p className="beta-notice">Zephr is in private beta — not yet published to npm.</p>
                      <SnippetItem
                        label={`${aiToolLabels[aiTool]} prompt`}
                        code={aiPromptSnippet}
                        onCopy={() => copyAndFlash(`${aiToolLabels[aiTool]} prompt`, aiPromptSnippet)}
                      />
                    </div>
                  )}
                </div>
                <div className="start-cta">
                  <Button onClick={() => selectComponent("button")}>Browse components</Button>
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
              <section id="foundations-overview" className="doc-section hero">
                <p className="breadcrumbs">Foundations</p>
                <h1>Design Tokens</h1>
                <p className="lead">
                  Every Zephr component is styled through CSS variables generated from design tokens.
                  These tokens define your color palette, spacing, typography, and more — with one consistent base theme and customizable accents.
                </p>
              </section>

              {/* How tokens work */}
              <section id="how-tokens-work" className="doc-section">
                <div className="section-heading">
                  <h2>How the token system works</h2>
                  <p>Three layers transform a style pack into production UI — with zero manual CSS.</p>
                </div>
                <div className="token-flow">
                  <div className="token-flow-step">
                    <div className="token-flow-icon">
                      <span className="ms" style={{ fontSize: 24 }}>grid_view</span>
                    </div>
                    <div className="token-flow-num">1</div>
                    <h3>Style Pack</h3>
                    <p>A JSON object defining every visual decision — colors, fonts, spacing, radii, shadows, motion.</p>
                  </div>
                  <div className="token-flow-arrow">→</div>
                  <div className="token-flow-step">
                    <div className="token-flow-icon">
                      <span className="ms" style={{ fontSize: 24 }}>data_object</span>
                    </div>
                    <div className="token-flow-num">2</div>
                    <h3>CSS Variables</h3>
                    <p>Tokens compile into <code>--z-color-*</code>, <code>--z-space-*</code>, <code>--z-type-*</code> variables injected at <code>:root</code>.</p>
                  </div>
                  <div className="token-flow-arrow">→</div>
                  <div className="token-flow-step">
                    <div className="token-flow-icon">
                      <span className="ms" style={{ fontSize: 24 }}>check_circle</span>
                    </div>
                    <div className="token-flow-num">3</div>
                    <h3>Components</h3>
                    <p>Every component reads CSS variables at render time. Change the pack or accent — UI updates instantly.</p>
                  </div>
                </div>
              </section>

              {/* Token naming */}
              <section id="token-naming" className="doc-section">
                <div className="section-heading">
                  <h2>Naming convention</h2>
                  <p>All tokens follow a predictable pattern: <code>--z-{'{category}'}-{'{name}'}</code></p>
                </div>
                <div className="token-naming-grid">
                  <div className="token-naming-card">
                    <code className="token-naming-prefix">--z-color-</code>
                    <span className="token-naming-desc">Semantic color roles</span>
                    <span className="token-naming-example">primary, surface, border, muted, danger</span>
                  </div>
                  <div className="token-naming-card">
                    <code className="token-naming-prefix">--z-space-</code>
                    <span className="token-naming-desc">Spacing scale</span>
                    <span className="token-naming-example">xs, sm, md, lg, xl, 2xl</span>
                  </div>
                  <div className="token-naming-card">
                    <code className="token-naming-prefix">--z-radius-</code>
                    <span className="token-naming-desc">Corner rounding</span>
                    <span className="token-naming-example">sm, md, lg, full</span>
                  </div>
                  <div className="token-naming-card">
                    <code className="token-naming-prefix">--z-shadow-</code>
                    <span className="token-naming-desc">Elevation levels</span>
                    <span className="token-naming-example">sm, md, lg</span>
                  </div>
                  <div className="token-naming-card">
                    <code className="token-naming-prefix">--z-type-</code>
                    <span className="token-naming-desc">Typography system</span>
                    <span className="token-naming-example">family-sans, size-lg, weight-bold</span>
                  </div>
                  <div className="token-naming-card">
                    <code className="token-naming-prefix">--z-motion-</code>
                    <span className="token-naming-desc">Animation timing</span>
                    <span className="token-naming-example">duration-fast, easing-default</span>
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
                    <Badge tone="info">{stylePack}</Badge>
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
                            <div className="foundation-color-swatch-split" aria-hidden="true">
                              <span style={{ background: token.light }} />
                              <span style={{ background: token.dark }} />
                            </div>
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
                              <th>Light mode</th>
                              <th>Dark mode</th>
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
                                    onClick={() => copyAndFlash(`${token.variable} light`, token.light)}
                                    title={`Copy light value ${token.light}`}
                                  >
                                    <span className="foundation-color-dot" style={{ background: token.light }} />
                                    <code>{token.light}</code>
                                  </button>
                                </td>
                                <td>
                                  <button
                                    type="button"
                                    className="foundation-color-chip"
                                    onClick={() => copyAndFlash(`${token.variable} dark`, token.dark)}
                                    title={`Copy dark value ${token.dark}`}
                                  >
                                    <span className="foundation-color-dot" style={{ background: token.dark }} />
                                    <code>{token.dark}</code>
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
                  <span className="typography-family-chip">Sans: Inter</span>
                  <span className="typography-family-chip">Monospace: Monaco</span>
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
                    <p>Shared design tokens and style packs prevent the random look and feel that plagues AI-generated UIs. One accent color, one source of truth.</p>
                    <div className="mission-pillar-tags">
                      <span>CSS variables</span>
                      <span>Style packs</span>
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
                      <p>Single API across light and dark modes with one base theme per style pack.</p>
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
                  <p>Additional metadata for runtime compatibility, accessibility, and theme support.</p>
                </div>
                <div className="api-meta-grid">
                  <article className="api-meta-card">
                    <h3>Dependencies</h3>
                    <p>{selectedEntry.dependencies.join(", ")}</p>
                  </article>
                  <article className="api-meta-card">
                    <h3>Theme Support</h3>
                    <p>Base theme ({stylePack})</p>
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
          ) : view === "templates" ? (
            <>
              <section id="templates-overview" className="doc-section hero">
                <p className="breadcrumbs">Templates</p>
                <h1>Page Templates</h1>
                <p className="lead">
                  Drop-in page templates built entirely from Zephr components. Each template is a React component you can copy, customise, and ship.
                </p>
              </section>

              {userTier !== "pro" && (
                <section className="doc-section">
                  <div className="section-heading">
                    <h2>Templates</h2>
                    <p>Unlock Pro to access all 5 page templates — production-ready layouts you can copy and ship.</p>
                  </div>
                  <div className="template-teaser-grid">
                    {[
                      { name: "Dashboard", desc: "Stats, table, activity sidebar" },
                      { name: "Auth", desc: "Sign-in / sign-up with OAuth slots" },
                      { name: "Settings", desc: "Profile, billing, team management" },
                      { name: "Onboarding", desc: "Multi-step setup wizard" },
                      { name: "Marketing", desc: "Hero, pricing, testimonials" }
                    ].map((t) => (
                      <div key={t.name} className="template-teaser-card">
                        <div className="template-teaser-preview">
                          <span className="ms template-teaser-lock">lock</span>
                        </div>
                        <div className="template-teaser-info">
                          <span className="template-teaser-name">{t.name}</span>
                          <span className="template-teaser-desc">{t.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: "1.5rem" }}>
                    <Button onClick={() => setShowUpgradeModal(true)}>Unlock Pro — access all templates</Button>
                  </div>
                </section>
              )}

              <section id="template-dashboard" className="doc-section">
                <div className="section-heading">
                  <h2>DashboardPage</h2>
                  <p>Revenue charts, project table, activity feed, and sidebar nav — ready to wire up to real data.</p>
                </div>
                <TemplateBrowserFrame address="zephr.local/templates/dashboard" minHeight="620px">
                  <div style={{ transform: "scale(0.65)", transformOrigin: "top left", width: "153.85%", height: "960px", overflow: "hidden", pointerEvents: "none" }}>
                    <DashboardPage />
                  </div>
                </TemplateBrowserFrame>
                <div style={{ marginTop: "1rem" }}>
                  <SnippetItem
                    label="Usage"
                    code={`import { DashboardPage } from '@zephrui/ui-react';

<DashboardPage
  title="Analytics"
  onNewItem={() => {}}
/>`}
                    onCopy={() => copyAndFlash("DashboardPage", `import { DashboardPage } from '@zephrui/ui-react';

<DashboardPage title="Analytics" onNewItem={() => {}} />`)}
                  />
                </div>
              </section>

              <section id="template-auth" className="doc-section">
                <div className="section-heading">
                  <h2>AuthPage</h2>
                  <p>Centered sign-in / sign-up form with OAuth provider slots, error handling, and mode switching.</p>
                </div>
                <TemplateBrowserFrame address="zephr.local/templates/auth" minHeight="560px">
                  <div style={{ transform: "scale(0.74)", transformOrigin: "top left", width: "135.14%", height: "760px", overflow: "hidden", pointerEvents: "none" }}>
                    <AuthPage />
                  </div>
                </TemplateBrowserFrame>
                <div style={{ marginTop: "1rem" }}>
                  <SnippetItem
                    label="Usage"
                    code={`import { AuthPage } from '@zephrui/ui-react';

<AuthPage
  mode="sign-in"
  onSubmit={async (email, password) => {
    await signIn(email, password);
  }}
  onModeSwitch={() => setMode('sign-up')}
/>`}
                    onCopy={() => copyAndFlash("AuthPage", `import { AuthPage } from '@zephrui/ui-react';

<AuthPage mode="sign-in" onSubmit={signIn} />`)}
                  />
                </div>
              </section>

              <section id="template-settings" className="doc-section">
                <div className="section-heading">
                  <h2>SettingsPage</h2>
                  <p>Tabbed settings layout with Profile (pending/success states), Notifications, and Danger Zone built in.</p>
                </div>
                <TemplateBrowserFrame address="zephr.local/templates/settings" minHeight="560px">
                  <div style={{ transform: "scale(0.62)", transformOrigin: "top left", width: "161.3%", height: "900px", overflow: "hidden", pointerEvents: "none" }}>
                    <SettingsPage />
                  </div>
                </TemplateBrowserFrame>
                <div style={{ marginTop: "1rem" }}>
                  <SnippetItem
                    label="Usage"
                    code={`import { SettingsPage } from '@zephrui/ui-react';

<SettingsPage
  title="Account Settings"
  subtitle="Manage your preferences"
/>`}
                    onCopy={() => copyAndFlash("SettingsPage", `import { SettingsPage } from '@zephrui/ui-react';

<SettingsPage title="Account Settings" />`)}
                  />
                </div>
              </section>

              <section id="template-onboarding" className="doc-section">
                <div className="section-heading">
                  <h2>OnboardingPage</h2>
                  <p>Step-by-step wizard with animated progress bar, back / next navigation, and customisable step content.</p>
                </div>
                <TemplateBrowserFrame address="zephr.local/templates/onboarding" minHeight="560px">
                  <div style={{ transform: "scale(0.74)", transformOrigin: "top left", width: "135.14%", height: "760px", overflow: "hidden", pointerEvents: "none" }}>
                    <OnboardingPage />
                  </div>
                </TemplateBrowserFrame>
                <div style={{ marginTop: "1rem" }}>
                  <SnippetItem
                    label="Usage"
                    code={`import { OnboardingPage } from '@zephrui/ui-react';

<OnboardingPage
  steps={mySteps}
  onComplete={() => router.push('/dashboard')}
/>`}
                    onCopy={() => copyAndFlash("OnboardingPage", `import { OnboardingPage } from '@zephrui/ui-react';

<OnboardingPage steps={mySteps} onComplete={onDone} />`)}
                  />
                </div>
              </section>

              <section id="template-marketing" className="doc-section">
                <div className="section-heading">
                  <h2>MarketingPage</h2>
                  <p>Landing page with hero, feature grid, social proof, pricing cards, and bottom CTA.</p>
                </div>
                <TemplateBrowserFrame address="zephr.local/templates/marketing" minHeight="680px">
                  <div style={{ transform: "scale(0.65)", transformOrigin: "top left", width: "153.85%", height: "1046px", overflow: "hidden", pointerEvents: "none" }}>
                    <MarketingPage />
                  </div>
                </TemplateBrowserFrame>
                <div style={{ marginTop: "1rem" }}>
                  <SnippetItem
                    label="Usage"
                    code={`import { MarketingPage } from '@zephrui/ui-react';

<MarketingPage
  heroTitle="Ship faster with Zephr"
  heroSubtitle="The AI-native component system"
  onCtaClick={() => router.push('/signup')}
/>`}
                    onCopy={() => copyAndFlash("MarketingPage", `import { MarketingPage } from '@zephrui/ui-react';

<MarketingPage heroTitle="Ship faster" onCtaClick={onSignup} />`)}
                  />
                </div>
              </section>
            </>
          ) : view === "component-gallery" ? (
            <>
              <section id="gallery-overview" className="doc-section hero">
                <p className="breadcrumbs">Components</p>
                <h1>Component Library</h1>
                <p className="lead">
                  {registry.filter(e => e.tier === "free").length} free components and {registry.filter(e => e.tier === "pro").length} Pro components across atoms, molecules, and organisms.
                </p>
              </section>
              {(["atom", "molecule", "organism"] as const).map((cat) => {
                const entries = registry.filter((e) => e.category === cat);
                if (!entries.length) return null;
                const catLabel = cat === "atom" ? "Atoms" : cat === "molecule" ? "Molecules" : "Organisms";
                return (
                  <section key={cat} className="doc-section">
                    <div className="section-heading">
                      <h2>{catLabel}</h2>
                      <p>{cat === "atom" ? "Foundation-level primitives — buttons, inputs, badges, and more." : cat === "molecule" ? "Composed patterns built from atoms." : "Full sections and complex UI patterns."}</p>
                    </div>
                    <div className="gallery-grid">
                      {entries.map((entry) => (
                        <button
                          key={entry.id}
                          type="button"
                          className={`gallery-card ${entry.tier === "pro" && userTier === "free" ? "is-locked" : ""}`}
                          onClick={() => selectComponent(entry.id)}
                        >
                          <div className="gallery-card-preview">
                            <ComponentThumbnail name={entry.name} />
                          </div>
                          <div className="gallery-card-info">
                            <span className="gallery-card-name">{entry.name}</span>
                            {entry.tier === "pro" && (
                              <span className={`pill-badge ${userTier === "pro" ? "" : "is-locked"}`}>PRO</span>
                            )}
                          </div>
                          <p className="gallery-card-desc">{entry.description}</p>
                        </button>
                      ))}
                    </div>
                  </section>
                );
              })}
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
                <div className="hero-actions">
                  <Button onClick={() => copyAndFlash("AI block prompt", blockPrompt)}>
                    Copy AI Prompt
                  </Button>
                  <Button variant="secondary" onClick={() => copyAndFlash("Install command", installCommand)}>
                    Copy Install
                  </Button>
                </div>
              </section>

              {selectedEntry.tier === "pro" && userTier === "free" && (
                <div className="upgrade-inline-banner">
                  <div className="upgrade-inline-content">
                    <span className="upgrade-inline-badge">PRO</span>
                    <div>
                      <strong>{selectedEntry.name}</strong> is a Pro component.
                      Unlock all Pro molecules, organisms, and page templates.
                    </div>
                  </div>
                  <Button size="sm" onClick={() => setShowUpgradeModal(true)}>Unlock Pro</Button>
                </div>
              )}

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

              <section id="preview" className="doc-section">
                <div className="section-heading">
                  <div className="section-heading-row">
                    <div>
                      <h2>Live preview</h2>
                      <p>Interactive canvas with selectable states. Switch to Code for a copy-ready snippet.</p>
                    </div>
                    {/* Preview / Code tab toggle */}
                    <div className="pcb-toolbar" style={{ border: "1px solid var(--line)", borderRadius: 8, padding: "3px", background: "var(--z-color-background100)", gap: 2 }}>
                      <button
                        type="button"
                        className={`pcb-tab${componentDetailTab === "preview" ? " active" : ""}`}
                        onClick={() => setComponentDetailTab("preview")}
                        style={{ padding: "4px 12px" }}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                        </svg>
                        Preview
                      </button>
                      <button
                        type="button"
                        className={`pcb-tab${componentDetailTab === "code" ? " active" : ""}`}
                        onClick={() => setComponentDetailTab("code")}
                        style={{ padding: "4px 12px" }}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
                        </svg>
                        Code
                      </button>
                    </div>
                  </div>
                </div>

                {componentDetailTab === "code" ? (
                  <div className="pcb-root">
                    <div className="pcb-toolbar" style={{ justifyContent: "flex-end" }}>
                      <button type="button" className="pcb-copy" onClick={() => copyAndFlash("Usage snippet", usageSnippet)}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                        </svg>
                        Copy
                      </button>
                    </div>
                    <pre className="pcb-code-area">{usageSnippet}</pre>
                  </div>
                ) : (
                  <>
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
                      toolbar={selectedEntry.id === "button" ? (
                        <div className="variant-filters">
                          <label className="variant-filter-dropdown">
                            <span>Type</span>
                            <select value={btnFilterType} onChange={(e) => setBtnFilterType(e.target.value as typeof btnFilterType)}>
                              <option value="all">All</option>
                              <option value="primary">Primary</option>
                              <option value="secondary">Secondary</option>
                              <option value="ghost">Ghost</option>
                              <option value="danger">Danger</option>
                            </select>
                          </label>
                          <label className="variant-filter-dropdown">
                            <span>Size</span>
                            <select value={btnFilterSize} onChange={(e) => setBtnFilterSize(e.target.value as typeof btnFilterSize)}>
                              <option value="all">All</option>
                              <option value="sm">Small</option>
                              <option value="md">Medium</option>
                              <option value="lg">Large</option>
                            </select>
                          </label>
                          <label className="variant-filter-dropdown">
                            <span>State</span>
                            <select value={btnFilterState} onChange={(e) => setBtnFilterState(e.target.value as typeof btnFilterState)}>
                              <option value="all">All</option>
                              <option value="default">Default</option>
                              <option value="hover">Hover</option>
                              <option value="pressed">Pressed</option>
                              <option value="loading">Loading</option>
                              <option value="disabled">Disabled</option>
                            </select>
                          </label>
                          <label className="variant-toggle">
                            <span className="variant-toggle-track" data-on={btnOnlyIcon || undefined} onClick={() => setBtnOnlyIcon(!btnOnlyIcon)} role="switch" aria-checked={btnOnlyIcon} tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setBtnOnlyIcon(!btnOnlyIcon); } }}>
                              <span className="variant-toggle-thumb" />
                            </span>
                            <span>Only Icon</span>
                          </label>
                        </div>
                      ) : selectedEntry.id === "button-group" ? (
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
                  </>
                )}
              </section>

              <section id="ai-reference" className="doc-section">
                <div className="section-heading">
                  <h2>AI Block Reference</h2>
                  <p>Paste this prompt into your vibe coding platform — the component inserts with your current accent and token settings.</p>
                </div>

                <label className="field">
                  <span>Your goal</span>
                  <Textarea
                    value={intentText}
                    onChange={(event) => setIntentText(event.target.value)}
                    rows={4}
                  />
                </label>

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
              </section>

              <section id="integration" className="doc-section">
                <div className="section-heading">
                  <h2>Install and use</h2>
                  <p>Install the following dependencies:</p>
                </div>

                <div className="snippet-stack">
                  <InstallTabBlock
                    packageName="@zephrui/ui-react"
                    onCopy={(cmd) => copyAndFlash("Install command", cmd)}
                    beta
                  />
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
                  <SnippetItem
                    label="zephr.config.ts"
                    code={configSnippet}
                    onCopy={() => copyAndFlash("Config snippet", configSnippet)}
                  />
                </div>
              </section>
            </>
          )}
        </main>

        <aside className="right-rail">
          <span className="rail-title">On this page</span>
          {topTab === "changelog" && (
            <>
              <a className="toc-link" href="#changelog-overview">Overview</a>
              <a className="toc-link" href="#release-0-4-0">
                <span className="changelog-version-tags">
                  <Tag tone="neutral">v0.4.0</Tag>
                  <Tag tone="info">Latest</Tag>
                </span>
              </a>
              <a className="toc-link" href="#release-0-3-0"><Tag tone="neutral">v0.3.0</Tag></a>
              <a className="toc-link" href="#release-0-2-0"><Tag tone="neutral">v0.2.0</Tag></a>
              <a className="toc-link" href="#release-0-1-0"><Tag tone="neutral">v0.1.0</Tag></a>
              <a className="toc-link" href="#migrations-overview">Migrations</a>
              <a className="toc-link" href="#release-upcoming">Roadmap</a>
            </>
          )}
          {topTab !== "changelog" && view === "introduction" && (
            <>
              <a className="toc-link" href="#setup-introduction">Overview</a>
              <a className="toc-link" href="#why-zephr">Why Zephr</a>
            </>
          )}
          {topTab !== "changelog" && view === "getting-started" && (
            <>
              <a className="toc-link" href="#overview">Overview</a>
              <a className="toc-link" href="#accent-selection">Accent color</a>
              <a className="toc-link" href="#setup">Install</a>
            </>
          )}
          {topTab !== "changelog" && view === "speed-insights" && (
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
          {topTab !== "changelog" && view === "foundations" && (
            <>
              <a className="toc-link" href="#foundations-overview">Overview</a>
              <a className="toc-link" href="#color-palette">Color palette</a>
              <a className="toc-link" href="#token-variables">Token variables</a>
              <a className="toc-link" href="#typography">Typography</a>
            </>
          )}
          {topTab !== "changelog" && view === "mission" && (
            <>
              <a className="toc-link" href="#mission-overview">Overview</a>
              <a className="toc-link" href="#mission-pillars">Mission pillars</a>
              <a className="toc-link" href="#vision-principles">Vision</a>
            </>
          )}
          {topTab !== "changelog" && view === "team" && (
            <>
              <a className="toc-link" href="#team-overview">Overview</a>
              <a className="toc-link" href="#team-directory">Core team</a>
              <a className="toc-link" href="#team-process">How we ship</a>
            </>
          )}
          {topTab !== "changelog" && view === "templates" && (
            <>
              <a className="toc-link" href="#templates-overview">Overview</a>
              <a className="toc-link" href="#template-dashboard">Dashboard</a>
              <a className="toc-link" href="#template-auth">Auth</a>
              <a className="toc-link" href="#template-settings">Settings</a>
              <a className="toc-link" href="#template-onboarding">Onboarding</a>
              <a className="toc-link" href="#template-marketing">Marketing</a>
            </>
          )}
          {topTab !== "changelog" && view === "component-gallery" && (
            <>
              <a className="toc-link" href="#gallery-overview">Overview</a>
            </>
          )}
          {topTab !== "changelog" && view === "components" && (
            <>
              <a className="toc-link" href="#overview">Overview</a>
              {isAssetLibraryComponent ? <a className="toc-link" href="#cloud-assets">Cloud asset sync</a> : null}
              <a className="toc-link" href="#preview">Live preview</a>
              <a className="toc-link" href="#ai-reference">AI reference</a>
              <a className="toc-link" href="#integration">Install and use</a>
            </>
          )}
          {topTab !== "changelog" && view === "api-reference" && (
            <>
              <a className="toc-link" href="#api-overview">Overview</a>
              <a className="toc-link" href="#api-props">Props</a>
              <a className="toc-link" href="#api-examples">Registry schema</a>
              <a className="toc-link" href="#api-contract">Contract notes</a>
            </>
          )}
        </aside>
      </div >

      {
        showUpgradeModal && (
          <LicenseKeyModal
            licenseKey={licenseKey}
            plans={checkoutPlans}
            onSubmit={async (key) => {
              const validationClient = new ZephrCloudClient({
                baseUrl: cloudBaseUrl
              });
              let result: Awaited<ReturnType<ZephrCloudClient["validateLicense"]>>;
              try {
                result = await validationClient.validateLicense({ licenseKey: key });
              } catch (error) {
                const message = error instanceof Error ? error.message : String(error);
                throw new Error(
                  message.toLowerCase().includes("failed to fetch")
                    ? `License service unavailable at ${cloudBaseUrl}. Start @zephrui/cloud-api and retry.`
                    : message
                );
              }
              if (!result.valid || result.tier !== "pro") {
                throw new Error(result.message || "Invalid license key.");
              }

              setLicenseKey(key);
              setUserTier("pro");
              sessionStorage.setItem("zephr-license-key", key);
              setShowUpgradeModal(false);
              showToast(result.message || "Pro access enabled");
            }}
            onGetKey={(planId) => {
              const plan = checkoutPlans.find((entry) => entry.id === planId);
              if (!plan?.checkoutUrl) {
                showToast(
                  "Set VITE_ZEPHR_CHECKOUT_INDIVIDUAL / STARTUP / ENTERPRISE or configure cloud plan checkout links."
                );
                return;
              }

              window.open(plan.checkoutUrl, "_blank", "noopener,noreferrer");
              showToast(`Opening ${plan.label} checkout...`);
            }}
            onRemove={() => {
              setLicenseKey("");
              setUserTier("free");
              sessionStorage.removeItem("zephr-license-key");
              setShowUpgradeModal(false);
            }}
            onClose={() => setShowUpgradeModal(false)}
          />
        )
      }
    </div >
  );
}
