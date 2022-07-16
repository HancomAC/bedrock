import express, {RequestHandler, RouterOptions} from "express";
import Resp from "../types/response";
import handler from "./handler";
import ws from 'express-ws';
import {Handler, HandlerRegistrator, RouteCallback} from "../types/router";
import {auth} from "../util/jwt";

interface RouterConfig extends RouteCallback {
    router: express.Router
}

let _wsInstance: ws.Instance;

export function setWsInstance(wsInstance: ws.Instance) {
    _wsInstance = wsInstance;
}

export default async function (cb?: (data: RouterConfig) => any, options?: RouterOptions, _auth?: any): Promise<express.Router> {
    const router = express.Router(options)
    _wsInstance?.applyTo?.(router)

    const defaultRouter = {
        get: (path: string, f: Handler, _auth?: any) => {
            if (_auth) router.get(path, handler(auth(f, _auth)));
            else router.get(path, handler(f));
        },
        post: (path: string, f: Handler, _auth?: any) => {
            if (_auth) router.post(path, handler(auth(f, _auth)));
            else router.post(path, handler(f));
        },
        put: (path: string, f: Handler, _auth?: any) => {
            if (_auth) router.put(path, handler(auth(f, _auth)));
            else router.put(path, handler(f));
        },
        delete: (path: string, f: Handler, _auth?: any) => {
            if (_auth) router.delete(path, handler(auth(f, _auth)));
            else router.delete(path, handler(f));
        },
        patch: (path: string, f: Handler, _auth?: any) => {
            if (_auth) router.patch(path, handler(auth(f, _auth)));
            else router.patch(path, handler(f));
        }
    }

    if (cb) {
        if (!_auth) await cb({
            router,
            ...defaultRouter,
            use: router.use.bind(router),
            ws: router.ws?.bind?.(router)
        })
        else await cb({
            router,
            ...defaultRouter,
            use: (...args) => {
                router.use(args[0], handler(auth(args[1], _auth)), ...args.slice(1));
            },
            ws: router.ws?.bind?.(router)
        })
    }
    return router as express.Router;
}
