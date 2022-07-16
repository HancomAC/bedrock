"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setWsInstance = void 0;
const express_1 = __importDefault(require("express"));
const handler_1 = __importDefault(require("./handler"));
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
        get: (path, f, _auth) => {
            if (_auth)
                router.get(path, (0, handler_1.default)((0, jwt_1.auth)(f, _auth)));
            else
                router.get(path, (0, handler_1.default)(f));
        },
        post: (path, f, _auth) => {
            if (_auth)
                router.post(path, (0, handler_1.default)((0, jwt_1.auth)(f, _auth)));
            else
                router.post(path, (0, handler_1.default)(f));
        },
        put: (path, f, _auth) => {
            if (_auth)
                router.put(path, (0, handler_1.default)((0, jwt_1.auth)(f, _auth)));
            else
                router.put(path, (0, handler_1.default)(f));
        },
        delete: (path, f, _auth) => {
            if (_auth)
                router.delete(path, (0, handler_1.default)((0, jwt_1.auth)(f, _auth)));
            else
                router.delete(path, (0, handler_1.default)(f));
        },
        patch: (path, f, _auth) => {
            if (_auth)
                router.patch(path, (0, handler_1.default)((0, jwt_1.auth)(f, _auth)));
            else
                router.patch(path, (0, handler_1.default)(f));
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
                    router.use(args[0], (0, handler_1.default)((0, jwt_1.auth)(args[1], _auth)), ...args.slice(1));
                },
                ws: router.ws?.bind?.(router)
            });
    }
    return router;
}
exports.default = default_1;
//# sourceMappingURL=router.js.map