import {PubSub} from "@google-cloud/pubsub";
import {credentials, projectId} from "./config";

const client = new PubSub({projectId, credentials});

const live = client.topic("live");
const dool_r05 = client.topic("judge-r05");
const dool_r1 = client.topic("judge-r1");
const dool_r2 = client.topic("judge-r2");
const dool_r4 = client.topic("judge-r4");
const dool_r8 = client.topic("judge-r8");
const dool_beta = client.topic("judge-beta");

export default {
    client,
    live,
    dool_r05,
    dool_r1,
    dool_r2,
    dool_r4,
    dool_r8,
    dool_beta
};
