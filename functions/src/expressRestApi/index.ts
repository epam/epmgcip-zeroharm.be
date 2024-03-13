import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import * as functions from "firebase-functions";
import stationsRoutes from "./routes/stations.route";
import handleException from "./middleware/uncaughtErrorsHandler";
import errorHandler from "./middleware/unhandledErrorsHandler";

dotenv.config();

const app = express();

app.use(express.json());

handleException();

app.use("/", (req: Request, res: Response, next: NextFunction): void => {
  if (req.originalUrl === "/") {
    res.send("Service is running!");
    return;
  }
  next();
});

app.use("/stations", stationsRoutes);

app.use(errorHandler);

exports.app = functions.https.onRequest(app);
