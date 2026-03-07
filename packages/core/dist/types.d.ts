export type StylePackName = "notion" | "stripe" | "linear" | "framer";
export type LegacyStylePackName = "Studio" | "Editorial" | "NeoBrutal" | "SoftTech" | "Enterprise" | "Clarity";
export type TokenDictionary = Record<string, string>;
export interface TypographyTokens {
    family: TokenDictionary;
    size: TokenDictionary;
    weight: TokenDictionary;
    lineHeight: TokenDictionary;
    letterSpacing: TokenDictionary;
}
export interface MotionTokens {
    duration: TokenDictionary;
    easing: TokenDictionary;
}
export interface DesignTokens {
    color: TokenDictionary;
    colorDark?: TokenDictionary;
    type: TypographyTokens;
    space: TokenDictionary;
    radius: TokenDictionary;
    shadow: TokenDictionary;
    motion: MotionTokens;
    breakpoints: TokenDictionary;
}
export type PartialDeep<T> = {
    [K in keyof T]?: T[K] extends Record<string, unknown> ? PartialDeep<T[K]> : T[K];
};
export interface ZephrCloudConfig {
    baseUrl?: string;
    apiKey?: string;
}
export interface ZephrConfig {
    stylePack?: StylePackName;
    tokens?: PartialDeep<DesignTokens>;
    semanticAliases?: Record<string, string>;
    prefix?: string;
    plugins?: string[];
    cloud?: ZephrCloudConfig;
}
export interface ResolvedZephrConfig {
    stylePack: StylePackName;
    tokens: DesignTokens;
    semanticAliases: Record<string, string>;
    prefix: string;
    plugins: string[];
    cloud: ZephrCloudConfig;
}
