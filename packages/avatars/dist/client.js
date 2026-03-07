"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarClient = void 0;
const generator_1 = require("./generator");
class AvatarClient {
    apiBaseUrl;
    apiKey;
    constructor(options = {}) {
        this.apiBaseUrl = options.apiBaseUrl;
        this.apiKey = options.apiKey;
    }
    async createAvatar(options) {
        if (!this.apiBaseUrl || !this.apiKey) {
            return (0, generator_1.generateAvatar)(options);
        }
        try {
            const response = await fetch(`${this.apiBaseUrl.replace(/\/$/, "")}/v1/avatars`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.apiKey}`
                },
                body: JSON.stringify(options)
            });
            if (!response.ok) {
                return (0, generator_1.generateAvatar)(options);
            }
            const payload = (await response.json());
            if (!payload.svg || !payload.dataUri) {
                return (0, generator_1.generateAvatar)(options);
            }
            return payload;
        }
        catch {
            return (0, generator_1.generateAvatar)(options);
        }
    }
}
exports.AvatarClient = AvatarClient;
//# sourceMappingURL=client.js.map