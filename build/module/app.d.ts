import express from 'express';
import ws from 'express-ws';
import { HandlerRegistrator } from "./util/router";
interface AppConfig {
    app: express.Application;
    config: any;
    get: HandlerRegistrator;
    post: HandlerRegistrator;
    put: HandlerRegistrator;
    delete: HandlerRegistrator;
    use: express.IRouterHandler<any> & express.IRouterMatcher<any>;
    ws: ws.WebsocketMethod<any>;
}
export default function ({ port, name, cb, config }: {
    port?: number;
    name: string;
    config: any;
    cb?: (data: AppConfig) => any;
}): Promise<void>;
export {};
