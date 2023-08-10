import { Router } from "express";
import { Request, Response } from "express";

const router = Router();

router.get('/:uuid', (req: Request, res: Response) => {
    res.json({
        uuid: req.params.uuid,
    }).status(200);
});

export default router;