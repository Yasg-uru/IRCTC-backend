import express from "express"
import { CreateBooking, getavailableseatcounts ,} from "../controller/Booking.controller.js"
const router=express.Router()
router.route('/seatBooking').post(CreateBooking);
router.route('/getavailable-seats').post(getavailableseatcounts)
export default router