import { NextFunction } from "express";
import axios from "axios";
import "dotenv";

const getApiData = async (Endpoint: string, id: string, next: NextFunction) => {
  const url = `https://meteoapi.meteo.uz/api/atmosphere/${id}/${Endpoint}`;
  try {
    const response = await axios.get(url, {
      auth: {
        username: process.env.USERNAMEAPI!,
        password: process.env.PASSWORDAPI!,
      },
    });
    return response.data;
  } catch (error) {
    next(error);
  }
};

export const getDayData = (id: string, next: NextFunction) =>
  getApiData("day", id, next);

export const getMonthData = (id: string, next: NextFunction) =>
  getApiData("month", id, next);

export const getSettingsData = (id: string, next: NextFunction) =>
  getApiData("settings", id, next);
