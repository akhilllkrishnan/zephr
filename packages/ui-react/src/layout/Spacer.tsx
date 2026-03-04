import { CSSProperties } from "react";

export interface SpacerProps {
  size?: string | number | "auto";
  axis?: "x" | "y" | "both";
  className?: string;
  style?: CSSProperties;
}

export function Spacer({ size = 4, axis = "both", className, style }: SpacerProps) {
  const resolvedSize =
    size === "auto"
      ? "auto"
      : typeof size === "number"
      ? `var(--z-space-${size}, ${size * 0.25}rem)`
      : size;

  const computedStyle: CSSProperties = {
    display: "block",
    width: axis === "y" ? undefined : resolvedSize,
    height: axis === "x" ? undefined : resolvedSize,
    flexShrink: 0,
    ...(size === "auto" && axis !== "x" && axis !== "y" ? { flex: 1 } : {}),
    ...style
  };

  return <span aria-hidden className={className} style={computedStyle} />;
}
