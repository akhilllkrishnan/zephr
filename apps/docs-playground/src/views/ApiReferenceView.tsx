import { Button } from "@zephrui/ui-react";
import type { RegistryEntry } from "@zephrui/ai-registry";
import type { RegistryPropRow } from "@zephrui/ai-registry";
import type { WorkspaceView } from "../types";

export interface ApiReferenceViewProps {
  selectedEntry: RegistryEntry;
  apiPropRows: RegistryPropRow[];
  importSnippet: string;
  installCommand: string;
  setView: (view: WorkspaceView) => void;
  copyAndFlash: (label: string, text: string) => void;
}

export function ApiReferenceView({
  selectedEntry,
  apiPropRows,
  importSnippet,
  installCommand,
  setView,
  copyAndFlash,
}: ApiReferenceViewProps) {
  return (
    <>
      <div className="component-page-tabs">
        <button type="button" className="component-page-tab" onClick={() => setView("components")}>Guides</button>
        <button type="button" className="component-page-tab is-active">API Reference</button>
        <button type="button" className="component-page-tab" onClick={() => setView("code-export")}>Code</button>
      </div>
      <section id="api-overview" className="doc-section hero">
        <p className="breadcrumbs">API Reference / Components</p>
        <p className="eyebrow">{selectedEntry.category} • {selectedEntry.id}</p>
        <h1>{selectedEntry.name} API</h1>
        <p className="lead">
          Generated from Zephr registry metadata. This is the canonical contract AI tools should follow.
        </p>
        <div className="hero-actions">
          <Button onClick={() => copyAndFlash("Import snippet", importSnippet)}>Copy import</Button>
          <Button variant="secondary" onClick={() => copyAndFlash("Install command", installCommand)}>Copy install</Button>
        </div>
      </section>

      <section id="api-props" className="doc-section">
        <div className="section-heading">
          <h2>Props</h2>
          <p>Table generated directly from <code>propsSchema</code> in the component registry.</p>
        </div>

        <div className="api-table-shell">
          <table className="api-table">
            <thead>
              <tr>
                <th scope="col">Prop</th>
                <th scope="col">Type</th>
                <th scope="col">Description</th>
                <th scope="col">Accepted Values</th>
                <th scope="col">Required</th>
                <th scope="col">Default</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {apiPropRows.map((row) => (
                <tr key={row.name}>
                  <td><code>{row.name}</code></td>
                  <td><code>{row.type}</code></td>
                  <td>{row.description}</td>
                  <td>{row.acceptedValues}</td>
                  <td>{row.required ? "Yes" : "No"}</td>
                  <td>{row.defaultValue}</td>
                  <td>{row.deprecated ? "Deprecated" : "Active"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="api-contract" className="doc-section">
        <div className="section-heading">
          <h2>Contract notes</h2>
          <p>Additional metadata for runtime compatibility, accessibility, and visual system support.</p>
        </div>
        <div className="api-meta-grid">
          <article className="api-meta-card">
            <h3>Dependencies</h3>
            <p>{selectedEntry.dependencies.join(", ")}</p>
          </article>
          <article className="api-meta-card">
            <h3>Visual system</h3>
            <p>Default Zephr visual system with accent overrides</p>
          </article>
          <article className="api-meta-card">
            <h3>Accessibility</h3>
            <p>{selectedEntry.a11yNotes.join(" ")}</p>
          </article>
          <article className="api-meta-card">
            <h3>AI Hints</h3>
            <p>
              Do: {selectedEntry.aiHints.positive.join(" ")}
              {" "}
              Avoid: {selectedEntry.aiHints.negative.join(" ")}
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
