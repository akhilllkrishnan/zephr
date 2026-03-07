import { createServer } from "node:http";
import { ensureCloudEnvLoaded } from "./env";
import { handleNodeHttpRequest } from "./nodeAdapter";

ensureCloudEnvLoaded();

const server = createServer(async (request, response) => {
  await handleNodeHttpRequest(request, response);
});

const port = Number(process.env.PORT ?? 8787);
server.listen(port, () => {
  console.log(`Zephr cloud API running on http://localhost:${port}`);
  console.log("Use Authorization: Bearer dev_local_key for local testing.");
});
