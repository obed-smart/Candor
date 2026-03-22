import type { Request, Response, NextFunction } from "express";
import { env } from "../../config/env";
import { ApiResponse } from "../utils/ApiResponse";
import AppError from "../utils/apiError";

type ErrorRequestHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => void;

const sendErrorDev = (err: AppError, res: Response) => {
  res.status(err.statusCode).json({
    ...ApiResponse.error(err.message, err.statusCode),
    stack: err.stack,
  });
};

const sendErrorProd = (err: AppError, res: Response) => {
  if (err.isOperational) {
    return res
      .status(err.statusCode)
      .json(ApiResponse.error(err.message, err.statusCode));
  }

  console.error("UNEXPECTED ERROR:", err);

  return res
    .status(500)
    .json(ApiResponse.error("Something went wrong", 500));
};

const errorMiddleware: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  let error =
    err instanceof AppError
      ? err
      : new AppError("Something went wrong", 500);

  if (env.NODE_ENV === "development") {
    sendErrorDev(error, res);
  } else {
    sendErrorProd(error, res);
  }
};

export default errorMiddleware;