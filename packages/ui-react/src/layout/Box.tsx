import { CSSProperties, ElementType, HTMLAttributes, ReactNode, forwardRef } from "react";

export interface BoxProps extends HTMLAttributes<HTMLElement> {
  padding?: string | number;
  paddingX?: string | number;
  paddingY?: string | number;
  margin?: string | number;
  radius?: "none" | "sm" | "md" | "lg" | "xl" | "pill" | string;
  background?: string;
  border?: boolean | string;
  as?: ElementType;
  children?: ReactNode;
}

export const Box = forwardRef<HTMLElement, BoxProps>(function Box(
  {
    padding,
    paddingX,
    paddingY,
    margin,
    radius,
    background,
    border,
    as: Tag = "div",
    className,
    style,
    children,
    ...props
  },
  ref
) {
  const resolveToken = (value: string | number | undefined): string | undefined => {
    if (value === undefined) return undefined;
    return typeof value === "number" ? `var(--z-space-${value}, ${value * 0.25}rem)` : value;
  };

  const resolveRadius = (value: string | undefined): string | undefined => {
    if (value === undefined) return undefined;
    const presets = ["none", "sm", "md", "lg", "xl", "pill"];
    return presets.includes(value) ? `var(--z-radius-${value})` : value;
  };

  const computedStyle: CSSProperties = {
    padding: resolveToken(padding),
    paddingLeft: resolveToken(paddingX),
    paddingRight: resolveToken(paddingX),
    paddingTop: resolveToken(paddingY),
    paddingBottom: resolveToken(paddingY),
    margin: resolveToken(margin),
    borderRadius: resolveRadius(radius),
    background,
    border:
      border === true
        ? "1px solid var(--z-color-border, #ebebeb)"
        : border === false
        ? undefined
        : border,
    ...style
  };

  return (
    <Tag ref={ref} className={className} style={computedStyle} {...props}>
      {children}
    </Tag>
  );
});
