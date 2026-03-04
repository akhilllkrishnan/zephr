import { stylePacks } from "./stylePacks";
import {
  DesignTokens,
  PartialDeep,
  ResolvedZephyrConfig,
  StylePackName,
  ZephyrConfig
} from "./types";

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function deepMerge<T>(base: T, patch?: PartialDeep<T>): T {
  if (!patch) {
    return JSON.parse(JSON.stringify(base));
  }

  const output: Record<string, unknown> = JSON.parse(JSON.stringify(base));
  for (const [key, patchValue] of Object.entries(patch as Record<string, unknown>)) {
    const baseValue = output[key];
    if (isObject(baseValue) && isObject(patchValue)) {
      output[key] = deepMerge(baseValue, patchValue);
    } else if (patchValue !== undefined) {
      output[key] = patchValue;
    }
  }

  return output as T;
}

function getByPath(record: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((current, key) => {
    if (!isObject(current) || !(key in current)) {
      return undefined;
    }
    return current[key];
  }, record);
}

function setByPath(record: Record<string, unknown>, path: string, value: unknown): void {
  const keys = path.split(".");
  let cursor: Record<string, unknown> = record;

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
    cursor = cursor[key] as Record<string, unknown>;
  }
}

function applySemanticAliases(
  tokens: DesignTokens,
  semanticAliases: Record<string, string>
): DesignTokens {
  const resolved = JSON.parse(JSON.stringify(tokens)) as Record<string, unknown>;
  const source = tokens as unknown as Record<string, unknown>;

  for (const [targetPath, sourcePath] of Object.entries(semanticAliases)) {
    const sourceValue = getByPath(source, sourcePath);
    if (sourceValue !== undefined) {
      setByPath(resolved, targetPath, sourceValue);
    }
  }

  return resolved as unknown as DesignTokens;
}

export function resolveStylePackName(value?: string): StylePackName {
  if (value && value in stylePacks) {
    return value as StylePackName;
  }
  return "Studio";
}

export function resolveTokens(config?: ZephyrConfig): DesignTokens {
  const stylePack = resolveStylePackName(config?.stylePack);
  const baseTokens = stylePacks[stylePack];
  const merged = deepMerge(baseTokens, config?.tokens);
  const semanticAliases = config?.semanticAliases ?? {};
  return applySemanticAliases(merged, semanticAliases);
}

export function resolveConfig(config: ZephyrConfig = {}): ResolvedZephyrConfig {
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
