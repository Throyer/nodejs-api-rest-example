import { Request, Response } from 'express';

type Greeting = {
  message: string;
};

export const home = (_req: Request, res: Response): Response<Greeting> =>
  res.json({
    message: 'Is a live!',
  });
