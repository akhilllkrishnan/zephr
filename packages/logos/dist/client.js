"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoClient = void 0;
const fallback_1 = require("./fallback");
const providers_1 = require("./providers");
class LogoClient {
    providers;
    cache = new Map();
    denylist = new Set();
    takedowns = [];
    cacheTtlMs;
    fallbackAttribution;
    constructor(options = {}) {
        this.providers = options.providers ?? [new providers_1.CatalogLogoProvider()];
        this.cacheTtlMs = options.cacheTtlMs ?? 1000 * 60 * 60 * 24;
        this.fallbackAttribution =
            options.fallbackAttribution ?? "Zephr generated fallback logo";
        for (const item of options.denylist ?? []) {
            this.denylist.add(this.normalizeDomain(item));
        }
    }
    normalizeDomain(domain) {
        return domain.replace(/^https?:\/\//, "").split("/")[0].toLowerCase();
    }
    isDenied(domain) {
        return this.denylist.has(this.normalizeDomain(domain));
    }
    async resolve(domain) {
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
                const payload = {
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
        const fallback = {
            domain: normalized,
            url: (0, fallback_1.createFallbackLogoDataUri)(normalized),
            source: "zephr-fallback",
            attribution: this.fallbackAttribution,
            cacheExpiresAt: new Date(expiresAtMs).toISOString(),
            fromCache: false,
            fallback: true
        };
        this.cache.set(normalized, { value: fallback, expiresAtMs });
        return fallback;
    }
    requestTakedown(domain, reason) {
        const normalized = this.normalizeDomain(domain);
        this.denylist.add(normalized);
        this.cache.delete(normalized);
        const record = {
            domain: normalized,
            reason,
            requestedAt: new Date().toISOString()
        };
        this.takedowns.push(record);
        return record;
    }
    listTakedowns() {
        return [...this.takedowns];
    }
    async providerHealth() {
        return Promise.all(this.providers.map(async (provider) => ({
            provider: provider.id,
            healthy: provider.healthCheck ? await provider.healthCheck() : true
        })));
    }
}
exports.LogoClient = LogoClient;
//# sourceMappingURL=client.js.map