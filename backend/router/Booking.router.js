import express from "express"
import { CreateBooking, getavailableseatcounts, vacant_booked_seat_charts ,} from "../controller/Booking.controller.js"
const router=express.Router()
router.route('/seatBooking').post(CreateBooking);
router.route('/getavailable-seats').post(getavailableseatcounts);
router.route('/seatchart').get(vacant_booked_seat_charts)
export default router