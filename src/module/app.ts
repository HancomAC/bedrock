import express from 'express';
import ws from 'express-ws';
import prepare from "./express/prepare";
import handler from "./express/handler";
import Resp from "./types/response";
import _bedrock from './config'
import log from "./util/log";
import {setWsInstance} from "./express/router";
import auth from './util/jwt'
import {Handler, HandlerRegistrator} from "./util/router";


interface AppConfig {
    app: express.Application,
    config: any,
    get: HandlerRegistrator,
    post: HandlerRegistrator,
    put: HandlerRegistrator,
    delete: HandlerRegistrator,
    use: express.IRouterHandler<any> & express.IRouterMatcher<any>,
    ws: ws.WebsocketMethod<any>,
}

export default function ({port, name, cb, config}: {
    port?: number, name: string, config: any, cb?: (data: AppConfig) => any
}) {
    return new Promise<void>(async (resolve) => {
        if (!name) name = 'Jungol'
        if (!port) {
            if (config.port) port = config.port;
            else port = 80
        }
        if (!config) config = {} as any

        const instance = ws(express()), app = instance.app;

        setWsInstance(instance);
        prepare(app);
        app.use(auth);

        if (cb) await cb({
            app,
            config,
            get: (path: string, f: Handler) => {
                app.get(path, handler(f))
            },
            post: (path: string, f: Handler) => {
                app.post(path, handler(f))
            },
            put: (path: string, f: Handler) => {
                app.put(path, handler(f))
            },
            delete: (path: string, f: Handler) => {
                app.delete(path, handler(f))
            },
            ws: app.ws?.bind?.(app) as typeof app.ws,
            use: app.use.bind(app)
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
    }).then(() => {
        log(`${name} v${config.version}.${config.commitCount} (${config.commitHash}) is running on port ${port}.`);
    })
}
