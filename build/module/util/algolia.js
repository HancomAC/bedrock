"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProblemIndex = void 0;
const algoliasearch_1 = __importDefault(require("algoliasearch"));
const client = (0, algoliasearch_1.default)(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
exports.ProblemIndex = client.initIndex('problem');
exports.default = client;
//# sourceMappingURL=algolia.js.map