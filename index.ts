import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import { DB_CONFIG } from './src/config/db';

const app: Application = express();

app.get('/', (req: Request, res: Response) => {
    res.json({
        "hello": "world"
    })
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