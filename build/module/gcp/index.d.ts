declare const gcp: {
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
export default gcp;
export declare const storage: {
    client: import("@google-cloud/storage").Storage;
    SubmissionBucket: import("@google-cloud/storage/build/src/bucket").Bucket;
    JudgeBucket: import("@google-cloud/storage/build/src/bucket").Bucket;
};
export declare const datastore: {
    client: import("@google-cloud/datastore").Datastore;
    key: any;
    query: any;
    save: any;
    get: any;
};
export declare const pubsub: {
    client: import("@google-cloud/pubsub").PubSub;
    live: import("@google-cloud/pubsub").Topic;
    dool_r05: import("@google-cloud/pubsub").Topic;
    dool_r1: import("@google-cloud/pubsub").Topic;
    dool_r2: import("@google-cloud/pubsub").Topic;
    dool_r4: import("@google-cloud/pubsub").Topic;
    dool_r8: import("@google-cloud/pubsub").Topic;
    dool_beta: import("@google-cloud/pubsub").Topic;
};
