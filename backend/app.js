import express from "express"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import cors from "cors"
import BookingRouter from "./router/Booking.router.js"
import TrainRouter from "./router/Train.router.js"
import userRouter from "./router/user.route.js"

const app=express()
app.use(cors({
    origin:"https://irctc-backend-mmjp.vercel.app",
    credentials:true

}))
app.use(express.json())
app.use(cookieParser());
app.use(bodyParser.json())
app.use(cookieParser())
app.get('/', (req, res) => {
    res.send('PONG')
});
app.use("/api/user",userRouter)
app.use("/api/Train",TrainRouter)
app.use("/api/Book",BookingRouter)

export default app