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
exports.setWsInstance = void 0;
const express_1 = __importDefault(require("express"));
const handler_1 = __importStar(require("./handler"));
const jwt_1 = require("../util/jwt");
let _wsInstance;
function setWsInstance(wsInstance) {
    _wsInstance = wsInstance;
}
exports.setWsInstance = setWsInstance;
async function default_1(cb, options, _auth) {
    const router = express_1.default.Router(options);
    _wsInstance?.applyTo?.(router);
    const defaultRouter = {
        get: (path, f, __auth, _acl) => {
            router.get(path, (0, handler_1.default)((0, handler_1.acl)(_acl, f), (0, jwt_1.auth)(_auth), (0, jwt_1.auth)(__auth), f));
        },
        post: (path, f, __auth, _acl) => {
            router.post(path, (0, handler_1.default)((0, handler_1.acl)(_acl, f), (0, jwt_1.auth)(_auth), (0, jwt_1.auth)(__auth), f));
        },
        put: (path, f, __auth, _acl) => {
            router.put(path, (0, handler_1.default)((0, handler_1.acl)(_acl, f), (0, jwt_1.auth)(_auth), (0, jwt_1.auth)(__auth), f));
        },
        delete: (path, f, __auth, _acl) => {
            router.delete(path, (0, handler_1.default)((0, handler_1.acl)(_acl, f), (0, jwt_1.auth)(_auth), (0, jwt_1.auth)(__auth), f));
        },
        patch: (path, f, __auth, _acl) => {
            router.patch(path, (0, handler_1.default)((0, handler_1.acl)(_acl, f), (0, jwt_1.auth)(_auth), (0, jwt_1.auth)(__auth), f));
        }
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
                    router.use(args[0], (0, handler_1.default)((0, jwt_1.auth)(_auth), args[1]), ...args.slice(1));
                },
                ws: router.ws?.bind?.(router)
            });
    }
    return router;
}
exports.default = default_1;
//# sourceMappingURL=router.js.map