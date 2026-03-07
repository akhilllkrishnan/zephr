import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { spawnSync } from "node:child_process";
import { describe, expect, it } from "vitest";

const cliPath = resolve(__dirname, "../dist/index.js");

function runCli(args: string[], cwd: string) {
  return spawnSync("node", [cliPath, ...args], {
    cwd,
    encoding: "utf8"
  });
}

function writeMinimalPackageJson(cwd: string): void {
  writeFileSync(
    join(cwd, "package.json"),
    JSON.stringify(
      {
        name: "zephr-test-app",
        private: true,
        version: "1.0.0",
        dependencies: {
          "@zephrui/core": "workspace:*",
          "@zephrui/ui-react": "workspace:*"
        }
      },
      null,
      2
    )
  );
}

describe("@zephrui/cli", () => {
  it("prints help output", () => {
    const tempDir = mkdtempSync(join(tmpdir(), "zephr-cli-help-"));
    const output = runCli(["--help"], tempDir);
    rmSync(tempDir, { recursive: true, force: true });

    expect(output.status).toBe(0);
    expect(output.stdout).toContain("Zephr CLI");
    expect(output.stdout).toContain("zephr init");
    expect(output.stdout).toContain("zephr add <component>");
  });

  it("initializes project files and scaffolds component prompt", () => {
    const tempDir = mkdtempSync(join(tmpdir(), "zephr-cli-init-"));
    writeMinimalPackageJson(tempDir);

    const initResult = runCli(["init", "--style-pack", "Clarity", "--accent", "#335cff"], tempDir);
    const addResult = runCli(["add", "button", "--tool", "Codex"], tempDir);
    const doctorResult = runCli(["doctor"], tempDir);

    try {
      expect(initResult.status).toBe(0);
      expect(addResult.status).toBe(0);
      expect(doctorResult.status).toBe(0);

      expect(existsSync(join(tempDir, "zephr.config.ts"))).toBe(true);
      expect(existsSync(join(tempDir, ".env.example"))).toBe(true);
      expect(existsSync(join(tempDir, "src", "styles", "zephr.css"))).toBe(true);
      expect(existsSync(join(tempDir, "CLAUDE.md"))).toBe(true);
      expect(existsSync(join(tempDir, "AGENTS.md"))).toBe(true);
      expect(existsSync(join(tempDir, "llms.txt"))).toBe(true);
      expect(existsSync(join(tempDir, "zephr-snippets", "button.tsx"))).toBe(true);
      expect(existsSync(join(tempDir, "zephr-snippets", "button.prompt.md"))).toBe(true);

      const config = readFileSync(join(tempDir, "zephr.config.ts"), "utf8");
      expect(config).toContain(`stylePack: "notion"`);
      expect(config).toContain(`primary: "#335cff"`);
    } finally {
      rmSync(tempDir, { recursive: true, force: true });
    }
  });

  it("applies theme and accent updates to managed config", () => {
    const tempDir = mkdtempSync(join(tmpdir(), "zephr-cli-theme-"));
    writeMinimalPackageJson(tempDir);

    const initResult = runCli(["init"], tempDir);
    const themeResult = runCli(["theme", "stripe", "--accent", "#1d4ed8"], tempDir);

    try {
      expect(initResult.status).toBe(0);
      expect(themeResult.status).toBe(0);
      expect(themeResult.stdout).toContain("Theme updated: stripe");

      const config = readFileSync(join(tempDir, "zephr.config.ts"), "utf8");
      expect(config).toContain(`stylePack: "stripe"`);
      expect(config).toContain(`primary: "#1d4ed8"`);
      expect(existsSync(join(tempDir, "src", "styles", "zephr.css"))).toBe(true);
    } finally {
      rmSync(tempDir, { recursive: true, force: true });
    }
  });

  it("lists components from registry", () => {
    const tempDir = mkdtempSync(join(tmpdir(), "zephr-cli-list-"));
    const result = runCli(["list", "--search", "input"], tempDir);
    rmSync(tempDir, { recursive: true, force: true });

    expect(result.status).toBe(0);
    expect(result.stdout.toLowerCase()).toContain("input");
  });
});
