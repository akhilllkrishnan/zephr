import { CSSProperties, ReactNode } from "react";

export interface NavbarLink {
  id: string;
  label: string;
  href: string;
}

export interface NavbarProps {
  brand: ReactNode;
  links: NavbarLink[];
  activeLinkId?: string;
  actions?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function Navbar({ brand, links, activeLinkId, actions, className, style }: NavbarProps) {
  return (
    <nav
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: "56px",
        padding: "0.5rem 0.75rem",
        borderBottom: "1px solid var(--z-color-border, #ebebeb)",
        background: "var(--z-color-surface, #ffffff)",
        ...style
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--z-space-3, 0.75rem)",
          minWidth: "180px"
        }}
      >
        {brand}
      </div>
      <ul
        aria-label="Primary navigation"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--z-space-2, 0.5rem)",
          listStyle: "none",
          margin: 0,
          padding: 0
        }}
      >
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={link.href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "32px",
                padding: "6px 12px",
                borderRadius: "8px",
                textDecoration: "none",
                border:
                  activeLinkId === link.id
                    ? "1px solid var(--z-color-border, #ebebeb)"
                    : "1px solid transparent",
                background:
                  activeLinkId === link.id
                    ? "var(--z-color-weak, var(--z-color-background, #f7f7f7))"
                    : "transparent",
                color:
                  activeLinkId === link.id
                    ? "var(--z-color-text, #171717)"
                    : "var(--z-color-muted, #5c5c5c)",
                fontSize: "14px",
                lineHeight: "20px",
                letterSpacing: "-0.006em",
                fontWeight: activeLinkId === link.id ? 600 : 500
              }}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--z-space-2, 0.5rem)" }}>
        {actions}
      </div>
    </nav>
  );
}
