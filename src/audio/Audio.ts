import { Model, Schema, model } from "mongoose";

export interface IAudio {
    uuid: string;
    path: string;
    extension: string;
    quality: string;
    size?: number;
    duration?: number;
}

const AudioSchema = new Schema({
    uuid: {
        type: String,
        required: true,
    },
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
}, { timestamps: true });

export const AudioModel: Model<IAudio> = model<IAudio>("Audio", AudioSchema);
