import fs from "fs";
import path from "path";
import { buildHarnessHtml } from "./harness";
import { checkTokenCompliance, checkContrast } from "./compliance";
import type { TokenViolation, ContrastResult } from "./compliance";

// Dynamic import of playwright so the MCP server doesn't crash
// if playwright isn't installed.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let playwrightModule: any = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let browser: any = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let page: any = null;
let tokenCss = "";
let rendererReady = false;
let rendererError = "";

export interface RenderResult {
  screenshot: string;
  screenshotDark?: string;
  width: number;
  height: number;
  violations: TokenViolation[];
  contrastResults: ContrastResult[];
  computedTokens: Record<string, string>;
  renderTimeMs: number;
  error?: string;
}

export async function initRenderer(): Promise<void> {
  // Load token CSS once
  try {
    const cssPath = path.resolve(
      __dirname,
      "../../../../ui-react/src/themes/default.css"
    );
    tokenCss = fs.readFileSync(cssPath, "utf8");
  } catch {
    // Fallback: minimal CSS so rendering still works
    tokenCss = ":root { --z-color-primary: #533afd; }";
  }

  // Try to load Playwright
  try {
    playwrightModule = await import("playwright");
    const chromium = playwrightModule.chromium;
    browser = await chromium.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    page = await browser.newPage();
    rendererReady = true;
  } catch (e) {
    rendererError = e instanceof Error ? e.message : "Playwright unavailable";
    rendererReady = false;
  }
}

export async function shutdownRenderer(): Promise<void> {
  try {
    if (page) await page.close();
    if (browser) await browser.close();
  } catch {
    // ignore shutdown errors
  }
}

async function renderOnce(
  jsx: string,
  theme: "light" | "dark",
  width: number,
  accentColor: string
): Promise<{ screenshot: string; width: number; height: number; computedTokens: Record<string, string> }> {
  await page.setViewportSize({ width, height: 600 });

  const html = buildHarnessHtml(jsx, theme, accentColor, tokenCss);
  await page.setContent(html, { waitUntil: "domcontentloaded" });

  // Wait for render root to be visible
  try {
    await page.waitForSelector("#zephr-render-root", { timeout: 5000 });
    // Small delay for React to hydrate
    await page.waitForTimeout(300);
  } catch {
    // Continue even if selector times out
  }

  // Check for render errors set by the harness
  const renderError = await page.evaluate(() => (window as { __zephrRenderError?: string }).__zephrRenderError);
  if (renderError) {
    throw new Error(`JSX render error: ${renderError}`);
  }

  // Screenshot just the render root element
  const element = await page.$("#zephr-render-root");
  if (!element) throw new Error("Render root element not found");

  const bbox = await element.boundingBox();
  const screenshotBuffer = await element.screenshot({ type: "png" });
  const screenshot = (screenshotBuffer as Buffer).toString("base64");

  // Collect computed token values
  const computedTokens = await page.evaluate(() => {
    const style = getComputedStyle(document.documentElement);
    const tokens: Record<string, string> = {};
    for (let i = 0; i < style.length; i++) {
      const prop = style[i];
      if (prop.startsWith("--z-")) {
        tokens[prop] = style.getPropertyValue(prop).trim();
      }
    }
    return tokens;
  }) as Record<string, string>;

  return {
    screenshot,
    width: Math.round((bbox as { width: number } | null)?.width ?? width),
    height: Math.round((bbox as { height: number } | null)?.height ?? 0),
    computedTokens,
  };
}

export async function renderJsx(args: {
  jsx: string;
  theme?: "light" | "dark" | "both";
  width?: number;
  accentColor?: string;
}): Promise<RenderResult> {
  const startMs = Date.now();
  const theme = args.theme ?? "light";
  const width = args.width ?? 800;
  const accentColor = args.accentColor ?? "#533afd";

  if (!rendererReady) {
    return {
      screenshot: "",
      width,
      height: 0,
      violations: [],
      contrastResults: [],
      computedTokens: {},
      renderTimeMs: Date.now() - startMs,
      error: `Renderer unavailable: ${rendererError}`,
    };
  }

  try {
    // Render light (or single theme)
    const lightTheme: "light" | "dark" = theme === "dark" ? "dark" : "light";
    const lightResult = await renderOnce(args.jsx, lightTheme, width, accentColor);

    // Collect compliance data after light render
    const violations = await checkTokenCompliance(page);
    const contrastResults = await checkContrast(page);

    let screenshotDark: string | undefined;
    if (theme === "both") {
      const darkResult = await renderOnce(args.jsx, "dark", width, accentColor);
      screenshotDark = darkResult.screenshot;
    }

    return {
      screenshot: lightResult.screenshot,
      screenshotDark,
      width: lightResult.width,
      height: lightResult.height,
      violations,
      contrastResults,
      computedTokens: lightResult.computedTokens,
      renderTimeMs: Date.now() - startMs,
    };
  } catch (e) {
    return {
      screenshot: "",
      width,
      height: 0,
      violations: [],
      contrastResults: [],
      computedTokens: {},
      renderTimeMs: Date.now() - startMs,
      error: e instanceof Error ? e.message : "Unknown render error",
    };
  }
}
