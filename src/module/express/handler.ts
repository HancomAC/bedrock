import express from "express";
import Resp, {ResponseError} from "../types/response";
import {error} from "../util/log";

export default function (f: (req: express.Request, res?: express.Response) => Resp<any> | Promise<null>) {
    const middleware: express.RequestHandler = async (req, res) => {
        try {
            const data = await f(req, res);
            if (!data) return;
            if ((data as ResponseError<any>).error) res.status((data as ResponseError<any>).code || 500);
            await res.json(data);
        } catch (e) {
            error(e)
            await res.status(500).json({error: e.message, code: 500});
        }
    };
    return middleware
}
