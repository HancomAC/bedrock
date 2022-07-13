"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../util/log");
function default_1(f) {
    const middleware = async (req, res) => {
        try {
            const data = await f(req);
            if (data.error)
                res.status(data.code || 500);
            await res.json(data);
        }
        catch (e) {
            (0, log_1.error)(e);
            await res.status(500).json({ error: e.message, code: 500 });
        }
    };
    return middleware;
}
exports.default = default_1;
//# sourceMappingURL=handler.js.map