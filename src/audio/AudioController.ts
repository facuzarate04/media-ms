import { Request, Response } from "express";
import Audio from "./Audio";
import { StoreValidator } from "./AudioValidator";
import AudioService from "./AudioService";

export default class AudioController {
    
    public static async  getAudio(req: Request, res: Response): Promise<Response> {
        try {
            const audio = await Audio.getAudio(req.params.uuid);
            if(audio) {
                return res.status(200)
                    .json({audio: audio});
            }
            return res.status(404)
                .json({error: "Audio not found"});
        } catch (error) {
            return res.status(500)
                .json({error: 'Error'});
        }
    }

    public static async storeAudio(req: Request, res: Response): Promise<Response> { 
        try {
            const result = StoreValidator.safeParse(req.body);
            if(!result.success) {
                return res.status(400)
                    .json({error: result.error.issues});
            }
            const data = await AudioService.storeAudio(result.data);
            const audio = await Audio.storeAudio(data);
            return res.status(200)
                .json({audio: audio});
        } catch (error) {
            return res.status(500)
                .json({error: error});
        }
    }
}