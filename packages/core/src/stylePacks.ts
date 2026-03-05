import { DesignTokens, StylePackName } from "./types";

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
} as const;

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

interface PackColors {
  static: {
    black: string;
    white: string;
  };
  background: {
    "950": string;
    "800": string;
    "600": string;
    "400": string;
    "200": string;
    "0": string;
  };
  text: {
    "950": string;
    "700": string;
    "500": string;
    "300": string;
  };
  stroke: {
    "400": string;
    "300": string;
    "200": string;
    "100": string;
  };
  accent: {
    "900": string;
    "700": string;
    "500": string;
    "300": string;
  };
  semanticRed: {
    "900": string;
    "700": string;
    "500": string;
    "300": string;
  };
  semanticYellow: {
    "900": string;
    "700": string;
    "500": string;
    "300": string;
  };
  semanticGreen: {
    "900": string;
    "700": string;
    "500": string;
    "300": string;
  };
}

function composeColorTokens(colors: PackColors): DesignTokens["color"] {
  return {
    staticBlack: colors.static.black,
    staticWhite: colors.static.white,

    background950: colors.background["950"],
    background800: colors.background["800"],
    background600: colors.background["600"],
    background400: colors.background["400"],
    background200: colors.background["200"],
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

    // Runtime aliases used by current Zephyr components
    background: colors.background["0"],
    surface: colors.static.white,
    text: colors.text["950"],
    muted: colors.text["500"],
    border: colors.stroke["200"],
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

function createPack(
  light: PackColors,
  dark: PackColors,
  overrides?: Partial<DesignTokens>
): DesignTokens {
  return {
    color: composeColorTokens(light),
    colorDark: {
      ...composeColorTokens(dark),
      // Dark-mode aliases use dark surfaces instead of static white backgrounds.
      surface: dark.background["800"],
      background: dark.background["0"],
      weak: dark.background["800"],
      sub: dark.background["600"],
      text: dark.text["950"],
      muted: dark.text["500"],
      border: dark.stroke["300"],
      "info-lighter": dark.background["800"],
      "warning-lighter": dark.background["800"],
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

export const stylePacks: Record<StylePackName, DesignTokens> = {
  notion: createPack(
    {
      static: { black: "#121212", white: "#ffffff" },
      background: {
        "950": "#121212",
        "800": "#262626",
        "600": "#666666",
        "400": "#a3a3a3",
        "200": "#e5e5e5",
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
        "100": "#f3f4f6"
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
    },
    {
      static: { black: "#121212", white: "#ffffff" },
      background: {
        "950": "#f5f5f5",
        "800": "#e5e7eb",
        "600": "#9ca3af",
        "400": "#6b7280",
        "200": "#334155",
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
    },
    {
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
    }
  ),
  stripe: createPack(
    {
      static: { black: "#111827", white: "#ffffff" },
      background: {
        "950": "#0f172a",
        "800": "#1e293b",
        "600": "#475569",
        "400": "#94a3b8",
        "200": "#e2e8f0",
        "0": "#ffffff"
      },
      text: {
        "950": "#0f172a",
        "700": "#1e293b",
        "500": "#64748b",
        "300": "#94a3b8"
      },
      stroke: {
        "400": "#94a3b8",
        "300": "#cbd5e1",
        "200": "#e2e8f0",
        "100": "#f1f5f9"
      },
      accent: {
        "900": "#4f46e5",
        "700": "#4f46e5",
        "500": "#6366f1",
        "300": "#a5b4fc"
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
    },
    {
      static: { black: "#111827", white: "#ffffff" },
      background: {
        "950": "#f8fafc",
        "800": "#e2e8f0",
        "600": "#94a3b8",
        "400": "#64748b",
        "200": "#334155",
        "0": "#0b1120"
      },
      text: {
        "950": "#f8fafc",
        "700": "#e2e8f0",
        "500": "#94a3b8",
        "300": "#64748b"
      },
      stroke: {
        "400": "#64748b",
        "300": "#475569",
        "200": "#334155",
        "100": "#1e293b"
      },
      accent: {
        "900": "#c7d2fe",
        "700": "#a5b4fc",
        "500": "#818cf8",
        "300": "#6366f1"
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
    },
    {
      radius: {
        ...baseRadius,
        sm: "0.5rem",
        md: "0.625rem",
        lg: "0.875rem",
        xl: "1rem"
      },
      shadow: {
        ...baseShadow,
        sm: "0 1px 2px rgba(2, 6, 23, 0.06)",
        md: "0 8px 20px rgba(15, 23, 42, 0.1)",
        lg: "0 18px 40px rgba(15, 23, 42, 0.14)"
      }
    }
  ),
  linear: createPack(
    {
      static: { black: "#0b0d12", white: "#ffffff" },
      background: {
        "950": "#0b0d12",
        "800": "#161a22",
        "600": "#30384a",
        "400": "#6b7280",
        "200": "#d1d5db",
        "0": "#ffffff"
      },
      text: {
        "950": "#0f172a",
        "700": "#1f2937",
        "500": "#6b7280",
        "300": "#9ca3af"
      },
      stroke: {
        "400": "#6b7280",
        "300": "#d1d5db",
        "200": "#e5e7eb",
        "100": "#f3f4f6"
      },
      accent: {
        "900": "#1f4ed8",
        "700": "#245ef5",
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
        "500": "#d97706",
        "300": "#fcd34d"
      },
      semanticGreen: {
        "900": "#14532d",
        "700": "#15803d",
        "500": "#22c55e",
        "300": "#86efac"
      }
    },
    {
      static: { black: "#0b0d12", white: "#ffffff" },
      background: {
        "950": "#f8fafc",
        "800": "#cbd5e1",
        "600": "#64748b",
        "400": "#475569",
        "200": "#1f2937",
        "0": "#0b0d12"
      },
      text: {
        "950": "#e5e7eb",
        "700": "#cbd5e1",
        "500": "#94a3b8",
        "300": "#64748b"
      },
      stroke: {
        "400": "#64748b",
        "300": "#475569",
        "200": "#374151",
        "100": "#1f2937"
      },
      accent: {
        "900": "#93c5fd",
        "700": "#60a5fa",
        "500": "#3b82f6",
        "300": "#245ef5"
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
    },
    {
      radius: {
        ...baseRadius,
        sm: "0.375rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem"
      },
      type: {
        ...baseTypography,
        family: {
          ...baseTypography.family,
          mono: "'Monaco', 'SF Mono', monospace"
        }
      }
    }
  ),
  framer: createPack(
    {
      static: { black: "#0f172a", white: "#ffffff" },
      background: {
        "950": "#0f172a",
        "800": "#1e293b",
        "600": "#334155",
        "400": "#94a3b8",
        "200": "#e2e8f0",
        "0": "#ffffff"
      },
      text: {
        "950": "#0f172a",
        "700": "#1e293b",
        "500": "#475569",
        "300": "#94a3b8"
      },
      stroke: {
        "400": "#64748b",
        "300": "#cbd5e1",
        "200": "#e2e8f0",
        "100": "#f1f5f9"
      },
      accent: {
        "900": "#7c3aed",
        "700": "#9333ea",
        "500": "#a855f7",
        "300": "#d8b4fe"
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
    },
    {
      static: { black: "#0f172a", white: "#ffffff" },
      background: {
        "950": "#f8fafc",
        "800": "#e2e8f0",
        "600": "#94a3b8",
        "400": "#64748b",
        "200": "#334155",
        "0": "#111827"
      },
      text: {
        "950": "#f8fafc",
        "700": "#e2e8f0",
        "500": "#94a3b8",
        "300": "#64748b"
      },
      stroke: {
        "400": "#64748b",
        "300": "#475569",
        "200": "#334155",
        "100": "#1e293b"
      },
      accent: {
        "900": "#e9d5ff",
        "700": "#c084fc",
        "500": "#a855f7",
        "300": "#9333ea"
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
    },
    {
      type: {
        ...baseTypography,
        size: {
          ...baseTypography.size,
          xl: "1.375rem",
          "2xl": "1.75rem",
          "3xl": "2.125rem"
        }
      },
      radius: {
        ...baseRadius,
        sm: "0.5rem",
        md: "0.625rem",
        lg: "0.875rem",
        xl: "1.125rem"
      }
    }
  )
};

export const stylePackNames = Object.keys(stylePacks) as StylePackName[];
