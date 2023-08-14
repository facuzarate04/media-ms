import { S3Client } from "@aws-sdk/client-s3";
import * as dotenv from 'dotenv';
dotenv.config();

export interface IConfig {
    region: string;
    bucket: string;
    accessKeyId: string;
    secretAccessKey: string;
}

export const Config: IConfig = {
    region: process.env.S3_REGION || '',
    bucket: process.env.S3_BUCKET || '',
    accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
};

export const s3 = new S3Client({
    region: Config.region,
    credentials: {
        accessKeyId: Config.accessKeyId,
        secretAccessKey: Config.secretAccessKey,
    },
});

export const AllowedAudioTypes = [
    'audio/mpeg',
    'audio/mp3',
    'audio/wav',
];
