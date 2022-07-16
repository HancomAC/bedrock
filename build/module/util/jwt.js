"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.revoke = exports.save = exports.verify = exports.sign = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.jwt || 'secretKey';
function sign(data, expire) {
    return jsonwebtoken_1.default.sign(data, secretKey, {
        ...(expire ? { expiresIn: expire } : {})
    });
}
exports.sign = sign;
function verify(token) {
    try {
        return jsonwebtoken_1.default.verify(token, secretKey);
    }
    catch (e) {
        return null;
    }
}
exports.verify = verify;
function save(res, data, expire, domain) {
    res.cookie('auth', sign(data, expire), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        domain
    });
}
exports.save = save;
function revoke(res) {
    res.clearCookie('auth');
}
exports.revoke = revoke;
function default_1(req, res, next) {
    req.auth = verify(req.cookies?.auth);
    req.req_ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    next();
}
exports.default = default_1;
const auth = (cb, permission) => {
    return async (req, res) => {
        if (!req.auth)
            return { error: 'Authorization required', code: 401 };
        if (typeof permission === 'object') {
            for (let key in permission) {
                if (req.auth.permission[key] !== permission[key])
                    return { error: 'Permission denied', code: 403 };
            }
        }
        return cb(req, res);
    };
};
exports.auth = auth;
exports.auth.sign = sign;
exports.auth.verify = verify;
exports.auth.save = save;
exports.auth.revoke = revoke;
//# sourceMappingURL=jwt.js.map