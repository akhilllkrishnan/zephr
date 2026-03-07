"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogLogoProvider = exports.HttpLogoProvider = void 0;
const fallback_1 = require("./fallback");
const catalog_1 = require("./catalog");
class HttpLogoProvider {
    id;
    baseUrl;
    attribution;
    constructor(options = {}) {
        this.id = options.id ?? "http-provider";
        this.baseUrl = options.baseUrl ?? "https://assets.zephr.local/logos";
        this.attribution = options.attribution ?? "Zephr hosted logo asset";
    }
    async getLogo(domain) {
        if (!domain) {
            return null;
        }
        const normalized = domain.replace(/^https?:\/\//, "").split("/")[0];
        if (!normalized.includes(".")) {
            return null;
        }
        return {
            url: `${this.baseUrl}/${normalized}.svg`,
            attribution: this.attribution
        };
    }
    async healthCheck() {
        try {
            const response = await fetch(this.baseUrl, { method: "HEAD" });
            return response.ok;
        }
        catch {
            return false;
        }
    }
}
exports.HttpLogoProvider = HttpLogoProvider;
class CatalogLogoProvider {
    id = "zephr-catalog";
    async getLogo(domain) {
        const found = (0, catalog_1.getLogoByDomain)(domain);
        if (!found) {
            return null;
        }
        return {
            url: (0, fallback_1.createCatalogLogoDataUri)(found),
            attribution: "Zephr catalog mark"
        };
    }
    async healthCheck() {
        return true;
    }
}
exports.CatalogLogoProvider = CatalogLogoProvider;
//# sourceMappingURL=providers.js.map