import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  trainarray:  [],
  fromstation: localStorage.getItem("fromstation") || "",
  tostation: localStorage.getItem("tostation") || "",
  seat: [],
  coachwiseprice: {},
  seatcharts: [],
};
export const Searchtrain = createAsyncThunk(
  "train/search",
  async (formdata) => {
    try {
      localStorage.setItem("fromstation", formdata.fromstation);
      localStorage.setItem("tostation", formdata.tostation);
      localStorage.setItem("date",formdata.date)
      console.log("this is a date for formdata ",formdata.date)
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
      // localStorage.setItem("fromstation", formdata.fromstation);
      // localStorage.setItem("tostation", formdata.tostation);
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
    console.log("this is a formdata of seatavailability :", formdata);
    let maindata;
    if (formdata.data) {
      maindata = formdata.data;
      while (maindata.data) {
        maindata = maindata.data;
      }
    } else {
      maindata = formdata;
    }

    try {
      const res = await axios.post(
        `http://localhost:4000/api/Train/getavailability`,
        maindata,

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
export const getseatscharts = createAsyncThunk(
  "/train/seatcharts",
  async (formdata) => {
    console.log("this is formdata: inside the get seatcharts :", formdata);
    let maindata = formdata;
    if (formdata.data) {
      maindata = formdata.date;
      while (maindata.data) {
        maindata = maindata.data;
      }
    } else {
      maindata = formdata;
    }
    try {
      const res = await axios.post(
        `http://localhost:4000/api/Train/assignseat`,
        formdata,
        {
          withCredentials: true,
        }
      );
      toast.success("fetched seatcharts successfully");
      return res.data;
    } catch (error) {
      toast.error(error?.message || "failed to fecth seat charts ");
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
    });
    builder.addCase(getseatavailabilityprev.fulfilled, (state, action) => {
      state.trainarray = action?.payload?.availablecounts;
    });
    builder.addCase(getseatavailabilitynext.fulfilled, (state, action) => {
      state.seat = action?.payload?.availablecounts;
    });
    builder.addCase(getseatscharts.fulfilled, (state, action) => {
      state.seatcharts = action?.payload?.array;
    });
  },
});
export default trainSlice.reducer;
export const {} = trainSlice.actions;
