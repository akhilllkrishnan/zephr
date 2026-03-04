import { CSSProperties, ReactNode } from "react";

export interface LayoutShellProps {
  topNav?: ReactNode;
  sidebar?: ReactNode;
  rightRail?: ReactNode;
  header?: ReactNode;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function LayoutShell({
  topNav,
  sidebar,
  rightRail,
  header,
  children,
  className,
  style
}: LayoutShellProps) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--z-space-3, 0.75rem)",
        ...style
      }}
    >
      {topNav ? <div>{topNav}</div> : null}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "260px minmax(0, 1fr) 220px",
          gap: "var(--z-space-3, 0.75rem)",
          alignItems: "start"
        }}
      >
        <aside>{sidebar}</aside>
        <main
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--z-space-3, 0.75rem)"
          }}
        >
          {header ? <div>{header}</div> : null}
          <div>{children}</div>
        </main>
        <aside>{rightRail}</aside>
      </div>
    </div>
  );
}
