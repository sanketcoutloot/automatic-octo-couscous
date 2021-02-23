import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../config/API";

const initialState = {
  status: "idle",
  error: null,
};

export const sendOTP = createAsyncThunk(
    "login/sendOtp",
    async (userCredentials) => {
      let { data } = await axios.post(
        `https://internal-auth.coutloot.com/auth/sendOTP`,
        userCredentials
      );
      return data;
    }
  );
  
  export const verifyOTP = createAsyncThunk("login/verifyOTP", async (otp) => {
    let { data } = await axios.post(
      "https://internal-auth.coutloot.com/auth/login",
      {
        otp: parseInt(otp),
        mobile: localStorage.getItem("mobile"),, //will be taken from local storage
        otpToken: localStorage.getItem("otpToken"),
      }
    );
    return data;
  });

const allRequestsSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending]: (state, action) => {
      state.status = "loading";
    },
    [login.fulfilled]: (state, action) => {
      const { success, data } = action.payload;
      if (success === 1) {
        state.status = "succeeded";
        state.allRequests = state.allRequests.concat(data);
      } else {
        state.error = data;
      }
    },
    [login.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.data;
    },
  },
});

export default loginSlice.reducer;
