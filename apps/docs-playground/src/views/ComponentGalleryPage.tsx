import type { RegistryEntry } from "@zephrui/ai-registry";
import { ComponentThumbnail } from "../components/ComponentThumbnail";

interface ComponentGalleryPageProps {
  registry: RegistryEntry[];
  gallerySearch: string;
  setGallerySearch: (v: string) => void;
  galleryCat: "all" | "atom" | "molecule" | "organism";
  setGalleryCat: (v: "all" | "atom" | "molecule" | "organism") => void;
  onSelectComponent: (id: string) => void;
}

export function ComponentGalleryPage({
  registry,
  gallerySearch,
  setGallerySearch,
  galleryCat,
  setGalleryCat,
  onSelectComponent,
}: ComponentGalleryPageProps) {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section id="gallery-overview" className="doc-section gallery-hero">
        <p className="breadcrumbs">Components</p>
        <h1>
          <span className="gallery-hero-num">
            {registry.filter(e => e.category === "atom" || e.category === "molecule" || e.category === "organism").length}
          </span>
          {" "}production-ready components
        </h1>
        <p className="lead">
          Token-driven, AI-native, and free. Every component ships with full prop types, accessibility notes, and AI context — ready to drop into any project.
        </p>

        {/* Search */}
        <div className="gallery-search-wrap">
          <svg className="gallery-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="search"
            className="gallery-search-input"
            placeholder="Search components…"
            value={gallerySearch}
            onChange={(e) => setGallerySearch(e.target.value)}
            aria-label="Search components"
            autoComplete="off"
          />
          {gallerySearch && (
            <button
              type="button"
              className="gallery-search-clear"
              onClick={() => setGallerySearch("")}
              aria-label="Clear search"
            >
              <span className="ms">close</span>
            </button>
          )}
        </div>

        {/* Category filter pills */}
        <div className="gallery-filter-pills" role="tablist" aria-label="Filter by category">
          {(["all", "atom", "molecule", "organism"] as const).map((cat) => {
            const label = cat === "all" ? "All" : cat === "atom" ? "Atoms" : cat === "molecule" ? "Molecules" : "Organisms";
            const count = cat === "all"
              ? registry.filter(e => e.category === "atom" || e.category === "molecule" || e.category === "organism").length
              : registry.filter(e => e.category === cat).length;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={galleryCat === cat}
                className={`gallery-filter-pill${galleryCat === cat ? " is-active" : ""}`}
                onClick={() => setGalleryCat(cat)}
              >
                {label}
                <span className="gallery-filter-count">{count}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Component grid ────────────────────────────────────────── */}
      {(() => {
        const filtered = registry.filter((e) => {
          if (e.category !== "atom" && e.category !== "molecule" && e.category !== "organism") return false;
          if (galleryCat !== "all" && e.category !== galleryCat) return false;
          if (gallerySearch) {
            const q = gallerySearch.toLowerCase();
            return e.name.toLowerCase().includes(q) || (e.description || "").toLowerCase().includes(q);
          }
          return true;
        });

        // Empty state
        if (!filtered.length) {
          return (
            <section className="doc-section">
              <div className="gallery-empty">
                <div className="gallery-empty-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                </div>
                <p>No components match <strong>"{gallerySearch}"</strong></p>
                <button type="button" className="gallery-empty-clear" onClick={() => setGallerySearch("")}>Clear search</button>
              </div>
            </section>
          );
        }

        // Filtered / search mode — flat grid, no section headers
        if (galleryCat !== "all" || gallerySearch) {
          return (
            <section className="doc-section">
              <div className="gallery-grid">
                {filtered.map((entry) => (
                  <button key={entry.id} type="button" className="gallery-card" onClick={() => onSelectComponent(entry.id)}>
                    <div className="gallery-card-preview">
                      <ComponentThumbnail name={entry.name} />
                    </div>
                    <div className="gallery-card-body">
                      <div className="gallery-card-row">
                        <span className="gallery-card-name">{entry.name}</span>
                        <span className={`gallery-cat-chip gallery-cat-chip--${entry.category}`}>{entry.category}</span>
                      </div>
                      <p className="gallery-card-desc">{entry.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          );
        }

        // Default — grouped by category with section headers
        return (["atom", "molecule", "organism"] as const).map((cat) => {
          const entries = filtered.filter((e) => e.category === cat);
          if (!entries.length) return null;
          const catLabel = cat === "atom" ? "Atoms" : cat === "molecule" ? "Molecules" : "Organisms";
          const catDesc =
            cat === "atom" ? "Foundation-level primitives — buttons, inputs, badges, and more." :
            cat === "molecule" ? "Composed patterns built from atoms — forms, navigation, feedback." :
            "Full sections and complex UI patterns — layouts, tables, command bars.";
          return (
            <section key={cat} className="doc-section gallery-cat-section">
              <div className="gallery-cat-header">
                <div>
                  <h2 className="gallery-cat-title">{catLabel}</h2>
                  <p className="gallery-cat-desc-sub">{catDesc}</p>
                </div>
                <span className="gallery-cat-count" aria-label={`${entries.length} components`}>{entries.length}</span>
              </div>
              <div className="gallery-grid">
                {entries.map((entry) => (
                  <button key={entry.id} type="button" className="gallery-card" onClick={() => onSelectComponent(entry.id)}>
                    <div className="gallery-card-preview">
                      <ComponentThumbnail name={entry.name} />
                    </div>
                    <div className="gallery-card-body">
                      <div className="gallery-card-row">
                        <span className="gallery-card-name">{entry.name}</span>
                        <span className={`gallery-cat-chip gallery-cat-chip--${cat}`}>{cat}</span>
                      </div>
                      <p className="gallery-card-desc">{entry.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          );
        });
      })()}
    </>
  );
}
