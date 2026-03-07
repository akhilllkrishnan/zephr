"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineConfig = defineConfig;
exports.loadZephrConfig = loadZephrConfig;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const node_vm_1 = __importDefault(require("node:vm"));
const node_module_1 = require("node:module");
const typescript_1 = __importDefault(require("typescript"));
const tokens_1 = require("./tokens");
const CANDIDATE_FILES = [
    "zephr.config.ts",
    "zephr.config.js",
    "zephr.config.cjs",
    "zephr.config.mjs",
    "zephr.config.json"
];
function executeModule(sourceCode, filename) {
    const localRequire = (0, node_module_1.createRequire)(filename);
    const moduleObject = { exports: {} };
    const sandbox = {
        module: moduleObject,
        exports: moduleObject.exports,
        require: localRequire,
        __dirname: node_path_1.default.dirname(filename),
        __filename: filename,
        process,
        console
    };
    node_vm_1.default.runInNewContext(sourceCode, sandbox, { filename });
    const exported = sandbox.module.exports;
    const fallback = sandbox.exports;
    return exported.default ?? fallback.default ?? exported;
}
function parseConfigFile(filePath) {
    const ext = node_path_1.default.extname(filePath);
    const raw = node_fs_1.default.readFileSync(filePath, "utf8");
    if (ext === ".json") {
        return JSON.parse(raw);
    }
    const compiled = typescript_1.default.transpileModule(raw, {
        compilerOptions: {
            module: typescript_1.default.ModuleKind.CommonJS,
            target: typescript_1.default.ScriptTarget.ES2022,
            esModuleInterop: true
        },
        fileName: filePath
    });
    return executeModule(compiled.outputText, filePath);
}
function defineConfig(config) {
    return config;
}
function loadZephrConfig(cwd = process.cwd()) {
    for (const candidate of CANDIDATE_FILES) {
        const fullPath = node_path_1.default.join(cwd, candidate);
        if (node_fs_1.default.existsSync(fullPath)) {
            const parsed = parseConfigFile(fullPath);
            return (0, tokens_1.resolveConfig)(parsed);
        }
    }
    return (0, tokens_1.resolveConfig)({});
}
//# sourceMappingURL=config.js.map