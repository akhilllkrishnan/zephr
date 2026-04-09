import React, { CSSProperties, useState } from "react";
import {
  Accordion,
  Alert,
  AlertDialog,
  AuthPage,
  Avatar,
  AvatarLibrary,
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
  IconLibrary,
  Input,
  InputGroup,
  LayoutShell,
  Logo,
  LogoLibrary,
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
  Textarea
} from "@zephrui/ui-react";
import type { RegistryEntry } from "@zephrui/ai-registry";
import type { AvatarStyleDefinition } from "@zephrui/avatars";
import type { MaterialIconDefinition, MaterialIconStyle } from "@zephrui/icons-material";
import type { LogoCatalogEntry } from "@zephrui/logos";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  squad: string;
}

export type ButtonGroupQuantityOption = 2 | 3 | 4 | 5 | 6;
export type ButtonGroupSizeOption = "sm" | "xs" | "2xs";
export type PreviewStateKey =
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

export type AlertSeverityOption = "red" | "yellow" | "green" | "blue" | "grey";
export type AlertSizeOption = "small" | "wide" | "toast";
export type AlertStyleOption = "solid" | "light" | "stroke";
export type AccordionStateOption = "default" | "hover" | "active";
export type TooltipTypeOption =
  "top-left" |
  "top-center" |
  "top-right" |
  "bottom-left" |
  "bottom-center" |
  "bottom-right" |
  "right" |
  "left";
export type TooltipSizeOption = "2xs" | "xs" | "large";
export type TooltipToneOption = "light" | "dark";
export type SwitchPatternOption = "switch" | "switch-label" | "switch-card";
export type SwitchStateOption = "default" | "hover" | "pressed" | "disabled";
export type SwitchCardTypeOption = "basic" | "left-icon" | "avatar";
export type DividerOrientationOption = "horizontal" | "vertical";
export type DividerStrokeOption = "solid" | "dashed" | "dotted";
export type DividerLabelOption = "none" | "text" | "chip";
export type DividerInsetOption = "none" | "sm" | "md";
export type DatePickerModeOption = "single" | "range";
export type ColorPickerFormatOption = "hex" | "rgb" | "hsl";
export type PaginationTypeOption = "basic" | "group" | "full-radius";
export type ProgressVariantOption = "line" | "line-label" | "circle";
export type ProgressToneOption = "primary" | "success" | "danger" | "warning" | "neutral";
export type ProgressLineSizeOption = "sm" | "md" | "lg";
export type ProgressCircleSizeOption = 48 | 56 | 64 | 72 | 80;
export type ProgressLabelPlacementOption = "top" | "right";
export type RichEditorVariantOption = "01" | "02" | "03" | "04";
export type BadgeTypeOption = "basic" | "dot" | "left-icon" | "right-icon";
export type BadgeStyleOption = "filled" | "lighter" | "stroke" | "white";
export type BadgeColorOption =
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

export const tableRows: TeamMember[] = [
  { id: "1", name: "Akhil Krishnan", role: "Product Designer", squad: "Core" },
  { id: "2", name: "Maya Carter", role: "Frontend Engineer", squad: "Platform" },
  { id: "3", name: "Noah Kim", role: "Design Systems", squad: "Identity" },
  { id: "4", name: "Liam Torres", role: "Product Manager", squad: "Growth" },
  { id: "5", name: "Ivy Singh", role: "Developer Advocate", squad: "Community" }
];

export function PreviewSurface({
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
  buttonSize: "xs" | "sm" | "md" | "lg";
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
  btnFilterSize: "all" | "xs" | "sm" | "md" | "lg";
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
    const allSizes: Array<"xs" | "sm" | "md" | "lg"> = ["xs", "sm", "md", "lg"];
    const allStates: Array<"default" | "hover" | "pressed" | "loading" | "disabled"> = ["default", "hover", "pressed", "loading", "disabled"];

    const activeVariants = btnFilterType === "all" ? allVariants : [btnFilterType];
    const activeSizes = btnFilterSize === "all" ? ["md" as const] : [btnFilterSize];
    const activeStates = btnFilterState === "all" ? ["default" as const] : [btnFilterState];

    const cells: Array<{ variant: "primary" | "secondary" | "ghost" | "danger"; size: "xs" | "sm" | "md" | "lg"; state: "default" | "hover" | "pressed" | "loading" | "disabled"; label: string }> = [];

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

    const iconPlaceholder = <span className="ms">star</span>;

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
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <Checkbox
            label="Enable release notifications"
            checked={checkboxChecked}
            onChange={(event) => setCheckboxChecked(event.target.checked)}
          />
          <Checkbox label="Send weekly digest" />
          <Checkbox label="Indeterminate selection" indeterminate />
          <Checkbox label="Disabled option" disabled />
          <Checkbox label="Disabled and checked" checked disabled />
        </div>
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
        ? "1px solid var(--z-color-primary, #335cff)"
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

  if (entry.id === "tag") {
    const [tagItems, setTagItems] = useState(["React", "TypeScript", "Design System"]);
    return (
      <div className="preview-stack">
        <p>Tag block</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "center" }}>
            {tagItems.map((item) => (
              <Tag key={item} tagStyle="stroke" onDismiss={() => setTagItems(tagItems.filter(t => t !== item))}>
                {item}
              </Tag>
            ))}
          </div>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "center" }}>
            {["Design", "Engineering", "Product"].map((item) => (
              <Tag key={item} tagStyle="gray">{item}</Tag>
            ))}
          </div>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "center" }}>
            <Tag tagStyle="stroke" icon={<span className="ms" style={{ fontSize: "12px" }}>bolt</span>}>With icon</Tag>
            <Tag tagStyle="gray" disabled>Disabled</Tag>
          </div>
        </div>
        <p className="preview-note">Stroke: bordered white · Gray: filled · Dismiss: removes item from list</p>
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
