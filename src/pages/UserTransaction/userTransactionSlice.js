import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../config/API";

const initialState = {
  cashoutRequests: [],
  status: "idle",
  error: null,
};

export const fetchUserCashoutRequests = createAsyncThunk(
  "allRequests/fetchAllRequest",
  async (userId) => {
    const { data } = await API.post(`cahsout/getUserCashoutRequests`, {
      userId,
    });

    return data;
  }
);

const userTransactionsSlice = createSlice({
  name: "userTransactions",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUserCashoutRequests.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchUserCashoutRequests.fulfilled]: (state, action) => {
      const { success, data } = action.payload;
      if (success === 1) {
        state.status = "succeeded";
        state.cashoutRequests = state.cashoutRequests.concat(data);
      } else {
        state.error = data;
      }
    },
    [fetchUserCashoutRequests.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.data;
    },
  },
});

export default userTransactionsSlice.reducer;
