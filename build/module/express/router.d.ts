import express, { RouterOptions } from "express";
import { ACLHandler, RouteCallback, Router } from "../types/router";
interface RouterConfig extends RouteCallback {
    router: express.Router;
}
export default function (cb?: (data: RouterConfig) => any, options?: RouterOptions, _auth?: any, _acl?: ACLHandler): Router;
export {};
