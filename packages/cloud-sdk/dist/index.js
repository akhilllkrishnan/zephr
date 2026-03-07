"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZephrCloudClient = exports.ZephrCloudError = void 0;
__exportStar(require("./types"), exports);
const DEFAULT_TIMEOUT_MS = 10_000;
class ZephrCloudError extends Error {
    status;
    body;
    constructor(status, body) {
        super(`Zephr cloud error ${status}: ${body}`);
        this.name = "ZephrCloudError";
        this.status = status;
        this.body = body;
    }
}
exports.ZephrCloudError = ZephrCloudError;
class ZephrCloudClient {
    baseUrl;
    apiKey;
    timeoutMs;
    constructor(options) {
        let parsed;
        try {
            parsed = new URL(options.baseUrl);
        }
        catch {
            throw new Error(`Invalid Zephr cloud baseUrl: "${options.baseUrl}"`);
        }
        if (!["http:", "https:"].includes(parsed.protocol)) {
            throw new Error(`Invalid Zephr cloud baseUrl protocol: "${parsed.protocol}"`);
        }
        this.baseUrl = options.baseUrl.replace(/\/$/, "");
        this.apiKey = options.apiKey;
        this.timeoutMs = Number.isFinite(options.timeoutMs) && (options.timeoutMs ?? 0) > 0
            ? Math.floor(options.timeoutMs)
            : DEFAULT_TIMEOUT_MS;
    }
    async request(path, init) {
        const headers = new Headers(init?.headers ?? {});
        headers.set("Content-Type", "application/json");
        if (this.apiKey) {
            headers.set("Authorization", `Bearer ${this.apiKey}`);
        }
        const controller = new AbortController();
        const timeoutHandle = setTimeout(() => controller.abort(), this.timeoutMs);
        let response;
        try {
            response = await fetch(`${this.baseUrl}${path}`, {
                ...init,
                headers,
                signal: init?.signal ?? controller.signal
            });
        }
        catch (error) {
            if (error.name === "AbortError") {
                throw new Error(`Zephr cloud request timed out after ${this.timeoutMs}ms`);
            }
            throw new Error(`Zephr cloud request failed: ${error instanceof Error ? error.message : String(error)}`);
        }
        finally {
            clearTimeout(timeoutHandle);
        }
        if (!response.ok) {
            const body = await response.text();
            throw new ZephrCloudError(response.status, body);
        }
        try {
            return (await response.json());
        }
        catch {
            throw new Error("Zephr cloud returned invalid JSON.");
        }
    }
    buildQuery(params) {
        const query = new URLSearchParams();
        for (const [key, value] of Object.entries(params)) {
            if (value === undefined || value === "") {
                continue;
            }
            query.set(key, String(value));
        }
        const serialized = query.toString();
        return serialized ? `?${serialized}` : "";
    }
    getComponents() {
        return this.request("/v1/components");
    }
    getThemes() {
        return this.request("/v1/themes");
    }
    getLicensePlans() {
        return this.request("/v1/licenses/plans")
            .then((response) => response.plans);
    }
    searchIcons(params = {}) {
        return this.request(`/v1/icons${this.buildQuery({
            q: params.query,
            limit: params.limit,
            style: params.style
        })}`);
    }
    listAvatarStyles(params = {}) {
        return this.request(`/v1/avatars/styles${this.buildQuery({
            q: params.query,
            limit: params.limit
        })}`);
    }
    searchLogos(params = {}) {
        return this.request(`/v1/logos${this.buildQuery({
            q: params.query,
            limit: params.limit
        })}`);
    }
    getLogo(domain) {
        return this.request(`/v1/logos/${encodeURIComponent(domain)}`);
    }
    createAvatar(payload) {
        return this.request("/v1/avatars", {
            method: "POST",
            body: JSON.stringify(payload)
        });
    }
    createSnippet(payload) {
        return this.request("/v1/snippets", {
            method: "POST",
            body: JSON.stringify(payload)
        });
    }
    requestTakedown(payload) {
        return this.request("/v1/compliance/takedown", {
            method: "POST",
            body: JSON.stringify(payload)
        });
    }
    validateLicense(payload) {
        return this.request("/v1/licenses/validate", {
            method: "POST",
            body: JSON.stringify(payload)
        });
    }
    activateLicense(payload) {
        return this.request("/v1/licenses/activate", {
            method: "POST",
            body: JSON.stringify(payload)
        });
    }
    deactivateLicense(payload) {
        return this.request("/v1/licenses/deactivate", {
            method: "POST",
            body: JSON.stringify(payload)
        });
    }
    runUrlAudit(payload) {
        return this.request("/v1/audit/url", {
            method: "POST",
            body: JSON.stringify(payload)
        });
    }
}
exports.ZephrCloudClient = ZephrCloudClient;
//# sourceMappingURL=index.js.map