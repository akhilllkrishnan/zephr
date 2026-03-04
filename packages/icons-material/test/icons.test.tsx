import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MaterialIcon, getMaterialIcon, searchMaterialIcons } from "../src";

describe("@zephyr/icons-material", () => {
  it("renders icon markup with ligature text", () => {
    const html = renderToStaticMarkup(<MaterialIcon name="menu" size={24} />);
    expect(html).toContain("menu");
    expect(html).toContain("font-variation-settings");
    expect(html).toContain("width:24px");
  });

  it("finds icons by semantic alias", () => {
    const results = searchMaterialIcons("gear", { limit: 10 });
    expect(results.some((icon) => icon.name === "settings")).toBe(true);
  });

  it("returns icon metadata by name", () => {
    const icon = getMaterialIcon("credit_card");
    expect(icon?.title).toBe("Credit Card");
    expect(icon?.category).toBe("commerce");
  });
});
