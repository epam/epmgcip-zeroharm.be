import express from "express";
import { getData } from "../services/stations.service";

const router = express.Router();

router.get("/month", async (req, res) => {
  await getData(req, res, "month");
});

router.get("/day", async (req, res) => {
  await getData(req, res, "day");
});

router.get("/settings", async (req, res) => {
  await getData(req, res, "settings");
});

export default router;
