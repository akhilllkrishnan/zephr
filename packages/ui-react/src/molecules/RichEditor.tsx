import { CSSProperties, ReactNode } from "react";

export type RichEditorVariant = "01" | "02" | "03" | "04";
export type RichEditorAction =
  | "header"
  | "font-size"
  | "bold"
  | "italic"
  | "underline"
  | "strikethrough"
  | "align"
  | "comment"
  | "link"
  | "mention"
  | "more";

export interface RichEditorProps {
  variant?: RichEditorVariant;
  showMore?: boolean;
  headerLabel?: string;
  fontSizeLabel?: string;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  onAction?: (action: RichEditorAction) => void;
}

interface ItemButtonProps {
  label?: string;
  icon?: ReactNode;
  dropdown?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

function iconLabel(action: RichEditorAction): ReactNode {
  if (action === "bold") return <span style={{ fontWeight: 700 }}>B</span>;
  if (action === "italic") return <span style={{ fontStyle: "italic" }}>I</span>;
  if (action === "underline") return <span style={{ textDecoration: "underline" }}>U</span>;
  if (action === "strikethrough") return <span style={{ textDecoration: "line-through" }}>S</span>;
  if (action === "align") return <span style={{ letterSpacing: "-0.04em" }}>|||</span>;
  if (action === "comment") return <span>( )</span>;
  if (action === "link") return <span>oo</span>;
  if (action === "mention") return <span>@</span>;
  return <span>...</span>;
}

function ItemButton({
  label,
  icon,
  dropdown = false,
  disabled = false,
  onClick
}: ItemButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      style={{
        border: 0,
        background: "var(--z-color-background0, #ffffff)",
        borderRadius: "6px",
        minHeight: "28px",
        padding: label ? "4px 4px 4px 10px" : "4px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "2px",
        color: "var(--z-color-muted, #5c5c5c)",
        fontSize: "14px",
        lineHeight: "20px",
        fontWeight: 500,
        letterSpacing: "-0.006em",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1
      }}
    >
      {label ? <span>{label}</span> : null}
      {icon ? (
        <span
          aria-hidden
          style={{
            width: "20px",
            height: "20px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {icon}
        </span>
      ) : null}
      {dropdown ? (
        <span
          aria-hidden
          style={{
            width: "20px",
            height: "20px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px"
          }}
        >
          v
        </span>
      ) : null}
    </button>
  );
}

function Divider() {
  return (
    <span
      aria-hidden
      style={{
        width: "4px",
        height: "16px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <span
        style={{
          width: "1px",
          height: "100%",
          background: "var(--z-color-stroke200, #ebebeb)"
        }}
      />
    </span>
  );
}

export function RichEditor({
  variant = "01",
  showMore = true,
  headerLabel = "Header",
  fontSizeLabel = "14px",
  disabled = false,
  className,
  style,
  onAction
}: RichEditorProps) {
  const is01 = variant === "01";
  const is02 = variant === "02";
  const is03 = variant === "03";
  const is04 = variant === "04";

  const quickTextTools = (
    <>
      <ItemButton
        icon={iconLabel("bold")}
        disabled={disabled}
        onClick={() => onAction?.("bold")}
      />
      <ItemButton
        icon={iconLabel("italic")}
        disabled={disabled}
        onClick={() => onAction?.("italic")}
      />
      <ItemButton
        icon={iconLabel("underline")}
        disabled={disabled}
        onClick={() => onAction?.("underline")}
      />
      <ItemButton
        icon={iconLabel("strikethrough")}
        disabled={disabled}
        onClick={() => onAction?.("strikethrough")}
      />
    </>
  );

  const socialTools = (
    <>
      <ItemButton
        icon={iconLabel("comment")}
        disabled={disabled}
        onClick={() => onAction?.("comment")}
      />
      <ItemButton
        icon={iconLabel("link")}
        disabled={disabled}
        onClick={() => onAction?.("link")}
      />
      <ItemButton
        icon={iconLabel("mention")}
        disabled={disabled}
        onClick={() => onAction?.("mention")}
      />
    </>
  );

  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "2px",
        padding: "2px",
        border: "1px solid var(--z-color-stroke200, #ebebeb)",
        borderRadius: "8px",
        background: "var(--z-color-background0, #ffffff)",
        boxShadow: "0 1px 2px rgba(10, 13, 20, 0.03)",
        overflow: "hidden",
        ...style
      }}
    >
      {(is01 || is02) ? (
        <>
          <ItemButton
            label={headerLabel}
            dropdown
            disabled={disabled}
            onClick={() => onAction?.("header")}
          />
          <Divider />
          <ItemButton
            label={fontSizeLabel}
            dropdown
            disabled={disabled}
            onClick={() => onAction?.("font-size")}
          />
        </>
      ) : null}

      {is01 ? <Divider /> : null}
      {is01 ? quickTextTools : null}

      {is03 ? quickTextTools : null}

      {(is01 || is03) ? (
        <>
          <Divider />
          <ItemButton
            icon={iconLabel("align")}
            dropdown
            disabled={disabled}
            onClick={() => onAction?.("align")}
          />
        </>
      ) : null}

      {(is01 || is04) ? socialTools : null}

      {(showMore && (is01 || is02 || is03 || is04)) ? (
        <>
          <Divider />
          <ItemButton
            icon={iconLabel("more")}
            disabled={disabled}
            onClick={() => onAction?.("more")}
          />
        </>
      ) : null}
    </div>
  );
}
