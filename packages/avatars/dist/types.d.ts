export type AvatarStyle = "initials" | "beam" | "ring" | "blob" | "pixel" | "sunset" | "soft" | "capsule" | "mono" | "orbit";
export interface AvatarStyleDefinition {
    id: AvatarStyle;
    label: string;
    description: string;
    tags: string[];
}
export interface AvatarOptions {
    name: string;
    seed?: string;
    size?: number;
    background?: string;
    textColor?: string;
    style?: AvatarStyle;
}
export interface AvatarPayload {
    svg: string;
    dataUri: string;
}
export interface AvatarClientOptions {
    apiBaseUrl?: string;
    apiKey?: string;
}
