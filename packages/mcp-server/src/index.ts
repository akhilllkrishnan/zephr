import { callTool, listTools, McpToolCall } from "./tools";

interface JsonRpcRequest {
  jsonrpc?: string;
  id?: string | number;
  method: string;
  params?: Record<string, unknown>;
}

interface JsonRpcResponse {
  jsonrpc: "2.0";
  id: string | number | null;
  result?: unknown;
  error?: { code: number; message: string };
}

function writeResponse(response: JsonRpcResponse): void {
  process.stdout.write(`${JSON.stringify(response)}\n`);
}

function handleRequest(request: JsonRpcRequest): JsonRpcResponse {
  try {
    if (request.method === "tools/list") {
      return {
        jsonrpc: "2.0",
        id: request.id ?? null,
        result: { tools: listTools() }
      };
    }

    if (request.method === "tools/call") {
      const name = String(request.params?.name ?? "");
      const args = (request.params?.arguments ?? {}) as Record<string, unknown>;
      const result = callTool({ name: name as McpToolCall["name"], arguments: args });
      return {
        jsonrpc: "2.0",
        id: request.id ?? null,
        result: {
          content: [{ type: "json", json: result }]
        }
      };
    }

    return {
      jsonrpc: "2.0",
      id: request.id ?? null,
      error: { code: -32601, message: `Method not found: ${request.method}` }
    };
  } catch (error) {
    return {
      jsonrpc: "2.0",
      id: request.id ?? null,
      error: {
        code: -32000,
        message: error instanceof Error ? error.message : "Unknown server error"
      }
    };
  }
}

function boot(): void {
  let buffer = "";
  process.stdin.setEncoding("utf8");

  process.stdin.on("data", (chunk) => {
    buffer += chunk;

    while (buffer.includes("\n")) {
      const index = buffer.indexOf("\n");
      const line = buffer.slice(0, index).trim();
      buffer = buffer.slice(index + 1);

      if (!line) {
        continue;
      }

      try {
        const request = JSON.parse(line) as JsonRpcRequest;
        writeResponse(handleRequest(request));
      } catch {
        writeResponse({
          jsonrpc: "2.0",
          id: null,
          error: { code: -32700, message: "Parse error" }
        });
      }
    }
  });

  process.stdout.write(
    `${JSON.stringify({ jsonrpc: "2.0", method: "server/ready", params: { name: "zephyr-mcp" } })}\n`
  );
}

boot();
