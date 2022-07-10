import express from 'express';
import prepare from "./util/prepare";
import handler from "./util/handler";
import './util/env';
export default function ({ port, name, cb, config } = {
    port: 80, name: 'Jungol', config: {}, cb: async ({}) => {
    }
}) {
    return new Promise(async (resolve) => {
        const app = express();
        prepare(app);
        await cb({
            app,
            config,
            get: (path, f) => {
                app.get(path, handler(f));
            },
            post: (path, f) => {
                app.post(path, handler(f));
            },
            put: (path, f) => {
                app.put(path, handler(f));
            },
            delete: (path, f) => {
                app.delete(path, handler(f));
            },
            use: (path, f) => {
                app.use(path, handler(f));
            }
        });
        app.get('/', (req, res) => {
            res.send(`${name} v${config.version}.${config.commitCount} (${config.commitHash})`);
        });
        app.use(handler(async () => {
            return {
                error: 'Not Found',
                code: 404
            };
        }));
        return app.listen(port, resolve);
    });
}
//# sourceMappingURL=app.js.map