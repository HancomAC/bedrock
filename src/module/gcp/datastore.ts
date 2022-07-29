import {Datastore} from "@google-cloud/datastore";
import {credentials, projectId} from './config'

const client = new Datastore({projectId, credentials});
const key = client.key.bind(client);
const query = client.createQuery.bind(client);
const save = client.save.bind(client);
const get = client.get.bind(client);
const atomic = async (cb: any) => {
    const transaction = client.transaction();
    await transaction.run();
    await cb(transaction);
    await transaction.commit();
}

export default {client, key, query, save, get, atomic};
