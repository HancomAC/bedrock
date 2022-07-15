import express, { RouterOptions } from "express";
import ws from 'express-ws';
import { HandlerRegistrator } from "../util/router";
interface RouterConfig {
    router: express.Router;
    get: HandlerRegistrator;
    post: HandlerRegistrator;
    put: HandlerRegistrator;
    delete: HandlerRegistrator;
    use: express.IRouterHandler<any> & express.IRouterMatcher<any>;
    ws: ws.WebsocketMethod<any>;
}
export declare function setWsInstance(wsInstance: ws.Instance): void;
export default function (cb?: (data: RouterConfig) => any, options?: RouterOptions): Promise<express.Router>;
export {};
