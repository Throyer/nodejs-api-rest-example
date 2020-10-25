import { Response, Request, NextFunction } from 'express';

import {
    Middleware,
    ExpressErrorMiddlewareInterface
} from "routing-controllers";

import HttpStatusError from "../errors/HttpStatusError";
import { HttpStatus } from '../shared/HttpStatus';

@Middleware({ type: "after" })
export class GlobalErrorHandler implements ExpressErrorMiddlewareInterface {

    error(error: Error, request: Request, respose: Response, next: NextFunction): Response {

        if (error instanceof HttpStatusError) {
            return respose
                .status(error.status)
                .json({
                    message: error.message,
                    staus: error.status
                });
        }

        console.error(error);

        return respose
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({
                message: "Internal server error",
                staus: HttpStatus.INTERNAL_SERVER_ERROR
            })
    }
}