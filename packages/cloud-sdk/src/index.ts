import {
  AvatarRequest,
  AvatarResponse,
  CloudAvatarStyle,
  CloudClientOptions,
  CloudComponent,
  CloudIcon,
  CloudLogoCatalogEntry,
  CloudSearchResponse,
  LicenseValidationRequest,
  LicenseValidationResponse,
  LogoResponse,
  SnippetRequest,
  SnippetResponse,
  TakedownRequest
} from "./types";

export * from "./types";

export class ZephyrCloudClient {
  private readonly baseUrl: string;
  private readonly apiKey?: string;

  constructor(options: CloudClientOptions) {
    this.baseUrl = options.baseUrl.replace(/\/$/, "");
    this.apiKey = options.apiKey;
  }

  private async request<T>(path: string, init?: RequestInit): Promise<T> {
    const headers = new Headers(init?.headers ?? {});
    headers.set("Content-Type", "application/json");

    if (this.apiKey) {
      headers.set("Authorization", `Bearer ${this.apiKey}`);
    }

    const response = await fetch(`${this.baseUrl}${path}`, {
      ...init,
      headers
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Zephyr cloud error ${response.status}: ${body}`);
    }

    return (await response.json()) as T;
  }

  private buildQuery(params: Record<string, string | number | undefined>): string {
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

  getComponents(): Promise<CloudComponent[]> {
    return this.request<CloudComponent[]>("/v1/components");
  }

  getThemes(): Promise<string[]> {
    return this.request<string[]>("/v1/themes");
  }

  searchIcons(params: {
    query?: string;
    limit?: number;
    style?: "filled" | "outlined" | "rounded" | "sharp";
  } = {}): Promise<CloudSearchResponse<CloudIcon>> {
    return this.request<CloudSearchResponse<CloudIcon>>(
      `/v1/icons${this.buildQuery({
        q: params.query,
        limit: params.limit,
        style: params.style
      })}`
    );
  }

  listAvatarStyles(params: {
    query?: string;
    limit?: number;
  } = {}): Promise<CloudSearchResponse<CloudAvatarStyle>> {
    return this.request<CloudSearchResponse<CloudAvatarStyle>>(
      `/v1/avatars/styles${this.buildQuery({
        q: params.query,
        limit: params.limit
      })}`
    );
  }

  searchLogos(params: {
    query?: string;
    limit?: number;
  } = {}): Promise<CloudSearchResponse<CloudLogoCatalogEntry>> {
    return this.request<CloudSearchResponse<CloudLogoCatalogEntry>>(
      `/v1/logos${this.buildQuery({
        q: params.query,
        limit: params.limit
      })}`
    );
  }

  getLogo(domain: string): Promise<LogoResponse> {
    return this.request<LogoResponse>(`/v1/logos/${encodeURIComponent(domain)}`);
  }

  createAvatar(payload: AvatarRequest): Promise<AvatarResponse> {
    return this.request<AvatarResponse>("/v1/avatars", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  }

  createSnippet(payload: SnippetRequest): Promise<SnippetResponse> {
    return this.request<SnippetResponse>("/v1/snippets", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  }

  requestTakedown(payload: TakedownRequest): Promise<{ status: string; domain: string }> {
    return this.request<{ status: string; domain: string }>("/v1/compliance/takedown", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  }

  validateLicense(payload: LicenseValidationRequest): Promise<LicenseValidationResponse> {
    return this.request<LicenseValidationResponse>("/v1/licenses/validate", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  }
}
