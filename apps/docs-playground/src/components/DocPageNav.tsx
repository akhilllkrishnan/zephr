import React from "react";

interface DocPageNavProps {
  prev?: { label: string; onClick: () => void };
  next?: { label: string; onClick: () => void };
}

export function DocPageNav({ prev, next }: DocPageNavProps) {
  return (
    <nav className="doc-page-nav" aria-label="Page navigation">
      {prev ? (
        <button type="button" className="doc-page-nav-btn doc-page-nav-prev" onClick={prev.onClick}>
          <span className="ms doc-page-nav-icon">arrow_back</span>
          <span className="doc-page-nav-text">
            <span className="doc-page-nav-label">Previous</span>
            <span className="doc-page-nav-title">{prev.label}</span>
          </span>
        </button>
      ) : <div />}
      {next ? (
        <button type="button" className="doc-page-nav-btn doc-page-nav-next" onClick={next.onClick}>
          <span className="doc-page-nav-text">
            <span className="doc-page-nav-label">Next</span>
            <span className="doc-page-nav-title">{next.label}</span>
          </span>
          <span className="ms doc-page-nav-icon">arrow_forward</span>
        </button>
      ) : <div />}
    </nav>
  );
}
