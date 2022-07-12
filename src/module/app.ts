import express from 'express';
import prepare from "./util/prepare";
import handler from "./util/handler";
import Resp from "./types/response";
import './util/env'
import _bedrock from './config'

type App = express.Application
type Handler = (req: express.Request) => Resp<any>
type HandlerRegistrator = (path: string, handler: Handler) => void

interface AppConfig {
    app: App,
    config: any,
    get: HandlerRegistrator,
    post: HandlerRegistrator,
    put: HandlerRegistrator,
    delete: HandlerRegistrator,
    use: HandlerRegistrator,
}

export default function ({port, name, cb, config}: {
    port?: number, name: string, config: any, cb?: (data: AppConfig) => null
}) {
    return new Promise<void>(async (resolve) => {
        if (!name) name = 'Jungol'
        if (!port) {
            if (config.port) port = config.port;
            else port = 80
        }
        if (!config) config = {} as any

        const app: express.Application = express();

        prepare(app);

        if (cb) await cb({
            app,
            config,
            get: (path: string, f: (req: express.Request) => Resp<any>) => {
                app.get(path, handler(f))
            },
            post: (path: string, f: (req: express.Request) => Resp<any>) => {
                app.post(path, handler(f))
            },
            put: (path: string, f: (req: express.Request) => Resp<any>) => {
                app.put(path, handler(f))
            },
            delete: (path: string, f: (req: express.Request) => Resp<any>) => {
                app.delete(path, handler(f))
            },
            use: (path: string, f: (req: express.Request) => Resp<any>) => {
                app.use(path, handler(f))
            }
        })

        app.get('/', (req, res) => {
            res.send(`${name} v${config.version}.${config.commitCount} (${config.commitHash})
            <br/>
            By <a href="https://github.com/HancomAC/bedrock">Bedrock</a> v${_bedrock.version}.${_bedrock.commitCount} (<a href="https://github.com/HancomAC/bedrock/commit/${_bedrock.commitHash}">${_bedrock.commitHash}</a>)`);
        })

        app.use(handler(async () => {
            return {
                error: 'Not Found',
                code: 404
            }
        }))

        return app.listen(port, resolve);
    })
}
