import { useState } from "react";
import {
  Avatar,
  Badge,
  Button,
  Skeleton
} from "@zephrui/ui-react";
import type { RegistryEntry } from "@zephrui/ai-registry";
import { BrowserPreviewFrame } from "../components/BrowserPreviewFrame";
import { PreviewSurface } from "../components/PreviewSurface";
import { SnippetItem } from "../components/SnippetItem";
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
} from "../components/PreviewSurface";
import type { WorkspaceView } from "../types";

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

export interface ComponentDetailsViewProps {
  selectedEntry: RegistryEntry;
  setView: (view: WorkspaceView) => void;

  // Preview state
  previewState: PreviewStateKey;
  setPreviewState: (state: PreviewStateKey) => void;
  previewProps: Record<string, string>;
  setPreviewProps: (updater: (prev: Record<string, string>) => Record<string, string>) => void;

  // Button preview props
  buttonLabel: string;
  buttonVariant: "primary" | "secondary" | "ghost" | "danger";
  buttonSize: "xs" | "sm" | "md" | "lg";

  // Button variant grid filter props
  btnFilterType: "all" | "primary" | "secondary" | "ghost" | "danger";
  btnFilterSize: "all" | "xs" | "sm" | "md" | "lg";
  btnFilterState: "all" | "default" | "hover" | "pressed" | "loading" | "disabled";
  btnOnlyIcon: boolean;

  // Button group props
  buttonGroupQuantity: ButtonGroupQuantityOption;
  setButtonGroupQuantity: (q: ButtonGroupQuantityOption) => void;
  buttonGroupSize: ButtonGroupSizeOption;
  setButtonGroupSize: (s: ButtonGroupSizeOption) => void;
  buttonGroupActiveIndex: number;
  setButtonGroupActiveIndex: (i: number) => void;
  buttonGroupDisabled: boolean;
  setButtonGroupDisabled: (d: boolean) => void;

  // Switch props
  switchPattern: SwitchPatternOption;
  setSwitchPattern: (p: SwitchPatternOption) => void;
  switchState: SwitchStateOption;
  setSwitchState: (s: SwitchStateOption) => void;
  switchActive: boolean;
  setSwitchActive: (a: boolean) => void;
  switchSize: "sm" | "md";
  setSwitchSize: (s: "sm" | "md") => void;
  switchCardType: SwitchCardTypeOption;
  setSwitchCardType: (t: SwitchCardTypeOption) => void;
  switchShowSublabel: boolean;
  setSwitchShowSublabel: (v: boolean) => void;
  switchShowBadge: boolean;
  setSwitchShowBadge: (v: boolean) => void;

  // Accordion props
  accordionState: AccordionStateOption;
  setAccordionState: (s: AccordionStateOption) => void;
  accordionFlipIcon: boolean;
  setAccordionFlipIcon: (v: boolean) => void;

  // Tooltip props
  tooltipType: TooltipTypeOption;
  setTooltipType: (t: TooltipTypeOption) => void;
  tooltipSize: TooltipSizeOption;
  setTooltipSize: (s: TooltipSizeOption) => void;
  tooltipTone: TooltipToneOption;
  setTooltipTone: (t: TooltipToneOption) => void;
  tooltipTail: boolean;
  setTooltipTail: (v: boolean) => void;
  tooltipLeftIcon: boolean;
  setTooltipLeftIcon: (v: boolean) => void;
  tooltipDismissible: boolean;
  setTooltipDismissible: (v: boolean) => void;
  tooltipVisible: boolean;
  setTooltipVisible: (v: boolean) => void;

  // Alert props
  alertSeverity: AlertSeverityOption;
  setAlertSeverity: (s: AlertSeverityOption) => void;
  alertSize: AlertSizeOption;
  setAlertSize: (s: AlertSizeOption) => void;
  alertStyle: AlertStyleOption;
  setAlertStyle: (s: AlertStyleOption) => void;
  alertDismissible: boolean;
  setAlertDismissible: (v: boolean) => void;

