import { configureStore } from "@reduxjs/toolkit";
import trainreducer from "./TrainSlice.js";
const store = configureStore({
  reducer: {
    train: trainreducer,
  },
});
export default store;
