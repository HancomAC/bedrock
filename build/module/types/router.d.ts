import express from "express";
import { ResponseInternal } from "./response";
import ws from 'express-ws';
export declare type Request = express.Request & {
    auth: any;
    req_ip: string;
};
export declare type Handler = (req: Request, res?: express.Response, next?: express.NextFunction) => (ResponseInternal<any>);
export declare type HandlerRegistrator = (path: string, handler: Handler, _auth?: any, _acl?: ACLHandler) => any;
export declare type ACLHandler = ((req: Request, data: any) => Promise<boolean>) | false;
export interface RouteCallback {
    get: HandlerRegistrator;
    post: HandlerRegistrator;
    put: HandlerRegistrator;
    delete: HandlerRegistrator;
    patch: HandlerRegistrator;
    use: express.IRouterHandler<any> & express.IRouterMatcher<any>;
    ws: ws.WebsocketMethod<any>;
}
