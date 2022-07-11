var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/module/index.ts
var module_exports = {};
__export(module_exports, {
  default: () => module_default,
  log: () => log2
});
module.exports = __toCommonJS(module_exports);

// src/module/app.ts
var import_express2 = __toESM(require("express"));

// src/module/util/prepare.ts
var import_express = __toESM(require("express"));
var import_cors = __toESM(require("cors"));
var import_helmet = __toESM(require("helmet"));
var import_compression = __toESM(require("compression"));
var import_morgan = __toESM(require("morgan"));
var import_cookie_parser = __toESM(require("cookie-parser"));

// src/module/util/log.ts
function log(...args) {
  console.log(`[$API][$TS=${Date.now()}][$LOG]`, ...args);
}
function logm(arg) {
  console.log(`[$API][$TS=${Date.now()}][$LOG]`, arg.substring(0, arg.length - 1));
}
function error(...args) {
  console.error(`[$API][$TS=${Date.now()}][$ERR]`, ...args);
}
log.error = error;
var log_default = log;

// src/module/util/prepare.ts
function prepare_default(app) {
  app.use((0, import_cors.default)());
  app.use((0, import_helmet.default)());
  app.use((0, import_morgan.default)("combined", {
    "stream": {
      write: (str) => {
        logm("[$M] " + str);
      }
    }
  }));
  app.use(import_express.default.json());
  app.use(import_express.default.urlencoded({ extended: true }));
  app.use((0, import_cookie_parser.default)());
  app.use((0, import_compression.default)());
}

// src/module/util/handler.ts
function handler_default(f) {
  const middleware = async (req, res) => {
    try {
      const data = await f(req);
      if (data.error)
        res.status(data.code || 500);
      await res.json(data);
    } catch (e) {
      error(e);
      await res.status(500).json({ error: e.message, code: 500 });
    }
  };
  return middleware;
}

// src/module/util/env.ts
var dotenv = __toESM(require("dotenv"));
dotenv.config();

// src/module/app.ts
function app_default({ port, name, cb, config: config2 } = {
  port: 80,
  name: "Jungol",
  config: {},
  cb: async ({}) => {
  }
}) {
  return new Promise(async (resolve) => {
    const app = (0, import_express2.default)();
    prepare_default(app);
    await cb({
      app,
      config: config2,
      get: (path, f) => {
        app.get(path, handler_default(f));
      },
      post: (path, f) => {
        app.post(path, handler_default(f));
      },
      put: (path, f) => {
        app.put(path, handler_default(f));
      },
      delete: (path, f) => {
        app.delete(path, handler_default(f));
      },
      use: (path, f) => {
        app.use(path, handler_default(f));
      }
    });
    app.get("/", (req, res) => {
      res.send(`${name} v${config2.version}.${config2.commitCount} (${config2.commitHash})`);
    });
    app.use(handler_default(async () => {
      return {
        error: "Not Found",
        code: 404
      };
    }));
    return app.listen(port, resolve);
  });
}

// src/module/index.ts
var log2 = log_default;
var module_default = app_default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  log
});
