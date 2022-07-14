import express from "express";
import Resp from "../types/response";
export default function (f: (req: express.Request, res?: express.Response) => Resp<any> | Promise<null>): any;
