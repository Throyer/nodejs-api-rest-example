import { ValidationError } from 'class-validator';
import { Request, Response } from 'express';
import {
  ExpressErrorMiddlewareInterface,
  HttpError,
  Middleware,
} from 'routing-controllers';

import { HttpStatusError } from '@errors/HttpStatusError';
import { HttpStatus } from '@shared/web/HttpStatus';
import { formatErrors } from '@utils/format-errors';

type Errors = {
  errors?: ValidationError[];
  httpCode?: number;
  statusCode?: number;
  message?: string;
} & HttpStatusError;

@Middleware({ type: 'after' })
export class GlobalErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: Errors, _request: Request, response: Response): Response {
    if (error.statusCode) {
      return response.status(error.statusCode).json({
        message: error.message,
        status: error.httpCode,
      });
    }

    if (Array.isArray(error)) {
      const [first] = error;
      if (first instanceof ValidationError) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          errors: formatErrors(error),
          message: "Invalid body, check 'errors' property for more info.",
          status: HttpStatus.BAD_REQUEST,
        });
      }
    }

    if (error.httpCode === HttpStatus.BAD_REQUEST && error?.errors) {
      return response.status(error.httpCode).json({
        errors: formatErrors(error.errors),
        message: error.message,
        status: error.httpCode,
      });
    }

    if (error instanceof HttpError) {
      const body: any = { status: error.httpCode };
      if (error.message) {
        body.message = error.message;
      }
      return response.status(error.httpCode).json(body);
    }

    if (error instanceof HttpStatusError) {
      const body: any = { status: error.status };
      if (error.message) {
        body.message = error.message;
      }
      return response.status(error.status).json(body);
    }

    console.error(error);

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error',
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}
