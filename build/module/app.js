"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prepare_1 = __importDefault(require("./util/prepare"));
const handler_1 = __importDefault(require("./util/handler"));
require("./util/env");
function default_1({ port, name, cb, config } = {
    port: 80, name: 'Jungol', config: {}, cb: async ({}) => {
    }
}) {
    return new Promise(async (resolve) => {
        const app = (0, express_1.default)();
        (0, prepare_1.default)(app);
        await cb({
            app,
            config,
            get: (path, f) => {
                app.get(path, (0, handler_1.default)(f));
            },
            post: (path, f) => {
                app.post(path, (0, handler_1.default)(f));
            },
            put: (path, f) => {
                app.put(path, (0, handler_1.default)(f));
            },
            delete: (path, f) => {
                app.delete(path, (0, handler_1.default)(f));
            },
            use: (path, f) => {
                app.use(path, (0, handler_1.default)(f));
            }
        });
        app.get('/', (req, res) => {
            res.send(`${name} v${config.version}.${config.commitCount} (${config.commitHash})`);
        });
        app.use((0, handler_1.default)(async () => {
            return {
                error: 'Not Found',
                code: 404
            };
        }));
        return app.listen(port, resolve);
    });
}
exports.default = default_1;
//# sourceMappingURL=app.js.map