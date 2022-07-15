import express from "express";
import Resp from "../types/response";
export declare type Handler = (req: express.Request, res?: express.Response) => (Resp<any> | Promise<null>);
export declare type HandlerRegistrator = (path: string, handler: Handler) => any;
