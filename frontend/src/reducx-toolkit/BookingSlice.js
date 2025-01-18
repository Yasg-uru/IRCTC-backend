import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  bookingdata: {},
};
export const bookingticket = createAsyncThunk(
  "/booking/ticket",
  async (formdata) => {
    console.log("this is a formdate for ticket booking :", formdata);
    try {
      const res = await axios.post(
        `https://irctc-backend.vercel.app/api/Book/seatBooking`,
        formdata,
        {
          withCredentials:true
        }
      );
      toast.success("Ticket Booked successfully");
      return res.data;
    } catch (error) {
      toast.error(error.response.data.error || "Failed to search train");
      throw error;
    }
  }
);

const BookingSlice = createSlice({
  name: "book",

  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(bookingticket.fulfilled, (state, action) => {
      //now storing the booking data in localstorage for state persisting
      localStorage.setItem("booking", JSON.stringify(action?.payload?.booking));

      state.bookingdata = action?.payload?.booking;
    });
  },
});
export default BookingSlice.reducer;
export const {} = BookingSlice.actions;
