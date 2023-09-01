import { Model, ObjectId, Schema, isValidObjectId, model } from "mongoose";
import { IStoreValidator } from "./AudioValidator";

export interface IAudio {
    path: string;
    extension: string;
    quality: string;
    size?: number;
    duration?: number;
    variants?: Variant[];
}

export type Variant = {
    name: string;
}

const AudioSchema = new Schema({
    path: {
        type: String,
        required: true,
    },
    extension: {
        type: String,
        required: true,
    },
    quality: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
    },
    duration: {
        type: Number,
    },
    variants: [{
        name: {
            type: String,
            required: true,
        },
    }],
}, { timestamps: true });

const AudioModel: Model<IAudio> = model<IAudio>("Audio", AudioSchema);

export default class Audio {
    public static async getAudio(id: string): Promise<IAudio|null> {
        try {
            if(isValidObjectId(id) === false) {
                return Promise.resolve(null);
            }
            const audio = await AudioModel.findById({ _id: id});
            if (audio) {
                return Promise.resolve(audio);
            }else {
                return Promise.resolve(null);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public static async storeAudio(data: IAudio): Promise<IAudio> {
        try {
            const audio = await AudioModel.create(data);
            return Promise.resolve(audio);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
