const DB_ENDPOINT: string = process.env.DB_URL ?? '';
const DB_USERNAME: string = process.env.DB_USERNAME ?? '';
const DB_PASSWORD: string = process.env.DB_USER_PASSWORD ?? '';
const DB_URL: string = DB_ENDPOINT.replace('<username>', DB_USERNAME).replace('<password>', DB_PASSWORD);

interface DbConfigType {
    dbUrl: string,
    connectionOptions: {
        keepAlive: boolean,
        connectTimeoutMS: number,
        useNewUrlParser: boolean,
        useUnifiedTopology: boolean
    }
}

export const DB_CONFIG: DbConfigType = {
    dbUrl: DB_URL,
    connectionOptions: {
        keepAlive: true,
        connectTimeoutMS: 30000,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
}