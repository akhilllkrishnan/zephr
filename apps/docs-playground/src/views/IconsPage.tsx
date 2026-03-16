import { useCallback, useMemo, useRef, useState } from "react";
import { listMaterialIcons } from "@zephrui/icons-material";

type WeightOption = 100 | 200 | 300 | 400 | 500 | 600 | 700;
type GradeOption = -25 | 0 | 200;
type OpticalSizeOption = 20 | 24 | 40 | 48;
type PreviewSizeOption = 20 | 24 | 32 | 40 | 48;

const ALL_ICONS = listMaterialIcons();

const ALL_CATEGORIES = ["All", ...Array.from(new Set(ALL_ICONS.map((i) => i.category))).sort()];

const CATEGORY_LABELS: Record<string, string> = {
  All: "All",
  navigation: "Navigation",
  identity: "Identity",
  status: "Status",
  communication: "Communication",
  content: "Content",
  commerce: "Commerce",
  data: "Data",
  media: "Media",
  device: "Device",
  location: "Location",
  ai: "AI",
  brand: "Brand",
};

function categoryLabel(cat: string): string {
  return CATEGORY_LABELS[cat] ?? cat.charAt(0).toUpperCase() + cat.slice(1);
}

export function IconsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [weight, setWeight] = useState<WeightOption>(200);
  const [filled, setFilled] = useState(false);
  const [grade, setGrade] = useState<GradeOption>(0);
  const [opticalSize, setOpticalSize] = useState<OpticalSizeOption>(20);
  const [previewSize, setPreviewSize] = useState<PreviewSizeOption>(32);
  const [copied, setCopied] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    let pool = ALL_ICONS;

    if (category !== "All") {
      pool = pool.filter((i) => i.category === category);
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase().replace(/\s+/g, "_");
      pool = pool.filter((i) =>
        i.name.includes(q) ||
        i.title.toLowerCase().includes(q.replace(/_/g, " ")) ||
        i.keywords.some((k) => k.includes(q))
      );
    }

    return pool;
  }, [query, category]);

  const varSettings = `"FILL" ${filled ? 1 : 0}, "wght" ${weight}, "GRAD" ${grade}, "opsz" ${opticalSize}`;

  const copyIcon = useCallback((name: string) => {
    navigator.clipboard.writeText(name).catch(() => {});
    setCopied(name);
    setTimeout(() => setCopied(null), 1800);
  }, []);

  return (
    <div className="icons-page">
      {/* ── Sidebar ─────────────────────────────────────────────── */}
      <aside className="icons-sidebar">
        <div className="icons-sidebar-section">
          <div className="icons-search-wrap">
            <span className="ms icons-search-icon">search</span>
            <input
              ref={searchRef}
              className="icons-search-input"
              type="search"
              placeholder="Search icons…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search icons"
            />
            {query && (
              <button type="button" className="icons-search-clear" onClick={() => { setQuery(""); searchRef.current?.focus(); }} aria-label="Clear search">
                <span className="ms icons-search-clear-icon">close</span>
              </button>
            )}
          </div>
        </div>

        <div className="icons-sidebar-section">
          <p className="icons-sidebar-label">Categories</p>
          <div className="icons-category-list">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`icons-category-btn${category === cat ? " is-active" : ""}`}
                onClick={() => setCategory(cat)}
                aria-pressed={category === cat}
              >
                {categoryLabel(cat)}
              </button>
            ))}
          </div>
        </div>

        <div className="icons-sidebar-section">
          <p className="icons-sidebar-label">Style</p>
          <div className="icons-toggle-row">
            <span className="icons-toggle-name">Fill</span>
            <button
              type="button"
              className={`icons-toggle-switch${filled ? " is-on" : ""}`}
              onClick={() => setFilled((v) => !v)}
              role="switch"
              aria-checked={filled}
              aria-label="Toggle fill style"
            >
              <span className="icons-toggle-thumb" />
            </button>
          </div>
        </div>

        <div className="icons-sidebar-section">
          <p className="icons-sidebar-label">Weight</p>
          <div className="icons-chip-row">
            {([100, 200, 300, 400, 500, 600, 700] as WeightOption[]).map((w) => (
              <button
                key={w}
                type="button"
                className={`icons-chip${weight === w ? " is-active" : ""}`}
                onClick={() => setWeight(w)}
                aria-pressed={weight === w}
              >
                {w}
              </button>
            ))}
          </div>
        </div>

        <div className="icons-sidebar-section">
          <p className="icons-sidebar-label">Grade</p>
          <div className="icons-chip-row">
            {([-25, 0, 200] as GradeOption[]).map((g) => (
              <button
                key={g}
                type="button"
                className={`icons-chip${grade === g ? " is-active" : ""}`}
                onClick={() => setGrade(g)}
                aria-pressed={grade === g}
              >
                {g < 0 ? g : g === 0 ? "0" : `+${g}`}
              </button>
            ))}
          </div>
        </div>

        <div className="icons-sidebar-section">
          <p className="icons-sidebar-label">Optical size</p>
          <div className="icons-chip-row">
            {([20, 24, 40, 48] as OpticalSizeOption[]).map((s) => (
              <button
                key={s}
                type="button"
                className={`icons-chip${opticalSize === s ? " is-active" : ""}`}
                onClick={() => setOpticalSize(s)}
                aria-pressed={opticalSize === s}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="icons-sidebar-section">
          <p className="icons-sidebar-label">Preview size</p>
          <div className="icons-chip-row">
            {([20, 24, 32, 40, 48] as PreviewSizeOption[]).map((s) => (
              <button
                key={s}
                type="button"
                className={`icons-chip${previewSize === s ? " is-active" : ""}`}
                onClick={() => setPreviewSize(s)}
                aria-pressed={previewSize === s}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* ── Main grid ───────────────────────────────────────────── */}
      <div className="icons-main">
        <div className="icons-main-header">
          <p className="icons-count">
            <strong>{filtered.length}</strong> icon{filtered.length !== 1 ? "s" : ""}
            {category !== "All" && <span> in {categoryLabel(category)}</span>}
          </p>
          {copied && (
            <span className="icons-copied-toast">
              <span className="ms icons-toast-check-icon">check</span>
              Copied <code>{copied}</code>
            </span>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="icons-empty">
            <span className="ms icons-empty-icon">search_off</span>
            <p>No icons match <strong>"{query}"</strong></p>
          </div>
        ) : (
          <div className="icons-grid">
            {filtered.map((icon) => (
              <button
                key={icon.name}
                type="button"
                className="icons-tile"
                onClick={() => copyIcon(icon.name)}
                title={`${icon.title} — click to copy`}
                aria-label={`Copy ${icon.title} icon name`}
              >
                <span
                  className="material-symbols-rounded icons-tile-glyph"
                  style={{
                    fontSize: previewSize,
                    width: previewSize,
                    height: previewSize,
                    fontVariationSettings: varSettings,
                    lineHeight: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {icon.name}
                </span>
                <span className="icons-tile-label">{icon.title}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
