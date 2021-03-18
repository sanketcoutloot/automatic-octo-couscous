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
  async (body) => {
    let { data } = await API.post(`/paytm/moneyInitiate`, body);
    return data;
  }
);

export const verifyOTP = createAsyncThunk("autoPay/verifyOTP", async (otp) => {
  let { data } = await API.post(`/paytm/approveTransfer`, {
    otp: parseInt(otp),
    requestId: localStorage.getItem("requestId"),
    authToken: localStorage.getItem("authToken"),
  });
  return data;
});

const autoPaySlice = createSlice({
  name: "autoPay",
  initialState,
  reducers: {
    cleanUpOTP: (state, action) => {
      state.sendOtpToSignedInUserStatus = "idle";
    },

    setAutoPayStatusToIdle: (state) => {
      state.addRequestToAutoPayQueueStatus = "idle";
    },
  },
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
      const { success, data } = action.payload;
      if (success === 1) {
        localStorage.setItem("requestId", data.requestId);
        localStorage.setItem("authToken", data.authToken);
        state.sendOtpToSignedInUserStatus = "succeeded";
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
      const { success, otpToken, errMessage } = action.payload;
      if (success === 1) {
        console.log("WE ARE HEAR");
        state.verifyOTPStatus = "succeeded";
      } else {
        state.verifyOTPStatus = "failed";
        state.error = errMessage;
      }
    },
    [verifyOTP.rejected]: (state, action) => {
      state.verifyOTPStatus = "failed";
      state.error = action.payload.data;
    },
  },
});

export const { cleanUpOTP, setAutoPayStatusToIdle } = autoPaySlice.actions;

export default autoPaySlice.reducer;
