"use client";
import { CSSProperties, ReactNode, useMemo, useState } from "react";

export interface AccordionItem {
  id: string;
  title: string;
  description?: ReactNode;
  content?: ReactNode;
  disabled?: boolean;
  defaultOpen?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpenIds?: string[];
  iconPosition?: "left" | "right";
  /** Custom content when items array is empty */
  emptyState?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onValueChange?: (openIds: string[]) => void;
}

function isOpenItem(itemId: string, openIds: string[]): boolean {
  return openIds.includes(itemId);
}

export function Accordion({
  items,
  allowMultiple = false,
  defaultOpenIds,
  iconPosition = "right",
  emptyState,
  className,
  style,
  onValueChange
}: AccordionProps) {
  const initialOpenIds = useMemo(() => {
    if (defaultOpenIds?.length) {
      return defaultOpenIds;
    }
    return items.filter((item) => item.defaultOpen).map((item) => item.id);
  }, [defaultOpenIds, items]);

  const [openIds, setOpenIds] = useState<string[]>(initialOpenIds);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [focusedItemId, setFocusedItemId] = useState<string | null>(null);

  function updateOpenIds(nextIds: string[]): void {
    setOpenIds(nextIds);
    onValueChange?.(nextIds);
  }

  function toggleItem(itemId: string): void {
    const isOpen = isOpenItem(itemId, openIds);
    if (isOpen) {
      updateOpenIds(openIds.filter((openId) => openId !== itemId));
      return;
    }

    if (allowMultiple) {
      updateOpenIds([...openIds, itemId]);
      return;
    }

    updateOpenIds([itemId]);
  }

  if (items.length === 0) {
    return (
      <div className={className} style={style}>
        {emptyState ?? (
          <p
            style={{
              padding: "var(--z-space-4, 1rem)",
              textAlign: "center",
              color: "var(--z-color-muted, #5c5c5c)",
              fontSize: "var(--z-type-size-sm, 0.875rem)",
              margin: 0
            }}
          >
            No items.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={className} style={{ display: "flex", flexDirection: "column", gap: "var(--z-space-2, 0.5rem)", ...style }}>
      {items.map((item) => {
        const isOpen = isOpenItem(item.id, openIds);
        const isHovered = hoveredItemId === item.id;
        const isFocused = focusedItemId === item.id;
        const panelId = `accordion-panel-${item.id}`;
        const buttonId = `accordion-trigger-${item.id}`;

        return (
          <div
            key={item.id}
            style={{
              borderRadius: "10px",
              border: isOpen || isHovered ? "1px solid transparent" : "1px solid var(--z-color-border, #ebebeb)",
              background:
                isOpen || isHovered
                  ? "var(--z-color-weak, var(--z-color-background, #f7f7f7))"
                  : "var(--z-color-surface, #ffffff)",
              boxShadow: isOpen || isHovered ? "none" : "0 1px 2px rgba(10, 13, 20, 0.03)",
              transition: "background-color 140ms ease, border-color 140ms ease"
            }}
          >
            <button
              id={buttonId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => {
                if (!item.disabled) {
                  toggleItem(item.id);
                }
              }}
              onMouseEnter={() => setHoveredItemId(item.id)}
              onMouseLeave={() => setHoveredItemId((current) => (current === item.id ? null : current))}
              onFocus={() => !item.disabled && setFocusedItemId(item.id)}
              onBlur={() => setFocusedItemId(null)}
              disabled={item.disabled}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "var(--z-space-2, 0.5rem)",
                width: "100%",
                textAlign: "left",
                padding: "14px",
                border: "0",
                background: "transparent",
                color: item.disabled ? "#d1d1d1" : "var(--z-color-text, #171717)",
                cursor: item.disabled ? "not-allowed" : "pointer",
                fontSize: "14px",
                lineHeight: "20px",
                letterSpacing: "-0.006em",
                outline: "none",
                borderRadius: "10px",
                boxShadow: isFocused
                  ? "inset 0 0 0 2px rgba(153, 160, 174, 0.22), inset 0 0 0 2px var(--z-color-primary, #335cff)"
                  : "none",
                transition: "box-shadow 140ms ease"
              }}
            >
              {iconPosition === "left" ? (
                <span
                  aria-hidden
                  style={{ width: "24px", textAlign: "center", fontSize: "16px", lineHeight: "20px" }}
                >
                  {isOpen ? "−" : "+"}
                </span>
              ) : null}
              <span style={{ flex: 1 }}>
                <span style={{ fontWeight: 500, display: "block" }}>{item.title}</span>
                {isOpen && item.description ? (
                  <span
                    style={{
                      marginTop: "6px",
                      display: "block",
                      color: "var(--z-color-muted, #5c5c5c)",
                      fontWeight: 400
                    }}
                  >
                    {item.description}
                  </span>
                ) : null}
              </span>
              {iconPosition === "right" ? (
                <span
                  aria-hidden
                  style={{ width: "24px", textAlign: "center", fontSize: "16px", lineHeight: "20px" }}
                >
                  {isOpen ? "−" : "+"}
                </span>
              ) : null}
            </button>
            {isOpen && item.content ? (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                style={{
                  padding: "0 14px 14px 14px",
                  color: "var(--z-color-muted, #5c5c5c)",
                  fontSize: "14px",
                  lineHeight: "20px",
                  letterSpacing: "-0.006em"
                }}
              >
                {item.content}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
