import "./FoundationsPage.css";

interface ColorToken {
  token: string;
  variable: string;
  light: string;
  dark: string;
  activeColor: string;
}

interface ColorTokenGroup {
  id: string;
  label: string;
  description: string;
  tokens: ColorToken[];
}

interface TypographyRow {
  token: string;
  label: string;
  size: string;
  weightValue: string;
  weightLabel: "Medium" | "Regular";
  family: "inter" | "monaco";
  previewTitle: string;
  previewLine: string;
  caps?: boolean;
  letterSpacing?: string;
}

interface TypographyGroup {
  id: string;
  label: string;
  description: string;
  rows: TypographyRow[];
}

interface FoundationsPageProps {
  foundationColorGroups: ColorTokenGroup[];
  typographyGroups: TypographyGroup[];
  darkMode: boolean;
}

export function FoundationsPage({ foundationColorGroups, typographyGroups, darkMode }: FoundationsPageProps) {
  return (
    <>
      {/* ── Overview ───────────────────────────────────────────────── */}
      <section id="foundations-overview" className="doc-section">
        <p className="breadcrumbs">Setup / Foundations</p>
        <h1>Design foundations</h1>
        <p className="lead">
          Every value in Zephr is expressed as a semantic token — named for
          design intent, not implementation detail. Swap style packs, change
          accent colours, or support dark mode without touching a single
          component.
        </p>
      </section>

      {/* ── Color palette ──────────────────────────────────────────── */}
      <section id="color-palette" className="doc-section">
        <div className="section-heading">
          <p className="section-eyebrow">Colour</p>
          <h2>Color palette</h2>
          <p>
            Semantic color tokens adapt to light and dark mode automatically.
            Each token is available as a CSS variable prefixed{" "}
            <code>--z-color-</code>.
          </p>
        </div>

        {foundationColorGroups.map((group) => (
          <div key={group.id} className="foundations-token-group">
            <div className="foundations-token-group-header">
              <h3 className="foundations-token-group-title">{group.label}</h3>
              <p className="foundations-token-group-desc">{group.description}</p>
            </div>
            <div className="foundations-token-grid">
              {group.tokens.map((tok) => (
                <div key={tok.token} className="foundations-token-tile">
                  <div
                    className="foundations-token-swatch"
                    style={{ background: tok.activeColor }}
                    title={tok.activeColor}
                  />
                  <div className="foundations-token-meta">
                    <code className="foundations-token-var">{tok.variable}</code>
                    <span className="foundations-token-value">
                      {darkMode ? tok.dark : tok.light}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ── Token variables ────────────────────────────────────────── */}
      <section id="token-variables" className="doc-section">
        <div className="section-heading">
          <p className="section-eyebrow">Tokens</p>
          <h2>Token variables</h2>
          <p>
            Import <code>zephr.css</code> in your root layout and every{" "}
            <code>--z-*</code> variable is available globally. All tokens
            switch automatically when a <code>data-theme="dark"</code>{" "}
            attribute is present on the document root.
          </p>
        </div>

        <div className="foundations-token-usage-grid">
          <div className="foundations-usage-card">
            <p className="foundations-usage-card-label">Background</p>
            <code className="foundations-usage-example">
              background: var(--z-color-background950)
            </code>
            <p className="foundations-usage-desc">Page canvas and surface layers</p>
          </div>
          <div className="foundations-usage-card">
            <p className="foundations-usage-card-label">Text</p>
            <code className="foundations-usage-example">
              color: var(--z-color-text950)
            </code>
            <p className="foundations-usage-desc">Primary and secondary text hierarchy</p>
          </div>
          <div className="foundations-usage-card">
            <p className="foundations-usage-card-label">Stroke</p>
            <code className="foundations-usage-example">
              border-color: var(--z-color-stroke300)
            </code>
            <p className="foundations-usage-desc">Borders, dividers, and outlines</p>
          </div>
          <div className="foundations-usage-card">
            <p className="foundations-usage-card-label">Accent</p>
            <code className="foundations-usage-example">
              background: var(--z-color-accent500)
            </code>
            <p className="foundations-usage-desc">Brand action colors and highlights</p>
          </div>
          <div className="foundations-usage-card">
            <p className="foundations-usage-card-label">Semantic — Error</p>
            <code className="foundations-usage-example">
              color: var(--z-color-semanticRed700)
            </code>
            <p className="foundations-usage-desc">Destructive actions and error states</p>
          </div>
          <div className="foundations-usage-card">
            <p className="foundations-usage-card-label">Semantic — Success</p>
            <code className="foundations-usage-example">
              color: var(--z-color-semanticGreen700)
            </code>
            <p className="foundations-usage-desc">Confirmations and positive feedback</p>
          </div>
        </div>
      </section>

      {/* ── Typography ─────────────────────────────────────────────── */}
      <section id="typography" className="doc-section">
        <div className="section-heading">
          <p className="section-eyebrow">Typography</p>
          <h2>Type scale</h2>
          <p>
            Zephr ships a five-category type scale — Heading, Title, Body,
            Mono, and Label — each with a CSS variable prefixed{" "}
            <code>--z-text-</code>.
          </p>
        </div>

        {typographyGroups.map((group) => (
          <div key={group.id} className="foundations-type-group">
            <div className="foundations-type-group-header">
              <h3 className="foundations-type-group-title">{group.label}</h3>
              <p className="foundations-type-group-desc">{group.description}</p>
            </div>
            <div className="foundations-type-table">
              <div className="foundations-type-table-head">
                <span>Scale</span>
                <span>Size</span>
                <span>Weight</span>
                <span>Variable</span>
                <span className="foundations-type-preview-col">Preview</span>
              </div>
              {group.rows.map((row) => (
                <div key={row.token} className="foundations-type-row">
                  <span className="foundations-type-scale-label">{row.label}</span>
                  <span className="foundations-type-size">{row.size}</span>
                  <span className="foundations-type-weight">{row.weightLabel}</span>
                  <code className="foundations-type-var">--z-text-{row.token}</code>
                  <span
                    className="foundations-type-preview-col foundations-type-preview"
                    style={{
                      fontSize: row.size,
                      fontWeight: row.weightValue,
                      fontFamily: row.family === "monaco" ? "var(--z-font-mono, monospace)" : undefined,
                      textTransform: row.caps ? "uppercase" : undefined,
                      letterSpacing: row.letterSpacing,
                    }}
                  >
                    {row.previewTitle}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
