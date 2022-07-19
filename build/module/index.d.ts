import './util/env';
import App from "./app";
import _log from "./util/log";
import _router from "./express/router";
import _handler from "./express/handler";
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
        key: any;
        query: any;
        save: any;
        get: any;
    };
    pubsub: {
        client: import("@google-cloud/pubsub").PubSub;
        live: import("@google-cloud/pubsub").Topic;
        dool_r05: import("@google-cloud/pubsub").Topic;
        dool_r1: import("@google-cloud/pubsub").Topic;
        dool_r2: import("@google-cloud/pubsub").Topic;
        dool_r4: import("@google-cloud/pubsub").Topic;
        dool_r8: import("@google-cloud/pubsub").Topic;
        dool_beta: import("@google-cloud/pubsub").Topic;
    };
};
export declare const algolia: {
    client: import("algoliasearch").SearchClient;
    ProblemIndex: import("algoliasearch").SearchIndex;
    GroupIndex: import("algoliasearch").SearchIndex;
};
export declare const auth: {
    (permission?: Object): import("./types/router").Handler;
    sign: typeof import("./util/jwt").sign;
    verify: typeof import("./util/jwt").verify;
    save: typeof import("./util/jwt").save;
    revoke: typeof import("./util/jwt").revoke;
};
export declare const handler: typeof _handler;
export default App;
