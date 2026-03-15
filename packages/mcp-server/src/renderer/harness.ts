import fs from "fs";
import path from "path";

// Load the pre-bundled Zephr component bundle (built during prebuild step).
// If the file doesn't exist (e.g. in CI without prebuild), use an empty stub.
function loadZephrBundle(): string {
  const bundlePath = path.join(__dirname, "zephr-bundle.js");
  try {
    return fs.readFileSync(bundlePath, "utf8");
  } catch {
    return "window.Zephr = {};";
  }
}

const ZEPHR_BUNDLE = loadZephrBundle();

export function buildHarnessHtml(
  jsx: string,
  theme: "light" | "dark",
  accentColor: string,
  tokenCss: string
): string {
  // Escape the JSX for safe embedding in a JS string template literal.
  // We'll pass it as a string to Babel.transform at runtime.
  const escapedJsx = jsx
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$/g, "\\$");

  const bg = theme === "dark" ? "#0f1115" : "#ffffff";

  return `<!DOCTYPE html>
<html data-theme="${theme}" lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
/* Zephr design tokens */
${tokenCss}

/* Accent override */
:root {
  --z-color-primary: ${accentColor};
  --z-color-accent: ${accentColor};
}

* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: ${bg};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
}
#zephr-render-root {
  display: inline-block;
  padding: 24px;
  min-width: 120px;
}
</style>
</head>
<body>
<div id="zephr-render-root"></div>

<!-- React 18 from CDN -->
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- Babel standalone for runtime JSX transform -->
<script src="https://unpkg.com/@babel/standalone@7.24.0/babel.min.js"></script>

<!-- Pre-bundled Zephr components -->
<script>
${ZEPHR_BUNDLE}
</script>

<!-- Render the user JSX -->
<script>
(function() {
  try {
    // Expose Zephr components and React to the user JSX scope
    const { createElement, Fragment, useState, useEffect, useRef, useMemo, useCallback } = React;
    const ZephrComponents = window.Zephr || {};

    // Build a scope string so the JSX can reference component names directly
    const componentNames = Object.keys(ZephrComponents).join(', ');

    // The user JSX string — may be a single expression or a full JSX tree
    const userJsx = \`${escapedJsx}\`;

    // Wrap in a functional component
    const wrappedCode = \`
      const { \${componentNames} } = window.Zephr;
      function ZephrPreview() {
        return (\${userJsx});
      }
      const root = ReactDOM.createRoot(document.getElementById('zephr-render-root'));
      root.render(React.createElement(ZephrPreview));
    \`;

    // Compile JSX at runtime using Babel standalone
    const compiled = Babel.transform(wrappedCode, {
      presets: [['react', { runtime: 'classic' }]],
      filename: 'preview.jsx',
    }).code;

    // Execute compiled code
    eval(compiled);  // eslint-disable-line no-eval
  } catch (err) {
    document.getElementById('zephr-render-root').innerHTML =
      '<div style="color:#b91c1c;padding:8px;font-family:monospace;font-size:12px">' +
      '<strong>Render error:</strong><br>' + err.message + '</div>';
    window.__zephrRenderError = err.message;
  }
})();
</script>
</body>
</html>`;
}
