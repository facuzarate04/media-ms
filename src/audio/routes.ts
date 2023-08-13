import { Router } from "express";
import { Request, Response } from "express";
import AudioController from "./AudioController";

const router = Router();

router.get('/:uuid', (req: Request, res: Response) => {
    return AudioController.getAudio(req, res);
});

router.post('/', (req: Request, res: Response) => {
    return AudioController.storeAudio(req, res);
});

export default router;