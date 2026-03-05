import { CSSProperties, ReactNode } from "react";

export type PaginationType = "basic" | "group" | "full-radius";

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (nextPage: number) => void;
  /** Disable page controls while loading */
  loading?: boolean;
  type?: PaginationType;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  showMeta?: boolean;
  showPageSizeSelect?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  onPageSizeChange?: (nextPageSize: number) => void;
  maxVisiblePages?: number;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
}

type PageCell = number | "ellipsis";

function clampPage(page: number, totalPages: number): number {
  return Math.min(Math.max(1, page), Math.max(1, totalPages));
}

function buildPageCells(
  currentPage: number,
  totalPages: number,
  maxVisiblePages: number
): PageCell[] {
  const safeTotal = Math.max(1, totalPages);
  const safeMaxVisible = Math.max(5, maxVisiblePages);
  if (safeTotal <= safeMaxVisible) {
    return Array.from({ length: safeTotal }, (_, index) => index + 1);
  }

  const sideCount = Math.max(1, Math.floor((safeMaxVisible - 3) / 2));
  const start = Math.max(2, currentPage - sideCount);
  const end = Math.min(safeTotal - 1, currentPage + sideCount);
  const cells: PageCell[] = [1];

  if (start > 2) cells.push("ellipsis");
  for (let value = start; value <= end; value += 1) {
    cells.push(value);
  }
  if (end < safeTotal - 1) cells.push("ellipsis");
  cells.push(safeTotal);

  return cells;
}

function IconArrow({
  direction,
  double = false
}: {
  direction: "left" | "right";
  double?: boolean;
}) {
  const icon = direction === "left" ? (double ? "<<" : "<") : double ? ">>" : ">";
  return <span aria-hidden>{icon}</span>;
}

