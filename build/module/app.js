"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_ws_1 = __importDefault(require("express-ws"));
const prepare_1 = __importDefault(require("./express/prepare"));
const handler_1 = __importStar(require("./express/handler"));
const config_1 = __importDefault(require("./config"));
const log_1 = __importDefault(require("./util/log"));
const router_1 = require("./express/router");
const jwt_1 = __importStar(require("./util/jwt"));
function default_1({ port, name, cb, config }) {
    return new Promise(async (resolve) => {
        if (!name)
            name = 'Jungol';
        if (!port) {
            if (config.port)
                port = config.port;
            else
                port = 80;
        }
        if (!config)
            config = {};
        const instance = (0, express_ws_1.default)((0, express_1.default)()), app = instance.app;
        (0, router_1.setWsInstance)(instance);
        (0, prepare_1.default)(app);
        app.use(jwt_1.default);
        if (cb)
            await cb({
                app,
                config,
                get: (path, f, _auth, _acl) => {
                    let g = (0, handler_1.generator)(f);
                    app.get(path, (0, handler_1.default)((0, jwt_1.auth)(!!_auth), g.refresh, (0, handler_1.acl)(_acl, g), (0, jwt_1.auth)(_auth), g));
                },
                post: (path, f, _auth, _acl) => {
                    let g = (0, handler_1.generator)(f);
                    app.post(path, (0, handler_1.default)((0, jwt_1.auth)(!!_auth), g.refresh, (0, handler_1.acl)(_acl, g), (0, jwt_1.auth)(_auth), g));
                },
                put: (path, f, _auth, _acl) => {
                    let g = (0, handler_1.generator)(f);
                    app.put(path, (0, handler_1.default)((0, jwt_1.auth)(!!_auth), g.refresh, (0, handler_1.acl)(_acl, g), (0, jwt_1.auth)(_auth), g));
                },
                delete: (path, f, _auth, _acl) => {
                    let g = (0, handler_1.generator)(f);
                    app.delete(path, (0, handler_1.default)((0, jwt_1.auth)(!!_auth), g.refresh, (0, handler_1.acl)(_acl, g), (0, jwt_1.auth)(_auth), g));
                },
                patch: (path, f, _auth, _acl) => {
                    let g = (0, handler_1.generator)(f);
                    app.patch(path, (0, handler_1.default)((0, jwt_1.auth)(!!_auth), g.refresh, (0, handler_1.acl)(_acl, g), (0, jwt_1.auth)(_auth), g));
                },
                ws: app.ws?.bind?.(app),
                use: app.use.bind(app)
            });
        app.get('/', (req, res) => {
            res.send(`${name} v${config.version}.${config.commitCount} (${config.commitHash})
            <br/>
            By <a href="https://github.com/HancomAC/bedrock">Bedrock</a> v${config_1.default.version}.${config_1.default.commitCount} (<a href="https://github.com/HancomAC/bedrock/commit/${config_1.default.commitHash}">${config_1.default.commitHash}</a>)`);
        });
        app.use((0, handler_1.default)(async () => {
            return {
                error: 'Not Found',
                code: 404
            };
        }));
        return app.listen(port, resolve);
    }).then(() => {
        (0, log_1.default)(`${name} v${config.version}.${config.commitCount} (${config.commitHash}) is running on port ${port}.`);
    });
}
exports.default = default_1;
//# sourceMappingURL=app.js.map