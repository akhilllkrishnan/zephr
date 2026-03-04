export interface LogoFetchResult {
  url: string;
  attribution?: string;
}

export interface LogoProvider {
  id: string;
  getLogo(domain: string): Promise<LogoFetchResult | null>;
  healthCheck?: () => Promise<boolean>;
}

export interface LogoResult {
  domain: string;
  url: string;
  source: string;
  attribution: string;
  cacheExpiresAt: string;
  fromCache: boolean;
  fallback: boolean;
}

export interface LogoCatalogEntry {
  id: string;
  name: string;
  domain: string;
  category: string;
  color: string;
  tags: string[];
}

export interface LogoClientOptions {
  providers?: LogoProvider[];
  cacheTtlMs?: number;
  denylist?: string[];
  fallbackAttribution?: string;
}

export interface TakedownRecord {
  domain: string;
  reason: string;
  requestedAt: string;
}