function navButtonStyle(disabled: boolean): CSSProperties {
  return {
    border: "none",
    background: "transparent",
    color: disabled ? "var(--z-color-text300, #a3a3a3)" : "var(--z-color-muted, #5c5c5c)",
    fontSize: "18px",
    lineHeight: 1,
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "background-color 120ms ease, color 120ms ease"
  };
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  loading = false,
  type = "basic",
  showFirstLast = true,
  showPrevNext = true,
  showMeta = true,
  showPageSizeSelect = true,
  pageSize = 7,
  pageSizeOptions = [7, 10, 20, 50],
  onPageSizeChange,
  maxVisiblePages = 7,
  ariaLabel = "Pagination",
  className,
  style
}: PaginationProps) {
  const safeTotal = Math.max(1, totalPages);
  const currentPage = clampPage(page, safeTotal);
  const pageCells = buildPageCells(currentPage, safeTotal, maxVisiblePages);
  const canPrevious = !loading && currentPage > 1;
  const canNext = !loading && currentPage < safeTotal;
  const isGroup = type === "group";
  const isFullRadius = type === "full-radius";
  const wrapperRadius = isFullRadius ? "999px" : "8px";

  function goTo(nextPage: number): void {
    if (loading) return;
    onPageChange(clampPage(nextPage, safeTotal));
  }

  function renderLooseCells() {
    return (
      <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
        {showFirstLast ? (
          <button
            type="button"
            aria-label="First page"
            disabled={!canPrevious}
            onClick={() => goTo(1)}
            style={navButtonStyle(!canPrevious)}
          >
            <IconArrow direction="left" double />
          </button>
        ) : null}
        {showPrevNext ? (
          <button
            type="button"
            aria-label="Previous page"
            disabled={!canPrevious}
            onClick={() => goTo(currentPage - 1)}
            style={navButtonStyle(!canPrevious)}
          >
            <IconArrow direction="left" />
          </button>
        ) : null}

        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
          {pageCells.map((cell, index) => {
            const isActive = cell === currentPage;
            return (
              <button
                key={`${cell}-${index}`}
                type="button"
                aria-current={isActive ? "page" : undefined}
                aria-label={cell === "ellipsis" ? "More pages" : `Page ${cell}`}
                disabled={loading || cell === "ellipsis"}
                onClick={() => {
                  if (typeof cell === "number") goTo(cell);
                }}
                style={{
                  minWidth: "32px",
                  height: "32px",
                  borderRadius: wrapperRadius,
                  border: "1px solid var(--z-color-stroke200, #ebebeb)",
                  background: isActive ? "var(--z-color-background200, #f7f7f7)" : "var(--z-color-background0, #ffffff)",
                  color: "var(--z-color-muted, #5c5c5c)",
                  padding: "6px",
                  fontSize: "14px",
                  fontWeight: isActive ? 500 : 500,
                  lineHeight: "20px",
                  letterSpacing: "-0.006em",
                  cursor: loading || cell === "ellipsis" ? "default" : "pointer"
                }}
              >
                {cell === "ellipsis" ? "..." : cell}
              </button>
            );
          })}
        </div>

        {showPrevNext ? (
          <button
            type="button"
            aria-label="Next page"
            disabled={!canNext}
            onClick={() => goTo(currentPage + 1)}
            style={navButtonStyle(!canNext)}
          >
            <IconArrow direction="right" />
          </button>
        ) : null}
        {showFirstLast ? (
          <button
            type="button"
            aria-label="Last page"
            disabled={!canNext}
            onClick={() => goTo(safeTotal)}
            style={navButtonStyle(!canNext)}
          >
            <IconArrow direction="right" double />
          </button>
        ) : null}
      </div>
    );
  }

  function renderGroupCells() {
    const cells: Array<{
      id: string;
      label: string;
      onClick?: () => void;
      disabled?: boolean;
      active?: boolean;
      icon?: ReactNode;
    }> = [];

    if (showFirstLast) {
      cells.push({
        id: "first",
        label: "First page",
        icon: <IconArrow direction="left" double />,
        onClick: () => goTo(1),
        disabled: !canPrevious
      });
    }
    if (showPrevNext) {
      cells.push({
        id: "previous",
        label: "Previous page",
        icon: <IconArrow direction="left" />,
        onClick: () => goTo(currentPage - 1),
        disabled: !canPrevious
      });
    }
    pageCells.forEach((cell, index) => {
      if (cell === "ellipsis") {
        cells.push({
          id: `ellipsis-${index}`,
          label: "More pages",
          icon: <span aria-hidden>...</span>,
          disabled: true
        });
      } else {
        cells.push({
          id: `page-${cell}`,
          label: `Page ${cell}`,
          icon: <span aria-hidden>{cell}</span>,
          onClick: () => goTo(cell),
          active: cell === currentPage
        });
      }
    });
    if (showPrevNext) {
      cells.push({
        id: "next",
        label: "Next page",
        icon: <IconArrow direction="right" />,
        onClick: () => goTo(currentPage + 1),
        disabled: !canNext
      });
    }
    if (showFirstLast) {
      cells.push({
        id: "last",
        label: "Last page",
        icon: <IconArrow direction="right" double />,
        onClick: () => goTo(safeTotal),
        disabled: !canNext
      });
    }

    return (
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          border: "1px solid var(--z-color-stroke200, #ebebeb)",
          borderRadius: "8px",
          overflow: "hidden",
          background: "var(--z-color-background0, #ffffff)"
        }}
      >
        {cells.map((cell, index) => {
          const isLast = index === cells.length - 1;
          return (
            <button
              key={cell.id}
              type="button"
              aria-label={cell.label}
              aria-current={cell.active ? "page" : undefined}
              disabled={Boolean(cell.disabled || loading)}
              onClick={cell.onClick}
              style={{
                minWidth: "40px",
                height: "32px",
                border: "none",
                borderRight: isLast ? "none" : "1px solid var(--z-color-stroke200, #ebebeb)",
                background: cell.active ? "var(--z-color-background200, #f7f7f7)" : "var(--z-color-background0, #ffffff)",
                color: cell.disabled || loading ? "var(--z-color-text300, #a3a3a3)" : "var(--z-color-muted, #5c5c5c)",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "20px",
                letterSpacing: "-0.006em",
                padding: "6px",
                cursor: cell.disabled || loading ? "default" : "pointer"
              }}
            >
              {cell.icon}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <nav
      className={className}
      aria-label={ariaLabel}
      aria-busy={loading || undefined}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "24px",
        width: "100%",
        justifyContent: "space-between",
        opacity: loading ? 0.6 : 1,
        transition: "opacity 200ms ease",
        ...style
      }}
    >
      {showMeta ? (
        <div
          style={{
            minWidth: "200px",
            padding: "6px 0",
            color: "var(--z-color-muted, #5c5c5c)",
            fontSize: "14px",
            lineHeight: "20px",
            letterSpacing: "-0.006em"
          }}
        >
          Page {currentPage} of {safeTotal}
        </div>
      ) : (
        <div style={{ minWidth: "200px" }} />
      )}

      <div
        style={{
          display: "flex",
          flex: "1 0 0",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {isGroup ? renderGroupCells() : renderLooseCells()}
      </div>

      {showPageSizeSelect ? (
        <div style={{ minWidth: "200px", display: "flex", justifyContent: "flex-end" }}>
          <label
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "2px",
              border: "1px solid var(--z-color-stroke200, #ebebeb)",
              borderRadius: "8px",
              background: "var(--z-color-background0, #ffffff)",
              boxShadow: "0 1px 2px rgba(10, 13, 20, 0.03)",
              padding: "6px 10px"
            }}
          >
            <select
              value={String(pageSize)}
              aria-label="Rows per page"
              disabled={loading}
              onChange={(event) => onPageSizeChange?.(Number(event.target.value))}
              style={{
                border: "none",
                background: "transparent",
                font: "inherit",
                color: "var(--z-color-muted, #5c5c5c)",
                fontSize: "14px",
                lineHeight: "20px",
                letterSpacing: "-0.006em",
                outline: "none",
                appearance: "none",
                WebkitAppearance: "none",
                MozAppearance: "none",
                cursor: loading ? "default" : "pointer",
                paddingRight: "14px"
              }}
            >
              {pageSizeOptions.map((value) => (
                <option key={value} value={value}>
                  {value} / page
                </option>
              ))}
            </select>
            <span
              aria-hidden
              style={{
                marginLeft: "-12px",
                color: "var(--z-color-muted, #5c5c5c)",
                fontSize: "14px"
              }}
            >
              v
            </span>
          </label>
        </div>
      ) : (
        <div style={{ minWidth: "200px" }} />
      )}
    </nav>
  );
}
