const DB_ENDPOINT: string = process.env.RDS_DB_HOSTNAME ?? '';
const DB_PORT: string = process.env.RDS_DB_PORT ?? '';
const DB_USERNAME: string = process.env.RDS_DB_USERNAME ?? '';
const DB_PASSWORD: string = process.env.RDS_DB_PASSWORD ?? '';
const DB_NAME: string = process.env.RDS_DB_NAME ?? '';


interface DbConfigType {
    host: string,
    user: string,
    password: string,
    port: string
}

export const DB_CONFIG: DbConfigType = {
    host: DB_ENDPOINT,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    port: DB_PORT
}