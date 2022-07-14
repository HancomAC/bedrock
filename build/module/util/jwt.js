"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.save = exports.verify = exports.sign = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = 'secretKey';
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
function save(res, data, expire) {
    res.cookie('auth', sign(data, expire), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });
}
exports.save = save;
function default_1(req, res, next) {
    req.auth = verify(req.cookies?.auth);
    next();
}
exports.default = default_1;
//# sourceMappingURL=jwt.js.map