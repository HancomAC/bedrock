import express from 'express';
import { RouteCallback } from "./types/router";
interface AppConfig extends RouteCallback {
    app: express.Application;
    config: any;
}
export default function ({ port, name, cb, config }: {
    port?: number;
    name: string;
    config: any;
    cb?: (data: AppConfig) => any;
}): Promise<void>;
export {};
