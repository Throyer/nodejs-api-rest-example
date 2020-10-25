import path from 'path';

import { Express } from "express";
import { useExpressServer } from "routing-controllers";
import { AuthorizationChecker } from "../utils/authorization-checker";
import { CurrentUserChecker } from "../utils/current-user-checker";

export const routes = (app: Express): void => {
    useExpressServer(app, {
        defaultErrorHandler: false,
        validation: true,
        authorizationChecker: AuthorizationChecker,
        currentUserChecker: CurrentUserChecker,
        controllers: [
            path.join(__dirname, '..', '/controllers/**/*{.ts,.js}')
        ],
        middlewares: [
            path.join(__dirname, '..', '/middlewares/**/*{.ts,.js}')
        ]
    });
}