import express, { RequestHandler, RouterOptions } from "express";
import Resp from "../types/response";
declare type BHandler = (path: string, f: (req: express.Request) => Resp<any>) => any;
declare type BRouter = express.Router & {
    _get: RequestHandler;
    _post: RequestHandler;
    _delete: RequestHandler;
    _put: RequestHandler;
    get: BHandler;
    post: BHandler;
    delete: BHandler;
    put: BHandler;
};
export default function (options?: RouterOptions): BRouter;
export {};
