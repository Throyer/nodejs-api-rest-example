import { Express } from "express";
import { useExpressServer } from "routing-controllers";

export const routes = (app: Express): void => {
    useExpressServer(app, {
        validation: true,
        routePrefix: "/api",
        controllers: [__dirname + "/controllers/**/*.ts"]
    });
}