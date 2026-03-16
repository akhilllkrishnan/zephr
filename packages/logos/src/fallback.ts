import { LogoCatalogEntry } from "./types";
import { getBrandSvg } from "./svgs";

function hash(input: string): number {
  let value = 0;
  for (const char of input) {
    value = (value * 31 + char.charCodeAt(0)) >>> 0;
  }
  return value;
}

function initials(value: string): string {
  return value
    .replace(/^https?:\/\//, "")
    .split(/[\s.-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((token) => token[0]?.toUpperCase() ?? "")
    .join("") || "Z";
}

function defaultPalette(seed: string): { base: string; accent: string } {
  const palette = ["#2563eb", "#0f766e", "#be123c", "#f97316", "#4338ca", "#0891b2", "#121212"];
  const base = palette[hash(seed) % palette.length];
  const accent = palette[(hash(`accent-${seed}`) + 2) % palette.length];
  return { base, accent };
}

export function createCatalogLogoDataUri(entry: LogoCatalogEntry, size = 128): string {
  const radius = Math.floor(size * 0.16);
  const brandSvg = getBrandSvg(entry.domain);

  if (brandSvg) {
    const pad = Math.floor(size * 0.17);
    const inner = size - pad * 2;
    const pathsMarkup = brandSvg.paths
      .map(p => `<path d='${p.d}' fill='${p.fill}'${p.fillRule ? ` fill-rule='${p.fillRule}'` : ""}/>`)
      .join("");
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'><rect width='${size}' height='${size}' rx='${radius}' fill='${brandSvg.bg}'/><svg x='${pad}' y='${pad}' width='${inner}' height='${inner}' viewBox='${brandSvg.viewBox}'>${pathsMarkup}</svg></svg>`;
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }

  const mark = initials(entry.name);
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'>
    <defs>
      <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stop-color='${entry.color}' />
        <stop offset='100%' stop-color='#0f172a' />
      </linearGradient>
    </defs>
    <rect width='${size}' height='${size}' rx='${radius}' fill='url(#g)' />
    <rect x='${Math.floor(size * 0.12)}' y='${Math.floor(size * 0.12)}' width='${Math.floor(size * 0.76)}' height='${Math.floor(size * 0.76)}' rx='${Math.floor(size * 0.14)}' fill='rgba(255,255,255,0.1)' />
    <text x='50%' y='53%' text-anchor='middle' dominant-baseline='middle' font-family='IBM Plex Sans, Arial, sans-serif' font-size='${Math.floor(size * 0.33)}' font-weight='700' fill='#ffffff'>${mark}</text>
  </svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export function createFallbackLogoDataUri(domain: string, size = 128): string {
  const mark = initials(domain);
  const palette = defaultPalette(domain);
  const radius = Math.floor(size * 0.16);

  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'>
    <defs>
      <linearGradient id='fb' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stop-color='${palette.base}' />
        <stop offset='100%' stop-color='${palette.accent}' />
      </linearGradient>
    </defs>
    <rect width='${size}' height='${size}' fill='url(#fb)' rx='${radius}' />
    <text x='50%' y='53%' text-anchor='middle' dominant-baseline='middle' font-family='IBM Plex Sans, Arial, sans-serif' font-size='${Math.floor(size * 0.33)}' font-weight='700' fill='#ffffff'>${mark}</text>
  </svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
