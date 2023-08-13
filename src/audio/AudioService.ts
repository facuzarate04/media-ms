import { IAudio } from "./Audio";
import { IStoreValidator } from "./AudioValidator";

export default class AudioService {
    public static async storeAudio(body: IStoreValidator): Promise<IAudio> {
        const path = await this.putIntoStorage(body.temp_path);
        const data = {
            path: path,
            extension: 'mp3',
            quality: '28kb',
            size: 12000,
            duration: 120,
        };
        return data;
    }

    private static async putIntoStorage(temp_path: string): Promise<string> {
        return 'https://path';
    }

}
        