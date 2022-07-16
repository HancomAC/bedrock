import {Storage} from "@google-cloud/storage";
import {credentials, projectId} from "./config";

const client = new Storage({projectId, credentials});

const SubmissionBucket = client.bucket("jungol-submission-data");
const JudgeBucket = client.bucket("jungol-judge-data");

export default {
    client,
    SubmissionBucket,
    JudgeBucket
};
