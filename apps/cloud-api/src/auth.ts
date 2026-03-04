import { IncomingMessage } from "node:http";

export interface ApiPrincipal {
  key: string;
  scopes: string[];
}

function parseApiKeysFromEnv(): Map<string, ApiPrincipal> {
  const keys = new Map<string, ApiPrincipal>();

  keys.set("dev_local_key", {
    key: "dev_local_key",
    scopes: ["components:read", "assets:read", "assets:write", "compliance:write"]
  });

  const envValue = process.env.ZEPHYR_API_KEYS;
  if (!envValue) {
    return keys;
  }

  for (const value of envValue.split(",").map((item) => item.trim()).filter(Boolean)) {
    keys.set(value, {
      key: value,
      scopes: ["components:read", "assets:read", "assets:write", "compliance:write"]
    });
  }

  return keys;
}

const apiKeys = parseApiKeysFromEnv();

export function requirePrincipal(request: IncomingMessage): ApiPrincipal | null {
  const header = request.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return null;
  }

  const key = header.slice("Bearer ".length).trim();
  return apiKeys.get(key) ?? null;
}

/** Returns true if the principal holds the requested scope. */
export function hasScope(principal: ApiPrincipal, scope: string): boolean {
  return principal.scopes.includes(scope);
}
