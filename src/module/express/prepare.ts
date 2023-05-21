import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import {logm} from "../util/log";

export default function (app: express.Application) {
    app.use(cors({
        credentials: true,
        origin: ["https://jungol.co.kr", "https://api.jungol.co.kr", "https://beta.jungol.co.kr", "https://api-beta.jungol.co.kr", "http://localhost:5173", "https://*.v6-7sg.pages.dev"],
    }));
    app.use(helmet());
    app.use(morgan("combined", {
        "stream": {
            write: (str) => {
                logm('[$M] ' + str);
            }
        }
    }))
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use((error, req, res, next) => {
        res.status(500).send({error: error.message, code: 500});
    });
    app.use(express.urlencoded({extended: true}));
    app.use(cookieParser());
    app.use(compression());
}
