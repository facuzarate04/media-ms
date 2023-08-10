
export interface IConfig {
    appPort: number;
    dbUri: string;
}

export const config: IConfig = {
    appPort: Number(process.env.APP_PORT) || 3000,
    dbUri: process.env.DB_URI || "mongodb://localhost:27017/media",
};