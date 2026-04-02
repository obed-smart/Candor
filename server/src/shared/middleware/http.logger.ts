import pinoHttp from "pino-http";
import { nanoid } from "nanoid";
import { Request, Response } from "express";
import logger from "../logger/logger";

const httpLogger = pinoHttp({
    logger,
    customLogLevel: function (
        req: Request,
        res: Response,
        err: Error | undefined
    ) {
        if (res.statusCode >= 500 || err) return "error";
        if (res.statusCode >= 400) return "warn";
        return "silent";
    },

    autoLogging: {
        ignore: req => req.url === "/health" || req.url === "/ready"
    },

    customSuccessMessage: function (req: Request, res: Response) {
        return `${req.method} ${req.url} success`;
    },

    customErrorMessage: function (req: Request, res: Response) {
        return `${req.method} ${req.url} failed with ${res.statusCode}`;
    },

    genReqId: function (req) {
        return (req.headers["x-request-id"] as string) || nanoid(10);
    },

    serializers: {
        req(req) {
            return {
                id: req.id,
                method: req.method,
                url: req.url,
                userAgent: req.headers["user-agent"],
                ip: req.ip
            };
        },

        res(res) {
            return {
                statusCode: res.statusCode
            };
        }
    }
});

export default httpLogger;
