import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  Accordion,
  Alert,
  AvatarLibrary,
  Button,
  IconLibrary,
  LayoutShell,
  LogoLibrary,
  Navbar
} from "../src";

describe("@zephrui/ui-react", () => {
  it("renders button classes and content", () => {
    const html = renderToStaticMarkup(<Button variant="primary">Save</Button>);
    expect(html).toContain("Save");
    // Button uses CSS custom properties (var(--z-color-primary)) rather than hardcoded gradients
    expect(html).toContain("var(--z-color-primary");
    expect(html).toContain("inline-flex");
  });

  it("renders navbar links", () => {
    const html = renderToStaticMarkup(
      <Navbar
        brand={<strong>Zephr</strong>}
        links={[{ id: "home", label: "Home", href: "/" }]}
      />
    );

    expect(html).toContain("<nav");
    expect(html).toContain("Zephr");
    expect(html).toContain("Home");
  });

  it("renders layout shell slots", () => {
    const html = renderToStaticMarkup(
      <LayoutShell
        topNav={<div>Top Nav</div>}
        sidebar={<nav>Sidebar</nav>}
        rightRail={<aside>Right Rail</aside>}
        header={<header>Header</header>}
      >
        <section>Body</section>
      </LayoutShell>
    );

    expect(html).toContain("Top Nav");
    expect(html).toContain("Sidebar");
    expect(html).toContain("Right Rail");
    expect(html).toContain("Header");
    expect(html).toContain("Body");
  });

  it("renders accordion and alert primitives", () => {
    const accordionHtml = renderToStaticMarkup(
      <Accordion
        items={[
          { id: "q1", title: "What is Zephr?", description: "A plug-and-play UI framework." }
        ]}
      />
    );
    const alertHtml = renderToStaticMarkup(
      <Alert status="success" variant="light" title="Theme synced." />
    );

    expect(accordionHtml).toContain("What is Zephr?");
    expect(accordionHtml).toContain("aria-expanded");
    expect(alertHtml).toContain("Theme synced.");
    expect(alertHtml).toContain("role=\"status\"");
  });

  it("renders searchable asset libraries", () => {
    const iconsHtml = renderToStaticMarkup(<IconLibrary initialQuery="settings" limit={8} />);
    const avatarsHtml = renderToStaticMarkup(<AvatarLibrary initialQuery="retro" />);
    const logosHtml = renderToStaticMarkup(<LogoLibrary initialQuery="openai" />);

    expect(iconsHtml).toContain("settings");
    expect(avatarsHtml).toContain("pixel");
    expect(logosHtml).toContain("openai.com");
  });
});
