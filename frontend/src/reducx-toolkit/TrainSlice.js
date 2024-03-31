import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  trainarray: [],
  isLoading: false,
  error: false,
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

      toast.success("fetched data successfully");
      console.log("this is a response data :", response.data);
      return response.data;
    } catch (error) {
      toast.error("failed to search train");
    }
  }
);
const trainSlice = createSlice({
  name: "train",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(Searchtrain.fulfilled, (state, action) => {
      state.trainarray = action.payload.resultarray;
      state.isLoading = false;
    });
    builder.addCase(Searchtrain.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(Searchtrain.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});
export default trainSlice.reducer;
export const {} = trainSlice.actions;
