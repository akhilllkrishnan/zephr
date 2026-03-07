import {
  AvatarRequest,
  AvatarResponse,
  CloudAvatarStyle,
  CloudBillingPlan,
  CloudClientOptions,
  CloudComponent,
  CloudIcon,
  CloudLogoCatalogEntry,
  CloudSearchResponse,
  LicenseActivateRequest,
  LicenseActivateResponse,
  LicenseDeactivateRequest,
  LicenseDeactivateResponse,
  LicenseValidationRequest,
  LicenseValidationResponse,
  LogoResponse,
  UrlAuditReport,
  UrlAuditRequest,
  SnippetRequest,
  SnippetResponse,
  TakedownRequest
} from "./types";

export * from "./types";

const DEFAULT_TIMEOUT_MS = 10_000;

export class ZephrCloudError extends Error {
  readonly status: number;
  readonly body: string;

  constructor(status: number, body: string) {
    super(`Zephr cloud error ${status}: ${body}`);
    this.name = "ZephrCloudError";
    this.status = status;
    this.body = body;
  }
}

export class ZephrCloudClient {
  private readonly baseUrl: string;
  private readonly apiKey?: string;
  private readonly timeoutMs: number;

  constructor(options: CloudClientOptions) {
    let parsed: URL;
    try {
      parsed = new URL(options.baseUrl);
    } catch {
      throw new Error(`Invalid Zephr cloud baseUrl: "${options.baseUrl}"`);
    }
    if (!["http:", "https:"].includes(parsed.protocol)) {
      throw new Error(`Invalid Zephr cloud baseUrl protocol: "${parsed.protocol}"`);
    }

    this.baseUrl = options.baseUrl.replace(/\/$/, "");
    this.apiKey = options.apiKey;
    this.timeoutMs = Number.isFinite(options.timeoutMs) && (options.timeoutMs ?? 0) > 0
      ? Math.floor(options.timeoutMs as number)
      : DEFAULT_TIMEOUT_MS;
  }

  private async request<T>(path: string, init?: RequestInit): Promise<T> {
    const headers = new Headers(init?.headers ?? {});
    headers.set("Content-Type", "application/json");

    if (this.apiKey) {
      headers.set("Authorization", `Bearer ${this.apiKey}`);
    }

    const controller = new AbortController();
    const timeoutHandle = setTimeout(() => controller.abort(), this.timeoutMs);

    let response: Response;
    try {
      response = await fetch(`${this.baseUrl}${path}`, {
        ...init,
        headers,
        signal: init?.signal ?? controller.signal
      });
    } catch (error) {
      if ((error as { name?: string }).name === "AbortError") {
        throw new Error(`Zephr cloud request timed out after ${this.timeoutMs}ms`);
      }
      throw new Error(
        `Zephr cloud request failed: ${error instanceof Error ? error.message : String(error)}`
      );
    } finally {
      clearTimeout(timeoutHandle);
    }

    if (!response.ok) {
      const body = await response.text();
      throw new ZephrCloudError(response.status, body);
    }

    try {
      return (await response.json()) as T;
    } catch {
      throw new Error("Zephr cloud returned invalid JSON.");
    }
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

  getLicensePlans(): Promise<CloudBillingPlan[]> {
    return this.request<{ plans: CloudBillingPlan[] }>("/v1/licenses/plans")
      .then((response) => response.plans);
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

  activateLicense(payload: LicenseActivateRequest): Promise<LicenseActivateResponse> {
    return this.request<LicenseActivateResponse>("/v1/licenses/activate", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  }

  deactivateLicense(payload: LicenseDeactivateRequest): Promise<LicenseDeactivateResponse> {
    return this.request<LicenseDeactivateResponse>("/v1/licenses/deactivate", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  }

  runUrlAudit(payload: UrlAuditRequest): Promise<UrlAuditReport> {
    return this.request<UrlAuditReport>("/v1/audit/url", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  }
}
