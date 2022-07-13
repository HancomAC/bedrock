import Storage, {SubmissionBucket, JudgeBucket} from './storage'
import Datastore from "./datastore";
import exp from "constants";

const gcp = {
    storage: {
        client: Storage,
        SubmissionBucket,
        JudgeBucket
    },
    datastore: {
        client: Datastore
    }
}

export default gcp
