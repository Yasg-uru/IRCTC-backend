import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  trainarray: [],
  fromstation: localStorage.getItem("fromstation") || "",
  tostation: localStorage.getItem("tostation") || "",
  seat: [],
  coachwiseprice: {},
};
export const Searchtrain = createAsyncThunk(
  "train/search",
  async (formdata) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/Train/search`,
        formdata,
        {
          withCredentials: true,
        }
      );
      console.log("this is formdata:", formdata);

      toast.success("fetched data successfully");
      console.log("this is a response data :", response.data);
      return response.data;
    } catch (error) {
      toast.error("failed to search train");
    }
  }
);

export const getpricecoachwise = createAsyncThunk(
  "/train/price",
  async (formdata) => {
    console.log("this is a price formdata :", formdata);
    try {
      const response = await axios.post(
        `http://localhost:4000/api/Train/price/ticket`,
        formdata,
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("fromstation", formdata.fromstation);
      localStorage.setItem("tostation", formdata.tostation);
      toast.success("searched successfully");
      return response.data;
    } catch (error) {
      toast.error("failed to fetch price");
    }
  }
);
export const getseatavailability = createAsyncThunk(
  "/train/availability",
  async (formdata) => {
    console.log("this is a formdata of seatavailability :",formdata)
    try {
      const res = await axios.post(
        `http://localhost:4000/api/Train/getavailability`,
        formdata,

        {
          withCredentials: true,
        }
      );
      console.log(
        "this is a formdata inside the getseatavailability :",
        formdata
      );
      toast.success("fetched availabilty of seats ");
      return res.data;
    } catch (error) {
      toast.error(error?.message || "failed to fetch availability of seats ");
    }
  }
);
export const getseatavailabilityprev = createAsyncThunk(
  "/train/availability/prev",
  async (formdata) => {
    try {
      const res = await axios.post(
        `http://localhost:4000/api/Train/getavailability?previousdate=true`,
        formdata,

        {
          withCredentials: true,
        }
      );
      console.log(
        "this is a formdata inside the getseatavailability :",
        formdata
      );
      toast.success("fetched availabilty of seats ");
      return res.data;
    } catch (error) {
      toast.error(error?.message || "failed to fetch availability of seats ");
    }
  }
);
export const getseatavailabilitynext = createAsyncThunk(
  "/train/availability/next",
  async (formdata) => {
    try {
      const res = await axios.post(
        `http://localhost:4000/api/Train/getavailability?nextdate=true`,
        formdata,

        {
          withCredentials: true,
        }
      );
      console.log(
        "this is a formdata inside the getseatavailability :",
        formdata
      );
      toast.success("fetched availabilty of seats ");
      return res.data;
    } catch (error) {
      toast.error(error?.message || "failed to fetch availability of seats ");
    }
  }
);
const trainSlice = createSlice({
  name: "train",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(Searchtrain.fulfilled, (state, action) => {
      localStorage.setItem("trainarray", action?.payload?.resultarray);
      state.trainarray = action?.payload?.resultarray;
    });
    builder.addCase(getpricecoachwise.fulfilled, (state, action) => {
      state.coachwiseprice = action?.payload?.price;
    });
    builder.addCase(getseatavailability.fulfilled, (state, action) => {
      state.seat = action?.payload?.arrayofseats;
    })
    builder.addCase(getseatavailabilityprev.fulfilled,(state,action)=>{
      state.trainarray=action?.payload?.availablecounts
    })
    builder.addCase(getseatavailabilitynext.fulfilled,(state,action)=>{
      state.seat=action?.payload?.availablecounts
    })
  },
});
export default trainSlice.reducer;
export const {} = trainSlice.actions;
