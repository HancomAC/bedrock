import jwt from 'jsonwebtoken';
import express from "express";

const secretKey = 'secretKey';

export function sign(data, expire) {
    return jwt.sign(data, secretKey, {
        ...(expire ? {expiresIn: expire} : {})
    });
}

export function verify(token) {
    try {
        return jwt.verify(token, secretKey);
    } catch (e) {
        return null;
    }
}

export function save(res: express.Response, data: any, expire?: number) {
    res.cookie('auth', sign(data, expire), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });
}

export default function (req: express.Request, res: express.Response, next: express.NextFunction) {
    req.auth = verify(req.cookies?.auth);
    next();
}
