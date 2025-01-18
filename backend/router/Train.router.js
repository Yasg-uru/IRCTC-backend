import express from "express";
import {
  assignseatsforallcoaches,
  create_Train,
  getAvailableSeatCountsForAllCoachTypes,
  getcostofticket,
  gettrains,
  searchtrainbyorigintodestination,
  getstation_list,
  getTrains,
} from "../controller/Train.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
const router = express.Router();

router.route("/create").post(create_Train);
router.route("/search").post(searchtrainbyorigintodestination);
router.route("/stationlist").get(getstation_list);
router.route("/getavailability").post(getAvailableSeatCountsForAllCoachTypes);
router.route("/price/ticket").post(getcostofticket);
router.route("/assignseat").post(assignseatsforallcoaches);
router.route("/get").get(gettrains);
router.get("/get-trains", getTrains);

export default router;
