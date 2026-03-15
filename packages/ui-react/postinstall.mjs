#!/usr/bin/env node
// Zephr welcome banner — runs once after `npm install @zephrui/ui-react`

const noColor = !!process.env.NO_COLOR;
const isCI = !!(process.env.CI || process.env.CONTINUOUS_INTEGRATION);

// npm pipes stdout when running lifecycle scripts, so isTTY is always false —
// skip only explicit CI environments and NO_COLOR requests.
if (isCI) {
  process.exit(0);
}

const I = noColor ? "" : "\x1b[38;2;99;102;241m"; // indigo
const D = noColor ? "" : "\x1b[2m";               // dim
const R = noColor ? "" : "\x1b[0m";               // reset
const B = noColor ? "" : "\x1b[1m";               // bold
const G = noColor ? "" : "\x1b[38;2;134;239;172m"; // green for success tick

// ZEPHR in 6-row pixel block art (7-wide letters, 2-space gaps)
const art = [
  " \u2588\u2588\u2588\u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588\u2588\u2588   \u2588\u2588   \u2588\u2588  \u2588\u2588\u2588\u2588\u2588\u2588 ",
  "      \u2588\u2588  \u2588\u2588       \u2588\u2588   \u2588\u2588  \u2588\u2588   \u2588\u2588  \u2588\u2588   \u2588\u2588",
  "    \u2588\u2588\u2588   \u2588\u2588\u2588\u2588\u2588    \u2588\u2588\u2588\u2588\u2588\u2588   \u2588\u2588\u2588\u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588\u2588\u2588 ",
  "  \u2588\u2588\u2588     \u2588\u2588       \u2588\u2588       \u2588\u2588   \u2588\u2588  \u2588\u2588\u2588\u2588   ",
  " \u2588\u2588       \u2588\u2588       \u2588\u2588       \u2588\u2588   \u2588\u2588  \u2588\u2588  \u2588\u2588 ",
  " \u2588\u2588\u2588\u2588\u2588\u2588\u2588  \u2588\u2588\u2588\u2588\u2588\u2588\u2588  \u2588\u2588       \u2588\u2588   \u2588\u2588  \u2588\u2588   \u2588\u2588",
];

const label = " \u2726  Welcome to Zephr ";
const pad = "\u2500".repeat(label.length);

const pkg = JSON.parse(
  (await import("node:fs")).readFileSync(
    new URL("../package.json", import.meta.url),
    "utf8"
  )
);
const version = pkg.version ?? "0.1.0";

process.stdout.write("\n");
process.stdout.write(`${D}  \u256d${pad}\u256e${R}\n`);
process.stdout.write(`${D}  \u2502${R}${B}${label}${R}${D}\u2502${R}\n`);
process.stdout.write(`${D}  \u2570${pad}\u256f${R}\n`);
process.stdout.write("\n");
for (const line of art) {
  process.stdout.write(`  ${I}${B}${line}${R}\n`);
}
process.stdout.write("\n");
process.stdout.write(`  ${D}v${version} · Token-native React UI for AI-assisted product development.${R}\n`);
process.stdout.write("\n");
process.stdout.write(`  ${G}${B}\u2714${R}  ${B}@zephrui/ui-react${R} installed\n`);
process.stdout.write("\n");
process.stdout.write(`  ${D}Next steps:${R}\n`);
process.stdout.write(`  ${D}  1. Run ${R}${B}npx zephr init${R}${D} to set up your project${R}\n`);
process.stdout.write(`  ${D}  2. Import ${R}${B}src/styles/zephr.css${R}${D} in your root layout${R}\n`);
process.stdout.write(`  ${D}  3. Import components from ${R}${B}@zephrui/ui-react${R}\n`);
process.stdout.write("\n");
