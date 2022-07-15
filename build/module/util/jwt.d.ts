import express from "express";
import { Handler } from "./router";
export declare function sign(data: any, expire: any): any;
export declare function verify(token: any): any;
export declare function save(res: express.Response, data: any, expire?: number): void;
export default function (req: express.Request, res: express.Response, next: express.NextFunction): void;
export declare const auth: {
    (cb: Handler, permission?: Object): (req: any, res: any) => Promise<import("../types/response").ResponseSuccess<any> | import("../types/response").ResponseError<any>>;
    sign: typeof sign;
    verify: typeof verify;
    save: typeof save;
};
