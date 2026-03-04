import { CSSProperties, ElementType, HTMLAttributes, ReactNode, forwardRef } from "react";

export interface StackProps extends HTMLAttributes<HTMLElement> {
  direction?: "vertical" | "horizontal";
  gap?: string | number;
  align?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyContent"];
  wrap?: boolean;
  fullWidth?: boolean;
  as?: ElementType;
  children?: ReactNode;
}

export const Stack = forwardRef<HTMLElement, StackProps>(function Stack(
  {
    direction = "vertical",
    gap = "var(--z-space-4, 1rem)",
    align,
    justify,
    wrap = false,
    fullWidth = false,
    as: Tag = "div",
    className,
    style,
    children,
    ...props
  },
  ref
) {
  const resolvedGap =
    typeof gap === "number" ? `var(--z-space-${gap}, ${gap * 0.25}rem)` : gap;

  const computedStyle: CSSProperties = {
    display: "flex",
    flexDirection: direction === "horizontal" ? "row" : "column",
    gap: resolvedGap,
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap ? "wrap" : undefined,
    width: fullWidth ? "100%" : undefined,
    ...style
  };

  return (
    <Tag ref={ref} className={className} style={computedStyle} {...props}>
      {children}
    </Tag>
  );
});
