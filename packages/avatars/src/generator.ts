import { AvatarOptions, AvatarPayload, AvatarStyle } from "./types";

function hash(input: string): number {
  let value = 0;
  for (const char of input) {
    value = (value * 31 + char.charCodeAt(0)) >>> 0;
  }
  return value;
}

function initials(name: string): string {
  const fromName = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
  return fromName || "Z";
}

const defaultPalette = [
  "#121212",
  "#2f6fed",
  "#1094b3",
  "#0f766e",
  "#a43ff4",
  "#f97316",
  "#dc2626",
  "#1fc16b"
];

const pastelPalette = ["#c4b5fd", "#bfdbfe", "#bae6fd", "#bbf7d0", "#fde68a", "#fecaca", "#fbcfe8"];

function pickColor(seed: string, palette: string[]): string {
  return palette[hash(seed) % palette.length];
}

function styleBackground(style: AvatarStyle, seed: string, fallback: string): { base: string; accent: string } {
  if (style === "soft") {
    return {
      base: pickColor(`soft-${seed}`, pastelPalette),
      accent: pickColor(`soft-accent-${seed}`, pastelPalette)
    };
  }

  if (style === "mono") {
    const tone = 30 + (hash(seed) % 40);
    return {
      base: `hsl(220 8% ${tone}%)`,
      accent: `hsl(220 10% ${Math.max(12, tone - 14)}%)`
    };
  }

  return {
    base: fallback,
    accent: pickColor(`accent-${seed}`, defaultPalette)
  };
}

