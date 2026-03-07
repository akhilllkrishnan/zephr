import type { IncomingMessage, ServerResponse } from "node:http";
import { URL } from "node:url";
import { ensureCloudEnvLoaded } from "../src/env";
import { handleAppRequest } from "../src/app";
import { readRawBody, sendJson } from "../src/http";

ensureCloudEnvLoaded();

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(
  request: IncomingMessage,
  response: ServerResponse
): Promise<void> {
  // OPTIONS preflight — respond before full app parsing
  if (request.method === "OPTIONS") {
    sendJson(response, 200, { ok: true });
    return;
  }

  // Vercel routes send /(.*) → /api/handler?__path=$1
  // Extract the original request path from the __path query parameter.
  const incoming = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);
  const pathParam = incoming.searchParams.get("__path");
  const rawPath = pathParam != null ? `/${pathParam}` : (incoming.pathname.replace(/^\/api\/handler|^\/api/, "") || "/");

  // Rebuild URL with original path + original query params (minus __path)
  incoming.searchParams.delete("__path");
  const search = incoming.searchParams.toString();
  const url = new URL(rawPath + (search ? `?${search}` : ""), `http://${request.headers.host ?? "localhost"}`);

  const bodyText =
    request.method === "GET" || request.method === "HEAD"
      ? ""
      : await readRawBody(request);

  // In Vercel serverless the real client IP comes from x-forwarded-for,
  // not request.socket.remoteAddress (which is the proxy IP).
  const ip =
    (request.headers["x-forwarded-for"] as string)?.split(",")[0].trim() ??
    request.socket?.remoteAddress;

  const result = await handleAppRequest({
    method: request.method ?? "GET",
    url,
    headers: request.headers,
    bodyText,
    ip
  });

  sendJson(response, result.statusCode, result.payload, result.headers);
}
