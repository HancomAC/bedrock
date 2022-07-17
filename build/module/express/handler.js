"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.acl = void 0;
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
    if (!aclChecker)
        return null;
    return async (req, res, next) => {
        if (!await aclChecker(req, res, next))
            return false;
        return await handler?.(req, res, next);
    };
}
exports.acl = acl;
//# sourceMappingURL=handler.js.map