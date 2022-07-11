"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const childProcess = __importStar(require("child_process"));
const path = __importStar(require("path"));
const packageJson = require(path.join(process.cwd(), 'package.json'));
const makeAllPackagesExternalPlugin = {
    name: 'make-all-packages-external',
    setup(build) {
        build.onResolve({ filter: /\$[A-Za-z]+/ }, () => ({ external: false }));
        build.onResolve({ filter: /^[^.\/]|^\.[^.\/]|^\.\.[^\/]/ }, args => ({ path: args.path, external: true }));
    },
};
const args = require('args-parser')(process.argv);
let builded;
const config = JSON.stringify({
    'version': packageJson.version,
    'commitHash': childProcess.execSync('git rev-parse HEAD', { cwd: process.cwd() }).toString().trim(),
    'commitCount': parseInt(childProcess.execSync('git rev-list --count HEAD', { cwd: process.cwd() }).toString().trim()),
    'buildDate': new Date().toISOString(),
    'port': args.port || (args.dev ? 3006 : 80),
    'dev': args.dev,
});
require('esbuild').build({
    entryPoints: [path.join(process.cwd(), args.entry)],
    outfile: path.join(process.cwd(), args.dist),
    bundle: true,
    plugins: [makeAllPackagesExternalPlugin],
    platform: 'node',
    define: { config },
    ...(args.dev ? {
        watch: {
            onRebuild(error) {
                if (error)
                    console.error('⚠ watch build failed:', error);
                else {
                    for (let i = 0; i < process.stdout.rows; i++)
                        console.log('');
                    process.stdout.cursorTo(0, 0);
                    console.log('✔ Build successful.');
                    console.log('⚡ Restarting server...');
                    if (builded)
                        builded.kill();
                    builded = childProcess.spawn('node', [path.join(process.cwd(), args.dist)], { stdio: 'inherit' });
                }
            },
        }
    } : {}),
}).then(() => {
    if (args.dev) {
        for (let i = 0; i < process.stdout.rows; i++)
            console.log('');
        process.stdout.cursorTo(0, 0);
        console.log('⚡ Starting server...');
        builded = childProcess.spawn('node', [path.join(process.cwd(), args.dist)], { stdio: 'inherit' });
    }
    else {
        console.log('✔ Build successful.');
    }
});
//# sourceMappingURL=runner.js.map