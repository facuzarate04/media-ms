import { s3, Config, AllowedAudioTypes } from "./s3/config";
import { Upload } from "@aws-sdk/lib-storage";
import { IAudio } from "./Audio";
import { IStoreValidator } from "./AudioValidator";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { lookup, extension } from "mime-types";

export default class AudioService {

    public static async uploadAudio(body: IStoreValidator): Promise<IAudio> {
        const { path, extension, duration, quality, size } = await this.uploadToS3(body.temp_path);

        //TODO: Create variants

        const data = {
            path: path,
            quality: quality,
            extension: extension,
            duration: duration,
            size: size,
        }

        return data;
    }

    private static async uploadToS3(temp_path: string): Promise<IAudioProcessed> {
        
        const { mimetype, extension} = this.validateAudioFile(temp_path);

        const objectKey = temp_path.split('.com/')[1];        

        const response = await s3.send(new GetObjectCommand({
            Bucket: Config.bucket,
            Key: objectKey
        }));

        const upload = new Upload({
            client: s3,
            params: {
                Bucket: Config.bucket,
                Key: `audio/${randomUUID()}.${extension}`,
                Body: response.Body,
                ACL: 'public-read',
                ContentType: mimetype,
            },
        });
          
        const data = await upload.done() as IUploadedResponse;

        return {
            path: data.Location,
            extension: extension,
            quality: '28kb',
            size: 12000,
            duration: 120,
        };
    }

    private static validateAudioFile(temp_path: string): IAudioValidation {
        const mimeType = lookup(temp_path);
        if(!mimeType) {
            throw new Error('Error getting file type');
        }
        const fileExtension = extension(mimeType);

        if (!fileExtension || !AllowedAudioTypes.includes(mimeType)) {
            throw new Error('File type not allowed');
        }

        return {
            mimetype: mimeType,
            extension: fileExtension,
        }
    }

}

interface IAudioProcessed {
    path: string;
    extension: string;
    quality: string;
    size: number;
    duration: number;
}

interface IUploadedResponse {
    $metadata: Object
    Location: string;
}

interface IAudioValidation {
    mimetype: string;
    extension: string;
}
        