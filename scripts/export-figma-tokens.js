#!/usr/bin/env node
/**
 * scripts/export-figma-tokens.js
 *
 * Reads a Figma Variables JSON export (figma/tokens.json) and maps it to
 * the @zephyr/core token structure, writing a generated snapshot to
 * packages/core/src/tokens/figma-export.ts.
 *
 * The generated file is NON-DESTRUCTIVE — it does not overwrite the hand-
 * authored style pack files. Use it as a diff reference when Figma tokens change.
 *
 * Usage:
 *   node scripts/export-figma-tokens.js                 # reads figma/tokens.json
 *   node scripts/export-figma-tokens.js --input path/to/tokens.json
 *   node scripts/export-figma-tokens.js --dry-run       # print to stdout only
 *
 * Supported Figma export formats:
 *   - W3C Design Token format (from Figma Variables → Export)
 *   - Style Dictionary flat JSON
 */

const fs = require("node:fs");
const path = require("node:path");

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const inputIndex = args.indexOf("--input");
const inputPath = inputIndex >= 0
  ? args[inputIndex + 1]
  : path.join(__dirname, "../figma/tokens.json");

const ROOT_DIR = path.join(__dirname, "..");
const OUTPUT_PATH = path.join(ROOT_DIR, "packages/core/src/tokens/figma-export.ts");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Resolve a W3C token value — handles $value and plain string. */
function resolveValue(token) {
  if (typeof token === "string") return token;
  if (token && typeof token.$value !== "undefined") return token.$value;
  return null;
}

/** Flatten a nested token object into "category.name" → value pairs. */
function flattenTokens(obj, prefix = "") {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !("$value" in value) && !("$type" in value)) {
      Object.assign(result, flattenTokens(value, fullKey));
    } else {
      const resolved = resolveValue(value);
      if (resolved !== null) {
        result[fullKey] = resolved;
      }
    }
  }
  return result;
}

// Mapping from Figma token key patterns → @zephyr/core token paths
const TOKEN_MAP = [
  // Colors
  { pattern: /^color\.background$/i, target: "color.background" },
  { pattern: /^color\.surface$/i, target: "color.surface" },
  { pattern: /^color\.primary$/i, target: "color.primary" },
  { pattern: /^color\.secondary$/i, target: "color.secondary" },
  { pattern: /^color\.accent$/i, target: "color.accent" },
  { pattern: /^color\.text$/i, target: "color.text" },
  { pattern: /^color\.textMuted$/i, target: "color.textMuted" },
  { pattern: /^color\.border$/i, target: "color.border" },
  { pattern: /^color\.error$/i, target: "color.error" },
  { pattern: /^color\.success$/i, target: "color.success" },
  { pattern: /^color\.warning$/i, target: "color.warning" },
  // Spacing
  { pattern: /^spacing\.(\w+)$/i, target: (m) => `space.${m[1]}` },
  // Radius
  { pattern: /^borderRadius\.(\w+)$/i, target: (m) => `radius.${m[1]}` },
  { pattern: /^radius\.(\w+)$/i, target: (m) => `radius.${m[1]}` },
  // Typography
  { pattern: /^fontFamily\.(\w+)$/i, target: (m) => `type.fontFamily.${m[1]}` },
  { pattern: /^fontSize\.(\w+)$/i, target: (m) => `type.fontSize.${m[1]}` },
  { pattern: /^fontWeight\.(\w+)$/i, target: (m) => `type.fontWeight.${m[1]}` },
  { pattern: /^lineHeight\.(\w+)$/i, target: (m) => `type.lineHeight.${m[1]}` },
  // Shadow
  { pattern: /^shadow\.(\w+)$/i, target: (m) => `shadow.${m[1]}` },
  // Motion
  { pattern: /^duration\.(\w+)$/i, target: (m) => `motion.duration.${m[1]}` },
  { pattern: /^easing\.(\w+)$/i, target: (m) => `motion.easing.${m[1]}` },
];

function mapFigmaKeyToZephyr(figmaKey) {
  for (const { pattern, target } of TOKEN_MAP) {
    const match = figmaKey.match(pattern);
    if (match) {
      return typeof target === "function" ? target(match) : target;
    }
  }
  return null; // unmapped — will go in the "unmapped" section
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  if (!fs.existsSync(inputPath)) {
    console.error(`[export-figma-tokens] Input file not found: ${inputPath}`);
    console.error("  Export Figma Variables from Figma → Assets → Variables → Export JSON");
    console.error("  then save the file to figma/tokens.json");
    process.exit(1);
  }

  let rawJson;
  try {
    rawJson = JSON.parse(fs.readFileSync(inputPath, "utf8"));
  } catch (err) {
    console.error(`[export-figma-tokens] Failed to parse ${inputPath}: ${err.message}`);
    process.exit(1);
  }

  const flat = flattenTokens(rawJson);
  const mapped = {};
  const unmapped = {};

  for (const [figmaKey, value] of Object.entries(flat)) {
    const zephyrKey = mapFigmaKeyToZephyr(figmaKey);
    if (zephyrKey) {
      mapped[zephyrKey] = value;
    } else {
      unmapped[figmaKey] = value;
    }
  }

  const mappedCount = Object.keys(mapped).length;
  const unmappedCount = Object.keys(unmapped).length;

  const lines = [
    `/**`,
    ` * figma-export.ts — AUTO-GENERATED by scripts/export-figma-tokens.js`,
    ` * Source: ${path.relative(ROOT_DIR, inputPath)}`,
    ` * Generated: ${new Date().toISOString()}`,
    ` *`,
    ` * DO NOT EDIT MANUALLY. This file is a snapshot for review.`,
    ` * Review the diff and apply relevant changes to the style pack files.`,
    ` *`,
    ` * Mapped tokens: ${mappedCount}`,
    ` * Unmapped tokens (needs manual review): ${unmappedCount}`,
    ` */`,
    ``,
    `// Token values extracted from Figma export`,
    `export const figmaTokens = ${JSON.stringify(mapped, null, 2)} as const;`,
    ``,
  ];

  if (unmappedCount > 0) {
    lines.push(
      `// These Figma tokens could not be auto-mapped to Zephyr token paths.`,
      `// Review and add them to the appropriate style pack manually.`,
      `export const unmappedFigmaTokens = ${JSON.stringify(unmapped, null, 2)} as const;`,
      ``
    );
  }

  const output = lines.join("\n");

  if (dryRun) {
    console.log(output);
    console.log(`\n[export-figma-tokens] DRY RUN — ${mappedCount} mapped, ${unmappedCount} unmapped`);
    return;
  }

  const outputDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_PATH, output, "utf8");
  console.log(`[export-figma-tokens] Written to ${path.relative(ROOT_DIR, OUTPUT_PATH)}`);
  console.log(`  Mapped:   ${mappedCount} tokens`);
  console.log(`  Unmapped: ${unmappedCount} tokens (review manually)`);
}

main();
