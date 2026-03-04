import { CSSProperties, ReactNode, createElement } from "react";

export interface HeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
  style?: CSSProperties;
  level?: 1 | 2 | 3;
}

export function Header({ title, subtitle, actions, className, style, level = 2 }: HeaderProps) {
  const headingTag = `h${level}` as "h1" | "h2" | "h3";

  return (
    <header
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "var(--z-space-4, 1rem)",
        border: "1px solid var(--z-color-border, #ebebeb)",
        background: "var(--z-color-surface, #ffffff)",
        ...style
      }}
    >
      <div>
        {createElement(
          headingTag,
          {
            style: {
              fontSize: "var(--z-type-size-2xl, 1.5rem)",
              fontWeight: "var(--z-type-weight-bold, 700)",
              color: "var(--z-color-text, #171717)",
              margin: 0
            }
          },
          title
        )}
        {subtitle ? (
          <p
            style={{
              color: "var(--z-color-muted, #5c5c5c)",
              fontSize: "var(--z-type-size-sm, 0.875rem)",
              margin: "0.25rem 0 0"
            }}
          >
            {subtitle}
          </p>
        ) : null}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--z-space-2, 0.5rem)"
        }}
      >
        {actions}
      </div>
    </header>
  );
}
