import { Request, Response } from 'express';

export const home = (req: Request, res: Response): 
    Response<{ message: string }> => res.json({
        message: "Is a live!"
    });