/**
 * Smoke tests: ComponentGalleryPage renders and filters correctly.
 */

import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";

// Mock ComponentThumbnail (complex SVG switch) — unrelated to routing smoke
vi.mock("../../components/ComponentThumbnail", () => ({
  ComponentThumbnail: ({ name }: { name: string }) => (
    <div data-testid="thumbnail" data-name={name} />
  ),
}));

import { ComponentGalleryPage } from "../../views/ComponentGalleryPage";
import type { RegistryEntry } from "@zephrui/ai-registry";

// ── Fixture data ──────────────────────────────────────────────────────────────

function makeEntry(overrides: Partial<RegistryEntry>): RegistryEntry {
  return {
    id: "button",
    name: "Button",
    category: "atom",
    description: "Clickable button",
    defaultProps: {},
    props: [],
    aiContext: "",
    installPackage: "@zephrui/ui-react",
    importPath: "@zephrui/ui-react",
    usageTemplate: "",
    ...overrides,
  } as RegistryEntry;
}

const FIXTURE_REGISTRY: RegistryEntry[] = [
  makeEntry({ id: "button", name: "Button", category: "atom", description: "A button" }),
  makeEntry({ id: "badge", name: "Badge", category: "atom", description: "Status badge" }),
  makeEntry({ id: "card", name: "Card", category: "molecule", description: "Content card" }),
  makeEntry({ id: "form", name: "Form", category: "molecule", description: "Input form" }),
  makeEntry({ id: "header", name: "Header", category: "organism", description: "Page header" }),
  // Utility entry that should NOT appear in gallery
  makeEntry({ id: "utils", name: "Utils", category: "utility" as any, description: "Helpers" }),
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function renderGallery(overrides: {
  gallerySearch?: string;
  galleryCat?: "all" | "atom" | "molecule" | "organism";
} = {}) {
  const setGallerySearch = vi.fn();
  const setGalleryCat = vi.fn();
  const onSelectComponent = vi.fn();

  const { rerender } = render(
    <ComponentGalleryPage
      registry={FIXTURE_REGISTRY}
      gallerySearch={overrides.gallerySearch ?? ""}
      setGallerySearch={setGallerySearch}
      galleryCat={overrides.galleryCat ?? "all"}
      setGalleryCat={setGalleryCat}
      onSelectComponent={onSelectComponent}
    />
  );

  return { setGallerySearch, setGalleryCat, onSelectComponent, rerender };
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("ComponentGalleryPage", () => {
  describe("rendering", () => {
    it("renders the hero heading with component count", () => {
      renderGallery();
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toBeInTheDocument();
      // Count = 5 (atom+molecule+organism, not utility)
      expect(heading.textContent).toContain("5");
    });

    it("renders search input", () => {
      renderGallery();
      expect(screen.getByRole("searchbox")).toBeInTheDocument();
    });

    it("renders 4 filter pills (All, Atoms, Molecules, Organisms)", () => {
      renderGallery();
      const tabs = screen.getAllByRole("tab");
      expect(tabs).toHaveLength(4);
    });

    it("excludes utility-category entries from the grid", () => {
      renderGallery();
      expect(screen.queryByText("Utils")).not.toBeInTheDocument();
    });
  });

  describe("grouped view (default)", () => {
    it("shows Atoms, Molecules, Organisms section headings", () => {
      renderGallery();
      expect(screen.getByRole("heading", { name: /atoms/i })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: /molecules/i })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: /organisms/i })).toBeInTheDocument();
    });

    it("renders a card for each fixture component", () => {
      renderGallery();
      expect(screen.getByText("Button")).toBeInTheDocument();
      expect(screen.getByText("Badge")).toBeInTheDocument();
      expect(screen.getByText("Card")).toBeInTheDocument();
      expect(screen.getByText("Header")).toBeInTheDocument();
    });
  });

  describe("category filter", () => {
    it("shows only atom components when galleryCat=atom", () => {
      renderGallery({ galleryCat: "atom" });
      expect(screen.getByText("Button")).toBeInTheDocument();
      expect(screen.getByText("Badge")).toBeInTheDocument();
      expect(screen.queryByText("Card")).not.toBeInTheDocument();
      expect(screen.queryByText("Header")).not.toBeInTheDocument();
    });

    it("shows only molecules when galleryCat=molecule", () => {
      renderGallery({ galleryCat: "molecule" });
      expect(screen.getByText("Card")).toBeInTheDocument();
      expect(screen.queryByText("Button")).not.toBeInTheDocument();
    });

    it("calls setGalleryCat when a pill is clicked", () => {
      const { setGalleryCat } = renderGallery();
      const atomsTab = screen.getByRole("tab", { name: /atoms/i });
      fireEvent.click(atomsTab);
      expect(setGalleryCat).toHaveBeenCalledWith("atom");
    });
  });

  describe("search", () => {
    it("shows only matching components in flat grid", () => {
      renderGallery({ gallerySearch: "button" });
      expect(screen.getByText("Button")).toBeInTheDocument();
      // Card doesn't match "button"
      expect(screen.queryByText("Card")).not.toBeInTheDocument();
    });

    it("shows empty state when no components match", () => {
      renderGallery({ gallerySearch: "xyzzy_nonexistent" });
      expect(screen.getByText(/no components match/i)).toBeInTheDocument();
    });

    it("calls setGallerySearch when clear button is clicked in empty state", () => {
      const { setGallerySearch } = renderGallery({ gallerySearch: "xyzzy_nonexistent" });
      // Two "clear search" buttons may exist (search input + empty state) — pick the empty-state one
      const clearBtns = screen.getAllByRole("button", { name: /clear search/i });
      const emptyStateClearBtn = clearBtns.find((b) => b.className.includes("gallery-empty-clear"));
      expect(emptyStateClearBtn).toBeDefined();
      fireEvent.click(emptyStateClearBtn!);
      expect(setGallerySearch).toHaveBeenCalledWith("");
    });
  });

  describe("component selection", () => {
    it("calls onSelectComponent with the component id when card is clicked", () => {
      const { onSelectComponent } = renderGallery({ galleryCat: "atom" });
      const buttonCard = screen.getAllByRole("button").find((b) =>
        b.textContent?.includes("Button")
      );
      expect(buttonCard).toBeDefined();
      fireEvent.click(buttonCard!);
      expect(onSelectComponent).toHaveBeenCalledWith("button");
    });
  });
});
