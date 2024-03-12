import dotenv from "dotenv";
import express from "express";
import * as functions from "firebase-functions";
import stationsRoutes from "./routes/route.service.ts";
import handleException from "./middleware/uncaughtErrorsHandler";
import errorHandler from "./middleware/unhandledErrorsHandler";

dotenv.config();

const app = express();

app.use(express.json());

handleException();

app.use("/", stationsRoutes);

app.use(errorHandler);

exports.app = functions.https.onRequest(app);
