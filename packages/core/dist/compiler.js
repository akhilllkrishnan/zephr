"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCssVariables = generateCssVariables;
function sanitizeKey(value) {
    return value.replace(/[^a-zA-Z0-9-]/g, "-");
}
function variableName(prefix, group, key) {
    return `--${prefix}-${group}-${sanitizeKey(key)}`;
}
function generateCssVariables(tokens, prefix = "z") {
    const lines = [":root{"];
    for (const [key, value] of Object.entries(tokens.color)) {
        lines.push(`${variableName(prefix, "color", key)}:${value};`);
    }
    for (const [key, value] of Object.entries(tokens.space)) {
        lines.push(`${variableName(prefix, "space", key)}:${value};`);
    }
    for (const [key, value] of Object.entries(tokens.radius)) {
        lines.push(`${variableName(prefix, "radius", key)}:${value};`);
    }
    for (const [key, value] of Object.entries(tokens.shadow)) {
        lines.push(`${variableName(prefix, "shadow", key)}:${value};`);
    }
    for (const [key, value] of Object.entries(tokens.type.size)) {
        lines.push(`${variableName(prefix, "type-size", key)}:${value};`);
    }
    for (const [key, value] of Object.entries(tokens.type.family)) {
        lines.push(`${variableName(prefix, "type-family", key)}:${value};`);
    }
    for (const [key, value] of Object.entries(tokens.type.weight)) {
        lines.push(`${variableName(prefix, "type-weight", key)}:${value};`);
    }
    for (const [key, value] of Object.entries(tokens.type.lineHeight)) {
        lines.push(`${variableName(prefix, "type-line", key)}:${value};`);
    }
    for (const [key, value] of Object.entries(tokens.type.letterSpacing)) {
        lines.push(`${variableName(prefix, "type-track", key)}:${value};`);
    }
    for (const [key, value] of Object.entries(tokens.motion.duration)) {
        lines.push(`${variableName(prefix, "motion-duration", key)}:${value};`);
    }
    for (const [key, value] of Object.entries(tokens.motion.easing)) {
        lines.push(`${variableName(prefix, "motion-easing", key)}:${value};`);
    }
    for (const [key, value] of Object.entries(tokens.breakpoints)) {
        lines.push(`${variableName(prefix, "breakpoint", key)}:${value};`);
    }
    lines.push("}");
    if (tokens.colorDark) {
        const darkColorVars = Object.entries(tokens.colorDark)
            .map(([key, value]) => `${variableName(prefix, "color", key)}:${value};`)
            .join("\n");
        lines.push(`[data-theme="dark"]{${darkColorVars}}`);
        lines.push(`@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){${darkColorVars}}}`);
    }
    return lines.join("\n");
}
//# sourceMappingURL=compiler.js.map