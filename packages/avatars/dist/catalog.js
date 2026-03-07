"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAvatarStyles = listAvatarStyles;
exports.getAvatarStyle = getAvatarStyle;
exports.searchAvatarStyles = searchAvatarStyles;
const avatarStyles = [
    {
        id: "initials",
        label: "Initials",
        description: "Classic initials avatar with strong color fill.",
        tags: ["default", "profile", "team", "simple"]
    },
    {
        id: "beam",
        label: "Beam",
        description: "Diagonal beam lighting with bright accent overlay.",
        tags: ["gradient", "modern", "vibrant", "creative"]
    },
    {
        id: "ring",
        label: "Ring",
        description: "Concentric ring identity chip for dashboard rows.",
        tags: ["status", "dashboard", "indicator", "enterprise"]
    },
    {
        id: "blob",
        label: "Blob",
        description: "Organic abstract shape for playful product personas.",
        tags: ["playful", "organic", "social", "friendly"]
    },
    {
        id: "pixel",
        label: "Pixel",
        description: "Low-res mosaic style for gaming and retro themes.",
        tags: ["retro", "gaming", "tech", "matrix"]
    },
    {
        id: "sunset",
        label: "Sunset",
        description: "Warm horizon gradient with calm cinematic tone.",
        tags: ["warm", "soft", "brand", "marketing"]
    },
    {
        id: "soft",
        label: "Soft",
        description: "Pastel profile style for minimal interfaces.",
        tags: ["minimal", "clean", "editorial", "light"]
    },
    {
        id: "capsule",
        label: "Capsule",
        description: "Rounded card badge with capsule framing.",
        tags: ["badge", "identity", "saas", "ui"]
    },
    {
        id: "mono",
        label: "Mono",
        description: "Monochrome style for neutral products and docs.",
        tags: ["neutral", "professional", "docs", "b2b"]
    },
    {
        id: "orbit",
        label: "Orbit",
        description: "Orbital rings around core identity marker.",
        tags: ["ai", "motion", "platform", "future"]
    }
];
const styleById = new Map(avatarStyles.map((style) => [style.id, style]));
function normalizeQuery(query) {
    return query.trim().toLowerCase();
}
function listAvatarStyles() {
    return [...avatarStyles];
}
function getAvatarStyle(style) {
    return styleById.get(style) ?? avatarStyles[0];
}
function searchAvatarStyles(query, limit = 10) {
    const normalized = normalizeQuery(query);
    if (!normalized) {
        return avatarStyles.slice(0, limit);
    }
    const tokens = normalized.split(/\s+/).filter(Boolean);
    const scored = avatarStyles
        .map((style) => {
        const haystack = `${style.id} ${style.label} ${style.description} ${style.tags.join(" ")}`.toLowerCase();
        let score = 0;
        if (style.id === normalized) {
            score += 80;
        }
        for (const token of tokens) {
            if (style.id.includes(token)) {
                score += 40;
            }
            if (style.label.toLowerCase().includes(token)) {
                score += 30;
            }
            if (style.tags.some((tag) => tag.includes(token))) {
                score += 18;
            }
            if (haystack.includes(token)) {
                score += 8;
            }
        }
        return { style, score };
    })
        .filter((entry) => entry.score > 0)
        .sort((left, right) => right.score - left.score || left.style.label.localeCompare(right.style.label));
    return scored.slice(0, limit).map((entry) => entry.style);
}
//# sourceMappingURL=catalog.js.map