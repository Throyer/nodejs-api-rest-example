import { NextFunction, Request, Response } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';

import { HttpStatus } from '@shared/web/HttpStatus';
import { HttpStatusError } from '@errors/HttpStatusError';
import {
  BLOCK_DURATION_IN_MINUTES,
  INTERVAL_IN_SECONDS,
  MAXIMUM_ATTEMPTS,
} from '@config/env';

@Middleware({ type: 'before' })
export class GlobalRateLimit implements ExpressMiddlewareInterface {
  private static limiter = new RateLimiterMemory({
    points: MAXIMUM_ATTEMPTS,
    duration: INTERVAL_IN_SECONDS,
    blockDuration: BLOCK_DURATION_IN_MINUTES * 60,
  });

  async use(request: Request, _: Response, next: NextFunction): Promise<void> {
    try {
      await GlobalRateLimit.limiter.consume(request.ip);
      return next();
    } catch {
      throw new HttpStatusError(
        HttpStatus.TOO_MANY_REQUESTS,
        'Bloqueado por excesso de requisições.',
      );
    }
  }
}
