"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LEGACY_STYLE_PACK_MAP = void 0;
exports.resolveStylePackName = resolveStylePackName;
exports.resolveTokens = resolveTokens;
exports.resolveConfig = resolveConfig;
const stylePacks_1 = require("./stylePacks");
exports.LEGACY_STYLE_PACK_MAP = {
    Studio: "notion",
    Editorial: "stripe",
    NeoBrutal: "framer",
    SoftTech: "stripe",
    Enterprise: "linear",
    Clarity: "notion"
};
const deprecationNotices = new Set();
function warnLegacyStylePack(requested, mapped) {
    const key = `${requested}:${mapped}`;
    if (deprecationNotices.has(key)) {
        return;
    }
    deprecationNotices.add(key);
    console.warn(`[zephr] stylePack "${requested}" is deprecated and mapped to "${mapped}". ` +
        `Use one of: notion, stripe, linear, framer.`);
}
function isObject(value) {
    return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
function deepMerge(base, patch) {
    if (!patch) {
        return JSON.parse(JSON.stringify(base));
    }
    const output = JSON.parse(JSON.stringify(base));
    for (const [key, patchValue] of Object.entries(patch)) {
        const baseValue = output[key];
        if (isObject(baseValue) && isObject(patchValue)) {
            output[key] = deepMerge(baseValue, patchValue);
        }
        else if (patchValue !== undefined) {
            output[key] = patchValue;
        }
    }
    return output;
}
function getByPath(record, path) {
    return path.split(".").reduce((current, key) => {
        if (!isObject(current) || !(key in current)) {
            return undefined;
        }
        return current[key];
    }, record);
}
function setByPath(record, path, value) {
    const keys = path.split(".");
    let cursor = record;
    for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        const isLast = i === keys.length - 1;
        if (isLast) {
            cursor[key] = value;
            return;
        }
        if (!isObject(cursor[key])) {
            cursor[key] = {};
        }
        cursor = cursor[key];
    }
}
function applySemanticAliases(tokens, semanticAliases) {
    const resolved = JSON.parse(JSON.stringify(tokens));
    const source = tokens;
    for (const [targetPath, sourcePath] of Object.entries(semanticAliases)) {
        const sourceValue = getByPath(source, sourcePath);
        if (sourceValue !== undefined) {
            setByPath(resolved, targetPath, sourceValue);
        }
    }
    return resolved;
}
function resolveStylePackName(value) {
    if (value && value in stylePacks_1.stylePacks) {
        return value;
    }
    if (value && value in exports.LEGACY_STYLE_PACK_MAP) {
        const mapped = exports.LEGACY_STYLE_PACK_MAP[value];
        warnLegacyStylePack(value, mapped);
        return mapped;
    }
    return "notion";
}
function resolveTokens(config) {
    const stylePack = resolveStylePackName(config?.stylePack);
    const baseTokens = stylePacks_1.stylePacks[stylePack];
    const merged = deepMerge(baseTokens, config?.tokens);
    const semanticAliases = config?.semanticAliases ?? {};
    return applySemanticAliases(merged, semanticAliases);
}
function resolveConfig(config = {}) {
    const stylePack = resolveStylePackName(config.stylePack);
    const prefix = config.prefix?.trim() || "z";
    return {
        stylePack,
        tokens: resolveTokens(config),
        semanticAliases: config.semanticAliases ?? {},
        prefix,
        plugins: config.plugins ?? [],
        cloud: config.cloud ?? {}
    };
}
//# sourceMappingURL=tokens.js.map