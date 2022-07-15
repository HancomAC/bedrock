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
exports.auth = exports.algolia = exports.gcp = exports.router = exports.log = void 0;
require("./util/env");
const app_1 = __importDefault(require("./app"));
const log_1 = __importDefault(require("./util/log"));
const router_1 = __importDefault(require("./express/router"));
const gcp_1 = __importDefault(require("./gcp"));
const algolia_1 = __importStar(require("./util/algolia"));
const jwt_1 = require("./util/jwt");
exports.log = log_1.default;
exports.router = router_1.default;
exports.gcp = gcp_1.default;
exports.algolia = {
    client: algolia_1.default,
    ProblemIndex: algolia_1.ProblemIndex
};
exports.auth = jwt_1.auth;
exports.default = app_1.default;
//# sourceMappingURL=index.js.map