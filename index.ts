import express, { Application, ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import { DB_CONFIG } from './src/configs/db';
import { ORIGIN, NODE_ENV } from './src/configs/config';
import authRoutes from './src/routes/auth.route';
import { API_ENDPOINT_NOT_FOUND_ERR, SERVER_ERR } from './src/constants/error';
import { Err } from './src/interfaces';

const app: Application = express();

app.use(express.json());
app.use(
    cors({
        credentials: true,
        origin: ORIGIN,
        optionsSuccessStatus: 200,
    })
);

if (NODE_ENV === "development") {
    const morgan = require("morgan");
    app.use(morgan("dev"));
};

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: "hello world",
    });
});

app.use("/api/auth", authRoutes);

app.use("*", (req: Request, res: Response, next: NextFunction) => {
    const error = {
        status: 404,
        message: API_ENDPOINT_NOT_FOUND_ERR,
    };
    next(error);
});

app.use((err: Err, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const responsePayload = {
        type: "error",
        message: err.message || SERVER_ERR,
        data: err.data || null
    }
    res.status(status).json(responsePayload);
});

const connectDBAndStartServer = async (): Promise<void> => {
    try {
        await mongoose.connect(DB_CONFIG.dbUrl, DB_CONFIG.connectionOptions);
        console.log('MongoDB connected successfully');

        const PORT: number = Number(process.env.PORT);
        const HOST: string = `${process.env.HOST}`;
        app.listen(PORT, HOST, (): void => console.log(`Server started on ${PORT}`));
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
};

connectDBAndStartServer();