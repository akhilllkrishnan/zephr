"use client";
import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";

export type ColorPickerFormat = "hex" | "rgb" | "hsl";

export interface ColorPickerChange {
  hex: string;
  rgb: string;
  hsl: string;
  opacity: number;
  format: ColorPickerFormat;
}

export interface ColorPickerProps {
  value?: string;
  format?: ColorPickerFormat;
  opacity?: number;
  showRecommendedColors?: boolean;
  recommendedColors?: string[];
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  onChange?: (next: ColorPickerChange) => void;
}

interface HsvaValue {
  h: number;
  s: number;
  v: number;
}

const DEFAULT_COLOR = "#335cff";
const DEFAULT_RECOMMENDED_COLORS = [
  "#707483",
  "#335cff",
  "#f17a1a",
  "#f04438",
  "#1fc16b",
  "#f6b51e",
  "#7d52f4",
  "#47c2ff"
];

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function normalizeHex(input: string): string | null {
  const trimmed = input.trim().replace(/^#/, "");
  if (/^[0-9a-fA-F]{3}$/.test(trimmed)) {
    return `#${trimmed
      .split("")
      .map((char) => char + char)
      .join("")
      .toLowerCase()}`;
  }
  if (/^[0-9a-fA-F]{6}$/.test(trimmed)) {
    return `#${trimmed.toLowerCase()}`;
  }
  return null;
}

function parseRgbInput(input: string): [number, number, number] | null {
  const cleaned = input.trim().replace(/^rgba?\(/i, "").replace(/\)$/i, "");
  const parts = cleaned.split(/[\s,]+/).filter(Boolean);
  if (parts.length < 3) return null;
  const [r, g, b] = parts.slice(0, 3).map((part) => Number(part));
  if ([r, g, b].some((value) => Number.isNaN(value))) return null;
  return [clamp(Math.round(r), 0, 255), clamp(Math.round(g), 0, 255), clamp(Math.round(b), 0, 255)];
}

function parseHslInput(input: string): [number, number, number] | null {
  const cleaned = input
    .trim()
    .replace(/^hsla?\(/i, "")
    .replace(/\)$/i, "")
    .replace(/%/g, "");
  const parts = cleaned.split(/[\s,]+/).filter(Boolean);
  if (parts.length < 3) return null;
  const h = Number(parts[0]);
  const s = Number(parts[1]);
  const l = Number(parts[2]);
  if ([h, s, l].some((value) => Number.isNaN(value))) return null;
  return [((h % 360) + 360) % 360, clamp(s, 0, 100), clamp(l, 0, 100)];
}

function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
  const sat = clamp(s, 0, 100) / 100;
  const val = clamp(v, 0, 100) / 100;
  const hh = ((h % 360) + 360) % 360;
  const c = val * sat;
  const x = c * (1 - Math.abs(((hh / 60) % 2) - 1));
  const m = val - c;

  let rr = 0;
  let gg = 0;
  let bb = 0;

  if (hh < 60) {
    rr = c;
    gg = x;
  } else if (hh < 120) {
    rr = x;
    gg = c;
  } else if (hh < 180) {
    gg = c;
    bb = x;
  } else if (hh < 240) {
    gg = x;
    bb = c;
  } else if (hh < 300) {
    rr = x;
    bb = c;
  } else {
    rr = c;
    bb = x;
  }

  return [
    Math.round((rr + m) * 255),
    Math.round((gg + m) * 255),
    Math.round((bb + m) * 255)
  ];
}

