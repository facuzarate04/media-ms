import { s3, Config, AllowedAudioTypes } from "./s3/config";
import { Upload } from "@aws-sdk/lib-storage";
import { IAudio } from "./Audio";
import { IStoreValidator } from "./AudioValidator";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

export default class AudioService {
    public static async storeAudio(body: IStoreValidator): Promise<IAudio> {
        const path = await this.processAudio(body.temp_path);
        const data = {
            path: path,
            extension: 'mp3',
            quality: '28kb',
            size: 12000,
            duration: 120,
        };
        return data;
    }

    private static async processAudio(temp_path: string): Promise<string> {
        const objectKey = temp_path.split('.com/')[1];

        // Validate allowed file type

        /* if(!fileType || !AllowedAudioTypes.includes(fileType.mime)) {
            throw new Error('Invalid file type');
        } */
        

        const response = await s3.send(new GetObjectCommand({
            Bucket: Config.bucket,
            Key: objectKey
        }));

        

        const upload = new Upload({
            client: s3,
            params: {
                Bucket: Config.bucket,
                Key: randomUUID() + '',
                Body: response.Body,
                ACL: 'public-read',
            },
        });
          
        const data = await upload.done() as UploadedResponse;

        return data.Location;
    }

}

interface UploadedResponse {
    $metadata: Object
    Location: string;
}
        