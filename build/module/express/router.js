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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const handler_1 = __importStar(require("./handler"));
const jwt_1 = require("../util/jwt");
function default_1(cb, options, _auth, _acl) {
    return async (wsInstance) => {
        const router = express_1.default.Router(options);
        wsInstance?.applyTo?.(router);
        const defaultRouter = {
            get: (path, f, __auth, __acl) => {
                let g = (0, handler_1.generator)(f);
                router.get(path, (0, handler_1.default)((0, jwt_1.auth)(!!(_auth || __auth)), g.refresh, (0, handler_1.acl)(_acl, g), (0, handler_1.acl)(__acl, g), (0, jwt_1.auth)(_auth), (0, jwt_1.auth)(__auth), g));
            },
            post: (path, f, __auth, __acl) => {
                let g = (0, handler_1.generator)(f);
                router.post(path, (0, handler_1.default)((0, jwt_1.auth)(!!(_auth || __auth)), g.refresh, (0, handler_1.acl)(_acl, g), (0, handler_1.acl)(__acl, g), (0, jwt_1.auth)(_auth), (0, jwt_1.auth)(__auth), g));
            },
            put: (path, f, __auth, __acl) => {
                let g = (0, handler_1.generator)(f);
                router.put(path, (0, handler_1.default)((0, jwt_1.auth)(!!(_auth || __auth)), g.refresh, (0, handler_1.acl)(_acl, g), (0, handler_1.acl)(__acl, g), (0, jwt_1.auth)(_auth), (0, jwt_1.auth)(__auth), g));
            },
            delete: (path, f, __auth, __acl) => {
                let g = (0, handler_1.generator)(f);
                router.delete(path, (0, handler_1.default)((0, jwt_1.auth)(!!(_auth || __auth)), g.refresh, (0, handler_1.acl)(_acl, g), (0, handler_1.acl)(__acl, g), (0, jwt_1.auth)(_auth), (0, jwt_1.auth)(__auth), g));
            },
            patch: (path, f, __auth, __acl) => {
                let g = (0, handler_1.generator)(f);
                router.patch(path, (0, handler_1.default)((0, jwt_1.auth)(!!(_auth || __auth)), g.refresh, (0, handler_1.acl)(_acl, g), (0, handler_1.acl)(__acl, g), (0, jwt_1.auth)(_auth), (0, jwt_1.auth)(__auth), g));
            },
            r: async (path, f) => {
                router.use(path, await f(wsInstance));
            },
        };
        if (cb) {
            if (!_auth)
                await cb({
                    router,
                    ...defaultRouter,
                    use: router.use.bind(router),
                    ws: router.ws?.bind?.(router)
                });
            else
                await cb({
                    router,
                    ...defaultRouter,
                    use: (...args) => {
                        router.use(args[0], ...args.slice(1).map(r => {
                            let g = (0, handler_1.generator)(r);
                            return (0, handler_1.default)((0, jwt_1.auth)(!!_auth), g.refresh, (0, handler_1.acl)(_acl, g, false), (0, jwt_1.auth)(_auth), g);
                        }));
                    },
                    ws: router.ws?.bind?.(router)
                });
        }
        return router;
    };
}
exports.default = default_1;
//# sourceMappingURL=router.js.map