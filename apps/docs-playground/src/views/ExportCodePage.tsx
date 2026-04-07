import { useState, useMemo, useCallback, useEffect } from "react";
import type { RegistryEntry } from "@zephrui/ai-registry";

// ─── Types ────────────────────────────────────────────────────────────────────

type PropValue = string | boolean | number;
type PropValues = Record<string, PropValue>;

interface StructuredProp {
  type: string;
  description?: string;
  required?: boolean;
  default?: PropValue;
  values?: string[];
  deprecated?: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function normalizeDefault(def: unknown): PropValue {
  if (typeof def === "string") return def;
  if (Array.isArray(def)) return (def as string[])[0] ?? "";
  const p = def as StructuredProp;
  if (p.default !== undefined && p.default !== null) return p.default;
  if (p.type === "boolean") return false;
  if (p.type === "number") return 0;
  if (p.type === "enum" && p.values?.length) return p.values[0];
  return "";
}

function getDefaults(entry: RegistryEntry): PropValues {
  const result: PropValues = {};
  for (const [key, def] of Object.entries(entry.propsSchema ?? {})) {
    result[key] = normalizeDefault(def);
  }
  return result;
}

function buildSnippet(
  name: string,
  values: PropValues,
  defaults: PropValues
): string {
  const parts: string[] = [];

  for (const [key, val] of Object.entries(values)) {
    // Skip deprecated / unchanged defaults
    if (val === defaults[key]) continue;

    if (typeof val === "boolean") {
      parts.push(val ? key : `${key}={false}`);
    } else if (typeof val === "number") {
      parts.push(`${key}={${val}}`);
    } else if (typeof val === "string" && val !== "") {
      parts.push(`${key}="${val}"`);
    }
  }

  if (parts.length === 0) return `<${name} />`;
  if (parts.length <= 3 && parts.every((p) => p.length < 22)) {
    return `<${name} ${parts.join(" ")} />`;
  }
  return `<${name}\n  ${parts.join("\n  ")}\n/>`;
}

// ─── Prop Control ─────────────────────────────────────────────────────────────

interface PropControlProps {
  propKey: string;
  def: unknown;
  value: PropValue;
  defaultValue: PropValue;
  onChange: (key: string, value: PropValue) => void;
}

function PropControl({
  propKey,
  def,
  value,
  defaultValue,
  onChange,
}: PropControlProps) {
  const normalized = def as StructuredProp;
  const type =
    typeof def === "string"
      ? "string"
      : Array.isArray(def)
      ? "string"
      : normalized.type;
  const values =
    typeof def !== "string" && !Array.isArray(def) ? normalized.values : undefined;
  const description =
    typeof def !== "string" && !Array.isArray(def) ? normalized.description : undefined;
  const isModified = value !== defaultValue;

  return (
    <div className={`export-prop-row${isModified ? " is-modified" : ""}`}>
      <div className="export-prop-meta">
        <div className="export-prop-label-row">
          <span className="export-prop-name">{propKey}</span>
          <span className={`export-prop-type export-prop-type--${type}`}>
            {type}
          </span>
          {isModified && (
            <button
              type="button"
              className="export-prop-reset"
              title="Reset to default"
              onClick={() => onChange(propKey, defaultValue)}
            >
              <span className="ms" aria-hidden="true" style={{ fontSize: 14 }}>
                restart_alt
              </span>
            </button>
          )}
        </div>
        {description && (
          <p className="export-prop-desc">{description}</p>
        )}
      </div>

      <div className="export-prop-control">
        {/* Enum with ≤6 values → pill buttons */}
        {type === "enum" && values && values.length <= 6 ? (
          <div className="export-prop-pills" role="group" aria-label={propKey}>
            {values.map((v) => (
              <button
                key={v}
                type="button"
                className={`export-prop-pill${value === v ? " is-active" : ""}`}
                onClick={() => onChange(propKey, v)}
              >
                {v}
              </button>
            ))}
          </div>
        ) : type === "enum" && values ? (
          /* Enum with many values → select */
          <select
            className="export-prop-select"
            value={value as string}
            onChange={(e) => onChange(propKey, e.target.value)}
          >
            {values.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        ) : type === "boolean" ? (
          /* Boolean → True / False pills */
          <div className="export-prop-pills" role="group" aria-label={propKey}>
            <button
              type="button"
              className={`export-prop-pill${value === false ? " is-active" : ""}`}
              onClick={() => onChange(propKey, false)}
            >
              false
            </button>
            <button
              type="button"
              className={`export-prop-pill${value === true ? " is-active" : ""}`}
              onClick={() => onChange(propKey, true)}
            >
              true
            </button>
          </div>
        ) : type === "number" ? (
          <input
            type="number"
            className="export-prop-input"
            value={value as number}
            onChange={(e) => onChange(propKey, Number(e.target.value))}
          />
        ) : (
          <input
            type="text"
            className="export-prop-input"
            value={value as string}
            placeholder={`Enter ${propKey}…`}
            onChange={(e) => onChange(propKey, e.target.value)}
          />
        )}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export interface ExportCodePageProps {
  entry: RegistryEntry;
  importSnippet: string;
  onViewChange: (view: "components" | "api-reference") => void;
}

export function ExportCodePage({
  entry,
  importSnippet,
  onViewChange,
}: ExportCodePageProps) {
  const defaults = useMemo(() => getDefaults(entry), [entry]);
  const [propValues, setPropValues] = useState<PropValues>(defaults);
  const [copied, setCopied] = useState(false);

  // Reset prop values whenever the selected component changes
  useEffect(() => {
    setPropValues(getDefaults(entry));
  }, [entry.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePropChange = useCallback(
    (key: string, value: PropValue) => {
      setPropValues((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const usageSnippet = useMemo(
    () => buildSnippet(entry.name, propValues, defaults),
    [entry.name, propValues, defaults]
  );

  const fullSnippet = `${importSnippet}\n\n${usageSnippet}`;

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(fullSnippet).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [fullSnippet]);

  const handleReset = useCallback(() => {
    setPropValues(defaults);
  }, [defaults]);

  const propEntries = useMemo(
    () =>
      Object.entries(entry.propsSchema ?? {}).filter(([, def]) => {
        if (typeof def !== "string" && !Array.isArray(def)) {
          return !(def as StructuredProp).deprecated;
        }
        return true;
      }),
    [entry.propsSchema]
  );

  const hasChanges = useMemo(
    () =>
      Object.entries(propValues).some(
        ([key, val]) => val !== defaults[key]
      ),
    [propValues, defaults]
  );

  return (
    <div className="export-code-page">
      {/* ── Tabs ─────────────────────────────────────────────────────────── */}
      <div className="component-page-tabs">
        <button
          type="button"
          className="component-page-tab"
          onClick={() => onViewChange("components")}
        >
          Guides
        </button>
        <button
          type="button"
          className="component-page-tab"
          onClick={() => onViewChange("api-reference")}
        >
          API Reference
        </button>
        <button type="button" className="component-page-tab is-active">
          Code
        </button>
      </div>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="doc-section hero export-hero">
        <p className="breadcrumbs">Components / {entry.name}</p>
        <h1>
          Export code
          <span className="export-hero-badge">{entry.name}</span>
        </h1>
        <p className="lead">
          Tweak props below and copy a ready-to-paste React snippet.
        </p>
      </section>

      {/* ── Layout ───────────────────────────────────────────────────────── */}
      <div className="export-layout">
        {/* Left: prop editor */}
        <aside className="export-props-panel">
          <div className="export-props-header">
            <h2 className="export-props-title">Props</h2>
            {hasChanges && (
              <button
                type="button"
                className="export-reset-btn"
                onClick={handleReset}
              >
                Reset all
              </button>
            )}
          </div>

          {propEntries.length === 0 ? (
            <div className="export-no-props">
              <span className="ms" aria-hidden="true">
                tune
              </span>
              <p>No configurable props for this component.</p>
            </div>
          ) : (
            <div className="export-props-list">
              {propEntries.map(([key, def]) => (
                <PropControl
                  key={key}
                  propKey={key}
                  def={def}
                  value={propValues[key] ?? normalizeDefault(def)}
                  defaultValue={defaults[key] ?? normalizeDefault(def)}
                  onChange={handlePropChange}
                />
              ))}
            </div>
          )}
        </aside>

        {/* Right: code output */}
        <div className="export-code-panel">
          <div className="export-code-card">
            <div className="export-code-card-header">
              <div className="export-code-card-dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <span className="export-code-card-label">snippet.tsx</span>
              <button
                type="button"
                className={`export-copy-btn${copied ? " is-copied" : ""}`}
                onClick={handleCopy}
              >
                {copied ? (
                  <>
                    <span
                      className="ms"
                      aria-hidden="true"
                      style={{ fontSize: 16 }}
                    >
                      check
                    </span>
                    Copied!
                  </>
                ) : (
                  <>
                    <span
                      className="ms"
                      aria-hidden="true"
                      style={{ fontSize: 16 }}
                    >
                      content_copy
                    </span>
                    Copy snippet
                  </>
                )}
              </button>
            </div>

            <div className="export-code-body">
              {/* Import line */}
              <div className="export-code-section">
                <span className="export-code-comment">
                  {"// 1. Import"}
                </span>
                <pre className="export-pre export-pre--import">
                  {importSnippet}
                </pre>
              </div>

              <div className="export-code-separator" />

              {/* Usage */}
              <div className="export-code-section">
                <span className="export-code-comment">
                  {"// 2. Use it"}
                </span>
                <pre className="export-pre export-pre--usage">
                  {usageSnippet}
                </pre>
              </div>
            </div>
          </div>

          {/* Hint row */}
          <div className="export-hint-row">
            <span className="ms export-hint-icon" aria-hidden="true">
              auto_awesome
            </span>
            <span className="export-hint-text">
              Token-driven — all visual properties respond to{" "}
              <code className="export-hint-code">--z-*</code> tokens
              automatically.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
