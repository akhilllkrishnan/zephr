"use client";
import { CSSProperties, useMemo, useState } from "react";
import * as MaterialIcons from "@zephrui/icons-material";
import { Input } from "../atoms/Input";

type MaterialIconStyle = MaterialIcons.MaterialIconStyle;

const {
  MaterialIcon,
  MATERIAL_ICON_STYLES,
  searchMaterialIcons
} = MaterialIcons;

export interface IconLibraryProps {
  initialQuery?: string;
  query?: string;
  onQueryChange?: (nextQuery: string) => void;
  initialStyle?: MaterialIconStyle;
  styleVariant?: MaterialIconStyle;
  onStyleVariantChange?: (nextStyle: MaterialIconStyle) => void;
  icons?: MaterialIcons.MaterialIconDefinition[];
  limit?: number;
  onCopy?: (iconName: string) => void;
  className?: string;
  style?: CSSProperties;
}

async function copyValue(value: string): Promise<boolean> {
  try {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    return false;
  }

  return false;
}

export function IconLibrary({
  initialQuery = "",
  query: controlledQuery,
  onQueryChange,
  initialStyle = "filled",
  styleVariant: controlledStyleVariant,
  onStyleVariantChange,
  icons,
  limit = 120,
  onCopy,
  className,
  style
}: IconLibraryProps) {
  const [uncontrolledQuery, setUncontrolledQuery] = useState(initialQuery);
  const [uncontrolledStyleVariant, setUncontrolledStyleVariant] = useState<MaterialIconStyle>(initialStyle);

  const query = controlledQuery ?? uncontrolledQuery;
  const styleVariant = controlledStyleVariant ?? uncontrolledStyleVariant;

  const results = useMemo(() => {
    if (icons) {
      return icons.slice(0, limit);
    }
    return searchMaterialIcons(query, { limit, style: styleVariant });
  }, [icons, limit, query, styleVariant]);

  return (
    <div className={className} style={{ display: "grid", gap: "var(--z-space-3, 0.75rem)", ...style }}>
      <div style={{ display: "grid", gap: "0.625rem" }}>
        <Input
          value={query}
          onChange={(event) => {
            const nextQuery = event.target.value;
            if (onQueryChange) {
              onQueryChange(nextQuery);
            } else {
              setUncontrolledQuery(nextQuery);
            }
          }}
          placeholder="Search icons by name or use case (settings, billing, ai, support)"
          aria-label="Search icon library"
        />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
          {MATERIAL_ICON_STYLES.map((styleName) => {
            const selected = styleName === styleVariant;
            return (
              <button
                key={styleName}
                type="button"
                onClick={() => {
                  if (onStyleVariantChange) {
                    onStyleVariantChange(styleName);
                  } else {
                    setUncontrolledStyleVariant(styleName);
                  }
                }}
                style={{
                  border: "1px solid var(--z-color-border, #ebebeb)",
                  background: selected ? "var(--z-color-text, #171717)" : "var(--z-color-surface, #ffffff)",
                  color: selected ? "var(--z-color-primaryContrast, #ffffff)" : "var(--z-color-text, #171717)",
                  borderRadius: "var(--z-radius-pill, 9999px)",
                  minHeight: "28px",
                  padding: "4px 10px",
                  fontSize: "12px",
                  fontWeight: 500,
                  cursor: "pointer",
                  textTransform: "capitalize"
                }}
              >
                {styleName}
              </button>
            );
          })}
        </div>
      </div>

      <p style={{ margin: 0, color: "var(--z-color-muted, #5c5c5c)", fontSize: "12px" }}>
        {results.length} icon{results.length === 1 ? "" : "s"} • click any icon to copy its name.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
          gap: "0.5rem"
        }}
      >
        {results.map((icon) => (
          <button
            key={`${styleVariant}-${icon.name}`}
            type="button"
            onClick={async () => {
              const value = icon.name;
              const ok = await copyValue(value);
              if (ok) {
                onCopy?.(value);
              }
            }}
            style={{
              border: "1px solid var(--z-color-border, #ebebeb)",
              background: "var(--z-color-surface, #ffffff)",
              borderRadius: "10px",
              padding: "10px",
              textAlign: "left",
              display: "grid",
              gap: "8px",
              cursor: "pointer",
              minHeight: "94px"
            }}
            title={`Copy ${icon.name}`}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <MaterialIcon name={icon.name} size={22} styleVariant={styleVariant} />
              <span
                style={{
                  fontSize: "10px",
                  color: "var(--z-color-muted, #5c5c5c)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em"
                }}
              >
                {icon.category}
              </span>
            </div>
            <span style={{ fontSize: "12px", lineHeight: "16px", color: "var(--z-color-text, #171717)" }}>
              {icon.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
