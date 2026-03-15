import type { Page } from "playwright";

export interface TokenViolation {
  property: string;
  value: string;
  element: string;
  suggestion: string;
}

export interface ContrastResult {
  element: string;
  foreground: string;
  background: string;
  ratio: number;
  wcagAA: boolean;
  wcagAAA: boolean;
}

// Known Zephr token values (from default.css) for suggestion matching.
// This is a curated subset of color tokens for violation suggestions.
const ZEPHR_TOKEN_COLORS: Record<string, string> = {
  "--z-color-primary": "#533afd",
  "--z-color-accent": "#533afd",
  "--z-color-background0": "#ffffff",
  "--z-color-background100": "#f6f9fc",
  "--z-color-background200": "#e6ebf1",
  "--z-color-background950": "#0a2540",
  "--z-color-text950": "#0a2540",
  "--z-color-text700": "#16304a",
  "--z-color-text500": "#697386",
  "--z-color-text300": "#8898aa",
  "--z-color-stroke100": "#f2f1f1",
  "--z-color-stroke200": "#e6ebf1",
  "--z-color-stroke300": "#d4dce8",
  "--z-color-danger": "#b91c1c",
  "--z-color-warning": "#b45309",
  "--z-color-success": "#15803d",
};

function hexToRgb(hex: string): [number, number, number] | null {
  const m = hex.replace("#", "").match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return null;
  return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
}

function rgbDistance(a: [number, number, number], b: [number, number, number]): number {
  return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2);
}

export function findClosestToken(hexColor: string): string {
  const rgb = hexToRgb(hexColor);
  if (!rgb) return "a Zephr color token";
  let closest = "";
  let minDist = Infinity;
  for (const [token, value] of Object.entries(ZEPHR_TOKEN_COLORS)) {
    const tRgb = hexToRgb(value);
    if (!tRgb) continue;
    const d = rgbDistance(rgb, tRgb);
    if (d < minDist) {
      minDist = d;
      closest = token;
    }
  }
  return closest ? `var(${closest})` : "a Zephr color token";
}

function relativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export function contrastRatio(fg: string, bg: string): number {
  const fgRgb = hexToRgb(fg);
  const bgRgb = hexToRgb(bg);
  if (!fgRgb || !bgRgb) return 1;
  const L1 = relativeLuminance(...fgRgb);
  const L2 = relativeLuminance(...bgRgb);
  const [lighter, darker] = L1 > L2 ? [L1, L2] : [L2, L1];
  return (lighter + 0.05) / (darker + 0.05);
}

export async function checkTokenCompliance(page: Page): Promise<TokenViolation[]> {
  // Run in the browser: walk elements, check computed colors vs CSS variables
  return page.evaluate(() => {
    const violations: Array<{ property: string; value: string; element: string; suggestion: string }> = [];
    const root = document.getElementById("zephr-render-root");
    if (!root) return violations;

    const props = ["backgroundColor", "color", "borderColor", "outlineColor"] as const;
    const propMap: Record<string, string> = {
      backgroundColor: "background-color",
      color: "color",
      borderColor: "border-color",
      outlineColor: "outline-color",
    };

    // Get all computed z-color token values
    const style = getComputedStyle(document.documentElement);
    const tokenValues = new Set<string>();
    for (let i = 0; i < style.length; i++) {
      const prop = style[i];
      if (prop.startsWith("--z-color-")) {
        tokenValues.add(style.getPropertyValue(prop).trim());
      }
    }

    const els = root.querySelectorAll("*");
    els.forEach((el) => {
      const cs = getComputedStyle(el);
      const tag = el.tagName.toLowerCase();
      const id = el.id ? `#${el.id}` : "";
      const cls = el.className && typeof el.className === "string"
        ? `.${el.className.split(" ")[0]}`
        : "";
      const selector = `${tag}${id}${cls}`;

      for (const prop of props) {
        const computed = cs[prop];
        if (!computed || computed === "rgba(0, 0, 0, 0)" || computed === "transparent") continue;

        // Check if the value is a known token value
        const isTokenValue = tokenValues.has(computed);
        if (!isTokenValue && (computed.startsWith("rgb") || computed.startsWith("#"))) {
          // It's a hardcoded value not matching any Zephr token
          violations.push({
            property: propMap[prop] ?? prop,
            value: computed,
            element: selector,
            suggestion: `Consider using a Zephr color token (var(--z-color-*)) instead of hardcoded '${computed}'`,
          });
        }
      }
    });

    return violations.slice(0, 20); // cap to avoid huge payloads
  });
}

export async function checkContrast(page: Page): Promise<ContrastResult[]> {
  return page.evaluate(() => {
    const results: Array<{
      element: string;
      foreground: string;
      background: string;
      ratio: number;
      wcagAA: boolean;
      wcagAAA: boolean;
    }> = [];

    const root = document.getElementById("zephr-render-root");
    if (!root) return results;

    function rgbToHex(rgb: string): string {
      const m = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (!m) return "#000000";
      const r = parseInt(m[1]).toString(16).padStart(2, "0");
      const g = parseInt(m[2]).toString(16).padStart(2, "0");
      const b = parseInt(m[3]).toString(16).padStart(2, "0");
      return `#${r}${g}${b}`;
    }

    function relativeLuminance(hex: string): number {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      const [rs, gs, bs] = [r, g, b].map((c) => {
        const s = c / 255;
        return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    }

    function contrastRatio(fg: string, bg: string): number {
      const L1 = relativeLuminance(fg);
      const L2 = relativeLuminance(bg);
      const [lighter, darker] = L1 > L2 ? [L1, L2] : [L2, L1];
      return (lighter + 0.05) / (darker + 0.05);
    }

    const textEls = root.querySelectorAll("button, a, p, span, h1, h2, h3, h4, label, li");
    textEls.forEach((el) => {
      const cs = getComputedStyle(el);
      const colorRaw = cs.color;
      if (!colorRaw || !colorRaw.startsWith("rgb")) return;

      const fg = rgbToHex(colorRaw);
      let bg = "#ffffff";

      // Walk up to find opaque background
      let node: Element | null = el;
      while (node) {
        const nodeBg = getComputedStyle(node).backgroundColor;
        if (nodeBg && nodeBg !== "rgba(0, 0, 0, 0)" && nodeBg !== "transparent" && nodeBg.startsWith("rgb")) {
          bg = rgbToHex(nodeBg);
          break;
        }
        node = node.parentElement;
      }

      const ratio = Math.round(contrastRatio(fg, bg) * 100) / 100;
      const tag = el.tagName.toLowerCase();
      const cls = el.className && typeof el.className === "string"
        ? `.${el.className.split(" ")[0]}`
        : "";

      results.push({
        element: `${tag}${cls}`,
        foreground: fg,
        background: bg,
        ratio,
        wcagAA: ratio >= 4.5,
        wcagAAA: ratio >= 7,
      });
    });

    return results.slice(0, 15);
  });
}
