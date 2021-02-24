import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/API";

const initialState = {
  status: "idle",
  isAuthenticated: true,
  error: null,
};

export const sendOTP = createAsyncThunk(
  "login/sendOtp",
  async (userCredentials) => {
    let { data } = await axios.post(
      `https://internal-auth.coutloot.com/auth/sendOTP`,
      userCredentials
    );

    localStorage.setItem("otpToken", data.otpToken);

    return data;
  }
);

export const verifyOTP = createAsyncThunk("login/verifyOTP", async (otp) => {
  let { data } = await axios.post(
    "https://internal-auth.coutloot.com/auth/login",
    {
      otp: parseInt(otp),
      mobile: localStorage.getItem("mobile"), //will be taken from local storage
      otpToken: localStorage.getItem("otpToken"),
    }
  );
  return data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [sendOTP.pending]: (state, action) => {
      state.status = "loading";
    },
    [sendOTP.fulfilled]: (state, action) => {
      const { success, data } = action.payload;
      if (success === 1) {
        state.status = "succeeded";
        state.allRequests = state.allRequests.concat(data);
      } else {
        state.error = data;
      }
    },
    [sendOTP.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.data;
    },

    //verify OTP
    [verifyOTP.pending]: (state, action) => {
      state.status = "loading";
    },
    [verifyOTP.fulfilled]: (state, action) => {
      const { success, data } = action.payload;
      if (success === 1) {
        state.isAuthenticated = true;
      } else {
        state.error = data;
      }
    },
    [verifyOTP.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.data;
    },
  },
});

export default authSlice.reducer;
