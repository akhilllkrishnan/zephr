import { RefObject } from "react";
import type { RegistryEntry } from "@zephrui/ai-registry";
import type { TopTab, WorkspaceView } from "../types";

export interface SidebarProps {
  leftRailRef: RefObject<HTMLDivElement | null>;
  mobileNavOpen: boolean;
  sidebarIndicator: { top: number; height: number; opacity: number };
  topTab: TopTab;
  view: WorkspaceView;
  setView: (view: WorkspaceView) => void;
  setTopTab: (tab: TopTab) => void;
  setMobileNavOpen: (open: boolean) => void;
  expandedGroups: Set<string>;
  toggleGroup: (group: string) => void;
  registry: RegistryEntry[];
  catalog: RegistryEntry[];
  catalogSearch: string;
  selectedEntry: RegistryEntry;
  selectComponent: (id: string) => void;
}

export function Sidebar(props: SidebarProps) {
  const {
    leftRailRef,
    mobileNavOpen,
    sidebarIndicator,
    topTab,
    view,
    setView,
    setTopTab,
    setMobileNavOpen,
    expandedGroups,
    toggleGroup,
    registry,
    catalog,
    catalogSearch,
    selectedEntry,
    selectComponent,
  } = props;

  return (
    <>
      <aside ref={leftRailRef} className={`left-rail ${mobileNavOpen ? "is-mobile-open" : ""}`}>
        <span
          className="sidebar-active-indicator"
          aria-hidden="true"
          style={{
            transform: `translateY(${sidebarIndicator.top}px)`,
            height: sidebarIndicator.height,
            opacity: sidebarIndicator.opacity
          }}
        />
        {topTab === "setup" && (
          <div className="nav-group">
            <p className="group-title">Main</p>
            <button
              type="button"
              className={`sidebar-link ${view === "introduction" ? "is-active" : ""}`}
              onClick={() => { setTopTab("setup"); setView("introduction"); setMobileNavOpen(false); }}
            >
              <span className="ms sidebar-nav-icon">view_list</span>
              Introduction
              {view === "introduction" && <span className="ms sidebar-nav-chevron">chevron_right</span>}
            </button>
            <button
              type="button"
              className={`sidebar-link ${view === "getting-started" ? "is-active" : ""}`}
              onClick={() => { setTopTab("setup"); setView("getting-started"); setMobileNavOpen(false); }}
            >
              <span className="ms sidebar-nav-icon">rocket_launch</span>
              Get Started
              {view === "getting-started" && <span className="ms sidebar-nav-chevron">chevron_right</span>}
            </button>
            <button
              type="button"
              className={`sidebar-link ${view === "slash-commands" ? "is-active" : ""}`}
              onClick={() => { setTopTab("setup"); setView("slash-commands"); setMobileNavOpen(false); }}
            >
              <span className="ms sidebar-nav-icon">terminal</span>
              Slash Commands
              {view === "slash-commands" && <span className="ms sidebar-nav-chevron">chevron_right</span>}
            </button>
            <button
              type="button"
              className={`sidebar-link ${view === "foundations" ? "is-active" : ""}`}
              onClick={() => { setTopTab("setup"); setView("foundations"); setMobileNavOpen(false); }}
            >
              <span className="ms sidebar-nav-icon">layers</span>
              Foundations
              {view === "foundations" && <span className="ms sidebar-nav-chevron">chevron_right</span>}
            </button>
            <button
              type="button"
              className={`sidebar-link ${view === "benefits" ? "is-active" : ""}`}
              onClick={() => { setTopTab("setup"); setView("benefits"); setMobileNavOpen(false); }}
            >
              <span className="ms sidebar-nav-icon">star</span>
              Benefits
              {view === "benefits" && <span className="ms sidebar-nav-chevron">chevron_right</span>}
            </button>
          </div>
        )}
        {topTab === "components" && (
          <div className="nav-group">
            <p className="group-title">Browse</p>
            <button
              type="button"
              className={`sidebar-link ${view === "component-gallery" ? "is-active" : ""}`}
              onClick={() => { setView("component-gallery"); setMobileNavOpen(false); }}
            >
              <span className="ms sidebar-nav-icon">grid_view</span>
              All Components
              {view === "component-gallery" && <span className="ms sidebar-nav-chevron">chevron_right</span>}
            </button>
            <button
              type="button"
              className={`sidebar-link ${view === "widgets" ? "is-active" : ""}`}
              onClick={() => { setView("widgets"); setMobileNavOpen(false); }}
            >
              <span className="ms sidebar-nav-icon">widgets</span>
              Widgets
              {view === "widgets" && <span className="ms sidebar-nav-chevron">chevron_right</span>}
            </button>
            <button
              type="button"
              className={`sidebar-link ${view === "templates" ? "is-active" : ""}`}
              onClick={() => { setView("templates"); setMobileNavOpen(false); }}
            >
              <span className="ms sidebar-nav-icon">dashboard_customize</span>
              Templates
              {view === "templates" && <span className="ms sidebar-nav-chevron">chevron_right</span>}
            </button>
            <p className="group-title" style={{ marginTop: "1.25rem" }}>Components</p>
            {catalogSearch.trim() ? (
              <div className="component-list">
                {catalog.map((entry) => (
                  <button
                    key={entry.id}
                    type="button"
                    className={`component-link ${entry.id === selectedEntry.id && (view === "components" || view === "api-reference") ? "is-active" : ""}`}
                    onClick={() => selectComponent(entry.id)}
                  >
                    {entry.name}
                  </button>
                ))}
              </div>
            ) : (
              (["atom", "molecule", "organism"] as const).map((cat) => {
                const label = cat === "atom" ? "Atoms" : cat === "molecule" ? "Molecules" : "Organisms";
                const items = registry.filter((e) => e.category === cat);
                const isOpen = expandedGroups.has(cat);
                return (
                  <div key={cat}>
                    <button
                      type="button"
                      className="nav-collapse-btn"
                      onClick={() => toggleGroup(cat)}
                      aria-expanded={isOpen}
                    >
                      <span>{label}</span>
                      <span className={`nav-collapse-chevron ms ${isOpen ? "is-open" : ""}`}>chevron_right</span>
                    </button>
                    {isOpen && (
                      <div className="nav-collapse-inner">
                        {items.map((entry) => (
                          <button
                            key={entry.id}
                            type="button"
                            className={`component-link ${entry.id === selectedEntry.id && (view === "components" || view === "api-reference") ? "is-active" : ""}`}
                            onClick={() => selectComponent(entry.id)}
                          >
                            <span>{entry.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            )}

            {/* Blocks section */}
            <div>
              <button
                type="button"
                className="nav-collapse-btn"
                onClick={() => toggleGroup("block")}
                aria-expanded={expandedGroups.has("block")}
              >
                <span>Blocks</span>
                <span className={`nav-collapse-chevron ms ${expandedGroups.has("block") ? "is-open" : ""}`}>chevron_right</span>
              </button>
              {expandedGroups.has("block") && (
                <div className="nav-collapse-inner">
                  {[
                    "HeroSection",
                    "FeatureGrid",
                    "PricingTable",
                    "TeamGrid",
                    "StatRow",
                    "StatCard",
                    "CtaBanner",
                    "TestimonialCarousel",
                    "FormSection",
                    "SplitLayout"
                  ].map((name) => (
                    <div
                      key={name}
                      style={{
                        padding: "5px 12px 5px 20px",
                        fontSize: 13,
                        color: "var(--z-color-muted, #737373)",
                        display: "flex",
                        alignItems: "center",
                        gap: 6
                      }}
                    >
                      <span style={{ fontSize: 10, opacity: 0.5 }}>◻</span>
                      <span>{name}</span>
                      <span className="pill-badge" style={{ fontSize: 10, marginLeft: "auto" }}>pkg</span>
                    </div>
                  ))}
                  <a
                    className="sidebar-link"
                    href="https://www.npmjs.com/package/@zephrui/blocks"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginTop: 4 }}
                  >
                    <span className="ms">arrow_forward</span> @zephrui/blocks
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {topTab === "icons" && (
          <div className="nav-group">
            <p className="group-title">Icons</p>
            <button
              type="button"
              className={`sidebar-link ${view === "icons" ? "is-active" : ""}`}
              onClick={() => { setTopTab("icons"); setView("icons"); setMobileNavOpen(false); }}
            >
              <span className="ms sidebar-nav-icon">grid_view</span>
              Icon Browser
              {view === "icons" && <span className="ms sidebar-nav-chevron">chevron_right</span>}
            </button>
          </div>
        )}

        {topTab === "logos" && (
          <div className="nav-group">
            <p className="group-title">Logos</p>
            <button
              type="button"
              className={`sidebar-link ${view === "logos" ? "is-active" : ""}`}
              onClick={() => { setTopTab("logos"); setView("logos"); setMobileNavOpen(false); }}
            >
              <span className="ms sidebar-nav-icon">brand_family</span>
              Logo Browser
              {view === "logos" && <span className="ms sidebar-nav-chevron">chevron_right</span>}
            </button>
          </div>
        )}

        {topTab === "avatars" && (
          <div className="nav-group">
            <p className="group-title">Avatars</p>
            <button
              type="button"
              className={`sidebar-link ${view === "avatars" ? "is-active" : ""}`}
              onClick={() => { setTopTab("avatars"); setView("avatars"); setMobileNavOpen(false); }}
            >
              <span className="ms sidebar-nav-icon">account_circle</span>
              Avatar Browser
              {view === "avatars" && <span className="ms sidebar-nav-chevron">chevron_right</span>}
            </button>
          </div>
        )}

        {topTab === "changelog" && (
          <div className="nav-group">
            <p className="group-title">Change Log</p>
            <a className="sidebar-link" href="#changelog-overview" onClick={() => setMobileNavOpen(false)}>
              Overview
            </a>
            <a className="sidebar-link changelog-version-link" href="#release-0-5-0" onClick={() => setMobileNavOpen(false)}>
              v0.5.0 — Latest
            </a>
            <a className="sidebar-link changelog-version-link" href="#release-0-4-0" onClick={() => setMobileNavOpen(false)}>
              v0.4.0
            </a>
            <a className="sidebar-link changelog-version-link" href="#release-0-3-0" onClick={() => setMobileNavOpen(false)}>
              v0.3.0
            </a>
            <a className="sidebar-link changelog-version-link" href="#release-0-2-0" onClick={() => setMobileNavOpen(false)}>
              v0.2.0
            </a>
            <a className="sidebar-link changelog-version-link" href="#release-0-1-0" onClick={() => setMobileNavOpen(false)}>
              v0.1.0
            </a>
            <a className="sidebar-link" href="#migrations-overview" onClick={() => setMobileNavOpen(false)}>
              Migrations
            </a>
            <a className="sidebar-link" href="#release-upcoming" onClick={() => setMobileNavOpen(false)}>
              Roadmap
            </a>
          </div>
        )}
      </aside>
      {
        mobileNavOpen && (
          <div className="mobile-nav-backdrop" onClick={() => setMobileNavOpen(false)} />
        )
      }
    </>
  );
}
