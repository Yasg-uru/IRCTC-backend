import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedin") || false,

  role: "",
};
export const signup = createAsyncThunk("/user/register", async (formdata) => {
  try {
    const res = await axios.post(
      `http://localhost:4000/api/user/register`,
      formdata,
      {
        withCredentials: true,
      }
    );
    toast.success("Your account Created successfully");
    return res.data;
  } catch (error) {
    toast.error(error?.message || "failed to create new Account ");
  }
});
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (state, action) => {
      localStorage.setItem("isLoggedin", true);
      state.isLoggedIn = true;
    });
  },
});
export const {} = authSlice.actions;
export default authSlice.reducer;
