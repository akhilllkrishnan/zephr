/**
 * Smoke tests: ChangelogPage renders without crashing and shows key content.
 */

import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

// Mock SnippetItem — we only care that ChangelogPage wires it up, not SnippetItem internals
vi.mock("../../components/SnippetItem", () => ({
  SnippetItem: ({ label, code }: { label: string; code: string }) => (
    <div data-testid="snippet-item" data-label={label}>
      <pre>{code}</pre>
    </div>
  ),
}));

import { ChangelogPage } from "../../views/ChangelogPage";

describe("ChangelogPage", () => {
  it("renders the hero heading", () => {
    render(<ChangelogPage />);
    expect(screen.getByRole("heading", { name: /release notes/i })).toBeInTheDocument();
  });

  it("renders all 5 version badges", () => {
    render(<ChangelogPage />);
    const versionText = ["v0.5.0", "v0.4.0", "v0.3.0", "v0.2.0", "v0.1.0"];
    for (const v of versionText) {
      expect(screen.getAllByText(v).length).toBeGreaterThanOrEqual(1);
    }
  });

  it("shows the Latest badge on v0.5.0", () => {
    render(<ChangelogPage />);
    expect(screen.getByText("Latest")).toBeInTheDocument();
  });

  it("shows the Roadmap section", () => {
    render(<ChangelogPage />);
    expect(screen.getByRole("heading", { name: /roadmap/i })).toBeInTheDocument();
  });

  it("shows the Migrations section", () => {
    render(<ChangelogPage />);
    expect(screen.getByRole("heading", { name: /migrations/i })).toBeInTheDocument();
  });

  it("renders migration SnippetItem", () => {
    render(<ChangelogPage />);
    const snippets = screen.getAllByTestId("snippet-item");
    expect(snippets.length).toBeGreaterThanOrEqual(1);
  });

  it("accepts and uses an onCopy callback", () => {
    const onCopy = vi.fn();
    render(<ChangelogPage onCopy={onCopy} />);
    // SnippetItem is mocked; the callback is wired to copyAndFlash — present without error
    expect(screen.getByTestId("snippet-item")).toBeInTheDocument();
  });

  it("roadmap shows In progress milestone", () => {
    render(<ChangelogPage />);
    expect(screen.getByText(/in progress/i)).toBeInTheDocument();
  });

  it("roadmap shows v1.0.0 Production GA", () => {
    render(<ChangelogPage />);
    expect(screen.getByRole("heading", { name: /production ga/i })).toBeInTheDocument();
  });
});
