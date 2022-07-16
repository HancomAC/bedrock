import express from "express";
import Resp from "../types/response";
import ws from 'express-ws';

export type Handler = (req: express.Request & { auth: any, req_ip: string }, res?: express.Response, next?: express.NextFunction) => (Resp<any> | Promise<null>)
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
