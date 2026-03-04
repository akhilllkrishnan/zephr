import { CSSProperties } from "react";

export interface LogoProps {
  name: string;
  src?: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
}

function fallbackLogo(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((value) => value[0]?.toUpperCase() ?? "")
    .join("");
}

export function Logo({ name, src, size = 32, className, style }: LogoProps) {
  const baseStyle: CSSProperties = {
    width: size,
    height: size,
    borderRadius: "var(--z-radius-sm, 0.25rem)",
    flexShrink: 0
  };

  if (src) {
    return (
      <img
        src={src}
        alt={`${name} logo`}
        className={className}
        style={{ ...baseStyle, objectFit: "contain", ...style }}
      />
    );
  }

  return (
    <div
      aria-label={`${name} logo`}
      role="img"
      className={className}
      style={{
        ...baseStyle,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--z-color-accent, #fa7319)",
        color: "var(--z-color-primaryContrast, #ffffff)",
        fontWeight: 600,
        fontSize: Math.round(size * 0.4),
        userSelect: "none",
        ...style
      }}
    >
      {fallbackLogo(name)}
    </div>
  );
}
