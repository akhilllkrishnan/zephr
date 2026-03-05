/**
 * Lemon Squeezy integration
 * ─────────────────────────
 * Covers:
 *   1. Webhook signature verification (HMAC-SHA256)
 *   2. License key validation via LS REST API
 *   3. License key activation via LS REST API
 *   4. Typed event payloads for order_created / license_key_created
 */

import { createHmac, timingSafeEqual } from "node:crypto";

// ─── Config ──────────────────────────────────────────────────────────────────

/** Your LS store API key — set in env as LEMON_SQUEEZY_API_KEY */
function getApiKey(): string {
    const key = process.env.LEMON_SQUEEZY_API_KEY?.trim() ?? "";
    if (!key) {
        throw new Error(
            "LEMON_SQUEEZY_API_KEY is not set. Add it to your .env file."
        );
    }
    return key;
}

/** Secret used to verify webhook signatures — set in env as LEMON_SQUEEZY_WEBHOOK_SECRET */
export function getWebhookSecret(): string {
    return process.env.LEMON_SQUEEZY_WEBHOOK_SECRET?.trim() ?? "";
}

const LS_API_BASE = "https://api.lemonsqueezy.com/v1";

// ─── Webhook signature ────────────────────────────────────────────────────────

/**
 * Verify the X-Signature header sent by Lemon Squeezy.
 * Uses timing-safe comparison to prevent timing attacks.
 */
export function verifyWebhookSignature(
    rawBody: string,
    signature: string
): boolean {
    const secret = getWebhookSecret();
    if (!secret || !signature) return false;

    try {
        const expected = createHmac("sha256", secret)
            .update(rawBody, "utf8")
            .digest("hex");
        const sigBuf = Buffer.from(signature, "hex");
        const expBuf = Buffer.from(expected, "hex");
        if (sigBuf.length !== expBuf.length) return false;
        return timingSafeEqual(sigBuf, expBuf);
    } catch {
        return false;
    }
}

// ─── Webhook event types ──────────────────────────────────────────────────────

export interface LsOrderAttributes {
    identifier: string;       // order identifier
    order_number: number;
    user_email: string;
    user_name: string;
    status: string;           // "paid" | "refunded" etc.
    total: number;
    subtotal: number;
    currency: string;
    first_order_item: {
        product_id: number;
        product_name: string;
        variant_id: number;
        variant_name: string;
    };
}

export interface LsLicenseKeyAttributes {
    key: string;
    status: string;           // "active" | "inactive" | "disabled" | "expired"
    activation_limit: number;
    activations_count: number;
    expires_at: string | null;
    order_id: number;
    product_id: number;
    store_id: number;
    user_email?: string;
}

export interface LsWebhookEvent<T = unknown> {
    meta: {
        event_name: string;     // "order_created" | "license_key_created" etc.
        custom_data?: Record<string, unknown>;
        webhook_id?: string;
    };
    data: {
        id: string;
        type: string;
        attributes: T;
        relationships?: unknown;
    };
}

// ─── License validation ───────────────────────────────────────────────────────

export interface LsValidateResponse {
    valid: boolean;
    error?: string;
    license_key?: {
        id: number;
        status: string;
        key: string;
        activation_limit: number;
        activation_usage: number;
        created_at: string;
        expires_at: string | null;
    };
    instance?: {
        id: string;
        name: string;
        created_at: string;
    } | null;
    meta?: {
        store_id: number;
        order_id: number;
        product_id: number;
        product_name: string;
        variant_id: number;
        variant_name: string;
    };
}

/**
 * Validate a license key against the Lemon Squeezy API.
 * Does NOT create an activation — just checks if the key is valid.
 */
export async function validateLsLicenseKey(
    licenseKey: string
): Promise<LsValidateResponse> {
    const apiKey = getApiKey();
    const response = await fetch(`${LS_API_BASE}/licenses/validate`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({ license_key: licenseKey }),
        signal: AbortSignal.timeout(10_000)
    });

    if (!response.ok && response.status !== 400) {
        throw new Error(
            `Lemon Squeezy API error: ${response.status} ${response.statusText}`
        );
    }

    return response.json() as Promise<LsValidateResponse>;
}

// ─── License activation ───────────────────────────────────────────────────────

export interface LsActivateResponse {
    activated: boolean;
    error?: string;
    license_key?: LsValidateResponse["license_key"];
    instance?: {
        id: string;
        name: string;
        created_at: string;
    };
    meta?: LsValidateResponse["meta"];
}

/**
 * Activate a license key for a named instance (e.g. the user's project name).
 * Each activation consumes one slot from activation_limit.
 */
export async function activateLsLicenseKey(
    licenseKey: string,
    instanceName: string
): Promise<LsActivateResponse> {
    const apiKey = getApiKey();
    const response = await fetch(`${LS_API_BASE}/licenses/activate`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            license_key: licenseKey,
            instance_name: instanceName
        }),
        signal: AbortSignal.timeout(10_000)
    });

    if (!response.ok && response.status !== 400) {
        throw new Error(
            `Lemon Squeezy API error: ${response.status} ${response.statusText}`
        );
    }

    return response.json() as Promise<LsActivateResponse>;
}

// ─── Deactivation ─────────────────────────────────────────────────────────────

export async function deactivateLsLicenseKey(
    licenseKey: string,
    instanceId: string
): Promise<{ deactivated: boolean; error?: string }> {
    const apiKey = getApiKey();
    const response = await fetch(`${LS_API_BASE}/licenses/deactivate`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            license_key: licenseKey,
            instance_id: instanceId
        }),
        signal: AbortSignal.timeout(10_000)
    });

    if (!response.ok && response.status !== 400) {
        throw new Error(
            `Lemon Squeezy API error: ${response.status} ${response.statusText}`
        );
    }

    return response.json() as Promise<{ deactivated: boolean; error?: string }>;
}
