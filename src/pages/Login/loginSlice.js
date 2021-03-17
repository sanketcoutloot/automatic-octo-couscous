import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/API";

const initialState = {
  status: "idle",
  isAuthenticated: false,
  sendOTPStatus: null,
  verifyOTPStatus: null,
  error: null,
  authToken: null,
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
      const { success, data, errMessage } = action.payload;
      if (success === 1) {
        state.sendOTPStatus = "succeeded";
      } else {
        state.sendOTPStatus = "failed";
        state.error = errMessage;
      }
    },
    [sendOTP.rejected]: (state, action) => {
      state.sendOTPStatus = "failed";
      state.error = action.payload.errMessage;
    },

    //verify OTP
    [verifyOTP.pending]: (state, action) => {
      state.status = "loading";
    },
    [verifyOTP.fulfilled]: (state, action) => {
      const { success, loggedInUser, token, errMessage } = action.payload;
      if (success === 1) {
        localStorage.setItem("token", token);
        state.authToken = token;
        state.verifyOTPStatus = "succeed";
        state.isAuthenticated = true;
      } else {
        state.verifyOTPStatus = "failed";
        state.error = errMessage;
      }
    },
    [verifyOTP.rejected]: (state, action) => {
      state.verifyOTPStatus = "failed";
      state.error = action.payload.errMessage;
    },
  },
});

export default authSlice.reducer;
