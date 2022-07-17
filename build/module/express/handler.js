"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generator = exports.acl = void 0;
const log_1 = require("../util/log");
function default_1(...f) {
    f = f.filter(x => x);
    return async (req, res, next) => {
        for (let i of f) {
            if (!i)
                continue;
            try {
                const data = await i(req, res, next);
                if (data === false)
                    continue;
                if (data === true)
                    return;
                if (data.error)
                    res.status(data.code || 500);
                await res.json(data);
                return;
            }
            catch (e) {
                (0, log_1.error)(e);
                await res.status(500).json({ error: e.message, code: 500 });
                return;
            }
        }
    };
}
exports.default = default_1;
function acl(aclChecker, handler) {
    return async (req, res, next) => {
        const data = await handler?.(req, res, next);
        if (data === true)
            return true;
        if (data?.owner === req.auth?.id)
            return data;
        return aclChecker ? await aclChecker(req, data) : false;
    };
}
exports.acl = acl;
function generator(f) {
    let data = null;
    const g = async (req, res, next) => {
        if (data)
            return data;
        data = await f(req, res, next);
        return data;
    };
    g.refresh = async () => {
        data = null;
        return false;
    };
    return g;
}
exports.generator = generator;
//# sourceMappingURL=handler.js.map