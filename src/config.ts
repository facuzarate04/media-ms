import * as dotenv from 'dotenv';
dotenv.config();
export interface IConfig {
    appPort: number;
    mongoUrl: string;
}

export const config: IConfig = {
    appPort: Number(process.env.APP_PORT) || 3000,
    mongoUrl: process.env.MONGO_URL || "mongodb://127.0.0.1:27017/media",
};