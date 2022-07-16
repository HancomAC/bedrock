"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const datastore_1 = require("@google-cloud/datastore");
const config_1 = require("./config");
const client = new datastore_1.Datastore({ projectId: config_1.projectId, credentials: config_1.credentials });
const key = client.key.bind(client);
const query = client.createQuery.bind(client);
const save = client.save.bind(client);
const get = client.get.bind(client);
exports.default = { client, key, query, save, get };
//# sourceMappingURL=datastore.js.map