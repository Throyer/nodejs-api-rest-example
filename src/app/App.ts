import bodyParser from "body-parser";
import express from "express";
import "reflect-metadata";
import { useExpressServer } from "routing-controllers";
import { createConnection } from "typeorm";

export default function start() {
    const port = 8080;
    const version = 1;

    createConnection().then(() => {
        const app = express();

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        useExpressServer(app, { routePrefix: "/api", controllers: [__dirname + "/src/app/controllers/*.ts"] });

        app.listen(port, () => console.info(`started on http://localhost:${port}/api/v${version}`));
    })
}
