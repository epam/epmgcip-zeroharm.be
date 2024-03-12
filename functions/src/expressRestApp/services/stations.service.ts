import axios from "axios";
import { Request, Response } from "express";

export const getData = async (req: Request, res: Response, path: string) => {
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
