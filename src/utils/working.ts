import { Request, Response } from 'express';

export const working = (req: Request, res: Response): 
    Response<{ message: string }> => res.json({
        message: "Is a live!"
    });