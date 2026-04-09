import type { ReactNode } from "react";

export function BrowserPreviewFrame({
  children,
  address = "preview.zephr.local",
  minHeight,
  toolbar,
  flush = false
}: {
  children: ReactNode;
  address?: string;
  minHeight?: string;
  toolbar?: ReactNode;
  flush?: boolean;
}) {
  return (
    <div className="preview-browser">
      <div className="preview-browser-top">
        <div className="preview-traffic" aria-hidden>
          <span className="traffic-dot traffic-red" />
          <span className="traffic-dot traffic-yellow" />
          <span className="traffic-dot traffic-green" />
        </div>
        {/* Sidebar toggle icon */}
        <button type="button" className="preview-chrome-btn" aria-label="Toggle sidebar" tabIndex={-1}>
          <span className="ms">dock_to_left</span>
        </button>
        {/* Navigation icons */}
        <div className="preview-browser-nav" aria-hidden>
          <span className="preview-chrome-btn"><span className="ms">chevron_left</span></span>
          <span className="preview-chrome-btn"><span className="ms">chevron_right</span></span>
          <span className="preview-chrome-btn"><span className="ms">refresh</span></span>
        </div>
        {/* Address bar */}
        <div className="preview-address">
          <span className="preview-address-lock ms">lock</span>
          <span>{address}</span>
          <span className="preview-address-link ms">open_in_new</span>
        </div>
        {/* Right side actions */}
        <div className="preview-browser-actions" aria-hidden>
          <span className="preview-chrome-btn"><span className="ms">extension</span></span>
          <span className="preview-chrome-btn"><span className="ms">add</span></span>
        </div>
      </div>
      <div className="preview-surface-shell">
        {toolbar && <div className="preview-toolbar-zone">{toolbar}</div>}
        <div className={`preview-canvas${flush ? " preview-canvas--flush" : ""}`} style={minHeight ? { minHeight } : undefined}>
          {children}
        </div>
      </div>
    </div>
  );
}