  // Badge props
  badgeType: BadgeTypeOption;
  setBadgeType: (t: BadgeTypeOption) => void;
  badgeStyle: BadgeStyleOption;
  setBadgeStyle: (s: BadgeStyleOption) => void;
  badgeColor: BadgeColorOption;
  setBadgeColor: (c: BadgeColorOption) => void;
  badgeSize: "sm" | "md";
  setBadgeSize: (s: "sm" | "md") => void;
  badgeNumber: boolean;
  setBadgeNumber: (v: boolean) => void;
  badgeDisabled: boolean;
  setBadgeDisabled: (v: boolean) => void;

  // Date picker props
  datePickerMode: DatePickerModeOption;
  setDatePickerMode: (m: DatePickerModeOption) => void;
  datePickerShowTimeFilters: boolean;
  setDatePickerShowTimeFilters: (v: boolean) => void;
  datePickerShowFooter: boolean;
  setDatePickerShowFooter: (v: boolean) => void;

  // Pagination props
  paginationType: PaginationTypeOption;
  setPaginationType: (t: PaginationTypeOption) => void;
  paginationShowFirstLast: boolean;
  setPaginationShowFirstLast: (v: boolean) => void;
  paginationShowPrevNext: boolean;
  setPaginationShowPrevNext: (v: boolean) => void;
  paginationShowAdvanced: boolean;
  setPaginationShowAdvanced: (v: boolean) => void;
  paginationPageSize: number;
  setPaginationPageSize: (n: number) => void;

  // Progress props
  progressVariant: ProgressVariantOption;
  setProgressVariant: (v: ProgressVariantOption) => void;
  progressTone: ProgressToneOption;
  setProgressTone: (t: ProgressToneOption) => void;
  progressLineSize: ProgressLineSizeOption;
  setProgressLineSize: (s: ProgressLineSizeOption) => void;
  progressCircleSize: ProgressCircleSizeOption;
  setProgressCircleSize: (s: ProgressCircleSizeOption) => void;
  progressValue: 0 | 25 | 50 | 75 | 100;
  setProgressValue: (v: 0 | 25 | 50 | 75 | 100) => void;
  progressShowValue: boolean;
  setProgressShowValue: (v: boolean) => void;
  progressLabelPlacement: ProgressLabelPlacementOption;
  setProgressLabelPlacement: (p: ProgressLabelPlacementOption) => void;
  progressShowDescription: boolean;
  setProgressShowDescription: (v: boolean) => void;
  progressShowAction: boolean;
  setProgressShowAction: (v: boolean) => void;

  // Rich editor props
  richEditorVariant: RichEditorVariantOption;
  setRichEditorVariant: (v: RichEditorVariantOption) => void;
  richEditorShowMore: boolean;
  setRichEditorShowMore: (v: boolean) => void;
  richEditorDisabled: boolean;
  setRichEditorDisabled: (v: boolean) => void;

  // Color picker props
  colorPickerFormat: ColorPickerFormatOption;
  setColorPickerFormat: (f: ColorPickerFormatOption) => void;
  colorPickerShowRecommended: boolean;
  setColorPickerShowRecommended: (v: boolean) => void;
  colorPickerDisabled: boolean;
  setColorPickerDisabled: (v: boolean) => void;

  // Divider props
  dividerOrientation: DividerOrientationOption;
  setDividerOrientation: (o: DividerOrientationOption) => void;
  dividerStroke: DividerStrokeOption;
  setDividerStroke: (s: DividerStrokeOption) => void;
  dividerLabel: DividerLabelOption;
  setDividerLabel: (l: DividerLabelOption) => void;
  dividerInset: DividerInsetOption;
  setDividerInset: (i: DividerInsetOption) => void;
  dividerThickness: 1 | 2 | 3;
  setDividerThickness: (t: 1 | 2 | 3) => void;

