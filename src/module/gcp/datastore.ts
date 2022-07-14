import {Datastore} from "@google-cloud/datastore";
import {credentials, projectId} from './config'

const client = new Datastore({projectId, credentials});
export type DSKey = string

export default client
