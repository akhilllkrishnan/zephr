import { HTMLAttributes } from "react";
export type MaterialIconName = string;
export type MaterialIconStyle = "filled" | "outlined" | "rounded" | "sharp";
export interface MaterialIconDefinition {
    name: MaterialIconName;
    title: string;
    category: string;
    keywords: string[];
}
export interface SearchMaterialIconsOptions {
    limit?: number;
    style?: MaterialIconStyle;
}
export declare const MATERIAL_ICON_STYLES: MaterialIconStyle[];
export declare function normalizeMaterialIconName(value: string): string;
export declare function listMaterialIcons(): MaterialIconDefinition[];
export declare function searchMaterialIcons(query: string, options?: SearchMaterialIconsOptions): MaterialIconDefinition[];
export declare function getMaterialIcon(name: string): MaterialIconDefinition | null;
export interface MaterialIconProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
    name: MaterialIconName;
    size?: number;
    styleVariant?: MaterialIconStyle;
    filled?: boolean;
    weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
    grade?: -25 | 0 | 200;
    opticalSize?: 20 | 24 | 40 | 48;
}
export declare function MaterialIcon({ name, size, styleVariant, filled, weight, grade, opticalSize, style, ...props }: MaterialIconProps): import("react/jsx-runtime").JSX.Element;
