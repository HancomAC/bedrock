import {Datastore} from "@google-cloud/datastore";
import {credentials, projectId} from './config'

const client = new Datastore({projectId, credentials});
const key = client.key.bind(client);
const query = client.createQuery.bind(client);
const save = client.save.bind(client);
const get = client.get.bind(client);
const atomic = async (cb: any, {maximumRetry} = {maximumRetry: 10}) => {
    let count = 0;
    while (true) {
        const transaction = client.transaction();
        try {
            await transaction.run();
            await cb(transaction);
            await transaction.commit();
            break;
        } catch (e) {
            await transaction.rollback();
            if (count++ > maximumRetry) throw e;
            await new Promise(resolve => setTimeout(resolve, Math.random() * 100 * Math.pow(2, count)));
        }
    }
}

export default {client, key, query, save, get, atomic};
