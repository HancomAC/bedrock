import express from 'express';
import prepare from "./util/prepare";
import handler from "./util/handler";
import Resp from "./types/response";
import './util/env'

export default function ({port, name, cb, config} = {
    port: 80, name: 'Jungol', config: {} as any, cb: async ({}: any) => {
    }
}) {
    return new Promise<void>(async (resolve) => {
        const app = express();

        prepare(app);

        await cb({
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
            res.send(`${name} v${config.version}.${config.commitCount} (${config.commitHash})`);
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
