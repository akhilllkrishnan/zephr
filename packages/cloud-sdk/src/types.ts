export interface CloudClientOptions {
  baseUrl: string;
  apiKey?: string;
}

export interface CloudComponent {
  id: string;
  name: string;
  category: string;
  description: string;
  stylePackSupport: string[];
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
  plan: "pro" | "team" | null;
  status: "active" | "invalid" | "revoked" | "expired";
  message: string;
  expiresAt?: string;
}
