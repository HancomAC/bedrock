import './util/env';
import App from "./app";
import _log from "./util/log";
import _router from "./express/router";
import { sign, verify, save } from "./util/jwt";
export declare const log: typeof _log;
export declare const router: typeof _router;
export declare const gcp: {
    storage: {
        client: import("@google-cloud/storage").Storage;
        SubmissionBucket: import("@google-cloud/storage/build/src/bucket").Bucket;
        JudgeBucket: import("@google-cloud/storage/build/src/bucket").Bucket;
    };
    datastore: {
        client: import("@google-cloud/datastore").Datastore;
    };
};
export declare const algolia: {
    client: import("algoliasearch").SearchClient;
    ProblemIndex: import("algoliasearch").SearchIndex;
};
export declare const auth: {
    sign: typeof sign;
    verify: typeof verify;
    save: typeof save;
};
export default App;
