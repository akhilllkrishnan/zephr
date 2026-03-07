import type { IncomingMessage, ServerResponse } from "node:http";
import { URL } from "node:url";
import { handleAppRequest } from "./app";
import { HttpError, readRawBody, sendJson } from "./http";

interface NodeAdapterOptions {
  stripPrefix?: string;
  baseUrl?: string;
}

function stripUrlPrefix(rawUrl: string, prefix: string | undefined): string {
  if (!prefix || prefix === "/" || !rawUrl.startsWith(prefix)) {
    return rawUrl;
  }

  const next = rawUrl.slice(prefix.length);
  if (!next) {
    return "/";
  }

  return next.startsWith("/") ? next : `/${next}`;
}

export async function handleNodeHttpRequest(
  request: IncomingMessage,
  response: ServerResponse,
  options: NodeAdapterOptions = {}
): Promise<void> {
  try {
    const requestUrl = stripUrlPrefix(request.url ?? "/", options.stripPrefix);
    const url = new URL(
      requestUrl,
      options.baseUrl ?? `http://${request.headers.host ?? "localhost"}`
    );
    const bodyText = request.method === "GET" || request.method === "HEAD"
      ? ""
      : await readRawBody(request);

    const result = await handleAppRequest({
      method: request.method ?? "GET",
      url,
      headers: request.headers,
      bodyText,
      ip: request.socket.remoteAddress
    });

    sendJson(response, result.statusCode, result.payload, result.headers);
  } catch (error) {
    if (error instanceof HttpError) {
      sendJson(
        response,
        error.statusCode,
        {
          error: error.message,
          code: error.code,
          details: error.details
        }
      );
      return;
    }

    console.error("[cloud-api] unhandled adapter error", error);
    sendJson(response, 500, { error: "Internal server error." });
  }
}
