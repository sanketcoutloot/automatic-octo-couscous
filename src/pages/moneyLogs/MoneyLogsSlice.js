import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/API";

const initialState = {
  moneyLogsStatus: "idle",
  moneyLogs: null,
  error: null,
};

export const moneyLogs = createAsyncThunk(
  "moneyLogs/getMoneyLogs",
  async (searchText, pageNo = 0) => {
    let { data } = await API.post(`moneyLog/getMoneyLogs/${pageNo}`, {
      searchText,
      searchType: "USERID",
    });
    return data;
  }
);

const moneyLogsSlice = createSlice({
  name: "moneyLogs",
  initialState,
  reducers: {},
  extraReducers: {
    [moneyLogs.pending]: (state, action) => {
      state.status = "loading";
    },
    [moneyLogs.fulfilled]: (state, action) => {
      const { success, data } = action.payload;
      if (success === 1) {
        state.moneyLogsStatus = "succeeded";
        state.moneyLogs = state.allRequests.concat(data);
      } else {
        state.moneyLogsStatus = "failed";
        state.error = action.payload.data;
      }
    },
    [moneyLogs.rejected]: (state, action) => {
      state.moneyLogsStatus = "failed";
      state.error = action.payload;
    },
  },
});

export default moneyLogsSlice.reducer;
