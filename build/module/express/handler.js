"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../util/log");
function default_1(...f) {
    f = f.filter(x => x);
    const middleware = async (req, res) => {
        for (let i of f) {
            if (!i)
                continue;
            try {
                const data = await i(req, res);
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
    return middleware;
}
exports.default = default_1;
//# sourceMappingURL=handler.js.map