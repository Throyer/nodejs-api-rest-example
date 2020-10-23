import "reflect-metadata";

import express from "express";
import cors from "cors";

import { routes } from "./routes";
import { started } from "./utils/started";

import "./database";

const app = express();

app.use(cors());
app.use(express.json())

routes(app)

app.listen(8080, () => started(8080));