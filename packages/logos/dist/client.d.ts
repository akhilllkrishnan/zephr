import { LogoClientOptions, LogoResult, TakedownRecord } from "./types";
export declare class LogoClient {
    private readonly providers;
    private readonly cache;
    private readonly denylist;
    private readonly takedowns;
    private readonly cacheTtlMs;
    private readonly fallbackAttribution;
    constructor(options?: LogoClientOptions);
    normalizeDomain(domain: string): string;
    isDenied(domain: string): boolean;
    resolve(domain: string): Promise<LogoResult>;
    requestTakedown(domain: string, reason: string): TakedownRecord;
    listTakedowns(): TakedownRecord[];
    providerHealth(): Promise<Array<{
        provider: string;
        healthy: boolean;
    }>>;
}
