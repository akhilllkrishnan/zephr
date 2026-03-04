"use client";
import { CSSProperties, useState } from "react";

export interface Testimonial {
    id: string;
    quote: string;
    author: string;
    role?: string;
    company?: string;
    avatarSrc?: string;
    rating?: 1 | 2 | 3 | 4 | 5;
}

export interface TestimonialCarouselProps {
    testimonials: Testimonial[];
    headline?: string;
    className?: string;
    style?: CSSProperties;
}

function Stars({ n }: { n: number }) {
    return (
        <div aria-label={`${n} out of 5 stars`} style={{ display: "flex", gap: 2 }}>
            {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} aria-hidden style={{ color: i < n ? "#f59e0b" : "#d1d5db", fontSize: 16 }}>
                    ★
                </span>
            ))}
        </div>
    );
}

export function TestimonialCarousel({
    testimonials,
    headline,
    className,
    style
}: TestimonialCarouselProps) {
    const [active, setActive] = useState(0);
    const t = testimonials[active];
    const count = testimonials.length;

    function prev() { setActive((i) => (i - 1 + count) % count); }
    function next() { setActive((i) => (i + 1) % count); }

    return (
        <section
            className={className}
            style={{
                width: "100%",
                padding: "var(--z-space-14, 3.5rem) var(--z-space-7, 1.75rem)",
                background: "var(--z-color-weak, #f7f7f7)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "var(--z-space-8, 2rem)",
                ...style
            }}
        >
            {headline && (
                <h2 style={{ margin: 0, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: "var(--z-type-weight-semibold, 700)" as CSSProperties["fontWeight"], color: "var(--z-color-text, #171717)", textAlign: "center" }}>
                    {headline}
                </h2>
            )}

            <div
                role="region"
                aria-label="Testimonials"
                aria-live="polite"
                style={{ maxWidth: 720, width: "100%", position: "relative" }}
            >
                {t && (
                    <figure
                        key={t.id}
                        style={{
                            margin: 0,
                            background: "var(--z-color-surface, #ffffff)",
                            border: "1px solid var(--z-color-border, #ebebeb)",
                            borderRadius: "var(--z-radius-lg, 14px)",
                            padding: "var(--z-space-8, 2rem)",
                            display: "flex",
                            flexDirection: "column",
                            gap: "var(--z-space-5, 1.25rem)",
                            boxShadow: "var(--z-shadow-sm, 0 1px 3px rgba(14,18,27,0.08))"
                        }}
                    >
                        {t.rating && <Stars n={t.rating} />}
                        <blockquote style={{ margin: 0, fontSize: "var(--z-type-size-lg, 1.125rem)", color: "var(--z-color-text, #171717)", lineHeight: 1.65, fontStyle: "italic" }}>
                            "{t.quote}"
                        </blockquote>
                        <figcaption style={{ display: "flex", alignItems: "center", gap: "var(--z-space-3, 0.75rem)" }}>
                            {t.avatarSrc ? (
                                <img src={t.avatarSrc} alt={t.author} style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }} />
                            ) : (
                                <div aria-hidden style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--z-color-primary, #335cff)20", color: "var(--z-color-primary, #335cff)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14 }}>
                                    {t.author.charAt(0).toUpperCase()}
                                </div>
                            )}
                            <div>
                                <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: "var(--z-color-text, #171717)" }}>{t.author}</p>
                                {(t.role || t.company) && (
                                    <p style={{ margin: 0, fontSize: 12, color: "var(--z-color-muted, #737373)" }}>
                                        {[t.role, t.company].filter(Boolean).join(" · ")}
                                    </p>
                                )}
                            </div>
                        </figcaption>
                    </figure>
                )}
            </div>

            {count > 1 && (
                <nav aria-label="Testimonial navigation" style={{ display: "flex", alignItems: "center", gap: "var(--z-space-4, 1rem)" }}>
                    <button type="button" onClick={prev} aria-label="Previous testimonial" style={{ background: "none", border: "1px solid var(--z-color-border, #ebebeb)", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>
                        ←
                    </button>
                    <span style={{ fontSize: 12, color: "var(--z-color-muted, #737373)" }}>
                        {active + 1} / {count}
                    </span>
                    <button type="button" onClick={next} aria-label="Next testimonial" style={{ background: "none", border: "1px solid var(--z-color-border, #ebebeb)", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>
                        →
                    </button>
                </nav>
            )}
        </section>
    );
}
