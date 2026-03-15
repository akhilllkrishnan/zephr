"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stylePackNames = exports.stylePacks = void 0;
const baseTypography = {
    family: {
        sans: "'Inter', 'Segoe UI', sans-serif",
        serif: "'Inter', 'Segoe UI', sans-serif",
        mono: "'Monaco', 'IBM Plex Mono', monospace"
    },
    size: {
        xs: "0.75rem",
        sm: "0.875rem",
        md: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem"
    },
    weight: {
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700"
    },
    lineHeight: {
        tight: "1.2",
        normal: "1.5",
        relaxed: "1.7"
    },
    letterSpacing: {
        tight: "-0.01em",
        normal: "0",
        wide: "0.02em"
    }
};
const baseSpace = {
    "0": "0",
    "1": "0.25rem",
    "2": "0.5rem",
    "3": "0.75rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "8": "2rem",
    "10": "2.5rem",
    "12": "3rem"
};
const baseRadius = {
    none: "0",
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    pill: "9999px"
};
const baseShadow = {
    none: "none",
    sm: "0 1px 2px rgba(0,0,0,0.08)",
    md: "0 6px 18px rgba(0,0,0,0.12)",
    lg: "0 16px 35px rgba(0,0,0,0.16)"
};
const baseMotion = {
    duration: {
        fast: "120ms",
        normal: "180ms",
        slow: "280ms"
    },
    easing: {
        standard: "cubic-bezier(0.2, 0, 0, 1)",
        expressive: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        calm: "cubic-bezier(0.16, 1, 0.3, 1)"
    }
};
const baseBreakpoints = {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px"
};
function composeColorTokens(colors) {
    return {
        staticBlack: colors.static.black,
        staticWhite: colors.static.white,
        background950: colors.background["950"],
        background800: colors.background["800"],
        background600: colors.background["600"],
        background400: colors.background["400"],
        background200: colors.background["200"],
        background100: colors.background["100"],
        background0: colors.background["0"],
        text950: colors.text["950"],
        text700: colors.text["700"],
        text500: colors.text["500"],
        text300: colors.text["300"],
        stroke400: colors.stroke["400"],
        stroke300: colors.stroke["300"],
        stroke200: colors.stroke["200"],
        stroke100: colors.stroke["100"],
        accent900: colors.accent["900"],
        accent700: colors.accent["700"],
        accent500: colors.accent["500"],
        accent300: colors.accent["300"],
        semanticRed900: colors.semanticRed["900"],
        semanticRed700: colors.semanticRed["700"],
        semanticRed500: colors.semanticRed["500"],
        semanticRed300: colors.semanticRed["300"],
        semanticYellow900: colors.semanticYellow["900"],
        semanticYellow700: colors.semanticYellow["700"],
        semanticYellow500: colors.semanticYellow["500"],
        semanticYellow300: colors.semanticYellow["300"],
        semanticGreen900: colors.semanticGreen["900"],
        semanticGreen700: colors.semanticGreen["700"],
        semanticGreen500: colors.semanticGreen["500"],
        semanticGreen300: colors.semanticGreen["300"],
        // Runtime aliases used by current Zephr components
        background: colors.background["0"],
        surface: colors.static.white,
        text: colors.text["950"],
        muted: colors.text["500"],
        border: colors.stroke["100"],
        weak: colors.background["200"],
        sub: colors.background["400"],
        primary: colors.accent["700"],
        accent: colors.accent["700"],
        primaryContrast: colors.static.white,
        danger: colors.semanticRed["700"],
        warning: colors.semanticYellow["700"],
        success: colors.semanticGreen["700"],
        info: colors.accent["500"],
        "info-light": colors.accent["300"],
        "info-lighter": colors.background["200"],
        "warning-light": colors.semanticYellow["300"],
        "warning-lighter": colors.background["200"],
        verified: colors.accent["500"],
        feature: colors.accent["900"],
        away: colors.semanticYellow["500"],
        white: colors.static.white,
        strong: colors.text["950"]
    };
}
function createPack(light, dark, overrides) {
    return {
        color: composeColorTokens(light),
        colorDark: {
            ...composeColorTokens(dark),
            // Dark-mode aliases use dark surfaces instead of static white backgrounds.
            // Note: dark palettes use an inverted scale (950=lightest, 0=darkest),
            // so "100" is the appropriate subtle-elevated surface, not "800".
            surface: dark.background["100"],
            background: dark.background["0"],
            weak: dark.background["200"],
            sub: dark.background["600"],
            text: dark.text["950"],
            muted: dark.text["500"],
            border: dark.stroke["300"],
            "info-lighter": dark.background["200"],
            "warning-lighter": dark.background["200"],
            strong: dark.text["950"]
        },
        type: { ...baseTypography },
        space: { ...baseSpace },
        radius: { ...baseRadius },
        shadow: { ...baseShadow },
        motion: { ...baseMotion },
        breakpoints: { ...baseBreakpoints },
        ...overrides
    };
}
exports.stylePacks = {
    notion: createPack({
        static: { black: "#121212", white: "#ffffff" },
        background: {
            "950": "#121212",
            "800": "#262626",
            "600": "#666666",
            "400": "#a3a3a3",
            "200": "#e5e5e5",
            "100": "#f7f7f7",
            "0": "#ffffff"
        },
        text: {
            "950": "#171717",
            "700": "#3f3f46",
            "500": "#71717a",
            "300": "#a1a1aa"
        },
        stroke: {
            "400": "#bdbdbd",
            "300": "#d4d4d8",
            "200": "#e5e7eb",
            "100": "#ebebeb"
        },
        accent: {
            "900": "#1d4ed8",
            "700": "#2563eb",
            "500": "#3b82f6",
            "300": "#93c5fd"
        },
        semanticRed: {
            "900": "#7f1d1d",
            "700": "#b91c1c",
            "500": "#ef4444",
            "300": "#fca5a5"
        },
        semanticYellow: {
            "900": "#713f12",
            "700": "#a16207",
            "500": "#eab308",
            "300": "#fde68a"
        },
        semanticGreen: {
            "900": "#14532d",
            "700": "#15803d",
            "500": "#22c55e",
            "300": "#86efac"
        }
    }, {
        static: { black: "#121212", white: "#ffffff" },
        background: {
            "950": "#f5f5f5",
            "800": "#e5e7eb",
            "600": "#9ca3af",
            "400": "#6b7280",
            "200": "#334155",
            "100": "#1f2937",
            "0": "#0f1115"
        },
        text: {
            "950": "#f5f5f5",
            "700": "#e5e7eb",
            "500": "#9ca3af",
            "300": "#6b7280"
        },
        stroke: {
            "400": "#6b7280",
            "300": "#4b5563",
            "200": "#374151",
            "100": "#1f2937"
        },
        accent: {
            "900": "#93c5fd",
            "700": "#60a5fa",
            "500": "#3b82f6",
            "300": "#1d4ed8"
        },
        semanticRed: {
            "900": "#fca5a5",
            "700": "#f87171",
            "500": "#ef4444",
            "300": "#b91c1c"
        },
        semanticYellow: {
            "900": "#fde68a",
            "700": "#facc15",
            "500": "#eab308",
            "300": "#a16207"
        },
        semanticGreen: {
            "900": "#bbf7d0",
            "700": "#4ade80",
            "500": "#22c55e",
            "300": "#15803d"
        }
    }, {
        radius: {
            ...baseRadius,
            sm: "0.25rem",
            md: "0.25rem",
            lg: "0.5rem",
            xl: "0.75rem"
        },
        shadow: {
            ...baseShadow,
            sm: "none",
            md: "none",
            lg: "none"
        }
    }),
    stripe: createPack({
        static: { black: "#0a2540", white: "#ffffff" },
        background: {
            "950": "#0a2540",
            "800": "#16304a",
            "600": "#425466",
            "400": "#8898aa",
            "200": "#e6ebf1",
            "100": "#f6f9fc",
            "0": "#ffffff"
        },
        text: {
            "950": "#0a2540",
            "700": "#16304a",
            "500": "#697386",
            "300": "#8898aa"
        },
        stroke: {
            "400": "#8898aa",
            "300": "#d4dce8",
            "200": "#e6ebf1",
            "100": "#f2f1f1"
        },
        accent: {
            "900": "#3d22d6",
            "700": "#533afd",
            "500": "#635bff",
            "300": "#a8a2f5"
        },
        semanticRed: {
            "900": "#7f1d1d",
            "700": "#b91c1c",
            "500": "#ef4444",
            "300": "#fca5a5"
        },
        semanticYellow: {
            "900": "#78350f",
            "700": "#b45309",
            "500": "#f59e0b",
            "300": "#fcd34d"
        },
        semanticGreen: {
            "900": "#14532d",
            "700": "#15803d",
            "500": "#22c55e",
            "300": "#86efac"
        }
    }, {
        static: { black: "#0a2540", white: "#ffffff" },
        background: {
            "950": "#f6f9fc",
            "800": "#e6ebf1",
            "600": "#8898aa",
            "400": "#697386",
            "200": "#2a4160",
            "100": "#16304a",
            "0": "#0a2540"
        },
        text: {
            "950": "#f6f9fc",
            "700": "#e6ebf1",
            "500": "#8898aa",
            "300": "#697386"
        },
        stroke: {
            "400": "#697386",
            "300": "#425466",
            "200": "#2a4160",
            "100": "#16304a"
        },
        accent: {
            "900": "#d4cffc",
            "700": "#a8a2f5",
            "500": "#7a73ff",
            "300": "#635bff"
        },
        semanticRed: {
            "900": "#fecaca",
            "700": "#fca5a5",
            "500": "#ef4444",
            "300": "#b91c1c"
        },
        semanticYellow: {
            "900": "#fde68a",
            "700": "#fcd34d",
            "500": "#f59e0b",
            "300": "#b45309"
        },
        semanticGreen: {
            "900": "#bbf7d0",
            "700": "#86efac",
            "500": "#22c55e",
            "300": "#15803d"
        }
    }, {
        radius: {
            ...baseRadius,
            sm: "0.375rem",
            md: "0.5rem",
            lg: "0.625rem",
            xl: "0.75rem"
        },
        shadow: {
            ...baseShadow,
            sm: "0 2px 5px rgba(50, 50, 93, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
            md: "0 6px 12px rgba(50, 50, 93, 0.12), 0 3px 7px rgba(0, 0, 0, 0.08)",
            lg: "0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.06)"
        }
    }),
    linear: createPack({
        static: { black: "#1b1b1e", white: "#ffffff" },
        background: {
            "950": "#1b1b1e",
            "800": "#2c2c30",
            "600": "#5a5a65",
            "400": "#8a8a9a",
            "200": "#e0e0e6",
            "100": "#f7f8f9",
            "0": "#ffffff"
        },
        text: {
            "950": "#1b1b1e",
            "700": "#2c2c30",
            "500": "#6e6e80",
            "300": "#8a8a9a"
        },
        stroke: {
            "400": "#8a8a9a",
            "300": "#d0d0d8",
            "200": "#e0e0e6",
            "100": "#f0f0f3"
        },
        accent: {
            "900": "#4850b8",
            "700": "#5e6ad2",
            "500": "#6c72cb",
            "300": "#b0b4e8"
        },
        semanticRed: {
            "900": "#7f1d1d",
            "700": "#b91c1c",
            "500": "#ef4444",
            "300": "#fca5a5"
        },
        semanticYellow: {
            "900": "#713f12",
            "700": "#a16207",
            "500": "#d97706",
            "300": "#fcd34d"
        },
        semanticGreen: {
            "900": "#14532d",
            "700": "#15803d",
            "500": "#22c55e",
            "300": "#86efac"
        }
    }, {
        static: { black: "#1b1b1e", white: "#ffffff" },
        background: {
            "950": "#eeeef0",
            "800": "#d0d0d8",
            "600": "#8a8a9a",
            "400": "#6e6e80",
            "200": "#26262a",
            "100": "#1c1c1f",
            "0": "#0f1012"
        },
        text: {
            "950": "#eeeef0",
            "700": "#d0d0d8",
            "500": "#8a8a9a",
            "300": "#6e6e80"
        },
        stroke: {
            "400": "#6e6e80",
            "300": "#3a3a40",
            "200": "#26262a",
            "100": "#1c1c1f"
        },
        accent: {
            "900": "#c8caee",
            "700": "#b0b4e8",
            "500": "#7c82d2",
            "300": "#5e6ad2"
        },
        semanticRed: {
            "900": "#fecaca",
            "700": "#fca5a5",
            "500": "#ef4444",
            "300": "#b91c1c"
        },
        semanticYellow: {
            "900": "#fde68a",
            "700": "#fcd34d",
            "500": "#d97706",
            "300": "#a16207"
        },
        semanticGreen: {
            "900": "#bbf7d0",
            "700": "#86efac",
            "500": "#22c55e",
            "300": "#15803d"
        }
    }, {
        radius: {
            ...baseRadius,
            sm: "0.25rem",
            md: "0.375rem",
            lg: "0.5rem",
            xl: "0.625rem"
        },
        shadow: {
            ...baseShadow,
            sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
            md: "0 1px 3px rgba(0, 0, 0, 0.08)",
            lg: "0 4px 12px rgba(0, 0, 0, 0.1)"
        },
        type: {
            ...baseTypography,
            family: {
                ...baseTypography.family,
                mono: "'SF Mono', 'Roboto Mono', monospace"
            }
        }
    }),
    framer: createPack({
        static: { black: "#111111", white: "#ffffff" },
        background: {
            "950": "#111111",
            "800": "#1a1a1a",
            "600": "#444444",
            "400": "#888888",
            "200": "#ebebeb",
            "100": "#f5f5f5",
            "0": "#ffffff"
        },
        text: {
            "950": "#000000",
            "700": "#111111",
            "500": "#666666",
            "300": "#999999"
        },
        stroke: {
            "400": "#888888",
            "300": "#cccccc",
            "200": "#e5e5e5",
            "100": "#f0f0f0"
        },
        accent: {
            "900": "#0066cc",
            "700": "#0088ee",
            "500": "#0099ff",
            "300": "#66c2ff"
        },
        semanticRed: {
            "900": "#7f1d1d",
            "700": "#b91c1c",
            "500": "#ef4444",
            "300": "#fca5a5"
        },
        semanticYellow: {
            "900": "#713f12",
            "700": "#b45309",
            "500": "#f59e0b",
            "300": "#fcd34d"
        },
        semanticGreen: {
            "900": "#14532d",
            "700": "#15803d",
            "500": "#22c55e",
            "300": "#86efac"
        }
    }, {
        static: { black: "#111111", white: "#ffffff" },
        background: {
            "950": "#f5f5f5",
            "800": "#e5e5e5",
            "600": "#888888",
            "400": "#666666",
            "200": "#333333",
            "100": "#1a1a1a",
            "0": "#111111"
        },
        text: {
            "950": "#ffffff",
            "700": "#ebebeb",
            "500": "#999999",
            "300": "#666666"
        },
        stroke: {
            "400": "#666666",
            "300": "#444444",
            "200": "#333333",
            "100": "#1a1a1a"
        },
        accent: {
            "900": "#b3daff",
            "700": "#66c2ff",
            "500": "#33aaff",
            "300": "#0099ff"
        },
        semanticRed: {
            "900": "#fecaca",
            "700": "#fca5a5",
            "500": "#ef4444",
            "300": "#b91c1c"
        },
        semanticYellow: {
            "900": "#fde68a",
            "700": "#fcd34d",
            "500": "#f59e0b",
            "300": "#b45309"
        },
        semanticGreen: {
            "900": "#bbf7d0",
            "700": "#86efac",
            "500": "#22c55e",
            "300": "#15803d"
        }
    }, {
        type: {
            ...baseTypography,
            size: {
                ...baseTypography.size,
                xl: "1.375rem",
                "2xl": "1.75rem",
                "3xl": "2.125rem"
            },
            family: {
                ...baseTypography.family,
                sans: "'Inter', 'Helvetica Neue', sans-serif"
            }
        },
        radius: {
            ...baseRadius,
            sm: "0.5rem",
            md: "0.75rem",
            lg: "1rem",
            xl: "1.25rem"
        },
        shadow: {
            ...baseShadow,
            sm: "0 2px 4px rgba(0, 0, 0, 0.04)",
            md: "0 4px 16px rgba(0, 0, 0, 0.08)",
            lg: "0 8px 30px rgba(0, 0, 0, 0.12)"
        }
    })
};
exports.stylePackNames = Object.keys(exports.stylePacks);
//# sourceMappingURL=stylePacks.js.map