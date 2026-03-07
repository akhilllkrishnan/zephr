import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import ts from "typescript";
import { resolveConfig } from "./tokens";
import { ResolvedZephrConfig, ZephrConfig } from "./types";

const CANDIDATE_FILES = [
  "zephr.config.ts",
  "zephr.config.js",
  "zephr.config.cjs",
  "zephr.config.mjs",
  "zephr.config.json"
];

function executeModule(sourceCode: string, filename: string): unknown {
  const localRequire = createRequire(filename);
  const moduleObject = { exports: {} as Record<string, unknown> };
  const sandbox = {
    module: moduleObject,
    exports: moduleObject.exports,
    require: localRequire,
    __dirname: path.dirname(filename),
    __filename: filename,
    process,
    console
  };

  vm.runInNewContext(sourceCode, sandbox, { filename });
  const exported = sandbox.module.exports as Record<string, unknown>;
  const fallback = sandbox.exports as Record<string, unknown>;
  return exported.default ?? fallback.default ?? exported;
}

function parseConfigFile(filePath: string): ZephrConfig {
  const ext = path.extname(filePath);
  const raw = fs.readFileSync(filePath, "utf8");

  if (ext === ".json") {
    return JSON.parse(raw) as ZephrConfig;
  }

  const compiled = ts.transpileModule(raw, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true
    },
    fileName: filePath
  });

  return executeModule(compiled.outputText, filePath) as ZephrConfig;
}

export function defineConfig(config: ZephrConfig): ZephrConfig {
  return config;
}

export function loadZephrConfig(cwd = process.cwd()): ResolvedZephrConfig {
  for (const candidate of CANDIDATE_FILES) {
    const fullPath = path.join(cwd, candidate);
    if (fs.existsSync(fullPath)) {
      const parsed = parseConfigFile(fullPath);
      return resolveConfig(parsed);
    }
  }

  return resolveConfig({});
}
