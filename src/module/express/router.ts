import express, {RouterOptions} from "express";
import handler, {acl, generator} from "./handler";
import ws from 'express-ws';
import {ACLHandler, Handler, RouteCallback} from "../types/router";
import {auth} from "../util/jwt";

interface RouterConfig extends RouteCallback {
    router: express.Router
}

let _wsInstance: ws.Instance;

export function setWsInstance(wsInstance: ws.Instance) {
    _wsInstance = wsInstance;
}

export default async function (cb?: (data: RouterConfig) => any, options?: RouterOptions, _auth?: any, _acl?: ACLHandler): Promise<express.Router> {
    const router = express.Router(options)
    _wsInstance?.applyTo?.(router)

    const defaultRouter = {
        get: (path: string, f: Handler, __auth?: any, __acl?: ACLHandler) => {
            f = generator(f);
            router.get(path, handler(auth(!!(_auth || __auth)), acl(_acl, f), acl(__acl, f), auth(_auth), auth(__auth), f));
        },
        post: (path: string, f: Handler, __auth?: any, __acl?: ACLHandler) => {
            f = generator(f);
            router.post(path, handler(auth(!!(_auth || __auth)), acl(_acl, f), acl(__acl, f), auth(_auth), auth(__auth), f));
        },
        put: (path: string, f: Handler, __auth?: any, __acl?: ACLHandler) => {
            f = generator(f);
            router.put(path, handler(auth(!!(_auth || __auth)), acl(_acl, f), acl(__acl, f), auth(_auth), auth(__auth), f));
        },
        delete: (path: string, f: Handler, __auth?: any, __acl?: ACLHandler) => {
            f = generator(f);
            router.delete(path, handler(auth(!!(_auth || __auth)), acl(_acl, f), acl(__acl, f), auth(_auth), auth(__auth), f));
        },
        patch: (path: string, f: Handler, __auth?: any, __acl?: ACLHandler) => {
            f = generator(f);
            router.patch(path, handler(auth(!!(_auth || __auth)), acl(_acl, f), acl(__acl, f), auth(_auth), auth(__auth), f));
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
                router.use(args[0], ...args.slice(1).map(r => handler(auth(!!_auth), acl(_acl, r), auth(_auth), r)));
            },
            ws: router.ws?.bind?.(router)
        })
    }
    return router as express.Router;
}