function svgForStyle(
  style: AvatarStyle,
  size: number,
  label: string,
  ariaLabel: string,
  base: string,
  accent: string,
  textColor: string
): string {
  const radius = Math.floor(size * 0.22);

  if (style === "beam") {
    return `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' role='img' aria-label='${ariaLabel}'>
      <defs>
        <linearGradient id='beam' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stop-color='${base}' />
          <stop offset='100%' stop-color='${accent}' />
        </linearGradient>
      </defs>
      <rect width='${size}' height='${size}' fill='url(#beam)' rx='${radius}' />
      <path d='M-8 ${size * 0.72} L${size * 0.38} ${size * 0.16} L${size + 8} ${size * 0.4} L${size * 0.6} ${size + 8} Z' fill='rgba(255,255,255,0.2)' />
      <text x='50%' y='53%' dominant-baseline='middle' text-anchor='middle' fill='${textColor}' font-size='${Math.floor(size * 0.34)}' font-family='IBM Plex Sans, Arial, sans-serif' font-weight='700'>${label}</text>
    </svg>`;
  }

  if (style === "ring") {
    return `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' role='img' aria-label='${ariaLabel}'>
      <rect width='${size}' height='${size}' fill='${base}' rx='${radius}' />
      <circle cx='${size / 2}' cy='${size / 2}' r='${size * 0.32}' fill='none' stroke='rgba(255,255,255,0.55)' stroke-width='${Math.max(2, Math.floor(size * 0.08))}' />
      <circle cx='${size / 2}' cy='${size / 2}' r='${size * 0.19}' fill='rgba(0,0,0,0.2)' />
      <text x='50%' y='53%' dominant-baseline='middle' text-anchor='middle' fill='${textColor}' font-size='${Math.floor(size * 0.28)}' font-family='IBM Plex Sans, Arial, sans-serif' font-weight='700'>${label}</text>
    </svg>`;
  }

  if (style === "blob") {
    return `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' role='img' aria-label='${ariaLabel}'>
      <rect width='${size}' height='${size}' fill='${base}' rx='${radius}' />
      <path d='M${size * 0.18} ${size * 0.52}C${size * 0.15} ${size * 0.3} ${size * 0.36} ${size * 0.14} ${size * 0.56} ${size * 0.22}C${size * 0.73} ${size * 0.28} ${size * 0.86} ${size * 0.46} ${size * 0.78} ${size * 0.64}C${size * 0.71} ${size * 0.82} ${size * 0.52} ${size * 0.9} ${size * 0.34} ${size * 0.84}C${size * 0.23} ${size * 0.8} ${size * 0.12} ${size * 0.68} ${size * 0.18} ${size * 0.52}Z' fill='rgba(255,255,255,0.2)' />
      <text x='50%' y='53%' dominant-baseline='middle' text-anchor='middle' fill='${textColor}' font-size='${Math.floor(size * 0.33)}' font-family='IBM Plex Sans, Arial, sans-serif' font-weight='700'>${label}</text>
    </svg>`;
  }

  if (style === "pixel") {
    const cell = Math.max(4, Math.floor(size / 8));
    const blocks = Array.from({ length: 14 }, (_, index) => {
      const offset = hash(`pixel-${index}-${label}`);
      const x = (offset % 8) * cell;
      const y = (Math.floor(offset / 8) % 8) * cell;
      const alpha = 0.12 + ((offset % 35) / 100);
      return `<rect x='${x}' y='${y}' width='${cell}' height='${cell}' fill='rgba(255,255,255,${alpha.toFixed(2)})' />`;
    }).join("");

    return `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' role='img' aria-label='${ariaLabel}'>
      <rect width='${size}' height='${size}' fill='${base}' rx='${radius}' />
      ${blocks}
      <text x='50%' y='54%' dominant-baseline='middle' text-anchor='middle' fill='${textColor}' font-size='${Math.floor(size * 0.3)}' font-family='IBM Plex Sans, Arial, sans-serif' font-weight='700'>${label}</text>
    </svg>`;
  }

  if (style === "sunset") {
    return `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' role='img' aria-label='${ariaLabel}'>
      <defs>
        <linearGradient id='sunset' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stop-color='${accent}' />
          <stop offset='100%' stop-color='${base}' />
        </linearGradient>
      </defs>
      <rect width='${size}' height='${size}' fill='url(#sunset)' rx='${radius}' />
      <circle cx='${size * 0.5}' cy='${size * 0.38}' r='${size * 0.16}' fill='rgba(255,255,255,0.3)' />
      <rect x='0' y='${size * 0.65}' width='${size}' height='${size * 0.35}' fill='rgba(0,0,0,0.16)' />
      <text x='50%' y='75%' dominant-baseline='middle' text-anchor='middle' fill='${textColor}' font-size='${Math.floor(size * 0.25)}' font-family='IBM Plex Sans, Arial, sans-serif' font-weight='700'>${label}</text>
    </svg>`;
  }

  if (style === "soft") {
    return `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' role='img' aria-label='${ariaLabel}'>
      <rect width='${size}' height='${size}' fill='${base}' rx='${radius}' />
      <circle cx='${size * 0.33}' cy='${size * 0.28}' r='${size * 0.2}' fill='rgba(255,255,255,0.36)' />
      <circle cx='${size * 0.72}' cy='${size * 0.78}' r='${size * 0.16}' fill='${accent}' opacity='0.34' />
      <text x='50%' y='54%' dominant-baseline='middle' text-anchor='middle' fill='${textColor}' font-size='${Math.floor(size * 0.3)}' font-family='IBM Plex Sans, Arial, sans-serif' font-weight='700'>${label}</text>
    </svg>`;
  }

  if (style === "capsule") {
    return `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' role='img' aria-label='${ariaLabel}'>
      <rect width='${size}' height='${size}' fill='${base}' rx='${radius}' />
      <rect x='${size * 0.12}' y='${size * 0.22}' width='${size * 0.76}' height='${size * 0.56}' rx='${size * 0.28}' fill='rgba(0,0,0,0.18)' />
      <rect x='${size * 0.16}' y='${size * 0.28}' width='${size * 0.68}' height='${size * 0.44}' rx='${size * 0.22}' fill='rgba(255,255,255,0.2)' />
      <text x='50%' y='52%' dominant-baseline='middle' text-anchor='middle' fill='${textColor}' font-size='${Math.floor(size * 0.26)}' font-family='IBM Plex Sans, Arial, sans-serif' font-weight='700'>${label}</text>
    </svg>`;
  }

  if (style === "mono") {
    return `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' role='img' aria-label='${ariaLabel}'>
      <rect width='${size}' height='${size}' fill='${base}' rx='${radius}' />
      <path d='M0 ${size * 0.7} L${size} ${size * 0.45} L${size} ${size} L0 ${size} Z' fill='rgba(255,255,255,0.09)' />
      <text x='50%' y='53%' dominant-baseline='middle' text-anchor='middle' fill='${textColor}' font-size='${Math.floor(size * 0.3)}' font-family='IBM Plex Sans, Arial, sans-serif' font-weight='700'>${label}</text>
    </svg>`;
  }

  if (style === "orbit") {
    return `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' role='img' aria-label='${ariaLabel}'>
      <rect width='${size}' height='${size}' fill='${base}' rx='${radius}' />
      <ellipse cx='${size * 0.5}' cy='${size * 0.5}' rx='${size * 0.35}' ry='${size * 0.14}' fill='none' stroke='rgba(255,255,255,0.45)' stroke-width='2' />
      <ellipse cx='${size * 0.5}' cy='${size * 0.5}' rx='${size * 0.14}' ry='${size * 0.35}' fill='none' stroke='rgba(255,255,255,0.35)' stroke-width='2' />
      <circle cx='${size * 0.5}' cy='${size * 0.5}' r='${size * 0.2}' fill='rgba(0,0,0,0.2)' />
      <text x='50%' y='54%' dominant-baseline='middle' text-anchor='middle' fill='${textColor}' font-size='${Math.floor(size * 0.24)}' font-family='IBM Plex Sans, Arial, sans-serif' font-weight='700'>${label}</text>
    </svg>`;
  }

  return `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' role='img' aria-label='${ariaLabel}'>
    <rect width='${size}' height='${size}' fill='${base}' rx='${radius}' />
    <text x='50%' y='53%' dominant-baseline='middle' text-anchor='middle' fill='${textColor}' font-size='${Math.floor(size * 0.38)}' font-family='IBM Plex Sans, Arial, sans-serif' font-weight='700'>${label}</text>
  </svg>`;
}

export function generateAvatarSvg(options: AvatarOptions): string {
  const size = options.size ?? 96;
  const seed = options.seed ?? options.name;
  const style = options.style ?? "initials";
  const fallback = options.background ?? pickColor(seed, defaultPalette);
  const colors = styleBackground(style, seed, fallback);
  const textColor = options.textColor ?? "#ffffff";
  const label = initials(options.name);

  return svgForStyle(style, size, label, options.name, colors.base, colors.accent, textColor);
}

export function generateAvatar(options: AvatarOptions): AvatarPayload {
  const svg = generateAvatarSvg(options);
  return {
    svg,
    dataUri: `data:image/svg+xml,${encodeURIComponent(svg)}`
  };
}
