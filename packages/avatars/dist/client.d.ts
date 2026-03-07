import { AvatarClientOptions, AvatarOptions, AvatarPayload } from "./types";
export declare class AvatarClient {
    private readonly apiBaseUrl?;
    private readonly apiKey?;
    constructor(options?: AvatarClientOptions);
    createAvatar(options: AvatarOptions): Promise<AvatarPayload>;
}
