System.register("runner", ["child_process", "path"], function (exports_1, context_1) {
    "use strict";
    var childProcess, path, packageJson, makeAllPackagesExternalPlugin, args, builded;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (childProcess_1) {
                childProcess = childProcess_1;
            },
            function (path_1) {
                path = path_1;
            }
        ],
        execute: function () {
            packageJson = require(path.join(require.main.path, 'package.json'));
            makeAllPackagesExternalPlugin = {
                name: 'make-all-packages-external',
                setup(build) {
                    build.onResolve({ filter: /\$[A-Za-z]+/ }, () => ({ external: false }));
                    build.onResolve({ filter: /^[^.\/]|^\.[^.\/]|^\.\.[^\/]/ }, args => ({ path: args.path, external: true }));
                },
            };
            args = require('args-parser')(process.argv);
            require('esbuild').build({
                entryPoints: [path.join(require.main.path, args.entry)],
                outfile: path.join(require.main.path, args.dist),
                bundle: true,
                plugins: [makeAllPackagesExternalPlugin],
                platform: 'node',
                define: {
                    'config.version': `"${packageJson.version}"`,
                    'config.commitHash': `"${childProcess.execSync('git rev-parse HEAD', { cwd: require.main.path }).toString().trim()}"`,
                    'config.commitCount': `${childProcess.execSync('git rev-list --count HEAD', { cwd: require.main.path }).toString().trim()}`,
                    'config.buildDate': `"${new Date().toISOString()}"`,
                    'config.port': args.dev ? '3006' : '80',
                    'config.dev': `${args.dev}`,
                },
                ...(args.dev ? {
                    watch: {
                        onRebuild(error) {
                            if (error)
                                console.error('⚠ watch build failed:', error);
                            else {
                                for (let i = 0; i < process.stdout.rows; i++)
                                    console.log('');
                                process.stdout.cursorTo(0, 0);
                                console.log('✔ Build successful.');
                                console.log('⚡ Restarting server...');
                                if (builded)
                                    builded.kill();
                                builded = childProcess.spawn('node', [path.join(require.main.path, args.dist)], { stdio: 'inherit' });
                            }
                        },
                    }
                } : {}),
            }).then(() => {
                if (args.dev) {
                    for (let i = 0; i < process.stdout.rows; i++)
                        console.log('');
                    process.stdout.cursorTo(0, 0);
                    console.log('⚡ Starting server...');
                    builded = childProcess.spawn('node', [path.join(require.main.path, args.dist)], { stdio: 'inherit' });
                }
                else {
                    console.log('✔ Build successful.');
                }
            });
        }
    };
});
System.register("module/util/log", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    function log(...args) {
        console.log(`[$API][$TS=${Date.now()}][$LOG]`, ...args);
    }
    function logm(arg) {
        console.log(`[$API][$TS=${Date.now()}][$LOG]`, arg.substring(0, arg.length - 1));
    }
    exports_2("logm", logm);
    function error(...args) {
        console.error(`[$API][$TS=${Date.now()}][$ERR]`, ...args);
    }
    exports_2("error", error);
    return {
        setters: [],
        execute: function () {
            log.error = error;
            exports_2("default", log);
        }
    };
});
System.register("module/util/prepare", ["express", "cors", "helmet", "compression", "morgan", "cookie-parser", "module/util/log"], function (exports_3, context_3) {
    "use strict";
    var express_1, cors_1, helmet_1, compression_1, morgan_1, cookie_parser_1, log_1;
    var __moduleName = context_3 && context_3.id;
    function default_1(app) {
        app.use(cors_1.default());
        app.use(helmet_1.default());
        app.use(morgan_1.default("combined", {
            "stream": {
                write: (str) => {
                    log_1.logm('[$M] ' + str);
                }
            }
        }));
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: true }));
        app.use(cookie_parser_1.default());
        app.use(compression_1.default());
    }
    exports_3("default", default_1);
    return {
        setters: [
            function (express_1_1) {
                express_1 = express_1_1;
            },
            function (cors_1_1) {
                cors_1 = cors_1_1;
            },
            function (helmet_1_1) {
                helmet_1 = helmet_1_1;
            },
            function (compression_1_1) {
                compression_1 = compression_1_1;
            },
            function (morgan_1_1) {
                morgan_1 = morgan_1_1;
            },
            function (cookie_parser_1_1) {
                cookie_parser_1 = cookie_parser_1_1;
            },
            function (log_1_1) {
                log_1 = log_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("module/types/response", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("module/util/handler", ["module/util/log"], function (exports_5, context_5) {
    "use strict";
    var log_2;
    var __moduleName = context_5 && context_5.id;
    function default_2(f) {
        const middleware = async (req, res) => {
            try {
                const data = await f(req);
                if (data.error)
                    res.status(data.code || 500);
                await res.json(data);
            }
            catch (e) {
                log_2.error(e);
                await res.status(500).json({ error: e.message, code: 500 });
            }
        };
        return middleware;
    }
    exports_5("default", default_2);
    return {
        setters: [
            function (log_2_1) {
                log_2 = log_2_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("module/util/env", ["dotenv"], function (exports_6, context_6) {
    "use strict";
    var dotenv;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (dotenv_1) {
                dotenv = dotenv_1;
            }
        ],
        execute: function () {
            dotenv.config();
        }
    };
});
System.register("module/app", ["express", "module/util/prepare", "module/util/handler", "module/util/env"], function (exports_7, context_7) {
    "use strict";
    var express_2, prepare_1, handler_1;
    var __moduleName = context_7 && context_7.id;
    function default_3({ port, name, cb } = {
        port: 80, name: 'Jungol', cb: async ({}) => {
        }
    }) {
        return new Promise(async (resolve) => {
            const app = express_2.default();
            prepare_1.default(app);
            await cb({
                app,
                config,
                get: (path, f) => {
                    app.get(path, handler_1.default(f));
                },
                post: (path, f) => {
                    app.post(path, handler_1.default(f));
                },
                put: (path, f) => {
                    app.put(path, handler_1.default(f));
                },
                delete: (path, f) => {
                    app.delete(path, handler_1.default(f));
                },
                use: (path, f) => {
                    app.use(path, handler_1.default(f));
                }
            });
            app.get('/', (req, res) => {
                res.send(`${name} v${config.version}.${config.commitCount} (${config.commitHash})`);
            });
            app.use(handler_1.default(async () => {
                return {
                    error: 'Not Found',
                    code: 404
                };
            }));
            return app.listen(port, resolve);
        });
    }
    exports_7("default", default_3);
    return {
        setters: [
            function (express_2_1) {
                express_2 = express_2_1;
            },
            function (prepare_1_1) {
                prepare_1 = prepare_1_1;
            },
            function (handler_1_1) {
                handler_1 = handler_1_1;
            },
            function (_1) {
            }
        ],
        execute: function () {
        }
    };
});
System.register("module/index", ["module/app", "module/util/log"], function (exports_8, context_8) {
    "use strict";
    var app_1, log_3, log;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [
            function (app_1_1) {
                app_1 = app_1_1;
            },
            function (log_3_1) {
                log_3 = log_3_1;
            }
        ],
        execute: function () {
            exports_8("log", log = log_3.default);
            exports_8("default", app_1.default);
        }
    };
});
//# sourceMappingURL=index.js.map