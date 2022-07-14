"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setWsInstance = void 0;
const express_1 = __importDefault(require("express"));
const handler_1 = __importDefault(require("./handler"));
let _wsInstance;
function setWsInstance(wsInstance) {
    _wsInstance = wsInstance;
}
exports.setWsInstance = setWsInstance;
async function default_1(cb, options) {
    const router = express_1.default.Router(options);
    _wsInstance?.applyTo?.(router);
    if (cb)
        await cb({
            router,
            get: (path, f) => {
                router.get(path, (0, handler_1.default)(f));
            },
            post: (path, f) => {
                router.post(path, (0, handler_1.default)(f));
            },
            put: (path, f) => {
                router.put(path, (0, handler_1.default)(f));
            },
            delete: (path, f) => {
                router.delete(path, (0, handler_1.default)(f));
            },
            use: router.use.bind(router),
            ws: router.ws?.bind?.(router)
        });
    return router;
}
exports.default = default_1;
//# sourceMappingURL=router.js.map