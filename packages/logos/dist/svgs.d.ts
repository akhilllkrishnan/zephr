export interface BrandSvgDef {
    viewBox: string;
    bg: string;
    paths: Array<{
        d: string;
        fill: string;
        fillRule?: "evenodd" | "nonzero";
    }>;
}
export declare const BRAND_SVGS: Record<string, BrandSvgDef>;
export declare function getBrandSvg(domain: string): BrandSvgDef | null;
