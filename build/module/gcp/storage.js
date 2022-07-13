"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JudgeBucket = exports.SubmissionBucket = void 0;
const storage_1 = require("@google-cloud/storage");
const config_1 = require("./config");
const client = new storage_1.Storage({ projectId: config_1.projectId });
exports.default = client;
exports.SubmissionBucket = client.bucket("jungol-submission-data");
exports.JudgeBucket = client.bucket("jungol-judge-data");
//# sourceMappingURL=storage.js.map