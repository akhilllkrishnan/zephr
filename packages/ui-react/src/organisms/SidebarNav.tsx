import { CSSProperties, ReactNode } from "react";

export interface SidebarItem {
  id: string;
  label: string;
  href: string;
  active?: boolean;
}

export interface SidebarSection {
  id: string;
  title: string;
  items: SidebarItem[];
}

export interface SidebarNavProps {
  sections: SidebarSection[];
  /** Show skeleton shimmer while navigation data loads */
  loading?: boolean;
  /** Custom content when sections are empty and not loading */
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

function SkeletonNav() {
  return (
    <>
      <style>{`@keyframes z-shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }`}</style>
      {[1, 2].map((sectionIdx) => (
        <div key={sectionIdx} style={{ marginBottom: "var(--z-space-4, 1rem)" }} aria-hidden="true">
          <div style={{ ...shimmerStyle, width: "40%", marginBottom: "var(--z-space-2, 0.5rem)" }} />
          {[1, 2, 3].map((itemIdx) => (
            <div
              key={itemIdx}
              style={{
                ...shimmerStyle,
                width: `${50 + ((sectionIdx * 17 + itemIdx * 23) % 35)}%`,
                height: "32px",
                marginBottom: "var(--z-space-1, 0.25rem)",
                borderRadius: "var(--z-radius-md, 0.5rem)"
              }}
            />
          ))}
        </div>
      ))}
    </>
  );
}

export function SidebarNav({ sections, loading = false, emptyState, className, style }: SidebarNavProps) {
  const isEmpty = !loading && sections.length === 0;

  return (
    <aside
      className={className}
      aria-busy={loading || undefined}
      style={{
        padding: "var(--z-space-4, 1rem)",
        border: "1px solid var(--z-color-border, #ebebeb)",
        background: "var(--z-color-surface, #ffffff)",
        ...style
      }}
    >
      {loading ? (
        <SkeletonNav />
      ) : isEmpty ? (
        emptyState ?? (
          <p
            style={{
              padding: "var(--z-space-4, 1rem)",
              textAlign: "center",
              color: "var(--z-color-muted, #5c5c5c)",
              fontSize: "var(--z-type-size-sm, 0.875rem)",
              margin: 0
            }}
          >
            No navigation items.
          </p>
        )
      ) : (
        sections.map((section) => (
          <section key={section.id} style={{ marginBottom: "var(--z-space-4, 1rem)" }}>
            <h2
              style={{
                fontSize: "var(--z-type-size-sm, 0.875rem)",
                fontWeight: "var(--z-type-weight-semibold, 600)",
                color: "var(--z-color-muted, #5c5c5c)",
                margin: "0 0 var(--z-space-2, 0.5rem)"
              }}
            >
              {section.title}
            </h2>
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--z-space-1, 0.25rem)",
                listStyle: "none",
                margin: 0,
                padding: 0
              }}
            >
              {section.items.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    style={{
                      display: "block",
                      paddingTop: "var(--z-space-2, 0.5rem)",
                      paddingBottom: "var(--z-space-2, 0.5rem)",
                      paddingLeft: "var(--z-space-3, 0.75rem)",
                      paddingRight: "var(--z-space-3, 0.75rem)",
                      borderRadius: "var(--z-radius-md, 0.5rem)",
                      border: item.active
                        ? "1px solid var(--z-color-primary, #335cff)"
                        : "1px solid var(--z-color-border, #ebebeb)",
                      background: item.active
                        ? "var(--z-color-primary, #335cff)"
                        : "var(--z-color-surface, #ffffff)",
                      color: item.active
                        ? "var(--z-color-primaryContrast, #ffffff)"
                        : "var(--z-color-text, #171717)",
                      textDecoration: "none",
                      fontSize: "14px"
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </aside>
  );
}
