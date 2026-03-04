import { FormEvent, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import {
  Accordion,
  Alert,
  Avatar,
  Badge,
  Breadcrumbs,
  Button,
  Checkbox,
  CommandBar,
  DataTable,
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
  Radio,
  SearchBox,
  SearchResultsPanel,
  Select,
  SidebarNav,
  Switch,
  Tabs,
  Toast,
  Textarea,
  DashboardPage,
  AuthPage,
  SettingsPage,
  OnboardingPage,
  MarketingPage,
  IconLibrary,
  AvatarLibrary,
  LogoLibrary
} from "@zephyr/ui-react";
import {
  generateCssVariables,
  resolveConfig,
  stylePacks,
  type StylePackName
} from "@zephyr/core/browser";
import {
  generateComponentPrompt,
  getComponentPropsTable,
  getComponentTemplate,
  getDefaultIntent,
  type RegistryEntry
} from "@zephyr/ai-registry";
import registryData from "@zephyr/ai-registry/registry/components.json";
import { LiveCodeEditor } from "./LiveCodeEditor";
import { ZephyrCloudClient } from "@zephyr/cloud-sdk";
import type { UrlAuditReport, UrlAuditSeverity } from "@zephyr/cloud-sdk";
import type { AvatarStyleDefinition } from "@zephyr/avatars";
import type { MaterialIconDefinition, MaterialIconStyle } from "@zephyr/icons-material";
import type { LogoCatalogEntry } from "@zephyr/logos";
import { createLocalAuditReport } from "./auditLite";
import zephyrLogoDark from "../../../logo/zephyr-dark.png";
import zephyrLogoLight from "../../../logo/zephyr-light.png";

const THEME_STYLE_ID = "zephyr-docs-playground-theme";
const registry = registryData as unknown as RegistryEntry[];
const DEFAULT_STYLE_PACK: StylePackName = "Clarity";

const STYLE_PACK_META: Record<StylePackName, { label: string; description: string; free: boolean }> = {
  Studio: { label: "Studio", description: "Neutral gray base with warm orange accents. The reliable all-rounder.", free: true },
  Editorial: { label: "Editorial", description: "Warm cream tones with serif type. For publishing and content.", free: false },
  NeoBrutal: { label: "NeoBrutal", description: "Bold yellow, black borders, red highlights. Statement-making.", free: false },
  SoftTech: { label: "SoftTech", description: "Blue-tinted surfaces with cyan accents. Clean and modern SaaS.", free: false },
  Enterprise: { label: "Enterprise", description: "Conservative teal on near-white. Compliance-grade polish.", free: false },
  Clarity: { label: "Clarity", description: "Inter font, larger radii, refined shadows. The default.", free: true }
};

type WorkspaceView =
  "introduction" |
  "getting-started" |
  "foundations" |
  "mission" |
  "team" |
  "audit" |
  "components" |
  "api-reference" |
  "templates";
type TopTab = "setup" | "audit" | "components" | "pages" | "changelog";

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

function severityBadgeTone(severity: UrlAuditSeverity): "danger" | "warning" | "neutral" {
  if (severity === "high") return "danger";
  if (severity === "medium") return "warning";
  return "neutral";
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
    return ".cursor/rules/zephyr.mdc";
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

function defaultAccentForPack(stylePack: StylePackName): string {
  return stylePacks[stylePack]?.color.primary ?? "#121212";
}

function migrateLegacyAccent(stylePack: StylePackName, accentColor: string | null): string {
  const defaultAccent = defaultAccentForPack(stylePack);
  if (!accentColor) {
    return defaultAccent;
  }

  const legacyDefaults: Partial<Record<StylePackName, string[]>> = {
    Studio: ["#2563eb"],
    Clarity: ["#335cff", "#4d75ff"]
  };

  if ((legacyDefaults[stylePack] ?? []).includes(accentColor)) {
    return defaultAccent;
  }

  return accentColor;
}

function themeCss(stylePack: StylePackName, accentColor: string): string {
  const contrast = accentTextColor(accentColor);
  const resolved = resolveConfig({
    stylePack,
    prefix: "z",
    tokens: {
      color: {
        primary: accentColor,
        accent: accentColor,
        primaryContrast: contrast
      },
      shadow: {
        none: "none",
        sm: "none",
        md: "none",
        lg: "none"
      }
    }
  });

  return generateCssVariables(resolved.tokens, resolved.prefix);
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
  const storedPack = sessionStorage.getItem("zephyr-style-pack") as StylePackName | null;
  const stylePack: StylePackName = storedPack && stylePacks[storedPack] ? storedPack : DEFAULT_STYLE_PACK;
  const storedAccent = normalizeHexColor(sessionStorage.getItem("zephyr-accent-color"));
  const accentColor = migrateLegacyAccent(
    stylePack,
    normalizeHexColor(params.get("accent")) ?? storedAccent
  );
  const viewParam = params.get("view");
  const view: WorkspaceView =
    viewParam === "components" ? "components" :
      viewParam === "api-reference" ? "api-reference" :
        viewParam === "getting-started" ? "getting-started" :
          viewParam === "foundations" ? "foundations" :
            viewParam === "mission" ? "mission" :
              viewParam === "team" ? "team" :
                viewParam === "audit" ? "audit" :
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
  currentPack?: StylePackName
): void {
  if (typeof window === "undefined") {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  params.delete("theme");
  params.set("component", componentId);
  if (accentColor === defaultAccentForPack(currentPack ?? DEFAULT_STYLE_PACK)) {
    params.delete("accent");
  } else {
    params.set("accent", accentColor);
  }
  params.set("view", view);

  const next = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState({}, "", next);
}

function getTopTabForView(view: WorkspaceView): TopTab {
  if (view === "audit") return "audit";
  if (view === "templates") return "pages";
  if (view === "components" || view === "api-reference") return "components";
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
  btnFilterType,
  btnFilterSize,
  btnFilterState,
  btnOnlyIcon,
  zephyrLogoSrc,
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
  btnFilterType: "all" | "primary" | "secondary" | "ghost" | "danger";
  btnFilterSize: "all" | "sm" | "md" | "lg";
  btnFilterState: "all" | "default" | "hover" | "pressed" | "loading" | "disabled";
  btnOnlyIcon: boolean;
  zephyrLogoSrc: string;
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
  const [switchChecked, setSwitchChecked] = useState(true);
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
              defaultValue={previewState === "filled" ? "hello@zephyr.design" : ""}
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
    return (
      <div className="preview-stack">
        <p>Switch block</p>
        <Switch checked={switchChecked} onChange={setSwitchChecked} label="Enable beta features" />
        <p className="preview-note">{switchChecked ? "Beta features are enabled." : "Beta features are disabled."}</p>
      </div>
    );
  }

  if (entry.id === "badge") {
    return (
      <div className="preview-stack">
        <p>Status badge block</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          <Badge tone="neutral">Draft</Badge>
          <Badge tone="info">Live</Badge>
          <Badge tone="success">Synced</Badge>
          <Badge tone="danger">Blocked</Badge>
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
          <img src={zephyrLogoSrc} alt="Zephyr logo" style={{ height: 28, width: "auto" }} />
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

  if (entry.id === "accordion") {
    const firstOpen = previewState === "open";
    const secondOpen = previewState === "filled";
    const defaultOpenIds =
      firstOpen ? ["1"] :
        secondOpen ? ["2"] :
          [];
    return (
      <div className="preview-stack">
        <p>Accordion block</p>
        <Accordion
          key={previewState}
          defaultOpenIds={defaultOpenIds}
          items={[
            {
              id: "1",
              title: "What is Zephyr?",
              description:
                "Zephyr provides a plug-and-play component system for AI-assisted product building.",
              content: (
                <p className="preview-note">
                  Use this pattern for FAQs, setup docs, and progressive disclosure.
                </p>
              ),
              defaultOpen: firstOpen
            },
            {
              id: "2",
              title: "Can I change accent later?",
              description: "Yes, your selected accent and components stay consistent across pages."
            },
            {
              id: "3",
              title: "Can I use it without cloud APIs?",
              description: "Yes. Local packages work without an API key."
            }
          ]}
        />
      </div>
    );
  }

  if (entry.id === "alert") {
    const status = previewState === "success" ? "success" : previewState === "warning" ? "warning" : previewState === "error" ? "error" : "info";
    return (
      <div className="preview-stack">
        <p>Alert block</p>
        <Alert
          status={status}
          variant={status === "error" ? "filled" : status === "success" ? "light" : "stroke"}
          title={
            status === "error"
              ? "Deployment failed. Please review build logs."
              : status === "success"
                ? "Theme synced successfully."
                : status === "warning"
                  ? "API usage nearing current quota."
                  : "New registry schema available."
          }
          actionLabel={status === "success" ? undefined : status === "warning" ? "Upgrade" : "View details"}
          dismissible={status !== "error"}
        />
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
        <Pagination page={page} totalPages={12} onPageChange={setPage} />
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
          brand={<strong>Zephyr</strong>}
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
              brand={<strong>Zephyr</strong>}
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
              description: "Update semantic aliases for Studio and SoftTech packs.",
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
          description="This is Zephyr modal preview in the current theme."
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

function BrowserPreviewFrame({
  children,
  address = "preview.zephyr.local",
  minHeight,
  toolbar
}: {
  children: ReactNode;
  address?: string;
  minHeight?: string;
  toolbar?: ReactNode;
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
      {toolbar && <div className="preview-toolbar-zone">{toolbar}</div>}
      <div className="preview-canvas" style={minHeight ? { minHeight } : undefined}>
        {children}
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
          {beta && <span className="snippet-beta-badge">Private Beta</span>}
          <button type="button" className="snippet-item-copy" onClick={onCopy}>Copy</button>
        </div>
      </div>
      <pre>{code}</pre>
    </div>
  );
}

function LicenseKeyModal({
  licenseKey,
  onSubmit,
  onGetKey,
  onRemove,
  onClose
}: {
  licenseKey: string;
  onSubmit: (key: string) => Promise<void> | void;
  onGetKey: () => void;
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
      aria-label="Zephyr Pro license key"
    >
      <div className="upgrade-modal" onClick={(e) => e.stopPropagation()}>
        <div className="upgrade-modal-header">
          <span>Zephyr Pro</span>
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
              <input
                className="upgrade-modal-input"
                type="text"
                value={draft}
                onChange={(e) => { setDraft(e.target.value); setError(""); }}
                placeholder="zephyr-xxxxxxxxxxxxxxxx"
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
                <Button type="button" size="sm" variant="secondary" onClick={onGetKey} disabled={isSubmitting}>
                  Get a key
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Style Pack Card ---------- */
function StylePackCard({
  packName,
  isActive,
  isLocked,
  onClick
}: {
  packName: StylePackName;
  isActive: boolean;
  isLocked: boolean;
  onClick: () => void;
}) {
  const meta = STYLE_PACK_META[packName];
  const tokens = stylePacks[packName];
  const c = tokens.color;
  const r = tokens.radius;
  const font = tokens.type.family.sans;

  // NeoBrutal has thicker, blacker borders
  const borderW = packName === "NeoBrutal" ? "2px" : "1px";
  const cardRadius = r.lg;

  return (
    <button
      type="button"
      className={`style-pack-card${isActive ? " is-active" : ""}${isLocked ? " is-locked" : ""}`}
      onClick={onClick}
      aria-pressed={isActive}
      style={{
        "--spc-bg": c.background,
        "--spc-surface": c.surface,
        "--spc-text": c.text,
        "--spc-muted": c.muted,
        "--spc-primary": c.primary,
        "--spc-border": c.border,
        "--spc-radius": cardRadius,
        "--spc-border-w": borderW,
        "--spc-font": font,
        "--spc-accent": c.accent ?? c.primary,
        "--spc-success": c.success,
        "--spc-danger": c.danger
      } as React.CSSProperties}
    >
      {/* Mini-app mockup using actual pack tokens */}
      <div className="spc-mockup">
        {/* Sidebar */}
        <div className="spc-sidebar">
          <div className="spc-sidebar-logo" />
          <div className="spc-sidebar-items">
            <div className="spc-sidebar-item is-active" />
            <div className="spc-sidebar-item" />
            <div className="spc-sidebar-item" />
            <div className="spc-sidebar-item" />
          </div>
        </div>
        {/* Main area */}
        <div className="spc-main">
          {/* Header bar */}
          <div className="spc-header">
            <div className="spc-header-title" />
            <div className="spc-header-actions">
              <div className="spc-header-btn" />
              <div className="spc-header-avatar" />
            </div>
          </div>
          {/* Stat cards row */}
          <div className="spc-stats">
            <div className="spc-stat">
              <div className="spc-stat-label" />
              <div className="spc-stat-value" />
              <div className="spc-stat-bar" />
            </div>
            <div className="spc-stat">
              <div className="spc-stat-label" />
              <div className="spc-stat-value" />
              <div className="spc-stat-bar" style={{ width: "60%" }} />
            </div>
            <div className="spc-stat">
              <div className="spc-stat-label" />
              <div className="spc-stat-value" />
              <div className="spc-stat-bar" style={{ width: "85%" }} />
            </div>
          </div>
          {/* Table rows */}
          <div className="spc-table">
            <div className="spc-table-header" />
            <div className="spc-table-row" />
            <div className="spc-table-row" />
            <div className="spc-table-row" />
          </div>
        </div>
      </div>
      {/* Lock overlay for PRO packs on free tier */}
      {isLocked && (
        <div className="spc-lock-overlay">
          <span className="ms" style={{ fontSize: 16 }}>lock</span>
          <span>Upgrade to Pro</span>
        </div>
      )}
      {/* Color palette strip */}
      <div className="spc-palette">
        <span className="spc-swatch" style={{ background: c.primary }} />
        <span className="spc-swatch" style={{ background: c.accent ?? c.primary }} />
        <span className="spc-swatch" style={{ background: c.success }} />
        <span className="spc-swatch" style={{ background: c.danger }} />
        <span className="spc-swatch" style={{ background: c.border }} />
      </div>
      {/* Label area */}
      <div className="spc-label">
        <div className="spc-label-row">
          <span className="spc-name">{meta.label}</span>
          {!meta.free && <span className="spc-pro-badge">PRO</span>}
        </div>
        <span className="spc-desc">{meta.description}</span>
      </div>
    </button>
  );
}

export default function App() {
  const initial = fromSearchParams();

  const [stylePack, setStylePack] = useState<StylePackName>(initial.stylePack);
  const [accentColor, setAccentColor] = useState(initial.accentColor);
  const [accentDraft, setAccentDraft] = useState(initial.accentColor);
  const [accentPopoverOpen, setAccentPopoverOpen] = useState(false);
  const accentPopoverRef = useRef<HTMLDivElement>(null);
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
  const [aiPackageManager, setAiPackageManager] = useState<AiPackageManager>("npm");

  const [cloudApiKey, setCloudApiKey] = useState<string>(() =>
    typeof window !== "undefined" ? sessionStorage.getItem("zephyr-cloud-api-key") ?? "" : ""
  );
  const [cloudApiKeyDraft, setCloudApiKeyDraft] = useState<string>(() =>
    typeof window !== "undefined" ? sessionStorage.getItem("zephyr-cloud-api-key") ?? "" : ""
  );
  const [iconQuery, setIconQuery] = useState("settings");
  const [iconStyleVariant, setIconStyleVariant] = useState<MaterialIconStyle>("filled");
  const [avatarQuery, setAvatarQuery] = useState("");
  const [avatarSeed, setAvatarSeed] = useState("zephyr");
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
  const [auditUrl, setAuditUrl] = useState("https://example.com");
  const [auditScreenshotUrl, setAuditScreenshotUrl] = useState("");
  const [auditNotes, setAuditNotes] = useState("");
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditError, setAuditError] = useState("");
  const [auditReport, setAuditReport] = useState<UrlAuditReport | null>(null);


  const [intentText, setIntentText] = useState(() => getDefaultIntent(initial.componentId));

  const [buttonLabel, setButtonLabel] = useState("Launch Campaign");
  const [buttonVariant, setButtonVariant] = useState<"primary" | "secondary" | "ghost" | "danger">(
    "primary"
  );
  const [buttonSize, setButtonSize] = useState<"sm" | "md" | "lg">("md");
  const [previewState, setPreviewState] = useState<PreviewStateKey>("default");

  // Button variant grid filters
  const [btnFilterType, setBtnFilterType] = useState<"all" | "primary" | "secondary" | "ghost" | "danger">("all");
  const [btnFilterSize, setBtnFilterSize] = useState<"all" | "sm" | "md" | "lg">("all");
  const [btnFilterState, setBtnFilterState] = useState<"all" | "default" | "hover" | "pressed" | "loading" | "disabled">("all");
  const [btnOnlyIcon, setBtnOnlyIcon] = useState(false);

  const [toastMessage, setToastMessage] = useState("");
  const toastTimeoutRef = useRef<number | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [licenseKey, setLicenseKey] = useState<string>(() =>
    typeof window !== "undefined" ? sessionStorage.getItem("zephyr-license-key") ?? "" : ""
  );
  const [userTier, setUserTier] = useState<"free" | "pro">(() =>
    typeof window !== "undefined" && sessionStorage.getItem("zephyr-license-key") ? "pro" : "free"
  );
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const searchPanelRef = useRef<HTMLDivElement | null>(null);

  const compiledCss = useMemo(() => themeCss(stylePack, accentColor), [accentColor, stylePack]);
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
  const cloudBaseUrl = (import.meta.env.VITE_ZEPHYR_CLOUD_URL as string | undefined)?.trim() || "http://localhost:8787";
  const cloudClient = useMemo(() => {
    const key = cloudApiKey.trim();
    if (!key) {
      return null;
    }
    return new ZephyrCloudClient({
      baseUrl: cloudBaseUrl,
      apiKey: key
    });
  }, [cloudApiKey, cloudBaseUrl]);

  const aiProjectInitCommand = useMemo(
    () => managerProjectInitCommand(aiProject, aiPackageManager),
    [aiPackageManager, aiProject]
  );
  const aiInstallCommand = useMemo(
    () => managerInstallCommand(aiPackageManager, ["@zephyr/ui-react"]),
    [aiPackageManager]
  );
  const aiCloudInstallCommand = useMemo(
    () => managerInstallCommand(aiPackageManager, ["@zephyr/cloud-sdk"]),
    [aiPackageManager]
  );
  const aiContextPath = useMemo(() => aiContextFile(aiTool), [aiTool]);
  const aiContextSnippet = useMemo(() => {
    const assistantLabel = aiToolLabels[aiTool];
    return [
      `# ${assistantLabel} workspace instructions`,
      "",
      "- Use Zephyr UI components from `@zephyr/ui-react`.",
      `- Base theme: ${stylePack} (fixed).`,
      `- Accent color: ${accentColor}.`,
      "- Prefer semantic component props over one-off style overrides.",
      "- Keep accessibility labels for icon-only and form controls."
    ].join("\n");
  }, [accentColor, aiTool, stylePack]);
  const aiPromptSnippet = useMemo(() => {
    const assistantLabel = aiToolLabels[aiTool];
    return [
      `Set up Zephyr UI in this ${aiProjectLabels[aiProject]} project.`,
      `Assistant target: ${assistantLabel}`,
      "",
      "Steps:",
      `1. Create app: ${aiProjectInitCommand}`,
      `2. Install Zephyr: ${aiInstallCommand}`,
      "3. Import components from `@zephyr/ui-react`.",
      `4. Set accent to "${accentColor}" (base theme is "${stylePack}").`,
      "5. Keep generated code accessible and production-ready."
    ].join("\n");
  }, [accentColor, aiInstallCommand, aiProject, aiProjectInitCommand, aiTool, stylePack]);

  useEffect(() => {
    let styleTag = document.getElementById(THEME_STYLE_ID) as HTMLStyleElement | null;
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = THEME_STYLE_ID;
      document.head.appendChild(styleTag);
    }
    // Scope Zephyr theme tokens to .preview-canvas only.
    // This keeps docs chrome (nav, sidebar buttons) visually stable when
    // the user adjusts the accent color — the accent only controls what goes
    // into their generated config/code, and the live component previews.
    const scoped = compiledCss
      // :root { --z-... }  →  .preview-canvas { --z-... }
      .replace(/:root\s*\{/g, ".preview-canvas {")
      // [data-theme="dark"] { ... }  →  [data-theme="dark"] .preview-canvas { ... }
      .replace(/\[data-theme="dark"\]\s*\{/g, '[data-theme="dark"] .preview-canvas {')
      // Strip the @media prefers-color-scheme block — dark mode for previews
      // is already handled by the [data-theme="dark"] rule above (set on <html>).
      .replace(/@media\s*\(prefers-color-scheme:\s*dark\)\s*\{[\s\S]*?\n\}/g, "");
    styleTag.textContent = scoped;
  }, [compiledCss]);

  useEffect(() => {
    setAccentDraft(accentColor);
  }, [accentColor]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    sessionStorage.setItem("zephyr-accent-color", accentColor);
    // Note: --accent is intentionally NOT set on documentElement.
    // It is scoped to .preview-canvas only (via the compiled theme CSS).
    // This keeps the docs chrome (nav active states, buttons) stable.
  }, [accentColor]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    sessionStorage.setItem("zephyr-style-pack", stylePack);
  }, [stylePack]);

  // Close accent popover on outside click
  useEffect(() => {
    if (!accentPopoverOpen) return;
    function handleOutside(e: MouseEvent) {
      if (accentPopoverRef.current && !accentPopoverRef.current.contains(e.target as Node)) {
        setAccentPopoverOpen(false);
      }
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
    updateSearchParams(activeRegistryId, accentColor, view, stylePack);
  }, [accentColor, activeRegistryId, stylePack, view]);

  useEffect(() => {
    setIntentText(getDefaultIntent(activeRegistryId));
  }, [activeRegistryId]);

  useEffect(() => {
    const config = previewStateConfig[activeRegistryId];
    const firstState = config?.options[0]?.value ?? "default";
    setPreviewState(firstState);
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
      sessionStorage.setItem("zephyr-cloud-api-key", cloudApiKey.trim());
    } else {
      sessionStorage.removeItem("zephyr-cloud-api-key");
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
        id: "doc-audit-lite",
        kind: "doc",
        label: "Audit Lite",
        detail: "Audit",
        tab: "audit",
        view: "audit",
        anchor: "audit-overview"
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

  function openExternal(url: string, label: string): void {
    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
    showToast(`${label} opened in a new tab`);
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

  async function runAudit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const url = auditUrl.trim();
    if (!/^https?:\/\//i.test(url)) {
      setAuditError("Enter a valid public URL starting with http:// or https://.");
      setAuditReport(null);
      return;
    }

    setAuditLoading(true);
    setAuditError("");
    try {
      if (!cloudClient) {
        const report = createLocalAuditReport({
          url,
          screenshotUrl: auditScreenshotUrl.trim() || undefined,
          notes: auditNotes.trim() || undefined
        });
        setAuditReport(report);
        showToast("Audit completed in local lite mode");
        return;
      }

      const report = await cloudClient.runUrlAudit({
        url,
        screenshotUrl: auditScreenshotUrl.trim() || undefined,
        notes: auditNotes.trim() || undefined
      });
      setAuditReport(report);
      showToast("Audit completed from cloud scanner");
    } catch (error) {
      const fallback = createLocalAuditReport({
        url,
        screenshotUrl: auditScreenshotUrl.trim() || undefined,
        notes: auditNotes.trim() || undefined
      });
      setAuditReport(fallback);
      const message = error instanceof Error ? error.message : String(error);
      setAuditError(`${message}. Showing local lite audit as fallback.`);
    } finally {
      setAuditLoading(false);
    }
  }

  function activateTopTab(tab: TopTab): void {
    setTopTab(tab);
    if (tab === "setup") {
      setView("introduction");
      return;
    }
    if (tab === "audit") {
      setView("audit");
      return;
    }
    if (tab === "components") {
      setView("components");
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

  const installCommand = componentTemplate?.installCommand ?? "pnpm add @zephyr/core @zephyr/ui-react";
  const importSnippet = componentTemplate?.importSnippet ?? `import { ${selectedEntry.name} } from "@zephyr/ui-react";`;
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
  const brandLogoSrc = darkMode ? zephyrLogoLight : zephyrLogoDark;

  const shareUrl = useMemo(() => {
    const origin = typeof window !== "undefined" ? window.location.origin : "https://zephyr.design";
    const path = typeof window !== "undefined" ? window.location.pathname : "/studio";
    const params = new URLSearchParams();
    params.set("component", selectedEntry.id);
    if (accentColor !== defaultAccentForPack(stylePack)) {
      params.set("accent", accentColor);
    }
    params.set("view", view);
    return `${origin}${path}?${params.toString()}`;
  }, [accentColor, selectedEntry.id, stylePack, view]);
  const auditFixPrompt = useMemo(() => {
    if (!auditReport) {
      return "";
    }
    const lines = auditReport.issues
      .slice(0, 6)
      .map(
        (issue, index) =>
          `${index + 1}. [${issue.severity.toUpperCase()} | ${issue.category}] ${issue.title}: ${issue.recommendation}`
      );
    return [
      `Audit target: ${auditReport.url}`,
      `Score: ${auditReport.score}/100 (${auditReport.status})`,
      "",
      "Apply these fixes in priority order:",
      ...lines,
      "",
      "Constraints:",
      "- Keep semantics and accessibility first (labels, landmarks, heading hierarchy).",
      "- Preserve visual consistency with Zephyr components and current accent color.",
      `- Accent color: ${accentColor}`,
      "",
      "Return:",
      "1) Updated UI code",
      "2) Short changelog of UX improvements",
      "3) Any unresolved assumptions"
    ].join("\n");
  }, [accentColor, auditReport]);

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

  function handleStylePackChange(pack: StylePackName): void {
    const meta = STYLE_PACK_META[pack];
    if (!meta.free && userTier !== "pro") {
      // PRO pack selected by free-tier user — show upgrade modal
      setShowUpgradeModal(true);
      return;
    }
    setStylePack(pack);
    // Reset accent to the new pack's default primary so previews
    // immediately reflect the pack's intended personality.
    const newDefault = defaultAccentForPack(pack);
    setAccentColor(newDefault);
    setAccentDraft(newDefault);
  }

  async function copyAndFlash(label: string, text: string): Promise<void> {
    const ok = await copyText(text);
    showToast(ok ? `${label} copied` : `Clipboard blocked for ${label}`);
  }

  return (
    <div className="docs-root">
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
            <img src={brandLogoSrc} alt="Zephyr" className="brand-logo" />
          </div>

          <div className="top-search-wrap">
            <div className="top-search-inner" ref={searchPanelRef}>
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
                onClick={() => openExternal("https://zephyr.design/support", "Support")}
              >
                Support
              </Button>
            </span>
            <span className="btn-hide-mobile">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => openExternal("https://zephyr.design/feature-request", "Feature Request")}
              >
                Feature Request
              </Button>
            </span>
            {/* Theme + Accent: always-visible preview controls */}
            <div className="header-preview-controls btn-hide-mobile">
              <select
                className="header-theme-select"
                value={stylePack}
                onChange={(e) => handleStylePackChange(e.target.value as StylePackName)}
                aria-label="Select theme"
              >
                {(Object.keys(STYLE_PACK_META) as StylePackName[]).map((pack) => (
                  <option key={pack} value={pack}>{pack}</option>
                ))}
              </select>
              <div className="accent-dropdown" ref={accentPopoverRef}>
                <button
                  type="button"
                  className="header-accent-trigger"
                  onClick={() => setAccentPopoverOpen((o) => !o)}
                  aria-label="Choose accent color"
                  aria-expanded={accentPopoverOpen}
                >
                  <span className="accent-dropdown-dot" style={{ backgroundColor: accentColor }} />
                  <span className="ms accent-dropdown-chevron">expand_more</span>
                </button>
                {accentPopoverOpen && (
                  <div className="accent-dropdown-popover accent-popover-right">
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
                  </div>
                )}
              </div>
            </div>
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
          <button type="button" className={`tab ${topTab === "audit" ? "active" : ""}`} onClick={() => activateTopTab("audit")}>Audit</button>
          <button type="button" className={`tab ${topTab === "components" ? "active" : ""}`} onClick={() => activateTopTab("components")}>Components</button>
          <button type="button" className={`tab ${topTab === "pages" ? "active" : ""}`} onClick={() => activateTopTab("pages")}>Pages</button>
          <button type="button" className={`tab ${topTab === "changelog" ? "active" : ""}`} onClick={() => activateTopTab("changelog")}>Change Log</button>
        </nav>
      </header>

      {toastMessage ? <p className="copy-toast" role="status" aria-live="polite">{toastMessage}</p> : null}

      <div className="docs-layout">
        <aside className={`left-rail ${mobileNavOpen ? "is-mobile-open" : ""}`}>
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

          {topTab === "audit" && (
            <div className="nav-group">
              <p className="group-title">Audit</p>
              <button
                type="button"
                className={`sidebar-link ${view === "audit" ? "is-active" : ""}`}
                onClick={() => {
                  setTopTab("audit");
                  setView("audit");
                  setMobileNavOpen(false);
                }}
              >
                Audit Lite
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
                      href="https://www.npmjs.com/package/@zephyr/blocks"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ marginTop: 4 }}
                    >
                      → @zephyr/blocks
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
              <a className="sidebar-link" href="#release-0-4-0" onClick={() => setMobileNavOpen(false)}>
                v0.4.0 <span className="nav-badge latest">Latest</span>
              </a>
              <a className="sidebar-link" href="#release-0-3-0" onClick={() => setMobileNavOpen(false)}>
                v0.3.0
              </a>
              <a className="sidebar-link" href="#release-0-2-0" onClick={() => setMobileNavOpen(false)}>
                v0.2.0
              </a>
              <a className="sidebar-link" href="#release-0-1-0" onClick={() => setMobileNavOpen(false)}>
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
                <p className="lead">Track updates across docs UX, component APIs, and AI integration tooling.</p>
              </section>

              <section id="release-0-4-0" className="doc-section">
                <div className="release-header">
                  <div className="release-version-badge">v0.4.0</div>
                  <div className="release-meta">
                    <span className="release-date">March 4, 2026</span>
                    <span className="release-tag latest">Latest</span>
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
                  <div className="release-version-badge">v0.3.0</div>
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
                      <li>License key tier system: <code>zephyr upgrade --key</code> + <code>zephyr whoami</code>.</li>
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
                  <div className="release-version-badge">v0.2.0</div>
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
                  <div className="release-version-badge">v0.1.0</div>
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
                      <li>6 style packs: Studio, Editorial, NeoBrutal, SoftTech, Enterprise, Clarity.</li>
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
                <div className="snippet-stack">
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
                  <p>Upcoming milestones for the Zephyr ecosystem.</p>
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
                        <li>Publish <code>@zephyr/ui-react</code> to npm as a public package.</li>
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
                <div>
                  <p className="eyebrow">Design System</p>
                </div>
                <h1>Build beautiful UIs — the instant your AI does.</h1>
                <p className="lead">
                  Zephyr is a complete UI component system for vibe coders. Set your accent once, drop in
                  components, and ship — with Claude Code, Cursor, Codex, or Lovable.
                </p>
                <div className="hero-actions">
                  <Button onClick={() => {
                    setTopTab("setup");
                    setView("getting-started");
                  }}>Get started</Button>
                  <Button variant="secondary" onClick={() => selectComponent("button")}>Browse components</Button>
                </div>
              </div>

              <section id="why-zephyr" className="doc-section">
                <div className="section-heading">
                  <h2>Why Zephyr</h2>
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
                    <strong>One production base theme</strong>
                    <p>A single polished visual baseline keeps every generated UI consistent across projects and tools.</p>
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
                      <p>Each pack defines colors, typography, radius, and shadows — giving every component a dramatically different look.</p>
                    </div>
                    <Badge tone="neutral">{stylePack}</Badge>
                  </div>
                </div>
                <div className="style-pack-grid">
                  {(Object.keys(STYLE_PACK_META) as StylePackName[]).map((pack) => (
                    <StylePackCard
                      key={pack}
                      packName={pack}
                      isActive={stylePack === pack}
                      isLocked={!STYLE_PACK_META[pack].free && userTier !== "pro"}
                      onClick={() => handleStylePackChange(pack)}
                    />
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
                      <SnippetItem beta label="Install" code={`npm install @zephyr/ui-react`} onCopy={() => copyAndFlash("Install", "npm install @zephyr/ui-react")} />
                      <p className="beta-notice">Zephyr is in private beta — not yet published to npm.</p>
                      <SnippetItem label="zephyr.config.ts" code={configSnippet} onCopy={() => copyAndFlash("Config", configSnippet)} />
                    </div>
                  )}
                  {setupTab === "pnpm" && (
                    <div className="snippet-stack">
                      <SnippetItem beta label="Install" code={`pnpm add @zephyr/ui-react`} onCopy={() => copyAndFlash("Install", "pnpm add @zephyr/ui-react")} />
                      <p className="beta-notice">Zephyr is in private beta — not yet published to npm.</p>
                      <SnippetItem label="zephyr.config.ts" code={configSnippet} onCopy={() => copyAndFlash("Config", configSnippet)} />
                    </div>
                  )}
                  {setupTab === "cli" && (
                    <div className="snippet-stack">
                      <SnippetItem label="Init" code={`npx zephyr init --accent ${accentColor}`} onCopy={() => copyAndFlash("CLI", `npx zephyr init --accent ${accentColor}`)} />
                      <SnippetItem label="Add a component" code={`npx zephyr add button`} onCopy={() => copyAndFlash("Add", "npx zephyr add button")} />
                      <p className="beta-notice">Zephyr is in private beta — not yet published to npm.</p>
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
                      <p className="beta-notice">Zephyr is in private beta — not yet published to npm.</p>
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
          ) : view === "foundations" ? (
            <>
              <section id="foundations-overview" className="doc-section hero">
                <p className="breadcrumbs">Foundations</p>
                <h1>Design Tokens</h1>
                <p className="lead">
                  Every Zephyr component is styled through CSS variables generated from design tokens.
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
                      <p>Semantic color roles used across all components with light and dark values in a single base system.</p>
                    </div>
                    <Badge tone="info">{stylePack}</Badge>
                  </div>
                </div>
                <div className="token-color-grid">
                  {Object.entries(stylePacks[stylePack].color).map(([name, value]) => (
                    <button
                      key={name}
                      type="button"
                      className="token-color-swatch"
                      onClick={() => copyAndFlash(`--z-color-${name}`, `var(--z-color-${name})`)}
                      title={`Click to copy var(--z-color-${name})`}
                    >
                      <div className="swatch-preview" style={{ background: value }} />
                      <div className="swatch-meta">
                        <strong>{name}</strong>
                        <code>{value}</code>
                      </div>
                      <code className="swatch-var">--z-color-{name}</code>
                    </button>
                  ))}
                </div>
                {stylePacks[stylePack].colorDark && (
                  <div style={{ marginTop: "1.5rem" }}>
                    <p className="subsection-label">Dark mode</p>
                    <div className="token-color-grid is-dark">
                      {Object.entries(stylePacks[stylePack].colorDark!).map(([name, value]) => (
                        <button
                          key={name}
                          type="button"
                          className="token-color-swatch"
                          onClick={() => copyAndFlash(`--z-color-${name} (dark)`, `var(--z-color-${name})`)}
                          title={`Click to copy var(--z-color-${name})`}
                        >
                          <div className="swatch-preview" style={{ background: value }} />
                          <div className="swatch-meta">
                            <strong>{name}</strong>
                            <code>{value}</code>
                          </div>
                          <code className="swatch-var">--z-color-{name}</code>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
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
                  <p>Font families, sizes, weights, line heights, and letter spacing tokens.</p>
                </div>

                <div className="token-table-group">
                  <h3>Font Family</h3>
                  <div className="token-table">
                    <div className="token-row token-header">
                      <span>Token</span><span>CSS Variable</span><span>Preview</span>
                    </div>
                    {Object.entries(stylePacks[stylePack].type.family).map(([key, val]) => (
                      <button key={key} type="button" className="token-row" onClick={() => copyAndFlash(`--z-type-family-${key}`, `var(--z-type-family-${key})`)}>
                        <span className="token-name">family-{key}</span>
                        <code>--z-type-family-{key}</code>
                        <span className="type-preview" style={{ fontFamily: val }}>The quick brown fox</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="token-table-group">
                  <h3>Font Size</h3>
                  <div className="token-table">
                    <div className="token-row token-header">
                      <span>Token</span><span>CSS Variable</span><span>Value</span><span>Preview</span>
                    </div>
                    {Object.entries(stylePacks[stylePack].type.size).map(([key, val]) => (
                      <button key={key} type="button" className="token-row" onClick={() => copyAndFlash(`--z-type-size-${key}`, `var(--z-type-size-${key})`)}>
                        <span className="token-name">size-{key}</span>
                        <code>--z-type-size-{key}</code>
                        <code>{val}</code>
                        <span className="type-preview" style={{ fontSize: val }}>Aa</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="token-table-group">
                  <h3>Font Weight</h3>
                  <div className="token-table">
                    <div className="token-row token-header">
                      <span>Token</span><span>CSS Variable</span><span>Value</span><span>Preview</span>
                    </div>
                    {Object.entries(stylePacks[stylePack].type.weight).map(([key, val]) => (
                      <button key={key} type="button" className="token-row" onClick={() => copyAndFlash(`--z-type-weight-${key}`, `var(--z-type-weight-${key})`)}>
                        <span className="token-name">weight-{key}</span>
                        <code>--z-type-weight-{key}</code>
                        <code>{val}</code>
                        <span className="type-preview" style={{ fontWeight: val }}>Zephyr</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="token-table-group">
                  <h3>Line Height</h3>
                  <div className="token-table">
                    <div className="token-row token-header">
                      <span>Token</span><span>CSS Variable</span><span>Value</span><span>Preview</span>
                    </div>
                    {Object.entries(stylePacks[stylePack].type.lineHeight).map(([key, val]) => (
                      <button key={key} type="button" className="token-row" onClick={() => copyAndFlash(`--z-type-lh-${key}`, `var(--z-type-lh-${key})`)}>
                        <span className="token-name">lh-{key}</span>
                        <code>--z-type-lh-{key}</code>
                        <code>{val}</code>
                        <span className="type-preview-block" style={{ lineHeight: val }}>Line one<br />Line two</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="token-table-group">
                  <h3>Letter Spacing</h3>
                  <div className="token-table">
                    <div className="token-row token-header">
                      <span>Token</span><span>CSS Variable</span><span>Value</span><span>Preview</span>
                    </div>
                    {Object.entries(stylePacks[stylePack].type.letterSpacing).map(([key, val]) => (
                      <button key={key} type="button" className="token-row" onClick={() => copyAndFlash(`--z-type-ls-${key}`, `var(--z-type-ls-${key})`)}>
                        <span className="token-name">ls-{key}</span>
                        <code>--z-type-ls-{key}</code>
                        <code>{val}</code>
                        <span className="type-preview" style={{ letterSpacing: val }}>ZEPHYR DESIGN</span>
                      </button>
                    ))}
                  </div>
                </div>
              </section>
            </>
          ) : view === "mission" ? (
            <>
              <section id="mission-overview" className="doc-section hero">
                <p className="breadcrumbs">Setup / Mission</p>
                <h1>Mission and vision</h1>
                <p className="lead">
                  Zephyr helps vibe coders ship clean, production-ready interfaces without a full design or frontend team.
                </p>
              </section>

              <section id="mission-pillars" className="doc-section">
                <div className="section-heading">
                  <h2>Mission pillars</h2>
                  <p>Principles that keep Zephyr useful for both designers and developers.</p>
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
                  <p>What makes Zephyr different from other component systems.</p>
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
                    <h4>Zephyr approach</h4>
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
                  Zephyr is built as a cross-functional platform: product design, design systems, frontend engineering,
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
          ) : view === "audit" ? (
            <>
              <section id="audit-overview" className="doc-section hero">
                <p className="breadcrumbs">Audit</p>
                <h1>Zephr-Audit Lite</h1>
                <p className="lead">
                  Paste a public URL and run a fast UX + UI heuristic scan.
                  Uploading a screenshot URL improves visual hierarchy and spacing checks.
                </p>
              </section>

              <section id="audit-run" className="doc-section">
                <div className="section-heading">
                  <h2>Run audit</h2>
                  <p>Lite mode uses cloud scanning when available, with automatic local fallback.</p>
                </div>
                <form className="audit-form" onSubmit={runAudit}>
                  <label className="field">
                    <span>Public page URL</span>
                    <Input
                      value={auditUrl}
                      onChange={(event) => setAuditUrl(event.target.value)}
                      placeholder="https://your-startup.com/pricing"
                      required
                    />
                  </label>
                  <label className="field">
                    <span>Screenshot URL (optional)</span>
                    <Input
                      value={auditScreenshotUrl}
                      onChange={(event) => setAuditScreenshotUrl(event.target.value)}
                      placeholder="https://cdn.yourapp.com/screen.png"
                    />
                  </label>
                  <label className="field">
                    <span>Goal context (optional)</span>
                    <Textarea
                      rows={3}
                      value={auditNotes}
                      onChange={(event) => setAuditNotes(event.target.value)}
                      placeholder="Example: Improve onboarding conversion for first-time users."
                    />
                  </label>
                  <label className="field">
                    <span>Cloud API key (optional)</span>
                    <Input
                      type="password"
                      value={cloudApiKeyDraft}
                      onChange={(event) => setCloudApiKeyDraft(event.target.value)}
                      placeholder="dev_local_key"
                    />
                  </label>
                  <div className="inline-actions">
                    <Button type="button" size="sm" variant="secondary" onClick={saveCloudApiKey}>
                      Save API key
                    </Button>
                    <Button type="button" size="sm" variant="secondary" onClick={clearCloudApiKey}>
                      Use local only
                    </Button>
                    <Badge tone={cloudClient ? "success" : "neutral"}>
                      {cloudClient ? "Cloud scanner active" : "Local fallback mode"}
                    </Badge>
                  </div>
                  <div className="inline-actions">
                    <Button type="submit" loading={auditLoading}>
                      Run Audit Lite
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() =>
                        openExternal(
                          "https://zephyr.design/audit",
                          "Audit docs"
                        )
                      }
                    >
                      Audit docs
                    </Button>
                  </div>
                  {auditError ? <Alert tone="danger">{auditError}</Alert> : null}
                </form>
              </section>

              {auditReport ? (
                <>
                  <section id="audit-score" className="doc-section">
                    <div className="section-heading">
                      <div className="section-heading-row">
                        <div>
                          <h2>Audit result</h2>
                          <p>{auditReport.summary}</p>
                        </div>
                        <div className="audit-score-wrap">
                          <Badge tone={auditReport.status === "pass" ? "success" : auditReport.status === "warn" ? "warning" : "danger"}>
                            {auditReport.status.toUpperCase()}
                          </Badge>
                          <span className="audit-score-value">{auditReport.score}/100</span>
                        </div>
                      </div>
                    </div>
                    <div className="audit-metadata">
                      <span><strong>URL:</strong> {auditReport.url}</span>
                      <span><strong>Source:</strong> {auditReport.source}</span>
                      <span><strong>Scanned:</strong> {new Date(auditReport.scannedAt).toLocaleString()}</span>
                      {auditReport.pageTitle ? <span><strong>Page title:</strong> {auditReport.pageTitle}</span> : null}
                    </div>
                  </section>

                  <section id="audit-issues" className="doc-section">
                    <div className="section-heading">
                      <h2>Issues</h2>
                      <p>Prioritized findings with concrete fixes.</p>
                    </div>
                    <div className="audit-issue-list">
                      {auditReport.issues.length ? (
                        auditReport.issues.map((issue) => (
                          <article key={issue.id} className="audit-issue-card">
                            <div className="audit-issue-head">
                              <Badge tone={severityBadgeTone(issue.severity)}>
                                {issue.severity.toUpperCase()}
                              </Badge>
                              <span className="audit-issue-category">{issue.category}</span>
                            </div>
                            <h3>{issue.title}</h3>
                            <p>{issue.summary}</p>
                            <p className="audit-issue-evidence"><strong>Evidence:</strong> {issue.evidence}</p>
                            <p className="audit-issue-recommendation"><strong>Fix:</strong> {issue.recommendation}</p>
                          </article>
                        ))
                      ) : (
                        <Alert tone="success">No issues flagged in this scan.</Alert>
                      )}
                    </div>
                  </section>

                  <section id="audit-recommendations" className="doc-section">
                    <div className="section-heading">
                      <h2>Top recommendations</h2>
                      <p>Action list you can hand directly to your AI IDE assistant.</p>
                    </div>
                    <ol className="audit-recommendations">
                      {auditReport.recommendations.map((item, index) => (
                        <li key={`${index}-${item}`}>{item}</li>
                      ))}
                    </ol>
                    <div className="snippet-stack" style={{ marginTop: "0.85rem" }}>
                      <SnippetItem
                        label="AI remediation prompt"
                        code={auditFixPrompt}
                        onCopy={() => copyAndFlash("Audit fix prompt", auditFixPrompt)}
                      />
                    </div>
                  </section>

                  <section id="audit-heatmap" className="doc-section">
                    <div className="section-heading">
                      <h2>Predicted attention map</h2>
                      <p>This is a model-based estimate, not clickstream heatmap telemetry.</p>
                    </div>
                    <div className="audit-heatmap-list">
                      {auditReport.heatmap.map((zone) => (
                        <div key={zone.id} className="audit-heatmap-row">
                          <div className="audit-heatmap-meta">
                            <strong>{zone.label}</strong>
                            <span>{zone.rationale}</span>
                          </div>
                          <div className="audit-heatmap-track" aria-hidden="true">
                            <span className="audit-heatmap-fill" style={{ width: `${zone.attention}%` }} />
                          </div>
                          <span className="audit-heatmap-score">{zone.attention}%</span>
                        </div>
                      ))}
                    </div>
                  </section>
                </>
              ) : null}
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
                  Generated from Zephyr registry metadata. This is the canonical contract AI tools should follow.
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
                  <h2>Usage snippets</h2>
                  <p>Copy-paste snippets for direct use in IDEs and AI assistants.</p>
                </div>
                <div className="snippet-stack">
                  <SnippetItem
                    beta
                    label="Install"
                    code={installCommand}
                    onCopy={() => copyAndFlash("Install command", installCommand)}
                  />
                  <p className="beta-notice">Zephyr is in private beta — not yet published to npm.</p>
                  <SnippetItem label="Import" code={importSnippet} onCopy={() => copyAndFlash("Import snippet", importSnippet)} />
                  <SnippetItem label="Usage" code={usageSnippet} onCopy={() => copyAndFlash("Usage snippet", usageSnippet)} />
                  <div style={{ marginTop: "var(--z-space-4, 1rem)" }}>
                    <p className="snippet-item-label" style={{ marginBottom: "var(--z-space-2, 0.5rem)", fontSize: 13, fontWeight: 600, color: "var(--z-color-muted, #737373)" }}>Live editor</p>
                    <LiveCodeEditor
                      key={selectedEntry.id}
                      code={usageSnippet}
                      scope={{ selectedEntry }}
                      previewHeight={160}
                    />
                  </div>
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
                    <p>{selectedEntry.a11yNotes}</p>
                  </article>
                  <article className="api-meta-card">
                    <h3>AI Hints</h3>
                    <p>{selectedEntry.aiHints}</p>
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
                  Drop-in page templates built entirely from Zephyr components. Each template is a React component you can copy, customise, and ship.
                </p>
                {userTier !== "pro" && (
                  <div style={{ marginTop: "1rem" }}>
                    <Button onClick={() => setShowUpgradeModal(true)}>Unlock Pro to use templates</Button>
                  </div>
                )}
              </section>

              <section id="template-dashboard" className="doc-section">
                <div className="section-heading">
                  <h2>DashboardPage</h2>
                  <p>Stats header, project table, and activity sidebar — ready to wire up to real data.</p>
                </div>
                <BrowserPreviewFrame address="zephyr.local/templates/dashboard" minHeight="300px">
                  <div style={{ transform: "scale(0.7)", transformOrigin: "top left", width: "142.86%", pointerEvents: "none" }}>
                    <DashboardPage />
                  </div>
                </BrowserPreviewFrame>
                <div style={{ marginTop: "1rem" }}>
                  <SnippetItem
                    label="Usage"
                    code={`import { DashboardPage } from '@zephyr/ui-react';

<DashboardPage
  title="Analytics"
  onNewItem={() => {}}
/>`}
                    onCopy={() => copyAndFlash("DashboardPage", `import { DashboardPage } from '@zephyr/ui-react';

<DashboardPage title="Analytics" onNewItem={() => {}} />`)}
                  />
                </div>
              </section>

              <section id="template-auth" className="doc-section">
                <div className="section-heading">
                  <h2>AuthPage</h2>
                  <p>Centered sign-in / sign-up form with OAuth provider slots, error handling, and mode switching.</p>
                </div>
                <BrowserPreviewFrame address="zephyr.local/templates/auth" minHeight="480px">
                  <AuthPage />
                </BrowserPreviewFrame>
                <div style={{ marginTop: "1rem" }}>
                  <SnippetItem
                    label="Usage"
                    code={`import { AuthPage } from '@zephyr/ui-react';

<AuthPage
  mode="sign-in"
  onSubmit={async (email, password) => {
    await signIn(email, password);
  }}
  onModeSwitch={() => setMode('sign-up')}
/>`}
                    onCopy={() => copyAndFlash("AuthPage", `import { AuthPage } from '@zephyr/ui-react';

<AuthPage mode="sign-in" onSubmit={signIn} />`)}
                  />
                </div>
              </section>

              <section id="template-settings" className="doc-section">
                <div className="section-heading">
                  <h2>SettingsPage</h2>
                  <p>Tabbed settings layout with Profile (pending/success states), Notifications, and Danger Zone built in.</p>
                </div>
                <BrowserPreviewFrame address="zephyr.local/templates/settings" minHeight="320px">
                  <SettingsPage />
                </BrowserPreviewFrame>
                <div style={{ marginTop: "1rem" }}>
                  <SnippetItem
                    label="Usage"
                    code={`import { SettingsPage } from '@zephyr/ui-react';

<SettingsPage
  title="Account Settings"
  subtitle="Manage your preferences"
/>`}
                    onCopy={() => copyAndFlash("SettingsPage", `import { SettingsPage } from '@zephyr/ui-react';

<SettingsPage title="Account Settings" />`)}
                  />
                </div>
              </section>

              <section id="template-onboarding" className="doc-section">
                <div className="section-heading">
                  <h2>OnboardingPage</h2>
                  <p>Step-by-step wizard with animated progress bar, back / next navigation, and customisable step content.</p>
                </div>
                <BrowserPreviewFrame address="zephyr.local/templates/onboarding" minHeight="520px">
                  <OnboardingPage />
                </BrowserPreviewFrame>
                <div style={{ marginTop: "1rem" }}>
                  <SnippetItem
                    label="Usage"
                    code={`import { OnboardingPage } from '@zephyr/ui-react';

<OnboardingPage
  steps={mySteps}
  onComplete={() => router.push('/dashboard')}
/>`}
                    onCopy={() => copyAndFlash("OnboardingPage", `import { OnboardingPage } from '@zephyr/ui-react';

<OnboardingPage steps={mySteps} onComplete={onDone} />`)}
                  />
                </div>
              </section>

              <section id="template-marketing" className="doc-section">
                <div className="section-heading">
                  <h2>MarketingPage</h2>
                  <p>Landing page with hero, feature grid, social proof, pricing cards, and bottom CTA.</p>
                </div>
                <BrowserPreviewFrame address="zephyr.local/templates/marketing" minHeight="320px">
                  <div style={{ transform: "scale(0.6)", transformOrigin: "top left", width: "166.67%", pointerEvents: "none" }}>
                    <MarketingPage />
                  </div>
                </BrowserPreviewFrame>
                <div style={{ marginTop: "1rem" }}>
                  <SnippetItem
                    label="Usage"
                    code={`import { MarketingPage } from '@zephyr/ui-react';

<MarketingPage
  heroTitle="Ship faster with Zephyr"
  heroSubtitle="The AI-native component system"
  onCtaClick={() => router.push('/signup')}
/>`}
                    onCopy={() => copyAndFlash("MarketingPage", `import { MarketingPage } from '@zephyr/ui-react';

<MarketingPage heroTitle="Ship faster" onCtaClick={onSignup} />`)}
                  />
                </div>
              </section>
            </>
          ) : (
            <>
              <div className="component-page-tabs">
                <button type="button" className="component-page-tab is-active">Guides</button>
                <button type="button" className="component-page-tab" onClick={() => setView("api-reference")}>API Reference</button>
              </div>
              <section id="overview" className="doc-section hero">
                <p className="breadcrumbs">Getting Started / Components</p>
                <p className="eyebrow">{selectedEntry.category} • {selectedEntry.id}</p>
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
                      Connect your API key to fetch {selectedEntry.name} results from Zephyr Cloud.
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
                      <p>Interactive browser-style canvas with selectable states. What you set here carries across pages.</p>
                    </div>
                  </div>
                </div>

                {selectedPreviewStateConfig ? (
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
                  address={`zephyr.local/components/${selectedEntry.id}`}
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
                          <option value="all">Default</option>
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
                  ) : undefined}
                >
                  <PreviewSurface
                    entry={selectedEntry}
                    previewState={previewState}
                    buttonLabel={buttonLabel}
                    buttonVariant={buttonVariant}
                    buttonSize={buttonSize}
                    btnFilterType={btnFilterType}
                    btnFilterSize={btnFilterSize}
                    btnFilterState={btnFilterState}
                    btnOnlyIcon={btnOnlyIcon}
                    zephyrLogoSrc={brandLogoSrc}
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

              <section id="ai-reference" className="doc-section">
                <div className="section-heading">
                  <h2>AI Block Reference</h2>
                  <p>Paste this prompt into your vibe coding platform — the component inserts with your current accent and token settings.</p>
                </div>

                <label className="field">
                  <span>Intent</span>
                  <Textarea
                    value={intentText}
                    onChange={(event) => setIntentText(event.target.value)}
                    rows={4}
                  />
                </label>

                <label className="field">
                  <span>Insertion prompt</span>
                  <Textarea value={blockPrompt} readOnly rows={12} />
                </label>

                <div className="inline-actions">
                  <Button onClick={() => copyAndFlash("AI block prompt", blockPrompt)}>
                    Copy AI Prompt
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => copyAndFlash("API key placeholder", "ZEPHYR_API_KEY=replace_me")}
                  >
                    Copy API Key Placeholder
                  </Button>
                </div>
              </section>

              <section id="integration" className="doc-section">
                <div className="section-heading">
                  <h2>Install and use</h2>
                  <p>Plug-and-play snippets for fast integration in any AI coding workflow.</p>
                </div>

                <div className="snippet-stack">
                  <SnippetItem
                    beta
                    label="Install"
                    code={installCommand}
                    onCopy={() => copyAndFlash("Install command", installCommand)}
                  />
                  <p className="beta-notice">Zephyr is in private beta — not yet published to npm.</p>
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
                  <div style={{ marginTop: "var(--z-space-4, 1rem)" }}>
                    <p className="snippet-item-label" style={{ marginBottom: "var(--z-space-2, 0.5rem)", fontSize: 13, fontWeight: 600, color: "var(--z-color-muted, #737373)" }}>Live editor</p>
                    <LiveCodeEditor
                      key={selectedEntry.id}
                      code={usageSnippet}
                      scope={{ selectedEntry }}
                      previewHeight={160}
                    />
                  </div>
                  <SnippetItem
                    label="zephyr.config.ts"
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
              <a className="toc-link" href="#release-0-4-0">v0.4.0</a>
              <a className="toc-link" href="#release-0-3-0">v0.3.0</a>
              <a className="toc-link" href="#release-0-2-0">v0.2.0</a>
              <a className="toc-link" href="#release-0-1-0">v0.1.0</a>
              <a className="toc-link" href="#migrations-overview">Migrations</a>
              <a className="toc-link" href="#release-upcoming">Roadmap</a>
            </>
          )}
          {topTab !== "changelog" && view === "introduction" && (
            <>
              <a className="toc-link" href="#setup-introduction">Overview</a>
              <a className="toc-link" href="#why-zephyr">Why Zephyr</a>
            </>
          )}
          {topTab !== "changelog" && view === "getting-started" && (
            <>
              <a className="toc-link" href="#overview">Overview</a>
              <a className="toc-link" href="#accent-selection">Accent color</a>
              <a className="toc-link" href="#setup">Install</a>
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
          {topTab !== "changelog" && view === "audit" && (
            <>
              <a className="toc-link" href="#audit-overview">Overview</a>
              <a className="toc-link" href="#audit-run">Run audit</a>
              {auditReport ? <a className="toc-link" href="#audit-score">Score</a> : null}
              {auditReport ? <a className="toc-link" href="#audit-issues">Issues</a> : null}
              {auditReport ? <a className="toc-link" href="#audit-recommendations">Recommendations</a> : null}
              {auditReport ? <a className="toc-link" href="#audit-heatmap">Predicted heatmap</a> : null}
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
              <a className="toc-link" href="#api-examples">Examples</a>
              <a className="toc-link" href="#api-contract">Contract notes</a>
            </>
          )}
        </aside>
      </div >

      {showUpgradeModal && (
        <LicenseKeyModal
          licenseKey={licenseKey}
          onSubmit={async (key) => {
            const validationClient = new ZephyrCloudClient({
              baseUrl: cloudBaseUrl
            });
            let result: Awaited<ReturnType<ZephyrCloudClient["validateLicense"]>>;
            try {
              result = await validationClient.validateLicense({ licenseKey: key });
            } catch (error) {
              const message = error instanceof Error ? error.message : String(error);
              throw new Error(
                message.toLowerCase().includes("failed to fetch")
                  ? `License service unavailable at ${cloudBaseUrl}. Start @zephyr/cloud-api and retry.`
                  : message
              );
            }
            if (!result.valid || result.tier !== "pro") {
              throw new Error(result.message || "Invalid license key.");
            }

            setLicenseKey(key);
            setUserTier("pro");
            sessionStorage.setItem("zephyr-license-key", key);
            setShowUpgradeModal(false);
            showToast(result.message || "Pro access enabled");
          }}
          onGetKey={() => openExternal("https://zephyr.design/pro", "License key page")}
          onRemove={() => {
            setLicenseKey("");
            setUserTier("free");
            sessionStorage.removeItem("zephyr-license-key");
            setShowUpgradeModal(false);
          }}
          onClose={() => setShowUpgradeModal(false)}
        />
      )
      }
    </div >
  );
}
