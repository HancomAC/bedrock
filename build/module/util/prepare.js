import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { logm } from "./log";
export default function (app) {
    app.use(cors());
    app.use(helmet());
    app.use(morgan("combined", {
        "stream": {
            write: (str) => {
                logm('[$M] ' + str);
            }
        }
    }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(compression());
}
//# sourceMappingURL=prepare.js.map