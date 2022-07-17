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
        get: (path: string, f: Handler, __auth?: any) => {
            router.get(path, handler(auth(_auth), auth(__auth), f));
        },
        post: (path: string, f: Handler, __auth?: any) => {
            router.post(path, handler(auth(_auth), auth(__auth), f));
        },
        put: (path: string, f: Handler, __auth?: any) => {
            router.put(path, handler(auth(_auth), auth(__auth), f));
        },
        delete: (path: string, f: Handler, __auth?: any) => {
            router.delete(path, handler(auth(_auth), auth(__auth), f));
        },
        patch: (path: string, f: Handler, __auth?: any) => {
            router.patch(path, handler(auth(_auth), auth(__auth), f));
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
                router.use(args[0], handler(auth(_auth), args[1]), ...args.slice(1));
            },
            ws: router.ws?.bind?.(router)
        })
    }
    return router as express.Router;
}
