import express from "express";
import {ResponseError} from "../types/response";
import {error} from "../util/log";
import {ACLHandler, Handler, Request} from "../types/router";

export default function (...f: Handler[]): express.RequestHandler {
    f = f.filter(x => x);
    return async (req, res, next) => {
        for (let i of f) {
            if (!i) continue;
            try {
                const data = await i(req as Request, res, next);
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
}

export function acl(aclChecker?: ACLHandler, handler?: Handler): Handler {
    if (!aclChecker) return null;
    return async (req, res, next) => {
        if (!await aclChecker(req, res, next)) return false;
        return await handler?.(req, res, next);
    }
}