function rgbToHsv(r: number, g: number, b: number): HsvaValue {
  const rr = clamp(r, 0, 255) / 255;
  const gg = clamp(g, 0, 255) / 255;
  const bb = clamp(b, 0, 255) / 255;
  const max = Math.max(rr, gg, bb);
  const min = Math.min(rr, gg, bb);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === rr) {
      h = 60 * (((gg - bb) / delta) % 6);
    } else if (max === gg) {
      h = 60 * ((bb - rr) / delta + 2);
    } else {
      h = 60 * ((rr - gg) / delta + 4);
    }
  }
  if (h < 0) h += 360;

  const s = max === 0 ? 0 : (delta / max) * 100;
  const v = max * 100;
  return { h, s, v };
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const rr = clamp(r, 0, 255) / 255;
  const gg = clamp(g, 0, 255) / 255;
  const bb = clamp(b, 0, 255) / 255;
  const max = Math.max(rr, gg, bb);
  const min = Math.min(rr, gg, bb);
  const delta = max - min;
  const l = (max + min) / 2;

  let h = 0;
  let s = 0;

  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
    if (max === rr) {
      h = 60 * (((gg - bb) / delta) % 6);
    } else if (max === gg) {
      h = 60 * ((bb - rr) / delta + 2);
    } else {
      h = 60 * ((rr - gg) / delta + 4);
    }
  }

  if (h < 0) h += 360;
  return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const sat = clamp(s, 0, 100) / 100;
  const light = clamp(l, 0, 100) / 100;
  const hh = ((h % 360) + 360) % 360;

  const c = (1 - Math.abs(2 * light - 1)) * sat;
  const x = c * (1 - Math.abs(((hh / 60) % 2) - 1));
  const m = light - c / 2;

  let rr = 0;
  let gg = 0;
  let bb = 0;

  if (hh < 60) {
    rr = c;
    gg = x;
  } else if (hh < 120) {
    rr = x;
    gg = c;
  } else if (hh < 180) {
    gg = c;
    bb = x;
  } else if (hh < 240) {
    gg = x;
    bb = c;
  } else if (hh < 300) {
    rr = x;
    bb = c;
  } else {
    rr = c;
    bb = x;
  }

  return [
    Math.round((rr + m) * 255),
    Math.round((gg + m) * 255),
    Math.round((bb + m) * 255)
  ];
}

function toHexByte(value: number): string {
  return clamp(Math.round(value), 0, 255).toString(16).padStart(2, "0");
}

function hsvaToHex(hsva: HsvaValue): string {
  const [r, g, b] = hsvToRgb(hsva.h, hsva.s, hsva.v);
  return `#${toHexByte(r)}${toHexByte(g)}${toHexByte(b)}`;
}

function formatHexValue(hsva: HsvaValue): string {
  return hsvaToHex(hsva).replace("#", "").toUpperCase();
}

function formatRgbValue(hsva: HsvaValue): string {
  const [r, g, b] = hsvToRgb(hsva.h, hsva.s, hsva.v);
  return `${r}, ${g}, ${b}`;
}

function formatHslValue(hsva: HsvaValue): string {
  const [r, g, b] = hsvToRgb(hsva.h, hsva.s, hsva.v);
  const [h, s, l] = rgbToHsl(r, g, b);
  return `${h}, ${s}%, ${l}%`;
}

function formatByMode(mode: ColorPickerFormat, hsva: HsvaValue): string {
  if (mode === "rgb") return formatRgbValue(hsva);
  if (mode === "hsl") return formatHslValue(hsva);
  return formatHexValue(hsva);
}

function parseInputByMode(value: string, mode: ColorPickerFormat): HsvaValue | null {
  if (mode === "hex") {
    const hex = normalizeHex(value);
    if (!hex) return null;
    const raw = hex.replace("#", "");
    const r = Number.parseInt(raw.slice(0, 2), 16);
    const g = Number.parseInt(raw.slice(2, 4), 16);
    const b = Number.parseInt(raw.slice(4, 6), 16);
    return rgbToHsv(r, g, b);
  }

  if (mode === "rgb") {
    const rgb = parseRgbInput(value);
    if (!rgb) return null;
    return rgbToHsv(rgb[0], rgb[1], rgb[2]);
  }

  const hsl = parseHslInput(value);
  if (!hsl) return null;
  const [r, g, b] = hslToRgb(hsl[0], hsl[1], hsl[2]);
  return rgbToHsv(r, g, b);
}

function parseInitialColor(value: string | undefined): HsvaValue {
  const parsed = parseInputByMode(value ?? "", "hex");
  if (parsed) return parsed;
  return parseInputByMode(DEFAULT_COLOR, "hex") as HsvaValue;
}

function ChevronDownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden focusable="false">
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EyedropperIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden focusable="false">
      <path
        d="M12.54 3.22a2.25 2.25 0 013.18 3.18l-1.1 1.1 1.08 1.08a.75.75 0 010 1.06l-1.06 1.06a.75.75 0 01-1.06 0l-1.08-1.08-4.66 4.66a1.5 1.5 0 01-.65.38l-2.27.63a.75.75 0 01-.92-.92l.63-2.27a1.5 1.5 0 01.38-.65l4.66-4.66-1.08-1.08a.75.75 0 010-1.06L9.72 3.5a.75.75 0 011.06 0l1.08 1.08 1.1-1.1z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ColorPicker({
  value = DEFAULT_COLOR,
  format = "hex",
  opacity = 100,
  showRecommendedColors = true,
  recommendedColors = DEFAULT_RECOMMENDED_COLORS,
  disabled = false,
  className,
  style,
  onChange
}: ColorPickerProps) {
  const spectrumRef = useRef<HTMLDivElement | null>(null);
  const [draggingSpectrum, setDraggingSpectrum] = useState(false);
  const [hsva, setHsva] = useState<HsvaValue>(() => parseInitialColor(value));
  const [currentFormat, setCurrentFormat] = useState<ColorPickerFormat>(format);
  const [alphaPercent, setAlphaPercent] = useState<number>(clamp(opacity, 0, 100));
  const [inputValue, setInputValue] = useState<string>(() => formatByMode(format, parseInitialColor(value)));
  const [isEditingInput, setIsEditingInput] = useState(false);

  useEffect(() => {
    setHsva(parseInitialColor(value));
  }, [value]);

  useEffect(() => {
    setCurrentFormat(format);
  }, [format]);

  useEffect(() => {
    setAlphaPercent(clamp(opacity, 0, 100));
  }, [opacity]);

  const normalizedOpacity = clamp(alphaPercent, 0, 100);
  const rgb = useMemo(() => hsvToRgb(hsva.h, hsva.s, hsva.v), [hsva]);
  const hueColor = useMemo(() => {
    const [r, g, b] = hsvToRgb(hsva.h, 100, 100);
    return `rgb(${r}, ${g}, ${b})`;
  }, [hsva.h]);
  const opaqueColor = useMemo(() => `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1)`, [rgb]);

  const displayValue = useMemo(() => formatByMode(currentFormat, hsva), [currentFormat, hsva]);
  const normalizedHex = useMemo(() => hsvaToHex(hsva), [hsva]);

  useEffect(() => {
    if (!isEditingInput) {
      setInputValue(displayValue);
    }
  }, [displayValue, isEditingInput]);

  useEffect(() => {
    if (!onChange) return;
    const [h, s, l] = rgbToHsl(rgb[0], rgb[1], rgb[2]);
    onChange({
      hex: normalizedHex,
      rgb: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`,
      hsl: `hsl(${h} ${s}% ${l}%)`,
      opacity: normalizedOpacity,
      format: currentFormat
    });
  }, [currentFormat, normalizedHex, normalizedOpacity, onChange, rgb, hsva]);

  function updateSpectrumFromPointer(clientX: number, clientY: number): void {
    if (disabled || !spectrumRef.current) return;
    const rect = spectrumRef.current.getBoundingClientRect();
    const x = clamp(clientX - rect.left, 0, rect.width);
    const y = clamp(clientY - rect.top, 0, rect.height);
    const nextS = rect.width === 0 ? 0 : (x / rect.width) * 100;
    const nextV = rect.height === 0 ? 100 : 100 - (y / rect.height) * 100;

    setHsva((current) => ({
      ...current,
      s: clamp(nextS, 0, 100),
      v: clamp(nextV, 0, 100)
    }));
  }

  function commitInput(raw: string): void {
    const parsed = parseInputByMode(raw, currentFormat);
    if (!parsed) {
      setInputValue(displayValue);
      return;
    }
    setHsva(parsed);
    setInputValue(formatByMode(currentFormat, parsed));
  }

  const recommendedValues = useMemo(
    () =>
      recommendedColors
        .map((color) => normalizeHex(color))
        .filter((color): color is string => Boolean(color)),
    [recommendedColors]
  );

  return (
    <div
      className={className}
      style={{
        width: "272px",
        border: "1px solid var(--z-color-stroke200, #ebebeb)",
        borderRadius: "16px",
        background: "var(--z-color-background0, #ffffff)",
        boxShadow: "0 16px 32px -12px rgba(14, 18, 27, 0.1)",
        overflow: "hidden",
        opacity: disabled ? 0.72 : 1,
        ...style
      }}
      aria-disabled={disabled}
    >
      <div
        style={{
          padding: "16px",
          borderBottom: "1px solid var(--z-color-stroke200, #ebebeb)",
          display: "grid",
          gap: "12px"
        }}
      >
        <div
          ref={spectrumRef}
          role="presentation"
          onPointerDown={(event) => {
            if (disabled) return;
            event.preventDefault();
            setDraggingSpectrum(true);
            event.currentTarget.setPointerCapture(event.pointerId);
            updateSpectrumFromPointer(event.clientX, event.clientY);
          }}
          onPointerMove={(event) => {
            if (!draggingSpectrum || disabled) return;
            updateSpectrumFromPointer(event.clientX, event.clientY);
          }}
          onPointerUp={() => setDraggingSpectrum(false)}
          onPointerCancel={() => setDraggingSpectrum(false)}
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "1 / 1",
            borderRadius: "8px",
            background: `linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0) 60%), linear-gradient(to top, #000000 0%, rgba(0,0,0,0) 65%), ${hueColor}`,
            cursor: disabled ? "default" : "crosshair",
            userSelect: "none",
            touchAction: "none"
          }}
        >
          <span
            style={{
              position: "absolute",
              left: `calc(${hsva.s}% - 8px)`,
              top: `calc(${100 - hsva.v}% - 8px)`,
              width: "16px",
              height: "16px",
              borderRadius: "999px",
              border: "2px solid #ffffff",
              boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
              background: "transparent",
              pointerEvents: "none"
            }}
            aria-hidden
          />
        </div>

        <div style={{ display: "grid", gap: "8px" }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "8px",
              borderRadius: "999px",
              background:
                "linear-gradient(90deg, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)"
            }}
          >
            <span
              style={{
                position: "absolute",
                top: "50%",
                left: `calc(${(hsva.h / 360) * 100}% - 8px)`,
                width: "16px",
                height: "16px",
                borderRadius: "999px",
                transform: "translateY(-50%)",
                border: "2px solid #ffffff",
                boxShadow: "0 2px 4px rgba(0,0,0,0.25)",
                background: hueColor,
                pointerEvents: "none"
              }}
              aria-hidden
            />
            <input
              aria-label="Hue"
              type="range"
              min={0}
              max={360}
              step={1}
              disabled={disabled}
              value={Math.round(hsva.h)}
              onChange={(event) => {
                const nextHue = clamp(Number(event.target.value), 0, 360);
                setHsva((current) => ({ ...current, h: nextHue }));
              }}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                opacity: 0,
                margin: 0,
                cursor: disabled ? "default" : "pointer"
              }}
            />
          </div>

          <div
            style={{
              position: "relative",
              width: "100%",
              height: "8px",
              borderRadius: "999px",
              border: "1px solid var(--z-color-stroke200, #ebebeb)",
              backgroundImage:
                `linear-gradient(45deg, rgba(17,24,39,0.14) 25%, transparent 25%), linear-gradient(-45deg, rgba(17,24,39,0.14) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(17,24,39,0.14) 75%), linear-gradient(-45deg, transparent 75%, rgba(17,24,39,0.14) 75%), linear-gradient(90deg, rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0) 0%, ${opaqueColor} 100%)`,
              backgroundSize: "8px 8px, 8px 8px, 8px 8px, 8px 8px, 100% 100%",
              backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0, 0 0"
            }}
          >
            <span
              style={{
                position: "absolute",
                top: "50%",
                left: `calc(${normalizedOpacity}% - 8px)`,
                width: "16px",
                height: "16px",
                borderRadius: "999px",
                transform: "translateY(-50%)",
                border: "2px solid #ffffff",
                boxShadow: "0 2px 4px rgba(0,0,0,0.25)",
                background: normalizedHex,
                pointerEvents: "none"
              }}
              aria-hidden
            />
            <input
              aria-label="Opacity"
              type="range"
              min={0}
              max={100}
              step={1}
              disabled={disabled}
              value={Math.round(normalizedOpacity)}
              onChange={(event) => setAlphaPercent(clamp(Number(event.target.value), 0, 100))}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                opacity: 0,
                margin: 0,
                cursor: disabled ? "default" : "pointer"
              }}
            />
          </div>
        </div>

        <div style={{ display: "grid", gap: "4px" }}>
          <label
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "2px",
              width: "fit-content",
              color: "var(--z-color-text, #171717)",
              fontSize: "14px",
              lineHeight: "20px",
              letterSpacing: "-0.006em",
              fontWeight: 500
            }}
          >
            <select
              value={currentFormat}
              disabled={disabled}
              aria-label="Color format"
              onChange={(event) => setCurrentFormat(event.target.value as ColorPickerFormat)}
              style={{
                border: "none",
                background: "transparent",
                color: "inherit",
                font: "inherit",
                appearance: "none",
                WebkitAppearance: "none",
                MozAppearance: "none",
                cursor: disabled ? "default" : "pointer",
                paddingRight: "14px"
              }}
            >
              <option value="hex">Hex</option>
              <option value="rgb">RGB</option>
              <option value="hsl">HSL</option>
            </select>
            <span style={{ marginLeft: "-12px", color: "var(--z-color-muted, #5c5c5c)" }} aria-hidden>
              <ChevronDownIcon />
            </span>
          </label>

          <div
            style={{
              display: "flex",
              border: "1px solid var(--z-color-stroke200, #ebebeb)",
              borderRadius: "8px",
              background: "var(--z-color-background0, #ffffff)",
              overflow: "hidden",
              minHeight: "36px"
            }}
          >
            <button
              type="button"
              aria-label="Color picker tool"
              disabled={disabled}
              style={{
                width: "36px",
                border: "none",
                borderRight: "1px solid var(--z-color-stroke200, #ebebeb)",
                background: "transparent",
                color: "var(--z-color-muted, #5c5c5c)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: disabled ? "default" : "pointer"
              }}
            >
              <EyedropperIcon />
            </button>
            <input
              value={inputValue}
              disabled={disabled}
              aria-label={`${currentFormat.toUpperCase()} value`}
              onFocus={() => setIsEditingInput(true)}
              onChange={(event) => setInputValue(event.target.value)}
              onBlur={() => {
                setIsEditingInput(false);
                commitInput(inputValue);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  commitInput(inputValue);
                  event.currentTarget.blur();
                }
              }}
              style={{
                flex: 1,
                minWidth: 0,
                border: "none",
                background: "transparent",
                padding: "0 10px",
                color: "var(--z-color-text, #171717)",
                fontSize: "14px",
                lineHeight: "20px",
                letterSpacing: "-0.006em",
                outline: "none"
              }}
            />
            <span
              style={{
                minWidth: "56px",
                borderLeft: "1px solid var(--z-color-stroke200, #ebebeb)",
                padding: "0 10px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--z-color-muted, #5c5c5c)",
                fontSize: "14px",
                lineHeight: "20px",
                letterSpacing: "-0.006em"
              }}
            >
              {Math.round(normalizedOpacity)}%
            </span>
          </div>
        </div>
      </div>

      {showRecommendedColors ? (
        <div
          style={{
            padding: "16px",
            display: "grid",
            gap: "8px"
          }}
        >
          <p
            style={{
              margin: 0,
              color: "var(--z-color-muted, #5c5c5c)",
              fontSize: "12px",
              lineHeight: "16px"
            }}
          >
            Recommended Colors
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
            {recommendedValues.map((color) => {
              const selected = color === normalizedHex.toLowerCase();
              return (
                <button
                  key={color}
                  type="button"
                  aria-label={`Set color ${color}`}
                  disabled={disabled}
                  onClick={() => {
                    const next = parseInputByMode(color, "hex");
                    if (next) {
                      setHsva(next);
                    }
                  }}
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "999px",
                    border: selected
                      ? "2px solid var(--z-color-primary, #121212)"
                      : "1px solid transparent",
                    padding: selected ? "2px" : "3px",
                    background: "transparent",
                    cursor: disabled ? "default" : "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <span
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "999px",
                      background: color,
                      border: "1px solid rgba(0,0,0,0.08)"
                    }}
                    aria-hidden
                  />
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
