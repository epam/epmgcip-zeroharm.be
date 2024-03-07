import dotenv from "dotenv";
import axios from "axios";
import express = require("express");
import functions = require("firebase-functions");

dotenv.config();

const app = express();

const getData = async (
  req: express.Request,
  res: express.Response,
  path: string
) => {
  const url = `https://meteoapi.meteo.uz/api/atmosphere/horiba/${path}`;
  const username = process.env.USERNAMEAPI!;
  const password = process.env.PASSWORDAPI!;

  try {
    const response = await axios.get(url, {
      auth: {
        username,
        password,
      },
    });
    res.send(response.data);
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).send("An error occurred while trying to fetch the data.");
  }
};

app.get("/month", async (req, res) => {
  await getData(req, res, "month");
});
app.get("/day", async (req, res) => {
  await getData(req, res, "day");
});
app.get("/settings", async (req, res) => {
  await getData(req, res, "settings");
});

exports.app = functions.https.onRequest(app);
