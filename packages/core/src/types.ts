export type StylePackName =
  | "notion"
  | "stripe"
  | "linear"
  | "framer";

export type LegacyStylePackName =
  | "Studio"
  | "Editorial"
  | "NeoBrutal"
  | "SoftTech"
  | "Enterprise"
  | "Clarity";

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
  [K in keyof T]?: T[K] extends Record<string, unknown>
    ? PartialDeep<T[K]>
    : T[K];
};

export interface ZephyrCloudConfig {
  baseUrl?: string;
  apiKey?: string;
}

export interface ZephyrConfig {
  stylePack?: StylePackName;
  tokens?: PartialDeep<DesignTokens>;
  semanticAliases?: Record<string, string>;
  prefix?: string;
  plugins?: string[];
  cloud?: ZephyrCloudConfig;
}

export interface ResolvedZephyrConfig {
  stylePack: StylePackName;
  tokens: DesignTokens;
  semanticAliases: Record<string, string>;
  prefix: string;
  plugins: string[];
  cloud: ZephyrCloudConfig;
}
