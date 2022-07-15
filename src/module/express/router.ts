import express, {RequestHandler, RouterOptions} from "express";
import Resp from "../types/response";
import handler from "./handler";
import ws from 'express-ws';
import {Handler, HandlerRegistrator} from "../types/router";
import {auth} from "../util/jwt";

interface RouterConfig {
    router: express.Router,
    get: HandlerRegistrator,
    post: HandlerRegistrator,
    put: HandlerRegistrator,
    delete: HandlerRegistrator,
    use: express.IRouterHandler<any> & express.IRouterMatcher<any>,
    ws: ws.WebsocketMethod<any>,
}

let _wsInstance: ws.Instance;

export function setWsInstance(wsInstance: ws.Instance) {
    _wsInstance = wsInstance;
}

export default async function (cb?: (data: RouterConfig) => any, options?: RouterOptions, _auth?: any): Promise<express.Router> {
    const router = express.Router(options)
    _wsInstance?.applyTo?.(router)

    if (cb) {
        if (!_auth) await cb({
            router,
            get: (path: string, f: Handler) => {
                router.get(path, handler(f))
            },
            post: (path: string, f: Handler) => {
                router.post(path, handler(f))
            },
            put: (path: string, f: Handler) => {
                router.put(path, handler(f))
            },
            delete: (path: string, f: Handler) => {
                router.delete(path, handler(f))
            },
            use: router.use.bind(router),
            ws: router.ws?.bind?.(router)
        })
        else await cb({
            router,
            get: (path: string, f: Handler) => {
                router.get(path, handler(auth(f, _auth)))
            },
            post: (path: string, f: Handler) => {
                router.post(path, handler(auth(f, _auth)))
            },
            put: (path: string, f: Handler) => {
                router.put(path, handler(auth(f, _auth)))
            },
            delete: (path: string, f: Handler) => {
                router.delete(path, handler(auth(f, _auth)))
            },
            use: (...args) => {
                router.use(args[0], handler(auth(args[1], _auth)), ...args.slice(1));
            },
            ws: router.ws?.bind?.(router)
        })
    }
    return router as express.Router;
}
