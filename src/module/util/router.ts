import express from "express";
import Resp from "../types/response";

export type Handler = (req: express.Request, res?: express.Response, next?: express.NextFunction) => (Resp<any> | Promise<null>)
export type HandlerRegistrator = (path: string, handler: Handler) => any
