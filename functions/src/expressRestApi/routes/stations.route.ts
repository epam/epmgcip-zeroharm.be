import { Router, Request, Response, NextFunction } from "express";
import {
  getDayData,
  getMonthData,
  getSettingsData,
} from "../services/stations.service";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  res.status(200).json("Stations info currently is unavalible");
});

router
  .route("/:stationId")
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { stationId } = req.params;
      const stationSettingsData = await getSettingsData(stationId, next);
      res.status(200).json(stationSettingsData);
    } catch (error) {
      next(error);
    }
  });

router
  .route("/:stationId/day")
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { stationId } = req.params;
      const stationDayData = await getDayData(stationId, next);
      res.status(200).json(stationDayData);
    } catch (error) {
      next(error);
    }
  });

router
  .route("/:stationId/mounth")
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { stationId } = req.params;
      const stationMouthData = await getMonthData(stationId, next);
      res.status(200).json(stationMouthData);
    } catch (error) {
      next(error);
    }
  });

export default router;