  // Icon / Avatar / Logo cloud props
  iconQuery: string;
  setIconQuery: (q: string) => void;
  iconStyleVariant: import("@zephrui/icons-material").MaterialIconStyle;
  setIconStyleVariant: (s: import("@zephrui/icons-material").MaterialIconStyle) => void;
  iconCloudResults: import("@zephrui/icons-material").MaterialIconDefinition[] | undefined;
  avatarQuery: string;
  setAvatarQuery: (q: string) => void;
  avatarSeed: string;
  setAvatarSeed: (s: string) => void;
  avatarCloudResults: import("@zephrui/avatars").AvatarStyleDefinition[] | undefined;
  logoQuery: string;
  setLogoQuery: (q: string) => void;
  logoCloudResults: import("@zephrui/logos").LogoCatalogEntry[] | undefined;

  // Computed / derived
  apiPropRows: ReturnType<typeof import("@zephrui/ai-registry").getComponentPropsTable>;
  genericEnumRows: ReturnType<typeof import("@zephrui/ai-registry").getComponentPropsTable>;
  selectedPreviewStateConfig: { label: string; options: { value: PreviewStateKey; label: string }[] } | undefined;
  blockPrompt: string;
  installCommand: string;
  importSnippet: string;
  usageSnippet: string;
  configSnippet: string;
  relatedComponents: RegistryEntry[];
  brandLogoSrc: string;

  // Actions
  selectComponent: (id: string) => void;
  copyAndFlash: (label: string, text: string) => Promise<void>;
}

