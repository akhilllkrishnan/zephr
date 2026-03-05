"use client";
import { CSSProperties, FocusEvent, KeyboardEvent, MouseEvent, PointerEvent, ReactNode, useState } from "react";

export type AvatarStatus = "online" | "offline" | "busy";

export interface AvatarProps {
  name: string;
  src?: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
  /** Show a skeleton pulse instead of initials or image */
  loading?: boolean;
  /** Optional status indicator dot */
  status?: AvatarStatus;
  /** When provided, wraps in an accessible button with hover/focus/pressed states */
  onClick?: () => void;
  /** aria-label for the clickable wrapper button */
  buttonLabel?: string;
}

const STATUS_COLORS: Record<AvatarStatus, string> = {
  online: "#1fc16b",
  offline: "#8b949e",
  busy: "#fb3748"
};

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function AvatarImage({
  name,
  src,
  size,
  className,
  style,
  loading
}: Pick<AvatarProps, "name" | "src" | "size" | "className" | "style" | "loading">) {
  const baseStyle: CSSProperties = {
    width: size,
    height: size,
    borderRadius: "var(--z-radius-pill, 9999px)",
    flexShrink: 0
  };

  if (loading) {
    return (
      <>
        <style>{`@keyframes z-pulse { 0%,100%{opacity:1} 50%{opacity:.45} }`}</style>
        <div
          role="img"
          aria-label={`Loading ${name}`}
          className={className}
          style={{
            ...baseStyle,
            background: "var(--z-color-weak, #ebebeb)",
            animation: "z-pulse 1.4s ease-in-out infinite",
            ...style
          }}
        />
      </>
    );
  }

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={className}
        style={{
          ...baseStyle,
          border: "1px solid var(--z-color-border, #ebebeb)",
          objectFit: "cover",
          ...style
        }}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={name}
      className={className}
      style={{
        ...baseStyle,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--z-color-primary, #335cff)",
        color: "var(--z-color-primaryContrast, #ffffff)",
        fontWeight: 600,
        fontSize: Math.round((size ?? 40) * 0.35),
        userSelect: "none",
        ...style
      }}
    >
      {initials(name)}
    </div>
  );
}

export function Avatar({
  name,
  src,
  size = 40,
  className,
  style,
  loading = false,
  status,
  onClick,
  buttonLabel
}: AvatarProps) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [focused, setFocused] = useState(false);

  const inner: ReactNode = (
    <AvatarImage name={name} src={src} size={size} loading={loading} />
  );

  const statusDot = status ? (
    <span
      aria-hidden
      style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        width: Math.round(size * 0.28),
        height: Math.round(size * 0.28),
        borderRadius: "50%",
        background: STATUS_COLORS[status],
        border: "2px solid var(--z-color-surface, #ffffff)"
      }}
    />
  ) : null;

  if (onClick) {
    return (
      <button
        type="button"
        aria-label={buttonLabel ?? name}
        onClick={onClick}
        onPointerEnter={(e: PointerEvent<HTMLButtonElement>) => setHovered(true)}
        onPointerLeave={(e: PointerEvent<HTMLButtonElement>) => { setHovered(false); setPressed(false); }}
        onPointerDown={(e: PointerEvent<HTMLButtonElement>) => { if (e.button === 0) setPressed(true); }}
        onPointerUp={(e: PointerEvent<HTMLButtonElement>) => setPressed(false)}
        onFocus={(e: FocusEvent<HTMLButtonElement>) => setFocused(e.currentTarget.matches(":focus-visible"))}
        onBlur={(e: FocusEvent<HTMLButtonElement>) => { setFocused(false); setPressed(false); }}
        onKeyDown={(e: KeyboardEvent<HTMLButtonElement>) => {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setPressed(true); }
        }}
        onKeyUp={(e: KeyboardEvent<HTMLButtonElement>) => setPressed(false)}
        className={className}
        style={{
          position: "relative",
          display: "inline-flex",
          padding: 0,
          border: "none",
          background: "transparent",
          cursor: "pointer",
          borderRadius: "var(--z-radius-pill, 9999px)",
          outline: "none",
          transform: pressed ? "scale(0.93)" : hovered ? "scale(1.06)" : "scale(1)",
          transition: "transform 100ms ease, box-shadow 140ms ease",
          boxShadow: focused
            ? "0 0 0 2px var(--z-color-surface, #ffffff), 0 0 0 4px rgba(153, 160, 174, 0.22)"
            : "none",
          ...style
        }}
      >
        <AvatarImage name={name} src={src} size={size} loading={loading} />
        {statusDot}
      </button>
    );
  }

  return (
    <div
      className={className}
      style={{ position: "relative", display: "inline-flex", ...style }}
    >
      {inner}
      {statusDot}
    </div>
  );
}
