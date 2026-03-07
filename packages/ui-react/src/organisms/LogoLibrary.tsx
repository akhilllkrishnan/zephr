"use client";
import { CSSProperties, useMemo, useState } from "react";
import { Input } from "../atoms/Input";
import { Logo } from "../atoms/Logo";
import * as LogoAssets from "@zephrui/logos";

const { createCatalogLogoDataUri, listLogoCatalog, searchLogoCatalog } = LogoAssets;

export interface LogoLibraryProps {
  initialQuery?: string;
  query?: string;
  onQueryChange?: (nextQuery: string) => void;
  logos?: LogoAssets.LogoCatalogEntry[];
  onCopy?: (domainOrName: string) => void;
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

export function LogoLibrary({
  initialQuery = "",
  query: controlledQuery,
  onQueryChange,
  logos,
  onCopy,
  className,
  style
}: LogoLibraryProps) {
  const [uncontrolledQuery, setUncontrolledQuery] = useState(initialQuery);
  const query = controlledQuery ?? uncontrolledQuery;

  const results = useMemo(() => {
    if (logos) {
      return logos;
    }
    const searched = searchLogoCatalog(query, 180);
    if (searched.length > 0 || query.trim()) {
      return searched;
    }
    return listLogoCatalog().slice(0, 180);
  }, [logos, query]);

  return (
    <div className={className} style={{ display: "grid", gap: "var(--z-space-3, 0.75rem)", ...style }}>
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
        placeholder="Search brands or domains (openai, github, payments, ecommerce, social)"
        aria-label="Search logos"
      />

      <p style={{ margin: 0, color: "var(--z-color-muted, #5c5c5c)", fontSize: "12px" }}>
        {results.length} brand marks • click any item to copy its domain.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
          gap: "0.5rem"
        }}
      >
        {results.map((entry) => (
          <button
            key={entry.id}
            type="button"
            onClick={async () => {
              const ok = await copyValue(entry.domain);
              if (ok) {
                onCopy?.(entry.domain);
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
              minHeight: "86px"
            }}
            title={`Copy ${entry.domain}`}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
              <Logo name={entry.name} src={createCatalogLogoDataUri(entry, 64)} size={36} />
              <div style={{ display: "grid", gap: "1px" }}>
                <span style={{ fontSize: "12px", color: "var(--z-color-text, #171717)", fontWeight: 600 }}>
                  {entry.name}
                </span>
                <span style={{ fontSize: "11px", color: "var(--z-color-muted, #5c5c5c)" }}>
                  {entry.domain}
                </span>
              </div>
            </div>
            <span style={{ fontSize: "10px", color: "var(--z-color-muted, #5c5c5c)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {entry.category}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
