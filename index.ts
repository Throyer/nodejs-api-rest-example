import bodyParser from "body-parser";
import express from "express";
import "reflect-metadata";
import { useExpressServer } from "routing-controllers";
import { createConnection } from "typeorm";

const port = 8080;

createConnection()
    .then(() => {
        const app = express();

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        useExpressServer(app, {
            validation: true,
            routePrefix: "/api",
            controllers: [__dirname + "/src/app/controllers/*.ts"]
        });

        app.listen(port, () => console.info(`started on http://localhost:${port}/api`));
    })
    .catch(error => console.error(error));