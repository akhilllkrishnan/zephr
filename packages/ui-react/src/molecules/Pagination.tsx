import { CSSProperties } from "react";
import { Button } from "../atoms/Button";

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (nextPage: number) => void;
  /** Disable page controls while loading */
  loading?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function Pagination({ page, totalPages, onPageChange, loading = false, className, style }: PaginationProps) {
  return (
    <div
      className={className}
      aria-busy={loading || undefined}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--z-space-2, 0.5rem)",
        opacity: loading ? 0.6 : 1,
        transition: "opacity 200ms ease",
        ...style
      }}
    >
      <Button
        variant="secondary"
        disabled={page <= 1 || loading}
        onClick={() => onPageChange(Math.max(1, page - 1))}
      >
        Previous
      </Button>
      <span
        style={{
          fontSize: "var(--z-type-size-sm, 0.875rem)",
          color: "var(--z-color-muted, #5c5c5c)"
        }}
      >
        Page {page} of {totalPages}
      </span>
      <Button
        variant="secondary"
        disabled={page >= totalPages || loading}
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
      >
        Next
      </Button>
    </div>
  );
}
