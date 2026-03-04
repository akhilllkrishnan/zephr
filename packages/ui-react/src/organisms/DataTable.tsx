import { CSSProperties, ReactNode } from "react";

export interface DataTableColumn<T> {
  id: string;
  header: string;
  accessor?: keyof T;
  render?: (row: T) => ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Array<DataTableColumn<T>>;
  rowKey: (row: T, index: number) => string;
  /** Show skeleton shimmer rows while data is being fetched */
  loading?: boolean;
  /** Custom empty state rendered when data is empty and not loading */
  emptyState?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const shimmerStyle: CSSProperties = {
  height: "14px",
  borderRadius: "6px",
  background: "linear-gradient(90deg, var(--z-color-weak,#f0f0f0) 25%, var(--z-color-border,#ebebeb) 50%, var(--z-color-weak,#f0f0f0) 75%)",
  backgroundSize: "200% 100%",
  animation: "z-shimmer 1.4s ease-in-out infinite"
};

function SkeletonRows({ columns, rows = 5 }: { columns: number; rows?: number }) {
  return (
    <>
      <style>{`@keyframes z-shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }`}</style>
      {Array.from({ length: rows }).map((_, rowIdx) => (
        // eslint-disable-next-line react/no-array-index-key
        <tr key={rowIdx} aria-hidden="true">
          {Array.from({ length: columns }).map((__, colIdx) => (
            // eslint-disable-next-line react/no-array-index-key
            <td
              key={colIdx}
              style={{
                paddingLeft: "var(--z-space-3, 0.75rem)",
                paddingRight: "var(--z-space-3, 0.75rem)",
                paddingTop: "var(--z-space-2, 0.5rem)",
                paddingBottom: "var(--z-space-2, 0.5rem)",
                borderBottom: "1px solid var(--z-color-border, #ebebeb)"
              }}
            >
              <div style={{ ...shimmerStyle, width: `${55 + ((rowIdx * 7 + colIdx * 13) % 30)}%` }} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

function DefaultEmptyState({ colSpan }: { colSpan: number }) {
  return (
    <tr>
      <td
        colSpan={colSpan}
        style={{
          padding: "2.5rem 1rem",
          textAlign: "center",
          color: "var(--z-color-muted, #5c5c5c)",
          fontSize: "var(--z-type-size-sm, 0.875rem)"
        }}
      >
        No data to display.
      </td>
    </tr>
  );
}

export function DataTable<T>({ data, columns, rowKey, loading = false, emptyState, className, style }: DataTableProps<T>) {
  const cellStyle: CSSProperties = {
    paddingLeft: "var(--z-space-3, 0.75rem)",
    paddingRight: "var(--z-space-3, 0.75rem)",
    paddingTop: "var(--z-space-2, 0.5rem)",
    paddingBottom: "var(--z-space-2, 0.5rem)",
    borderBottom: "1px solid var(--z-color-border, #ebebeb)"
  };

  const isEmpty = !loading && data.length === 0;

  return (
    <div
      className={className}
      style={{
        border: "1px solid var(--z-color-border, #ebebeb)",
        borderRadius: "var(--z-radius-md, 0.5rem)",
        background: "var(--z-color-surface, #ffffff)",
        overflow: "hidden",
        ...style
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse" }} aria-busy={loading || undefined}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.id}
                style={{
                  ...cellStyle,
                  textAlign: "left",
                  fontSize: "var(--z-type-size-sm, 0.875rem)",
                  color: "var(--z-color-muted, #5c5c5c)"
                }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <SkeletonRows columns={columns.length} />
          ) : isEmpty ? (
            emptyState ? (
              <tr>
                <td colSpan={columns.length}>{emptyState}</td>
              </tr>
            ) : (
              <DefaultEmptyState colSpan={columns.length} />
            )
          ) : (
            data.map((row, index) => (
              <tr key={rowKey(row, index)}>
                {columns.map((column) => {
                  const value = column.accessor ? (row[column.accessor] as ReactNode) : null;
                  return (
                    <td
                      key={column.id}
                      style={{
                        ...cellStyle,
                        color: "var(--z-color-text, #171717)"
                      }}
                    >
                      {column.render ? column.render(row) : value}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
