import { createFallbackLogoDataUri } from "./fallback";
import { CatalogLogoProvider } from "./providers";
import {
  LogoClientOptions,
  LogoProvider,
  LogoResult,
  TakedownRecord
} from "./types";

interface CacheEntry {
  value: LogoResult;
  expiresAtMs: number;
}

export class LogoClient {
  private readonly providers: LogoProvider[];
  private readonly cache = new Map<string, CacheEntry>();
  private readonly denylist = new Set<string>();
  private readonly takedowns: TakedownRecord[] = [];
  private readonly cacheTtlMs: number;
  private readonly fallbackAttribution: string;

  constructor(options: LogoClientOptions = {}) {
    this.providers = options.providers ?? [new CatalogLogoProvider()];
    this.cacheTtlMs = options.cacheTtlMs ?? 1000 * 60 * 60 * 24;
    this.fallbackAttribution =
      options.fallbackAttribution ?? "Zephr generated fallback logo";

    for (const item of options.denylist ?? []) {
      this.denylist.add(this.normalizeDomain(item));
    }
  }

  normalizeDomain(domain: string): string {
    return domain.replace(/^https?:\/\//, "").split("/")[0].toLowerCase();
  }

  isDenied(domain: string): boolean {
    return this.denylist.has(this.normalizeDomain(domain));
  }

  async resolve(domain: string): Promise<LogoResult> {
    const normalized = this.normalizeDomain(domain);

    if (this.isDenied(normalized)) {
      throw new Error(`Domain ${normalized} is blocked by compliance policy`);
    }

    const cached = this.cache.get(normalized);
    const now = Date.now();
    if (cached && cached.expiresAtMs > now) {
      return { ...cached.value, fromCache: true };
    }

    for (const provider of this.providers) {
      const resolved = await provider.getLogo(normalized);
      if (resolved?.url) {
        const expiresAtMs = now + this.cacheTtlMs;
        const payload: LogoResult = {
          domain: normalized,
          url: resolved.url,
          source: provider.id,
          attribution: resolved.attribution ?? "Unknown attribution",
          cacheExpiresAt: new Date(expiresAtMs).toISOString(),
          fromCache: false,
          fallback: false
        };

        this.cache.set(normalized, { value: payload, expiresAtMs });
        return payload;
      }
    }

    const expiresAtMs = now + this.cacheTtlMs;
    const fallback: LogoResult = {
      domain: normalized,
      url: createFallbackLogoDataUri(normalized),
      source: "zephr-fallback",
      attribution: this.fallbackAttribution,
      cacheExpiresAt: new Date(expiresAtMs).toISOString(),
      fromCache: false,
      fallback: true
    };

    this.cache.set(normalized, { value: fallback, expiresAtMs });
    return fallback;
  }

  requestTakedown(domain: string, reason: string): TakedownRecord {
    const normalized = this.normalizeDomain(domain);
    this.denylist.add(normalized);
    this.cache.delete(normalized);

    const record: TakedownRecord = {
      domain: normalized,
      reason,
      requestedAt: new Date().toISOString()
    };
    this.takedowns.push(record);
    return record;
  }

  listTakedowns(): TakedownRecord[] {
    return [...this.takedowns];
  }

  async providerHealth(): Promise<Array<{ provider: string; healthy: boolean }>> {
    return Promise.all(
      this.providers.map(async (provider) => ({
        provider: provider.id,
        healthy: provider.healthCheck ? await provider.healthCheck() : true
      }))
    );
  }
}
