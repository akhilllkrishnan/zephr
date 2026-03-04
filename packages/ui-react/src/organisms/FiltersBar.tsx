import { CSSProperties, ReactNode } from "react";
import { Button } from "../atoms/Button";

export interface FilterItem {
  id: string;
  label: string;
  control: ReactNode;
}

export interface FiltersBarProps {
  items: FilterItem[];
  onReset?: () => void;
  /** Disable all controls while filters are being applied */
  loading?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function FiltersBar({ items, onReset, loading = false, className, style }: FiltersBarProps) {
  return (
    <div
      className={className}
      aria-busy={loading || undefined}
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "var(--z-space-3, 0.75rem)",
        padding: "var(--z-space-3, 0.75rem)",
        border: "1px solid var(--z-color-border, #ebebeb)",
        borderRadius: "var(--z-radius-md, 0.5rem)",
        background: "var(--z-color-surface, #ffffff)",
        opacity: loading ? 0.6 : 1,
        pointerEvents: loading ? "none" : undefined,
        transition: "opacity 200ms ease",
        ...style
      }}
    >
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--z-space-2, 0.5rem)"
          }}
        >
          <span
            style={{
              fontSize: "var(--z-type-size-sm, 0.875rem)",
              color: "var(--z-color-muted, #5c5c5c)"
            }}
          >
            {item.label}
          </span>
          {item.control}
        </div>
      ))}
      {onReset ? (
        <Button variant="secondary" onClick={onReset} disabled={loading}>
          Reset
        </Button>
      ) : null}
    </div>
  );
}
