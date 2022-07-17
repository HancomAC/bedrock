import express from "express";
import {ResponseError} from "../types/response";
import {error} from "../util/log";
import {Handler, Request} from "../types/router";

export default function (...f: Handler[]) {
    f = f.filter(x => x);
    const middleware: express.RequestHandler = async (req, res) => {
        for (let i of f) {
            if (!i) continue;
            try {
                const data = await i(req as Request, res);
                if (data === false) continue;
                if (data === true) return;
                if ((data as ResponseError<any>).error) res.status((data as ResponseError<any>).code || 500);
                await res.json(data);
                return;
            } catch (e) {
                error(e)
                await res.status(500).json({error: e.message, code: 500});
                return;
            }
        }
    };
    return middleware
}
