import express, {RequestHandler, RouterOptions} from "express";
import Resp from "../types/response";
import handler from "./handler";

type BHandler = (path: string, f: (req: express.Request) => Resp<any>) => any;
type BRouter = express.Router & {
    _use: RequestHandler, _get: RequestHandler, _post: RequestHandler, _delete: RequestHandler, _put: RequestHandler,
    use: BHandler, get: BHandler, post: BHandler, delete: BHandler, put: BHandler
}

export default function (options?: RouterOptions): BRouter {
    const r = express.Router(options) as express.Router
        & { _use: any, _get: any, _post: any, _delete: any, _put: any, use: any, get: any, post: any, delete: any, put: any };
    r._use = r.use;
    r._get = r.get;
    r._post = r.post;
    r._delete = r.delete;
    r._put = r.put;
    r.use = (path: string, f: (req: express.Request) => Resp<any>) => {
        r._use(path, handler(f))
    }
    r.get = (path: string, f: (req: express.Request) => Resp<any>) => {
        r._get(path, handler(f))
    }
    r.post = (path: string, f: (req: express.Request) => Resp<any>) => {
        r._post(path, handler(f))
    }
    r.delete = (path: string, f: (req: express.Request) => Resp<any>) => {
        r._delete(path, handler(f))
    }
    r.put = (path: string, f: (req: express.Request) => Resp<any>) => {
        r._put(path, handler(f))
    }
    return r as BRouter;
}
