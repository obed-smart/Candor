import type { Request, Response, NextFunction } from "express";
import { env } from "../../config/env";
import { ApiResponse } from "../utils/ApiResponse";
import AppError from "../utils/apiError";
import logger from "../logger/logger";
import { nanoid } from "nanoid";

type ErrorRequestHandler = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => void;

const getRequestContext = (req: Request) => ({
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    requestId: (req as any).id,
});

const sendErrorDev = (err: AppError, req: Request, res: Response) => {
    logger.error({
        err,
        request: getRequestContext(req)
    });

    res.status(err.statusCode).json({
        ...ApiResponse.error(err.message, err.statusCode),
        stack: err.stack
    });
};

const sendErrorProd = (err: AppError, req: Request, res: Response) => {
    if (err.isOperational) {
        logger.warn({
            err: {
                message: err.message,
                statusCode: err.statusCode
            },
            request: getRequestContext(req)
        });

        return res
            .status(err.statusCode)
            .json(ApiResponse.error(err.message, err.statusCode));
    }

    logger.error({
        err: { message: "UNHANDLED ERROR - FIX THIS", statusCode: err.statusCode },
        request: getRequestContext(req)
    });

    return res.status(500).json(ApiResponse.error("Something went wrong", 500));
};

const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    let error =
        err instanceof AppError
            ? err
            : new AppError("Something went wrong", 500);

    if (env.NODE_ENV === "development") {
        sendErrorDev(error, req, res);
    } else {
        sendErrorProd(error, req, res);
    }
};

export default errorMiddleware;
