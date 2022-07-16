import express from "express";
import { Handler } from "../types/router";
export declare function sign(data: any, expire: any): any;
export declare function verify(token: any): any;
export declare function save(res: express.Response, data: any, expire?: number, domain?: string): void;
export declare function revoke(res: express.Response): void;
export default function (req: express.Request, res: express.Response, next: express.NextFunction): void;
export declare const auth: {
    (cb: Handler, permission?: Object): (req: any, res: any) => Promise<import("../types/response").ResponseSuccess<any> | import("../types/response").ResponseError<any>>;
    sign: typeof sign;
    verify: typeof verify;
    save: typeof save;
    revoke: typeof revoke;
};
