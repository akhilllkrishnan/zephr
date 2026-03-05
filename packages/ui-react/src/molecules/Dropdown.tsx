"use client";
import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";

export interface DropdownItem {
  id: string;
  label: string;
  icon?: ReactNode;
  onSelect: () => void;
  disabled?: boolean;
  /** Render as a destructive/danger-toned item */
  danger?: boolean;
}

export interface DropdownProps {
  label: string;
  items: DropdownItem[];
  align?: "start" | "end";
  className?: string;
  style?: CSSProperties;
  trigger?: ReactNode;
}

export function Dropdown({ label, items, align = "start", className, style, trigger }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!ref.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ position: "relative", display: "inline-block", ...style }}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((prev) => !prev)}
        style={{
          background: "transparent",
          border: "none",
          padding: 0,
          cursor: "pointer"
        }}
      >
        {trigger ?? label}
      </button>

      {open && (
        <ul
          role="menu"
          aria-label={label}
          style={{
            position: "absolute",
            [align === "end" ? "right" : "left"]: 0,
            top: "calc(100% + 6px)",
            minWidth: "12rem",
            zIndex: 200,
            background: "var(--z-color-surface, #ffffff)",
            border: "1px solid var(--z-color-border, #ebebeb)",
            borderRadius: "10px",
            boxShadow: "0 8px 24px rgba(14, 18, 27, 0.12), 0 2px 6px rgba(14, 18, 27, 0.06)",
            padding: "var(--z-space-1, 0.25rem)",
            listStyle: "none",
            margin: 0
          }}
        >
          {items.map((item) => {
            const isHovered = hoveredId === item.id && !item.disabled;
            const isFocused = focusedId === item.id && !item.disabled;

            return (
              <li key={item.id} role="none">
                <button
                  type="button"
                  role="menuitem"
                  disabled={item.disabled}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--z-space-2, 0.5rem)",
                    padding: "var(--z-space-2, 0.5rem) var(--z-space-3, 0.75rem)",
                    borderRadius: "8px",
                    border: 0,
                    background: isHovered
                      ? item.danger
                        ? "rgba(251, 55, 72, 0.08)"
                        : "var(--z-color-weak, var(--z-color-background, #f7f7f7))"
                      : "transparent",
                    color: item.disabled
                      ? "#b5b5b5"
                      : item.danger
                        ? "var(--z-color-danger, #fb3748)"
                        : "var(--z-color-text, #171717)",
                    fontSize: "14px",
                    lineHeight: "20px",
                    letterSpacing: "-0.006em",
                    cursor: item.disabled ? "not-allowed" : "pointer",
                    outline: "none",
                    boxShadow: isFocused
                      ? "0 0 0 2px var(--z-color-surface, #ffffff), 0 0 0 4px rgba(153, 160, 174, 0.18)"
                      : "none",
                    transition: "background 120ms ease, color 120ms ease"
                  }}
                  onClick={() => {
                    if (!item.disabled) {
                      item.onSelect();
                      setOpen(false);
                    }
                  }}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onFocus={(event) => setFocusedId(event.currentTarget.matches(":focus-visible") ? item.id : null)}
                  onBlur={() => setFocusedId(null)}
                >
                  {item.icon && (
                    <span aria-hidden style={{ display: "inline-flex", flexShrink: 0 }}>
                      {item.icon}
                    </span>
                  )}
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
