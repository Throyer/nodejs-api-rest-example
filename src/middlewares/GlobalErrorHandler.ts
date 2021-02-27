import { ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import {
    ExpressErrorMiddlewareInterface,
    HttpError,
    Middleware,
} from 'routing-controllers';
import HttpStatusError from '../errors/HttpStatusError';
import { HttpStatus } from '../shared/HttpStatus';
import { formatErrors } from '../utils/format-errors';

interface Errors extends HttpStatusError {
    errors?: ValidationError[];
    httpCode?: number;
    statusCode?: number;
}

@Middleware({ type: 'after' })
export class GlobalErrorHandler implements ExpressErrorMiddlewareInterface {
    error(
        error: Errors,
        request: Request,
        respose: Response,
        next: NextFunction,
    ): Response {

        if (error.statusCode) {
            return respose.status(error.statusCode).json({
                message: error.message,
                status: error.httpCode,
            });
        }

        if (error.httpCode === HttpStatus.BAD_REQUEST && error?.errors) {
            return respose.status(error.httpCode).json({
                errors: formatErrors(error.errors),
                message: error.message,
                status: error.httpCode,
            });
        }

        if (error instanceof HttpError) {
            return respose.status(error.httpCode).json({
                message: error.message,
                status: error.httpCode,
            });
        }

        if (error instanceof HttpStatusError) {
            return respose.status(error.status).json({
                message: error.message,
                status: error.status,
            });
        }

        console.error(error);

        return respose.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: 'Internal server error',
            status: HttpStatus.INTERNAL_SERVER_ERROR,
        });
    }
}