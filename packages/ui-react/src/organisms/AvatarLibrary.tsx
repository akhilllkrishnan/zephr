"use client";
import { CSSProperties, useMemo, useState } from "react";
import { Avatar } from "../atoms/Avatar";
import { Input } from "../atoms/Input";
import * as AvatarAssets from "@zephyr/avatars";

type AvatarStyle = AvatarAssets.AvatarStyle;

const { generateAvatar, listAvatarStyles, searchAvatarStyles } = AvatarAssets;

export interface AvatarLibraryProps {
  initialQuery?: string;
  query?: string;
  onQueryChange?: (nextQuery: string) => void;
  sampleName?: string;
  styles?: AvatarAssets.AvatarStyleDefinition[];
  seed?: string;
  onSeedChange?: (nextSeed: string) => void;
  onCopy?: (styleName: string) => void;
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

export function AvatarLibrary({
  initialQuery = "",
  query: controlledQuery,
  onQueryChange,
  sampleName = "Akhil Krishnan",
  styles: providedStyles,
  seed: controlledSeed,
  onSeedChange,
  onCopy,
  className,
  style
}: AvatarLibraryProps) {
  const [uncontrolledQuery, setUncontrolledQuery] = useState(initialQuery);
  const [uncontrolledSeed, setUncontrolledSeed] = useState("zephyr");
  const query = controlledQuery ?? uncontrolledQuery;
  const seed = controlledSeed ?? uncontrolledSeed;

  const styles = useMemo(() => {
    if (providedStyles) {
      return providedStyles;
    }
    const result = searchAvatarStyles(query, 24);
    if (result.length > 0 || query.trim()) {
      return result;
    }
    return listAvatarStyles();
  }, [providedStyles, query]);

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
          placeholder="Search avatar style (retro, playful, enterprise, ai)"
          aria-label="Search avatar styles"
        />
        <Input
          value={seed}
          onChange={(event) => {
            const nextSeed = event.target.value;
            if (onSeedChange) {
              onSeedChange(nextSeed);
            } else {
              setUncontrolledSeed(nextSeed);
            }
          }}
          placeholder="Seed (change to regenerate)"
          aria-label="Avatar style seed"
        />
      </div>

      <p style={{ margin: 0, color: "var(--z-color-muted, #5c5c5c)", fontSize: "12px" }}>
        {styles.length} style{styles.length === 1 ? "" : "s"} • click any style tile to copy its style id.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
          gap: "0.5rem"
        }}
      >
        {styles.map((entry) => {
          const generated = generateAvatar({
            name: sampleName,
            seed: `${seed}-${entry.id}`,
            style: entry.id as AvatarStyle,
            size: 64
          });

          return (
            <button
              key={entry.id}
              type="button"
              onClick={async () => {
                const ok = await copyValue(entry.id);
                if (ok) {
                  onCopy?.(entry.id);
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
                minHeight: "136px"
              }}
              title={`Copy style ${entry.id}`}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                <Avatar name={sampleName} src={generated.dataUri} size={44} />
                <div style={{ display: "grid", gap: "2px" }}>
                  <span style={{ fontSize: "12px", color: "var(--z-color-text, #171717)", fontWeight: 600 }}>
                    {entry.label}
                  </span>
                  <span style={{ fontSize: "11px", color: "var(--z-color-muted, #5c5c5c)" }}>{entry.id}</span>
                </div>
              </div>
              <span style={{ fontSize: "11px", color: "var(--z-color-muted, #5c5c5c)", lineHeight: 1.5 }}>
                {entry.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
