import { error } from "./log";
export default function (f) {
    const middleware = async (req, res) => {
        try {
            const data = await f(req);
            if (data.error)
                res.status(data.code || 500);
            await res.json(data);
        }
        catch (e) {
            error(e);
            await res.status(500).json({ error: e.message, code: 500 });
        }
    };
    return middleware;
}
//# sourceMappingURL=handler.js.map