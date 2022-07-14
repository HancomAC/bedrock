import {Storage} from "@google-cloud/storage";
import {credentials, projectId} from "./config";

const client = new Storage({projectId, credentials});

export default client;
export const SubmissionBucket = client.bucket("jungol-submission-data");
export const JudgeBucket = client.bucket("jungol-judge-data");
