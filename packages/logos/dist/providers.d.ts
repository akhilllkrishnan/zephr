import { LogoFetchResult, LogoProvider } from "./types";
export interface HttpLogoProviderOptions {
    id?: string;
    baseUrl?: string;
    attribution?: string;
}
export declare class HttpLogoProvider implements LogoProvider {
    readonly id: string;
    private readonly baseUrl;
    private readonly attribution;
    constructor(options?: HttpLogoProviderOptions);
    getLogo(domain: string): Promise<LogoFetchResult | null>;
    healthCheck(): Promise<boolean>;
}
export declare class CatalogLogoProvider implements LogoProvider {
    readonly id = "zephr-catalog";
    getLogo(domain: string): Promise<LogoFetchResult | null>;
    healthCheck(): Promise<boolean>;
}
