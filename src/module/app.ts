import express from 'express';
import ws from 'express-ws';
import prepare from "./express/prepare";
import handler, {acl, generator} from "./express/handler";
import _bedrock from './config'
import log from "./util/log";
import authRouter, {auth} from './util/jwt'
import {ACLHandler, Handler, RouteCallback, Router} from "./types/router";

interface AppConfig extends RouteCallback {
    app: express.Application
    config: any
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

        prepare(app);
        app.use(authRouter);

        if (cb) await cb({
            app,
            config,
            get: (path: string, f: Handler, _auth?: any, _acl?: ACLHandler) => {
                let g = generator(f);
                app.get(path, handler(auth(!!_auth), g.refresh, acl(_acl, g), auth(_auth), g));
            },
            post: (path: string, f: Handler, _auth?: any, _acl?: ACLHandler) => {
                let g = generator(f);
                app.post(path, handler(auth(!!_auth), g.refresh, acl(_acl, g), auth(_auth), g));
            },
            put: (path: string, f: Handler, _auth?: any, _acl?: ACLHandler) => {
                let g = generator(f);
                app.put(path, handler(auth(!!_auth), g.refresh, acl(_acl, g), auth(_auth), g));
            },
            delete: (path: string, f: Handler, _auth?: any, _acl?: ACLHandler) => {
                let g = generator(f);
                app.delete(path, handler(auth(!!_auth), g.refresh, acl(_acl, g), auth(_auth), g));
            },
            patch: (path: string, f: Handler, _auth?: any, _acl?: ACLHandler) => {
                let g = generator(f);
                app.patch(path, handler(auth(!!_auth), g.refresh, acl(_acl, g), auth(_auth), g));
            },
            r: async (path: string, f: Router) => {
                app.use(path, await f(instance));
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
