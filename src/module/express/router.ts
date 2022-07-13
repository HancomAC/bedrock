import express, {RequestHandler, RouterOptions} from "express";
import Resp from "../types/response";
import handler from "./handler";

type BHandler = (path: string, f: (req: express.Request) => Resp<any>) => any;
type BRouter = express.Router & {
    _get: RequestHandler, _post: RequestHandler, _delete: RequestHandler, _put: RequestHandler,
    get: BHandler, post: BHandler, delete: BHandler, put: BHandler
}

type Handler = (req: express.Request) => Resp<any>
type HandlerRegistrator = (path: string, handler: Handler) => any

interface RouterConfig {
    router: express.Router,
    get: HandlerRegistrator,
    post: HandlerRegistrator,
    put: HandlerRegistrator,
    delete: HandlerRegistrator,
    use: express.IRouterHandler<any>
}

export default async function (cb?: (data: RouterConfig) => any, options?: RouterOptions) {
    const router = express.Router(options)
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
        use: router.use
    })
    return router;
}
