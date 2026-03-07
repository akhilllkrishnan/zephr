import { DesignTokens, LegacyStylePackName, ResolvedZephrConfig, StylePackName, ZephrConfig } from "./types";
export declare const LEGACY_STYLE_PACK_MAP: Record<LegacyStylePackName, StylePackName>;
export declare function resolveStylePackName(value?: string): StylePackName;
export declare function resolveTokens(config?: ZephrConfig): DesignTokens;
export declare function resolveConfig(config?: ZephrConfig): ResolvedZephrConfig;
