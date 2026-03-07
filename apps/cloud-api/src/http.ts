import { IncomingMessage, ServerResponse } from "node:http";

const DEFAULT_MAX_BODY_BYTES = 1_048_576; // 1 MB

export class HttpError extends Error {
  readonly statusCode: number;
  readonly code: string;
  readonly details?: unknown;

  constructor(statusCode: number, message: string, code: string, details?: unknown) {
    super(message);
    this.name = "HttpError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

interface ReadJsonBodyOptions {
  maxBytes?: number;
  requireObject?: boolean;
  requireContentType?: boolean;
}

export type HeaderValue = string | string[] | undefined;
export type HeadersLike = Record<string, HeaderValue>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export function getHeader(headers: HeadersLike | undefined, name: string): string {
  if (!headers) {
    return "";
  }

  const direct = headers[name];
  if (Array.isArray(direct)) {
    return direct.join(", ");
  }
  if (typeof direct === "string") {
    return direct;
  }

  const fallback = headers[name.toLowerCase()];
  if (Array.isArray(fallback)) {
    return fallback.join(", ");
  }
  return typeof fallback === "string" ? fallback : "";
}

export async function readRawBody(
  request: AsyncIterable<Uint8Array | string>,
  options: Pick<ReadJsonBodyOptions, "maxBytes"> = {}
): Promise<string> {
  const maxBytes = options.maxBytes ?? DEFAULT_MAX_BODY_BYTES;
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  for await (const chunk of request) {
    const buffer = typeof chunk === "string" ? Buffer.from(chunk, "utf8") : chunk;
    totalBytes += buffer.byteLength;

    if (totalBytes > maxBytes) {
      throw new HttpError(
        413,
        `Request body exceeds ${maxBytes} bytes.`,
        "PAYLOAD_TOO_LARGE",
        { maxBytes }
      );
    }

    chunks.push(buffer);
  }

  return Buffer.concat(chunks).toString("utf8");
}

export function parseJsonBody<T>(
  raw: string,
  headers?: HeadersLike,
  options: Omit<ReadJsonBodyOptions, "maxBytes"> = {}
): T {
  const contentType = getHeader(headers, "content-type").toLowerCase();
  if (options.requireContentType && !contentType.includes("application/json")) {
    throw new HttpError(
      415,
      "Content-Type must be application/json.",
      "UNSUPPORTED_MEDIA_TYPE",
      { contentType }
    );
  }

  if (!raw) {
    return {} as T;
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw) as unknown;
  } catch {
    throw new HttpError(400, "Malformed JSON body.", "INVALID_JSON");
  }

  if (options.requireObject && !isRecord(parsed)) {
    throw new HttpError(400, "Request body must be a JSON object.", "INVALID_BODY_TYPE");
  }

  return parsed as T;
}

export async function readJsonBody<T>(
  request: IncomingMessage,
  options: ReadJsonBodyOptions = {}
): Promise<T> {
  const raw = await readRawBody(request, { maxBytes: options.maxBytes });
  return parseJsonBody<T>(raw, request.headers, {
    requireObject: options.requireObject,
    requireContentType: options.requireContentType
  });
}

export function sendJson(
  response: ServerResponse,
  statusCode: number,
  payload: unknown,
  headers?: Record<string, string>
): void {
  const corsOrigin = process.env.ZEPHR_CORS_ORIGIN || "*";
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": corsOrigin,
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "no-referrer",
    ...headers
  });
  response.end(JSON.stringify(payload));
}
