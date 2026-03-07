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

  // Strip /api prefix injected by Vercel routing rewrites
  const rawPath = (request.url ?? "/").replace(/^\/api/, "") || "/";
  const url = new URL(rawPath, `http://${request.headers.host ?? "localhost"}`);

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
