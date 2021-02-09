import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../config/API";

const initialState = {
  cashoutRequests: [],
  moneyLogs: [],
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
  async (userId) => {
    const { data } = await API.post(`moneyLog/getMoneyLogs`, {
      searchText: userId,
      searchType: "USERID",
      pageNo: 0,
    });
    return data;
  }
);

const userTransactionsSlice = createSlice({
  name: "userTransactions",
  initialState,
  reducers: {},
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
  },
});

export default userTransactionsSlice.reducer;
