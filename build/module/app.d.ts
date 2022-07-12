import express from 'express';
import Resp from "./types/response";
import './util/env';
declare type App = express.Application;
declare type Handler = (req: express.Request) => Resp<any>;
declare type HandlerRegistrator = (path: string, handler: Handler) => void;
interface AppConfig {
    app: App;
    config: any;
    get: HandlerRegistrator;
    post: HandlerRegistrator;
    put: HandlerRegistrator;
    delete: HandlerRegistrator;
    use: HandlerRegistrator;
}
export default function ({ port, name, cb, config }: {
    port?: number;
    name: string;
    config: any;
    cb?: (data: AppConfig) => null;
}): Promise<void>;
export {};
