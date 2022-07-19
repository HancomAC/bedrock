"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uuid = exports.handler = exports.auth = exports.algolia = exports.gcp = exports.router = exports.log = void 0;
require("./util/env");
const app_1 = __importDefault(require("./app"));
const log_1 = __importDefault(require("./util/log"));
const router_1 = __importDefault(require("./express/router"));
const gcp_1 = __importDefault(require("./gcp"));
const algolia_1 = __importDefault(require("./util/algolia"));
const jwt_1 = require("./util/jwt");
const handler_1 = __importDefault(require("./express/handler"));
const uuid_1 = require("uuid");
exports.log = log_1.default;
exports.router = router_1.default;
exports.gcp = gcp_1.default;
exports.algolia = algolia_1.default;
exports.auth = jwt_1.auth;
exports.handler = handler_1.default;
exports.uuid = uuid_1.v4;
exports.default = app_1.default;
//# sourceMappingURL=index.js.map