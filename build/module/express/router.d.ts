import express, { RouterOptions } from "express";
import Resp from "../types/response";
declare type Handler = (req: express.Request) => Resp<any>;
declare type HandlerRegistrator = (path: string, handler: Handler) => any;
interface RouterConfig {
    router: express.Router;
    get: HandlerRegistrator;
    post: HandlerRegistrator;
    put: HandlerRegistrator;
    delete: HandlerRegistrator;
    use: express.IRouterHandler<any>;
}
export default function (cb?: (data: RouterConfig) => any, options?: RouterOptions): any;
export {};
