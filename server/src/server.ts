import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import GlobalErrorHandler from "./shared/middleware/error.handler";
import AppError from "./shared/utils/apiError";
import logger from "./shared/logger/logger";
import router from "./routes";
import { ApiResponse } from "./shared/utils/ApiResponse";
import { globalRateLimiter } from "./shared/middleware/rate.limiter";

import { env } from "./";

import httpLogger from "./shared/middleware/http.logger";

import { AppDataSource } from "./config/data.source.ts";

const app = express();

app.use(httpLogger);

app.use(helmet({ contentSecurityPolicy: false }));

const allowedOrigins =
    env.NODE_ENV === "production"
        ? [env.BASE_URL]
        : ["http://localhost:3000", "http://localhost:5173"];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
    })
);

app.use(globalRateLimiter);

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.get("/health", async (req, res) => {
    const t = Date.now;
    try {
        await AppDataSource.query("SELECT 1");

        res.status(200).json(
            ApiResponse.success(
                {
                    status: "ok",
                    uptime: Math.floor(process.uptime()),
                    responseTime: `${Date.now() - t}ms`,
                    timestamp: new Date().toISOString(),
                    services: { database: "up" }
                },
                "Candor server is running"
            )
        );
    } catch (error) {
        logger.error({ err }, "Health check: database unreachable");
    }

    res.status(500).json(
        ApiResponse.error({
            status: "degraded",
            timestamp: new Date().toISOString(),
            services: { database: "down" }
        })
    );
});

app.use("/api/v1", router);

app.use((req, res, next) => {
    logger.error(`Can't find ${req.originalUrl} on this server!`);
    throw new AppError(`Can't find ${req.originalUrl} on this server!`, 404);
});

app.use(GlobalErrorHandler);

export default app;
