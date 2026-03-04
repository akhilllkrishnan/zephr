import { generateAvatar } from "./generator";
import { AvatarClientOptions, AvatarOptions, AvatarPayload } from "./types";

export class AvatarClient {
  private readonly apiBaseUrl?: string;
  private readonly apiKey?: string;

  constructor(options: AvatarClientOptions = {}) {
    this.apiBaseUrl = options.apiBaseUrl;
    this.apiKey = options.apiKey;
  }

  async createAvatar(options: AvatarOptions): Promise<AvatarPayload> {
    if (!this.apiBaseUrl || !this.apiKey) {
      return generateAvatar(options);
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
        return generateAvatar(options);
      }

      const payload = (await response.json()) as AvatarPayload;
      if (!payload.svg || !payload.dataUri) {
        return generateAvatar(options);
      }

      return payload;
    } catch {
      return generateAvatar(options);
    }
  }
}
