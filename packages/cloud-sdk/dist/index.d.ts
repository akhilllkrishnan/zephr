import { AvatarRequest, AvatarResponse, CloudAvatarStyle, CloudBillingPlan, CloudClientOptions, CloudComponent, CloudIcon, CloudLogoCatalogEntry, CloudSearchResponse, LicenseActivateRequest, LicenseActivateResponse, LicenseDeactivateRequest, LicenseDeactivateResponse, LicenseValidationRequest, LicenseValidationResponse, LogoResponse, UrlAuditReport, UrlAuditRequest, SnippetRequest, SnippetResponse, TakedownRequest } from "./types";
export * from "./types";
export declare class ZephrCloudError extends Error {
    readonly status: number;
    readonly body: string;
    constructor(status: number, body: string);
}
export declare class ZephrCloudClient {
    private readonly baseUrl;
    private readonly apiKey?;
    private readonly timeoutMs;
    constructor(options: CloudClientOptions);
    private request;
    private buildQuery;
    getComponents(): Promise<CloudComponent[]>;
    getThemes(): Promise<string[]>;
    getLicensePlans(): Promise<CloudBillingPlan[]>;
    searchIcons(params?: {
        query?: string;
        limit?: number;
        style?: "filled" | "outlined" | "rounded" | "sharp";
    }): Promise<CloudSearchResponse<CloudIcon>>;
    listAvatarStyles(params?: {
        query?: string;
        limit?: number;
    }): Promise<CloudSearchResponse<CloudAvatarStyle>>;
    searchLogos(params?: {
        query?: string;
        limit?: number;
    }): Promise<CloudSearchResponse<CloudLogoCatalogEntry>>;
    getLogo(domain: string): Promise<LogoResponse>;
    createAvatar(payload: AvatarRequest): Promise<AvatarResponse>;
    createSnippet(payload: SnippetRequest): Promise<SnippetResponse>;
    requestTakedown(payload: TakedownRequest): Promise<{
        status: string;
        domain: string;
    }>;
    validateLicense(payload: LicenseValidationRequest): Promise<LicenseValidationResponse>;
    activateLicense(payload: LicenseActivateRequest): Promise<LicenseActivateResponse>;
    deactivateLicense(payload: LicenseDeactivateRequest): Promise<LicenseDeactivateResponse>;
    runUrlAudit(payload: UrlAuditRequest): Promise<UrlAuditReport>;
}
