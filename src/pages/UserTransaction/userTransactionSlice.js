import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../config/API";

const initialState = {
  cashoutRequests: [],
  cashoutRequestsStatus: "idle",
  cashoutRequestsError: null,

  moneyLogs: [],
  moneyLogsStatus: "idle",
  moneyLogsError: null,

  bankAccounts: [],
  bankAccountsStatus: "idle",
  bankAccountsError: null,

  currentCashoutRequest: {},
  currentCashoutStatus: "idle",
  currentCashoutError: null,

  bankVerificationRequest: {},
  bankVerificationStatus: "idle",
  bankVerificationError: null,
};

export const fetchCashoutRequests = createAsyncThunk(
  "user/fetchCashoutRequests",
  async (userId) => {
    const { data } = await API.post(`cashout/getUserCashoutRequests`, {
      userId,
    });
    return data;
  }
);

export const fetchMoneyLogs = createAsyncThunk(
  "user/fetchMoneyLogs",
  async (userId, pageNumber = 0) => {
    const { data } = await API.post(`moneyLog/getMoneyLogs`, {
      searchText: userId,
      searchType: "USERID",
      pageNo: pageNumber,
    });
    return data;
  }
);

export const fetchBankAccounts = createAsyncThunk(
  "user/fetchBankAccounts",
  async (userId) => {
    const { data } = await API.post(`cashout/getUserBankDetails`, {
      userId,
    });
    return data;
  }
);

export const fetchCurrentCashoutRequest = createAsyncThunk(
  "user/fetchCurrentCashoutRequest",
  async (userId) => {
    const { data } = await API.post(`cashout/getUserCurrentRequest`, {
      userId,
    });
    return data;
  }
);

export const markCashoutRequestComplete = createAsyncThunk(
  "user/markCashoutRequestComplete",
  async (body) => {
    const { data } = await API.post(`cashout/markComplete`, body);
    return data;
  }
);

export const verifyBankDetails = createAsyncThunk(
  "user/verifyBankDetails",
  async (bankDetails) => {
    const { data } = await API.post(
      `paytm/bankAccountVerification`,
      bankDetails
    );
    return data;
  }
);

const userTransactionsSlice = createSlice({
  name: "userTransactions",
  initialState,
  reducers: {
    clearCurrentCashoutRequest: (state) => {
      state.cashoutRequests = [];
      state.moneyLogs = [];
      state.bankAccounts = [];
      state.currentCashoutRequest = [];
    },

    setStatusToIdle: (state, action) => {
      state[action.payload] = "idle";
    },
  },
  extraReducers: {
    // cashout request reducers
    [fetchCashoutRequests.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchCashoutRequests.fulfilled]: (state, action) => {
      const { success, data } = action.payload;
      if (success === 1) {
        state.cashoutRequestsStatus = "succeeded";
        state.cashoutRequests = state.cashoutRequests.concat(data);
      } else {
        state.cashoutRequestsStatus = "failed";
        state.cashoutRequestsError = action.payload.errMessage;
      }
    },
    [fetchCashoutRequests.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.data;
    },

    // ++++ money log reducers
    [fetchMoneyLogs.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchMoneyLogs.fulfilled]: (state, action) => {
      const { success, data } = action.payload;
      if (success === 1) {
        state.status = "succeeded";
        let resData = data;
        if (!Array.isArray(resData)) {
          resData = [resData];
        }
        state.moneyLogs = state.moneyLogs.concat(resData);
      } else {
        state.moneyLogsStatus = "failed";
        state.moneyLogsError = action.payload.errMessage;
      }
    },
    [fetchMoneyLogs.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.data;
    },

    // BANK DETAILS
    [fetchBankAccounts.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchBankAccounts.fulfilled]: (state, action) => {
      const { success, data } = action.payload;
      if (success === 1) {
        state.status = "succeeded";
        let resData = data;
        if (!Array.isArray(resData)) {
          resData = [resData];
        }
        state.bankAccounts = state.bankAccounts.concat(resData);
      } else {
        state.bankAccountsStatus = "failed";
        state.bankAccountsError = action.payload.errMessage;
      }
    },
    [fetchBankAccounts.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.data;
    },

    // Current CashOut request
    [fetchCurrentCashoutRequest.pending]: (state, action) => {
      state.currentCashoutStatus = "loading";
    },
    [fetchCurrentCashoutRequest.fulfilled]: (state, action) => {
      const { success, data, errMessage } = action.payload;
      console.log("user's current cashout request ", action.payload);
      if (success === 1) {
        state.currentCashoutStatus = "succeeded";
        state.currentCashoutRequest = { ...data };
      } else {
        state.currentCashoutStatus = "failed";
        state.currentCashoutError = errMessage;
      }
    },
    [fetchCurrentCashoutRequest.rejected]: (state, action) => {
      const { errMessage } = action.payload;
      state.currentCashoutStatus = "failed";
      state.currentCashoutError = errMessage;
    },

    //mark as complete
    [markCashoutRequestComplete.pending]: (state, action) => {
      state.status = "loading";
    },
    [markCashoutRequestComplete.fulfilled]: (state, action) => {
      const { success, data } = action.payload;
      if (success === 1) {
        state.status = "succeeded";
      } else {
        state.error = data;
      }
    },
    [markCashoutRequestComplete.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.data;
    },

    //Bank verification
    [verifyBankDetails.pending]: (state, action) => {
      state.bankAccountsStatus = "loading";
    },
    [verifyBankDetails.fulfilled]: (state, action) => {
      const { success, data } = action.payload;
      if (success === 1) {
        state.bankAccountsStatus = "succeeded";
      } else {
        state.bankVerificationError = data;
      }
    },
    [verifyBankDetails.rejected]: (state, action) => {
      state.bankAccountsStatus = "failed";
      state.bankVerificationError = action.payload.data;
    },
  },
});

export const {
  clearCurrentCashoutRequest,
  setStatusToIdle,
} = userTransactionsSlice.actions;

export default userTransactionsSlice.reducer;
