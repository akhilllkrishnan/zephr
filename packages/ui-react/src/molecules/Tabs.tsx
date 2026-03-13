"use client";
import { CSSProperties, ReactNode, useMemo, useState } from "react";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  initialTabId?: string;
  className?: string;
  style?: CSSProperties;
}

export function Tabs({ items, initialTabId, className, style }: TabsProps) {
  const initialId = useMemo(() => initialTabId ?? items[0]?.id, [initialTabId, items]);
  const [activeId, setActiveId] = useState(initialId);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const active = items.find((item) => item.id === activeId) ?? items[0];

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--z-space-3, 0.75rem)",
        ...style
      }}
    >
      <div
        role="tablist"
        aria-label="Tabs"
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "var(--z-space-2, 0.5rem)"
        }}
      >
        {items.map((item) => {
          const isActive = active?.id === item.id;
          const isHovered = hoveredId === item.id && !item.disabled;
          const isFocused = focusedId === item.id && !item.disabled;

          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              disabled={item.disabled}
              style={{
                minHeight: "32px",
                padding: "6px 14px",
                borderRadius: "999px",
                border: "1px solid transparent",
                background: isActive
                  ? "var(--z-color-text, #171717)"
                  : isHovered
                    ? "var(--z-color-border, #ebebeb)"
                    : "var(--z-color-weak, var(--z-color-background, #f7f7f7))",
                color: isActive
                  ? "var(--z-color-primaryContrast, #ffffff)"
                  : item.disabled
                    ? "var(--z-color-text300, #a1a1aa)"
                    : "var(--z-color-text, #171717)",
                fontSize: "14px",
                fontWeight: "var(--z-type-weight-medium, 500)" as CSSProperties["fontWeight"],
                lineHeight: "20px",
                letterSpacing: "-0.006em",
                cursor: item.disabled ? "not-allowed" : "pointer",
                outline: "none",
                transform: !item.disabled && !isActive && isHovered ? "translateY(-1px)" : "translateY(0)",
                boxShadow: isFocused
                  ? "0 0 0 2px var(--z-color-surface, #ffffff), 0 0 0 4px rgba(153, 160, 174, 0.22)"
                  : "none",
                transition: "background 140ms ease, color 140ms ease, transform 90ms ease, box-shadow 140ms ease",
                opacity: item.disabled ? 0.5 : 1
              }}
              onClick={() => !item.disabled && setActiveId(item.id)}
              onMouseEnter={() => !item.disabled && setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={(event) => !item.disabled && setFocusedId(event.currentTarget.matches(":focus-visible") ? item.id : null)}
              onBlur={() => setFocusedId(null)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        style={{
          padding: "14px",
          border: "1px solid var(--z-color-border, #ebebeb)",
          borderRadius: "10px",
          background: "var(--z-color-surface, #ffffff)",
          color: "var(--z-color-text, #171717)"
        }}
      >
        {active?.content}
      </div>
    </div>
  );
}
