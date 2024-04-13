import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import BookingRouter from "./router/Booking.router.js";
import TrainRouter from "./router/Train.router.js";
import userRouter from "./router/user.route.js";
import { errorHandlerMiddleware } from "./utils/Errorhandler.utils.js";
const app = express();
app.use(
  cors({
    origin: "https://irctc-backend-mmjp.vercel.app",
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(errorHandlerMiddleware);

app.use("/api/user", userRouter);
app.use("/api/Train", TrainRouter);
app.use("/api/Book", BookingRouter);

export default app;
