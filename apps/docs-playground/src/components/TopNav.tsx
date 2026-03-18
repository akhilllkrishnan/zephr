import type { KeyboardEvent, RefObject } from "react";
import { FeedbackWidget } from "../FeedbackWidget";
import type { TopTab, SearchResultItem } from "../types";
import "./TopNav.css";

interface TopNavProps {
  brandLogoSrc: string;
  onBrandClick: () => void;
  topTab: TopTab;
  onTabChange: (tab: TopTab) => void;
  catalogSearch: string;
  onSearchChange: (value: string) => void;
  searchFocused: boolean;
  onSearchFocus: () => void;
  searchResults: SearchResultItem[];
  searchActiveIndex: number;
  onSearchActiveIndexChange: (index: number) => void;
  onSearchResultNavigate: (result: SearchResultItem) => void;
  searchPanelRef: RefObject<HTMLDivElement | null>;
  searchInputRef: RefObject<HTMLInputElement | null>;
  darkMode: boolean;
  onDarkModeToggle: () => void;
  mobileNavOpen: boolean;
  onMobileNavToggle: () => void;
}

export function TopNav({
  brandLogoSrc,
  onBrandClick,
  topTab,
  onTabChange,
  catalogSearch,
  onSearchChange,
  searchFocused,
  onSearchFocus,
  searchResults,
  searchActiveIndex,
  onSearchActiveIndexChange,
  onSearchResultNavigate,
  searchPanelRef,
  searchInputRef,
  darkMode,
  onDarkModeToggle,
  mobileNavOpen,
  onMobileNavToggle,
}: TopNavProps) {

  function handleSearchKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" && searchResults.length) {
      event.preventDefault();
      onSearchActiveIndexChange(Math.min(searchActiveIndex + 1, searchResults.length - 1));
      return;
    }
    if (event.key === "ArrowUp" && searchResults.length) {
      event.preventDefault();
      onSearchActiveIndexChange(Math.max(searchActiveIndex - 1, 0));
      return;
    }
    if (event.key === "Enter" && searchResults.length) {
      event.preventDefault();
      onSearchResultNavigate(searchResults[searchActiveIndex] ?? searchResults[0]);
    }
  }

  return (
    <header className="top-nav">
      <div className="top-main">
        <button
          type="button"
          className="mobile-nav-toggle"
          onClick={onMobileNavToggle}
          aria-label={mobileNavOpen ? "Close navigation" : "Open navigation"}
        >
          <span className="ms">menu</span>
        </button>

        {/* App switcher — grid_view, rounded, weight 100, not filled */}
        <button
          type="button"
          className="top-app-switcher"
          aria-label="Switch Zephr apps"
          title="Switch Zephr apps"
        >
          <span className="ms top-nav-icon">grid_view</span>
        </button>

        <div className="brand-wrap">
          <button
            type="button"
            className="brand-home"
            onClick={onBrandClick}
            aria-label="Go to introduction"
          >
            <img src={brandLogoSrc} alt="Zephr" className="brand-logo" />
          </button>
        </div>

        <div className="top-search-wrap">
          <div className="top-search-inner" ref={searchPanelRef}>
            <span className="ms top-search-icon" aria-hidden>search</span>
            <input
              ref={searchInputRef}
              className="top-search"
              value={catalogSearch}
              onChange={(event) => onSearchChange(event.target.value)}
              onFocus={onSearchFocus}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search tokens or pairs…"
              aria-label="Search"
            />
            {!catalogSearch && (
              <kbd className="top-search-kbd">/</kbd>
            )}
            {searchFocused && catalogSearch.trim() ? (
              <div className="top-search-results" role="listbox" aria-label="Search results">
                {searchResults.length ? (
                  searchResults.map((result) => (
                    <button
                      key={result.id}
                      type="button"
                      className={`top-search-result ${searchResults[searchActiveIndex]?.id === result.id ? "is-active" : ""}`}
                      onClick={() => onSearchResultNavigate(result)}
                      onMouseEnter={() => {
                        const index = searchResults.findIndex((item) => item.id === result.id);
                        if (index >= 0) onSearchActiveIndexChange(index);
                      }}
                    >
                      <span className="top-search-result-main">{result.label}</span>
                      <span className="top-search-result-meta">{result.detail}</span>
                    </button>
                  ))
                ) : (
                  <p className="top-search-empty">No matches found.</p>
                )}
              </div>
            ) : null}
          </div>
        </div>

        <div className="top-actions">
          <FeedbackWidget />

          <a
            href="https://github.com/akhilllkrishnan/zephr"
            target="_blank"
            rel="noopener noreferrer"
            className="top-icon-action"
            aria-label="View Zephr on GitHub"
            title="View on GitHub"
          >
            {/* GitHub brand logo — no Material Symbols equivalent */}
            <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
          </a>

          <button
            type="button"
            className="top-icon-action"
            onClick={onDarkModeToggle}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            <span className="ms top-nav-icon">{darkMode ? "light_mode" : "dark_mode"}</span>
          </button>
        </div>
      </div>

      <nav className="top-tabs" aria-label="Top tabs">
        <button type="button" className={`tab ${topTab === "setup" ? "active" : ""}`} onClick={() => onTabChange("setup")}>Setup</button>
        <button type="button" className={`tab ${topTab === "components" ? "active" : ""}`} onClick={() => onTabChange("components")}>Components</button>
        <button type="button" className={`tab ${topTab === "icons" ? "active" : ""}`} onClick={() => onTabChange("icons")}>Icons</button>
        <button type="button" className={`tab ${topTab === "logos" ? "active" : ""}`} onClick={() => onTabChange("logos")}>Logos</button>
        <button type="button" className={`tab ${topTab === "changelog" ? "active" : ""}`} onClick={() => onTabChange("changelog")}>Change Log</button>
      </nav>
    </header>
  );
}
