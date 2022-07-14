import express from "express";
export declare function sign(data: any, expire: any): any;
export declare function verify(token: any): any;
export declare function save(res: express.Response, data: any, expire?: number): void;
export default function (req: express.Request, res: express.Response, next: express.NextFunction): void;
