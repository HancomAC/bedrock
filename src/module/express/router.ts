import express, {RequestHandler, RouterOptions} from "express";
import Resp from "../types/response";
import handler from "./handler";
import ws from 'express-ws';

type Handler = (req: express.Request, res?: express.Response) => (Resp<any> | Promise<null>)
type HandlerRegistrator = (path: string, handler: Handler) => any

interface RouterConfig {
    router: express.Router,
    get: HandlerRegistrator,
    post: HandlerRegistrator,
    put: HandlerRegistrator,
    delete: HandlerRegistrator,
    use: express.IRouterHandler<any>,
    ws: ws.WebsocketMethod<any>,
}

let _wsInstance: ws.Instance;

export function setWsInstance(wsInstance: ws.Instance) {
    _wsInstance = wsInstance;
}

export default async function (cb?: (data: RouterConfig) => any, options?: RouterOptions): Promise<express.Router> {
    const router = express.Router(options)
    _wsInstance?.applyTo?.(router)

    if (cb) await cb({
        router,
        get: (path: string, f: (req: express.Request) => Resp<any>) => {
            router.get(path, handler(f))
        },
        post: (path: string, f: (req: express.Request) => Resp<any>) => {
            router.post(path, handler(f))
        },
        put: (path: string, f: (req: express.Request) => Resp<any>) => {
            router.put(path, handler(f))
        },
        delete: (path: string, f: (req: express.Request) => Resp<any>) => {
            router.delete(path, handler(f))
        },
        use: router.use.bind(router),
        ws: router.ws?.bind?.(router)
    })
    return router as express.Router;
}
