import { LogoCatalogEntry } from "./types";
export declare function listLogoCatalog(): LogoCatalogEntry[];
export declare function getLogoByDomain(domain: string): LogoCatalogEntry | null;
export declare function searchLogoCatalog(query: string, limit?: number): LogoCatalogEntry[];
