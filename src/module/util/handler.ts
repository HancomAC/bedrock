import express from "express";
import Resp, {ResponseError} from "../types/response";
import {error} from "./log";

export default function (f: (req: express.Request) => Resp<any>) {
    const middleware: express.RequestHandler = async (req, res) => {
        try {
            const data = await f(req);
            if ((data as ResponseError<any>).error) res.status((data as ResponseError<any>).code || 500);
            await res.json(data);
        } catch (e) {
            error(e)
            await res.status(500).json({error: e.message, code: 500});
        }
    };
    return middleware
}
