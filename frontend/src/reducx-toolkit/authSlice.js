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
export const login = createAsyncThunk("/auth/login", async (formdata) => {
  try {
    const res = await axios.post(
      "http://localhost:4000/api/user/login",
      formdata,
      {
        withCredentials: true,
      }
    );
    toast.success("logged in successfully");
    return res.data;
  } catch (error) {
    toast.error(error?.message || "failed to login please try again ");
  }
});
export const me = createAsyncThunk("/auth/me", async () => {
  try {
    const res = await axios.get("http://localhost:4000/api/user/me", {
      withCredentials: true,
    });
    toast.success("fechted your profile successfully ");
    return res.data;
  } catch (error) {
    toast.error(error?.message || "failed to fetch your profile data ");
  }
});
export const forgotpassword = createAsyncThunk(
  "/auth/forgotpassword",
  async (email) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/user/forgotpassword",
        { email },
        {
          withCredentials: true,
        }
      );
      toast.success("mail sent");
      return res.data;
    } catch (error) {
      toast.error(
        error?.message || "failed to sent mail please try again later"
      );
    }
  }
);
export const resetpassword = createAsyncThunk(
  "/auth/resetpassword",
  async (formdata) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/user/resetpassword",
        formdata,
        {
          withCredentials: true,
        }
      );
      toast.success("'touur passwword resettedd successfully");
      return res.data;
    } catch (error) {
      toast.error(
        error?.message || "failed to reset passord please try again later"
      );
    }
  }
);
export const updatepassword = createAsyncThunk(
  "/auth/upadtepassword",
  async (formdata) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/user/updatepassword",
        formdata,
        {
          withCredentials: true,
        }
      );
      toast.success("password updated successfully");
      return res.data;
    } catch (error) {
      toast.error(error?.message || "failed to update password ");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (state, action) => {
      localStorage.setItem("isLoggedin", true);
      state.isLoggedIn = true;
      state.role = action?.payload?.user?.role;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      localStorage.setItem("isLoggedin", true);
      state.isLoggedIn = true;
      state.role = action?.payload?.user?.role;
    });
  },
});
export const {} = authSlice.actions;
export default authSlice.reducer;
