"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pubsub = exports.datastore = exports.storage = void 0;
const storage_1 = __importDefault(require("./storage"));
const datastore_1 = __importDefault(require("./datastore"));
const pubsub_1 = __importDefault(require("./pubsub"));
const gcp = {
    storage: storage_1.default,
    datastore: datastore_1.default,
    pubsub: pubsub_1.default,
};
exports.default = gcp;
exports.storage = storage_1.default;
exports.datastore = datastore_1.default;
exports.pubsub = pubsub_1.default;
//# sourceMappingURL=index.js.map