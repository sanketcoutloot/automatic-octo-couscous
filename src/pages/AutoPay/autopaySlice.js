import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../config/API";
import axios from "axios";

const initialState = {
  allQueuedRequests: [],
  addRequestToAutoPayQueueStatus: "idle",
  allQueuedRequestsStatus: "idle",
  sendOtpToSignedInUserStatus: "idle",
  verifyOTPStatus: "idle",

  autoPayHistoryStatus: "idle",
  autoPayHistory: [],
  error: null,
};

//history API fetchAutoPayHistory

export const fetchAutoPayHistory = createAsyncThunk(
  "autoPay/fetchAutoPayHistory",
  async (pageNo) => {
    let { data } = await API.get(`/cashout/getAutopayHistory/${pageNo}`);
    return data;
  }
);

export const addRequestToAutoPayQueue = createAsyncThunk(
  "autoPay/addRequestToAutoPayQueue",
  async (body) => {
    let { data } = await API.post(`/cashout/addToAutopayQueued`, body);
    return data;
  }
);

export const fetchAllQueuedRequests = createAsyncThunk(
  "autoPay/allQueuedRequests",
  async (pageNumber = 0) => {
    let { data } = await API.get(`/cashout/getAutopayQueued/${pageNumber}`);
    return data;
  }
);

export const sendOtpToSignedInUser = createAsyncThunk(
  "autoPay/sendOtpToSignedInUser",
  async () => {
    let { data } = await axios.post(
      `https://internal-auth.coutloot.com/auth/sendOTP`,
      {
        email: "sanket@coutloot.com",
        mobile: 9405945413,
      }
    );
    return data;
  }
);

export const verifyOTP = createAsyncThunk("autoPay/verifyOTP", async (otp) => {
  let { data } = await axios.post(
    "https://internal-auth.coutloot.com/auth/login",
    {
      otp: parseInt(otp),
      mobile: "9405945413", //will be taken from local storage
      otpToken: localStorage.getItem("otpToken"),
    }
  );
  return data;
});

export const transferMoney = createAsyncThunk(
  "autoPay/transferMoney",
  async (transferDetails) => {
    let { data } = await API.post(`paytm/moneyTransfer`, transferDetails);

    return data;
  }
);

const autoPaySlice = createSlice({
  name: "autoPay",
  initialState,
  reducers: {},
  extraReducers: {
    //autopay history
    [fetchAutoPayHistory.pending]: (state, action) => {
      state.autoPayHistoryStatus = "loading";
    },
    [fetchAutoPayHistory.fulfilled]: (state, action) => {
      const { success, data } = action.payload;
      if (success === 1) {
        state.autoPayHistoryStatus = "succeeded";
        state.autoPayHistory = [...state.autoPayHistory, ...data];
      } else {
        state.autoPayHistoryStatus = "failed";
        state.error = action.payload;
      }
    },
    [fetchAutoPayHistory.rejected]: (state, action) => {
      state.autoPayHistoryStatus = "failed";
      state.error = action.payload.data;
    },

    //addRequestToAutoPayQueue
    [addRequestToAutoPayQueue.pending]: (state, action) => {
      state.addRequestToAutoPayQueueStatus = "loading";
    },
    [addRequestToAutoPayQueue.fulfilled]: (state, action) => {
      const { success } = action.payload;
      if (success === 1) {
        state.addRequestToAutoPayQueueStatus = "succeeded";
      } else {
        state.addRequestToAutoPayQueueStatus = "failed";
        state.error = action.payload;
      }
    },
    [addRequestToAutoPayQueue.rejected]: (state, action) => {
      state.addRequestToAutoPayQueueStatus = "failed";
      state.error = action.payload;
    },

    //fetch all queued request
    [fetchAllQueuedRequests.pending]: (state, action) => {
      state.allQueuedRequestsStatus = "loading";
    },
    [fetchAllQueuedRequests.fulfilled]: (state, action) => {
      const { success, data } = action.payload;
      if (success === 1) {
        state.allQueuedRequestsStatus = "succeeded";
        state.allQueuedRequests = state.allQueuedRequests.concat(data);
      } else {
        state.allQueuedRequestsStatus = "failed";
        state.error = action.payload.data;
      }
    },
    [fetchAllQueuedRequests.rejected]: (state, action) => {
      state.allQueuedRequestsStatus = "failed";
      state.error = action.payload.data;
    },

    //send OTP
    [sendOtpToSignedInUser.pending]: (state, action) => {
      state.sendOtpToSignedInUserStatus = "loading";
    },
    [sendOtpToSignedInUser.fulfilled]: (state, action) => {
      const { success, otpToken } = action.payload;
      if (success === 1) {
        state.sendOtpToSignedInUserStatus = "succeeded";
        localStorage.setItem("otpToken", otpToken);
      } else {
        state.sendOtpToSignedInUserStatus = "failed";
        state.error = action.payload;
      }
    },
    [sendOtpToSignedInUser.rejected]: (state, action) => {
      state.sendOtpToSignedInUserStatus = "failed";
      state.error = action.payload.data;
    },

    //verify otp
    [verifyOTP.pending]: (state, action) => {
      state.verifyOTPStatus = "loading";
    },
    [verifyOTP.fulfilled]: (state, action) => {
      const { success, otpToken } = action.payload;
      if (success === 1) {
        localStorage.setItem("otpToken", otpToken);
        state.verifyOTPStatus = "succeeded";
      } else {
        state.verifyOTPStatus = "failed";
        state.error = action.payload;
      }
    },
    [verifyOTP.rejected]: (state, action) => {
      state.verifyOTPStatus = "failed";
      state.error = action.payload.data;
    },

    //send bankdetails for vareification
  },
});

export default autoPaySlice.reducer;
