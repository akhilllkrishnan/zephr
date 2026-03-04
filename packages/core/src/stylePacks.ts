import { DesignTokens, StylePackName } from "./types";

const baseTypography = {
  family: {
    sans: "'Satoshi', 'Segoe UI', sans-serif",
    serif: "'Fraunces', Georgia, serif",
    mono: "'JetBrains Mono', monospace"
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

function createPack(color: DesignTokens["color"], colorDark?: DesignTokens["colorDark"]): DesignTokens {
  return {
    color,
    ...(colorDark ? { colorDark } : {}),
    type: { ...baseTypography },
    space: { ...baseSpace },
    radius: { ...baseRadius },
    shadow: { ...baseShadow },
    motion: { ...baseMotion },
    breakpoints: { ...baseBreakpoints }
  };
}

export const stylePacks: Record<StylePackName, DesignTokens> = {
  Studio: createPack(
    {
      background: "#f7f8fb",
      surface: "#ffffff",
      text: "#111827",
      muted: "#6b7280",
      primary: "#121212",
      primaryContrast: "#ffffff",
      accent: "#f97316",
      border: "#e5e7eb",
      success: "#059669",
      danger: "#dc2626"
    },
    {
      background: "#0f1117",
      surface: "#1a1d27",
      text: "#f9fafb",
      muted: "#9ca3af",
      primary: "#3b82f6",
      primaryContrast: "#ffffff",
      accent: "#f97316",
      border: "#374151",
      success: "#10b981",
      danger: "#ef4444"
    }
  ),
  Editorial: createPack(
    {
      background: "#f8f5f1",
      surface: "#ffffff",
      text: "#1f2937",
      muted: "#5f6368",
      primary: "#1d4ed8",
      primaryContrast: "#ffffff",
      accent: "#be123c",
      border: "#d6d3d1",
      success: "#0f766e",
      danger: "#b91c1c"
    },
    {
      background: "#1c1713",
      surface: "#252119",
      text: "#f5f0eb",
      muted: "#9d9187",
      primary: "#6ca0e8",
      primaryContrast: "#ffffff",
      accent: "#f472b6",
      border: "#3d3730",
      success: "#34d399",
      danger: "#f87171"
    }
  ),
  NeoBrutal: createPack(
    {
      background: "#fff6d5",
      surface: "#ffffff",
      text: "#000000",
      muted: "#1f2937",
      primary: "#ff2955",
      primaryContrast: "#000000",
      accent: "#10b981",
      border: "#000000",
      success: "#16a34a",
      danger: "#ef4444"
    },
    {
      background: "#1a1500",
      surface: "#2a2200",
      text: "#ffffff",
      muted: "#d1d5db",
      primary: "#ff4d73",
      primaryContrast: "#000000",
      accent: "#34d399",
      border: "#ffffff",
      success: "#4ade80",
      danger: "#f87171"
    }
  ),
  SoftTech: createPack(
    {
      background: "#f4f7ff",
      surface: "#ffffff",
      text: "#1e293b",
      muted: "#64748b",
      primary: "#3b82f6",
      primaryContrast: "#ffffff",
      accent: "#06b6d4",
      border: "#dbeafe",
      success: "#22c55e",
      danger: "#ef4444"
    },
    {
      background: "#0e1525",
      surface: "#1a2236",
      text: "#e2e8f0",
      muted: "#94a3b8",
      primary: "#60a5fa",
      primaryContrast: "#ffffff",
      accent: "#22d3ee",
      border: "#1e3a5f",
      success: "#4ade80",
      danger: "#f87171"
    }
  ),
  Enterprise: createPack(
    {
      background: "#f9fafb",
      surface: "#ffffff",
      text: "#111827",
      muted: "#4b5563",
      primary: "#0f766e",
      primaryContrast: "#ffffff",
      accent: "#334155",
      border: "#e2e8f0",
      success: "#15803d",
      danger: "#b91c1c"
    },
    {
      background: "#0d1117",
      surface: "#161b22",
      text: "#e6edf3",
      muted: "#8b949e",
      primary: "#2dd4bf",
      primaryContrast: "#0d1117",
      accent: "#94a3b8",
      border: "#30363d",
      success: "#3fb950",
      danger: "#f85149"
    }
  ),
  Clarity: {
    ...createPack(
      {
        background: "#f7f7f7",
        surface: "#ffffff",
        text: "#171717",
        muted: "#5c5c5c",
        primary: "#121212",
        primaryContrast: "#ffffff",
        accent: "#fa7319",
        border: "#e5e5e5",
        success: "#1fc16b",
        danger: "#ef4444",
        verified: "#47c2ff",
        feature: "#7d52f4",
        away: "#f6b51e",
        warning: "#fa7319",
        strong: "#171717",
        weak: "#f7f7f7",
        white: "#ffffff"
      },
      {
        background: "#111111",
        surface: "#1a1a1a",
        text: "#f5f5f5",
        muted: "#888888",
        primary: "#121212",
        primaryContrast: "#ffffff",
        accent: "#fb8c3a",
        border: "#2a2a2a",
        success: "#3dce80",
        danger: "#f87171",
        verified: "#47c2ff",
        feature: "#9b6dff",
        away: "#f9c84a",
        warning: "#fb8c3a",
        strong: "#f5f5f5",
        weak: "#1a1a1a",
        white: "#ffffff"
      }
    ),
    type: {
      ...baseTypography,
      family: {
        ...baseTypography.family,
        sans: "'Inter', 'Satoshi', 'Segoe UI', sans-serif",
        serif: "'Inter', 'Satoshi', 'Segoe UI', sans-serif"
      }
    },
    radius: {
      ...baseRadius,
      sm: "0.375rem",
      md: "0.75rem",
      lg: "1.25rem",
      xl: "2rem"
    },
    shadow: {
      ...baseShadow,
      sm: "0 0 0 1px rgba(51,51,51,0.06), 0 1px 1px rgba(51,51,51,0.04)",
      md: "0 3px 3px rgba(51,51,51,0.02), 0 6px 6px rgba(51,51,51,0.04), 0 12px 12px rgba(51,51,51,0.04)",
      lg: "0 24px 24px rgba(51,51,51,0.04), 0 48px 48px rgba(51,51,51,0.04)"
    }
  }
};

export const stylePackNames = Object.keys(stylePacks) as StylePackName[];
