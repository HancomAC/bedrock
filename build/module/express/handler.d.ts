import express from "express";
import { ACLHandler, Handler } from "../types/router";
export default function (...f: Handler[]): express.RequestHandler;
export declare function acl(aclChecker?: ACLHandler, handler?: Handler): Handler;
export declare function generator(f: Handler | express.RequestHandler): {
    (req: any, res: any, next: any): Promise<any>;
    refresh(): Promise<boolean>;
};
