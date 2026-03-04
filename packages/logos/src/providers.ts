import { createCatalogLogoDataUri } from "./fallback";
import { getLogoByDomain } from "./catalog";
import { LogoFetchResult, LogoProvider } from "./types";

export interface HttpLogoProviderOptions {
  id?: string;
  baseUrl?: string;
  attribution?: string;
}

export class HttpLogoProvider implements LogoProvider {
  public readonly id: string;
  private readonly baseUrl: string;
  private readonly attribution: string;

  constructor(options: HttpLogoProviderOptions = {}) {
    this.id = options.id ?? "http-provider";
    this.baseUrl = options.baseUrl ?? "https://assets.zephyr.design/logos";
    this.attribution = options.attribution ?? "Zephyr hosted logo asset";
  }

  async getLogo(domain: string): Promise<LogoFetchResult | null> {
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

  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(this.baseUrl, { method: "HEAD" });
      return response.ok;
    } catch {
      return false;
    }
  }
}

export class CatalogLogoProvider implements LogoProvider {
  public readonly id = "zephyr-catalog";

  async getLogo(domain: string): Promise<LogoFetchResult | null> {
    const found = getLogoByDomain(domain);
    if (!found) {
      return null;
    }

    return {
      url: createCatalogLogoDataUri(found),
      attribution: "Zephyr catalog mark"
    };
  }

  async healthCheck(): Promise<boolean> {
    return true;
  }
}
