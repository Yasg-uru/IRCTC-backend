import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  bookingdata: {},
};
export const bookingticket = createAsyncThunk(
  "/booking/ticket",
  async (formdata) => {
    try {
      const res = await axios.post(
        `http://localhost:4000/api/Book/seatBooking`,
        formdata,
        {
          withCredentials: true,
        }
      );
      toast.success("Ticket Booked successfully");
      return res.data;
    } catch (error) {
      toast.error(error?.message || "failed to book ticket ");
    }
  }
);

const BookingSlice = createSlice({
  name: "booking",

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
