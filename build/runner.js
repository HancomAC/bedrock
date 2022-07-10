var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

// src/runner.ts
var childProcess = __toESM(require("child_process"));
var path = __toESM(require("path"));
var packageJson = require(path.join(process.cwd(), "package.json"));
var makeAllPackagesExternalPlugin = {
  name: "make-all-packages-external",
  setup(build) {
    build.onResolve({ filter: /\$[A-Za-z]+/ }, () => ({ external: false }));
    build.onResolve({ filter: /^[^.\/]|^\.[^.\/]|^\.\.[^\/]/ }, (args2) => ({ path: args2.path, external: true }));
  }
};
var args = require("args-parser")(process.argv);
var builded;
require("esbuild").build({
  entryPoints: [path.join(process.cwd(), args.entry)],
  outfile: path.join(process.cwd(), args.dist),
  bundle: true,
  plugins: [makeAllPackagesExternalPlugin],
  platform: "node",
  define: {
    "config.version": `"${packageJson.version}"`,
    "config.commitHash": `"${childProcess.execSync("git rev-parse HEAD", { cwd: process.cwd() }).toString().trim()}"`,
    "config.commitCount": `${childProcess.execSync("git rev-list --count HEAD", { cwd: process.cwd() }).toString().trim()}`,
    "config.buildDate": `"${new Date().toISOString()}"`,
    "config.port": args.port || (args.dev ? "3006" : "80"),
    "config.dev": `${args.dev}`
  },
  ...args.dev ? {
    watch: {
      onRebuild(error) {
        if (error)
          console.error("\u26A0 watch build failed:", error);
        else {
          for (let i = 0; i < process.stdout.rows; i++)
            console.log("");
          process.stdout.cursorTo(0, 0);
          console.log("\u2714 Build successful.");
          console.log("\u26A1 Restarting server...");
          if (builded)
            builded.kill();
          builded = childProcess.spawn("node", [path.join(process.cwd(), args.dist)], { stdio: "inherit" });
        }
      }
    }
  } : {}
}).then(() => {
  if (args.dev) {
    for (let i = 0; i < process.stdout.rows; i++)
      console.log("");
    process.stdout.cursorTo(0, 0);
    console.log("\u26A1 Starting server...");
    builded = childProcess.spawn("node", [path.join(process.cwd(), args.dist)], { stdio: "inherit" });
  } else {
    console.log("\u2714 Build successful.");
  }
});
