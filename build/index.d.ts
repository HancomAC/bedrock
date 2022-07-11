declare module "runner" { }
declare module "module/util/log" {
    function log(...args: any[]): void;
    namespace log {
        var error: typeof import("module/util/log").error;
    }
    export function logm(arg: string): void;
    export function error(...args: any[]): void;
    export default log;
}
declare module "module/util/prepare" {
    import express from "express";
    export default function (app: express.Application): void;
}
declare module "module/types/response" {
    type Resp<T> = Promise<ResponseSuccess<T> | ResponseError<T>>;
    export type ResponseSuccess<T> = {
        data: T;
    };
    export type ResponseError<T> = {
        error: string;
        code: number;
        data?: T;
    };
    export default Resp;
}
declare module "module/util/handler" {
    import express from "express";
    import Resp from "module/types/response";
    export default function (f: (req: express.Request) => Resp<any>): express.RequestHandler;
}
declare module "module/util/env" { }
declare module "module/app" {
    import "module/util/env";
    export default function ({ port, name, cb, config }?: {
        port: number;
        name: string;
        config: any;
        cb: ({}: any) => Promise<void>;
    }): Promise<void>;
}
declare module "module/index" {
    import App from "module/app";
    import _log from "module/util/log";
    export const log: typeof _log;
    export default App;
}
