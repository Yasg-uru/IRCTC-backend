import express from "express";
import {
  assignseatsforallcoaches,
  create_Train,
  getAvailableSeatCountsForAllCoachTypes,
  getcostofticket,
  searchtrainbyorigintodestination,
} from "../controller/Train.controller.js";
const router = express.Router();

router.route("/create").post(create_Train);
router.route("/search").get(searchtrainbyorigintodestination);
router.route("/getavailability").get(getAvailableSeatCountsForAllCoachTypes);
router.route("/price/ticket").get(getcostofticket)
router.route("/assignseat").get(assignseatsforallcoaches)
export default router;
