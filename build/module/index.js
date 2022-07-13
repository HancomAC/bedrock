"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gcp = exports.router = exports.log = void 0;
const app_1 = __importDefault(require("./app"));
const log_1 = __importDefault(require("./util/log"));
const router_1 = __importDefault(require("./express/router"));
const gcp_1 = __importDefault(require("./gcp"));
exports.log = log_1.default;
exports.router = router_1.default;
exports.gcp = gcp_1.default;
exports.default = app_1.default;
//# sourceMappingURL=index.js.map