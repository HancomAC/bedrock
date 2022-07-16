"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storage_1 = require("@google-cloud/storage");
const config_1 = require("./config");
const client = new storage_1.Storage({ projectId: config_1.projectId, credentials: config_1.credentials });
const SubmissionBucket = client.bucket("jungol-submission-data");
const JudgeBucket = client.bucket("jungol-judge-data");
exports.default = {
    client,
    SubmissionBucket,
    JudgeBucket
};
//# sourceMappingURL=storage.js.map