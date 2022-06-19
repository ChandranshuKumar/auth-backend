import express, { Application, Request, Response } from 'express';
import 'dotenv/config';
import { DB_CONFIG } from './src/config/db';
const mysql = require('mysql');

const app: Application = express();

const dbConnection = mysql.createConnection(DB_CONFIG);
dbConnection.connect((err: any) => {
    if(err) {
        console.error('Database connection failed: ' + err);
        return;
    }
    console.log('Connected to database.');
})

app.get('/', (req: Request, res: Response) => {
    res.json({
        "hello": "world"
    })
});

const PORT: number = Number(process.env.PORT) || 8080;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, (): void => console.log(`Server started on ${PORT}`));