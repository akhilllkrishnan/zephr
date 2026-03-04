"use client";
import { CSSProperties, useState } from "react";

export interface BreadcrumbItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: string;
  className?: string;
  style?: CSSProperties;
}

export function Breadcrumbs({ items, separator = "/", className, style }: BreadcrumbsProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);

  return (
    <nav aria-label="Breadcrumb" className={className} style={style}>
      <ol
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "var(--z-space-2, 0.5rem)",
          listStyle: "none",
          margin: 0,
          padding: 0
        }}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isHovered = hoveredId === item.id;
          const isFocused = focusedId === item.id;
          const isInteractive = !isLast && (item.href != null || item.onClick != null);

          return (
            <li
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--z-space-2, 0.5rem)"
              }}
            >
              {isInteractive ? (
                item.href ? (
                  <a
                    href={item.href}
                    onClick={item.onClick}
                    aria-current={isLast ? "page" : undefined}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onFocus={() => setFocusedId(item.id)}
                    onBlur={() => setFocusedId(null)}
                    style={{
                      color: isHovered
                        ? "var(--z-color-text, #171717)"
                        : "var(--z-color-primary, #335cff)",
                      textDecoration: isHovered ? "underline" : "none",
                      borderRadius: "4px",
                      outline: "none",
                      boxShadow: isFocused
                        ? "0 0 0 2px var(--z-color-surface, #ffffff), 0 0 0 4px rgba(153, 160, 174, 0.22)"
                        : "none",
                      transition: "color 120ms ease, text-decoration 120ms ease"
                    }}
                  >
                    {item.label}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={item.onClick}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onFocus={() => setFocusedId(item.id)}
                    onBlur={() => setFocusedId(null)}
                    style={{
                      border: "none",
                      background: "transparent",
                      padding: 0,
                      cursor: "pointer",
                      color: isHovered
                        ? "var(--z-color-text, #171717)"
                        : "var(--z-color-primary, #335cff)",
                      textDecoration: isHovered ? "underline" : "none",
                      fontSize: "inherit",
                      borderRadius: "4px",
                      outline: "none",
                      boxShadow: isFocused
                        ? "0 0 0 2px var(--z-color-surface, #ffffff), 0 0 0 4px rgba(153, 160, 174, 0.22)"
                        : "none",
                      transition: "color 120ms ease"
                    }}
                  >
                    {item.label}
                  </button>
                )
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  style={{
                    color: isLast
                      ? "var(--z-color-text, #171717)"
                      : "var(--z-color-muted, #5c5c5c)"
                  }}
                >
                  {item.label}
                </span>
              )}
              {!isLast ? (
                <span aria-hidden style={{ color: "var(--z-color-muted, #5c5c5c)" }}>
                  {separator}
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
