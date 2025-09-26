import { Router } from "express";

import {
  getLiveTrainStatus,
  getPNRStatus,
  getTrainSchedule,
  searchTrains,
} from "../controller/pdf-gen.controller";

const router = Router();

router.route("/search-train").get(searchTrains);
router.route("/live-train-status").get(getLiveTrainStatus);
router.route("/pnr-status/:pnr").get(getPNRStatus);
router.route("/train-schedule/:trainNumber").get(getTrainSchedule);

export default router;
