import express from "express";
import Resp from "../types/response";
export default function (f: (req: express.Request) => Resp<any>): express.RequestHandler;
