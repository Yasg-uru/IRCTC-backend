import express from "express"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import BookingRouter from "./router/Booking.router.js"
import TrainRouter from "./router/Train.router.js"
const app=express()
app.use(express.json())
app.use(bodyParser.json())
app.use(cookieParser())
app.use("/api/Train",TrainRouter)
app.use("/api/Book",BookingRouter)

export default app