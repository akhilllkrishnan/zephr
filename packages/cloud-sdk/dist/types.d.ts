export interface CloudClientOptions {
    baseUrl: string;
    apiKey?: string;
    timeoutMs?: number;
}
export interface CloudComponent {
    id: string;
    name: string;
    category: string;
    description: string;
    stylePackSupport: Array<"notion" | "stripe" | "linear" | "framer">;
}
export interface CloudSearchResponse<T> {
    query: string;
    limit: number;
    source: "cloud";
    items: T[];
}
export interface CloudIcon {
    name: string;
    title: string;
    category: string;
    keywords: string[];
}
export interface CloudAvatarStyle {
    id: string;
    label: string;
    description: string;
    tags: string[];
}
export interface CloudLogoCatalogEntry {
    id: string;
    name: string;
    domain: string;
    category: string;
    color: string;
    tags: string[];
}
export interface CloudBillingPlan {
    id: string;
    label: string;
    description: string;
    recommended?: boolean;
    checkoutUrl?: string;
    available: boolean;
}
export interface LogoResponse {
    domain: string;
    url: string;
    source: string;
    attribution: string;
    cacheExpiresAt: string;
    fromCache: boolean;
    fallback: boolean;
}
export interface AvatarRequest {
    name: string;
    seed?: string;
    size?: number;
}
export interface AvatarResponse {
    svg: string;
    dataUri: string;
}
export interface SnippetRequest {
    componentId: string;
    variant?: string;
    prompt?: string;
}
export interface SnippetResponse {
    componentId: string;
    code: string;
}
export interface TakedownRequest {
    domain: string;
    reason: string;
}
export interface LicenseValidationRequest {
    licenseKey: string;
}
export interface LicenseValidationResponse {
    valid: boolean;
    tier: "free" | "pro";
    plan: "individual" | "startup" | "enterprise" | "pro" | "team" | null;
    status: "active" | "invalid" | "revoked" | "expired" | "disabled" | "inactive";
    message: string;
    expiresAt?: string;
    source?: "lemonsqueezy" | "local";
    activationsLeft?: number;
    entitlements?: string[];
}
export interface LicenseActivateRequest {
    licenseKey: string;
    instanceName: string;
}
export interface LicenseActivateResponse {
    activated: boolean;
    error?: string;
    plan?: "individual" | "startup" | "enterprise" | "pro" | "team" | null;
    tier?: "free" | "pro";
    entitlements?: string[];
    activeInstances?: number;
}
export interface LicenseDeactivateRequest {
    licenseKey: string;
    instanceId: string;
}
export interface LicenseDeactivateResponse {
    deactivated: boolean;
    error?: string;
    plan?: "individual" | "startup" | "enterprise" | "pro" | "team" | null;
    tier?: "free" | "pro";
    entitlements?: string[];
    activeInstances?: number;
}
export type UrlAuditSeverity = "high" | "medium" | "low";
export interface UrlAuditIssue {
    id: string;
    severity: UrlAuditSeverity;
    category: "accessibility" | "hierarchy" | "conversion" | "trust" | "usability";
    title: string;
    summary: string;
    evidence: string;
    recommendation: string;
}
export interface UrlAuditHeatmapArea {
    id: string;
    label: string;
    attention: number;
    rationale: string;
}
export interface UrlAuditRequest {
    url: string;
    screenshotUrl?: string;
    notes?: string;
}
export interface UrlAuditReport {
    url: string;
    scannedAt: string;
    source: "cloud" | "local";
    score: number;
    status: "pass" | "warn" | "fail";
    pageTitle: string | null;
    summary: string;
    issues: UrlAuditIssue[];
    recommendations: string[];
    heatmap: UrlAuditHeatmapArea[];
}
