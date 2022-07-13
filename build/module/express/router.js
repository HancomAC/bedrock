"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const handler_1 = __importDefault(require("./handler"));
function default_1(options) {
    const r = express_1.default.Router(options);
    r._use = r.use;
    r._get = r.get;
    r._post = r.post;
    r._delete = r.delete;
    r._put = r.put;
    r.use = (path, f) => {
        r._use(path, (0, handler_1.default)(f));
    };
    r.get = (path, f) => {
        r._get(path, (0, handler_1.default)(f));
    };
    r.post = (path, f) => {
        r._post(path, (0, handler_1.default)(f));
    };
    r.delete = (path, f) => {
        r._delete(path, (0, handler_1.default)(f));
    };
    r.put = (path, f) => {
        r._put(path, (0, handler_1.default)(f));
    };
    return r;
}
exports.default = default_1;
//# sourceMappingURL=router.js.map