import express, {RouterOptions} from "express";
import handler, {acl, generator, justRun} from "./handler";
import ws from 'express-ws';
import {ACLHandler, Handler, PostHandler, RouteCallback, Router} from "../types/router";
import {auth} from "../util/jwt";

interface RouterConfig extends RouteCallback {
    router: express.Router
}

export default function (cb?: (data: RouterConfig) => any, options?: RouterOptions, _auth?: any, _acl?: ACLHandler): Router {
    return async (wsInstance: ws.Instance) => {
        const router = express.Router(options)
        wsInstance?.applyTo?.(router)

        const defaultRouter = {
            get: (path: string, f: Handler, {
                auth: __auth,
                acl: __acl,
                post: __post
            }: { auth?: any, acl?: ACLHandler, post?: PostHandler } = {}) => {
                router.get(path, generator(f, g => handler(auth(!!(_auth || __auth)), acl(_acl, g), acl(__acl, g), auth(_auth), auth(__auth), justRun(__post, g))));
            },
            post: (path: string, f: Handler, {
                auth: __auth,
                acl: __acl,
                post: __post
            }: { auth?: any, acl?: ACLHandler, post?: PostHandler } = {}) => {
                router.post(path, generator(f, g => handler(auth(!!(_auth || __auth)), acl(_acl, g), acl(__acl, g), auth(_auth), auth(__auth), justRun(__post, g))));
            },
            put: (path: string, f: Handler, {
                auth: __auth,
                acl: __acl,
                post: __post
            }: { auth?: any, acl?: ACLHandler, post?: PostHandler } = {}) => {
                router.put(path, generator(f, g => handler(auth(!!(_auth || __auth)), acl(_acl, g), acl(__acl, g), auth(_auth), auth(__auth), justRun(__post, g))));
            },
            delete: (path: string, f: Handler, {
                auth: __auth,
                acl: __acl,
                post: __post
            }: { auth?: any, acl?: ACLHandler, post?: PostHandler } = {}) => {
                router.delete(path, generator(f, g => handler(auth(!!(_auth || __auth)), acl(_acl, g), acl(__acl, g), auth(_auth), auth(__auth), justRun(__post, g))));
            },
            patch: (path: string, f: Handler, {
                auth: __auth,
                acl: __acl,
                post: __post
            }: { auth?: any, acl?: ACLHandler, post?: PostHandler } = {}) => {
                router.patch(path, generator(f, g => handler(auth(!!(_auth || __auth)), acl(_acl, g), acl(__acl, g), auth(_auth), auth(__auth), justRun(__post, g))));
            },
            r: async (path: string, f: Router) => {
                router.use(path, await f(wsInstance));
            },
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
                    router.use(args[0], ...args.slice(1).map(r => generator(r, g => handler(auth(!!_auth), acl(_acl, g, false), auth(_auth), g))));
                },
                ws: router.ws?.bind?.(router)
            })
        }
        return router as express.Router;
    }
}
