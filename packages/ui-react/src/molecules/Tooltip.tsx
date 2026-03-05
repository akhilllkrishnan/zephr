"use client";
import {
  CSSProperties,
  ReactNode,
  useEffect,
  useId,
  useRef,
  useState
} from "react";

type TooltipSide = "top" | "bottom" | "left" | "right";
type TooltipAlign = "start" | "center" | "end";
type TooltipVariant = "light" | "dark";
type TooltipSize = "2xs" | "xs" | "lg";

export interface TooltipProps {
  /** The content shown inside the tooltip bubble */
  content: ReactNode;
  /** Optional supporting text for larger tooltips */
  description?: ReactNode;
  /** The element that triggers the tooltip */
  children: ReactNode;
  /** Placement relative to the trigger */
  side?: TooltipSide;
  /** Alignment on the perpendicular axis */
  align?: TooltipAlign;
  /** Delay before showing (ms) */
  delayMs?: number;
  /** Color tone */
  variant?: TooltipVariant;
  /** Visual size */
  size?: TooltipSize;
  /** Show caret */
  showTail?: boolean;
  /** Show leading icon (large only) */
  showIcon?: boolean;
  /** Show dismiss icon (large only) */
  dismissible?: boolean;
  /** Force visibility for previews */
  open?: boolean;
  className?: string;
  style?: CSSProperties;
}

function bubblePlacement(side: TooltipSide, align: TooltipAlign, gap: number): CSSProperties {
  if (side === "top") {
    return {
      bottom: `calc(100% + ${gap}px)`,
      left: align === "start" ? "0%" : align === "end" ? "100%" : "50%",
      transform: align === "start" ? "translateX(0)" : align === "end" ? "translateX(-100%)" : "translateX(-50%)"
    };
  }

  if (side === "bottom") {
    return {
      top: `calc(100% + ${gap}px)`,
      left: align === "start" ? "0%" : align === "end" ? "100%" : "50%",
      transform: align === "start" ? "translateX(0)" : align === "end" ? "translateX(-100%)" : "translateX(-50%)"
    };
  }

  if (side === "left") {
    return {
      right: `calc(100% + ${gap}px)`,
      top: align === "start" ? "0%" : align === "end" ? "100%" : "50%",
      transform: align === "start" ? "translateY(0)" : align === "end" ? "translateY(-100%)" : "translateY(-50%)"
    };
  }

  return {
    left: `calc(100% + ${gap}px)`,
    top: align === "start" ? "0%" : align === "end" ? "100%" : "50%",
    transform: align === "start" ? "translateY(0)" : align === "end" ? "translateY(-100%)" : "translateY(-50%)"
  };
}

function tailPlacement(side: TooltipSide, align: TooltipAlign, sizePx: number): CSSProperties {
  const crossPosition =
    align === "start"
      ? "14px"
      : align === "end"
        ? "calc(100% - 14px)"
        : "50%";
  const half = `${Math.floor(sizePx / 2)}px`;

  if (side === "top") {
    return {
      left: crossPosition,
      top: "100%",
      marginTop: `-${half}`,
      transform: align === "center" ? "translateX(-50%) rotate(45deg)" : "rotate(45deg)"
    };
  }

  if (side === "bottom") {
    return {
      left: crossPosition,
      bottom: "100%",
      marginBottom: `-${half}`,
      transform: align === "center" ? "translateX(-50%) rotate(45deg)" : "rotate(45deg)"
    };
  }

  if (side === "left") {
    return {
      top: crossPosition,
      left: "100%",
      marginLeft: `-${half}`,
      transform: align === "center" ? "translateY(-50%) rotate(45deg)" : "rotate(45deg)"
    };
  }

  return {
    top: crossPosition,
    right: "100%",
    marginRight: `-${half}`,
    transform: align === "center" ? "translateY(-50%) rotate(45deg)" : "rotate(45deg)"
  };
}

