import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../config/API";

const initialState = {
  cashoutRequests: [],
  moneyLogs: [],
  bankAccounts: [],
  currentCashoutRequest: [],
  status: "idle",
  error: null,
};

export const fetchCashoutRequests = createAsyncThunk(
  "user/fetchCashoutRequests",
  async (userId) => {
    const { data } = await API.post(`cahsout/getUserCashoutRequests`, {
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
    const { data } = await API.post(`cahsout/getUserBankDetails`, {
      userId,
    });
    return data;
  }
);

export const fetchCurrentCashoutRequest = createAsyncThunk(
  "user/fetchCurrentCashoutRequest",
  async (userId) => {
    // const { data } = await API.post(`cahsout/currentCashoutRequest`, {
    //   userId,
    // });

    const { data } = await API.post(`cahsout/getUserCashoutRequests`, {
      userId,
    });
    console.log("Fdetching the current cashout Details ");
    return data;
  }
);

export const markCashoutRequestComplete = createAsyncThunk(
  "user/markCashoutRequestComplete",
  async (userId) => {
    const { data } = await API.post(`cahsout/markComplete`, {
      userId: 800100,
      requestId: 62301,
      requestedAmt: 35,
      cashoutBalance: 45,
      requestedBy: 800100,
      requestMode: "BANK",
    });
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
  },
  extraReducers: {
    // cashout request reducers
    [fetchCashoutRequests.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchCashoutRequests.fulfilled]: (state, action) => {
      const { success, data } = action.payload;
      if (success === 1) {
        state.status = "succeeded";
        state.cashoutRequests = state.cashoutRequests.concat(data);
      } else {
        state.error = data;
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
        state.error = data;
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
        state.error = data;
      }
    },
    [fetchBankAccounts.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.data;
    },

    // Current CashOut request
    [fetchCurrentCashoutRequest.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchCurrentCashoutRequest.fulfilled]: (state, action) => {
      const { success, data } = action.payload;
      if (success === 1) {
        state.status = "succeeded";
        state.currentCashoutRequest = [{ ...data[0] }];
      } else {
        state.error = data;
      }
    },
    [fetchCurrentCashoutRequest.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.data;
    },

    //mark as complete
    [markCashoutRequestComplete.pending]: (state, action) => {
      state.status = "loading";
    },
    [markCashoutRequestComplete.fulfilled]: (state, action) => {
      const { success, data } = action.payload;
      if (success === 1) {
        state.status = "succeeded";
        // state.currentCashoutRequest = [{ ...data[0] }];
        console.log("The trransaction has been marked completed ", data);
      } else {
        state.error = data;
      }
    },
    [markCashoutRequestComplete.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.data;
    },
  },
});

export const { clearCurrentCashoutRequest } = userTransactionsSlice.actions;

export default userTransactionsSlice.reducer;
