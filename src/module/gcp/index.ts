import _storage from './storage'
import _datastore from "./datastore";
import _pubsub from "./pubsub";

const gcp = {
    storage: _storage,
    datastore: _datastore,
    pubsub: _pubsub,
}

export default gcp
export const storage = _storage
export const datastore = _datastore
export const pubsub = _pubsub
