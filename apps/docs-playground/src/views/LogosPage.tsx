import { useCallback, useMemo, useRef, useState } from "react";
import { listLogoCatalog, searchLogoCatalog, createCatalogLogoDataUri } from "@zephrui/logos";
import type { LogoCatalogEntry } from "@zephrui/logos";
import "./LogosPage.css";

const ALL_LOGOS = listLogoCatalog();

const CATEGORY_LABELS: Record<string, string> = {
  ai: "AI & Machine Learning",
  search: "Search",
  enterprise: "Enterprise",
  consumer: "Consumer",
  social: "Social Media",
  commerce: "Commerce",
  cloud: "Cloud & Infrastructure",
  developer: "Developer Tools",
  frontend: "Frontend",
  design: "Design",
  productivity: "Productivity",
  communication: "Communication",
  marketing: "Marketing",
  crm: "CRM & Sales",
  support: "Support",
  payments: "Payments",
  crypto: "Crypto & Web3",
  finance: "Finance",
  database: "Databases",
  backend: "Backend",
  auth: "Auth & Identity",
  observability: "Observability",
  cms: "CMS & Content",
  website: "Website Builders",
  media: "Media & Streaming",
  platform: "Platform",
};

const ALL_CATEGORIES = ["All", ...Array.from(new Set(ALL_LOGOS.map((l) => l.category))).sort()];

function categoryLabel(cat: string): string {
  return CATEGORY_LABELS[cat] ?? cat.charAt(0).toUpperCase() + cat.slice(1);
}

type CopyMode = "domain" | "snippet";

interface LogoTileProps {
  entry: LogoCatalogEntry;
  onCopy: (entry: LogoCatalogEntry, mode: CopyMode) => void;
  copied: string | null;
  copyMode: CopyMode;
}

function LogoTile({ entry, onCopy, copied, copyMode }: LogoTileProps) {
  const src = useMemo(() => createCatalogLogoDataUri(entry, 96), [entry]);
  const isCopied = copied === entry.id;

  return (
    <button
      type="button"
      className={`logos-tile${isCopied ? " is-copied" : ""}`}
      onClick={() => onCopy(entry, copyMode)}
      title={`${entry.name} — click to copy ${copyMode === "snippet" ? "import snippet" : "domain"}`}
      aria-label={`Copy ${entry.name} ${copyMode === "snippet" ? "snippet" : "domain"}`}
    >
      <span className="logos-tile-img-wrap">
        <img src={src} alt={entry.name} className="logos-tile-img" width={40} height={40} />
      </span>
      <span className="logos-tile-label">{entry.name}</span>
      {isCopied && (
        <span className="logos-tile-copied" aria-hidden>
          <span className="ms">check</span>
        </span>
      )}
    </button>
  );
}

export function LogosPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [copied, setCopied] = useState<string | null>(null);
  const [copyMode, setCopyMode] = useState<CopyMode>("domain");
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    let pool = query.trim() ? searchLogoCatalog(query.trim(), 200) : ALL_LOGOS;
    if (category !== "All") {
      pool = pool.filter((l) => l.category === category);
    }
    return pool;
  }, [query, category]);

  // Group by category for display
  const grouped = useMemo(() => {
    if (query.trim() && category === "All") {
      // Flat list when searching
      return null;
    }
    const map = new Map<string, LogoCatalogEntry[]>();
    for (const logo of filtered) {
      const group = map.get(logo.category) ?? [];
      group.push(logo);
      map.set(logo.category, group);
    }
    return map;
  }, [filtered, query, category]);

  const copyLogo = useCallback((entry: LogoCatalogEntry, mode: CopyMode) => {
    const text = mode === "snippet"
      ? `import { createCatalogLogoDataUri } from "@zephrui/logos";\n\nconst logoUri = createCatalogLogoDataUri({ domain: "${entry.domain}" }, 64);\n// <img src={logoUri} alt="${entry.name}" width={64} height={64} />`
      : entry.domain;
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(entry.id);
    setTimeout(() => setCopied(null), 1800);
  }, []);

  return (
    <div className="logos-page">
      {/* ── Sidebar ──────────────────────────────────────────────── */}
      <aside className="logos-sidebar">
        <div className="logos-sidebar-section">
          <div className="logos-search-wrap">
            <span className="ms logos-search-icon">search</span>
            <input
              ref={searchRef}
              className="logos-search-input"
              type="search"
              placeholder="Search logos…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search logos"
            />
            {query && (
              <button
                type="button"
                className="logos-search-clear"
                onClick={() => { setQuery(""); searchRef.current?.focus(); }}
                aria-label="Clear search"
              >
                <span className="ms logos-search-clear-icon">close</span>
              </button>
            )}
          </div>
        </div>

        <div className="logos-sidebar-section">
          <p className="logos-sidebar-label">Category</p>
          <div className="logos-category-list">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`logos-category-btn${category === cat ? " is-active" : ""}`}
                onClick={() => setCategory(cat)}
                aria-pressed={category === cat}
              >
                {cat === "All" ? "All" : categoryLabel(cat)}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* ── Main ─────────────────────────────────────────────────── */}
      <div className="logos-main">
        <div className="logos-main-header">
          <p className="logos-count">
            <strong>{filtered.length}</strong> logo{filtered.length !== 1 ? "s" : ""}
            {category !== "All" && <span> in {categoryLabel(category)}</span>}
          </p>
          <div className="logos-header-right">
            {copied && (
              <span className="logos-copied-toast">
                <span className="ms logos-toast-check-icon">check</span>
                {copyMode === "snippet" ? "Snippet copied" : "Domain copied"}
              </span>
            )}
            <div className="logos-copy-mode" role="group" aria-label="Copy mode">
              <button
                type="button"
                className={`logos-copy-mode-btn${copyMode === "domain" ? " is-active" : ""}`}
                onClick={() => setCopyMode("domain")}
                aria-pressed={copyMode === "domain"}
              >
                Domain
              </button>
              <button
                type="button"
                className={`logos-copy-mode-btn${copyMode === "snippet" ? " is-active" : ""}`}
                onClick={() => setCopyMode("snippet")}
                aria-pressed={copyMode === "snippet"}
              >
                Snippet
              </button>
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="logos-empty">
            <span className="ms logos-empty-icon">image_search</span>
            <p>No logos match <strong>"{query}"</strong></p>
          </div>
        ) : grouped ? (
          // Grouped by category
          Array.from(grouped.entries()).map(([cat, logos]) => (
            <div key={cat} className="logos-group">
              <h2 className="logos-group-title">{categoryLabel(cat)}</h2>
              <div className="logos-grid">
                {logos.map((logo) => (
                  <LogoTile key={logo.id} entry={logo} onCopy={copyLogo} copied={copied} copyMode={copyMode} />
                ))}
              </div>
            </div>
          ))
        ) : (
          // Flat grid when searching
          <div className="logos-grid">
            {filtered.map((logo) => (
              <LogoTile key={logo.id} entry={logo} onCopy={copyLogo} copied={copied} copyMode={copyMode} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
