import { configureStore } from "@reduxjs/toolkit";
import trainreducer from "./TrainSlice.js";
import bookingreducer from "./BookingSlice.js"
import authReducer from "./authSlice.js"
const store = configureStore({
  reducer: {
    auth:authReducer,
    train: trainreducer,
    book:bookingreducer
  },
});
export default store;