export function ComponentDetailsView({
  selectedEntry,
  setView,
  previewState,
  setPreviewState,
  previewProps,
  setPreviewProps,
  buttonLabel,
  buttonVariant,
  buttonSize,
  btnFilterType,
  btnFilterSize,
  btnFilterState,
  btnOnlyIcon,
  buttonGroupQuantity,
  setButtonGroupQuantity,
  buttonGroupSize,
  setButtonGroupSize,
  buttonGroupActiveIndex,
  setButtonGroupActiveIndex,
  buttonGroupDisabled,
  setButtonGroupDisabled,
  switchPattern,
  setSwitchPattern,
  switchState,
  setSwitchState,
  switchActive,
  setSwitchActive,
  switchSize,
  setSwitchSize,
  switchCardType,
  setSwitchCardType,
  switchShowSublabel,
  setSwitchShowSublabel,
  switchShowBadge,
  setSwitchShowBadge,
  accordionState,
  setAccordionState,
  accordionFlipIcon,
  setAccordionFlipIcon,
  tooltipType,
  setTooltipType,
  tooltipSize,
  setTooltipSize,
  tooltipTone,
  setTooltipTone,
  tooltipTail,
  setTooltipTail,
  tooltipLeftIcon,
  setTooltipLeftIcon,
  tooltipDismissible,
  setTooltipDismissible,
  tooltipVisible,
  setTooltipVisible,
  alertSeverity,
  setAlertSeverity,
  alertSize,
  setAlertSize,
  alertStyle,
  setAlertStyle,
  alertDismissible,
  setAlertDismissible,
  badgeType,
  setBadgeType,
  badgeStyle,
  setBadgeStyle,
  badgeColor,
  setBadgeColor,
  badgeSize,
  setBadgeSize,
  badgeNumber,
  setBadgeNumber,
  badgeDisabled,
  setBadgeDisabled,
  datePickerMode,
  setDatePickerMode,
  datePickerShowTimeFilters,
  setDatePickerShowTimeFilters,
  datePickerShowFooter,
  setDatePickerShowFooter,
  paginationType,
  setPaginationType,
  paginationShowFirstLast,
  setPaginationShowFirstLast,
  paginationShowPrevNext,
  setPaginationShowPrevNext,
  paginationShowAdvanced,
  setPaginationShowAdvanced,
  paginationPageSize,
  setPaginationPageSize,
  progressVariant,
  setProgressVariant,
  progressTone,
  setProgressTone,
  progressLineSize,
  setProgressLineSize,
  progressCircleSize,
  setProgressCircleSize,
  progressValue,
  setProgressValue,
  progressShowValue,
  setProgressShowValue,
  progressLabelPlacement,
  setProgressLabelPlacement,
  progressShowDescription,
  setProgressShowDescription,
  progressShowAction,
  setProgressShowAction,
  richEditorVariant,
  setRichEditorVariant,
  richEditorShowMore,
  setRichEditorShowMore,
  richEditorDisabled,
  setRichEditorDisabled,
  colorPickerFormat,
  setColorPickerFormat,
  colorPickerShowRecommended,
  setColorPickerShowRecommended,
  colorPickerDisabled,
  setColorPickerDisabled,
  dividerOrientation,
  setDividerOrientation,
  dividerStroke,
  setDividerStroke,
  dividerLabel,
  setDividerLabel,
  dividerInset,
  setDividerInset,
  dividerThickness,
  setDividerThickness,
  iconQuery,
  setIconQuery,
  iconStyleVariant,
  setIconStyleVariant,
  iconCloudResults,
  avatarQuery,
  setAvatarQuery,
  avatarSeed,
  setAvatarSeed,
  avatarCloudResults,
  logoQuery,
  setLogoQuery,
  logoCloudResults,
  apiPropRows,
  genericEnumRows,
  selectedPreviewStateConfig,
  blockPrompt,
  installCommand,
  importSnippet,
  usageSnippet,
  configSnippet,
  relatedComponents,
  brandLogoSrc,
  selectComponent,
  copyAndFlash,
}: ComponentDetailsViewProps) {
  return (
    <>
      <div className="component-page-tabs">
        <button type="button" className="component-page-tab is-active">Guides</button>
        <button type="button" className="component-page-tab" onClick={() => setView("api-reference")}>API Reference</button>
        <button type="button" className="component-page-tab" onClick={() => setView("code-export")}>Code</button>
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
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{marginRight:"0.35rem"}}><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2"/><circle cx="7.5" cy="14.5" r="1.5"/><circle cx="16.5" cy="14.5" r="1.5"/></svg>
            Copy AI Prompt
          </Button>
          <Button variant="secondary" onClick={() => copyAndFlash("Install command", installCommand)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{marginRight:"0.35rem"}}><polyline points="8 17 12 21 16 17"/><line x1="12" y1="3" x2="12" y2="21"/></svg>
            Copy Install
          </Button>
        </div>
      </section>


      {/* ── When to use ───────────────────────────────────────── */}
      <section id="when-to-use" className="doc-section">
        <div className="section-heading">
          <h2>When to use</h2>
          <p>Design guidance for using {selectedEntry.name} correctly in your product.</p>
        </div>
        <div className="wtu-grid">
          <div className="wtu-card wtu-card--do">
            <div className="wtu-card-header">
              <span className="wtu-icon wtu-icon--do" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/></svg>
              </span>
              <span>Do</span>
            </div>
            <ul className="wtu-list">
              {selectedEntry.aiHints.positive.map((hint, i) => (
                <li key={i}>{hint}</li>
              ))}
            </ul>
          </div>
          <div className="wtu-card wtu-card--avoid">
            <div className="wtu-card-header">
              <span className="wtu-icon wtu-icon--avoid" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"/></svg>
              </span>
              <span>Avoid</span>
            </div>
            <ul className="wtu-list">
              {selectedEntry.aiHints.negative.map((hint, i) => (
                <li key={i}>{hint}</li>
              ))}
            </ul>
          </div>
          {selectedEntry.a11yNotes.length > 0 && (
            <div className="wtu-card wtu-card--a11y">
              <div className="wtu-card-header">
                <span className="wtu-icon wtu-icon--a11y" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.25a9.75 9.75 0 110 19.5 9.75 9.75 0 010-19.5zm0 5.25a.75.75 0 00-.75.75v4.5a.75.75 0 001.5 0v-4.5A.75.75 0 0012 7.5zm0 9a.75.75 0 100-1.5.75.75 0 000 1.5z"/></svg>
                </span>
                <span>Accessibility</span>
              </div>
              <ul className="wtu-list">
                {selectedEntry.a11yNotes.map((note, i) => (
                  <li key={i}>{note}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section id="examples" className="doc-section">
        <div className="section-heading">
          <h2>Examples</h2>
          <p>Live preview of all component states and variants.</p>
        </div>

        {selectedPreviewStateConfig && selectedEntry.id !== "alert" && selectedEntry.id !== "accordion" && selectedEntry.id !== "tooltip" ? (
              <div className="preview-toolbar">
                <label className="field compact preview-state-field">
                  <span>{selectedPreviewStateConfig.label}</span>
                  <select
                    value={previewState}
                    onChange={(event) => setPreviewState(event.target.value as PreviewStateKey)}
                  >
                    {selectedPreviewStateConfig.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
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
                        setButtonGroupActiveIndex(Math.min(buttonGroupActiveIndex, next - 1));
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

      {apiPropRows.length > 0 && (
        <section id="customize" className="doc-section">
          <div className="section-heading">
            <h2>Props</h2>
            <p>Full prop reference for {selectedEntry.name}.</p>
          </div>
          <div className="component-edit-table">
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
                      {row.type === "enum" && row.acceptedValues && row.acceptedValues !== "See type union" ? (
                        <div className="prop-type-col">
                          <span className="prop-type-badge prop-type-badge--enum">enum</span>
                          <div className="prop-enum-chips">
                            {row.acceptedValues.split(", ").map(v => (
                              <code key={v} className="prop-enum-chip">{v}</code>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <span className={`prop-type-badge prop-type-badge--${row.type}`}>
                          {row.type}
                        </span>
                      )}
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

      <section id="use" className="doc-section">
        <div className="section-heading">
          <h2>AI Prompt</h2>
          <p>Paste into Claude, Cursor, Codex, or any AI coding assistant to generate a production-ready {selectedEntry.name}.</p>
        </div>
        <SnippetItem
          label={`prompt · ${selectedEntry.name}`}
          code={blockPrompt}
          onCopy={() => copyAndFlash("AI block prompt", blockPrompt)}
        />
      </section>

      {/* ── States showcase ───────────────────────────────────── */}
      {(["button", "data-table", "skeleton", "avatar", "command-bar", "combo-box"].includes(selectedEntry.id)) && (
        <section id="states" className="doc-section">
          <div className="section-heading">
            <h2>States</h2>
            <p>
              {selectedEntry.name} ships with built-in loading and empty state support. Use these patterns when data is in-flight or unavailable.
            </p>
          </div>
          <div className="states-grid">
            {selectedEntry.id === "button" && (
              <>
                <div className="state-card">
                  <p className="state-card-label">Loading</p>
                  <div className="state-card-preview">
                    <Button loading variant="primary">Saving…</Button>
                  </div>
                  <code className="state-card-snippet">{"<Button loading>Saving…</Button>"}</code>
                  <p className="state-card-desc">Pass <code>loading</code> to show a spinner and disable interaction. Keep the label meaningful — "Saving…" beats "Submit".</p>
                </div>
                <div className="state-card">
                  <p className="state-card-label">Disabled</p>
                  <div className="state-card-preview">
                    <Button disabled variant="primary">Disabled</Button>
                  </div>
                  <code className="state-card-snippet">{"<Button disabled>Disabled</Button>"}</code>
                  <p className="state-card-desc">Use <code>disabled</code> when the action isn't currently available. Avoid disabled buttons as the primary path — prefer showing why.</p>
                </div>
              </>
            )}
            {selectedEntry.id === "skeleton" && (
              <>
                <div className="state-card">
                  <p className="state-card-label">Text lines</p>
                  <div className="state-card-preview" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <Skeleton width={200} height={14} />
                    <Skeleton width={160} height={14} />
                    <Skeleton width={120} height={14} />
                  </div>
                  <code className="state-card-snippet">{"<Skeleton width={200} height={14} />"}</code>
                  <p className="state-card-desc">Use stacked Skeletons to approximate the final text layout while content loads. Match width to expected line lengths.</p>
                </div>
                <div className="state-card">
                  <p className="state-card-label">Avatar placeholder</p>
                  <div className="state-card-preview" style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                    <Skeleton width={40} height={40} radius="full" />
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                      <Skeleton width={120} height={12} />
                      <Skeleton width={80} height={10} />
                    </div>
                  </div>
                  <code className="state-card-snippet">{'<Skeleton width={40} height={40} radius="full" />'}</code>
                  <p className="state-card-desc">Combine a circular Skeleton with line Skeletons to represent a user row loading state.</p>
                </div>
              </>
            )}
            {selectedEntry.id === "avatar" && (
              <div className="state-card">
                <p className="state-card-label">Loading skeleton</p>
                <div className="state-card-preview" style={{ display: "flex", gap: "0.5rem" }}>
                  <Avatar name="Loading User" size={32} loading />
                  <Avatar name="Loading User" size={40} loading />
                  <Avatar name="Loading User" size={48} loading />
                </div>
                <code className="state-card-snippet">{"<Avatar name=\"User\" loading />"}</code>
                <p className="state-card-desc">Pass <code>loading</code> to show a skeleton placeholder while the user's profile data is fetched.</p>
              </div>
            )}
            {selectedEntry.id === "data-table" && (
              <>
                <div className="state-card">
                  <p className="state-card-label">Loading</p>
                  <div className="state-card-preview">
                    <p className="state-card-note">Pass <code>loading</code> to show shimmer rows while data fetches. The table preserves column layout and height.</p>
                  </div>
                  <code className="state-card-snippet">{"<DataTable columns={cols} rows={[]} loading />"}</code>
                  <p className="state-card-desc">Always show at least 3–5 shimmer rows. Use the same column count as the loaded state to avoid layout shift.</p>
                </div>
                <div className="state-card">
                  <p className="state-card-label">Empty state</p>
                  <div className="state-card-preview">
                    <p className="state-card-note">Pass <code>emptyMessage</code> and <code>emptyAction</code> to guide users when no rows exist.</p>
                  </div>
                  <code className="state-card-snippet">{'<DataTable columns={cols} rows={[]} emptyMessage="No results" />'}</code>
                  <p className="state-card-desc">Empty states should explain why there's nothing and offer an action — "Add your first item" beats "No data".</p>
                </div>
              </>
            )}
            {selectedEntry.id === "command-bar" && (
              <div className="state-card">
                <p className="state-card-label">Loading results</p>
                <div className="state-card-preview">
                  <p className="state-card-note">Pass <code>loading</code> to show a spinner while async search results are fetched.</p>
                </div>
                <code className="state-card-snippet">{"<CommandBar loading items={[]} />"}</code>
                <p className="state-card-desc">Show the loading state after a debounce delay (≥200ms) to avoid flicker on fast connections.</p>
              </div>
            )}
            {selectedEntry.id === "combo-box" && (
              <div className="state-card">
                <p className="state-card-label">Loading options</p>
                <div className="state-card-preview">
                  <p className="state-card-note">Pass <code>loading</code> to show a spinner in the dropdown while async options are fetched.</p>
                </div>
                <code className="state-card-snippet">{"<ComboBox loading options={[]} />"}</code>
                <p className="state-card-desc">Use for server-side option fetching. Debounce the trigger at 200ms to avoid excessive requests.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Related components ────────────────────────────────── */}
      {relatedComponents.length > 0 && (
        <section id="related" className="doc-section">
          <div className="section-heading">
            <h2>Related components</h2>
            <p>Components that pair well with {selectedEntry.name}.</p>
          </div>
          <div className="related-grid">
            {relatedComponents.map(entry => (
              <button
                key={entry.id}
                type="button"
                className="related-card"
                onClick={() => selectComponent(entry.id)}
              >
                <div className="related-card-header">
                  <span className="related-card-name">{entry.name}</span>
                  <span className="related-card-cat">{entry.category}</span>
                </div>
                <p className="related-card-desc">{entry.description}</p>
              </button>
            ))}
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
  );
}
