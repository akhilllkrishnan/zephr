import { CSSProperties, ReactNode } from "react";

export interface SearchResultItem {
  id: string;
  title: string;
  description?: string;
  metadata?: ReactNode;
  onSelect?: () => void;
}

export interface SearchResultsPanelProps {
  query: string;
  results: SearchResultItem[];
  /** Show skeleton result rows while results are loading */
  loading?: boolean;
  /** Custom content rendered when results is empty and not loading */
  emptyState?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const shimmerStyle: CSSProperties = {
  height: "12px",
  borderRadius: "6px",
  background: "linear-gradient(90deg, var(--z-color-weak,#f0f0f0) 25%, var(--z-color-border,#ebebeb) 50%, var(--z-color-weak,#f0f0f0) 75%)",
  backgroundSize: "200% 100%",
  animation: "z-shimmer 1.4s ease-in-out infinite",
  marginBottom: "6px"
};

function SkeletonResults() {
  return (
    <>
      <style>{`@keyframes z-shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }`}</style>
      {[70, 50, 85, 60].map((w, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <li key={i} aria-hidden="true" style={{ padding: "0.75rem 0.75rem" }}>
          <div style={{ ...shimmerStyle, width: `${w}%` }} />
          <div style={{ ...shimmerStyle, width: `${w - 20}%`, opacity: 0.6 }} />
        </li>
      ))}
    </>
  );
}

export function SearchResultsPanel({
  query,
  results,
  loading = false,
  emptyState,
  className,
  style
}: SearchResultsPanelProps) {
  const isEmpty = !loading && results.length === 0;

  return (
    <section
      className={className}
      style={{
        border: "1px solid var(--z-color-border, #ebebeb)",
        borderRadius: "var(--z-radius-md, 0.5rem)",
        background: "var(--z-color-surface, #ffffff)",
        overflow: "hidden",
        ...style
      }}
      aria-busy={loading || undefined}
    >
      <header
        style={{
          paddingLeft: "var(--z-space-3, 0.75rem)",
          paddingRight: "var(--z-space-3, 0.75rem)",
          paddingTop: "var(--z-space-2, 0.5rem)",
          paddingBottom: "var(--z-space-2, 0.5rem)",
          borderBottom: "1px solid var(--z-color-border, #ebebeb)",
          fontSize: "var(--z-type-size-sm, 0.875rem)",
          color: "var(--z-color-muted, #5c5c5c)"
        }}
      >
        {loading
          ? `Searching for "${query}"…`
          : `${results.length} result${results.length === 1 ? "" : "s"} for "${query}"`}
      </header>
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {loading ? (
          <SkeletonResults />
        ) : isEmpty ? (
          <li>
            {emptyState ?? (
              <div
                style={{
                  padding: "2rem 0.75rem",
                  textAlign: "center",
                  fontSize: "var(--z-type-size-sm, 0.875rem)",
                  color: "var(--z-color-muted, #5c5c5c)"
                }}
              >
                No results for &ldquo;{query}&rdquo;.
              </div>
            )}
          </li>
        ) : (
          results.map((result) => (
            <li key={result.id}>
              <button
                type="button"
                onClick={result.onSelect}
                style={{
                  width: "100%",
                  textAlign: "left",
                  paddingLeft: "var(--z-space-3, 0.75rem)",
                  paddingRight: "var(--z-space-3, 0.75rem)",
                  paddingTop: "var(--z-space-3, 0.75rem)",
                  paddingBottom: "var(--z-space-3, 0.75rem)",
                  borderBottom: "1px solid var(--z-color-border, #ebebeb)",
                  background: "var(--z-color-surface, #ffffff)",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                <div
                  style={{
                    color: "var(--z-color-text, #171717)",
                    fontWeight: "var(--z-type-weight-medium, 500)"
                  }}
                >
                  {result.title}
                </div>
                {result.description ? (
                  <div
                    style={{
                      fontSize: "var(--z-type-size-sm, 0.875rem)",
                      color: "var(--z-color-muted, #5c5c5c)"
                    }}
                  >
                    {result.description}
                  </div>
                ) : null}
                {result.metadata ? (
                  <div
                    style={{
                      fontSize: "var(--z-type-size-sm, 0.875rem)",
                      color: "var(--z-color-muted, #5c5c5c)"
                    }}
                  >
                    {result.metadata}
                  </div>
                ) : null}
              </button>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
