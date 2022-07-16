import express, { RouterOptions } from "express";
import ws from 'express-ws';
import { RouteCallback } from "../types/router";
interface RouterConfig extends RouteCallback {
    router: express.Router;
}
export declare function setWsInstance(wsInstance: ws.Instance): void;
export default function (cb?: (data: RouterConfig) => any, options?: RouterOptions, _auth?: any): Promise<express.Router>;
export {};
