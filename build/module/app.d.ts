import express from 'express';
import ws from 'express-ws';
import Resp from "./types/response";
declare type App = express.Application;
declare type Handler = (req: express.Request, res?: express.Response) => (Resp<any> | Promise<null>);
declare type HandlerRegistrator = (path: string, handler: Handler) => any;
interface AppConfig {
    app: App;
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
