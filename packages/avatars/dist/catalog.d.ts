import { AvatarStyle, AvatarStyleDefinition } from "./types";
export declare function listAvatarStyles(): AvatarStyleDefinition[];
export declare function getAvatarStyle(style: AvatarStyle): AvatarStyleDefinition;
export declare function searchAvatarStyles(query: string, limit?: number): AvatarStyleDefinition[];
