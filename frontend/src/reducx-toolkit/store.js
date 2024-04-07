import { configureStore } from "@reduxjs/toolkit";
import trainreducer from "./TrainSlice.js";
import bookingreducer from "./BookingSlice.js"
const store = configureStore({
  reducer: {
    train: trainreducer,
    book:bookingreducer
  },
});
export default store;
