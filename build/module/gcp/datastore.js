"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const datastore_1 = require("@google-cloud/datastore");
const config_1 = require("./config");
const client = new datastore_1.Datastore({ projectId: config_1.projectId });
exports.default = client;
//# sourceMappingURL=datastore.js.map