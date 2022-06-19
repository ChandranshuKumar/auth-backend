import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import authRoutes from './src/routes/auth.route';
import userRoutes from './src/routes/user.route';
import { DB_CONFIG } from './src/configs/db';
import { ORIGIN, NODE_ENV, PORT, HOST } from './src/configs/config';
import { globalErrorHandling, handle404 } from './src/helpers/error';

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

app.use("/api/user", userRoutes);

app.use("*", handle404);

app.use(globalErrorHandling);

const connectDBAndStartServer = async (): Promise<void> => {
    try {
        await mongoose.connect(DB_CONFIG.dbUrl, DB_CONFIG.connectionOptions);
        console.log('MongoDB connected successfully');
        
        app.listen(PORT, HOST, (): void => console.log(`Server started on ${PORT}`));
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
};

connectDBAndStartServer();