export function Tooltip({
  content,
  description,
  children,
  side = "top",
  align = "center",
  delayMs = 300,
  variant = "dark",
  size = "xs",
  showTail = true,
  showIcon = false,
  dismissible = false,
  open,
  className,
  style
}: TooltipProps) {
  const [hoverVisible, setHoverVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const id = useId();
  const isControlled = typeof open === "boolean";
  const visible = isControlled ? open : hoverVisible;
  const isLarge = size === "lg";
  const showCompactMeta = !isLarge && (showIcon || dismissible);

  function show() {
    if (isControlled) return;
    timerRef.current = setTimeout(() => setHoverVisible(true), delayMs);
  }

  function hide() {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (isControlled) return;
    setHoverVisible(false);
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const gap = size === "2xs" ? 4 : 6;
  const tailSize = size === "2xs" ? 8 : 10;
  const palette =
    variant === "dark"
      ? {
          background: "var(--z-color-text, #171717)",
          text: "var(--z-color-staticWhite, #ffffff)",
          subText: "var(--z-color-text300, #a3a3a3)",
          border: "transparent"
        }
      : {
          background: "var(--z-color-surface, #ffffff)",
          text: "var(--z-color-text, #171717)",
          subText: "var(--z-color-muted, #5c5c5c)",
          border: "var(--z-color-border, #ebebeb)"
        };

  const sizeStyle: CSSProperties =
    size === "2xs"
      ? {
          padding: "2px 6px",
          borderRadius: "4px",
          fontSize: "12px",
          lineHeight: "16px"
        }
      : size === "xs"
        ? {
            padding: "4px 10px",
            borderRadius: "6px",
            fontSize: "14px",
            lineHeight: "20px"
          }
        : {
            padding: "12px",
            borderRadius: "12px",
            width: "280px",
            fontSize: "14px",
            lineHeight: "20px"
          };

  const tipStyle: CSSProperties = {
    position: "absolute",
    zIndex: 500,
    whiteSpace: size === "lg" ? "normal" : "nowrap",
    pointerEvents: visible ? "auto" : "none",
    background: palette.background,
    color: palette.text,
    border: `1px solid ${palette.border}`,
    boxShadow: "0 12px 24px rgba(14, 18, 27, 0.06), 0 1px 2px rgba(14, 18, 27, 0.03)",
    opacity: visible ? 1 : 0,
    transition: "opacity 120ms ease",
    ...sizeStyle,
    ...bubblePlacement(side, align, gap)
  };

  const caretStyle: CSSProperties = {
    position: "absolute",
    width: `${tailSize}px`,
    height: `${tailSize}px`,
    background: palette.background,
    border: `1px solid ${palette.border}`,
    ...tailPlacement(side, align, tailSize)
  };

  return (
    <span
      className={className}
      style={{ position: "relative", display: "inline-flex", ...style }}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      <span aria-describedby={visible ? id : undefined} style={{ display: "inherit" }}>
        {children}
      </span>
      <span id={id} role="tooltip" aria-hidden={!visible} style={tipStyle}>
        {showTail ? <span aria-hidden style={caretStyle} /> : null}
        {isLarge ? (
          <span style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
            {showIcon ? (
              <span
                aria-hidden
                style={{
                  width: "20px",
                  minWidth: "20px",
                  height: "20px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  lineHeight: 1,
                  opacity: 0.9
                }}
              >
                +
              </span>
            ) : null}
            <span style={{ display: "grid", gap: "4px", flex: 1, minWidth: 0 }}>
              <span style={{ fontSize: "14px", lineHeight: "20px", fontWeight: 500 }}>{content}</span>
              {description ? (
                <span style={{ fontSize: "12px", lineHeight: "16px", color: palette.subText }}>
                  {description}
                </span>
              ) : null}
            </span>
            {dismissible ? (
              <span
                aria-hidden
                style={{
                  width: "20px",
                  minWidth: "20px",
                  height: "20px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  lineHeight: 1,
                  opacity: 0.8
                }}
              >
                x
              </span>
            ) : null}
          </span>
        ) : (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            {showCompactMeta && showIcon ? (
              <span
                aria-hidden
                style={{
                  width: "12px",
                  height: "12px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "11px",
                  lineHeight: 1,
                  opacity: 0.85
                }}
              >
                •
              </span>
            ) : null}
            <span>{content}</span>
            {showCompactMeta && dismissible ? (
              <span
                aria-hidden
                style={{
                  width: "12px",
                  height: "12px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "11px",
                  lineHeight: 1,
                  opacity: 0.85
                }}
              >
                x
              </span>
            ) : null}
          </span>
        )}
      </span>
    </span>
  );
}
