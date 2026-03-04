import { CSSProperties, ElementType, HTMLAttributes, ReactNode, forwardRef } from "react";

export interface GridProps extends HTMLAttributes<HTMLElement> {
  columns?: number | string;
  gap?: string | number;
  rowGap?: string | number;
  columnGap?: string | number;
  align?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyItems"];
  as?: ElementType;
  children?: ReactNode;
}

export const Grid = forwardRef<HTMLElement, GridProps>(function Grid(
  {
    columns = 2,
    gap,
    rowGap,
    columnGap,
    align,
    justify,
    as: Tag = "div",
    className,
    style,
    children,
    ...props
  },
  ref
) {
  const resolveToken = (value: string | number | undefined) => {
    if (value === undefined) return undefined;
    return typeof value === "number" ? `var(--z-space-${value}, ${value * 0.25}rem)` : value;
  };

  const templateColumns =
    typeof columns === "number"
      ? `repeat(${columns}, minmax(0, 1fr))`
      : columns;

  const computedStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: templateColumns,
    gap: resolveToken(gap),
    rowGap: resolveToken(rowGap),
    columnGap: resolveToken(columnGap),
    alignItems: align,
    justifyItems: justify,
    ...style
  };

  return (
    <Tag ref={ref} className={className} style={computedStyle} {...props}>
      {children}
    </Tag>
  );
});
