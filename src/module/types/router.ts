import express from "express";
import Resp, {ResponseInternal} from "../types/response";
import ws from 'express-ws';

export type Request = express.Request & { auth: any, req_ip: string };
export type Handler = (req: Request, res?: express.Response, next?: express.NextFunction) => (ResponseInternal<any>)
export type HandlerRegistrator = (path: string, handler: Handler, _auth?: any) => any

export interface RouteCallback {
    get: HandlerRegistrator,
    post: HandlerRegistrator,
    put: HandlerRegistrator,
    delete: HandlerRegistrator,
    patch: HandlerRegistrator,
    use: express.IRouterHandler<any> & express.IRouterMatcher<any>,
    ws: ws.WebsocketMethod<any>,
}
