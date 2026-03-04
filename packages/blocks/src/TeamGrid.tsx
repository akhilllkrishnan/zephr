import { CSSProperties } from "react";

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    bio?: string;
    avatarSrc?: string;
    /** Social links */
    links?: Array<{ label: string; href: string }>;
}

export interface TeamGridProps {
    headline?: string;
    subheadline?: string;
    members: TeamMember[];
    columns?: 2 | 3 | 4;
    className?: string;
    style?: CSSProperties;
}

function initials(name: string) {
    return name
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
}

/** Deterministic hue from name string */
function nameHue(name: string) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + (hash * 31);
    return Math.abs(hash) % 360;
}

export function TeamGrid({
    headline,
    subheadline,
    members,
    columns = 3,
    className,
    style
}: TeamGridProps) {
    return (
        <section
            className={className}
            style={{
                width: "100%",
                padding: "var(--z-space-14, 3.5rem) var(--z-space-7, 1.75rem)",
                background: "var(--z-color-surface, #ffffff)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "var(--z-space-10, 2.5rem)",
                ...style
            }}
        >
            {(headline || subheadline) && (
                <div style={{ textAlign: "center", maxWidth: "48ch" }}>
                    {headline && (
                        <h2 style={{ margin: "0 0 var(--z-space-3, 0.75rem)", fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: "var(--z-type-weight-semibold, 700)" as CSSProperties["fontWeight"], color: "var(--z-color-text, #171717)", lineHeight: 1.25 }}>
                            {headline}
                        </h2>
                    )}
                    {subheadline && (
                        <p style={{ margin: 0, fontSize: "var(--z-type-size-lg, 1.125rem)", color: "var(--z-color-muted, #737373)" }}>
                            {subheadline}
                        </p>
                    )}
                </div>
            )}

            <ul
                style={{
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                    gap: "var(--z-space-5, 1.25rem)"
                }}
            >
                {members.map((m) => {
                    const hue = nameHue(m.name);
                    return (
                        <li key={m.id}>
                            <article
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    textAlign: "center",
                                    gap: "var(--z-space-3, 0.75rem)",
                                    padding: "var(--z-space-5, 1.25rem)",
                                    border: "1px solid var(--z-color-border, #ebebeb)",
                                    borderRadius: "var(--z-radius-lg, 12px)"
                                }}
                            >
                                {m.avatarSrc ? (
                                    <img
                                        src={m.avatarSrc}
                                        alt={m.name}
                                        style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover" }}
                                    />
                                ) : (
                                    <div
                                        aria-hidden
                                        style={{
                                            width: 64,
                                            height: 64,
                                            borderRadius: "50%",
                                            background: `hsl(${hue}, 60%, 92%)`,
                                            color: `hsl(${hue}, 60%, 35%)`,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: 22,
                                            fontWeight: 700
                                        }}
                                    >
                                        {initials(m.name)}
                                    </div>
                                )}
                                <div>
                                    <p style={{ margin: 0, fontWeight: 600, color: "var(--z-color-text, #171717)" }}>{m.name}</p>
                                    <p style={{ margin: "2px 0 0", fontSize: 13, color: "var(--z-color-muted, #737373)" }}>{m.role}</p>
                                </div>
                                {m.bio && (
                                    <p style={{ margin: 0, fontSize: 13, color: "var(--z-color-muted, #737373)", lineHeight: 1.5 }}>
                                        {m.bio}
                                    </p>
                                )}
                                {m.links && m.links.length > 0 && (
                                    <div style={{ display: "flex", gap: "var(--z-space-2, 0.5rem)" }}>
                                        {m.links.map((l) => (
                                            <a
                                                key={l.href}
                                                href={l.href}
                                                style={{ fontSize: 12, color: "var(--z-color-primary, #335cff)", textDecoration: "none" }}
                                            >
                                                {l.label}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </article>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
