import './util/env';
import App from "./app";
import _log from "./util/log";
import _router from "./express/router";
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
    (cb: import("./util/router").Handler, permission?: Object): (req: any, res: any) => Promise<import("./types/response").ResponseSuccess<any> | import("./types/response").ResponseError<any>>;
    sign: typeof import("./util/jwt").sign;
    verify: typeof import("./util/jwt").verify;
    save: typeof import("./util/jwt").save;
};
export default App;
